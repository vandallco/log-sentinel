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

export type PlaybookEntry = {
  id: string;
  title: string;
  category: string;
  content: string;
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
  playbooks: PlaybookEntry[];
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
      ip: "10.10.1.20",
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
  playbooks: [
    {
      id: "PB-SSH-001",
      title: "Brute Force SSH — Protocolo de respuesta",
      category: "Acceso no autorizado",
      content: "1. Verificar si el acceso exitoso es legítimo (usuario, horario, IP conocida)\n2. Si la IP es desconocida → escalar inmediatamente\n3. Revocar sesiones activas del usuario comprometido\n4. Forzar rotación de credenciales\n5. Bloquear IP en firewall perimetral\n6. Buscar indicadores de compromiso post-acceso (descargas, cron jobs, usuarios creados)\n7. Documentar timeline completa en ticket",
    },
    {
      id: "PB-ACC-002",
      title: "Criterios de clasificación de alertas",
      category: "Clasificación",
      content: "POSITIVO VERDADERO: IP externa + acceso exitoso + actividad post-acceso anómala\nFALSO POSITIVO: IP interna conocida + horario laboral + patrón consistente con uso normal\nREQUIERE INVESTIGACIÓN: IP desconocida sin acceso exitoso o con acceso pero sin actividad posterior",
    },
    {
      id: "PB-DNS-001",
      title: "DNS Tunneling / Exfiltration — Protocolo de respuesta",
      category: "Exfiltración de datos",
      content: "1. Verificar si el dominio está en threat intelligence feeds\n2. Calcular volumen de consultas y tamaño estimado de datos\n3. Identificar qué datos podrían estar siendo exfiltrados\n4. Bloquear resolución DNS hacia el dominio malicioso\n5. Revisar procesos del servidor afectado\n6. Buscar persistencia (crontab, systemd services, .bashrc)\n7. Escalar a forense si se confirma exfiltración",
    },
    {
      id: "PB-LAT-001",
      title: "Movimiento Lateral — Protocolo de respuesta",
      category: "Compromiso de estación de trabajo",
      content: "1. Aislar la workstation comprometida de la red\n2. Identificar alcance: ¿a qué servidores accedió? ¿qué datos expuso?\n3. Bloquear IP de C2 externo en firewall perimetral\n4. Revocar todas las sesiones activas del usuario afectado\n5. Obtener imagen forense de la workstation antes de apagarla\n6. Resetear credenciales de TODOS los usuarios con acceso a servidores tocados\n7. Revisar persistencia en servidores comprometidos\n8. Notificar a DPO y legal si hay datos de clientes comprometidos\n9. Escalar a management si hay impacto en servicios de pago",
    },
    {
      id: "PB-PHI-001",
      title: "Phishing / Credential Theft — Protocolo de respuesta",
      category: " Ingeniería social",
      content: "1. Identificar usuario afectado y confirmar click en link malicioso\n2. Revocar sesiones activas del usuario inmediatamente\n3. Forzar cambio de contraseña + MFA reset\n4. Revisar activity del usuario post-compromiso (emails enviados, archivos accedidos)\n5. Verificar si las credenciales fueron usadas desde IPs externas\n6. Bloquear dominio/phishing URL en proxy y DNS\n7. Notificar al usuario y al departamento de TI\n8. Buscar otros usuarios que recibieron el mismo phishing",
    },
    {
      id: "PB-C2-001",
      title: "C2 Beaconing — Protocolo de respuesta",
      category: "Malware / C2",
      content: "1. Confirmar patrón de beaconing (intervalo regular, mismas cabeceras)\n2. Identificar el dominio/IP de C2 y verificar en threat intelligence\n3. Aislar el servidor afectado de la red sin apagarlo\n4. Capturar tráfico para análisis forense (packet capture)\n5. Revisar procesos y conexiones activas del servidor\n6. Bloquear IP/dominio de C2 en firewall y DNS\n7. Buscar otros sistemas con mismo patrón de conexión\n8. Escalar a equipo de malware analysis / forense",
    },
    {
      id: "PB-INS-001",
      title: "Insider Threat — Protocolo de respuesta",
      category: "Amenaza interna",
      content: "1. No alertar al empleado sospechoso — investigar en secreto\n2. Recopilar evidencia: logs de acceso, DLP alerts, network traffic\n3. Verificar si el acceso es autorizado o no (revisar con su manager)\n4. Si hay exfiltración confirmada: bloquear acceso y confiscar equipo\n5. Revisar alcance: ¿qué datos accedió? ¿cuántos se copiaron?\n6. Contactar Legal y Recursos Humanos\n7. Determinar si hay daño reputacional o regulatorio\n8. Documentar todo para posible acción legal",
    },
    {
      id: "PB-IR-002",
      title: "Criterios de escalamiento — Niveles de impacto",
      category: "Escalamiento",
      content: "NIVEL 1 (L2): Workstation comprometida sin acceso a servidores críticos\nNIVEL 2 (L3): Movimiento lateral a servidores internos\nNIVEL 3 (CISO): Exfiltración de datos de clientes / impacto en servicios de pago\nNIVEL 4 (Legal/DPO): Notificación regulatoria obligatoria (PDPA, GDPR, etc.)",
    },
  ],
};
