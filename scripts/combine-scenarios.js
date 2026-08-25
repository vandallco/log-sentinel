const fs = require('fs');
const path = 'C:/Users/User/Documents/Default Project/lib/scenarios.ts';
let content = fs.readFileSync(path, 'utf8');

// Remove trailing ]; and replace with comma
content = content.replace(/\];\s*$/, ',');

// Load scenarios
const scenario4 = require('./scenario4.js');
const scenario5 = require('./scenario5.js');
const scenario6 = require('./scenario6.js');

// Append all scenarios
content += scenario4 + '\n' + scenario5 + '\n' + scenario6 + '\n];\n';

fs.writeFileSync(path, content);
console.log('All 3 new scenarios appended successfully');
console.log('Total file lines:', fs.readFileSync(path, 'utf8').split('\n').length);
