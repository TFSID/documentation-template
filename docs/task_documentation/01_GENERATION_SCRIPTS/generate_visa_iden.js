const fs = require('fs');
const path = require('path');

const tasksData = [
  // VISA (Manajemen Visa/Paspor) Tasks
  { id: 'VISA-001', title: 'Passport Information Management', description: 'Sistem informasi paspor dan dokumen perjalanan', priority: 'High', estimated_hours: 8, phase: 'Fase 1', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-002', title: 'Visa Application Management', description: 'Sistem aplikasi dan tracking visa Saudi Arabia', priority: 'High', estimated_hours: 12, phase: 'Fase 1', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-003', title: 'Document Expiry Monitoring', description: 'Sistem monitoring expire dokumen (paspor visa vaccination)', priority: 'High', estimated_hours: 6, phase: 'Fase 1', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-004', title: 'Vaccination Record Management', description: 'Sistem record vaccination dan health certificates', priority: 'High', estimated_hours: 8, phase: 'Fase 2', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-005', title: 'Government Integration API', description: 'Integrasi dengan sistem pemerintah untuk validasi dokumen', priority: 'Medium', estimated_hours: 15, phase: 'Fase 2', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-006', title: 'Digital Document Storage', description: 'Penyimpanan dokumen digital dengan security tinggi', priority: 'High', estimated_hours: 10, phase: 'Fase 2', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-007', title: 'Document Validation System', description: 'Sistem validasi dokumen dan verifikasi autentisitas', priority: 'Medium', estimated_hours: 12, phase: 'Fase 3', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-008', title: 'Consular Appointment Booking', description: 'Sistem booking appointment dengan konsulat', priority: 'Medium', estimated_hours: 8, phase: 'Fase 3', module: 'Manajemen Visa/Paspor' },

  // IDEN (Manajemen Identitas) Tasks
  { id: 'IDEN-001', title: 'Identity Verification System', description: 'Sistem verifikasi identitas dengan multiple methods', priority: 'High', estimated_hours: 10, phase: 'Fase 1', module: 'Manajemen Identitas' },
  { id: 'IDEN-002', title: 'Digital Identity Management', description: 'Sistem identitas digital dan authentication', priority: 'High', estimated_hours: 12, phase: 'Fase 1', module: 'Manajemen Identitas' },
  { id: 'IDEN-003', title: 'Identity Document Scanner', description: 'Scanner dokumen identitas dengan OCR dan validasi', priority: 'High', estimated_hours: 10, phase: 'Fase 2', module: 'Manajemen Identitas' },
  { id: 'IDEN-004', title: 'Facial Recognition System', description: 'Sistem facial recognition untuk verifikasi jemaah', priority: 'Medium', estimated_hours: 15, phase: 'Fase 2', module: 'Manajemen Identitas' },
  { id: 'IDEN-005', title: 'Identity Audit Trail', description: 'Audit trail untuk tracking akses dan modifikasi identitas', priority: 'Medium', estimated_hours: 8, phase: 'Fase 3', module: 'Manajemen Identitas' },
  { id: 'IDEN-006', title: 'Multi-factor Authentication', description: 'Sistem autentikasi multi-faktor untuk keamanan identitas', priority: 'High', estimated_hours: 10, phase: 'Fase 3', module: 'Manajemen Identitas' }
];

const generateContent = (task) => {
  const isVisaModule = task.module === 'Manajemen Visa/Paspor';
  const isIdentityModule = task.module === 'Manajemen Identitas';
  
  const deliverables = isVisaModule ? [
    'Document scanning system dengan OCR technology',
    'Government API integration untuk validation',
    'Expiry monitoring system yang real-time',
    'Digital storage dengan encryption tingkat tinggi',
    'Validation algorithms untuk document authenticity',
    'Appointment booking system dengan consular integration'
  ] : [
    'Identity verification algorithms yang akurat',
    'Document OCR system dengan machine learning',
    'Biometric integration untuk facial recognition',
    'Multi-factor authentication system',
    'Audit trail system yang comprehensive',
    'Security protocols untuk data protection'
  ];

  const dependencies = isVisaModule ? [
    'Government API integration dan credentials',
    'Document scanning service dengan OCR',
    'Encryption service untuk secure storage',
    'Expiry monitoring system',
    'Consular appointment API'
  ] : [
    'Biometric service provider (Face API)',
    'Document validation service',
    'Multi-factor authentication provider',
    'Security audit service',
    'Machine learning models untuk OCR'
  ];

  const content = `# ${task.id}: ${task.title}

## Deskripsi Tugas
${task.description}

## Tujuan
- ${isVisaModule ? 'Menyediakan sistem manajemen dokumen perjalanan yang aman dan efisien' : 'Memastikan verifikasi identitas yang akurat dan aman'}
- ${isVisaModule ? 'Memfasilitasi proses aplikasi visa Saudi Arabia yang streamlined' : 'Mencegah identity fraud dan unauthorized access'}
- ${isVisaModule ? 'Menyediakan monitoring otomatis untuk expiry dates dokumen' : 'Memberikan user experience yang smooth untuk identity verification'}

## Deliverables
${deliverables.map(item => `- ${item}`).join('\n')}

## Step-by-Step Implementasi

### 1. Analisis Kebutuhan
- ${isVisaModule ? 'Identifikasi requirements untuk document management dan government integration' : 'Analisis kebutuhan identity verification dan biometric technology'}
- ${isVisaModule ? 'Analisis consular system dan visa processing workflow' : 'Perencanaan security protocols dan multi-factor authentication'}
- ${isVisaModule ? 'Perencanaan expiry monitoring dan alert system' : 'Perencanaan OCR technology dan facial recognition integration'}

### 2. Desain Solusi
- Merancang ${isVisaModule ? 'document scanning dan validation interface' : 'identity verification workflow dan biometric system'}
- ${isVisaModule ? 'Mendesain government API integration dan secure storage' : 'Mendesain multi-factor authentication dan audit system'}
- Perencanaan ${isVisaModule ? 'appointment booking dan notification system' : 'security measures dan data protection protocols'}

### 3. Implementasi Teknis
- Development ${isVisaModule ? 'document scanning dan validation algorithms' : 'identity verification dan biometric features'}
- ${isVisaModule ? 'Integration government APIs dan encrypted storage' : 'Implementation OCR technology dan facial recognition'}
- ${isVisaModule ? 'Implementation expiry monitoring dan appointment system' : 'Integration multi-factor authentication dan audit trail'}

### 4. Testing dan Quality Assurance
- Testing ${isVisaModule ? 'document accuracy dan government API integration' : 'identity verification accuracy dan biometric performance'}
- ${isVisaModule ? 'Security testing untuk document storage dan transmission' : 'Security testing untuk authentication dan biometric data'}
- ${isVisaModule ? 'User acceptance testing untuk visa application process' : 'User experience testing untuk identity verification workflow'}

## Kriteria Keberhasilan

### Functional Requirements
- [ ] ${isVisaModule ? 'Document scanning akurat dengan OCR technology' : 'Identity verification dengan accuracy rate > 99%'}
- [ ] ${isVisaModule ? 'Government API integration berfungsi lancar' : 'Facial recognition system responsive dan akurat'}
- [ ] ${isVisaModule ? 'Expiry monitoring memberikan alerts tepat waktu' : 'Multi-factor authentication memberikan security optimal'}
- [ ] ${isVisaModule ? 'Appointment booking system terintegrasi dengan consular' : 'Audit trail menyediakan tracking lengkap untuk semua access'}

### Technical Requirements
- [ ] ${isVisaModule ? 'OCR accuracy: > 95% untuk document text recognition' : 'Facial recognition: < 2 detik processing time'}
- [ ] ${isVisaModule ? 'Government API response time: < 3 detik' : 'Biometric matching accuracy: > 99.5%'}
- [ ] ${isVisaModule ? 'Storage security: AES-256 encryption untuk semua documents' : 'Authentication speed: < 5 detik untuk multi-factor'}
- [ ] ${isVisaModule ? 'Scalability: Handle 1000+ document validations per hari' : 'Scalability: Support 10,000+ identity verifications per hari'}

### Security Requirements
- [ ] ${isVisaModule ? 'Document encryption at rest dan in transit (AES-256)' : 'Biometric data protection dengan industry standards'}
- [ ] ${isVisaModule ? 'Government data compliance (standar international)' : 'Multi-layer authentication dengan fallback options'}
- [ ] ${isVisaModule ? 'Audit logging untuk semua document access' : 'Complete audit trail untuk identity operations'}
- [ ] ${isVisaModule ? 'Secure API communication dengan government systems' : 'Privacy-compliant biometric data handling'}

## Teknologi yang Digunakan
- **Frontend**: React.js/Vue.js dengan TypeScript
- **Backend**: Node.js/Python dengan Express.js/FastAPI
- **Database**: PostgreSQL/MongoDB
- **UI Framework**: Tailwind CSS/Ant Design
${isVisaModule ? '- **OCR**: Tesseract.js + OpenCV untuk document scanning' : '- **Biometric**: Face-api.js + TensorFlow.js untuk recognition'}
- ${isVisaModule ? '- **Security**: AES-256 encryption + secure cloud storage' : '- **Security**: bcrypt + JWT + TOTP untuk multi-factor'}

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

console.log('Generating VISA dan IDEN task files...');
tasksData.forEach(task => {
  const content = generateContent(task);
  const filepath = path.join(__dirname, 'task_documentation', `${task.id}.md`);
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✓ Generated ${task.id}.md`);
});

console.log('Completed generating VISA dan IDEN task files!');