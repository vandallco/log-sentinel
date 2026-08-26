import type { Scenario } from "./types";

const scenario: Scenario = {
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
    { line: 6, timestamp: "Aug 24 02:51:15", source: "srv-mail postfix/smtpd", message: "connect from mail.corp.local[10.10.5.10]", severity: "info", flagged: false },
    { line: 7, timestamp: "Aug 24 02:52:30", source: "srv-web-01 fail2ban", message: "Ban action for sshd on 45.33.32.156 — 5 failures in 200s — duration 1800s", severity: "warning", flagged: false },
    { line: 8, timestamp: "Aug 24 02:53:44", source: "srv-web-01 sshd[22180]", message: "Accepted publickey for diego from 10.10.1.20 port 49201 ssh2", severity: "info", flagged: false },
    { line: 9, timestamp: "Aug 24 02:54:10", source: "srv-web-01 nginx.access", message: "GET /dashboard 200 — 10.10.1.20 — Diego López SOC", severity: "info", flagged: false },
    { line: 10, timestamp: "Aug 24 02:55:00", source: "srv-web-01 node.app", message: "Queue processor: 127 jobs completed, 34 pending", severity: "info", flagged: false },
    { line: 11, timestamp: "Aug 24 02:56:22", source: "srv-web-01 kernel", message: "[UFW BLOCK] IN=eth0 SRC=203.0.113.44 DST=10.10.1.10 PROTO=TCP SPT=4444 DPT=22", severity: "info", flagged: false },
    { line: 12, timestamp: "Aug 24 02:57:30", source: "srv-web-01 sshd[22195]", message: "Accepted publickey for lucia from 10.10.2.44 port 49302 ssh2", severity: "info", flagged: false },
    { line: 13, timestamp: "Aug 24 02:58:15", source: "srv-web-01 nginx.access", message: "POST /api/auth/login 200 — 10.10.1.15 — Martín González Admin", severity: "info", flagged: false },
    { line: 14, timestamp: "Aug 24 02:59:00", source: "srv-monitor cron", message: "Log rotation completed — archived 48MB of logs to /var/log/archive/", severity: "info", flagged: false },
    { line: 15, timestamp: "Aug 24 03:00:45", source: "srv-mail postfix/smtp", message: "BA5F2E01: to=<admin@corp.local>, relay=none, delay=0.12, dsn=2.0.0, status=sent (250 OK)", severity: "info", flagged: false },
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
    { line: 29, timestamp: "Aug 24 03:12:42", source: "srv-web-01 fail2ban", message: "Ban action for sshd on 185.220.101.7 — 7 failures in 300s — duration 3600s", severity: "warning", flagged: true },
    { line: 30, timestamp: "Aug 24 03:13:10", source: "srv-web-01 nginx.access", message: "GET /api/health 200 — 10.10.2.44 — Lucía Fernández VPN", severity: "info", flagged: false },
    { line: 31, timestamp: "Aug 24 03:14:00", source: "srv-monitor cron", message: "Health check: srv-web-01 — CPU 18% — RAM 45% — Disk 61%", severity: "info", flagged: false },
    { line: 32, timestamp: "Aug 24 03:15:20", source: "srv-web-01 node.app", message: "Queue processor: 98 jobs completed, 22 pending", severity: "info", flagged: false },
    { line: 33, timestamp: "Aug 24 03:16:33", source: "srv-web-01 sshd[22401]", message: "Accepted publickey for sofia from 10.10.3.10 port 49401 ssh2", severity: "info", flagged: false },
    { line: 34, timestamp: "Aug 24 03:17:15", source: "srv-web-01 nginx.access", message: "GET /dashboard 200 — 10.10.1.20 — Diego López SOC", severity: "info", flagged: false },
    { line: 35, timestamp: "Aug 24 03:18:00", source: "srv-monitor cron", message: "Metric aggregation completed — 14,203 events processed", severity: "info", flagged: false },
    { line: 36, timestamp: "Aug 24 03:19:45", source: "srv-mail postfix/smtp", message: "D3A1B2C4: to=<team@corp.local>, relay=mail.corp.local[10.10.5.10], delay=0.08, status=sent (250 OK)", severity: "info", flagged: false },
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
    { line: 50, timestamp: "Aug 24 03:29:30", source: "srv-mail postfix/qmgr", message: "BA5F2E02: from=<alerts@monitoring.local>, size=1204, nrcpt=1 (queue active)", severity: "info", flagged: false },
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
            "Líneas 16-29 y 41-45 (todos los eventos de 185.220.101.7 incluyendo el éxito y post-explotación)",
          correct: true,
          explanation:
            "Correcto. La IP 185.220.101.7 es externa y ejecutó una secuencia completa: brute force → acceso exitoso → lectura de /etc/shadow → intento de conexión a la DB → creación de usuario → descarga de payload. Todo es parte del mismo incidente.",
        },
        {
          id: "b",
          label:
            "Solo las líneas 16-22 (los intentos fallidos de 185.220.101.7)",
          correct: false,
          explanation:
            "Estás ignorando el login exitoso, el comando sudo y el intento de conexión a la DB. La gravedad del incidente no está solo en los fallos, sino en lo que pasó después del acceso exitoso.",
          consequence:
            "En un SOC real, ignorar los eventos post-acceso significaría no detectar que el atacante ya tiene acceso root, está leyendo /etc/shadow, intentando moverse lateralmente a la base de datos y creando usuarios backdoor. Mientras investigás solo los fallos, el atacante roba credenciales y establece persistencia.",
        },
        {
          id: "c",
          label:
            "Solo la línea 41 (el login exitoso)",
          correct: false,
          explanation:
            "El login exitoso es el punto de inflexión, pero necesitás ver los intentos previos para confirmar que fue brute force, y los eventos posteriores para entender el alcance del compromiso.",
          consequence:
            "En un SOC real, reportar solo el login exitoso sin contexto haría que el equipo no dimensione la gravedad. No verían el brute force previo ni la post-explotación, y podrían tratar esto como un login normal en lugar de un ataque activo.",
        },
        {
          id: "d",
          label:
            "Todas las entradas del log (líneas 1-55)",
          correct: false,
          explanation:
            "Las líneas normales incluyen tráfico de Lucía, Carlos, health checks y otros usuarios legítimos. No son parte del incidente. Incluir todo ensucia el análisis y dificulta la investigación.",
          consequence:
            "En un SOC real, entregar un reporte con 55 líneas de 'evidencia' donde la mitad es tráfico legítimo hace que el equipo de contención pierda horas revisando activity normal. Mientras tanto, el atacante sigue activo moviéndose lateralmente.",
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
          label:
            "Martín González (SysAdmin Senior — VLAN 10 Admin)",
          correct: false,
          explanation:
            "Martín podría ayudar con la contención técnica, pero como SysAdmin no es el primero en la cadena de respuesta de seguridad. Debería ser contactado después del SOC.",
          consequence:
            "En un SOC real, escalar directamente al SysAdmin sin pasar por el SOC bypass el proceso de clasificación. Si no se investiga primero, podrías estar escalando un falso positivo o perdiendo evidencia crítica que solo un analista de seguridad notaría.",
        },
        {
          id: "b",
          label: "Sofía Ramírez (Gerente de Operaciones)",
          correct: false,
          explanation:
            "Sofía es gerente operativa, no técnica. Su involvement sería posterior si se necesita comunicación con management o clientes afectados. No es la primera línea de respuesta.",
          consequence:
            "En un SOC real, involucrar a un gerente antes de que el equipo técnico confirme el incidente genera alarma innecesaria y presión para cerrar rápido sin investigación adecuada.",
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
          label: "Carlos Ruiz (Analista Financiero)",
          correct: false,
          explanation:
            "Carlos está en Finanzas (VLAN 30) y no tiene responsabilidad sobre srv-web-01. No tiene las credenciales ni el conocimiento técnico para responder a un compromiso SSH.",
          consequence:
            "En un SOC real, asignar un incidente a la persona equivocada retrasa la respuesta horas. Carlos tendría que contactar a IT para entender qué está pasando, mientras el atacante sigue activo en el servidor.",
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
          label: "Forzar rotación de credenciales del usuario",
          correct: false,
          explanation:
            "La rotación de credenciales es el paso 4 del protocolo. Primero necesitás confirmar que es un incidente real antes de tomar medidas que afecten al usuario.",
          consequence:
            "En un SOC real, forzar rotación de credenciales sin confirmar el incidente puede interrumpir procesos automatizados que dependen de esas credenciales, causando caídas en servicios de producción.",
        },
        {
          id: "b",
          label: "Bloquear la IP en el firewall inmediatamente",
          correct: false,
          explanation:
            "Bloquear la IP es parte de la contención, pero el protocolo dice verificar primero si el acceso es legítimo. Si bloqueás antes de investigar, podrías cortar una conexión legítima de un administrador remoto.",
          consequence:
            "En un SOC real, bloquear una IP sin verificar si hay un administrador legítimo usando VPN podría cortar el acceso remoto de emergencia del equipo de TI, dejando la infraestructura sin soporte durante un incidente real.",
        },
        {
          id: "c",
          label: "Crear ticket en Jira y esperar",
          correct: false,
          explanation:
            "Esperar no es una opción cuando hay un compromiso activo. El ticket se crea, pero la respuesta inmediata es verificar y contener, no sentarse a esperar.",
          consequence:
            "En un SOC real, esperar con un compromiso activo permite que el atacante complete su objetivo: robar datos, instalar backdoors, o moverse lateralmente. Cada minuto de inacción aumenta el daño.",
        },
        {
          id: "d",
          label:
            "Verificar si el acceso es legítimo (usuario, horario, IP conocida)",
          correct: true,
          explanation:
            "Correcto. El playbook indica: 'Verificar si el acceso es legítimo (usuario, horario, IP conocida)'. En este caso, root desde una IP rusa a las 3 AM claramente NO es legítimo.",
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
          label:
            "Positivo verdadero — Brute force con compromiso confirmado",
          correct: true,
          explanation:
            "Correcto. Es un positivo verdadero. La secuencia de eventos demuestra un ataque exitoso: reconocimiento (intentos con usuarios variados), acceso (password correcto), y post-explotación (sudo, intento de lateral movement a la DB).",
        },
        {
          id: "b",
          label: "Falso positivo",
          correct: false,
          explanation:
            "No hay forma de justificar esto como falso positivo. IP externa desconocida + brute force + root access + lectura de /etc/shadow a las 3 AM = compromiso confirmado.",
          consequence:
            "En un SOC real, marcar esto como falso positivo significaría ignorar un compromiso activo. El atacante seguiría dentro del servidor robando datos y moviéndose lateralmente durante horas o días antes de que alguien lo detecte.",
        },
        {
          id: "c",
          label: "Requiere más investigación",
          correct: false,
          explanation:
            "Con los indicadores disponibles (IP externa, acesso root, /etc/shadow, intento de conexión a DB), ya hay suficiente evidencia para clasificar como positivo. Más investigación se hace DURANTE la fase de contención, no para decidir si es real.",
          consequence:
            "En un SOC real, demorar la clasificación bajo el pretexto de 'más investigación' permite que el atacante siga activo. La clasificación no es el momento de dudar cuando la evidencia es clara.",
        },
        {
          id: "d",
          label:
            "Requiere escalamiento a CISO antes de clasificar",
          correct: false,
          explanation:
            "El analista SOC tiene evidencia suficiente para clasificar por sí mismo. El escalamiento a CISO es para notificación de impacto organizacional, no para validar la clasificación técnica del incidente.",
          consequence:
            "En un SOC real, esperar aprobación del CISO para clasificar un incidente agrega horas de retraso. Mientras se busca al ejecutivo, el atacante sigue activo y la ventana de contención se reduce.",
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
            "Incidente de acceso no autorizado en srv-web-01. Se requiere investigación del equipo de TI para determinar alcance y acciones correctivas.",
          correct: false,
          explanation:
            "Este reporte no contiene ningún dato técnico: no menciona IP atacante, timestamp, tipo de ataque, ni evidencia. 'Investigación del equipo de TI' es ambiguo y no define responsables ni prioridad.",
          consequence:
            "En un SOC real, un reporte sin datos técnicos no puede usarse para forensic, legal o auditoría. Si el incidente escala a nivel regulatorio, este reporte no sirve como evidencia documental. Además, el equipo de TI no sabe qué investigar sin datos específicos.",
        },
        {
          id: "b",
          label:
            "Se detectó activity sospechosa en el servidor. Revisar y tomar acciones.",
          correct: false,
          explanation:
            "Demasiado vago. No menciona IP, timing, impacto ni evidencia. Un reporte así no sirve para escalamiento, forensic ni auditoría.",
          consequence:
            "En un SOC real, un reporte así de vago genera confusión: el equipo de contención no sabe qué servidor bloquear, el management no entiende la gravedad, y en auditoría no hay evidencia documentada del incidente.",
        },
        {
          id: "c",
          label:
            "Brute force exitoso desde IP externa 185.220.101.7 contra srv-web-01 (root). Acceso confirmado a las 03:12:44 UTC. Post-acceso: lectura de /etc/shadow y tentativa de conexión a srv-db-01 (Puerto 5432 bloqueado por UFW). Impacto: compromiso de credenciales root del servidor web. Acciones requeridas: revocar sesiones, rotar credenciales, bloquear IP, forense de srv-web-01.",
          correct: true,
          explanation:
            "Correcto. Esta redacción incluye: QUÉ pasó (brute force exitoso), DESDE DÓNDE (IP externa), CUÁNDO (timestamp), QUÉ SE AFECTÓ (srv-web-01 root), EVIDENCIA POST-ACCESO (/etc/shadow, intento de DB), IMPACTO, y ACCIONES REQUERIDAS. Es el formato estándar de un SOC profesional.",
        },
        {
          id: "d",
          label:
            "Resumen ejecutivo para management: 'Incidente de seguridad en srv-web-01, acceso no autorizado detectado, en investigación. Se requiere reunión de emergencia con CISO y Legal.'",
          correct: false,
          explanation:
            "Un resumen ejecutivo no reemplaza el reporte técnico. Falta toda la evidencia: IP, timestamps, logs, alcance del compromiso. Management necesita contexto, pero el equipo de contención necesita datos técnicos accionables.",
          consequence:
            "En un SOC real, priorizar el reporte ejecutivo sobre el técnico deja al equipo de respuesta sin la información que necesita para contener. La reunión de emergencia se realiza sin datos, y el atacante sigue activo mientras se discute en会议室.",
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
          label: "Intentar bloquear la IP vos mismo desde la terminal",
          correct: false,
          explanation:
            "Como SOC analyst, no deberías ejecutar cambios de infraestructura directamente. Eso es responsabilidad del SysAdmin/NetOps. Tu rol es reportar y escalar.",
          consequence:
            "En un SOC real, ejecutar cambios de infraestructura sin autorización puede causar downtime accidental y sin audit trail. Si el bloqueo falla o afecta servicios legítimos, no hay documentación de quién lo hizo ni por qué.",
        },
        {
          id: "b",
          label: "Documentar el incidente en una Wiki interna y archivar el ticket como 'investigado'",
          correct: false,
          explanation:
            "Documentar en Wiki no es un método de escalamiento válido. El ticket no se cierra hasta que las acciones de contención se ejecuten y verifiquen. Archivar antes de remediación es prematuro.",
          consequence:
            "En un SOC real, archivar un ticket sin verificar que las acciones de contención se ejecutaron significa que el atacante podría seguir teniendo acceso. El incidente se reabrirá días después con mayor impacto cuando otros lo detecten, y no habrá registro de por qué no se actuó oportunamente.",
        },
        {
          id: "c",
          label:
            "Enviar un email al equipo de TI explicando el incidente y volver al panel de logs",
          correct: false,
          explanation:
            "El email no es un método de escalamiento válido en operaciones SOC. Es lento, no tiene audit trail, y puede no llegar a la persona correcta. El escalamiento se hace por el sistema de tickets o alertas designado.",
          consequence:
            "En un SOC real, escalar por email significa que el SysAdmin podría no ver la alerta por horas. Mientras tanto, el atacante sigue activo. Además, sin registro en el sistema de tickets, no hay evidencia de cuándo se escaló ni quién fue notificado.",
        },
        {
          id: "d",
          label:
            "Escalar a Martín para ejecutar la contención técnica y volver al panel de logs para revisar más alertas",
          correct: true,
          explanation:
            "Correcto. El flujo SOC es: detectar → clasificar → escalar → contener → remediar. Tu trabajo como analyst es clasificar y escalar. Volvés al panel para seguir monitoreando mientras el SysAdmin ejecuta la contención.",
        },
      ],
    },
  ],
  summary:
    "Este incidente demuestra un ataque de fuerza bruta exitoso contra srv-web-01. La IP 185.220.101.7 (Rusia) realizó 7 intentos fallidos antes de obtener acceso root. Post-acceso, el atacante intentó leer /etc/shadow y conectar a la base de datos PostgreSQL (bloqueado por UFW). Clasificación: POSITIVO VERDADERO — Compromiso confirmado.",
};

export default scenario;
