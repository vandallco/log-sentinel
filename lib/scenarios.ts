export type Option = {
  id: string;
  label: string;
  correct: boolean;
  explanation: string;
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
      {
        line: 1,
        timestamp: "Aug 24 03:12:01",
        source: "srv-web-01 sshd[22311]",
        message: "Failed password for root from 185.220.101.7 port 51234 ssh2",
        severity: "warning",
        flagged: true,
      },
      {
        line: 2,
        timestamp: "Aug 24 03:12:04",
        source: "srv-web-01 sshd[22313]",
        message: "Failed password for root from 185.220.101.7 port 51240 ssh2",
        severity: "warning",
        flagged: true,
      },
      {
        line: 3,
        timestamp: "Aug 24 03:12:07",
        source: "srv-web-01 sshd[22315]",
        message: "Failed password for root from 185.220.101.7 port 51255 ssh2",
        severity: "warning",
        flagged: true,
      },
      {
        line: 4,
        timestamp: "Aug 24 03:12:11",
        source: "srv-web-01 sshd[22317]",
        message:
          "Failed password for invalid user admin from 185.220.101.7 port 51261 ssh2",
        severity: "warning",
        flagged: true,
      },
      {
        line: 5,
        timestamp: "Aug 24 03:12:15",
        source: "srv-web-01 sshd[22319]",
        message: "Failed password for root from 185.220.101.7 port 51270 ssh2",
        severity: "warning",
        flagged: true,
      },
      {
        line: 6,
        timestamp: "Aug 24 03:12:19",
        source: "srv-web-01 sshd[22321]",
        message: "Failed password for root from 185.220.101.7 port 51288 ssh2",
        severity: "warning",
        flagged: true,
      },
      {
        line: 7,
        timestamp: "Aug 24 03:12:23",
        source: "srv-web-01 sshd[22323]",
        message: "Failed password for root from 185.220.101.7 port 51299 ssh2",
        severity: "warning",
        flagged: true,
      },
      {
        line: 8,
        timestamp: "Aug 24 03:12:44",
        source: "srv-web-01 sshd[22340]",
        message:
          "Accepted password for root from 185.220.101.7 port 51310 ssh2",
        severity: "critical",
        flagged: true,
      },
      {
        line: 9,
        timestamp: "Aug 24 03:13:02",
        source: "srv-web-01 sudo: root",
        message:
          "TTY=pts/0 ; PWD=/root ; USER=root ; COMMAND=/usr/bin/cat /etc/shadow",
        severity: "critical",
        flagged: true,
      },
      {
        line: 10,
        timestamp: "Aug 24 03:13:15",
        source: "srv-web-01 kernel",
        message:
          "[UFW BLOCK] IN=eth0 SRC=185.220.101.7 DST=10.10.5.20 PROTO=TCP SPT=51310 DPT=5432",
        severity: "warning",
        flagged: true,
      },
      {
        line: 11,
        timestamp: "Aug 24 02:50:12",
        source: "srv-web-01 nginx.access",
        message: "GET /api/health 200 — 10.10.2.44 — Lucía Fernández VPN",
        severity: "info",
        flagged: false,
      },
      {
        line: 12,
        timestamp: "Aug 24 02:55:30",
        source: "srv-web-01 nginx.access",
        message:
          "POST /api/payments/process 201 — 10.10.3.22 — Carlos Ruiz Corp",
        severity: "info",
        flagged: false,
      },
      {
        line: 13,
        timestamp: "Aug 24 03:00:00",
        source: "srv-monitor cron",
        message: "Backup job completed successfully — 2.3 GB to S3",
        severity: "info",
        flagged: false,
      },
      {
        line: 14,
        timestamp: "Aug 24 03:05:44",
        source: "srv-web-01 fail2ban",
        message:
          "Ban action for sshd on 185.220.101.7 — 7 failures in 300s — duration 3600s",
        severity: "warning",
        flagged: true,
      },
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
              "Solo las líneas 1-7 (los intentos fallidos de 185.220.101.7)",
            correct: false,
            explanation:
              "Estás ignorando el login exitoso (línea 8), el comando sudo (línea 9) y el intento de conexión a la DB (línea 10). La gravedad del incidente no está solo en los fallos, sino en lo que pasó después del acceso exitoso.",
          },
          {
            id: "b",
            label:
              "Líneas 1-10 (todos los eventos de 185.220.101.7 incluyendo el éxito)",
            correct: true,
            explanation:
              "Correcto. La IP 185.220.101.7 es externa y ejecutó una secuencia completa: brute force → acceso exitoso → lectura de /etc/shadow → intento de conexión a la DB. Todo es parte del mismo incidente.",
          },
          {
            id: "c",
            label:
              "Líneas 1-14 (todas las entradas del log)",
            correct: false,
            explanation:
              "Las líneas 11-14 incluyen tráfico normal de Lucía, Carlos y el job de backup. No son parte del incidente. Incluir todo ensucia el análisis y dificulta la investigación.",
          },
          {
            id: "d",
            label:
              "Solo la línea 8 (el login exitoso)",
            correct: false,
            explanation:
              "El login exitoso es el punto de inflexión, pero necesitás ver los intentos previos para confirmar que fue brute force, y los eventos posteriores para entender el alcance del compromiso.",
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
          },
          {
            id: "b",
            label:
              "Martín González (SysAdmin Senior — VLAN 10 Admin)",
            correct: false,
            explanation:
              "Martín podría ayudar con la contención técnica, pero como SysAdmin no es el primero en la cadena de respuesta de seguridad. Debería ser contactado después del SOC.",
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
          },
          {
            id: "d",
            label: "Crear ticket en Jira y esperar",
            correct: false,
            explanation:
              "Esperar no es una opción cuando hay un compromiso activo. El ticket se crea, pero la respuesta inmediata es verificar y contener, no sentarse a esperar.",
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
      {
        line: 1,
        timestamp: "Aug 24 14:10:03",
        source: "srv-app-01 zeek.dns",
        message:
          "Query: aGVsbG8gd29ybGQ.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30",
        severity: "info",
        flagged: true,
      },
      {
        line: 2,
        timestamp: "Aug 24 14:10:03",
        source: "srv-app-01 zeek.dns",
        message:
          "Query: cGF5bG9hZC5iaW4.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30",
        severity: "info",
        flagged: true,
      },
      {
        line: 3,
        timestamp: "Aug 24 14:10:05",
        source: "srv-app-01 zeek.dns",
        message:
          "Query: dG9rZW49YWJjMTIz.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30",
        severity: "info",
        flagged: true,
      },
      {
        line: 4,
        timestamp: "Aug 24 14:10:05",
        source: "srv-app-01 zeek.dns",
        message:
          "Query: c2VjcmV0X2RhdGE.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30",
        severity: "info",
        flagged: true,
      },
      {
        line: 5,
        timestamp: "Aug 24 14:10:08",
        source: "srv-app-01 zeek.dns",
        message:
          "Query: ZXhmaWx0cmF0ZS5iaW4.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30",
        severity: "info",
        flagged: true,
      },
      {
        line: 6,
        timestamp: "Aug 24 14:10:08",
        source: "srv-app-01 zeek.dns",
        message:
          "Query: Y3JlZF9jYXJkPTQ1.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30",
        severity: "info",
        flagged: true,
      },
      {
        line: 7,
        timestamp: "Aug 24 14:10:12",
        source: "srv-app-01 zeek.dns",
        message:
          "Query: dXNlcm5hbWVfYWRta.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30",
        severity: "info",
        flagged: true,
      },
      {
        line: 8,
        timestamp: "Aug 24 14:10:12",
        source: "srv-app-01 zeek.dns",
        message:
          "Query: cGFzc3dvcmQ9c3Vw.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30",
        severity: "info",
        flagged: true,
      },
      {
        line: 9,
        timestamp: "Aug 24 14:11:00",
        source: "srv-app-01 nginx.access",
        message:
          "POST /api/payments/process 200 — 10.10.2.44 — Lucía Fernández",
        severity: "info",
        flagged: false,
      },
      {
        line: 10,
        timestamp: "Aug 24 14:11:30",
        source: "srv-monitor cron",
        message:
          "Health check: srv-app-01 — CPU 45% — RAM 62% — Disk 71%",
        severity: "info",
        flagged: false,
      },
      {
        line: 11,
        timestamp: "Aug 24 14:12:00",
        source: "srv-app-01 node.app",
        message:
          "Payment processor responded normally — 142 transactions in queue",
        severity: "info",
        flagged: false,
      },
      {
        line: 12,
        timestamp: "Aug 24 14:15:22",
        source: "srv-app-01 zeek.dns",
        message:
          "Query: bWFzdGVyX2tleQ.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30",
        severity: "warning",
        flagged: true,
      },
      {
        line: 13,
        timestamp: "Aug 24 14:15:25",
        source: "srv-app-01 zeek.dns",
        message:
          "Query: c2Vzc2lvbl90b2tlbg.evil-cdn.com — Type: A — Response: 198.51.100.23 — TTL: 30",
        severity: "warning",
        flagged: true,
      },
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
          },
          {
            id: "b",
            label:
              "DNS tunneling — los subdominios contienen datos codificados en base64 exfiltrados del servidor",
            correct: true,
            explanation:
              "Correcto. Cada subdominio es base64 decodificable: 'hello world', 'payload.bin', 'token=abc123', 'secret_data', 'card=45...' El patrón de mismo destino, TTL fijo y subdominios con datos codificados esDNS tunneling clásico.",
          },
          {
            id: "c",
            label:
              "Es ruido — solo 13 consultas en 5 minutos no es significativo",
            correct: false,
            explanation:
              "El volumen no es el problema, sino el CONTENIDO. Cada subdominio lleva datos exfiltrados. Con solo 13 consultas ya se extrajeron: tokens, credenciales, datos de tarjetas de crédito. El daño ya está hecho.",
          },
          {
            id: "d",
            label:
              "Cache poisoning — alguien está envenenando la cache DNS del servidor",
            correct: false,
            explanation:
              "El cache poisoning implica respuestas DNS falsas. Aquí el servidor está GENERANDO las consultas (queries salientes), no recibiendo respuestas falsas. El tráfico es saliente desde srv-app-01 hacia evil-cdn.com.",
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
          },
          {
            id: "d",
            label:
              "El equipo de marketing",
            correct: false,
            explanation:
              "El marketing no tiene ninguna relación con la infraestructura técnica ni la seguridad de servidores.",
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
              "Ignorar las consultas DNS — son solo 13 queries",
            correct: false,
            explanation:
              "13 consultas que contienen tokens, datos de tarjetas y credenciales NO es ruido. Cada query es un paquete de datos robados.",
          },
          {
            id: "d",
            label:
              "Cambiar la contraseña de root del servidor",
            correct: false,
            explanation:
              "La contraseña de root no tiene relación directa con el DNS tunneling. El malware/exfiltrador tiene su propio mecanismo de comunicación. Cambiar la contraseña no detiene la fuga.",
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
          },
          {
            id: "b",
            label:
              "Exfiltración de datos vía DNS tunneling desde srv-app-01 hacia evil-cdn.com (198.51.100.23). 13 consultas DNS con subdominios base64 conteniendo: tokens de sesión, datos de tarjetas de crédito (parciales), y credenciales. Activity detectada entre 14:10–14:15 UTC. Dominio no registrado en asset inventory. Impacto: posible compromiso de datos de clientes de pagos. Acciones: bloquear evil-cdn.com en DNS, revisar procesos en srv-app-01, forense completo, notificar a DPO si se confirma fuga de datos personales.",
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
              "Lenguaje alarmista sin datos. 'Hackeado' no es descriptivo. 'Apagarlo' no es una acción de contención apropiada para un servidor de pagos en producción.",
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
      {
        line: 1,
        timestamp: "Aug 24 16:30:12",
        source: "srv-db-01 sshd[1801]",
        message:
          "Accepted publickey for deploy from 10.10.1.15 port 49822 ssh2",
        severity: "info",
        flagged: false,
      },
      {
        line: 2,
        timestamp: "Aug 24 16:32:00",
        source: "srv-db-01 audit.log",
        message:
          "EXECVE: uid=1000(deploy) cmd=/usr/bin/systemctl status postgresql",
        severity: "info",
        flagged: false,
      },
      {
        line: 3,
        timestamp: "Aug 24 16:35:44",
        source: "ws-carlos-01 sysmon",
        message:
          "ProcessCreate: powershell.exe -enc SQBmACgAJABj... (base64 encoded command)",
        severity: "critical",
        flagged: true,
      },
      {
        line: 4,
        timestamp: "Aug 24 16:35:48",
        source: "ws-carlos-01 sysmon",
        message:
          "NetworkConnection: powershell.exe → 10.10.5.20:445 (SMB)",
        severity: "critical",
        flagged: true,
      },
      {
        line: 5,
        timestamp: "Aug 24 16:36:02",
        source: "ws-carlos-01 sysmon",
        message:
          "NetworkConnection: powershell.exe → 10.10.5.20:135 (WMI/RPC)",
        severity: "critical",
        flagged: true,
      },
      {
        line: 6,
        timestamp: "Aug 24 16:36:15",
        source: "srv-db-01 zeek.smb",
        message:
          "Mapping: ws-carlos-01 (10.10.3.22) → srv-db-01 IPC$ — Tree Connect",
        severity: "warning",
        flagged: true,
      },
      {
        line: 7,
        timestamp: "Aug 24 16:36:20",
        source: "srv-db-01 zeek.smb",
        message:
          "Mapping: ws-carlos-01 (10.10.3.22) → srv-db-01 postgres — Tree Connect",
        severity: "critical",
        flagged: true,
      },
      {
        line: 8,
        timestamp: "Aug 24 16:36:30",
        source: "srv-db-01 audit.log",
        message:
          "EXECVE: uid=0(cmd=/opt/scripts/backup_db.sh — se ejecutó desde SHARE remoto)",
        severity: "critical",
        flagged: true,
      },
      {
        line: 9,
        timestamp: "Aug 24 16:37:00",
        source: "srv-monitor alert",
        message:
          "srv-db-01: CPU spike 98% — dump de PostgreSQL en curso — proceso syslog.pid desde 10.10.3.22",
        severity: "critical",
        flagged: true,
      },
      {
        line: 10,
        timestamp: "Aug 24 16:37:30",
        source: "ws-carlos-01 sysmon",
        message:
          "FileCreate: C:\\Users\\carlos\\Desktop\\exfil.zip (tamaño: 847MB)",
        severity: "critical",
        flagged: true,
      },
      {
        line: 11,
        timestamp: "Aug 24 16:38:00",
        source: "ws-carlos-01 sysmon",
        message:
          "NetworkConnection: powershell.exe → 203.0.113.50:443 (HTTPS externo)",
        severity: "critical",
        flagged: true,
      },
      {
        line: 12,
        timestamp: "Aug 24 16:40:00",
        source: "srv-web-01 nginx.access",
        message:
          "POST /api/payments/process 200 — 10.10.3.10 — Sofía Ramírez Corp",
        severity: "info",
        flagged: false,
      },
      {
        line: 13,
        timestamp: "Aug 24 16:42:00",
        source: "srv-monitor cron",
        message:
          "Health check: srv-db-01 — CPU 12% — RAM 45% — Disk 68%",
        severity: "info",
        flagged: false,
      },
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
              "Solo las líneas 3-5 (powershell.exe y sus conexiones de red)",
            correct: false,
            explanation:
              "Estás capturando el vector de ataque pero perdiendo la evidencia de lo que pasó después: el mapeo de shares SMB (6-7), la ejecución del script (8), el dump de la DB (9), la creación del zip (10) y la exfiltración externa (11).",
          },
          {
            id: "b",
            label:
              "Líneas 3-11 (desde powershell.exe hasta la conexión externa)",
            correct: true,
            explanation:
              "Correcto. La secuencia completa es: PowerShell con encoded command (3) → conexiones SMB/WMI (4-5) → mapeo de shares (6-7) → ejecución de script (8) → dump de DB (9) → creación de zip (10) → exfiltración HTTPS (11). Las líneas 1-2 y 12-13 son activity normal.",
          },
          {
            id: "c",
            label:
              "Todas las líneas del log (1-13)",
            correct: false,
            explanation:
              "Las líneas 1-2 (deploy de Martin), 12-13 (Sofía y health check) son activity normal del día. Inc-luirlas ensucia la evidencia y dificulta el análisis forense.",
          },
          {
            id: "d",
            label:
              "Solo la línea 9 (el CPU spike de srv-db-01)",
            correct: false,
            explanation:
              "El CPU spike es un síntoma, no la causa. Sin ver el origen (power-shell en ws-carlos), el método (SMB/WMI), y la exfiltración (zip + HTTPS), no podés construir el caso.",
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
          },
          {
            id: "d",
            label:
              "Sofía Ramírez (Gerente de Ops) — que decida qué hacer",
            correct: false,
            explanation:
              "Sofía no es parte de la cadena de respuesta técnica. Su rol es comunicacional y estratégico, no táctico. Ella se involucra después del escalamiento al CISO.",
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
          },
          {
            id: "d",
            label:
              "Bloquear la IP 203.0.113.50 en el firewall",
            correct: false,
            explanation:
              "Bloquear la IP de C2 es importante, pero es el paso 3 del protocolo. Primero se aisla la máquina comprometida (paso 1) y luego se busca el alcance (paso 2). Si aislás primero, cortás la exfiltración inmediatamente.",
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
          },
          {
            id: "b",
            label:
              "Positivo verdadero — Compromiso de workstation con movimiento lateral y exfiltración confirmada",
            correct: true,
            explanation:
              "Correcto. La evidencia es abrumadora: PowerShell encoded → SMB/WMI lateral → dump PostgreSQL → exfiltración HTTPS. Cada paso es un indicador de compromiso que se encadena en un ataque completo.",
          },
          {
            id: "c",
            label:
              "Requiere investigación — no sabemos si es un ataque o una migración",
            correct: false,
            explanation:
              "Una migración no usa PowerShell encoded, no hace dump de DBs, no crea zips de 847MB, y no sube datos a IPs externas. Los indicadores son claros: esto es malicioso.",
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
          },
        ],
      },
    ],
    summary:
      "Compromiso de ws-carlos-01 (Analista Financiero) con movimiento lateral a srv-db-01 vía SMB/WMI. El atacante ejecutó dump de PostgreSQL, creó zip de 847MB y exfiltró vía HTTPS a 203.0.113.50. Impacto NIVEL 3: posible fuga de datos financieros y de clientes. Clasificación: POSITIVO VERDADERO — Compromiso completo con exfiltración.",
  },
];
