export type Severity = "critical" | "high" | "medium" | "low";

export type LogEvent = {
  line: number;
  timestamp: string | null;
  ip: string | null;
  user: string | null;
  port: number | null;
  message: string;
};

export type Alert = {
  severity: Severity;
  title: string;
  detail: string;
  ips: string[];
  count: number;
};

export type AnalysisResult = {
  totalLines: number;
  parsedEvents: LogEvent[];
  failedByIp: Map<string, number>;
  acceptedByIp: Map<string, number>;
  portsByIp: Map<string, Set<number>>;
  alerts: Alert[];
};

const IP_RE = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
const TS_RE =
  /^[A-Z][a-z]{2}\s+\d{1,2}\s+\d{2}:\d{2}:\d{2}/;
const ISO_RE =
  /\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?/;
const PORT_RE = /(?:port|dpt)[:=]\s?(\d{1,5})/i;
const USER_RE = /(?:user|for (?:invalid user )?)([a-zA-Z0-9_.-]+?) from/;

type Rule = {
  re: RegExp;
  kind: "failed" | "accepted" | "connection";
};

const RULES: Rule[] = [
  {
    re: /failed password|authentication failure|invalid user|fail(ed)? to authenticate/i,
    kind: "failed",
  },
  {
    re: /accepted password|accepted publickey|session opened for user/i,
    kind: "accepted",
  },
  {
    re: /kernel:.*\b(dpt|port)=/i,
    kind: "connection",
  },
];

function extractIp(line: string): string | null {
  const m = line.match(IP_RE);
  if (!m) return null;
  return m[0];
}

function isPrivate(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p > 255))
    return false;
  if (parts[0] === 10) return true;
  if (parts[0] === 192 && parts[1] === 168) return true;
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  return false;
}

export function parseLog(content: string): AnalysisResult {
  const lines = content.split(/\r?\n/);
  const events: LogEvent[] = [];
  const failedByIp = new Map<string, number>();
  const acceptedByIp = new Map<string, number>();
  const portsByIp = new Map<string, Set<number>>();

  lines.forEach((line, i) => {
    if (!line.trim()) return;

    let matched: Rule["kind"] | null = null;
    for (const rule of RULES) {
      if (rule.re.test(line)) {
        matched = rule.kind;
        break;
      }
    }
    if (!matched) return;

    const tsMatch = line.match(TS_RE);
    const isoMatch = line.match(ISO_RE);
    const portMatch = line.match(PORT_RE);
    const userMatch = line.match(USER_RE);
    const ip = extractIp(line);

    const event: LogEvent = {
      line: i + 1,
      timestamp: isoMatch ? isoMatch[0] : tsMatch ? tsMatch[0] : null,
      ip,
      user: matched !== "connection" && userMatch ? userMatch[1] : null,
      port: portMatch ? parseInt(portMatch[1], 10) : null,
      message: line.trim().slice(0, 300),
    };
    events.push(event);

    if (!ip) return;

    if (matched === "failed") {
      failedByIp.set(ip, (failedByIp.get(ip) ?? 0) + 1);
    } else if (matched === "accepted") {
      acceptedByIp.set(ip, (acceptedByIp.get(ip) ?? 0) + 1);
    } else if (matched === "connection" && event.port != null) {
      const set = portsByIp.get(ip) ?? new Set<number>();
      set.add(event.port);
      portsByIp.set(ip, set);
    }
  });

  const alerts: Alert[] = [];

  // Brute force: >= 5 intentos fallidos desde la misma IP
  for (const [ip, count] of failedByIp) {
    if (count >= 5) {
      alerts.push({
        severity: count >= 20 ? "critical" : "high",
        title: `Posible fuerza bruta desde ${ip}`,
        detail: `${count} intentos de autenticación fallidos en el log. Bloquear IP y verificar si algún acceso fue exitoso.`,
        ips: [ip],
        count,
      });
    }
  }

  // Login exitoso tras fallos
  for (const [ip, fails] of failedByIp) {
    if ((acceptedByIp.get(ip) ?? 0) > 0) {
      alerts.push({
        severity: "critical",
        title: `Acceso exitoso desde IP con fallos previos (${ip})`,
        detail: `${fails} fallos y al menos un login exitoso desde la misma IP. Posible compromiso — revisar usuario, hora exacta y rotar credenciales.`,
        ips: [ip],
        count: fails,
      });
    }
  }

  // Port scan: misma IP tocando >= 8 puertos distintos
  for (const [ip, ports] of portsByIp) {
    if (ports.size >= 8) {
      alerts.push({
        severity: "medium",
        title: `Escaneo de puertos desde ${ip}`,
        detail: `${ports.size} puertos distintos contactados (ej: ${[...ports]
          .slice(0, 6)
          .join(", ")}...). Reconocimiento típico previo a un ataque.`,
        ips: [ip],
        count: ports.size,
      });
    }
  }

  // Tráfico externo sospechoso leve
  const externalFails = [...failedByIp.entries()].filter(
    ([ip]) => !isPrivate(ip),
  );
  const externalTotal = externalFails.reduce((a, [, c]) => a + c, 0);
  if (externalTotal >= 3 && externalTotal < 5) {
    alerts.push({
      severity: "low",
      title: "Intentos fallidos desde IPs externas",
      detail: `${externalTotal} fallos desde IPs públicas. Ruido habitual de internet, pero conviene monitorear.`,
      ips: externalFails.map(([ip]) => ip),
      count: externalTotal,
    });
  }

  const sevRank: Record<Severity, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
  };
  alerts.sort((a, b) => sevRank[a.severity] - sevRank[b.severity]);

  return {
    totalLines: lines.filter((l) => l.trim()).length,
    parsedEvents: events,
    failedByIp,
    acceptedByIp,
    portsByIp,
    alerts,
  };
}

export const SAMPLE_LOG = `Jul 24 03:12:01 srv sshd[2231]: Failed password for invalid user admin from 45.155.204.10 port 42122 ssh2
Jul 24 03:12:04 srv sshd[2233]: Failed password for invalid user admin from 45.155.204.10 port 42138 ssh2
Jul 24 03:12:07 srv sshd[2235]: Failed password for root from 45.155.204.10 port 42150 ssh2
Jul 24 03:12:11 srv sshd[2237]: Failed password for root from 45.155.204.10 port 42166 ssh2
Jul 24 03:12:15 srv sshd[2239]: Failed password for root from 45.155.204.10 port 42190 ssh2
Jul 24 03:12:19 srv sshd[2241]: Failed password for root from 45.155.204.10 port 42202 ssh2
Jul 24 03:12:23 srv sshd[2243]: Failed password for root from 185.220.101.7 port 51234 ssh2
Jul 24 03:12:26 srv sshd[2245]: Failed password for root from 185.220.101.7 port 51240 ssh2
Jul 24 03:12:30 srv sshd[2247]: Failed password for root from 185.220.101.7 port 51255 ssh2
Jul 24 03:12:33 srv sshd[2249]: Failed password for root from 185.220.101.7 port 51261 ssh2
Jul 24 03:12:36 srv sshd[2251]: Failed password for root from 185.220.101.7 port 51270 ssh2
Jul 24 03:12:39 srv sshd[2253]: Failed password for root from 185.220.101.7 port 51288 ssh2
Jul 24 03:12:44 srv sshd[2256]: Accepted password for root from 185.220.101.7 port 51299 ssh2
Jul 24 03:13:02 srv sudo:   root : TTY=pts/0 ; PWD=/root ; USER=root ; COMMAND=/usr/bin/passwd root
Jul 24 08:41:17 srv kernel: [UFW BLOCK] IN=eth0 SRC=91.240.118.222 DST=192.168.1.10 PROTO=TCP SPT=44412 DPT=23
Jul 24 08:41:18 srv kernel: [UFW BLOCK] IN=eth0 SRC=91.240.118.222 DST=192.168.1.10 PROTO=TCP SPT=44414 DPT=2323
Jul 24 08:41:20 srv kernel: [UFW BLOCK] IN=eth0 SRC=91.240.118.222 DST=192.168.1.10 PROTO=TCP SPT=44416 DPT=8080
Jul 24 08:41:22 srv kernel: [UFW BLOCK] IN=eth0 SRC=91.240.118.222 DST=192.168.1.10 PROTO=TCP SPT=44418 DPT=1433
Jul 24 08:41:24 srv kernel: [UFW BLOCK] IN=eth0 SRC=91.240.118.222 DST=192.168.1.10 PROTO=TCP SPT=44420 DPT=3306
Jul 24 08:41:26 srv kernel: [UFW BLOCK] IN=eth0 SRC=91.240.118.222 DST=192.168.1.10 PROTO=TCP SPT=44422 DPT=5432
Jul 24 08:41:28 srv kernel: [UFW BLOCK] IN=eth0 SRC=91.240.118.222 DST=192.168.1.10 PROTO=TCP SPT=44424 DPT=6379
Jul 24 08:41:30 srv kernel: [UFW BLOCK] IN=eth0 SRC=91.240.118.222 DST=192.168.1.10 PROTO=TCP SPT=44426 DPT=27017
Jul 24 08:41:32 srv kernel: [UFW BLOCK] IN=eth0 SRC=91.240.118.222 DST=192.168.1.10 PROTO=TCP SPT=44428 DPT=5900
Jul 24 09:02:11 srv sshd[3120]: Failed password for invalid user test from 103.97.176.42 port 33012 ssh2
Jul 24 09:02:15 srv sshd[3122]: Failed password for invalid user test from 103.97.176.42 port 33030 ssh2
Jul 24 09:02:19 srv sshd[3124]: Failed password for invalid user oracle from 103.97.176.42 port 33044 ssh2
Jul 24 09:05:41 srv sshd[3201]: Accepted publickey for benjamin from 192.168.1.55 port 49822 ssh2`;
