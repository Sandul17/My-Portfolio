import React, { useEffect, useRef, useState } from 'react';
import * as m from 'motion/react-m';
import { AnimatePresence } from 'motion/react';
import { ArrowUpRight, BriefcaseBusiness, ChevronRight, Command, CornerDownLeft, FileDown, FolderCode, House, Layers3, Mail, Menu, Moon, Search, Sun, UserRound, X } from 'lucide-react';
import { profile, projects } from './profile';
import { useNotice } from './Notice';

export const sections = [
  { id: 'home', label: 'Home', icon: House }, { id: 'about', label: 'About', icon: UserRound },
  { id: 'skills', label: 'Skills', icon: Layers3 }, { id: 'projects', label: 'Work', icon: FolderCode },
  { id: 'experience', label: 'Experience', icon: BriefcaseBusiness }, { id: 'contact', label: 'Contact', icon: Mail },
];

export function Navigation({ active, onSearch, theme, onTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const key = e => { if (e.key === 'Escape') setOpen(false); };
    const scroll = () => setScrolled(window.scrollY > 24);
    scroll(); document.addEventListener('keydown', key); window.addEventListener('scroll', scroll, { passive: true });
    return () => { document.removeEventListener('keydown', key); window.removeEventListener('scroll', scroll); };
  }, []);
  const links = sections.slice(1, -1);
  return <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
    <div className="nav-bar">
      <a className="brand" href="#home" aria-label="Sandul Hansana, home"><span className="brand-mark">sh</span><span className="brand-name">Sandul Hansana</span></a>
      <nav className="nav-links" aria-label="Main navigation">
        {links.map(s => <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined}>
          {active === s.id && <m.span className="nav-pill" layoutId="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }}/>}<span>{s.label}</span>
        </a>)}
      </nav>
      <div className="nav-tools">
        <button className="icon-button nav-search" type="button" aria-label="Open quick navigation" onClick={() => { setOpen(false); onSearch(); }}><Search aria-hidden="true"/><kbd>⌘K</kbd></button>
        <button className="icon-button" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={onTheme}>
          <AnimatePresence mode="wait" initial={false}><m.span key={theme} className="icon-swap" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: .2 }}>{theme === 'dark' ? <Sun aria-hidden="true"/> : <Moon aria-hidden="true"/>}</m.span></AnimatePresence>
        </button>
        <a className="button button-solid nav-cta" href="#contact">Let’s talk</a>
        <button className="icon-button menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true"/> : <Menu aria-hidden="true"/>}</button>
      </div>
    </div>
    <AnimatePresence>{open && <m.nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} onClick={e => { if (e.target.closest('a')) setOpen(false); }}>
      {sections.slice(1).map((s, i) => <m.a key={s.id} href={`#${s.id}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .03 }}><span className="mono">0{i + 1}</span>{s.label}<ArrowUpRight aria-hidden="true"/></m.a>)}
    </m.nav>}</AnimatePresence>
  </header>;
}

export function CommandMenu({ open, onClose, onProject, onTheme }) {
  const dialog = useRef(null);
  const input = useRef(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const { copy } = useNotice();
  const actions = [
    ...sections.map(s => ({ id: s.id, label: s.label, detail: 'Jump to section', group: 'Navigate', icon: s.icon, run: () => document.getElementById(s.id)?.scrollIntoView({ block: 'start' }) })),
    ...projects.map(p => ({ id: `project-${p.id}`, label: p.title, detail: p.category, group: 'Projects', icon: FolderCode, run: () => onProject(p.id) })),
    { id: 'theme', label: 'Toggle theme', detail: 'Light / dark', group: 'Actions', icon: Moon, run: () => onTheme() },
    { id: 'email', label: 'Copy email address', detail: profile.email, group: 'Actions', icon: Mail, run: () => copy(profile.email, 'Email address copied') },
    { id: 'resume', label: 'Download CV', detail: 'PDF', group: 'Actions', icon: FileDown, run: () => { const a = document.createElement('a'); a.href = profile.cv; a.download = 'Sandul-Hansana-CV.pdf'; a.click(); } },
  ];
  const matches = actions.filter(a => `${a.label} ${a.detail}`.toLowerCase().includes(query.trim().toLowerCase()));
  useEffect(() => { if (open && !dialog.current.open) { setQuery(''); setSelected(0); dialog.current.showModal(); input.current?.focus(); } if (!open && dialog.current.open) dialog.current.close(); }, [open]);
  useEffect(() => { document.getElementById(`command-${matches[selected]?.id}`)?.scrollIntoView({ block: 'nearest' }); }, [selected, query]);
  const execute = action => { if (!action) return; dialog.current.close(); onClose(); requestAnimationFrame(() => action.run()); };
  let lastGroup = '';
  return <dialog className="command-dialog" ref={dialog} onCancel={e => { e.preventDefault(); onClose(); }} aria-labelledby="command-title" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="command-panel">
      <h2 id="command-title" className="sr-only">Quick navigation</h2>
      <div className="command-input-row"><Search aria-hidden="true"/><input ref={input} role="combobox" aria-label="Search the portfolio" aria-expanded={open} aria-autocomplete="list" aria-controls="command-results" aria-activedescendant={matches[selected] ? `command-${matches[selected].id}` : undefined} placeholder="Type a command or search…" value={query}
        onChange={e => { setQuery(e.target.value); setSelected(0); }}
        onKeyDown={e => { if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(i => (i + 1) % Math.max(matches.length, 1)); } if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(i => (i - 1 + matches.length) % Math.max(matches.length, 1)); } if (e.key === 'Enter') { e.preventDefault(); execute(matches[selected]); } }}/>
        <kbd>esc</kbd></div>
      <div className="command-results" id="command-results" role="listbox" aria-label="Results" data-native-scroll>
        {matches.map((a, i) => { const Icon = a.icon; const heading = a.group !== lastGroup; lastGroup = a.group; return <React.Fragment key={a.id}>
          {heading && <div className="command-group" role="presentation">{a.group}</div>}
          <button id={`command-${a.id}`} type="button" role="option" tabIndex={-1} aria-selected={selected === i} onMouseMove={() => setSelected(i)} onClick={() => execute(a)}><span className="command-icon"><Icon aria-hidden="true"/></span><span className="command-text"><strong>{a.label}</strong><small>{a.detail}</small></span><ChevronRight aria-hidden="true"/></button>
        </React.Fragment>; })}
        {!matches.length && <div className="command-empty">No results. Try “work”, “email” or “theme”.</div>}
      </div>
      <div className="command-footer"><span><Command aria-hidden="true"/>Quick navigation</span><span>↑↓ navigate <CornerDownLeft aria-hidden="true"/> open</span></div>
    </div>
  </dialog>;
}
