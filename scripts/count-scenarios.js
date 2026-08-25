const fs = require('fs');
const content = fs.readFileSync('C:/Users/User/Documents/Default Project/lib/scenarios.ts', 'utf8');
const scenarioIds = content.match(/^\s{4}id: "[^"]+",$/gm);
console.log('Total scenario count:', scenarioIds ? scenarioIds.length : 0);
if (scenarioIds) scenarioIds.forEach(s => console.log(' ', s.trim()));
