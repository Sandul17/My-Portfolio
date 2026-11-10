import React, { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowUpRight, Award, Download, GraduationCap, Layers, MapPin, MonitorSmartphone, Palette, Sprout, Users } from 'lucide-react';
import { Card, Reveal } from './Animated';
import { useMotionPreference } from './motion-preferences';
import { achievements, education, profile, softSkills } from './profile';
import experience from './data/experience.json';

const intro = 'I’m a Software Engineering student who loves the space where code meets design — building responsive, user-focused applications that work beautifully and look clean.';

const principles = [
  { icon: MonitorSmartphone, title: 'Responsive by default', text: 'Interfaces that feel right on every screen, from phone to desktop.' },
  { icon: Palette, title: 'Design-minded', text: 'Front-end and UI/UX first — prototyped in Figma, polished in code.' },
  { icon: Layers, title: 'Full-stack curious', text: 'Comfortable across React, Laravel, Node.js and MySQL.' },
  { icon: Users, title: 'Team player', text: 'Clear communication and a quick learner in any environment.' },
];

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [.18, 1]);
  return <span className="about-word"><m.span style={{ opacity }}>{children}</m.span> </span>;
}

function ScrollText({ text }) {
  const ref = useRef(null);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(' ');
  if (reduced) return <p className="about-intro" ref={ref}>{text}</p>;
  return <p className="about-intro" ref={ref} aria-label={text}>
    <span aria-hidden="true">{words.map((w, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}</span>
  </p>;
}

function IdPhoto() {
  const reduced = useMotionPreference();
  return <m.div className="id-photo photo-ring" initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .4 }}
    whileHover={reduced ? undefined : { rotate: -3, scale: 1.03 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
    <m.div className="id-photo-frame" variants={{ hidden: { clipPath: 'inset(100% 0% 0% 0% round 22px)' }, visible: { clipPath: 'inset(0% 0% 0% 0% round 22px)', transition: { duration: 1, ease: [.7, 0, .2, 1] } } }}>
      <m.img src="assets/sandul.jpg" alt="Portrait of Sandul Hansana" width="1333" height="2000" loading="lazy" decoding="async"
        variants={{ hidden: { scale: 1.35 }, visible: { scale: 1, transition: { duration: 1.4, ease: [.2, .7, .2, 1] } } }}/>
    </m.div>
    <m.span className="id-photo-hi" aria-hidden="true" variants={{ hidden: { scale: 0, rotate: -30 }, visible: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 12, delay: .9 } } }}><span className="wave">👋</span> Hi!</m.span>
  </m.div>;
}

export function About() {
  return <section id="about" className="section container about" aria-labelledby="about-heading">
    <div className="about-layout">
      <aside className="about-aside">
        <Reveal className="eyebrow"><span className="eyebrow-index">01</span><span>About me</span></Reveal>
        <Reveal as="h2" id="about-heading" className="about-title" delay={.05}>Curious by nature, <em>builder</em> by habit.</Reveal>
        <Card as="div" className="id-card">
          <div className="id-card-top">
            <span className="mono">ID · SE-2026</span>
            <span className="id-status"><span className="pulse"/>Available</span>
          </div>
          <IdPhoto/>
          <strong className="id-name">{profile.name}</strong>
          <span className="id-full mono">{profile.fullName}</span>
          <dl className="id-facts">
            <div><dt>Role</dt><dd>{profile.role}</dd></div>
            <div><dt>Campus</dt><dd>IIT · University of Westminster</dd></div>
            <div><dt>Based</dt><dd><MapPin aria-hidden="true"/>{profile.location}</dd></div>
            <div><dt>Experience</dt><dd>{experience.length} internships</dd></div>
          </dl>
          <div className="id-actions">
            <a className="button button-solid" href={profile.cv} download="Sandul-Hansana-CV.pdf">CV<Download aria-hidden="true"/></a>
            <a className="button button-ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight aria-hidden="true"/></a>
          </div>
        </Card>
      </aside>

      <div className="about-main">
        <ScrollText text={intro}/>
        <Reveal as="p" className="about-sub">I’m eager to learn modern frameworks and tools, collaborate with teams, and help create high-quality, impactful digital products.</Reveal>

        <div className="principles">
          {principles.map(({ icon: Icon, title, text }, i) => <Card key={title} index={i} className="principle">
            <span className="principle-icon"><Icon aria-hidden="true"/></span>
            <h3>{title}</h3><p>{text}</p>
          </Card>)}
        </div>

        <Card className="about-block">
          <div className="about-block-head"><span className="card-label"><GraduationCap aria-hidden="true"/>Education</span><img src="assets/logos/iit.png" alt="Informatics Institute of Technology" width="2233" height="916" loading="lazy"/></div>
          <ol className="stepper">{education.map(e => <li key={e.title} className={e.current ? 'is-current' : ''}>
            <span className="stepper-dot" aria-hidden="true"/>
            <div className="stepper-body"><strong>{e.title}</strong><span>{e.place}</span></div>
            <span className="stepper-when mono">{e.when}</span>
          </li>)}</ol>
        </Card>

        <div className="about-pair">
          <Card className="about-block">
            <span className="card-label"><Award aria-hidden="true"/>Achievements</span>
            <ul className="award-list">{achievements.map(a => <li key={a.title}><strong>{a.title}</strong><span>{a.detail}</span></li>)}</ul>
          </Card>
          <Card className="about-block">
            <span className="card-label"><Sprout aria-hidden="true"/>How I work</span>
            <ul className="chip-cloud">{softSkills.map(s => <li key={s}>{s}</li>)}</ul>
          </Card>
        </div>
      </div>
    </div>
  </section>;
}
