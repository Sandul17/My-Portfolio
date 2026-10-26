import React, { useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { RevealSection, TiltCard } from './Animated';
import { projectCatalog } from './project-data';
import { ProjectArtwork } from './ProjectArtwork';

export function Projects({ onOpen }) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => projectCatalog.filter(project => {
    const haystack = `${project.title} ${project.description} ${project.features.join(' ')} ${project.tags.join(' ')}`.toLowerCase();
    return (category === 'all' || project.kind === category) && query.trim().toLowerCase().split(/\s+/).every(term => haystack.includes(term));
  }), [category, query]);
  const reset = () => { setQuery(''); setCategory('all'); };
  return <RevealSection id="projects" className="section container work-section" aria-labelledby="projects-heading">
    <div className="section-label"><span>03 / SELECTED WORK</span><span className="label-line"/></div>
    <div className="section-heading"><h2 id="projects-heading">Explore the ideas.<br/><span className="text-muted">Look under the hood.</span></h2><p>Research, applications, and experiments.<br/>Find a project and get to know the details.</p></div>
    <div className="explorer-toolbar"><div className="project-filters" role="group" aria-label="Filter projects">{[['all','All projects'],['research','Research'],['development','Development']].map(([id,label]) => <button key={id} type="button" className={`filter ${category === id ? 'active' : ''}`} aria-pressed={category === id} onClick={() => setCategory(id)}>{label}{id === 'all' && <span>03</span>}</button>)}</div><div className="explorer-search"><Search aria-hidden="true"/><input type="search" aria-label="Search projects" placeholder="Search projects, tools, or features…" value={query} onChange={e => setQuery(e.target.value)}/>{query && <button type="button" aria-label="Clear project search" onClick={() => setQuery('')}><X aria-hidden="true"/></button>}</div></div>
    <div className="explorer-summary"><span role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}{category !== 'all' ? ` · ${category}` : ' to explore'}</span>{(query || category !== 'all') && <button type="button" onClick={reset}>Reset filters <X aria-hidden="true"/></button>}</div>
    <div className="projects-grid"><AnimatePresence mode="popLayout">{filtered.map((project, index) => <TiltCard key={project.id} className={`project-card ${project.id === 'plotguard' ? 'project-featured' : ''}`} data-category={project.kind} index={index}>
      <ProjectArtwork project={project} onOpen={() => onOpen(project.id)}/>
      <div className="project-info"><div className="project-category">{project.category}</div><h3><button type="button" onClick={() => onOpen(project.id)}>{project.shortTitle}<ArrowUpRight aria-hidden="true"/></button></h3><p>{project.summary}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><button type="button" className="project-details-link" onClick={() => onOpen(project.id)}>Explore project <ArrowUpRight aria-hidden="true"/></button></div>
    </TiltCard>)}</AnimatePresence></div>
    {!filtered.length && <div className="explorer-empty"><Search aria-hidden="true"/><h3>No projects match that search.</h3><p>Try another keyword or explore the full collection.</p><button className="button button-secondary" type="button" onClick={reset}>Reset filters</button></div>}
  </RevealSection>;
}
