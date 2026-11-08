import React from 'react';
import { useIsPresent, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import * as m from 'motion/react-m';
import { useMotionPreference } from './motion-preferences';

const ease = [.2, .7, .2, 1];

export function RevealSection({ children, ...props }) {
  const reduced = useMotionPreference();
  return <section {...props}><m.div initial={reduced ? false : { opacity: 0, y: 32, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: .06 }} transition={{ duration: reduced ? 0 : .8, type: 'tween', ease }}>{children}</m.div></section>;
}

export function Reveal({ children, as = 'div', delay = 0, className = '', ...props }) {
  const reduced = useMotionPreference();
  const Element = m[as];
  return <Element className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reduced ? 0 : .7, delay: reduced ? 0 : delay, type: 'tween', ease }} {...props}>{children}</Element>;
}

/* A card with a pointer-following spotlight border. */
export function Card({ children, className = '', index = 0, as = 'article', ...props }) {
  const reduced = useMotionPreference();
  const present = useIsPresent();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, var(--spot), transparent 65%)`;
  const Element = m[as];
  return <Element {...props} className={`card ${className}`} inert={!present ? true : undefined} layout="position"
    initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }}
    exit={{ opacity: 0, scale: reduced ? 1 : .97, transition: { duration: reduced ? 0 : .18 } }}
    transition={{ delay: reduced ? 0 : (index % 4) * .06, type: 'spring', stiffness: 140, damping: 24 }}
    onPointerMove={event => { if (event.pointerType === 'touch') return; const r = event.currentTarget.getBoundingClientRect(); x.set(event.clientX - r.left); y.set(event.clientY - r.top); }}
    onPointerLeave={() => { x.set(-400); y.set(-400); }}>
    <m.span className="card-glow" style={{ background: glow }} aria-hidden="true"/>{children}
  </Element>;
}

export function MagneticLink({ children, className = '', ...props }) {
  const reduced = useMotionPreference();
  const x = useSpring(0, { stiffness: 260, damping: 18 });
  const y = useSpring(0, { stiffness: 260, damping: 18 });
  return <m.a {...props} className={className} style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}
    onPointerMove={event => {
      if (reduced || event.pointerType === 'touch') return;
      const b = event.currentTarget.getBoundingClientRect();
      x.set((event.clientX - b.left - b.width / 2) * .18); y.set((event.clientY - b.top - b.height / 2) * .25);
    }} onPointerLeave={() => { x.set(0); y.set(0); }} whileTap={reduced ? undefined : { scale: .96 }}>{children}</m.a>;
}

export function SectionHead({ index, eyebrow, title, children, id }) {
  return <div className="section-head">
    <Reveal className="eyebrow"><span className="eyebrow-index">{index}</span><span>{eyebrow}</span></Reveal>
    <Reveal as="h2" id={id} delay={.05}>{title}</Reveal>
    {children && <Reveal as="p" className="section-lede" delay={.1}>{children}</Reveal>}
  </div>;
}
