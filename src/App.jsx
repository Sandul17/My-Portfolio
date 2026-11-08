import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { ContactForm, ContactLinks } from './Contact';
import { ProjectDialog, findProject } from './ProjectDialog';
import { Skills } from './Skills';
import { Experience } from './Experience';
import { Hero } from './Hero';
import { About } from './About';
import { Projects } from './Projects';
import { CommandMenu, Navigation, sections } from './Navigation';
import { profile } from './profile';
import { ReadingProgress } from './Providers';
import { Reveal } from './Animated';
import { useTheme } from './theme';

const readProject = () => findProject(new URLSearchParams(window.location.search).get('project'))?.id ?? null;

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [projectId, setProjectId] = useState(readProject);
  const [commandOpen, setCommandOpen] = useState(false);
  const [projectTopic, setProjectTopic] = useState('');
  const [active, setActive] = useState('home');
  const [localTime, setLocalTime] = useState('');
  const closeProject = useCallback(() => {
    setProjectId(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has('project')) { url.searchParams.delete('project'); window.history.replaceState(null, '', url.pathname + url.search + url.hash); }
  }, []);
  const openProject = useCallback(id => {
    if (!findProject(id)) return;
    setProjectId(id);
    const url = new URL(window.location.href);
    if (url.searchParams.has('project')) { url.searchParams.set('project', id); window.history.replaceState(null, '', url.pathname + url.search + url.hash); }
  }, []);
  const openSearch = useCallback(() => { closeProject(); setCommandOpen(true); }, [closeProject]);
  const discussProject = useCallback(project => {
    closeProject(); setProjectTopic(project.title);
    requestAnimationFrame(() => document.getElementById('contact')?.scrollIntoView({ block: 'start' }));
  }, [closeProject]);
  useEffect(() => {
    const tick = () => setLocalTime(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()) + ' GMT+5:30');
    tick(); const timer = setInterval(tick, 30000);
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-35% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));
    const history = () => { setProjectId(readProject()); const id = window.location.hash.slice(1); if (sections.some(s => s.id === id)) setActive(id); };
    window.addEventListener('popstate', history); window.addEventListener('hashchange', history);
    return () => { clearInterval(timer); observer.disconnect(); window.removeEventListener('popstate', history); window.removeEventListener('hashchange', history); };
  }, []);
  useEffect(() => {
    const shortcut = e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); closeProject(); setCommandOpen(c => !c); } };
    document.addEventListener('keydown', shortcut); return () => document.removeEventListener('keydown', shortcut);
  }, [closeProject]);
  return <>
    <ReadingProgress/><a className="skip-link" href="#main">Skip to content</a>
    <div className="grain" aria-hidden="true"/>
    <Navigation active={active} onSearch={openSearch} theme={theme} onTheme={toggleTheme}/>
    <main id="main" tabIndex={-1}>
      <Hero localTime={localTime} onSearch={openSearch}/>
      <About/><Skills/><Projects onOpen={openProject}/><Experience/>
      <section id="contact" className="section container contact" aria-labelledby="contact-heading">
        <div className="contact-card">
          <div className="contact-copy">
            <Reveal className="eyebrow"><span className="eyebrow-index">05</span><span>Contact</span></Reveal>
            <Reveal as="h2" id="contact-heading" delay={.05}>Have an idea?<br/><em>Let’s build it.</em></Reveal>
            <Reveal as="p" className="section-lede" delay={.1}>Internships, graduate roles, collaborations or just a hello — my inbox is always open.</Reveal>
            <Reveal delay={.15}><ContactLinks/></Reveal>
            <p className="contact-local mono"><span className="pulse"/>{profile.location} · {localTime}</p>
          </div>
          <ContactForm projectTopic={projectTopic} onClearTopic={() => setProjectTopic('')}/>
        </div>
      </section>
    </main>
    <footer className="footer container">
      <div className="footer-top">
        <p className="footer-word" aria-hidden="true">Sandul<em>Hansana</em></p>
        <a className="back-top" href="#home" aria-label="Back to top"><ArrowUp aria-hidden="true"/></a>
      </div>
      <div className="footer-bottom mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <div><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight aria-hidden="true"/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight aria-hidden="true"/></a><a href={profile.cv} download="Sandul-Hansana-CV.pdf">CV<ArrowUpRight aria-hidden="true"/></a></div>
        <span>Designed & built in Sri Lanka</span>
      </div>
    </footer>
    <ProjectDialog project={findProject(projectId)} onClose={closeProject} onNavigate={openProject} onDiscuss={discussProject}/>
    <CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} onProject={openProject} onTheme={toggleTheme}/>
  </>;
}
