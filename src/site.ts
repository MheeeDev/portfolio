// Personal details shown on every page. Edit here, not in the page files.
export const site = {
  name: 'Sureeporn Kromthin',
  headline: 'Automation & Industrial Software Engineer',
  tagline: 'PLC · SCADA · OT/IT integration — from the Sequence of Operation to site acceptance.',
  // Home page hero. The last word of the slogan is drawn in the accent colour.
  greeting: 'สวัสดีครับ ยินดีที่ได้รู้จัก',
  slogan: 'Build. Test. Commission. Share.',
  sloganTh: 'ลงมือสร้าง · ทดสอบให้มั่นใจ · ส่งมอบหน้างานจริง · แล้วเอามาแชร์ต่อ',
  intro: 'แชร์ความรู้งาน Automation จากหน้างานจริง ทั้ง PLC, SCADA, OT/IT และเครื่องมือ AI ที่ช่วยให้ทำงานเร็วขึ้น',
  // "Now building" line under the hero buttons. Empty = hidden.
  now: 'ล่าสุด: บทความ OT Security สำหรับโรงงาน',
  // "What I do" tiles on the home page.
  services: [
    { icon: 'plc', title: 'PLC & Controls', text: 'Siemens S7-1200/1500, Rockwell ControlLogix, Mitsubishi FX5U — sequences, PID loops, drives and safety.' },
    { icon: 'scada', title: 'SCADA & HMI', text: 'Ignition, WinCC Unified, FactoryTalk Optix — screens and alarms built for the people who run the process.' },
    { icon: 'network', title: 'OT/IT Integration', text: 'OPC UA, MQTT, MySQL, InfluxDB — PLC data to MES, historians and dashboards, with traceability.' },
    { icon: 'teach', title: 'Training & Labs', text: 'Digital-twin rigs, an online automation course and a cloud lab used in university process-control classes.' },
  ],
  // Profile photo under public/, e.g. 'profile.jpg'. Empty = initials in a circle.
  avatar: 'profile.webp' as string,
  domain: 'iamautomationeng.com',
  location: 'Chonburi, Thailand · open to relocation',
  email: 'skn.automationeng@gmail.com',
  links: [
    { label: 'YouTube', href: 'https://youtube.com/@sureeporn.k' },
    // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/...' },
    // { label: 'GitHub', href: 'https://github.com/MheeeDev' },
  ],
  // Drop a CV into public/cv/ and set the file name here, e.g. 'cv/Sureeporn_Kromthin_CV.pdf'
  cvFile: '' as string,
};

// Licence and certificates, newest first. `short` is the badge text on the home page.
// `file` is a path under public/ (empty = no link). The owner chose to publish these scans on 2026-10-22.
export const credentials = [
  {
    kind: 'Licence',
    title: 'Associate Engineer licence — Chemical Engineering',
    short: 'Associate Engineer (Chemical)',
    issuer: 'Council of Engineers Thailand',
    date: 'Apr 2026',
    detail: 'Licensed to practise controlled engineering work at associate level (ภาคีวิศวกร) in chemical engineering.',
    file: 'certificates/coe-associate-engineer-2026.pdf' as string,
  },
  {
    kind: 'Certification',
    title: 'National Skill Standard — Programmable Logic Controller, Level 1',
    short: 'National PLC Skill Standard · 92.85 %',
    issuer: 'Department of Skill Development, Ministry of Labour',
    date: 'Jul 2025',
    detail: 'Passed the national theory and practical test with 92.85 % — PLC assembly, installation, maintenance, inspection and programming.',
    file: 'certificates/plc-level1-national-skill-standard-2025.pdf' as string,
  },
  {
    kind: 'Training',
    title: 'Application of Advanced PLC — 30 hours',
    short: 'Advanced PLC (30 h)',
    issuer: 'Chon Buri Institute for Skill Development',
    date: 'Jun 2025',
    detail: 'Upskilling course on advanced PLC applications, Department of Skill Development.',
    file: 'certificates/advanced-plc-30h-2025.pdf' as string,
  },
  {
    kind: 'Training',
    title: 'SIMATIC PCS 7 Basic Training',
    short: 'Siemens PCS 7',
    issuer: 'Siemens Thailand',
    date: 'May 2023',
    detail: 'Project setup, station configuration, PROFINET device configuration, CFC and SFC programming, and graphic design.',
    file: 'certificates/siemens-pcs7-basic-2023.jpg' as string,
  },
];

// Fixed section order for every project page. scripts/check-projects.mjs enforces it.
export const requiredSections = [
  'Problem',
  'My role & scope',
  'Approach',
  'Delivery',
  'Result',
  'Skills used',
];
