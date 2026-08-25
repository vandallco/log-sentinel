const fs = require('fs');
const path = 'C:/Users/User/Documents/Default Project/lib/scenarios.ts';
let content = fs.readFileSync(path, 'utf8');

// More comprehensive: find all lines that look like string property values
// and have unescaped inner double quotes
const lines = content.split('\n');
const fixed = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Check if line has a string property value with potential inner quotes
  // Pattern: something: "value with "inner quotes" here"
  const propMatch = line.match(/^(\s*\w+:\s*)"(.*)"(,?)$/);
  if (propMatch) {
    const [_, prefix, value, comma] = propMatch;
    // Check if value has unescaped double quotes
    if (value.includes('"') && !value.replace(/\\"/g, '').includes('"')) {
      // Has unescaped inner quotes - escape them
      const fixedValue = value.replace(/"/g, '\\"');
      line = prefix + '"' + fixedValue + '"' + comma;
    }
  }
  
  fixed.push(line);
}

content = fixed.join('\n');
fs.writeFileSync(path, content);
console.log('Comprehensive quote fix applied');
console.log('File lines:', content.split('\n').length);
