import React, { useEffect, useState } from 'react';
import { AnimatePresence, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowDownRight, ArrowUpRight, Download, GraduationCap, MapPin, Search } from 'lucide-react';
import { MagneticLink } from './Animated';
import { SkillIcon } from './SkillIcon';
import { useMotionPreference } from './motion-preferences';
import { profile, projects } from './profile';
import experience from './data/experience.json';

const ease = [.2, .7, .2, 1];
const rotating = ['people.', 'the web.', 'mobile.', 'real users.'];

/* Each word rises out of a mask, one after another. */
function Words({ text, delay = 0, className = '' }) {
  const reduced = useMotionPreference();
  return text.split(' ').map((word, i) => <React.Fragment key={i}>
    <span className={`word-mask ${className}`}><m.span className="word" initial={reduced ? false : { y: '110%', rotate: 6 }} animate={{ y: '0%', rotate: 0 }} transition={{ duration: .9, ease, delay: delay + i * .07 }}>{word}</m.span></span>{' '}
  </React.Fragment>);
}

function RotatingWord() {
  const reduced = useMotionPreference();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => setIndex(i => (i + 1) % rotating.length), 2600);
    return () => clearInterval(timer);
  }, [reduced]);
  return <span className="word-mask rotator" aria-live="off">
    <span className="sr-only">{rotating[0]}</span>
    <AnimatePresence mode="wait" initial={false}>
      <m.span key={rotating[index]} className="word accent-word" aria-hidden="true"
        initial={reduced ? false : { y: '100%', opacity: 0, filter: 'blur(6px)' }} animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
        exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }} transition={{ duration: .38, ease }}>{rotating[index]}</m.span>
    </AnimatePresence>
  </span>;
}

function CircleText() {
  const text = 'SOFTWARE ENGINEER • UI/UX • FULL-STACK • ';
  return <svg className="circle-text" viewBox="0 0 120 120" aria-hidden="true">
    <defs><path id="circle-path" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0"/></defs>
    <text><textPath href="#circle-path" textLength="289">{text}</textPath></text>
  </svg>;
}

function Float({ className, style, delay, from = { y: 20 }, children }) {
  const reduced = useMotionPreference();
  return <m.div className={className} style={style}>
    <m.div className="pop" initial={reduced ? false : { opacity: 0, scale: .6, ...from }} animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 16, delay }}>{children}</m.div>
  </m.div>;
}

function Portrait({ localTime }) {
  const reduced = useMotionPreference();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 18 });
  const sy = useSpring(py, { stiffness: 80, damping: 18 });
  const layer = depth => ({ x: useTransform(sx, v => v * depth), y: useTransform(sy, v => v * depth) });
  const back = layer(-14), photo = layer(10), front = layer(26), far = layer(38);
  const rotX = useTransform(sy, v => v * -.35);
  const rotY = useTransform(sx, v => v * .35);
  const move = e => {
    if (reduced || e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - .5) * 2);
    py.set(((e.clientY - r.top) / r.height - .5) * 2);
  };
  const reset = () => { px.set(0); py.set(0); };

  return <div className="portrait" onPointerMove={move} onPointerLeave={reset}>
    <m.div className="portrait-blob" style={back} aria-hidden="true"/>
    <m.div className="portrait-ring" style={back} aria-hidden="true"/>

    <m.div className="portrait-frame-wrap" style={{ ...photo, rotateX: reduced ? 0 : rotX, rotateY: reduced ? 0 : rotY, transformPerspective: 900 }}>
      <m.div className="portrait-frame" initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 32px 32px)' }} animate={{ clipPath: 'inset(0% 0% 0% 0% round 999px 999px 32px 32px)' }} transition={{ duration: 1.2, ease: [.7, 0, .2, 1], delay: .3 }}>
        <m.img src="assets/sandul.jpg" alt="Sandul Hansana" width="1333" height="2000" decoding="async" fetchPriority="high"
          initial={reduced ? false : { scale: 1.4 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease, delay: .3 }}/>
        <span className="portrait-sheen" aria-hidden="true"/>
      </m.div>
    </m.div>

    <Float className="portrait-badge" style={far} delay={1.1} from={{ rotate: -90 }}><CircleText/><span className="portrait-badge-core">👋</span></Float>

    <Float className="float-chip chip-a" style={front} delay={1.25}><span className="bob"><SkillIcon name="react"/>React</span></Float>
    <Float className="float-chip chip-b" style={far} delay={1.35}><span className="bob" style={{ animationDelay: '-1.2s' }}><SkillIcon name="laravel"/>Laravel</span></Float>
    <Float className="float-chip chip-c" style={front} delay={1.45}><span className="bob" style={{ animationDelay: '-2.1s' }}><SkillIcon name="figma"/>Figma</span></Float>

    <Float className="float-card card-study" style={far} delay={1.55} from={{ x: -20 }}>
      <span className="float-card-icon"><GraduationCap aria-hidden="true"/></span>
      <div><strong>BEng (Hons) SE</strong><span>4th year · IIT</span></div>
    </Float>
    <Float className="float-card card-loc" style={front} delay={1.65} from={{ x: 20 }}>
      <span className="pulse"/>
      <div><strong><MapPin aria-hidden="true"/>{profile.location}</strong><span className="mono">{localTime}</span></div>
    </Float>
  </div>;
}

export function Hero({ localTime, onSearch }) {
  const reduced = useMotionPreference();
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}px ${my}px, var(--spot), transparent 60%)`;
  const fade = d => ({ initial: reduced ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { duration: .9, ease, delay: d } });
  const stats = [[String(experience.length).padStart(2, '0'), 'Internships'], [String(projects.length).padStart(2, '0'), 'Projects'], ['4th', 'Year at IIT']];

  return <section id="home" className="hero" onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect(); mx.set(e.clientX - r.left); my.set(e.clientY - r.top); }}>
    <div className="hero-bg" aria-hidden="true"><span className="blob blob-a"/><span className="blob blob-b"/><span className="hero-grid"/><m.span className="hero-spot" style={{ background: spotlight }}/></div>
    <div className="container hero-inner">
      <div className="hero-copy">
        <m.a href="#contact" className="status-badge" {...fade(0)}><span className="pulse"/>Open to opportunities<ArrowUpRight aria-hidden="true"/></m.a>
        <h1 aria-label={`I build thoughtful software for ${rotating[0]}`}>
          <span aria-hidden="true">
            <span className="h1-line"><Words text="I build" delay={.1}/><span className="word-mask"><m.em className="word" initial={reduced ? false : { y: '110%', rotate: 6 }} animate={{ y: '0%', rotate: 0 }} transition={{ duration: .9, ease, delay: .24 }}>thoughtful</m.em></span></span>
            <span className="h1-line"><Words text="software for" delay={.32}/></span>
            <span className="h1-line"><RotatingWord/></span>
          </span>
        </h1>
        <m.p className="hero-lede" {...fade(.55)}>I’m <strong>Sandul Hansana</strong> — a Software Engineering undergraduate at IIT, crafting responsive, user-focused web and mobile apps where clean code meets clean design.</m.p>
        <m.div className="hero-actions" {...fade(.65)}>
          <MagneticLink className="button button-solid button-lg" href="#projects">View my work<ArrowDownRight aria-hidden="true"/></MagneticLink>
          <MagneticLink className="button button-ghost button-lg" href={profile.cv} download="Sandul-Hansana-CV.pdf">Download CV<Download aria-hidden="true"/></MagneticLink>
        </m.div>
        <m.dl className="hero-stats" {...fade(.75)}>
          {stats.map(([v, l]) => <div key={l}><dt>{l}</dt><dd>{v}</dd></div>)}
        </m.dl>
        <m.button type="button" className="hero-hint" onClick={onSearch} {...fade(.85)}><Search aria-hidden="true"/>Press <kbd>⌘</kbd><kbd>K</kbd> to explore</m.button>
      </div>
      <Portrait localTime={localTime}/>
    </div>
    <Marquee/>
  </section>;
}

const ribbon = [['React', 'react'], ['JavaScript', 'javascript'], ['Laravel', 'laravel'], ['Node.js', 'nodejs'], ['React Native', 'react'], ['MySQL', 'mysql'], ['MongoDB', 'mongodb'], ['Java', 'java'], ['Python', 'python'], ['PHP', 'php'], ['Bootstrap', 'bootstrap'], ['Figma', 'figma']];

function Marquee() {
  const row = ribbon.map(([label, icon]) => <span className="marquee-item" key={label}><SkillIcon name={icon}/>{label}</span>);
  return <div className="marquee" aria-label="Technologies I work with"><div className="marquee-track"><div>{row}</div><div aria-hidden="true">{row}</div></div></div>;
}
