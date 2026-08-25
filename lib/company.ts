export type Employee = {
  name: string;
  role: string;
  department: string;
  ip: string;
  vlan: string;
  mac: string;
  equipment: string;
};

export type Server = {
  hostname: string;
  ip: string;
  vlan: string;
  purpose: string;
  os: string;
};

export type CompanyProfile = {
  name: string;
  industry: string;
  headquarters: string;
  employees: Employee[];
  servers: Server[];
  networkRanges: { name: string; cidr: string; vlan: string }[];
  vpnRange: string;
  socEmail: string;
  escalationContact: string;
  workHours: string;
  notes: string[];
};

export const COMPANY: CompanyProfile = {
  name: "NucleoTech S.A.",
  industry: "Fintech — procesamiento de pagos y transferencias",
  headquarters: "Buenos Aires, Argentina",
  employees: [
    {
      name: "Martín González",
      role: "SysAdmin Senior",
      department: "TI / Infraestructura",
      ip: "10.10.1.15",
      vlan: "VLAN 10 — Admin",
      mac: "00:1a:2b:3c:4d:01",
      equipment: "Dell Latitude 5540 — Ubuntu 22.04",
    },
    {
      name: "Lucía Fernández",
      role: "Desarrolladora Backend",
      department: "TI / Ingeniería",
      ip: "10.10.2.44",
      vlan: "VLAN 20 — Dev",
      mac: "00:1a:2b:3c:4d:02",
      equipment: "MacBook Pro M3 — macOS Sonoma",
    },
    {
      name: "Carlos Ruiz",
      role: "Analista Financiero",
      department: "Finanzas",
      ip: "10.10.3.22",
      vlan: "VLAN 30 — Corp",
      mac: "00:1a:2b:3c:4d:03",
      equipment: "HP EliteBook — Windows 11",
    },
    {
      name: "Ana Martínez",
      role: "DevOps Engineer",
      department: "TI / Plataforma",
      ip: "10.10.1.30",
      vlan: "VLAN 10 — Admin",
      mac: "00:1a:2b:3c:4d:04",
      equipment: "ThinkPad X1 — Fedora 39",
    },
    {
      name: "Diego López",
      role: "SOC Analyst L2",
      department: "Seguridad",
      ip: "10.10.1.50",
      vlan: "VLAN 10 — Admin",
      mac: "00:1a:2b:3c:4d:05",
      equipment: "Dell Precision — Windows 10",
    },
    {
      name: "Sofía Ramírez",
      role: "Gerente de Operaciones",
      department: "Operaciones",
      ip: "10.10.3.10",
      vlan: "VLAN 30 — Corp",
      mac: "00:1a:2b:3c:4d:06",
      equipment: "MacBook Air M2 — macOS Ventura",
    },
  ],
  servers: [
    {
      hostname: "srv-web-01",
      ip: "10.10.5.10",
      vlan: "VLAN 50 — DMZ",
      purpose: "Nginx reverse proxy + API gateway",
      os: "Ubuntu 22.04 LTS",
    },
    {
      hostname: "srv-db-01",
      ip: "10.10.5.20",
      vlan: "VLAN 50 — DMZ",
      purpose: "PostgreSQL 16 — base principal de transacciones",
      os: "Ubuntu 22.04 LTS",
    },
    {
      hostname: "srv-app-01",
      ip: "10.10.5.30",
      vlan: "VLAN 50 — DMZ",
      purpose: "Node.js app server — backend de pagos",
      os: "Ubuntu 22.04 LTS",
    },
    {
      hostname: "srv-mail",
      ip: "10.10.5.40",
      vlan: "VLAN 50 — DMZ",
      purpose: "Postfix + Dovecot — correo interno",
      os: "Debian 12",
    },
    {
      hostname: "srv-monitor",
      ip: "10.10.5.50",
      vlan: "VLAN 50 — DMZ",
      purpose: "Grafana + Prometheus + Loki — monitoreo",
      os: "Ubuntu 22.04 LTS",
    },
    {
      hostname: "srv-vpn",
      ip: "10.10.0.5",
      vlan: "VLAN 5 — DMZ Gateway",
      purpose: "WireGuard VPN — acceso remoto",
      os: "Debian 12",
    },
  ],
  networkRanges: [
    { name: "Admin", cidr: "10.10.1.0/24", vlan: "VLAN 10" },
    { name: "Dev", cidr: "10.10.2.0/24", vlan: "VLAN 20" },
    { name: "Corp", cidr: "10.10.3.0/24", vlan: "VLAN 30" },
    { name: "DMZ", cidr: "10.10.5.0/24", vlan: "VLAN 50" },
  ],
  vpnRange: "10.10.8.0/24",
  socEmail: "soc@nucleotech.com.ar",
  escalationContact: "Diego López (SOC L2) — ext. 4450",
  workHours: "Lun-Vie 09:00–18:00 ART (UTC-3)",
  notes: [
    "Todos los servidores reportan logs a Loki vía Promtail",
    "SSH externo solo permitido vía VPN (WireGuard puerto 51820/UDP)",
    "Regla UFW: bloquear todo inbound excepto 80/443 en DMZ",
    "Fail2ban activo en srv-web-01 con umbral de 5 intentos",
    "Último pentest: marzo 2026 — sin hallazgos críticos",
    "Backup diario a S3 (encriptado, retención 30 días)",
  ],
};
