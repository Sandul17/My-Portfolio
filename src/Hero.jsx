import React, { useRef } from 'react';
import { SkillIcon } from './SkillIcon';

function DigitalOrb() {
  return <svg className="digital-orb" viewBox="0 0 560 560" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="orb-body" cx="32%" cy="25%" r="78%"><stop stopColor="#344d67"/><stop offset=".38" stopColor="#142837"/><stop offset=".75" stopColor="#121128"/><stop offset="1" stopColor="#080d15"/></radialGradient>
      <linearGradient id="orb-wire" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8ce4e4"/><stop offset=".4" stopColor="#629eef"/><stop offset=".75" stopColor="#a28afb"/><stop offset="1" stopColor="#d4abff"/></linearGradient>
      <linearGradient id="orb-ring"><stop stopColor="#70d2e1" stopOpacity=".05"/><stop offset=".4" stopColor="#9a97fb" stopOpacity=".9"/><stop offset=".8" stopColor="#b5a5ff" stopOpacity=".6"/><stop offset="1" stopColor="#70d2e1" stopOpacity=".05"/></linearGradient>
      <radialGradient id="orb-light" cx="30%" cy="25%"><stop stopColor="#a4efff" stopOpacity=".5"/><stop offset=".65" stopColor="#7396ee" stopOpacity=".06"/><stop offset="1" stopColor="#111422" stopOpacity="0"/></radialGradient>
      <clipPath id="orb-clip"><circle cx="280" cy="280" r="172"/></clipPath>
    </defs>
    <ellipse className="orb-outer-track" cx="280" cy="280" rx="256" ry="121" transform="rotate(-33 280 280)"/>
    <ellipse className="orb-outer-track faint-track" cx="280" cy="280" rx="226" ry="218" transform="rotate(24 280 280)"/>
    <circle cx="280" cy="280" r="172" fill="url(#orb-body)" stroke="url(#orb-wire)" strokeWidth=".8"/>
    <g clipPath="url(#orb-clip)" transform="rotate(-28 280 280)" fill="none" stroke="url(#orb-wire)" strokeWidth=".7" opacity=".6">
      {[18, 46, 76, 105, 134, 158, 171].map(radius => <ellipse key={radius} cx="280" cy="280" rx={radius} ry="172"/>)}
      {[-153, -120, -82, -42, 0, 42, 82, 120, 153].map(offset => <ellipse key={offset} cx="280" cy={280 + offset} rx={Math.sqrt(172 * 172 - offset * offset)} ry={Math.sqrt(172 * 172 - offset * offset) * .22}/>) }
    </g>
    <circle cx="280" cy="280" r="171" fill="url(#orb-light)"/>
    <ellipse className="orb-front-ring" cx="280" cy="280" rx="237" ry="77" transform="rotate(-33 280 280)"/>
    <g className="orb-stars" fill="#bbd9ff"><circle cx="88" cy="166" r="2"/><circle cx="464" cy="138" r="2.5"/><circle cx="483" cy="378" r="2"/><circle cx="187" cy="474" r="1.5"/><path d="M437 78v12m-6-6h12M75 365v10m-5-5h10" stroke="#a2b5f5" strokeWidth="1"/></g>
  </svg>;
}

export function Hero({ localTime }) {
  const visual = useRef(null);
  const handlePointer = event => {
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    visual.current.style.setProperty('--orb-x', `${(event.clientX - rect.left - rect.width / 2) * .025}px`);
    visual.current.style.setProperty('--orb-y', `${(event.clientY - rect.top - rect.height / 2) * .025}px`);
  };
  return <section id="home" className="hero container" onPointerMove={handlePointer} onPointerLeave={() => { visual.current?.style.setProperty('--orb-x', '0px'); visual.current?.style.setProperty('--orb-y', '0px'); }}>
    <div className="hero-content">
      <div className="hero-intro"><span className="intro-dash"/> THE PORTFOLIO OF SANDUL HANSANA</div>
      <h1>Ideas into<br/><span className="gradient-text">real impact.</span><span className="hero-asterisk" aria-hidden="true">✳</span></h1>
      <p className="hero-role">Software Engineering Undergraduate.<br/><span>Aspiring Full-Stack Developer.</span></p>
      <p className="hero-description">Curiosity drives me. Code is how I build.<br/>Creating thoughtful digital experiences, one idea at a time.</p>
      <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <span aria-hidden="true">↗</span></a><a className="button button-secondary" href="assets/sandul-hansana-cv.pdf" download>Download CV <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5"/></svg></a></div>
      <div className="hero-profile-line"><span className="status-dot"/><span>Fourth-year at <strong>IIT</strong></span><i/><span>Based in Sri Lanka <span aria-hidden="true">↗</span></span></div>
    </div>
    <div className="hero-art" ref={visual} role="img" aria-label="Animated wireframe globe surrounded by development tools">
      <div className="orb-halo"/><div className="orb-grid"/><DigitalOrb/>
      <span className="orb-coordinate">CURIOUS MIND. CREATIVE DEVELOPMENT.</span>
      <div className="orb-tech orb-tech-react"><SkillIcon name="react"/><span>React</span></div>
      <div className="orb-tech orb-tech-node"><SkillIcon name="nodejs"/><span>Node.js</span></div>
      <div className="orb-code-card"><div className="orb-code-heading"><span><i/><i/><i/></span><small>from-idea-to-impact.js</small><b>⌘</b></div><code><span>const</span> idea = <em>yourVision</em>;<br/><span>await</span> build(idea);<i className="code-cursor"/></code><div className="orb-code-footer"><span className="status-dot"/> A LITTLE CURIOSITY. A LOT OF POSSIBILITY.</div></div>
      <div className="orb-label"><span>✦</span><div>Built with intention.<small>Always a work in progress.</small></div></div>
      <span className="orb-edition">SH / 2026 <span>01</span></span>
    </div>
    <div className="hero-bottom"><a className="scroll-hint" href="#about"><span className="scroll-circle">↓</span> A LITTLE MORE ABOUT ME</a><span className="hero-local"><span className="status-dot"/> SRI LANKA <span>{localTime}</span></span><span className="hero-index">SCROLL TO DISCOVER <span>↘</span></span></div>
  </section>;
}

export function TechRibbon() {
  return <div className="tech-ribbon"><div className="container"><span className="ribbon-label">MY BUILDING BLOCKS</span>{[['React','react'],['JavaScript','javascript'],['Node.js','nodejs'],['PHP','php'],['Python','python'],['Java','java']].map(([label,icon]) => <span className="ribbon-tech" key={icon}><SkillIcon name={icon}/>{label}</span>)}<span className="ribbon-plus">+ endless curiosity <span>✦</span></span></div></div>;
}
