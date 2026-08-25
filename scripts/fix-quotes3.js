const fs = require('fs');
const path = 'C:/Users/User/Documents/Default Project/lib/scenarios.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace all unescaped inner double quotes in string values
// Strategy: For each line, if it's a string value line, find and escape inner quotes

// Known problematic patterns - replace them directly
const fixes = [
  // DNS tunneling scenario
  ['como "tráfico normal" permite', 'como \\"tráfico normal\\" permite'],
  ['como "tráfico normal" es un', 'como \\"tráfico normal\\" es un'],
  
  // Lateral movement scenario
  ['"ataque" o "migración"', '\\"ataque\\" o \\"migración\\"'],
  ['como "error humano sin impacto"', 'como \\"error humano sin impacto\\"'],
  ['como "copia de seguridad"', 'como \\"copia de seguridad\\"'],
  ['"error de configuración"', '\\"error de configuración\\"'],
  
  // Insider threat scenario
  ['"trabajo normal" de un financiero', '\\"trabajo normal\\" de un financiero'],
  
  // Brute force scenario
  ['pretexto de "más investigación"', 'pretexto de \\"más investigación\\"'],
  
  // Writeup options
  ["'hackeo' no es un término", "\\'hackeo\\' no es un término"],
  ["'Hackeado' no es descriptivo", "\\'Hackeado\\' no es descriptivo"],
  ["'Apagarlo' no es una", "\\'Apagarlo\\' no es una"],
  ["'cambiar todas las contraseñas'", "\\'cambiar todas las contraseñas\\'"],
  ["'Svc-backdoor'", "\\'svc-backdoor\\'"],
  ["'svc-backdoor'", "\\'svc-backdoor\\'"],
  ["'mejor antivirus'", "\\'mejor antivirus\\'"],
  ["'ruido'", "\\'ruido\\'"],
  ["'Hackeado'", "\\'Hackeado\\'"],
];

for (const [find, replace] of fixes) {
  content = content.replace(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
}

fs.writeFileSync(path, content);
console.log('Targeted quote fixes applied');
console.log('File lines:', content.split('\n').length);
