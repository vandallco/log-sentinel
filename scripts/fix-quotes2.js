const fs = require('fs');
const path = 'C:/Users/User/Documents/Default Project/lib/scenarios.ts';
let content = fs.readFileSync(path, 'utf8');

// Find all double-quoted strings and escape any inner double quotes
// This regex matches: "content" where content may contain unescaped quotes
// Strategy: find all lines that start with spaces + quote and have internal quotes

const lines = content.split('\n');
const fixedLines = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Check if this is a string value line (starts with spaces and has quoted value)
  const match = line.match(/^(\s+)((?:explanation|consequence|label|description|hint|summary|content|title|message|source|alertSource|alertTime|severity|id|category|timestamp|flagged):?\s*)"(.*)"(.*)$/);
  
  if (match) {
    const [_, indent, key, inner, trailing] = match;
    // Check if inner content has unescaped double quotes
    if (inner.includes('"') && !inner.includes('\\"')) {
      // Escape inner quotes
      const fixedInner = inner.replace(/"/g, '\\"');
      line = indent + key + '"' + fixedInner + '"' + trailing;
    }
  }
  
  fixedLines.push(line);
}

content = fixedLines.join('\n');
fs.writeFileSync(path, content);
console.log('Thorough quote fix applied');
console.log('File lines:', content.split('\n').length);
