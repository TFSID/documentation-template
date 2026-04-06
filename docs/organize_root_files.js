const fs = require('fs');
const path = require('path');

// Define categories for root files
const categories = {
    '01_GENERATION_SCRIPTS': ['generate_*.js'],
    '02_DATA_FILES': ['*.csv', '*.json'],
    '03_DOCUMENTATION': ['*.md'],
    '04_CONFIGURATION': ['workspace.json'],
    '05_LOGS': ['*.log']
};

// Create directories in task_documentation
const taskDocDir = path.join(__dirname, 'task_documentation');
Object.keys(categories).forEach(category => {
    const dirPath = path.join(taskDocDir, category);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${category}`);
    }
});

// Files to exclude from moving
const excludeFiles = [
    'workspace.json',
    'browser/',
    'task_documentation/',
    'tmp/'
];

// Get all files in root directory
const rootDir = __dirname;
const rootFiles = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(item => item.isFile()) // Only files, not directories
    .map(item => item.name);

console.log(`Found ${rootFiles.length} files in root directory`);

// Move files to appropriate categories
let movedCount = 0;

rootFiles.forEach(fileName => {
    // Skip excluded files
    if (excludeFiles.includes(fileName)) {
        console.log(`Skipped: ${fileName} (excluded)`);
        return;
    }

    let targetCategory = null;
    let targetDir = null;

    // Check each category
    for (const [category, patterns] of Object.entries(categories)) {
        for (const pattern of patterns) {
            const regex = new RegExp(pattern.replace('*', '.*'));
            if (regex.test(fileName)) {
                targetCategory = category;
                break;
            }
        }
        if (targetCategory) break;
    }

    // If no category matched, put in DATA_FILES as default
    if (!targetCategory) {
        targetCategory = '02_DATA_FILES';
    }

    targetDir = path.join(taskDocDir, targetCategory);
    
    const sourcePath = path.join(rootDir, fileName);
    const targetPath = path.join(targetDir, fileName);

    try {
        fs.renameSync(sourcePath, targetPath);
        movedCount++;
        console.log(`Moved ${fileName} → ${targetCategory}/`);
    } catch (error) {
        console.log(`Error moving ${fileName}: ${error.message}`);
    }
});

console.log(`\n=== MOVE SUMMARY ===`);
console.log(`Total files processed: ${rootFiles.length}`);
console.log(`Files moved: ${movedCount}`);

// Create category index files
const createCategoryIndex = (categoryName, files) => {
    let content = `# ${categoryName.replace(/_/g, ' ')}\n\n`;
    content += `Total Files: ${files.length}\n\n`;
    
    files.forEach(file => {
        const fileType = path.extname(file);
        const stats = fs.statSync(path.join(taskDocDir, categoryName, file));
        const size = (stats.size / 1024).toFixed(1);
        content += `- **${file}** (${fileType.toUpperCase()}) - ${size}KB\n`;
    });
    
    return content;
};

// Create indexes for each category
Object.keys(categories).forEach(category => {
    const categoryPath = path.join(taskDocDir, category);
    if (fs.existsSync(categoryPath)) {
        const files = fs.readdirSync(categoryPath).filter(f => !f.startsWith('00_') && !f.startsWith('README'));
        if (files.length > 0) {
            const indexContent = createCategoryIndex(category, files);
            const indexPath = path.join(categoryPath, '00_INDEX.md');
            fs.writeFileSync(indexPath, indexContent);
            console.log(`Created index: ${category}/00_INDEX.md`);
        }
    }
});

// Create a comprehensive structure summary
let structureContent = `# PROJECT STRUCTURE SUMMARY\n\n`;
structureContent += `Generated: ${new Date().toISOString()}\n\n`;
structureContent += `## Root Directory (workspace/)\n`;
structureContent += `After organization, the root directory contains only essential system folders:\n`;
structureContent += `- `browser/` - Browser automation files\n`;
structureContent += `- `task_documentation/` - All project documentation and scripts\n`;
structureContent += `- `tmp/` - Temporary files\n\n`;

structureContent += `## task_documentation/ Structure\n\n`;

// Add structure for each category
Object.keys(categories).forEach(category => {
    const categoryPath = path.join(taskDocDir, category);
    if (fs.existsSync(categoryPath)) {
        const files = fs.readdirSync(categoryPath);
        structureContent += `### ${category.replace(/_/g, ' ')}/\n`;
        structureContent += `Files: ${files.length}\n\n`;
        if (files.length > 0) {
            files.forEach(file => {
                structureContent += `- ${file}\n`;
            });
        }
        structureContent += '\n';
    }
});

// Add task documentation categories
structureContent += `### Categorized Task Documentation\n\n`;
structureContent += `- **FE_Task_documentations/** - Frontend tasks (24 files)\n`;
structureContent += `- **BE_Task_documentations/** - Backend tasks (56 files)\n`;
structureContent += `- **PM_Task_documentations/** - Project Management tasks (1 file)\n\n`;

const structurePath = path.join(taskDocDir, '00_STRUCTURE_SUMMARY.md');
fs.writeFileSync(structurePath, structureContent);
console.log(`\nCreated: task_documentation/00_STRUCTURE_SUMMARY.md`);

console.log(`\n=== ORGANIZATION COMPLETE ===`);
