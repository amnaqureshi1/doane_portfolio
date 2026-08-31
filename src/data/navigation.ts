export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
  external?: boolean;
};

/**
 * Navigation structure derived from the portfolio Google Doc table of contents.
 */
export const navigation: NavItem[] = [
  {
    label: 'Introduction',
    href: '/',
  },
  {
    label: 'Teaching',
    href: '/teaching/',
    children: [
      {
        label: 'Reflection on Course Preparation',
        href: '/teaching/reflection-on-course-preparation/',
      },
      {
        label: 'Reflection on Course Implementation',
        href: '/teaching/reflection-on-course-implementation/',
      },
      {
        label: 'Reflection on Assessment of Student Performance',
        href: '/teaching/reflection-on-assessment-of-student-performance/',
      },
    ],
  },
  {
    label: 'Curriculum Coordination',
    href: '/curriculum-coordination/',
    children: [
      {
        label: 'Curriculum Coordination and Broader Teaching Impact',
        href: '/curriculum-coordination/broader-teaching-impact/',
      },
      {
        label: 'Curriculum Development Accomplishments',
        href: '/curriculum-coordination/development-accomplishments/',
      },
    ],
  },
  {
    label: 'Scholarship',
    href: '/scholarship/',
    children: [
      {
        label: 'Scholarship of Teaching',
        href: '/scholarship/scholarship-of-teaching/',
      },
      {
        label: 'Scholarship of Application',
        href: '/scholarship/scholarship-of-application/',
      },
    ],
  },
  {
    label: 'Service',
    href: '/service/',
    children: [
      {
        label: 'Service to the University',
        href: '/service/service-to-the-university/',
      },
    ],
  },
  {
    label: 'Reflection on FPAS',
    href: '/reflection-on-fpas/',
    children: [
      {
        label: 'FPAS 2024–2025',
        href: '/reflection-on-fpas/fpas-2024-2025/',
      },
      {
        label: 'FPAS 2025–2026',
        href: '/reflection-on-fpas/fpas-2025-2026/',
      },
    ],
  },
  {
    label: 'Conclusion',
    href: '/conclusion/',
  },
  {
    label: 'Appendix',
    href: '/appendix/',
    children: [
      { label: 'Courses Taught', href: '/appendix/courses-taught/' },
      { label: 'IDEA Evaluations', href: '/appendix/idea-evaluations/' },
      { label: 'Syllabus HPMY/2025', href: '/appendix/syllabus-hpmy-2025/' },
      { label: 'Syllabus HPJN/2026', href: '/appendix/syllabus-hpjn-2026/' },
      { label: 'BIO-125 Food Intake Assignment', href: '/appendix/bio-125-food-intake-assignment/' },
      { label: 'BIO-125 Draw Meiosis Assignment', href: '/appendix/bio-125-draw-meiosis-assignment/' },
      { label: 'BIO-126 Video Presentation Assignment', href: '/appendix/bio-126-video-presentation-assignment/' },
      { label: 'Rubric', href: '/appendix/rubric/' },
      { label: 'Course Intro Video', href: '/appendix/course-intro-video/' },
      { label: 'Module 2 Announcement', href: '/appendix/module-2-announcement/' },
      { label: 'How to Do Well in This Course Announcement', href: '/appendix/how-to-do-well-announcement/' },
      { label: 'Study Guide Worksheet', href: '/appendix/study-guide-worksheet/' },
      { label: 'Timely Communication with Students', href: '/appendix/timely-communication-with-students/' },
      { label: 'IDEA Student Evaluations', href: '/appendix/idea-student-evaluations/' },
      { label: 'Feedback to Students', href: '/appendix/feedback-to-students/' },
      { label: 'Course Consultant', href: '/appendix/course-consultant/' },
      { label: 'Course Development Guideline and Checklist', href: '/appendix/course-development-guideline/' },
      { label: 'Assignment Ideas', href: '/appendix/assignment-ideas/' },
      { label: 'Course Development Tracking Document', href: '/appendix/course-development-tracking/' },
      { label: 'Course Readiness Communications', href: '/appendix/course-readiness-communications/' },
      { label: 'FPAS 2024-2025', href: '/appendix/fpas-2024-2025/' },
      { label: 'FPAS 2025-2026', href: '/appendix/fpas-2025-2026/' },
    ],
  },
];

export type PageEntry = {
  href: string;
  title: string;
};

export function flattenNavigation(items: NavItem[] = navigation): PageEntry[] {
  const pages: PageEntry[] = [];

  for (const item of items) {
    pages.push({ href: item.href, title: item.label });

    if (item.children?.length) {
      pages.push(...flattenNavigation(item.children));
    }
  }

  return pages;
}

export function normalizePath(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function isExactPath(currentPath: string, href: string): boolean {
  return normalizePath(currentPath) === normalizePath(href);
}

export function isDescendantPath(currentPath: string, href: string): boolean {
  const current = normalizePath(currentPath);
  const target = normalizePath(href);

  if (target === '/') {
    return false;
  }

  return current !== target && current.startsWith(target);
}
