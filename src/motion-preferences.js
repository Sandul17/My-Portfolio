import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
const subscribe = notify => {
  const media = window.matchMedia(query);
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};
const snapshot = () => window.matchMedia(query).matches;

// Subscribe explicitly: Motion's hook snapshots the initial setting, while
// WebGL and scrolling also need to stop when the setting changes mid-session.
export function useMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, () => true);
}
