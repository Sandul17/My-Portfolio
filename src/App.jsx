import React, { useEffect, useState } from 'react';
import { ContactForm, ContactLinks } from './Contact';
import { ProjectDialog } from './ProjectDialog';
import { projects } from './profile';
import { TicketCode } from './TicketCode';
import { Skills } from './Skills';
import { Hero, TechRibbon } from './Hero';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [localTime, setLocalTime] = useState('');
  useEffect(() => {
    let scrollFrame;
    const updateProgress = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty('--scroll-progress', height > 0 ? window.scrollY / height : 0);
      });
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    const updateTime = () => setLocalTime(new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Colombo',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date()) + ' LOCAL TIME');
    updateTime();
    const timer = setInterval(updateTime, 60000);
    const keyHandler = (event) => { if(event.key === 'Escape') setNavOpen(false); };
    document.addEventListener('keydown', keyHandler);
    const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }), {threshold:0.08});
    if(motion) { document.documentElement.classList.add('motion-ready'); document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element)); }
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) document.querySelectorAll('nav a').forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id)); }), {rootMargin:'-15% 0px -65% 0px'});
    document.querySelectorAll('main section[id]').forEach(section => navObserver.observe(section));
    return () => { window.removeEventListener('scroll', updateProgress); cancelAnimationFrame(scrollFrame); clearInterval(timer); revealObserver.disconnect(); navObserver.disconnect(); document.documentElement.classList.remove('motion-ready'); document.removeEventListener('keydown', keyHandler); };
  }, []);
  return <>

  <div className="reading-progress" aria-hidden="true"/>
  <a className="skip-link" href="#main">Skip to content</a>
  <header className="header">
    <div className="nav-wrap container">
      <a className="brand" href="#home" aria-label="Sandul Hansana home"><span className="brand-mark">s<span>.</span></span><span>sandul<span className="muted">.dev</span></span></a>
      <button className="menu-toggle" onClick={() => setNavOpen(!navOpen)} aria-expanded={navOpen} aria-controls="navigation" aria-label={navOpen ? "Close navigation" : "Open navigation"}><span></span><span></span></button>
      <nav id="navigation" className={navOpen ? "is-open" : ""} onClick={(event) => { if(event.target.closest("a")) setNavOpen(false); }} aria-label="Main navigation">
        <a href="#home" className="active">Home</a><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#journey">Journey</a>
        <a className="nav-contact" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>

  <main id="main">
    <Hero localTime={localTime}/>
    <TechRibbon/>

    <section id="about" className="section container reveal">
      <div className="section-label"><span>01 / ABOUT ME</span><span className="label-line"></span></div>
      <div className="about-layout">
        <div><h2>A curious mind.<br/><span className="text-muted">A builder at heart.</span></h2><div className="about-monogram" aria-hidden="true"><div className="monogram-grid"></div><span>SH<span className="monogram-period">.</span></span><div className="monogram-caption">A BUILDER AT HEART <span>↗</span></div></div></div>
        <div className="about-copy"><span className="little-label">A LITTLE ABOUT THE PERSON BEHIND THE CODE</span><h3>Hi, I’m Sandul Hansana.<br/>A learner, a thinker, a builder.</h3><p>I’m a fourth-year Software Engineering undergraduate at the <strong>Informatics Institute of Technology (IIT)</strong>, passionate about software development, web technologies, and solving real-world problems through innovative solutions.</p><p>I enjoy building user-friendly applications, exploring new technologies, and continuously sharpening my technical and problem-solving skills. My journey is about connecting what I learn with things that make a difference.</p><div className="about-values"><span><i>↗</i> Always learning</span><span><i>◇</i> Detail-oriented</span><span><i>⌘</i> Problem-driven</span></div><a className="text-link" href="#contact">Let’s build something together <span>↗</span></a></div>
      </div>
    </section>

    <Skills/>

    <section id="projects" className="section container work-section reveal">
      <div className="section-label"><span>03 / SELECTED WORK</span><span className="label-line"></span></div>
      <div className="section-heading"><h2>A few things<br/><span className="text-muted">I’ve brought to life.</span></h2><p>Academic projects, experiments, and things<br className="desktop-break"/> I’ve brought to life along the way.</p></div>
      <div className="project-filters" role="group" aria-label="Filter projects"><button className={filter === "all" ? "filter active" : "filter"} onClick={() => setFilter("all")} aria-pressed={filter === "all"}>All projects <span>03</span></button><button className={filter === "research" ? "filter active" : "filter"} onClick={() => setFilter("research")} aria-pressed={filter === "research"}>Research</button><button className={filter === "development" ? "filter active" : "filter"} onClick={() => setFilter("development")} aria-pressed={filter === "development"}>Development</button></div>
      <div className="projects-grid">
        <article className="project-card project-featured" data-category="research" hidden={filter !== "all" && filter !== "research"}>
          <button className="project-visual plotguard-visual" onClick={() => setSelectedProject(projects.plotguard)} aria-label="Read about PlotGuard"><span className="project-type">FINAL YEAR RESEARCH</span><div className="plotguard-art"><div className="plot-grid"></div><div className="pg-shield"><svg viewBox="0 0 100 112" aria-hidden="true"><path d="M50 5 91 23v33c0 23-17 39-41 51C26 95 9 79 9 56V23Z"/><path className="shield-check" d="m32 55 12 12 25-27"/></svg></div><span className="pg-dot dot-one"></span><span className="pg-dot dot-two"></span><span className="pg-dot dot-three"></span><span className="pg-brand">PlotGuard<span>RESEARCH. TECHNOLOGY. IMPACT.</span></span></div><span className="visual-caption">CONCEPT VISUAL</span><span className="project-open" aria-hidden="true">↗</span></button>
          <div className="project-info"><div className="project-category">RESEARCH · SOFTWARE ENGINEERING</div><h3><button onClick={() => setSelectedProject(projects.plotguard)}>PlotGuard <span>↗</span></button></h3><p>A final-year research project exploring how intelligent, user-friendly software can address a real-world problem.</p><div className="project-tags"><span>Final Year Project</span><span>Research</span><span>Problem Solving</span></div></div>
        </article>
        <article className="project-card" data-category="development" hidden={filter !== "all" && filter !== "development"}>
          <button className="project-visual ticket-visual" onClick={() => setSelectedProject(projects.tickets)} aria-label="Read about Interactive Ticket Booking System"><span className="project-type">CONSOLE APPLICATION</span><div className="ticket-terminal"><div><span className="terminal-dot"></span><span>ticket-booking / terminal</span><span>— □ ×</span></div><TicketCode/></div><span className="project-open" aria-hidden="true">↗</span></button>
          <div className="project-info"><div className="project-category">DEVELOPMENT · CONSOLE APPLICATION</div><h3><button onClick={() => setSelectedProject(projects.tickets)}>Interactive Ticket Booking <span>↗</span></button></h3><p>A console-based system to book seats, manage reservations, search tickets, and track ticket sales.</p><div className="project-tags"><span>Console Application</span><span>Seat Management</span><span>OOP</span></div></div>
        </article>
        <article className="project-card" data-category="development" hidden={filter !== "all" && filter !== "development"}>
          <button className="project-visual portfolio-visual" onClick={() => setSelectedProject(projects.portfolio)} aria-label="Read about Personal Portfolio Website"><span className="project-type">DESIGN & DEVELOPMENT</span><div className="mini-browser"><div className="mini-nav"><b>s.</b><span>About &nbsp; Work &nbsp; Contact</span></div><div className="mini-content"><small>HEY, I’M SANDUL</small><strong>Ideas meet<br/><em>possibility.</em></strong><span className="mini-button">Explore my work ↗</span></div><div className="mini-orb"></div><div className="mini-cards"><i></i><i></i><i></i></div></div><span className="project-open" aria-hidden="true">↗</span></button>
          <div className="project-info"><div className="project-category">DEVELOPMENT · RESPONSIVE WEB</div><h3><button onClick={() => setSelectedProject(projects.portfolio)}>Personal Portfolio <span>↗</span></button></h3><p>A little corner of the internet to share my skills, academic projects, background, and development journey.</p><div className="project-tags"><span>React</span><span>Tailwind CSS</span><span>JavaScript</span></div></div>
        </article>
      </div>
    </section>

    <section id="journey" className="section journey-section reveal"><div className="container">
      <div className="section-label"><span>04 / THE JOURNEY</span><span className="label-line"></span></div>
      <div className="journey-layout"><div><h2>Growing with<br/><span className="text-muted">every step.</span></h2><p className="journey-intro">A foundation in software engineering.<br/>A future full of possibilities.</p><div className="journey-note"><span>✦</span> The best part? There’s always more to learn.</div></div>
      <div className="timeline"><article className="timeline-item"><span className="timeline-dot"></span><div className="timeline-top"><span className="little-label">EDUCATION</span><span className="current-badge">CURRENT</span></div><h3>BEng (Hons) Software Engineering</h3><p className="institution">Informatics Institute of Technology (IIT)</p><p>Fourth-Year Undergraduate</p><div className="timeline-details"><span>Software development</span><span>Academic research</span><span>Engineering principles</span></div></article><article className="timeline-item"><span className="timeline-dot secondary-dot"></span><span className="little-label">EXPERIENCE & DEVELOPMENT</span><h3>Building through hands-on projects</h3><p>Applying academic knowledge through research and software projects, with a focus on practical problem solving and user-friendly applications.</p><a className="text-link" href="#projects">Explore my projects <span>↗</span></a></article></div></div>
    </div></section>

    <section id="contact" className="section container reveal">
      <div className="section-label"><span>05 / LET’S CONNECT</span><span className="label-line"></span></div>
      <div className="contact-layout"><div className="contact-copy"><span className="eyebrow"><span className="status-dot"></span> GOOD THINGS START WITH A CONVERSATION</span><h2>Have something<br/>in mind?<br/><span className="gradient-text">Let’s build it.</span></h2><p>A project idea, an opportunity, or just a hello.<br/>I’d love to hear from you.</p><ContactLinks/><div className="contact-location"><span>↗</span> Sri Lanka <span className="contact-time" id="local-time">{localTime}</span></div></div>
      <ContactForm/></div>
    </section>
  </main>
  <footer className="footer container"><a className="brand" href="#home"><span className="brand-mark">s<span>.</span></span><span>sandul<span className="muted">.dev</span></span></a><p>Thoughtfully built. Always evolving.</p><span>© <span id="year">{new Date().getFullYear()}</span> Sandul Hansana</span><a className="back-top" href="#home" aria-label="Back to top">↑</a></footer>
  <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)}/>

</>;
}
