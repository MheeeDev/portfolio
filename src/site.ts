// Personal details shown on every page. Edit here, not in the page files.
export const site = {
  name: 'Sureeporn Kromthin',
  headline: 'Automation & Industrial Software Engineer',
  tagline: 'PLC · SCADA · OT/IT integration — from the Sequence of Operation to site acceptance.',
  slogan: 'Build. Test. Commission. Share.',
  // One Thai line under the tagline on the home page, for readers who come for the articles.
  intro: 'แชร์ความรู้งาน Automation จากหน้างานจริง ทั้ง PLC, SCADA, OT/IT และเครื่องมือ AI ที่ช่วยให้ทำงานเร็วขึ้น',
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
