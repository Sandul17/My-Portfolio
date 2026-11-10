import React, { useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { SectionHead } from './Animated';
import { SkillIcon } from './SkillIcon';
import { useMotionPreference } from './motion-preferences';
import { skillGroups } from './profile';

const meta = {
  HTML: ['html', '#e44d26'], CSS: ['css', '#1572b6'], JavaScript: ['javascript', '#e8c400'], React: ['react', '#38bdf8'],
  Laravel: ['laravel', '#ff2d20'], 'Node.js': ['nodejs', '#68a063'], Bootstrap: ['bootstrap', '#7952b3'],
  Java: ['java', '#ed7957'], Python: ['python', '#4584b6'], PHP: ['php', '#8993be'], 'React Native': ['react', '#38bdf8'],
  MySQL: ['mysql', '#00758f'], MongoDB: ['mongodb', '#47a248'], Figma: ['figma', '#a259ff'], 'Object-Oriented Programming': ['oop', '#ff5a1f'],
};

const skills = skillGroups.flatMap(g => g.skills.map(name => ({ name, group: g.id, groupTitle: g.title, icon: meta[name]?.[0] ?? 'problem', color: meta[name]?.[1] ?? '#ff5a1f' })));
const rings = [skills.slice(0, 4), skills.slice(4, 9), skills.slice(9)];
const short = { 'Object-Oriented Programming': 'OOP' };
const tabLabel = { all: 'All', web: 'Web', languages: 'Languages', mobile: 'Mobile', data: 'Data', design: 'Design', concepts: 'Concepts' };

function Orbit({ active, onActive }) {
  const current = skills.find(s => s.name === active);
  return <div className="orbit" aria-hidden="true" onPointerLeave={() => onActive(null)}>
    <span className="orbit-glow"/>
    {rings.map((ring, r) => <div key={r} className={`orbit-ring ring-${r + 1}`}>
      {ring.map((s, i) => <span key={s.name} className={`orbit-item ${active === s.name ? 'is-active' : ''}`} style={{ '--a': `${(360 / ring.length) * i + r * 24}deg`, '--c': s.color }} onPointerEnter={() => onActive(s.name)}>
        <span className="orbit-chip"><SkillIcon name={s.icon}/></span>
      </span>)}
    </div>)}
    <div className="orbit-core">
      <AnimatePresence mode="wait">
        <m.div key={current?.name ?? 'all'} initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }} transition={{ duration: .22 }}>
          {current ? <><strong style={{ color: current.color }}>{short[current.name] ?? current.name}</strong><span>{current.groupTitle}</span></> : <><strong>{skills.length}</strong><span>technologies</span></>}
        </m.div>
      </AnimatePresence>
    </div>
  </div>;
}

export function Skills() {
  const reduced = useMotionPreference();
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);
  const tabs = [{ id: 'all', title: 'All' }, ...skillGroups];
  const list = useMemo(() => skills.filter(s => filter === 'all' || s.group === filter), [filter]);

  return <section id="skills" className="section container skills" aria-labelledby="skills-heading">
    <SectionHead index="02" eyebrow="Toolbox" id="skills-heading" title={<>The right tools<br/>for <em>good ideas.</em></>}>Technologies I use to take products from a Figma frame to a working, deployed application.</SectionHead>
    <div className="skills-layout">
      <m.div className="orbit-card" initial={reduced ? false : { opacity: 0, scale: .92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .15 }} transition={{ type: 'spring', stiffness: 150, damping: 20 }}>
        <Orbit active={active} onActive={setActive}/>
        <p className="orbit-hint mono"><span className="hint-hover">Hover</span><span className="hint-touch">Tap</span> a skill to explore</p>
      </m.div>

      <div className="skills-panel">
        <div className="segmented skills-tabs" role="group" aria-label="Filter skills by category">
          {tabs.map(t => <button key={t.id} type="button" aria-pressed={filter === t.id} onClick={() => setFilter(t.id)}>
            {filter === t.id && <m.span className="segmented-pill" layoutId="skills-filter" transition={{ type: 'spring', stiffness: 380, damping: 32 }}/>}
            <span>{tabLabel[t.id] ?? t.title}</span><small>{t.id === 'all' ? skills.length : t.skills.length}</small>
          </button>)}
        </div>
        <span className="sr-only" role="status" aria-live="polite">{list.length} skills shown</span>
        <m.ul className="skill-tiles" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((s, i) => <m.li key={s.name} layout className={`skill-tile ${active === s.name ? 'is-active' : ''}`} style={{ '--c': s.color }}
              initial={reduced ? false : { opacity: 0, y: 24, scale: .85 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .3 }}
              exit={{ opacity: 0, scale: .8, transition: { duration: .15 } }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: reduced ? 0 : i * .035 }}
              whileHover={reduced ? undefined : { y: -6 }}
              onPointerEnter={() => setActive(s.name)} onPointerLeave={() => setActive(null)}>
              <span className="skill-tile-icon"><SkillIcon name={s.icon}/></span>
              <span className="skill-tile-text"><strong>{s.name}</strong><small>{s.groupTitle}</small></span>
              <span className="skill-tile-shine" aria-hidden="true"/>
            </m.li>)}
          </AnimatePresence>
        </m.ul>
      </div>
    </div>
  </section>;
}
