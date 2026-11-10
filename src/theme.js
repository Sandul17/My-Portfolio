import { useCallback, useEffect, useState } from 'react';

const KEY = 'theme';
const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const system = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || read() || system());
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b1120' : '#f8f9fa');
  }, [theme]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const follow = () => { if (!read()) setTheme(system()); };
    media.addEventListener('change', follow);
    return () => media.removeEventListener('change', follow);
  }, []);
  const toggle = useCallback(event => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const apply = () => { setTheme(next); document.documentElement.dataset.theme = next; try { localStorage.setItem(KEY, next); } catch {} };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduced) { apply(); return; }
    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? 0;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 550, easing: 'cubic-bezier(.2,.7,.2,1)', pseudoElement: '::view-transition-new(root)' },
    )).catch(() => {});
  }, [theme]);
  return [theme, toggle];
}
