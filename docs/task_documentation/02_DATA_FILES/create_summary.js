const fs = require('fs');
const path = require('path');

const outputDir = './task_documentation';
const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.md')).sort();

console.log('Task Documentation Generation Complete!');
console.log('=========================================');
console.log(`Total files generated: ${files.length}`);

// Count files by module
const moduleCount = {};
files.forEach(file => {
  if (file.startsWith('00_')) return;
  
  const taskId = file.replace('.md', '');
  const module = taskId.split('-')[0];
  moduleCount[module] = (moduleCount[module] || 0) + 1;
});

console.log('\nFiles by Module:');
Object.entries(moduleCount).forEach(([module, count]) => {
  console.log(`- ${module}: ${count} tasks`);
});

console.log('\nAll Generated Files:');
files.forEach(file => {
  console.log(`- ${file}`);
});

const summary = `# Task Documentation Summary

## Generated Files: ${files.length} task documentation files

## Distribution by Module
${Object.entries(moduleCount).map(([module, count]) => `- **${module}**: ${count} tasks`).join('\n')}

## Complete File List
${files.map(f => `- ${f}`).join('\n')}

## Usage
Each markdown file contains:
- Task description and objectives
- Step-by-step implementation guide
- Success criteria and requirements
- Technology stack recommendations
- Timeline and dependencies
- Next steps and workflow

Generated on: ${new Date().toISOString()}
By: MiniMax Agent

## Folder Structure
All documentation is in \`task_documentation/\` directory
`;

fs.writeFileSync('task_documentation/00_SUMMARY_REPORT.md', summary, 'utf8');
console.log('\n✓ Summary report generated: 00_SUMMARY_REPORT.md');
console.log('\n🎉 Task documentation generation completed successfully!');