import React from 'react';
import { Boxes, CodeXml, Lightbulb, Network, Server, Wrench } from 'lucide-react';

const foundationIcons = { frontend: CodeXml, backend: Server, tools: Wrench, oop: Boxes, engineering: Network, problem: Lightbulb };

// Local SVGs keep skill icons crisp without external requests or icon fonts.
export function SkillIcon({ name, className = '' }) {
  const Foundation = foundationIcons[name];
  if (Foundation) return <Foundation className={`skill-svg skill-svg-outline ${className}`} aria-hidden="true" focusable="false"/>;
  let artwork;
  switch (name) {
    case 'html':
    case 'css': {
      const html = name === 'html';
      artwork = <><path d="m3 2 1.7 19L12 23l7.3-2L21 2Z" fill={html ? '#e44d26' : '#1572b6'}/><path d="M12 3.6v17.7l5.9-1.6L19.4 3.6Z" fill={html ? '#f16529' : '#33a9dc'}/>{html ? <path d="M7 6h10l-.2 2.3H9.5l.2 2.4h6.9l-.6 6.7-4 1.1-4-1.1-.3-3.5h2.3l.1 1.7 1.9.5 1.9-.5.2-2.6H7.6Z" fill="#fff"/> : <path d="M7 6h10l-.3 2.3-5.3 2.3h5.1l-.6 6.8-3.9 1.1-4-1.1-.3-3.3H10l.1 1.5 1.9.5 1.9-.5.2-2.7H7.5l-.2-2.3 5.4-2.3H7.2Z" fill="#fff"/>}</>;
      break;
    }
    case 'javascript':
      artwork = <><rect x="1" y="1" width="22" height="22" rx="3" fill="#f7df1e"/><text x="5" y="19" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="12" fill="#171717" stroke="none">JS</text></>;
      break;
    case 'react':
      artwork = <g stroke="#61dafb" strokeWidth="1.15" fill="none"><ellipse cx="12" cy="12" rx="10.5" ry="4"/><ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="2" fill="#61dafb" stroke="none"/></g>;
      break;
    case 'python':
      artwork = <><path d="M12 1C6 1 6 3.3 6 6v2h7v1H4c-3 0-3 7 0 7h2v-3c0-2 1.5-3 3-3h6c2 0 3-1 3-3V4c0-2-3-3-6-3Z" fill="#4584b6"/><path d="M12 23c6 0 6-2.3 6-5v-2h-7v-1h9c3 0 3-7 0-7h-2v3c0 2-1.5 3-3 3H9c-2 0-3 1-3 3v3c0 2 3 3 6 3Z" fill="#ffde57"/><circle cx="9" cy="4.5" r="1" fill="#fff"/><circle cx="15" cy="19.5" r="1" fill="#fff"/></>;
      break;
    case 'java':
      artwork = <><g fill="none" strokeWidth="1.3"><path d="M14 1c4 4-8 5-3 9M17 4c-6 3 2 3-3 6" stroke="#ed7957"/><path d="M5 12c0-2 12-2 12 0s-12 2-12 0Zm1 1 1 5c1 2 8 2 9 0l1-5m1-1c5-1 4 5 0 5M5 20c-5 2 15 4 16 0" stroke="#79a9d4"/></g></>;
      break;
    case 'php':
      artwork = <><ellipse cx="12" cy="12" rx="11.5" ry="7" fill="#8993be"/><text x="3" y="15" fontFamily="Arial,sans-serif" fontStyle="italic" fontWeight="700" fontSize="9.5" fill="#151725" stroke="none">php</text></>;
      break;
    case 'nodejs':
      artwork = <><path d="m12 1 9.5 5.5v11L12 23l-9.5-5.5v-11Z" fill="#68a063"/><text x="4.5" y="16" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="10" fill="#fff" stroke="none">JS</text></>;
      break;
    case 'git':
      artwork = <><rect x="3.5" y="3.5" width="17" height="17" rx="2" transform="rotate(45 12 12)" fill="#f05032"/><path d="m8 6 8 8m-7-7v11" stroke="#fff" strokeWidth="1.6"/><g fill="#fff"><circle cx="9" cy="7" r="1.7"/><circle cx="16" cy="14" r="1.7"/><circle cx="9" cy="18" r="1.7"/></g></>;
      break;
    case 'github':
      artwork = <path fill="currentColor" d="M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.2.8-.5v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.2c-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2a4.7 4.7 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .5.4.8 1.1.8 2.2v3.4c0 .3.2.6.8.5A11.4 11.4 0 0 0 12 .8Z"/>;
      break;
    case 'vscode':
      artwork = <><path d="m17 1 6 3v16l-6 3L5 13 2 16l-2-1V9l2-1 3 3Z" fill="#23a9f2"/><path d="m17 6-8 6 8 6Z" fill="#0c0e17"/><path d="m17 1 6 3v16l-6 3Z" fill="#007acc"/></>;
      break;
    case 'intellij':
      artwork = <><path d="M0 0h24v24H0Z" fill="#eb4d88"/><path d="m0 8 11-8h13L12 24H0Z" fill="#8264ef"/><path d="m9 0 15 8v16L7 12Z" fill="#318de2"/><rect x="3" y="3" width="18" height="18" fill="#11121a"/><text x="5.2" y="13" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="9" fill="#fff" stroke="none">IJ</text><path d="M5.5 18h6" stroke="#fff" strokeWidth="1.5"/></>;
      break;
    default:
      artwork = <><path d="M9 18h6m-5 3h4M8 14a7 7 0 1 1 8 0c-1 1-1 2-1 4H9c0-2 0-3-1-4Z"/><path d="m10 9 2 2 3-4"/></>;
  }
  const lineIcon = ['frontend', 'backend', 'tools', 'oop', 'engineering', 'problem'].includes(name);
  return <svg className={`skill-svg${lineIcon ? ' skill-svg-outline' : ''} ${className}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">{artwork}</svg>;
}
