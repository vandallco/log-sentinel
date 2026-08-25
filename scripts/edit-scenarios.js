const fs = require('fs');
const path = 'C:/Users/User/Documents/Default Project/lib/scenarios.ts';
let content = fs.readFileSync(path, 'utf8');

// Helper: add consequence to a wrong option by matching its explanation
function addConsequenceAfter(explanationText, consequenceText) {
  // Find the explanation and add consequence after it
  const escaped = explanationText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(
    '(explanation:\\s*"' + escaped + '",)(\\s*\\})',
    'm'
  );
  content = content.replace(regex, '$1\n            consequence:\n              "' + consequenceText + '",\n$2');
}

// ===== SCENARIO 1: brute-force-ssh =====

// identify - option d
addConsequenceAfter(
  'El login exitoso es el punto de inflexión, pero necesitás ver los intentos previos para confirmar que fue brute force, y los eventos posteriores para entender el alcance del compromiso.',
  'En un SOC real, reportar solo el login exitoso sin contexto haría que el equipo no dimensione la gravedad. No verían el brute force previo ni la post-explotación, y podrían tratar esto como un login normal en lugar de un ataque activo.'
);

// assign - option a (Carlos)
addConsequenceAfter(
  'Carlos está en Finanzas (VLAN 30) y no tiene responsabilidad sobre srv-web-01. No tiene las credenciales ni el conocimiento técnico para responder a un compromiso SSH.',
  'En un SOC real, asignar un incidente a la persona equivocada retrasa la respuesta horas. Carlos tendría que contactar a IT para entender qué está pasando, mientras el atacante sigue activo en el servidor.'
);

// assign - option b (Martín)
addConsequenceAfter(
  'Martín podría ayudar con la contención técnica, pero como SysAdmin no es el primero en la cadena de respuesta de seguridad. Debería ser contactado después del SOC.',
  'En un SOC real, escalar directamente al SysAdmin sin pasar por el SOC bypass el proceso de clasificación. Si no se investiga primero, podrías estar escalando un falso positivo o perdiendo evidencia crítica que solo un analista de seguridad notaría.'
);

// assign - option d (Sofía)
addConsequenceAfter(
  'Sofía es gerente operativa, no técnica. Su involvement sería posterior si se necesita comunicación con management o clientes afectados. No es la primera línea de respuesta.',
  'En un SOC real, involucrar a un gerente antes de que el equipo técnico confirme el incidente genera alarma innecesaria y presión para cerrar rápido sin investigación adecuada.'
);

// playbook - option a
addConsequenceAfter(
  'Bloquear la IP es parte de la contención, pero el protocolo dice verificar primero si el acceso es legítimo. Si bloqueás antes de investigar, podrías cortar una conexión legítima de un administrador remoto.',
  'En un SOC real, bloquear una IP sin verificar si hay un administrador legítimo usando VPN podría cortar el acceso remoto de emergencia del equipo de TI, dejando la infraestructura sin soporte durante un incidente real.'
);

// playbook - option c
addConsequenceAfter(
  'La rotación de credenciales es el paso 4 del protocolo. Primero necesitás confirmar que es un incidente real antes de tomar medidas que afecten al usuario.',
  'En un SOC real, forzar rotación de credenciales sin confirmar el incidente puede interrumpir procesos automatizados que dependen de esas credenciales, causando caídas en servicios de producción.'
);

// playbook - option d
addConsequenceAfter(
  'Esperar no es una opción cuando hay un compromiso activo. El ticket se crea, pero la respuesta inmediata es verificar y contener, no sentarse a esperar.',
  'En un SOC real, esperar con un compromiso activo permite que el atacante complete su objetivo: robar datos, instalar backdoors, o moverse lateralmente. Cada minuto de inacción aumenta el daño.'
);

// classify - option a
addConsequenceAfter(
  'No hay forma de justificar esto como falso positivo. IP externa desconocida + brute force + root access + lectura de /etc/shadow a las 3 AM = compromiso confirmado.',
  'En un SOC real, marcar esto como falso positivo significaría ignorar un compromiso activo. El atacante seguiría dentro del servidor robando datos y moviéndose lateralmente durante horas o días antes de que alguien lo detecte.'
);

// classify - option c
addConsequenceAfter(
  'Con los indicadores disponibles (IP externa, acesso root, /etc/shadow, intento de conexión a DB), ya hay suficiente evidencia para clasificar como positivo. Más investigación se hace DURANTE la fase de contención, no para decidir si es real.',
  'En un SOC real, demorar la clasificación bajo el pretexto de "más investigación" permite que el atacante siga activo. La clasificación no es el momento de dudar cuando la evidencia es clara.'
);

// writeup - option a
addConsequenceAfter(
  'Demasiado vago. No menciona IP, timing, impacto ni evidencia. Un reporte así no sirve para escalamiento, forensic ni auditoría.',
  'En un SOC real, un reporte así de vago genera confusión: el equipo de contención no sabe qué servidor bloquear, el management no entiende la gravedad, y en auditoría no hay evidencia documentada del incidente.'
);

// writeup - option c
addConsequenceAfter(
  "Lenguaje informal y sin datos técnicos. 'Hackeo' no es un término profesional. Falta IP, timestamp, servidor específico, archivos accionados, y plan de acción concreto.",
  'En un SOC real, un reporte sin datos técnicos no puede usarse para forensic, legal o auditoría. Si el incidente escala a nivel regulatorio, este reporte no sirve como evidencia documental.'
);

// return - option a
addConsequenceAfter(
  'Nunca se cierra un caso sin verificar que las acciones de contención se ejecutaron. El cierre requiere evidencia de remediación.',
  'En un SOC real, cerrar un caso sin verificar remediación significa que el atacante podría seguir teniendo acceso. El incidente se reabrirá días después con mayor impacto cuando otros lo detecten.'
);

// return - option c
addConsequenceAfter(
  'Como SOC analyst, no deberías ejecutar cambios de infraestructura directamente. Eso es responsabilidad del SysAdmin/NetOps. Tu rol es reportar y escalar.',
  'En un SOC real, ejecutar cambios de infraestructura sin autorización puede causar downtime accidental y sin audit trail. Si el bloqueo falla o afecta servicios legítimos, no hay documentación de quién lo hizo ni por qué.'
);

// ===== SCENARIO 2: dns-tunneling =====

// identify - option a
addConsequenceAfter(
  'Los subdominios son strings base64 (aGVsbG8=, cGF5bG9hZA==, etc.), todos apuntan al mismo IP (198.51.100.23) con TTL idéntico (30s). Un CDN real tiene múltiples IPs, TTL variables y subdominios legítimos, no strings codificados.',
  'En un SOC real, ignorar DNS tunneling como "tráfico normal" permite que el atacante siga exfiltrando datos. Cada query DNS es un paquete de información robada: credenciales, tokens, datos financieros.'
);

// identify - option c
addConsequenceAfter(
  'El volumen no es el problema, sino el CONTENIDO. Cada subdominio lleva datos exfiltrados. Con 28 consultas ya se extrajeron: tokens, credenciales, datos de tarjetas de crédito, secrets de API. El daño ya está hecho.',
  'En un SOC real, subestimar el volumen de exfiltración porque "solo son 28 consultas" ignora que cada consulta puede contener cientos de bytes de datos robados. 28 consultas de ~200 bytes = ~5.6KB de datos sensibles filtrados.'
);

// identify - option d
addConsequenceAfter(
  'El cache poisoning implica respuestas DNS falsas. Aquí el servidor está GENERANDO las consultas (queries salientes), no recibiendo respuestas falsas. El tráfico es saliente desde srv-app-01 hacia evil-cdn.com.',
  'En un SOC real, confundir DNS tunneling con cache poisoning lleva a bloquear la resolución DNS incorrecta mientras el atacante sigue exfiltrando datos por un canal completamente diferente.'
);

// assign - option a (Lucía)
addConsequenceAfter(
  'Lucía desarrolla en srv-app-01 pero no tiene permisos de SysAdmin. Podría ayudar a entender qué procesos de la app podrían haber generado el tráfico, pero no es la primera línea de respuesta.',
  'En un SOC real, asignar el incidente a un desarrollador que no tiene experiencia en seguridad retrasa la contención. Ella podría Help entender la aplicación, pero no tiene las herramientas ni el conocimiento para bloquear el dominio o aislar el servidor.'
);

// assign - option c (Carlos)
addConsequenceAfter(
  'Carlos no tiene acceso técnico a srv-app-01 ni conocimiento de infraestructura. Su involvement sería solo si se confirma que datos financieros fueron exfiltrados.',
  'En un SOC real, asignar un incidente de exfiltración a un analista financiero sin acceso técnico genera cuellos de botella. Carlos no puede bloquear el dominio ni revisar procesos del servidor.'
);

// assign - option d (marketing)
addConsequenceAfter(
  'El marketing no tiene ninguna relación con la infraestructura técnica ni la seguridad de servidores.',
  'En un SOC real, asignar un incidente de seguridad al equipo de marketing es un error que refleja falta de comprensión de roles. El marketing no puede ejecutar ninguna acción de contención.'
);

// playbook - option a (Apagar servidor)
addConsequenceAfter(
  'Apagar srv-app-01 cortaría el servicio de pagos. El playbook prioriza contención quirúrgica (bloquear el dominio DNS) antes de medidas drásticas que afecten la disponibilidad.',
  'En un SOC real, apagar un servidor de pagos en producción causa pérdidas financieras directas por cada minuto de downtime, plus daño reputacional con clientes que dependen del servicio.'
);

// playbook - option c (Ignorar)
addConsequenceAfter(
  '28 consultas que contienen tokens, datos de tarjetas y credenciales NO es ruido. Cada query es un paquete de datos robados.',
  'En un SOC real, ignorar exfiltración activa porque "no es significativo" permite que el atacante robe suficientes datos para causar brechas de datos que requieren notificación regulatoria a miles de clientes.'
);

// playbook - option d (Cambiar contraseña root)
addConsequenceAfter(
  'La contraseña de root no tiene relación directa con el DNS tunneling. El malware/exfiltrador tiene su propio mecanismo de comunicación. Cambiar la contraseña no detiene la fuga.',
  'En un SOC real, cambiar la contraseña de root sin aislar el dominio malicioso es como cerrar la puerta principal mientras el ladrón sale por la ventana. La exfiltración continúa por DNS mientras "solucionás" un problema que no existe.'
);

// classify - option a (Falso positivo)
addConsequenceAfter(
  'Ninguna librería legítima exfiltra datos vía DNS subdominios codificados en base64 hacia un dominio no registrado. Esto es activity maliciosa confirmada.',
  'En un SOC real, clasificar exfiltración vía DNS tunneling como falso positivo permite que el atacante robe terabytes de datos sin ser detectado. Los reguladores multan a las empresas que ignoran evidencia clara de brechas.'
);

// classify - option c (Requiere más análisis)
addConsequenceAfter(
  "Ya decodificaste base64 en los subdominios: 'card=45...', 'master_key', 'session_token', 'username=admin'. La evidencia de datos sensibles es clara.",
  'En un SOC real, pedir "más análisis" cuando la evidencia es clara retrasa la notificación a reguladores. El GDPR y similares requieren notificación dentro de 72 horas de confirmar la brecha.'
);

// writeup - option a (vago)
addConsequenceAfter(
  'Sin datos técnicos, sin IP de destino, sin descripción del patrón, sin impacto. Un reporte vacío que no permite ni escalamiento ni forense.',
  'En un SOC real, un reporte sin datos técnicos no permite al equipo de contención ejecutar acciones. No saben qué dominio bloquear, qué servidor revisar, ni qué datos pudieron ser comprometidos.'
);

// writeup - option c (alarmista)
addConsequenceAfter(
  "Lenguaje alarmista sin datos. 'Hackeado' no es descriptivo. 'Apagarlo' no es una acción de contención apropiada para un servidor de pagos en producción.",
  'En un SOC real, reportes alarmistas sin datos generan pánico en management que lleva a decisiones erróneas: apagar servidores críticos, contactar clientes innecesariamente, o ignorar la evidencia real porque "exageran".'
);

// return - option a
addConsequenceAfter(
  'Un reporte sin seguimiento no sirve. Necesitás verificar que las acciones de contención se ejecuten y que el forense inicie.',
  'En un SOC real, no dar seguimiento a exfiltración activa significa que el dominio malicioso sigue resolviendo y los datos siguen saliendo. Cada hora sin bloquear = más datos robados.'
);

// return - option c (Borrar logs)
addConsequenceAfter(
  'Destruir evidencia es una falta grave. Los logs son evidencia forense y necesarios para entender el alcance del compromiso. Nunca se borran logs de un incidente.',
  'En un SOC real, borrar logs de un incidente de exfiltración destruye la única evidencia de qué datos fueron robados. Sin logs, no puedes determinar qué clientes fueron afectados ni cumplir con las obligaciones de notificación regulatoria.'
);

// ===== SCENARIO 3: lateral-movement =====

// identify - option a (solo 11-13)
addConsequenceAfter(
  'Estás capturando el vector de ataque pero perdiendo la evidencia de lo que pasó después: el mapeo de shares SMB, la ejecución del script, el dump de la DB, la creación del zip, la exfiltración externa, y la persistencia.',
  'En un SOC real, reportar solo el PowerShell encoded sin la evidencia de post-explotación hace que el equipo subestime la gravedad. No sabrían que ya se robó la base de datos completa y se instaló persistencia.'
);

// identify - option c (todas las líneas)
addConsequenceAfter(
  'Las líneas 1-2, 3-10, 26-40 incluyen deploy de Martin, health checks, activity de Lucía, Sofía, Carlos, y otros. Son activity normal del día. Incluirlas ensucia la evidencia y dificulta el análisis forense.',
  'En un SOC real, entregar 55 líneas de "evidencia" donde 30 son tráfico legítimo hace que el equipo de contención pierda horas revisando activity normal mientras el atacante sigue activo.'
);

// identify - option d (solo CPU spike)
addConsequenceAfter(
  'El CPU spike es un síntoma, no la causa. Sin ver el origen (power-shell en ws-carlos), el método (SMB/WMI), la exfiltración (zip + HTTPS), y la persistencia, no podés construir el caso.',
  'En un SOC real, tratar el CPU spike como el incidente principal lleva a investigar srv-db-01 cuando el punto de origen es ws-carlos. El equipo perdería tiempo revisando el servidor equivocado.'
);

// assign - option a (Solo Diego)
addConsequenceAfter(
  'El PB-IR-002 clasifica esto como NIVEL 3: exfiltración de datos + movimiento lateral a DB + impacto en pagos. Diego puede iniciar la respuesta, pero esto requiere escalamiento inmediato a nivel superior.',
  'En un SOC real, intentar manejar un incidente nivel 3 solo con el SOC L2 sobrepasa sus capacidades. La contención requiere DevOps, el escalamiento requiere CISO, y la notificación legal requiere DPO.'
);

// assign - option c (Martín solo)
addConsequenceAfter(
  'Apagar no es contención inteligente. Se necesita forense en vivo (imagen de RAM) antes de apagar. Martín sería útil para la contención técnica, pero bajo dirección del equipo de seguridad.',
  'En un SOC real, apagar la máquina sin imagen forense destruye evidencia en memoria RAM que contiene: contraseñas en claro, llaves de cifrado, tokens de sesión, y la tabla de conexiones del malware.'
);

// assign - option d (Sofía)
addConsequenceAfter(
  'Sofía no es parte de la cadena de respuesta técnica. Su rol es comunicacional y estratégico, no táctico. Ella se involucra después del escalamiento al CISO.',
  'En un SOC real, delegar decisiones técnicas de contención a un gerente no técnico resulta en demoras mientras busca aprobación. Cada minuto de demora = más datos exfiltrados y más persistencia instalada.'
);

// playbook - option a (Apagar)
addConsequenceAfter(
  'El playbook indica obtener imagen forense ANTES de apagar. Apagar destruye evidencia en memoria (RAM) que es crucial para entender el alcance del compromiso.',
  'En un SOC real, apagar una workstation comprometida sin forense destruye la memoria volátil que contiene: el keylogger activo, las conexiones C2 en curso, las credenciales robadas en memoria, y los scripts de persistencia.'
);

// playbook - option c (Cambiar contraseña)
addConsequenceAfter(
  'Cambiar la contraseña no corta la conexión si el atacante ya tiene persistencia en la máquina. La workstation está comprometida y ejecutando código malicioso. Aislar es la primera prioridad.',
  'En un SOC real, cambiar la contraseña sin aislar la workstation es inútil: el keylogger captura la nueva contraseña inmediatamente, y el atacante sigue controlando la máquina.'
);

// playbook - option d (Bloquear IP C2)
addConsequenceAfter(
  'Bloquear la IP de C2 es importante, pero es el paso 3 del protocolo. Primero se aisla la máquina comprometida (paso 1) y luego se busca el alcance (paso 2). Si aislás primero, cortás la exfiltración inmediatamente.',
  'En un SOC real, bloquear la IP de C2 sin aislar la workstation permite que el malware siga exfiltrando por otros medios: DNS tunneling, HTTPS a otros dominios, o incluso steganografía en imágenes.'
);

// classify - option a (Falso positivo)
addConsequenceAfter(
  'Carlos es Analista Financiero. No tiene razón técnica para ejecutar PowerShell encoded, conectarse por SMB a srv-db-01, dumphear PostgreSQL, crear un zip de 847MB, y subirlo por HTTPS a una IP externa. Esto NO es su trabajo.',
  'En un SOC real, clasificar movimiento lateral con exfiltración como "trabajo normal" de un financiero es un error catastrófico. La base de datos completa de clientes está comprometida y el atacante tiene persistencia en la red.'
);

// classify - option c (Investigación)
addConsequenceAfter(
  'Una migración no usa PowerShell encoded, no hace dump de DBs, no crea zips de 847MB, no sube datos a IPs externas, y no crea usuarios backdoor. Los indicadores son claros: esto es malicioso.',
  'En un SOC real, dudar entre "ataque" y "migración" cuando hay PowerShell encoded + dump de DB + exfiltración + backdoors refleja falta de experiencia. Cada minuto de duda = más datos robados.'
);

// writeup - option a (vago)
addConsequenceAfter(
  'Sin datos técnicos, sin timeline, sin IOC, sin acciones concretas. Un reporte así genera más preguntas que respuestas.',
  'En un SOC real, un reporte sin IOC no permite bloquear indicadores de compromiso en otros sistemas. Sin timeline, no se puede determinar cuándo empezó el ataque ni qué datos se perdieron en cada fase.'
);

// writeup - option c (informal)
addConsequenceAfter(
  "Sin specifics, sin classification de impacto, sin IOC. 'Cambiar todas las contraseñas' no es una acción de contención — es remediación genérica que no aborda la raíz del problema.",
  'En un SOC real, "cambiar todas las contraseñas" sin identificar qué credenciales específicamente están comprometidas es inútil: si no cambias la que usa el malware, el atacante sigue teniendo acceso.'
);

// return - option a (Cerrar)
addConsequenceAfter(
  'Un incidente nivel 3 nunca se cierra con solo documentar. Hay que seguir monitoreando: ¿hay más workstations comprometidas? ¿el atacante tiene persistencia? ¿hay más exfiltración en curso?',
  'En un SOC real, cerrar un incidente nivel 3 sin verificar remediación completa es negligencia. El atacante podría tener backdoors en srv-db-01, acceso SSH persistente, y cron jobs que recomprometan el sistema cada 24 horas.'
);

// return - option c (Ir a revisar personalmente)
addConsequenceAfter(
  'Como SOC analyst, no deberías manipular evidencia físicamente. Eso es trabajo del equipo forense. Tu rol es análisis de logs, clasificación, y monitoreo continuo.',
  'En un SOC real, tocar la workstation físicamente sin protocolo forense puede alterar timestamps de archivos, contaminar evidencia de huellas digitales, y comprometer la cadena de custodia para uso legal.'
);

fs.writeFileSync(path, content);
console.log('All consequence edits applied successfully');
console.log('File length:', fs.readFileSync(path, 'utf8').split('\n').length);
