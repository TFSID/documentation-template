const fs = require('fs');
const path = require('path');

// Data tasks dari CSV (akan diparse secara programmatic)
const tasksData = [
  // REQ (Paket Request) Tasks - sudah dibuat REQ-001, REQ-002, REQ-003
  { id: 'REQ-004', title: 'Dashboard Admin Paket Request', description: 'Buat dashboard admin untuk melihat dan memproses paket request', priority: 'High', status: 'To Do', estimated_hours: 12, phase: 'Fase 2', module: 'Paket Request' },
  { id: 'REQ-005', title: 'Sistem Notifikasi Paket Request', description: 'Implement sistem notifikasi untuk status update paket request', priority: 'Medium', status: 'To Do', estimated_hours: 8, phase: 'Fase 2', module: 'Paket Request' },
  { id: 'REQ-006', title: 'Quote Generation System', description: 'Buat sistem untuk generate quote/penawaran paket request', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 2', module: 'Paket Request' },
  { id: 'REQ-007', title: 'Approval Workflow', description: 'Implement workflow approval untuk paket request (review -> approve/reject -> revision)', priority: 'Medium', status: 'To Do', estimated_hours: 12, phase: 'Fase 3', module: 'Paket Request' },
  { id: 'REQ-008', title: 'Package Comparison Tool', description: 'Buat tool untuk bandingkan paket custom vs paket standard', priority: 'Low', status: 'To Do', estimated_hours: 8, phase: 'Fase 3', module: 'Paket Request' },
  { id: 'REQ-009', title: 'File Management System', description: 'Sistem manajemen file untuk dokumen pendukung paket request', priority: 'Medium', status: 'To Do', estimated_hours: 8, phase: 'Fase 3', module: 'Paket Request' },
  { id: 'REQ-010', title: 'Analytics & Reporting', description: 'Dashboard analytics untuk tracking performa paket request', priority: 'Low', status: 'To Do', estimated_hours: 10, phase: 'Fase 4', module: 'Paket Request' },

  // UMR (Program Umrah) Tasks
  { id: 'UMR-001', title: 'Program Calendar & Schedule', description: 'Buat kalender program umrah dengan jadwal keberangkatan dan kuota', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 1', module: 'Program Umrah' },
  { id: 'UMR-002', title: 'Program Categories System', description: 'Sistem kategori program umrah (hemat, standard, premium, VIP)', priority: 'High', status: 'To Do', estimated_hours: 6, phase: 'Fase 1', module: 'Program Umrah' },
  { id: 'UMR-003', title: 'Hotel & Accommodation Management', description: 'Manajemen hotel dan akomodasi untuk setiap program umrah', priority: 'High', status: 'To Do', estimated_hours: 12, phase: 'Fase 2', module: 'Program Umrah' },
  { id: 'UMR-004', title: 'Flight & Transportation', description: 'Sistem manajemen jadwal penerbangan dan transportasi', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 2', module: 'Program Umrah' },
  { id: 'UMR-005', title: 'Itinerary Management', description: 'Manajemen itineraryprogram umrah dengan detail aktivitas harian', priority: 'High', status: 'To Do', estimated_hours: 12, phase: 'Fase 2', module: 'Program Umrah' },
  { id: 'UMR-006', title: 'Pilgrim Group Management', description: 'Sistem manajemen grup jemaah dengan leader dan anggota', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 2', module: 'Program Umrah' },
  { id: 'UMR-007', title: 'Meals & Catering System', description: 'Sistem manajemen makan dan katering untuk program umrah', priority: 'Medium', status: 'To Do', estimated_hours: 8, phase: 'Fase 3', module: 'Program Umrah' },
  { id: 'UMR-008', title: 'Guided Tours & Activities', description: 'Sistem tur berpemandu dan aktivitas spiritual', priority: 'Medium', status: 'To Do', estimated_hours: 10, phase: 'Fase 3', module: 'Program Umrah' },
  { id: 'UMR-009', title: 'Health & Medical Support', description: 'Sistem dukungan kesehatan dan medis selama program', priority: 'Medium', status: 'To Do', estimated_hours: 8, phase: 'Fase 3', module: 'Program Umrah' },
  { id: 'UMR-010', title: 'Emergency & Safety System', description: 'Sistem darurat dan keamanan untuk jemaah umrah', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 3', module: 'Program Umrah' },
  { id: 'UMR-011', title: 'Daily Reports & Updates', description: 'Sistem laporan harian dan update status jemaah', priority: 'Medium', status: 'To Do', estimated_hours: 8, phase: 'Fase 4', module: 'Program Umrah' },
  { id: 'UMR-012', title: 'Post-Umrah Feedback System', description: 'Sistem feedback dan review setelah selesai program', priority: 'Low', status: 'To Do', estimated_hours: 6, phase: 'Fase 4', module: 'Program Umrah' },
  { id: 'UMR-013', title: 'Program Analytics Dashboard', description: 'Dashboard analytics untuk tracking performa program umrah', priority: 'Medium', status: 'To Do', estimated_hours: 10, phase: 'Fase 4', module: 'Program Umrah' },
  { id: 'UMR-014', title: 'Multi-language Support', description: 'Dukungan multi-bahasa untuk jemaah internasional', priority: 'Low', status: 'To Do', estimated_hours: 12, phase: 'Fase 4', module: 'Program Umrah' },

  // HAJ (Pendaftaran Haji) Tasks
  { id: 'HAJ-001', title: 'Hajj Quota Management', description: 'Sistem manajemen kuota haji per tahun dan per region', priority: 'High', status: 'To Do', estimated_hours: 12, phase: 'Fase 1', module: 'Pendaftaran Haji' },
  { id: 'HAJ-002', title: 'Hajj Application Form', description: 'Form aplikasi haji dengan validasi lengkap dan dokumen wajib', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 1', module: 'Pendaftaran Haji' },
  { id: 'HAJ-003', title: 'Eligibility Checker System', description: 'Sistem untuk mengecek kelayakan calon jemaah haji', priority: 'High', status: 'To Do', estimated_hours: 8, phase: 'Fase 1', module: 'Pendaftaran Haji' },
  { id: 'HAJ-004', title: 'Document Management System', description: 'Sistem manajemen dokumen persyaratan haji', priority: 'High', status: 'To Do', estimated_hours: 12, phase: 'Fase 2', module: 'Pendaftaran Haji' },
  { id: 'HAJ-005', title: 'Payment Plan & Package Selection', description: 'Sistem rencana pembayaran dan pemilihan paket haji', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 2', module: 'Pendaftaran Haji' },
  { id: 'HAJ-006', title: 'Health Screening System', description: 'Sistem screening kesehatan dan medical check-up', priority: 'High', status: 'To Do', estimated_hours: 12, phase: 'Fase 2', module: 'Pendaftaran Haji' },
  { id: 'HAJ-007', title: 'Training & Education Module', description: 'Modul pelatihan dan edukasi calon jemaah haji', priority: 'Medium', status: 'To Do', estimated_hours: 15, phase: 'Fase 3', module: 'Pendaftaran Haji' },
  { id: 'HAJ-008', title: 'Approval Workflow System', description: 'Sistem alur persetujuan aplikasi haji', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 3', module: 'Pendaftaran Haji' },
  { id: 'HAJ-009', title: 'Government Integration API', description: 'Integrasi dengan sistem pemerintah untuk verifikasi data', priority: 'High', status: 'To Do', estimated_hours: 15, phase: 'Fase 3', module: 'Pendaftaran Haji' },
  { id: 'HAJ-010', title: 'Group Formation System', description: 'Sistem pembentukan gruppo jemaah Haji', priority: 'Medium', status: 'To Do', estimated_hours: 10, phase: 'Fase 3', module: 'Pendaftaran Haji' },
  { id: 'HAJ-011', title: 'Pre-departure Orientation', description: 'Sistem orientasi pra-keberangkatan', priority: 'Medium', status: 'To Do', estimated_hours: 8, phase: 'Fase 4', module: 'Pendaftaran Haji' },
  { id: 'HAJ-012', title: 'Real-time Tracking System', description: 'Sistem pelacakan real-time durante viaje Haji', priority: 'Medium', status: 'To Do', estimated_hours: 12, phase: 'Fase 4', module: 'Pendaftaran Haji' },
  { id: 'HAJ-013', title: 'Communication Hub', description: 'Pusat komunikasi antara jemaah keluarga dan tour leader', priority: 'Medium', status: 'To Do', estimated_hours: 10, phase: 'Fase 4', module: 'Pendaftaran Haji' },
  { id: 'HAJ-014', title: 'Post-Hajj Documentation', description: 'Dokumentasi pasca-Haji (sertifikat foto laporan)', priority: 'Low', status: 'To Do', estimated_hours: 8, phase: 'Fase 4', module: 'Pendaftaran Haji' },
  { id: 'HAJ-015', title: 'Compliance & Reporting', description: 'Sistem pelaporan dan kepatuhan regulasi', priority: 'High', status: 'To Do', estimated_hours: 12, phase: 'Fase 4', module: 'Pendaftaran Haji' },
  { id: 'HAJ-016', title: 'Analytics Dashboard', description: 'Dashboard analytics untuk monitoring aplikasi dan jemaah', priority: 'Medium', status: 'To Do', estimated_hours: 10, phase: 'Fase 4', module: 'Pendaftaran Haji' },

  // EDU (Konsultasi EduTrip) Tasks
  { id: 'EDU-001', title: 'Consultation Booking System', description: 'Sistem booking konsultasi dengan konsultan religious dan travel', priority: 'High', status: 'To Do', estimated_hours: 12, phase: 'Fase 1', module: 'Konsultasi EduTrip' },
  { id: 'EDU-002', title: 'Educational Content Library', description: 'Perpustakaan konten edukasi tentang Haji Umrah dan travel tips', priority: 'High', status: 'To Do', estimated_hours: 15, phase: 'Fase 1', module: 'Konsultasi EduTrip' },
  { id: 'EDU-003', title: 'Interactive Q&A Platform', description: 'Platform tanya jawab interaktif untuk jemaah', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 2', module: 'Konsultasi EduTrip' },
  { id: 'EDU-004', title: 'Virtual Tour & Preview', description: 'Tur virtual dan preview tempat suci dan destinos penting', priority: 'Medium', status: 'To Do', estimated_hours: 20, phase: 'Fase 2', module: 'Konsultasi EduTrip' },
  { id: 'EDU-005', title: 'Cultural Education Module', description: 'Modul edukasi budaya dan etiquette Saudi Arabia', priority: 'Medium', status: 'To Do', estimated_hours: 12, phase: 'Fase 2', module: 'Konsultasi EduTrip' },
  { id: 'EDU-006', title: 'Pre-Trip Preparation Course', description: 'Kursus persiapan perjalanan Haji/Umrah', priority: 'High', status: 'To Do', estimated_hours: 18, phase: 'Fase 2', module: 'Konsultasi EduTrip' },
  { id: 'EDU-007', title: 'Live Webinar System', description: 'Sistem webinar langsung dengan expert dan scholar', priority: 'Medium', status: 'To Do', estimated_hours: 15, phase: 'Fase 3', module: 'Konsultasi EduTrip' },
  { id: 'EDU-008', title: 'Knowledge Assessment Tool', description: 'Alat penilaian pengetahuan dan readiness jemaah', priority: 'Medium', status: 'To Do', estimated_hours: 10, phase: 'Fase 3', module: 'Konsultasi EduTrip' },
  { id: 'EDU-009', title: 'Personalized Learning Path', description: 'Path pembelajaran yang dipersonalisasi berdasarkan kebutuhan jemaah', priority: 'Medium', status: 'To Do', estimated_hours: 12, phase: 'Fase 3', module: 'Konsultasi EduTrip' },
  { id: 'EDU-010', title: 'Community Forum & Discussion', description: 'Forum komunitas untuk diskusi jemaah dan sharing pengalaman', priority: 'Low', status: 'To Do', estimated_hours: 10, phase: 'Fase 3', module: 'Konsultasi EduTrip' },
  { id: 'EDU-011', title: 'Multilingual Support', description: 'Dukungan multi-bahasa untuk konten edukasi', priority: 'Medium', status: 'To Do', estimated_hours: 15, phase: 'Fase 3', module: 'Konsultasi EduTrip' },
  { id: 'EDU-012', title: 'Video Conference Integration', description: 'Integrasi video conference untuk konsultasi private', priority: 'High', status: 'To Do', estimated_hours: 12, phase: 'Fase 3', module: 'Konsultasi EduTrip' },
  { id: 'EDU-013', title: 'Educational Game & Simulation', description: 'Game edukasi dan simulasi ritu Haji/Umrah', priority: 'Low', status: 'To Do', estimated_hours: 20, phase: 'Fase 4', module: 'Konsultasi EduTrip' },
  { id: 'EDU-014', title: 'Feedback & Rating System', description: 'Sistem feedback dan rating untuk konsultan dan konten edukasi', priority: 'Medium', status: 'To Do', estimated_hours: 8, phase: 'Fase 4', module: 'Konsultasi EduTrip' },
  { id: 'EDU-015', title: 'Mobile Learning App', description: 'Aplikasi mobile untuk pembelajaran on-the-go', priority: 'Medium', status: 'To Do', estimated_hours: 25, phase: 'Fase 4', module: 'Konsultasi EduTrip' },
  { id: 'EDU-016', title: 'Analytics & Performance Tracking', description: 'Sistem analytics untuk tracking performa edukasi dan engagement', priority: 'Low', status: 'To Do', estimated_hours: 10, phase: 'Fase 4', module: 'Konsultasi EduTrip' },

  // PROF (Profil Management) Tasks
  { id: 'PROF-001', title: 'User Profile Creation & Management', description: 'Sistem pembuatan dan manajemen profil pengguna lengkap', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 1', module: 'Profil Management' },
  { id: 'PROF-002', title: 'Profile Verification System', description: 'Sistem verifikasi profil dengan data dan dokumen pendukung', priority: 'High', status: 'To Do', estimated_hours: 8, phase: 'Fase 1', module: 'Profil Management' },
  { id: 'PROF-003', title: 'Profile Privacy & Security', description: 'Sistem privasi dan keamanan data profil pengguna', priority: 'High', status: 'To Do', estimated_hours: 8, phase: 'Fase 1', module: 'Profil Management' },
  { id: 'PROF-004', title: 'Profile Analytics Dashboard', description: 'Dashboard analytics untuk data profil pengguna', priority: 'Medium', status: 'To Do', estimated_hours: 6, phase: 'Fase 2', module: 'Profil Management' },

  // JAMA (Manajemen Jamaah) Tasks
  { id: 'JAMA-001', title: 'Jamaah Database Management', description: 'Sistem manajemen database jemaah dengan informasi lengkap', priority: 'High', status: 'To Do', estimated_hours: 12, phase: 'Fase 1', module: 'Manajemen Jamaah' },
  { id: 'JAMA-002', title: 'Family Group Management', description: 'Sistem manajemen gruppo famiglia Jamaah', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 1', module: 'Manajemen Jamaah' },
  { id: 'JAMA-003', title: 'Jamaah Status Tracking', description: 'Sistem pelacakan status Jamaah durante viaggio', priority: 'High', status: 'To Do', estimated_hours: 8, phase: 'Fase 2', module: 'Manajemen Jamaah' },
  { id: 'JAMA-004', title: 'Emergency Contact Management', description: 'Sistem manajemen kontak darurat jemaah', priority: 'High', status: 'To Do', estimated_hours: 6, phase: 'Fase 2', module: 'Manajemen Jamaah' },
  { id: 'JAMA-005', title: 'Medical Record Management', description: 'Sistem manajemen record medis jemaah', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 2', module: 'Manajemen Jamaah' },
  { id: 'JAMA-006', title: 'Jamaah Communication Portal', description: 'Portal komunikasi khusus untuk jemaah', priority: 'Medium', status: 'To Do', estimated_hours: 12, phase: 'Fase 3', module: 'Manajemen Jamaah' },
  { id: 'JAMA-007', title: 'Performance & Behavior Tracking', description: 'Sistem tracking performa dan perilaku jemaah', priority: 'Low', status: 'To Do', estimated_hours: 8, phase: 'Fase 3', module: 'Manajemen Jamaah' },

  // VISA (Manajemen Visa/Paspor) Tasks
  { id: 'VISA-001', title: 'Passport Information Management', description: 'Sistem informasi paspor dan dokumen perjalanan', priority: 'High', status: 'To Do', estimated_hours: 8, phase: 'Fase 1', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-002', title: 'Visa Application Management', description: 'Sistem aplikasi dan tracking visa Saudi Arabia', priority: 'High', status: 'To Do', estimated_hours: 12, phase: 'Fase 1', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-003', title: 'Document Expiry Monitoring', description: 'Sistem monitoring expire dokumen (paspor visa vaccination)', priority: 'High', status: 'To Do', estimated_hours: 6, phase: 'Fase 1', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-004', title: 'Vaccination Record Management', description: 'Sistem record vaccination dan health certificates', priority: 'High', status: 'To Do', estimated_hours: 8, phase: 'Fase 2', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-005', title: 'Government Integration API', description: 'Integrasi dengan sistem pemerintah untuk validasi dokumen', priority: 'Medium', status: 'To Do', estimated_hours: 15, phase: 'Fase 2', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-006', title: 'Digital Document Storage', description: 'Penyimpanan dokumen digital dengan security tinggi', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 2', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-007', title: 'Document Validation System', description: 'Sistem validasi dokumen dan verifikasi autentisitas', priority: 'Medium', status: 'To Do', estimated_hours: 12, phase: 'Fase 3', module: 'Manajemen Visa/Paspor' },
  { id: 'VISA-008', title: 'Consular Appointment Booking', description: 'Sistem booking appointment dengan konsulat', priority: 'Medium', status: 'To Do', estimated_hours: 8, phase: 'Fase 3', module: 'Manajemen Visa/Paspor' },

  // IDEN (Manajemen Identitas) Tasks
  { id: 'IDEN-001', title: 'Identity Verification System', description: 'Sistem verifikasi identitas dengan multiple methods', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 1', module: 'Manajemen Identitas' },
  { id: 'IDEN-002', title: 'Digital Identity Management', description: 'Sistem identitas digital dan authentication', priority: 'High', status: 'To Do', estimated_hours: 12, phase: 'Fase 1', module: 'Manajemen Identitas' },
  { id: 'IDEN-003', title: 'Identity Document Scanner', description: 'Scanner dokumen identitas dengan OCR dan validasi', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 2', module: 'Manajemen Identitas' },
  { id: 'IDEN-004', title: 'Facial Recognition System', description: 'Sistem facial recognition untuk verifikasi jemaah', priority: 'Medium', status: 'To Do', estimated_hours: 15, phase: 'Fase 2', module: 'Manajemen Identitas' },
  { id: 'IDEN-005', title: 'Identity Audit Trail', description: 'Audit trail untuk tracking akses dan modifikasi identitas', priority: 'Medium', status: 'To Do', estimated_hours: 8, phase: 'Fase 3', module: 'Manajemen Identitas' },
  { id: 'IDEN-006', title: 'Multi-factor Authentication', description: 'Sistem autentikasi multi-faktor untuk keamanan identitas', priority: 'High', status: 'To Do', estimated_hours: 10, phase: 'Fase 3', module: 'Manajemen Identitas' }
];

// Function untuk mendapatkan deliverables berdasarkan modul
function getDeliverablesByModule(taskId) {
  const module = taskId.substring(0, 3);
  
  switch(module) {
    case 'REQ':
      return [
        'UI components yang responsive',
        'Backend API endpoints',
        'Database schema dan queries',
        'User authentication system',
        'Testing suite',
        'Documentation'
      ];
    case 'UMR':
      return [
        'Calendar interface',
        'Booking system',
        'Payment integration',
        'Notification system',
        'Admin dashboard',
        'Mobile app integration'
      ];
    case 'HAJ':
      return [
        'Government API integration',
        'Document verification system',
        'Quota management system',
        'Health screening interface',
        'Compliance reporting',
        'Security audit trail'
      ];
    case 'EDU':
      return [
        'Content management system',
        'Video conferencing integration',
        'Interactive learning modules',
        'Assessment tools',
        'Progress tracking system',
        'Multi-language support'
      ];
    case 'PROF':
      return [
        'User profile forms',
        'Document upload system',
        'Verification workflow',
        'Privacy controls',
        'Data analytics dashboard',
        'Security implementation'
      ];
    case 'JAMA':
      return [
        'Database management system',
        'Group coordination tools',
        'Communication portal',
        'Emergency contact system',
        'Medical record management',
        'Real-time tracking'
      ];
    case 'VISA':
      return [
        'Document scanning system',
        'Government API integration',
        'Expiry monitoring system',
        'Digital storage with encryption',
        'Validation algorithms',
        'Appointment booking system'
      ];
    case 'IDEN':
      return [
        'Identity verification algorithms',
        'Document OCR system',
        'Biometric integration',
        'Multi-factor authentication',
        'Audit trail system',
        'Security protocols'
      ];
    default:
      return [
        'Core functionality implementation',
        'User interface design',
        'Backend integration',
        'Testing and validation',
        'Documentation',
        'Deployment preparation'
      ];
  }
}

// Function untuk mendapatkan tech stack berdasarkan modul
function getTechStackByModule(moduleName) {
  const baseStack = [
    'Frontend: React.js/Vue.js dengan TypeScript',
    'Backend: Node.js/Python dengan Express.js/FastAPI',
    'Database: PostgreSQL/MongoDB',
    'UI Framework: Tailwind CSS/Ant Design'
  ];

  switch(moduleName) {
    case 'Paket Request':
      baseStack.push('File Upload: React Dropzone + AWS S3');
      break;
    case 'Program Umrah':
      baseStack.push('Calendar: FullCalendar.js');
      break;
    case 'Pendaftaran Haji':
      baseStack.push('Integration: REST APIs + SOAP untuk government');
      break;
    case 'Konsultasi EduTrip':
      baseStack.push('Video: WebRTC + Zoom SDK');
      break;
    case 'Profil Management':
      baseStack.push('Security: bcrypt + JWT');
      break;
    case 'Manajemen Jamaah':
      baseStack.push('Real-time: Socket.io + WebSocket');
      break;
    case 'Manajemen Visa/Paspor':
      baseStack.push('OCR: Tesseract.js + OpenCV');
      break;
    case 'Manajemen Identitas':
      baseStack.push('Biometric: Face-api.js + TensorFlow.js');
      break;
  }
  
  return baseStack;
}

// Function untuk mendapatkan dependencies berdasarkan task
function getDependenciesByModule(taskId) {
  const module = taskId.substring(0, 3);
  
  switch(module) {
    case 'REQ':
      return [
        'REQ-001 (Form Permintaan Paket) - Untuk user interface',
        'REQ-002 (Database Schema) - Untuk data persistence',
        'Authentication system - Untuk user management',
        'File storage service - Untuk document uploads'
      ];
    case 'UMR':
      return [
        'User authentication system',
        'Payment gateway integration',
        'Calendar management service',
        'Notification service',
        'Real-time communication system'
      ];
    case 'HAJ':
      return [
        'Government API access',
        'Document verification service',
        'Health screening provider API',
        'Compliance monitoring system'
      ];
    case 'EDU':
      return [
        'Content management system',
        'Video streaming service',
        'User authentication',
        'Assessment engine',
        'Multi-language support system'
      ];
    case 'PROF':
      return [
        'User authentication system',
        'Document upload service',
        'Email verification service',
        'Privacy compliance tools'
      ];
    case 'JAMA':
      return [
        'User management system',
        'Real-time communication service',
        'Emergency contact system',
        'Medical record system',
        'GPS tracking service'
      ];
    case 'VISA':
      return [
        'Government API integration',
        'Document scanning service',
        'Encryption service',
        'Expiry monitoring system',
        'Consular appointment API'
      ];
    case 'IDEN':
      return [
        'Biometric service provider',
        'Document validation service',
        'Multi-factor authentication',
        'Security audit service'
      ];
    default:
      return [
        'Authentication system',
        'Database service',
        'File storage service',
        'Notification service'
      ];
  }
}

// Generate template markdown content
function generateTaskMarkdown(task) {
  const deliverables = getDeliverablesByModule(task.id);
  const techStack = getTechStackByModule(task.module);
  const dependencies = getDependenciesByModule(task.id);
  
  let content = `# ${task.id}: ${task.title}

## Deskripsi Tugas
${task.description}

## Tujuan
- Menyediakan solusi yang robust dan scalable
- Memastikan user experience yang optimal
- Mendukung integrasi dengan sistem yang ada

## Deliverables
`;
  
  deliverables.forEach(item => {
    content += `- ${item}\n`;
  });
  
  content += `
## Step-by-Step Implementasi

### 1. Analisis Kebutuhan
- Identifikasi requirements fungsional dan non-fungsional
- Analisis alur kerja dan integration points
- Perencanaan arsitektur sistem

### 2. Desain Solusi
- Merancang database schema dan API endpoints
- Mendesain user interface dan user experience
- Perencanaan security dan performance

### 3. Implementasi Teknis
- Development frontend dan backend components
- Integration dengan third-party services
- Implementasi security measures

### 4. Testing dan Quality Assurance
- Unit testing dan integration testing
- User acceptance testing
- Performance dan security testing

## Kriteria Keberhasilan

### Functional Requirements
- [ ] Semua fitur berfungsi sesuai spesifikasi
- [ ] User interface yang intuitif dan responsive
- [ ] Integrasi dengan sistem yang ada berjalan lancar

### Technical Requirements
- [ ] Performance: < 500ms response time
- [ ] Scalability: Support 1000+ concurrent users
- [ ] Security: Data encryption dan access control
- [ ] Compatibility: Cross-browser support

### User Experience Requirements
- [ ] Intuitive user interface
- [ ] Mobile responsive design
- [ ] Accessibility compliant (WCAG 2.1)
- [ ] Clear error messages

### Security Requirements
- [ ] Input validation dan sanitization
- [ ] Authentication dan authorization
- [ ] Data encryption (at rest dan in transit)
- [ ] Audit logging

## Teknologi yang Digunakan
`;
  
  techStack.forEach(tech => {
    content += `- **${tech}**\n`;
  });
  
  content += `
## Timeline: ${task.estimated_hours} jam
- Setup dan konfigurasi: ${Math.ceil(task.estimated_hours * 0.2)} jam
- Implementasi inti: ${Math.ceil(task.estimated_hours * 0.5)} jam
- Testing dan optimisasi: ${Math.ceil(task.estimated_hours * 0.2)} jam
- Dokumentasi: ${Math.ceil(task.estimated_hours * 0.1)} jam

## Dependencies
`;
  
  dependencies.forEach(dep => {
    content += `- ${dep}\n`;
  });
  
  content += `
## Next Steps
Setelah ${task.id} selesai, lanjut ke implementasi fitur berikutnya untuk melengkapi modul ${task.module}.

---

**Task Information:**
- **Task ID**: ${task.id}
- **Priority**: ${task.priority}
- **Estimated Hours**: ${task.estimated_hours}
- **Phase**: ${task.phase}
- **Module**: ${task.module}
- **Status**: ${task.status}
`;
  
  return content;
}

// Generate semua file markdown
function generateAllTaskFiles() {
  const outputDir = path.join(__dirname, '../task_documentation');
  
  console.log(`Generating ${tasksData.length} task documentation files...`);
  
  tasksData.forEach((task, index) => {
    try {
      const content = generateTaskMarkdown(task);
      const filename = `${task.id}.md`;
      const filepath = path.join(outputDir, filename);
      
      fs.writeFileSync(filepath, content, 'utf8');
      console.log(`✓ Generated ${filename}`);
    } catch (error) {
      console.error(`✗ Error generating ${task.id}:`, error.message);
    }
  });
  
  console.log(`\nCompleted! Generated ${tasksData.length} task documentation files.`);
}

// Generate summary report
function generateSummaryReport() {
  const moduleCount = {};
  const priorityCount = {};
  const phaseCount = {};
  const totalHours = tasksData.reduce((sum, task) => sum + task.estimated_hours, 0);
  
  tasksData.forEach(task => {
    moduleCount[task.module] = (moduleCount[task.module] || 0) + 1;
    priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;
    phaseCount[task.phase] = (phaseCount[task.phase] || 0) + 1;
  });

  const report = `# Task Documentation Summary

## Overview
Total tasks: ${tasksData.length}

## Distribution by Module
${Object.entries(moduleCount).map(([module, count]) => `- **${module}**: ${count} tasks`).join('\n')}

## Distribution by Priority
${Object.entries(priorityCount).map(([priority, count]) => `- **${priority} Priority**: ${count} tasks`).join('\n')}

## Distribution by Phase
${Object.entries(phaseCount).map(([phase, count]) => `- **${phase}**: ${count} tasks`).join('\n')}

## Estimated Hours Distribution
- **Total Hours**: ${totalHours} hours
- **Average Hours**: ${Math.round(totalHours / tasksData.length)} hours per task
- **Maximum Hours**: ${Math.max(...tasksData.map(task => task.estimated_hours))} hours
- **Minimum Hours**: ${Math.min(...tasksData.map(task => task.estimated_hours))} hours
- **Estimated Timeline**: ${Math.ceil(totalHours / 160)} weeks (at 40 hours/week)

## Files Generated
All task documentation files have been generated in the \`task_documentation/\` directory with the following naming convention:
- \`[TASK-ID].md\` (e.g., \`REQ-001.md\`, \`UMR-005.md\`)

Each file contains:
- Task description and objectives
- Step-by-step implementation guide
- Success criteria and requirements
- Technology stack recommendations
- Timeline and dependencies
- Next steps and workflow

Generated on: ${new Date().toISOString()}
`;

  const reportPath = path.join(__dirname, '../task_documentation/00_SUMMARY_REPORT.md');
  fs.writeFileSync(reportPath, report, 'utf8');
  console.log('✓ Generated summary report: 00_SUMMARY_REPORT.md');
}

// Run the generation
if (require.main === module) {
  generateAllTaskFiles();
  generateSummaryReport();
}

module.exports = {
  generateAllTaskFiles,
  generateSummaryReport,
  tasksData
};