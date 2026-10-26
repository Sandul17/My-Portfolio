import React from 'react';
import { ArrowUpRight, BriefcaseBusiness, FolderCode, GraduationCap, MapPin } from 'lucide-react';
import { RevealSection } from './Animated';
import experience from './data/experience.json';
import { projectCatalog } from './project-data';

export function About() {
  return <RevealSection id="about" className="section container about-advanced" aria-labelledby="about-heading">
    <div className="section-label"><span>01 / THE PERSON BEHIND THE CODE</span><span className="label-line"/></div>
    <div className="about-bento">
      <div className="about-story"><span className="little-label">HELLO, I’M SANDUL HANSANA</span><h2 id="about-heading">Curiosity as a mindset.<br/><span className="text-muted">Building as a habit.</span></h2><p>I’m a fourth-year Software Engineering undergraduate at the <strong>Informatics Institute of Technology (IIT)</strong>, passionate about software development, web technologies, and solving real-world problems.</p><p>I’ve completed internships at Sri Lanka Telecom and the Prime Minister’s Office Sri Lanka. I enjoy building user-friendly applications, exploring new technologies, and connecting what I learn with practical experience.</p><div className="about-values"><span>↗ Always learning</span><span>◇ Thoughtful interfaces</span><span>⌘ Practical problem solving</span></div><a className="text-link" href="#journey">Explore my journey<ArrowUpRight aria-hidden="true"/></a></div>
      <div className="about-person-card"><div className="about-person-top"><span className="little-label">A BUILDER AT HEART</span><MapPin aria-hidden="true"/></div><div className="about-avatar" aria-hidden="true"><span>SH<span>.</span></span><i/></div><h3>Sandul Hansana</h3><p>Software Engineering Undergraduate</p><span className="about-location"><span className="status-dot"/> Sri Lanka</span><div className="about-campus"><img src="/assets/logos/iit.png" alt="IIT logo" loading="lazy" width="2233" height="916"/><div><span>CURRENTLY STUDYING</span><strong>Fourth-year at IIT</strong></div><ArrowUpRight aria-hidden="true"/></div></div>
      <a className="about-fact" href="#journey"><span className="about-fact-icon"><BriefcaseBusiness aria-hidden="true"/></span><div><strong>{String(experience.length).padStart(2,'0')}</strong><span>Internship experiences</span></div><ArrowUpRight aria-hidden="true"/></a>
      <a className="about-fact" href="#projects"><span className="about-fact-icon"><FolderCode aria-hidden="true"/></span><div><strong>{String(projectCatalog.length).padStart(2,'0')}</strong><span>Projects to explore</span></div><ArrowUpRight aria-hidden="true"/></a>
      <a className="about-fact" href="#journey"><span className="about-fact-icon"><GraduationCap aria-hidden="true"/></span><div><strong>BEng<span> (Hons)</span></strong><span>Software Engineering</span></div><ArrowUpRight aria-hidden="true"/></a>
    </div>
  </RevealSection>;
}
