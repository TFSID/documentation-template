const fs = require('fs');
const path = require('path');

// Task categorization mapping
const taskCategories = {
    // Frontend Tasks (FE)
    'REQ-001': 'FE', 'REQ-004': 'FE', 'REQ-005': 'FE', 'REQ-008': 'FE',
    'UMR-001': 'FE', 'UMR-002': 'FE', 'UMR-011': 'FE', 'UMR-013': 'FE', 'UMR-014': 'FE',
    'HAJ-002': 'FE', 'HAJ-011': 'FE', 'HAJ-013': 'FE', 'HAJ-016': 'FE',
    'EDU-001': 'FE', 'EDU-003': 'FE', 'EDU-004': 'FE', 'EDU-010': 'FE', 'EDU-011': 'FE', 'EDU-014': 'FE', 'EDU-015': 'FE',
    'PROF-001': 'FE', 'PROF-004': 'FE',
    'JAMA-006': 'FE',
    'IDEN-004': 'FE',

    // Backend Tasks (BE)
    'REQ-002': 'BE', 'REQ-003': 'BE', 'REQ-006': 'BE', 'REQ-007': 'BE', 'REQ-009': 'BE',
    'UMR-003': 'BE', 'UMR-004': 'BE', 'UMR-005': 'BE', 'UMR-006': 'BE', 'UMR-007': 'BE', 'UMR-008': 'BE', 'UMR-009': 'BE', 'UMR-010': 'BE', 'UMR-012': 'BE',
    'HAJ-001': 'BE', 'HAJ-003': 'BE', 'HAJ-004': 'BE', 'HAJ-005': 'BE', 'HAJ-006': 'BE', 'HAJ-007': 'BE', 'HAJ-008': 'BE', 'HAJ-009': 'BE', 'HAJ-010': 'BE', 'HAJ-012': 'BE', 'HAJ-014': 'BE', 'HAJ-015': 'BE',
    'EDU-002': 'BE', 'EDU-005': 'BE', 'EDU-006': 'BE', 'EDU-007': 'BE', 'EDU-008': 'BE', 'EDU-009': 'BE', 'EDU-012': 'BE', 'EDU-013': 'BE', 'EDU-016': 'BE',
    'PROF-002': 'BE', 'PROF-003': 'BE',
    'JAMA-001': 'BE', 'JAMA-002': 'BE', 'JAMA-003': 'BE', 'JAMA-004': 'BE', 'JAMA-005': 'BE', 'JAMA-007': 'BE',
    'VISA-001': 'BE', 'VISA-002': 'BE', 'VISA-003': 'BE', 'VISA-004': 'BE', 'VISA-005': 'BE', 'VISA-006': 'BE', 'VISA-007': 'BE', 'VISA-008': 'BE',
    'IDEN-001': 'BE', 'IDEN-002': 'BE', 'IDEN-003': 'BE', 'IDEN-005': 'BE', 'IDEN-006': 'BE',

    // Project Management Tasks (PM)
    'REQ-010': 'PM'
};

// Create the three category folders
const directories = ['FE_Task_documentations', 'BE_Task_documentations', 'PM_Task_documentations'];

directories.forEach(dir => {
    const dirPath = path.join(__dirname, 'task_documentation', dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
});

// Get all task markdown files (exclude summary report)
const taskDocDir = path.join(__dirname, 'task_documentation');
const files = fs.readdirSync(taskDocDir)
    .filter(file => file.startsWith('REQ-') || file.startsWith('UMR-') || file.startsWith('HAJ-') || 
                   file.startsWith('EDU-') || file.startsWith('PROF-') || file.startsWith('JAMA-') || 
                   file.startsWith('VISA-') || file.startsWith('IDEN-'));

console.log(`Found ${files.length} task files to categorize`);

let feCount = 0, beCount = 0, pmCount = 0, unmappedCount = 0;

// Move files to appropriate directories
files.forEach(file => {
    const taskId = file.replace('.md', '');
    const category = taskCategories[taskId];
    
    if (category === 'FE') {
        const sourcePath = path.join(taskDocDir, file);
        const targetPath = path.join(taskDocDir, 'FE_Task_documentations', file);
        fs.renameSync(sourcePath, targetPath);
        feCount++;
        console.log(`Moved ${file} → FE_Task_documentations`);
    } else if (category === 'BE') {
        const sourcePath = path.join(taskDocDir, file);
        const targetPath = path.join(taskDocDir, 'BE_Task_documentations', file);
        fs.renameSync(sourcePath, targetPath);
        beCount++;
        console.log(`Moved ${file} → BE_Task_documentations`);
    } else if (category === 'PM') {
        const sourcePath = path.join(taskDocDir, file);
        const targetPath = path.join(taskDocDir, 'PM_Task_documentations', file);
        fs.renameSync(sourcePath, targetPath);
        pmCount++;
        console.log(`Moved ${file} → PM_Task_documentations`);
    } else {
        unmappedCount++;
        console.log(`WARNING: No category mapping found for ${file}`);
    }
});

console.log('\n=== CATEGORIZATION SUMMARY ===');
console.log(`Frontend (FE): ${feCount} files`);
console.log(`Backend (BE): ${beCount} files`);
console.log(`Project Management (PM): ${pmCount} files`);
console.log(`Unmapped: ${unmappedCount} files`);
console.log(`Total: ${feCount + beCount + pmCount + unmappedCount} files`);

// Create category summaries
const createCategorySummary = (categoryName, files) => {
    let content = `# ${categoryName} - Task Documentation Summary\n\n`;
    content += `Total Tasks: ${files.length}\n\n`;
    
    // Group by module
    const moduleGroups = {};
    files.forEach(file => {
        const module = file.split('-')[0];
        if (!moduleGroups[module]) moduleGroups[module] = [];
        moduleGroups[module].push(file);
    });
    
    content += `## Module Breakdown\n`;
    Object.keys(moduleGroups).sort().forEach(module => {
        content += `- **${module}**: ${moduleGroups[module].length} tasks\n`;
        moduleGroups[module].sort().forEach(file => {
            content += `  - ${file}\n`;
        });
    });
    
    return content;
};

// Create summaries for each category
const feDir = path.join(taskDocDir, 'FE_Task_documentations');
const beDir = path.join(taskDocDir, 'BE_Task_documentations');
const pmDir = path.join(taskDocDir, 'PM_Task_documentations');

const feFiles = fs.existsSync(feDir) ? fs.readdirSync(feDir).filter(f => f.endsWith('.md')) : [];
const beFiles = fs.existsSync(beDir) ? fs.readdirSync(beDir).filter(f => f.endsWith('.md')) : [];
const pmFiles = fs.existsSync(pmDir) ? fs.readdirSync(pmDir).filter(f => f.endsWith('.md')) : [];

if (feFiles.length > 0) {
    const feSummary = createCategorySummary('Frontend Tasks', feFiles);
    fs.writeFileSync(path.join(feDir, '00_FE_SUMMARY.md'), feSummary);
    console.log('Created FE_Task_documentations/00_FE_SUMMARY.md');
}

if (beFiles.length > 0) {
    const beSummary = createCategorySummary('Backend Tasks', beFiles);
    fs.writeFileSync(path.join(beDir, '00_BE_SUMMARY.md'), beSummary);
    console.log('Created BE_Task_documentations/00_BE_SUMMARY.md');
}

if (pmFiles.length > 0) {
    const pmSummary = createCategorySummary('Project Management Tasks', pmFiles);
    fs.writeFileSync(path.join(pmDir, '00_PM_SUMMARY.md'), pmSummary);
    console.log('Created PM_Task_documentations/00_PM_SUMMARY.md');
}

console.log('\n=== CATEGORIZATION COMPLETE ===');
