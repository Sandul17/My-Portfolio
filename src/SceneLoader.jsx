import React, { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { useMotionPreference } from './motion-preferences';

const HeroScene = lazy(() => import('./HeroScene'));

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function SceneLoader({ onReady, onUnavailable }) {
  const area = useRef(null);
  const inView = useInView(area, { margin: '100px' });
  const reduced = useMotionPreference();
  const [supported, setSupported] = useState(false);
  const [visible, setVisible] = useState(!document.hidden);
  const [failed, setFailed] = useState(false);
  const unavailable = useCallback(() => { setFailed(true); onUnavailable(); }, [onUnavailable]);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 700px)');
    const check = () => {
      if (reduced || !desktop.matches || navigator.connection?.saveData) { setSupported(false); onUnavailable(); return; }
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2');
        setSupported(Boolean(gl));
        gl?.getExtension('WEBGL_lose_context')?.loseContext();
      } catch { setSupported(false); }
    };
    check(); desktop.addEventListener('change', check);
    return () => desktop.removeEventListener('change', check);
  }, [reduced, onUnavailable]);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return <div className="three-scene" ref={area} aria-hidden="true">
    {supported && !failed && <SceneBoundary onUnavailable={unavailable}><Suspense fallback={null}>
      <HeroScene active={inView && visible} onReady={onReady} onUnavailable={unavailable}/>
    </Suspense></SceneBoundary>}
  </div>;
}
