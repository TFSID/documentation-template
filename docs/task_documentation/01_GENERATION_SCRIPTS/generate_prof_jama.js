const fs = require('fs');
const path = require('path');

const tasksData = [
  // PROF (Profil Management) Tasks
  { id: 'PROF-001', title: 'User Profile Creation & Management', description: 'Sistem pembuatan dan manajemen profil pengguna lengkap', priority: 'High', estimated_hours: 10, phase: 'Fase 1', module: 'Profil Management' },
  { id: 'PROF-002', title: 'Profile Verification System', description: 'Sistem verifikasi profil dengan data dan dokumen pendukung', priority: 'High', estimated_hours: 8, phase: 'Fase 1', module: 'Profil Management' },
  { id: 'PROF-003', title: 'Profile Privacy & Security', description: 'Sistem privasi dan keamanan data profil pengguna', priority: 'High', estimated_hours: 8, phase: 'Fase 1', module: 'Profil Management' },
  { id: 'PROF-004', title: 'Profile Analytics Dashboard', description: 'Dashboard analytics untuk data profil pengguna', priority: 'Medium', estimated_hours: 6, phase: 'Fase 2', module: 'Profil Management' },

  // JAMA (Manajemen Jamaah) Tasks
  { id: 'JAMA-001', title: 'Jamaah Database Management', description: 'Sistem manajemen database jemaah dengan informasi lengkap', priority: 'High', estimated_hours: 12, phase: 'Fase 1', module: 'Manajemen Jamaah' },
  { id: 'JAMA-002', title: 'Family Group Management', description: 'Sistem manajemen gruppo famiglia Jamaah', priority: 'High', estimated_hours: 10, phase: 'Fase 1', module: 'Manajemen Jamaah' },
  { id: 'JAMA-003', title: 'Jamaah Status Tracking', description: 'Sistem pelacakan status Jamaah durante viaggio', priority: 'High', estimated_hours: 8, phase: 'Fase 2', module: 'Manajemen Jamaah' },
  { id: 'JAMA-004', title: 'Emergency Contact Management', description: 'Sistem manajemen kontak darurat jemaah', priority: 'High', estimated_hours: 6, phase: 'Fase 2', module: 'Manajemen Jamaah' },
  { id: 'JAMA-005', title: 'Medical Record Management', description: 'Sistem manajemen record medis jemaah', priority: 'High', estimated_hours: 10, phase: 'Fase 2', module: 'Manajemen Jamaah' },
  { id: 'JAMA-006', title: 'Jamaah Communication Portal', description: 'Portal komunikasi khusus untuk jemaah', priority: 'Medium', estimated_hours: 12, phase: 'Fase 3', module: 'Manajemen Jamaah' },
  { id: 'JAMA-007', title: 'Performance & Behavior Tracking', description: 'Sistem tracking performa dan perilaku jemaah', priority: 'Low', estimated_hours: 8, phase: 'Fase 3', module: 'Manajemen Jamaah' }
];

const generateContent = (task) => {
  const isProfileModule = task.module === 'Profil Management';
  const isJamaahModule = task.module === 'Manajemen Jamaah';
  
  const deliverables = isProfileModule ? [
    'User profile forms yang komprehensif',
    'Document upload system yang secure',
    'Verification workflow yang otomatis',
    'Privacy controls yang dapat disesuaikan',
    'Data analytics dashboard untuk insights',
    'Security implementation yang robust'
  ] : [
    'Database management system yang scalable',
    'Group coordination tools untuk keluarga',
    'Communication portal internal jemaah',
    'Emergency contact system real-time',
    'Medical record management yang aman',
    'Real-time tracking dengan GPS integration'
  ];

  const dependencies = isProfileModule ? [
    'User authentication system',
    'Document upload service',
    'Email verification service',
    'Privacy compliance tools'
  ] : [
    'User management system',
    'Real-time communication service',
    'Emergency contact system',
    'Medical record system',
    'GPS tracking service'
  ];

  const content = `# ${task.id}: ${task.title}

## Deskripsi Tugas
${task.description}

## Tujuan
- ${isProfileModule ? 'Menyediakan sistem manajemen profil yang aman dan komprehensif' : 'Mengelola data jemaah dengan sistem yang efisien dan terorganisir'}
- Memastikan ${isProfileModule ? 'keamanan data pribadi jemaah' : 'communication yang lancar antar jemaah dan keluarga'}
- ${isProfileModule ? 'Memfasilitasi verifikasi identitas yang akurat' : 'Menyediakan real-time tracking dan emergency response'}

## Deliverables
${deliverables.map(item => `- ${item}`).join('\n')}

## Step-by-Step Implementasi

### 1. Analisis Kebutuhan
- ${isProfileModule ? 'Identifikasi requirements untuk profile management dan privacy' : 'Analisis kebutuhan database jemaah dan communication system'}
- ${isProfileModule ? 'Analisis security requirements untuk data protection' : 'Perencanaan emergency response dan tracking system'}
- ${isProfileModule ? 'Perencanaan verification workflow yang automate' : 'Perencanaan family group coordination tools'}

### 2. Desain Solusi
- Merancang ${isProfileModule ? 'profile interface yang user-friendly dan secure' : 'database schema dan communication portal'}
- ${isProfileModule ? 'Mendesain privacy controls dan verification system' : 'Mendesain emergency contact hierarchy dan tracking system'}
- Perencanaan ${isProfileModule ? 'security measures dan data encryption' : 'real-time features dan mobile accessibility'}

### 3. Implementasi Teknis
- Development ${isProfileModule ? 'profile management dan verification features' : 'database management dan communication tools'}
- ${isProfileModule ? 'Integration document upload dan privacy controls' : 'Implementation emergency system dan real-time tracking'}
- ${isProfileModule ? 'Implementation security protocols dan data protection' : 'Integration GPS tracking dan mobile features'}

### 4. Testing dan Quality Assurance
- Testing ${isProfileModule ? 'profile functionality dan security measures' : 'database operations dan communication features'}
- ${isProfileModule ? 'Privacy compliance testing dan data protection validation' : 'Emergency system testing dan real-time performance'}
- ${isProfileModule ? 'User acceptance testing untuk profile management' : 'Mobile accessibility testing dan user experience validation'}

## Kriteria Keberhasilan

### Functional Requirements
- [ ] ${isProfileModule ? 'Profile creation dan management berfungsi dengan baik' : 'Database jemaah dapat diakses dan dikelola dengan efisien'}
- [ ] ${isProfileModule ? 'Verification process akurat dan aman' : 'Communication portal menyediakan fitur lengkap untuk jemaah'}
- [ ] ${isProfileModule ? 'Privacy controls dapat disesuaikan sesuai kebutuhan' : 'Emergency system merespons dengan cepat dan akurat'}
- [ ] ${isProfileModule ? 'Data analytics memberikan insights yang bermanfaat' : 'Real-time tracking memberikan informasi lokasi yang akurat'}

### Technical Requirements
- [ ] ${isProfileModule ? 'Security: AES-256 encryption untuk data sensitive' : 'Database: < 100ms query response time'}
- [ ] ${isProfileModule ? 'Privacy: GDPR dan regulations compliance' : 'Real-time: WebSocket untuk live updates'}
- [ ] ${isProfileModule ? 'Performance: Profile operations < 2 detik' : 'Mobile: Responsive design untuk semua devices'}
- [ ] ${isProfileModule ? 'Scalability: Support 10,000+ user profiles' : 'Scalability: Handle 1,000+ concurrent jemaah'}

### Security Requirements
- [ ] ${isProfileModule ? 'Data encryption at rest dan in transit' : 'Secure communication dengan end-to-end encryption'}
- [ ] ${isProfileModule ? 'Multi-factor authentication untuk profile access' : 'Role-based access control untuk sensitive information'}
- [ ] ${isProfileModule ? 'Audit logging untuk semua profile changes' : 'Emergency contact data protection'}
- [ ] ${isProfileModule ? 'Privacy controls yang dapat dikonfigurasi' : 'Medical record security dan HIPAA compliance'}

## Teknologi yang Digunakan
- **Frontend**: React.js/Vue.js dengan TypeScript
- **Backend**: Node.js/Python dengan Express.js/FastAPI
- **Database**: PostgreSQL/MongoDB
- **UI Framework**: Tailwind CSS/Ant Design
${isProfileModule ? '- **Security**: bcrypt + JWT untuk authentication' : '- **Real-time**: Socket.io + WebSocket untuk communication'}
- ${isProfileModule ? '- **File Storage**: AWS S3 + CloudFlare untuk security' : '- **Tracking**: GPS integration + Mobile SDKs'}

## Timeline: ${task.estimated_hours} jam
- Setup dan konfigurasi: ${Math.ceil(task.estimated_hours * 0.2)} jam
- Implementasi inti: ${Math.ceil(task.estimated_hours * 0.5)} jam
- Testing dan optimisasi: ${Math.ceil(task.estimated_hours * 0.2)} jam
- Dokumentasi: ${Math.ceil(task.estimated_hours * 0.1)} jam

## Dependencies
${dependencies.map(dep => `- ${dep}`).join('\n')}

## Next Steps
Setelah ${task.id} selesai, lanjut ke implementasi fitur berikutnya untuk melengkapi modul ${task.module}.

---

**Task Information:**
- **Task ID**: ${task.id}
- **Priority**: ${task.priority}
- **Estimated Hours**: ${task.estimated_hours}
- **Phase**: ${task.phase}
- **Module**: ${task.module}
`;
  
  return content;
};

console.log('Generating PROF dan JAMA task files...');
tasksData.forEach(task => {
  const content = generateContent(task);
  const filepath = path.join(__dirname, 'task_documentation', `${task.id}.md`);
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✓ Generated ${task.id}.md`);
});

console.log('Completed generating PROF dan JAMA task files!');