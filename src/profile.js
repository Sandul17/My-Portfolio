export const profile = {
  name: 'Sandul Hansana',
  fullName: 'A.P.S.H.V. Gunawardana',
  role: 'Software Engineering Undergraduate',
  email: 'sandulhansana@gmail.com',
  location: 'Sri Lanka',
  github: 'https://github.com/Sandul17',
  linkedin: 'https://www.linkedin.com/in/sandul-hansana-vas-gunawardana-b30279255/',
  cv: 'assets/sandul-hansana-cv.pdf',
  // FormSubmit sends an activation link on the first submission.
  formEndpoint: 'https://formsubmit.co/ajax/sandulhansana@gmail.com',
  summary: 'A motivated Software Engineering student with a strong interest in web development, front-end technologies, and UI/UX design. I enjoy building responsive, user-focused applications that combine functionality with clean visual design.',
};

export const projects = [
  {
    id: 'leave-application',
    title: 'Leave Application System',
    subtitle: 'Parliament Members & Officers',
    kind: 'web',
    category: 'Government web application',
    summary: 'Submit, track, and manage overseas travel requests for parliament members and officers.',
    description: 'A system built to submit, track, and manage overseas travel requests for parliament members and officers.',
    features: ['Online submission of overseas travel requests', 'Request tracking with clear status updates', 'Management views for reviewing and approving requests', 'Responsive interface built with React and Bootstrap'],
    tags: ['React', 'Bootstrap', 'Laravel', 'MySQL'],
    tone: 'blue',
    featured: true,
  },
  {
    id: 'gate-pass',
    title: 'Gate Pass System',
    subtitle: 'Government web application',
    kind: 'web',
    category: 'Secure access management',
    summary: 'Secure gate pass management for authorised access to high-security locations.',
    description: 'A secure gate pass management system for obtaining authorised access to high-security government locations such as Parliament and Temple Trees.',
    features: ['Gate pass requests for high-security locations', 'Authorisation workflow for approvals', 'Security-focused design and data handling', 'React front end with a .NET back end'],
    tags: ['React', '.NET', 'MySQL'],
    tone: 'green',
    featured: true,
  },
  {
    id: 'wedify',
    title: 'Wedify',
    subtitle: 'Wedding planning mobile app',
    kind: 'mobile',
    category: 'Group project · Mobile',
    summary: 'Book venues, photographers, caterers and more — and keep the budget in check.',
    description: 'A wedding planning mobile application for couples to book their vendors — venue, photographer, caterer, DJ/band, officiant, hair and makeup — and calculate their budget. I worked across both the front end and the back end.',
    features: ['Vendor discovery and booking in one place', 'Built-in wedding budget calculator', 'Worked on both front end and back end', 'Cross-platform app built with React Native'],
    tags: ['React Native', 'Node.js', 'MySQL'],
    tone: 'pink',
  },
  {
    id: 'plotguard',
    title: 'PlotGuard',
    subtitle: 'Final year research project',
    kind: 'research',
    category: 'Research · IIT',
    summary: 'A final-year research project exploring intelligent, user-friendly solutions to a real-world problem.',
    description: 'A research-based software solution developed as part of my final-year Software Engineering degree at IIT, applying modern software technologies to a real-world problem through an intelligent and user-friendly system.',
    features: ['Research-led approach to a real-world problem', 'Application of modern software engineering principles', 'Focus on intelligent, user-friendly solutions'],
    tags: ['Research', 'Software Engineering'],
    tone: 'amber',
  },
  {
    id: 'wellness',
    title: 'Wellness',
    subtitle: 'Health care web application',
    kind: 'web',
    category: 'Academic · Web',
    summary: 'A healthcare information site with an interactive quiz and live progress bar.',
    description: 'A healthcare information website. My primary contribution was an interactive quiz module featuring a dynamic percentage progress bar.',
    features: ['Interactive quiz module', 'Dynamic percentage progress bar', 'Built with plain HTML, CSS and JavaScript'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    tone: 'teal',
  },
  {
    id: 'cinema-tickets',
    title: 'Cinema Ticket Booking',
    subtitle: 'Java program',
    kind: 'software',
    category: 'Academic · Java',
    summary: 'Seat reservations, live availability, seating plans and sales reporting.',
    description: 'A cinema ticket booking system featuring seat reservation and cancellation, real-time seat availability, an interactive seating plan display, ticket management, and sales reporting.',
    features: ['Seat reservation and cancellation', 'Real-time seat availability', 'Interactive seating plan display', 'Ticket management and sales reporting'],
    tags: ['Java', 'OOP'],
    tone: 'violet',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    subtitle: 'This website',
    kind: 'web',
    category: 'Design & development',
    summary: 'The site you’re on — responsive, accessible and built with a focus on modern UI.',
    description: 'A responsive personal portfolio to showcase projects, technical skills and contact information, with a strong focus on user experience and modern UI design.',
    features: ['Light and dark themes', 'Command menu and keyboard navigation', 'Contact form with validation', 'Downloadable PDF CV'],
    tags: ['React', 'CSS', 'JavaScript'],
    tone: 'orange',
    live: '#home',
  },
];

export const skillGroups = [
  { id: 'web', title: 'Web & full-stack', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Laravel', 'Node.js', 'Bootstrap'] },
  { id: 'languages', title: 'Languages', skills: ['Java', 'Python', 'PHP'] },
  { id: 'mobile', title: 'Mobile', skills: ['React Native'] },
  { id: 'data', title: 'Databases', skills: ['MySQL', 'MongoDB'] },
  { id: 'design', title: 'UI/UX design', skills: ['Figma'] },
  { id: 'concepts', title: 'Concepts', skills: ['Object-Oriented Programming'] },
];

export const softSkills = [
  'Quick learner', 'Problem solving', 'Analytical thinking', 'Team collaboration',
  'Clear communication', 'Time management', 'Decision making', 'Attention to detail',
];

export const education = [
  { title: 'BEng (Hons) Software Engineering', place: 'Informatics Institute of Technology · University of Westminster', when: 'Fourth year · In progress', current: true },
  { title: 'Foundation Certificate in Higher Education', place: 'Informatics Institute of Technology', when: 'Jan 2023 — Sep 2023' },
  { title: 'G.C.E. Advanced Level', place: 'Kalutara Vidyalaya', when: '2022' },
  { title: 'G.C.E. Ordinary Level', place: 'Kalutara Vidyalaya', when: '2018' },
];

export const achievements = [
  { title: 'LinkedIn Learning certifications', detail: 'Python, Java, React and Object-Oriented Programming' },
  { title: 'English course', detail: 'Completed at Aquinas College' },
];
