import type { Scenario } from "./types";

const scenario: Scenario = {
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
            "Cache poisoning — alguien está envenenando la cache DNS del servidor",
          correct: false,
          explanation:
            "El cache poisoning implica respuestas DNS falsas. Aquí el servidor está GENERANDO las consultas (queries salientes), no recibiendo respuestas falsas. El tráfico es saliente desde srv-app-01 hacia evil-cdn.com.",
          consequence:
            "En un SOC real, confundir DNS tunneling con cache poisoning lleva a bloquear la resolución DNS incorrecta mientras el atacante sigue exfiltrando datos por un canal completamente diferente.",
        },
        {
          id: "b",
          label:
            "Consultas DNS normales — el servidor está resolviendo CDN para assets",
          correct: false,
          explanation:
            "Los subdominios son strings base64 (aGVsbG8=, cGF5bG9hZA==, etc.), todos apuntan al mismo IP (198.51.100.23) con TTL idéntico (30s). Un CDN real tiene múltiples IPs, TTL variables y subdominios legítimos, no strings codificados.",
          consequence:
            "En un SOC real, ignorar DNS tunneling como 'tráfico normal' permite que el atacante siga exfiltrando datos. Cada query DNS es un paquete de información robada: credenciales, tokens, datos financieros.",
        },
        {
          id: "c",
          label:
            "DNS tunneling — los subdominios contienen datos codificados en base64 exfiltrados del servidor",
          correct: true,
          explanation:
            "Correcto. Cada subdominio es base64 decodificable: 'hello world', 'payload.bin', 'token=abc123', 'secret_data', 'card=45...' El patrón de mismo destino, TTL fijo y subdominios con datos codificados es DNS tunneling clásico.",
        },
        {
          id: "d",
          label:
            "Es ruido — solo 28 consultas en 6 minutos no es significativo",
          correct: false,
          explanation:
            "El volumen no es el problema, sino el CONTENIDO. Cada subdominio lleva datos exfiltrados. Con 28 consultas ya se extrajeron: tokens, credenciales, datos de tarjetas de crédito, secrets de API. El daño ya está hecho.",
          consequence:
            "En un SOC real, subestimar el volumen de exfiltración porque 'solo son 28 consultas' ignora que cada consulta puede contener cientos de bytes de datos robados. 28 consultas de ~200 bytes = ~5.6KB de datos sensibles filtrados.",
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
            "Ana Martínez (DevOps Engineer — VLAN 10 Admin)",
          correct: true,
          explanation:
            "Correcto. Ana es DevOps en VLAN 10 Admin con acceso a srv-app-01. Ella puede investigar procesos, revisar crontabs, revisar la configuración de DNS y ejecutar la contención técnica (bloquear el dominio, aislar el servidor).",
        },
        {
          id: "b",
          label:
            "Lucía Fernández (Desarrolladora Backend — VLAN 20 Dev)",
          correct: false,
          explanation:
            "Lucía desarrolla en srv-app-01 pero no tiene permisos de SysAdmin. Podría ayudar a entender qué procesos de la app podrían haber generado el tráfico, pero no es la primera línea de respuesta.",
          consequence:
            "En un SOC real, asignar el incidente a un desarrollador que no tiene experiencia en seguridad retrasa la contención. Ella podría ayudar a entender la aplicación, pero no tiene las herramientas ni el conocimiento para bloquear el dominio o aislar el servidor.",
        },
        {
          id: "c",
          label:
            "Martín González (SysAdmin Senior — VLAN 10 Admin)",
          correct: false,
          explanation:
            "Martín tiene acceso administrativo, pero su especialidad es infraestructura, no seguridad. Ana (DevOps) está mejor posicionada porque entiende tanto la infraestructura como la aplicación, y puede ejecutar la contención más rápidamente.",
          consequence:
            "En un SOC real, asignar a un SysAdmin en lugar de DevOps para un incidente en una aplicación puede resultar en tiempos de respuesta más lentos. El SysAdmin puede bloquear el dominio, pero no sabe qué procesos de la app están generando el tráfico malicioso.",
        },
        {
          id: "d",
          label:
            "Carlos Ruiz (Analista Financiero — VLAN 30 Corp)",
          correct: false,
          explanation:
            "Carlos no tiene acceso técnico a srv-app-01 ni conocimiento de infraestructura. Su involvement sería solo si se confirma que datos financieros fueron exfiltrados.",
          consequence:
            "En un SOC real, asignar un incidente de exfiltración a un analista financiero sin acceso técnico genera cuellos de botella. Carlos no puede bloquear el dominio ni revisar procesos del servidor.",
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
          label:
            "Bloquear inmediatamente todas las consultas DNS del servidor en el firewall",
          correct: false,
          explanation:
            "Bloquear todo el DNS del servidor cortaría la resolución de dominios legítimos que la aplicación necesita para funcionar (google.com, github.com, etc.). La contención debe ser quirúrgica: solo bloquear evil-cdn.com.",
          consequence:
            "En un SOC real, bloquear todo el tráfico DNS de un servidor de producción causa downtime inmediato. La aplicación no puede resolver dominios de APIs externas, certificados SSL, o dependencias, resultando en caída del servicio de pagos.",
        },
        {
          id: "b",
          label: "Reiniciar el servidor para limpiar cualquier proceso malicioso en memoria",
          correct: false,
          explanation:
            "Reiniciar elimina procesos en memoria pero no la persistencia (crontab, systemd services, .bashrc). Además, si el malware tiene persistencia, se relanzará automáticamente después del reinicio.",
          consequence:
            "En un SOC real, reiniciar un servidor sin antes aislar la persistencia es como apagar y prender una computadora con un virus: el malware vuelve a cargarse. Además, se pierde evidencia volátil (memoria, conexiones activas) que es crítica para el forense.",
        },
        {
          id: "c",
          label:
            "Cambiar la contraseña de root del servidor",
          correct: false,
          explanation:
            "La contraseña de root no tiene relación directa con el DNS tunneling. El malware/exfiltrador tiene su propio mecanismo de comunicación. Cambiar la contraseña no detiene la fuga.",
          consequence:
            "En un SOC real, cambiar la contraseña de root sin aislar el dominio malicioso es como cerrar la puerta principal mientras el ladrón sale por la ventana. La exfiltración continúa por DNS mientras 'solucionás' un problema que no existe.",
        },
        {
          id: "d",
          label:
            "Calcular el volumen de consultas y el tamaño estimado de datos exfiltrados",
          correct: true,
          explanation:
            "Correcto. Antes de actuar, necesitás entender la magnitud: ¿cuántos datos se fueron? ¿Qué tipo de datos? Esto determina la severidad del incidente y si hay que notificar a clientes/reguladores.",
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
        {
          id: "d",
          label:
            "Positivo verdadero — pero solo es malware de cryptominería, no exfiltración de datos",
          correct: false,
          explanation:
            "Los subdominios contienen datos decodificables (tokens, cards, credenciales), no hashes de minado. Cryptominería usa protocolos diferentes (no DNS tunneling de datos codificados en base64). La evidencia es claramente exfiltración, no minado.",
          consequence:
            "En un SOC real, clasificar exfiltración como cryptominería lleva a prioridad incorrecta. El DPO no es notificado, los clientes no son alertados, y la ventana de notificación regulatoria (72h GDPR) se pierde porque se cree que es 'solo minado'.",
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
            "Exfiltración de datos vía DNS tunneling desde srv-app-01 hacia evil-cdn.com (198.51.100.23). 28 consultas DNS con subdominios base64 conteniendo: tokens de sesión, datos de tarjetas de crédito (parciales), y credenciales. Activity detectada entre 14:10–14:15 UTC. Dominio no registrado en asset inventory. Impacto: posible compromiso de datos de clientes de pagos. Acciones: bloquear evil-cdn.com en DNS, revisar procesos en srv-app-01, forense completo, notificar a DPO si se confirma fuga de datos personales.",
          correct: true,
          explanation:
            "Reporte completo: QUÉ (DNS tunneling), DESDE DÓNDE (srv-app-01 → evil-cdn.com), QUÉ DATOS (tokens, cards, credenciales), CUÁNDO, IMPACTO (datos de clientes), y ACCIONES (contención + forense + notificación regulatoria). Formato profesional SOC.",
        },
        {
          id: "b",
          label:
            "Se detectó activity anómala en srv-app-01. Las consultas DNS hacia evil-cdn.com parecen sospechosas. Se requiere investigación adicional para determinar el impacto y las acciones correctivas.",
          correct: false,
          explanation:
            "Este reporte no menciona IP de destino, volumen de datos, tipo de datos exfiltrados, ni timeline específico. Un reporte así no permite escalamiento ni forense porque no hay datos accionables.",
          consequence:
            "En un SOC real, un reporte sin datos técnicos no permite al equipo de contención ejecutar acciones. No saben qué dominio bloquear, qué datos pudieron ser comprometidos, ni qué clientes afectar. La investigación se retrasa porque falta información básica.",
        },
        {
          id: "c",
          label:
            "Servidor srv-app-01 comprometido vía DNS tunneling. Datos exfiltrados incluyen tokens y credenciales. Acción inmediata requerida.",
          correct: false,
          explanation:
            "Falta IP de destino, volumen exacto, timeline, y plan de acción específico. Un reporte tan breve no cumple con los requisitos de documentación SOC y no puede usarse para notificación regulatoria.",
          consequence:
            "En un SOC real, reportes breves sin evidencia específica generan confusión. El equipo de contención no sabe qué dominio bloquear, el management no entiende la gravedad, y en auditoría no hay evidencia documentada del incidente.",
        },
        {
          id: "d",
          label:
            "Incidente de seguridad clasificado como positivo verdadero. Se requiere reunión de emergencia con CISO, Legal y DPO para evaluar impacto regulatorio.",
          correct: false,
          explanation:
            "El reporte técnico debe completarse ANTES de la reunión ejecutiva. Sin datos técnicos (IP, timeline, datos afectados), la reunión no tiene base para decisiones informadas sobre contención ni notificación.",
          consequence:
            "En un SOC real, convocar reunión ejecutiva sin reporte técnico completo resulta en una reunión sin datos. El CISO no puede tomar decisiones informadas y la contención se retrasa mientras se discuten planes de acción genéricos.",
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
            "Volver al panel y seguir monitoreando nuevas alertas sin escalar a nadie",
          correct: false,
          explanation:
            "Monitorear sin escalar significa que la contención nunca se ejecuta. El escalamiento es parte del flujo SOC: detectar → clasificar → escalar → contener.",
          consequence:
            "En un SOC real, no escalar a DevOps para la contención significa que evil-cdn.com sigue resolviendo y los datos siguen saliendo. Cada hora sin bloquear = más datos robados. El monitoreo passivo no detiene la exfiltración activa.",
        },
        {
          id: "b",
          label:
            "Contactar al equipo de desarrollo por Slack para que revisen el servidor",
          correct: false,
          explanation:
            "Slack no es un canal de escalamiento válido para incidentes de seguridad. No tiene audit trail, puede no llegar a la persona correcta, y no registra en el sistema de tickets designado para incidentes.",
          consequence:
            "En un SOC real, escalar por Slack significa que el DevOps podría no ver la alerta por horas. Mientras tanto, el atacante sigue exfiltrando. Sin registro en el sistema de tickets, no hay evidencia de cuándo se escaló ni quién fue notificado.",
        },
        {
          id: "c",
          label:
            "Escalar a Ana para la contención técnica y volver al panel de logs para seguir monitoreando",
          correct: true,
          explanation:
            "Correcto. Escalás a Ana (DevOps) para bloquear el dominio, revisar procesos y aislar el servidor. Mientras ella ejecuta la contención, volvés al panel para detectar si hay más activity maliciosa o alertas pendientes.",
        },
        {
          id: "d",
          label:
            "Crear un ticket en Jira con prioridad baja y esperar a que alguien lo tome en la próxima sprint",
          correct: false,
          explanation:
            "Exfiltración activa requiere respuesta inmediata, no cola de tickets con prioridad baja. La prioridad debe ser crítica/alta y la asignación debe ser directa a Ana.",
          consequence:
            "En un SOC real, crear ticket con prioridad baja para exfiltración activa resulta en que el ticket se atienda en días, no horas. Los datos siguen saliendo mientras el ticket espera en la cola de la sprint.",
        },
      ],
    },
  ],
  summary:
    "Exfiltración de datos vía DNS tunneling desde srv-app-01. El atacante codifica datos sensibles (tokens, credenciales, datos de tarjetas) en subdominios base64 que se resuelven a 198.51.100.23. Dominio evil-cdn.com no registrado. Impacto: posible fuga de datos de clientes. Clasificación: POSITIVO VERDADERO — Exfiltración confirmada.",
};

export default scenario;
