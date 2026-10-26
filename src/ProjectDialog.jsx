import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, MessageSquare, X } from 'lucide-react';
import { ProjectArtwork } from './ProjectArtwork';
import { projectCatalog } from './project-data';
import { useNotice } from './Notice';

export function ProjectDialog({ project, onClose, onNavigate, onDiscuss }) {
  const dialog = useRef(null);
  const [tab,setTab] = useState('overview');
  const [share,setShare] = useState('');
  const { copy } = useNotice();
  useEffect(() => {
    if (project && !dialog.current.open) dialog.current.showModal();
    if (!project && dialog.current.open) dialog.current.close();
    setTab('overview'); setShare('');
  }, [project?.id]);
  const index = project ? projectCatalog.findIndex(item=>item.id===project.id) : 0;
  const shareProject = async () => {
    const url=new URL(window.location.href);url.searchParams.set('project',project.id);url.hash='projects';
    const success=await copy(url.toString(),'Project link copied');setShare(success?'copied':url.toString());
  };
  return <dialog id="project-dialog" className="project-reader" ref={dialog} onCancel={event=>{event.preventDefault();onClose()}} onClick={event=>{if(event.target===event.currentTarget){const r=event.currentTarget.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)onClose()}}} aria-labelledby="dialog-title" data-native-scroll>
    {project && <><div className="project-reader-toolbar"><span className="little-label">PROJECT EXPLORER / {String(index+1).padStart(2,'0')}</span><button className="icon-button" type="button" onClick={onClose} aria-label="Close project details"><X aria-hidden="true"/></button></div><div className="project-reader-grid"><div className="project-reader-art"><ProjectArtwork project={project}/><div className="project-reader-art-note"><span>ILLUSTRATIVE PROJECT VISUAL</span><span>{project.label}</span></div><div className="project-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div><div className="project-reader-copy"><span className="project-category">{project.category}</span><h2 id="dialog-title">{project.title}</h2><div className="project-reader-tabs" role="group" aria-label="Project information"><button type="button" aria-pressed={tab==='overview'} onClick={()=>setTab('overview')}>Overview</button><button type="button" aria-pressed={tab==='highlights'} onClick={()=>setTab('highlights')}>Highlights</button></div>{tab==='overview'?<div className="project-reader-panel"><h3>About the project</h3><p>{project.description}</p></div>:<div className="project-reader-panel"><h3>Project focus</h3><ul>{project.features.map(feature=><li key={feature}><Check aria-hidden="true"/><span>{feature}</span></li>)}</ul></div>}<div className="project-reader-actions"><button className="button button-primary" type="button" onClick={()=>{dialog.current.close();onDiscuss(project)}}>Discuss this project<MessageSquare aria-hidden="true"/></button>{project.source&&<a className="button button-secondary" href={project.source} target="_blank" rel="noopener noreferrer">View source<ArrowUpRight aria-hidden="true"/></a>}{project.live&&<a className="text-link" href={project.live} onClick={onClose}>Explore website<ArrowUpRight aria-hidden="true"/></a>}<button className="project-share" type="button" onClick={shareProject}>{share==='copied'?<Check aria-hidden="true"/>:<Copy aria-hidden="true"/>}{share==='copied'?'Link copied':'Share project'}</button></div>{share&&share!=='copied'&&<div className="share-fallback"><label htmlFor="share-project-url">Select and copy the project link</label><input id="share-project-url" value={share} readOnly onFocus={e=>e.target.select()}/></div>}<span className="sr-only" role="status">{share==='copied'?'Project link copied':''}</span></div></div><div className="project-reader-footer"><button type="button" onClick={()=>onNavigate(projectCatalog[(index-1+projectCatalog.length)%projectCatalog.length].id)}><ArrowLeft aria-hidden="true"/>Previous project</button><span>{String(index+1).padStart(2,'0')} / {String(projectCatalog.length).padStart(2,'0')}</span><button type="button" onClick={()=>onNavigate(projectCatalog[(index+1)%projectCatalog.length].id)}>Next project<ArrowRight aria-hidden="true"/></button></div></>}
  </dialog>;
}
