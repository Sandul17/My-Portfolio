import React, { useEffect, useRef } from 'react';

export function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (project && !dialog.current.open) dialog.current.showModal();
    if (!project && dialog.current.open) dialog.current.close();
  }, [project]);
  return <dialog id="project-dialog" ref={dialog} onCancel={onClose} onClose={onClose} onClick={event => { if(event.target === event.currentTarget) { const bounds=event.currentTarget.getBoundingClientRect(); if(event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose(); } }} aria-labelledby="dialog-title">
    {project && <div className="dialog-inner">
      <button className="dialog-close" onClick={onClose} aria-label="Close project details">×</button>
      <span className="little-label">{project.category}</span>
      <h2 id="dialog-title">{project.title}</h2>
      <p>{project.description}</p>
      <h3>Project focus</h3>
      <ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div id="dialog-actions">
        {project.source && <a className="button button-primary" href={project.source} target="_blank" rel="noopener noreferrer">View source ↗</a>}
        {project.live && <a className="button button-secondary" href={project.live} onClick={onClose}>Explore website ↗</a>}
        {!project.source && !project.live && <a className="button button-secondary" href="#contact" onClick={onClose}>Ask me about this project ↗</a>}
      </div>
    </div>}
  </dialog>;
}
