import { projects } from './profile';

const details = {
  plotguard: { kind: 'research', label: 'Research', visual: 'plotguard', shortTitle: 'PlotGuard', summary: 'A final-year research project exploring intelligent, user-friendly solutions to a real-world problem.' },
  tickets: { kind: 'development', label: 'Development', visual: 'ticket', shortTitle: 'Interactive Ticket Booking', summary: 'A console-based system to book seats, manage reservations, search tickets, and track ticket sales.' },
  portfolio: { kind: 'development', label: 'Development', visual: 'portfolio', shortTitle: 'Personal Portfolio', summary: 'A little corner of the internet to share my skills, projects, and software engineering journey.' },
};
export const projectCatalog = Object.entries(projects).map(([id, project]) => ({ ...project, id, ...details[id] }));
export const findProject = id => projectCatalog.find(project => project.id === id) ?? null;
