import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Link2, MessageSquare, X } from 'lucide-react';
import { ProjectVisual } from './ProjectVisual';
import { projects } from './profile';
import { useNotice } from './Notice';

export const findProject = id => projects.find(p => p.id === id) ?? null;

export function ProjectDialog({ project, onClose, onNavigate, onDiscuss }) {
  const dialog = useRef(null);
  const [copied, setCopied] = useState(false);
  const { copy } = useNotice();
  useEffect(() => {
    if (project && !dialog.current.open) dialog.current.showModal();
    if (!project && dialog.current.open) dialog.current.close();
    setCopied(false);
  }, [project?.id]);
  const index = project ? projects.findIndex(p => p.id === project.id) : 0;
  const share = async () => {
    const url = new URL(window.location.href); url.searchParams.set('project', project.id); url.hash = 'projects';
    setCopied(await copy(url.toString(), 'Project link copied'));
  };
  const go = step => onNavigate(projects[(index + step + projects.length) % projects.length].id);
  return <dialog className="project-dialog" ref={dialog} onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) onClose(); }} aria-labelledby="dialog-title" data-native-scroll>
    {project && <div className="dialog-panel">
      <div className="dialog-top"><span className="mono">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} · {project.category}</span><button className="icon-button" type="button" onClick={onClose} aria-label="Close project details"><X aria-hidden="true"/></button></div>
      <ProjectVisual project={project}/>
      <div className="dialog-body">
        <h2 id="dialog-title">{project.title}</h2>
        <p className="dialog-sub">{project.subtitle}</p>
        <p className="dialog-desc">{project.description}</p>
        <h3>Highlights</h3>
        <ul className="dialog-features">{project.features.map(f => <li key={f}><Check aria-hidden="true"/>{f}</li>)}</ul>
        <ul className="tag-list">{project.tags.map(t => <li key={t}>{t}</li>)}</ul>
        <div className="dialog-actions">
          <button className="button button-solid" type="button" onClick={() => { dialog.current.close(); onDiscuss(project); }}>Discuss this project<MessageSquare aria-hidden="true"/></button>
          {project.live && <a className="button button-ghost" href={project.live} onClick={onClose}>Visit<ArrowUpRight aria-hidden="true"/></a>}
          <button className="button button-ghost" type="button" onClick={share}>{copied ? <Check aria-hidden="true"/> : <Link2 aria-hidden="true"/>}{copied ? 'Copied' : 'Share'}</button>
        </div>
      </div>
      <div className="dialog-nav"><button type="button" onClick={() => go(-1)}><ArrowLeft aria-hidden="true"/>Previous</button><button type="button" onClick={() => go(1)}>Next<ArrowRight aria-hidden="true"/></button></div>
    </div>}
  </dialog>;
}
