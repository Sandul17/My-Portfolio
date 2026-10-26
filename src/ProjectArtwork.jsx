import React from 'react';
import { TicketCode } from './TicketCode';

function Artwork({ id }) {
  if (id === 'plotguard') return <><span className="project-type">FINAL YEAR RESEARCH</span><div className="plotguard-art"><div className="plot-grid"></div><div className="pg-shield"><svg viewBox="0 0 100 112" aria-hidden="true"><path d="M50 5 91 23v33c0 23-17 39-41 51C26 95 9 79 9 56V23Z"/><path className="shield-check" d="m32 55 12 12 25-27"/></svg></div><span className="pg-dot dot-one"></span><span className="pg-dot dot-two"></span><span className="pg-dot dot-three"></span><span className="pg-brand">PlotGuard<span>RESEARCH. TECHNOLOGY. IMPACT.</span></span></div><span className="visual-caption">CONCEPT VISUAL</span></>;
  if (id === 'tickets') return <><span className="project-type">CONSOLE APPLICATION</span><div className="ticket-terminal"><div><span className="terminal-dot"></span><span>ticket-booking / terminal</span><span>— □ ×</span></div><TicketCode/></div><span className="visual-caption">ILLUSTRATIVE PREVIEW</span></>;
  if (id === 'portfolio') return <><span className="project-type">DESIGN & DEVELOPMENT</span><div className="mini-browser"><div className="mini-nav"><b>s.</b><span>About &nbsp; Work &nbsp; Contact</span></div><div className="mini-content"><small>HEY, I’M SANDUL</small><strong>Ideas meet<br/><em>possibility.</em></strong><span className="mini-button">Explore my work ↗</span></div><div className="mini-orb"></div><div className="mini-cards"><i></i><i></i><i></i></div></div><span className="visual-caption">ILLUSTRATIVE PREVIEW</span></>;
  return null;
}

export function ProjectArtwork({ project, onOpen }) {
  const Element = onOpen ? "button" : "div";
  return <Element type={onOpen ? "button" : undefined} className={`project-visual ${project.visual}-visual`} onClick={onOpen} role={onOpen ? undefined : "img"} aria-label={onOpen ? `Read about ${project.title}` : `${project.title} illustrative preview`}><Artwork id={project.id}/>{onOpen && <span className="project-open" aria-hidden="true">↗</span>}</Element>;
}
