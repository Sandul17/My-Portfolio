import React, { useEffect, useState } from 'react';
import { ContactForm, ContactLinks } from './Contact';
import { ProjectDialog } from './ProjectDialog';
import { projects } from './profile';
import { TicketCode } from './TicketCode';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [localTime, setLocalTime] = useState('');
  useEffect(() => {
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
    return () => { clearInterval(timer); revealObserver.disconnect(); navObserver.disconnect(); document.documentElement.classList.remove('motion-ready'); document.removeEventListener('keydown', keyHandler); };
  }, []);
  return <>

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
    <section id="home" className="hero container">
      <div className="hero-content">
        <span className="eyebrow hero-eyebrow"><span className="status-dot"></span> LEARNING. BUILDING. EVOLVING.</span>
        <p className="hello">Hey there, I’m Sandul <span className="wave" aria-hidden="true">✳</span></p>
        <h1>Turning ideas into<br/><span className="gradient-text">digital experiences.</span></h1>
        <p className="hero-role">Software Engineering Undergraduate <span>×</span><br className="role-break"/> Aspiring Full-Stack Developer</p>
        <p className="hero-description">A curious mind with a love for clean code and thoughtful design. Building useful things, one line at a time.</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <span aria-hidden="true">↗</span></a><a className="button button-secondary" href="assets/sandul-hansana-cv.pdf" download>Download CV <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5"/></svg></a></div>
        <div className="hero-meta"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>Based in Sri Lanka</span><span className="meta-divider"></span><span>Currently at IIT</span></div>
      </div>
      <div className="hero-art" role="img" aria-label="Creative illustration of a developer's workspace">
        <div className="orbital-grid"></div><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
        <div className="floating-tech tech-react" aria-hidden="true">⚛</div><div className="floating-tech tech-code" aria-hidden="true">&lt;/&gt;</div><div className="floating-tech tech-python" aria-hidden="true">Py<span>_</span></div>
        <div className="code-window">
          <div className="window-bar"><div className="window-dots"><i></i><i></i><i></i></div><span>about-me.js</span><span className="window-icon">⌘</span></div>
          <div className="code-body"><div className="code-line"><span className="line-number">01</span><span><b>const</b> developer <b>=</b> {'{'}</span></div><div className="code-line"><span className="line-number">02</span><span>&nbsp; name: <em>'Sandul Hansana'</em>,</span></div><div className="code-line"><span className="line-number">03</span><span>&nbsp; role: <em>'Problem Solver'</em>,</span></div><div className="code-line"><span className="line-number">04</span><span>&nbsp; basedIn: <em>'Sri Lanka'</em>,</span></div><div className="code-line"><span className="line-number">05</span><span>&nbsp; passion: [</span></div><div className="code-line"><span className="line-number">06</span><span>&nbsp;&nbsp;&nbsp; <em>'Building things'</em>,</span></div><div className="code-line"><span className="line-number">07</span><span>&nbsp;&nbsp;&nbsp; <em>'Learning every day'</em></span></div><div className="code-line"><span className="line-number">08</span><span>&nbsp; ],</span></div><div className="code-line"><span className="line-number">09</span><span>&nbsp; curiosity: <strong>Infinity</strong></span></div><div className="code-line"><span className="line-number">10</span><span>{'};'}<span className="caret">▏</span></span></div></div>
          <div className="code-footer"><span><i className="status-dot"></i> Always in development</span><span>JavaScript</span></div>
        </div>
        <div className="build-badge"><span className="sparkle">✦</span><div>Ideas into reality<small>That’s what I love to do.</small></div><span className="badge-arrow">↗</span></div>
        <span className="art-coordinate">IDEAS → CODE → IMPACT <span>LK</span></span>
      </div>
      <a className="scroll-hint" href="#about"><span className="mouse"><i></i></span> SCROLL TO EXPLORE <span>↓</span></a>
    </section>

    <div className="tech-ribbon"><div className="container"><span className="ribbon-label">MY EVERYDAY TOOLKIT</span><span><b className="react-symbol">⚛</b> React</span><span><b className="js-symbol">JS</b> JavaScript</span><span><b className="python-symbol">◈</b> Python</span><span><b className="java-symbol">♨</b> Java</span><span><b>⌘</b> Git & GitHub</span><span className="ribbon-plus">+ a little curiosity</span></div></div>

    <section id="about" className="section container reveal">
      <div className="section-label"><span>01 / ABOUT ME</span><span className="label-line"></span></div>
      <div className="about-layout">
        <div><h2>More than just<br/><span className="text-muted">lines of code.</span></h2><div className="about-monogram" aria-hidden="true"><div className="monogram-grid"></div><span>SH<span className="monogram-period">.</span></span><div className="monogram-caption">A BUILDER AT HEART <span>↗</span></div></div></div>
        <div className="about-copy"><span className="little-label">A LITTLE ABOUT THE PERSON BEHIND THE CODE</span><h3>Hi, I’m Sandul Hansana.<br/>A learner, a thinker, a builder.</h3><p>I’m a fourth-year Software Engineering undergraduate at the <strong>Informatics Institute of Technology (IIT)</strong>, passionate about software development, web technologies, and solving real-world problems through innovative solutions.</p><p>I enjoy building user-friendly applications, exploring new technologies, and continuously sharpening my technical and problem-solving skills. My journey is about connecting what I learn with things that make a difference.</p><div className="about-values"><span><i>↗</i> Always learning</span><span><i>◇</i> Detail-oriented</span><span><i>⌘</i> Problem-driven</span></div><a className="text-link" href="#contact">Let’s build something together <span>↗</span></a></div>
      </div>
    </section>

    <section id="skills" className="section skills-section reveal"><div className="container">
      <div className="section-label"><span>02 / MY TOOLBOX</span><span className="label-line"></span></div>
      <div className="section-heading"><h2>The skills behind<br/><span className="text-muted">the solutions.</span></h2><p>A growing collection of technologies and tools<br className="desktop-break"/> I use to bring ideas to life.</p></div>
      <div className="skills-grid">
        <article className="skill-card"><div className="skill-icon blue">&lt;/&gt;</div><h3>Frontend development</h3><p>Interfaces with people in mind.</p><div className="skill-tags"><span>HTML</span><span>CSS</span><span>JavaScript</span><span>React</span></div><span className="card-number">01</span></article>
        <article className="skill-card"><div className="skill-icon purple">{'{ }'}</div><h3>Backend & languages</h3><p>The logic that makes it all work.</p><div className="skill-tags"><span>Java</span><span>Python</span><span>JavaScript</span></div><span className="card-number">02</span></article>
        <article className="skill-card"><div className="skill-icon teal">⌘</div><h3>Tools & workflow</h3><p>Better tools. Better building.</p><div className="skill-tags"><span>Git</span><span>GitHub</span><span>VS Code</span><span>IntelliJ IDEA</span></div><span className="card-number">03</span></article>
        <article className="skill-card"><div className="skill-icon amber">◇</div><h3>Core foundations</h3><p>Good software starts with good thinking.</p><div className="skill-tags"><span>Object-Oriented Programming</span><span>Software Engineering</span><span>Problem Solving</span></div><span className="card-number">04</span></article>
      </div>
    </div></section>

    <section id="projects" className="section container reveal">
      <div className="section-label"><span>03 / SELECTED WORK</span><span className="label-line"></span></div>
      <div className="section-heading"><h2>Learning by building.<br/><span className="text-muted">Here’s the proof.</span></h2><p>Academic projects, experiments, and things<br className="desktop-break"/> I’ve brought to life along the way.</p></div>
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
