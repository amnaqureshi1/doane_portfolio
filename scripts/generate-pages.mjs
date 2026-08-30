import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const pagesDir = path.join(root, 'src', 'pages');

const pages = [
  { href: '/', title: 'Introduction' },
  { href: '/teaching/', title: 'Teaching' },
  { href: '/teaching/reflection-on-course-preparation/', title: 'Reflection on Course Preparation' },
  { href: '/teaching/reflection-on-course-implementation/', title: 'Reflection on Course Implementation' },
  {
    href: '/teaching/reflection-on-assessment-of-student-performance/',
    title: 'Reflection on Assessment of Student Performance',
  },
  { href: '/curriculum-coordination/', title: 'Curriculum Coordination' },
  {
    href: '/curriculum-coordination/broader-teaching-impact/',
    title: 'Curriculum Coordination and Broader Teaching Impact',
  },
  {
    href: '/curriculum-coordination/development-accomplishments/',
    title: 'Curriculum Development Accomplishments',
  },
  { href: '/scholarship/', title: 'Scholarship' },
  { href: '/scholarship/scholarship-of-teaching/', title: 'Scholarship of Teaching' },
  { href: '/scholarship/scholarship-of-application/', title: 'Scholarship of Application' },
  { href: '/service/', title: 'Service' },
  { href: '/service/service-to-the-university/', title: 'Service to the University' },
  { href: '/reflection-on-fpas/', title: 'Reflection on FPAS' },
  { href: '/reflection-on-fpas/fpas-2024-2025/', title: 'FPAS 2024–2025' },
  { href: '/reflection-on-fpas/fpas-2025-2026/', title: 'FPAS 2025–2026' },
  { href: '/conclusion/', title: 'Conclusion' },
  { href: '/appendix/', title: 'Appendix' },
  { href: '/appendix/idea-evaluations/', title: 'IDEA Evaluations' },
  { href: '/appendix/syllabus-hpmy-2025/', title: 'Syllabus HPMY/2025' },
  { href: '/appendix/syllabus-hpjn-2026/', title: 'Syllabus HPJN/2026' },
  { href: '/appendix/bio-125-food-intake-assignment/', title: 'BIO-125 Food Intake Assignment' },
  { href: '/appendix/bio-125-draw-meiosis-assignment/', title: 'BIO-125 Draw Meiosis Assignment' },
  { href: '/appendix/bio-126-video-presentation-assignment/', title: 'BIO-126 Video Presentation Assignment' },
  { href: '/appendix/rubric/', title: 'Rubric' },
  { href: '/appendix/course-intro-video/', title: 'Course Intro Video' },
  { href: '/appendix/module-2-announcement/', title: 'Module 2 Announcement' },
  { href: '/appendix/how-to-do-well-announcement/', title: 'How to Do Well in This Course Announcement' },
  { href: '/appendix/study-guide-worksheet/', title: 'Study Guide Worksheet' },
  { href: '/appendix/timely-communication-with-students/', title: 'Timely Communication with Students' },
  { href: '/appendix/idea-student-evaluations/', title: 'IDEA Student Evaluations' },
  { href: '/appendix/feedback-to-students/', title: 'Feedback to Students' },
];

function hrefToFilePath(href) {
  if (href === '/') {
    return path.join(pagesDir, 'index.astro');
  }

  const segments = href.replace(/^\/|\/$/g, '').split('/');
  return path.join(pagesDir, ...segments, 'index.astro');
}

function pageTemplate(title) {
  const depth = title === 'Introduction' ? 1 : 2;
  const importPath = '../'.repeat(depth) + 'components/PageShell.astro';

  return `---
import PageShell from '${importPath}';
---

<PageShell title="${title.replace(/"/g, '\\"')}">
  <p class="page-placeholder">Content will be added from the portfolio document.</p>
</PageShell>
`;
}

for (const page of pages) {
  const filePath = hrefToFilePath(page.href);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const relativeDir = path.relative(pagesDir, path.dirname(filePath));
  const depth = !relativeDir || relativeDir === '.' ? 0 : relativeDir.split(path.sep).length;
  const importPath = `${'../'.repeat(depth + 1)}components/PageShell.astro`;

  const content = `---
import PageShell from '${importPath}';
---

<PageShell title="${page.title.replace(/"/g, '\\"')}">
  <p class="page-placeholder">Content will be added from the portfolio document.</p>
</PageShell>
`;

  fs.writeFileSync(filePath, content);
}

console.log(`Generated ${pages.length} pages.`);
