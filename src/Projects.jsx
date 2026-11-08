import React, { useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowUpRight } from 'lucide-react';
import { Card, SectionHead } from './Animated';
import { ProjectVisual } from './ProjectVisual';
import { projects } from './profile';

const filters = [['all', 'All'], ['web', 'Web'], ['mobile', 'Mobile'], ['research', 'Research'], ['software', 'Software']];

export function Projects({ onOpen }) {
  const [filter, setFilter] = useState('all');
  const list = useMemo(() => projects.filter(p => filter === 'all' || p.kind === filter), [filter]);
  return <section id="projects" className="section container" aria-labelledby="projects-heading">
    <SectionHead index="03" eyebrow="Selected work" id="projects-heading" title={<>Things I’ve <em>designed</em><br/>and built.</>}>From government systems used by parliament officers to mobile apps and research — open any project for the details.</SectionHead>
    <div className="segmented" role="group" aria-label="Filter projects">
      {filters.map(([id, label]) => { const count = id === 'all' ? projects.length : projects.filter(p => p.kind === id).length; return <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>
        {filter === id && <m.span className="segmented-pill" layoutId="project-filter" transition={{ type: 'spring', stiffness: 380, damping: 32 }}/>}<span>{label}</span><small>{count}</small>
      </button>; })}
    </div>
    <span className="sr-only" role="status" aria-live="polite">{list.length} projects shown</span>
    <div className={`projects-grid ${filter === 'all' ? 'is-all' : ''}`}>
      <AnimatePresence mode="popLayout">{list.map((p, i) => <Card key={p.id} index={i} className="project-card">
        <button type="button" className="project-hit" onClick={() => onOpen(p.id)} aria-label={`Open ${p.title} details`}/>
        <ProjectVisual project={p}/>
        <div className="project-body">
          <div className="project-meta"><span className="mono">{p.category}</span><span className="project-arrow" aria-hidden="true"><ArrowUpRight/></span></div>
          <h3>{p.title}</h3>
          <p>{p.summary}</p>
          <ul className="tag-list">{p.tags.map(t => <li key={t}>{t}</li>)}</ul>
        </div>
      </Card>)}</AnimatePresence>
    </div>
  </section>;
}
