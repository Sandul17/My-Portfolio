import React from 'react';
import { useIsPresent, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { useMotionPreference } from './motion-preferences';
import * as m from 'motion/react-m';

export function RevealSection({ children, ...props }) {
  const reduced = useMotionPreference();
  // Keep the anchor itself stationary while its contents enter the viewport.
  return <section {...props}><m.div initial={reduced ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: reduced ? 0 : .65, type: 'tween', ease: [.2,.7,.3,1] }}>{children}</m.div></section>;
}

export function TiltCard({ children, className = '', index = 0, ...props }) {
  const reduced = useMotionPreference();
  const present = useIsPresent();
  const rotateX = useSpring(0, { stiffness: 190, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 190, damping: 24 });
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${spotX}px ${spotY}px, rgba(170,155,255,.13), transparent 70%)`;
  const move = event => {
    if (reduced || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    spotX.set(x); spotY.set(y);
    rotateY.set((x / rect.width - .5) * 7);
    rotateX.set((.5 - y / rect.height) * 7);
  };
  return <m.article {...props} className={`motion-card ${className}`} inert={!present ? true : undefined}
    layout="position" initial={reduced ? false : { opacity: 0, y: 25, scale: .98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .12 }}
    exit={{ opacity: 0, scale: reduced ? 1 : .96, transition: { duration: reduced ? 0 : .18 } }}
    transition={{ delay: reduced ? 0 : index * .07, type: 'spring', stiffness: 130, damping: 23 }}
    whileHover={reduced ? undefined : { y: -6 }}
    style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformPerspective: 1000 }}
    onPointerMove={move} onPointerLeave={() => { rotateX.set(0); rotateY.set(0); }}>
    <m.div className="card-spotlight" style={{ background: spotlight }} aria-hidden="true"/>{children}
  </m.article>;
}

export function MagneticLink({ children, className = '', ...props }) {
  const reduced = useMotionPreference();
  const x = useSpring(0, { stiffness: 260, damping: 20 });
  const y = useSpring(0, { stiffness: 260, damping: 20 });
  return <m.a {...props} className={`magnetic-link ${className}`} style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}
    onPointerMove={event => {
      if (reduced || event.pointerType === 'touch') return;
      const bounds = event.currentTarget.getBoundingClientRect();
      x.set((event.clientX - bounds.left - bounds.width / 2) * .13);
      y.set((event.clientY - bounds.top - bounds.height / 2) * .18);
    }} onPointerLeave={() => { x.set(0); y.set(0); }} whileTap={reduced ? undefined : { scale: .97 }}>{children}</m.a>;
}
