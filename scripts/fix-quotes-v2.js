const fs = require('fs');
const path = 'C:/Users/User/Documents/Default Project/lib/scenarios.ts';
let content = fs.readFileSync(path, 'utf8');

const lines = content.split('\n');
const fixed = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Match lines that are string values: either "prop: value" or just "value"
  // Case 1: property: "value"
  let propMatch = line.match(/^(\s*\w+:\s*)"(.*)"(,?)$/);
  // Case 2: just "value" (continuation lines)
  let valueMatch = line.match(/^(\s+)"(.*)"(,?)$/);
  
  const m = propMatch || valueMatch;
  if (m) {
    const [_, prefix, value, comma] = m;
    // Check if value has unescaped double quotes
    // First remove any already-escaped quotes, then check for remaining
    const unescaped = value.replace(/\\"/g, '');
    if (unescaped.includes('"')) {
      // Has unescaped inner quotes - escape them
      const fixedValue = value.replace(/"/g, '\\"');
      line = prefix + '"' + fixedValue + '"' + comma;
    }
  }
  
  fixed.push(line);
}

content = fixed.join('\n');
fs.writeFileSync(path, content);
console.log('Comprehensive quote fix v2 applied');
console.log('File lines:', content.split('\n').length);

// Verify no more issues
const verifyLines = content.split('\n');
let issues = 0;
for (let i = 0; i < verifyLines.length; i++) {
  const line = verifyLines[i];
  const m = line.match(/^(\s+)"(.*)"(,?)$/);
  if (m) {
    const unescaped = m[2].replace(/\\"/g, '');
    if (unescaped.includes('"')) {
      console.log('STILL UNFIXED at line', i + 1, ':', line.substring(0, 80));
      issues++;
    }
  }
}
if (issues === 0) console.log('All quotes verified clean!');
