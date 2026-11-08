import React, { useEffect } from 'react';
import { LazyMotion, MotionConfig, domMax, useScroll, useSpring } from 'motion/react';
import * as m from 'motion/react-m';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useMotionPreference } from './motion-preferences';

function SmoothScroll() {
  const reduced = useMotionPreference();
  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true, anchors: true,
      prevent: node => Boolean(node.closest('dialog, textarea, [data-native-scroll]')) });
    const sync = () => document.querySelector('dialog[open]') ? lenis.stop() : lenis.start();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ['open'], subtree: true });
    sync();
    return () => { observer.disconnect(); lenis.destroy(); };
  }, [reduced]);
  return null;
}

export function Providers({ children }) {
  const reduced = useMotionPreference();
  return <MotionConfig reducedMotion={reduced ? 'always' : 'never'} transition={{ type: 'spring', stiffness: 160, damping: 26 }}>
    <LazyMotion features={domMax} strict><SmoothScroll/>{children}</LazyMotion>
  </MotionConfig>;
}

export function ReadingProgress() {
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  return <m.div className="reading-progress" style={{ scaleX: reduced ? scrollYProgress : progress }} aria-hidden="true"/>;
}
