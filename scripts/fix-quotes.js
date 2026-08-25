const fs = require('fs');
const path = 'C:/Users/User/Documents/Default Project/lib/scenarios.ts';
let content = fs.readFileSync(path, 'utf8');

// Fix unescaped quotes in consequence strings
// Pattern: "text "inner text" more text" -> "text \"inner text\" more text"
// We need to find consequence/explanation lines that have unescaped inner quotes

// Specific fixes for known issues
content = content.replace(
  'bajo el pretexto de "más investigación"',
  'bajo el pretexto de \\"más investigación\\"'
);

content = content.replace(
  "'error humano sin impacto'",
  "\\'error humano sin impacto\\'"
);

content = content.replace(
  "'error de configuración'",
  "\\'error de configuración\\'"
);

content = content.replace(
  "'trabajo normal' de un financiero",
  "\\'trabajo normal\\' de un financiero"
);

content = content.replace(
  "'ataque' y 'migración'",
  "\\'ataque\\' y \\'migración\\'"
);

content = content.replace(
  "'hackeo' no es un término",
  "\\'hackeo\\' no es un término"
);

content = content.replace(
  "'Hackeado' no es descriptivo",
  "\\'Hackeado\\' no es descriptivo"
);

content = content.replace(
  "'cambiar todas las contraseñas'",
  "\\'cambiar todas las contraseñas\\'"
);

content = content.replace(
  "'Svc-backdoor'",
  "\\'svc-backdoor\\'"
);

content = content.replace(
  "'svc-backdoor'",
  "\\'svc-backdoor\\'"
);

// Also fix the specific line 302 issue with "más investigación" inside quotes
// and any other patterns

fs.writeFileSync(path, content);
console.log('Quote fixes applied');
console.log('File lines:', fs.readFileSync(path, 'utf8').split('\n').length);
