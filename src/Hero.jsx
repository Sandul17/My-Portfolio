import React from 'react';
import * as m from 'motion/react-m';
import { ArrowDownRight, ArrowUpRight, Download, MapPin, Search } from 'lucide-react';
import { MagneticLink } from './Animated';
import { SkillIcon } from './SkillIcon';
import { useMotionPreference } from './motion-preferences';
import { profile, projects } from './profile';
import experience from './data/experience.json';

const ease = [.2, .7, .2, 1];

export function Hero({ localTime, onSearch }) {
  const reduced = useMotionPreference();
  const item = { hidden: { opacity: 0, y: 26, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: .9, ease } } };
  return <section id="home" className="hero">
    <div className="hero-bg" aria-hidden="true"><span className="blob blob-a"/><span className="blob blob-b"/><span className="hero-grid"/></div>
    <div className="container hero-inner">
      <m.div className="hero-copy" initial={reduced ? false : 'hidden'} animate="visible" variants={{ visible: { transition: { staggerChildren: .08, delayChildren: .1 } } }}>
        <m.a href="#contact" className="status-badge" variants={item}><span className="pulse"/>Open to opportunities<ArrowUpRight aria-hidden="true"/></m.a>
        <m.h1 variants={item}>Building <em>thoughtful</em> software for <span className="accent-word">people.</span></m.h1>
        <m.p className="hero-lede" variants={item}>I’m <strong>Sandul Hansana</strong> — a Software Engineering undergraduate at IIT, crafting responsive, user-focused web and mobile apps where clean code meets clean design.</m.p>
        <m.div className="hero-actions" variants={item}>
          <MagneticLink className="button button-solid button-lg" href="#projects">View my work<ArrowDownRight aria-hidden="true"/></MagneticLink>
          <MagneticLink className="button button-ghost button-lg" href={profile.cv} download="Sandul-Hansana-CV.pdf">Download CV<Download aria-hidden="true"/></MagneticLink>
        </m.div>
        <m.button variants={item} type="button" className="hero-hint" onClick={onSearch}><Search aria-hidden="true"/>Press <kbd>⌘</kbd><kbd>K</kbd> to explore</m.button>
      </m.div>

      <m.aside className="profile-card" aria-label="Profile summary" initial={reduced ? false : { opacity: 0, y: 30, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1, delay: .35, ease }}>
        <div className="profile-top">
          <m.div className="avatar photo-ring" initial={reduced ? false : { scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 16, delay: .7 }} whileHover={reduced ? undefined : { scale: 1.08, rotate: -4 }}><img src="assets/sandul.jpg" alt="Sandul Hansana" width="230" height="230" decoding="async"/></m.div>
          <div><strong>{profile.name}</strong><span>{profile.role}</span></div>
        </div>
        <div className="profile-rows">
          <div><span>Studying</span><strong>BEng (Hons) SE · IIT</strong></div>
          <div><span>Focus</span><strong>Front-end · Full-stack · UI/UX</strong></div>
          <div><span>Based in</span><strong><MapPin aria-hidden="true"/>{profile.location} <em className="mono">{localTime}</em></strong></div>
        </div>
        <div className="profile-stats">
          <div><strong>{String(experience.length).padStart(2, '0')}</strong><span>Internships</span></div>
          <div><strong>{String(projects.length).padStart(2, '0')}</strong><span>Projects</span></div>
          <div><strong>4<sup>th</sup></strong><span>Year at IIT</span></div>
        </div>
        <div className="profile-stack">{['react', 'laravel', 'nodejs', 'mysql', 'figma'].map(n => <span key={n} title={n}><SkillIcon name={n}/></span>)}<span className="mono">+10</span></div>
      </m.aside>
    </div>
    <Marquee/>
  </section>;
}

const ribbon = [['React', 'react'], ['JavaScript', 'javascript'], ['Laravel', 'laravel'], ['Node.js', 'nodejs'], ['React Native', 'react'], ['MySQL', 'mysql'], ['MongoDB', 'mongodb'], ['Java', 'java'], ['Python', 'python'], ['PHP', 'php'], ['Bootstrap', 'bootstrap'], ['Figma', 'figma']];

function Marquee() {
  const row = ribbon.map(([label, icon]) => <span className="marquee-item" key={label}><SkillIcon name={icon}/>{label}</span>);
  return <div className="marquee" aria-label="Technologies I work with"><div className="marquee-track"><div>{row}</div><div aria-hidden="true">{row}</div></div></div>;
}
