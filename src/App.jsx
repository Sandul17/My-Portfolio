import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight, Search } from 'lucide-react';
import { ContactForm, ContactLinks } from './Contact';
import { ProjectDialog } from './ProjectDialog';
import { Skills } from './Skills';
import { Journey } from './Journey';
import { Hero, TechRibbon } from './Hero';
import { About } from './About';
import { Projects } from './Projects';
import { CommandMenu, Navigation, sections } from './Navigation';
import { findProject } from './project-data';
import { profile } from './profile';
import { ReadingProgress } from './Experience';
import { RevealSection } from './Animated';

const readProject = () => findProject(new URLSearchParams(window.location.search).get('project'))?.id ?? null;

export default function App() {
  const [projectId, setProjectId] = useState(readProject);
  const [commandOpen, setCommandOpen] = useState(false);
  const [projectTopic, setProjectTopic] = useState('');
  const [active, setActive] = useState('home');
  const [localTime, setLocalTime] = useState('');
  const closeProject = useCallback(() => {
    setProjectId(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has('project')) {url.searchParams.delete('project');window.history.replaceState(null,'',url.pathname+url.search+url.hash);}
  }, []);
  const openProject = useCallback(id => {
    if (!findProject(id)) return;
    setProjectId(id);
    const url=new URL(window.location.href);
    if(url.searchParams.has('project')){url.searchParams.set('project',id);window.history.replaceState(null,'',url.pathname+url.search+url.hash);}
  }, []);
  const openSearch = useCallback(() => {closeProject();setCommandOpen(true)},[closeProject]);
  const discussProject = useCallback(project => {
    closeProject();setProjectTopic(project.title);
    requestAnimationFrame(()=>{window.location.hash='contact';document.getElementById('contact')?.scrollIntoView({block:'start'});});
  },[closeProject]);
  useEffect(() => {
    const updateTime=()=>setLocalTime(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Colombo',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())+' LOCAL TIME');
    updateTime();const timer=setInterval(updateTime,60000);
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActive(entry.target.id)}),{rootMargin:'-15% 0px -65% 0px'});
    document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
    const historyChanged=()=>{setProjectId(readProject());const id=window.location.hash.slice(1);if(sections.some(section=>section.id===id))setActive(id)};
    window.addEventListener('popstate',historyChanged);window.addEventListener('hashchange',historyChanged);
    return()=>{clearInterval(timer);observer.disconnect();window.removeEventListener('popstate',historyChanged);window.removeEventListener('hashchange',historyChanged)};
  },[]);
  useEffect(()=>{const shortcut=e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();closeProject();setCommandOpen(current=>!current)}};document.addEventListener('keydown',shortcut);return()=>document.removeEventListener('keydown',shortcut)},[closeProject]);
  return <>
    <ReadingProgress/><a className="skip-link" href="#main">Skip to content</a>
    <Navigation active={active} onSearch={openSearch}/>
    <main id="main" tabIndex={-1}>
      <Hero localTime={localTime} onSearch={openSearch}/><TechRibbon/>
      <About/><Skills/><Projects onOpen={openProject}/><Journey/>
      <RevealSection id="contact" className="section container" aria-labelledby="contact-heading"><div className="section-label"><span>05 / LET’S CONNECT</span><span className="label-line"/></div><div className="contact-layout"><div className="contact-copy"><span className="eyebrow"><span className="status-dot"/>GOOD THINGS START WITH A CONVERSATION</span><h2 id="contact-heading">Have something<br/>in mind?<br/><span className="gradient-text">Let’s build it.</span></h2><p>A project idea, an opportunity, or just a hello.<br/>I’d love to hear from you.</p><ContactLinks/><div className="contact-location"><span>↗</span>Sri Lanka<span className="contact-time">{localTime}</span></div></div><ContactForm projectTopic={projectTopic} onClearTopic={()=>setProjectTopic('')}/></div></RevealSection>
    </main>
    <footer className="site-footer container"><div className="site-footer-main"><a className="brand" href="#home"><span className="brand-mark">s<span>.</span></span><span>sandul<span className="muted">.dev</span></span></a><span>Thoughtfully built. Always evolving.</span><div className="site-footer-links"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight aria-hidden="true"/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight aria-hidden="true"/></a><button type="button" onClick={openSearch}><Search aria-hidden="true"/>Quick navigation</button></div></div><div className="site-footer-bottom"><span>© {new Date().getFullYear()} Sandul Hansana</span><span>Based in Sri Lanka · Built with curiosity</span><a className="back-top" href="#home" aria-label="Back to top"><ArrowUp aria-hidden="true"/></a></div></footer>
    <ProjectDialog project={findProject(projectId)} onClose={closeProject} onNavigate={openProject} onDiscuss={discussProject}/>
    <CommandMenu open={commandOpen} onClose={()=>setCommandOpen(false)} onProject={openProject}/>
  </>;
}
