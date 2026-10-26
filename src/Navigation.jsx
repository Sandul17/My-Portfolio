import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, ChevronRight, Command, CornerDownLeft, FileDown, FolderCode, House, Layers3, Mail, Menu, Search, UserRound, X } from 'lucide-react';
import { projectCatalog } from './project-data';
import { profile } from './profile';
import { useNotice } from './Notice';

export const sections = [
  { id:'home', label:'Home', icon:House }, { id:'about', label:'About', icon:UserRound },
  { id:'skills', label:'Skills', icon:Layers3 }, { id:'projects', label:'Projects', icon:FolderCode },
  { id:'journey', label:'Experience', icon:BriefcaseBusiness }, { id:'contact', label:'Contact', icon:Mail },
];

export function Navigation({ active, onSearch }) {
  const [open,setOpen] = useState(false);
  useEffect(() => { const handler=e=>{if(e.key==='Escape')setOpen(false)}; document.addEventListener('keydown',handler); return()=>document.removeEventListener('keydown',handler); },[]);
  return <><header className="header"><div className="nav-wrap container"><a className="brand" href="#home" aria-label="Sandul Hansana home"><span className="brand-mark">s<span>.</span></span><span>sandul<span className="muted">.dev</span></span></a><nav id="navigation" className={open?'is-open':''} aria-label="Main navigation" onClick={e=>{if(e.target.closest('a'))setOpen(false)}}>{sections.slice(0,-1).map(section=><a key={section.id} href={`#${section.id}`} className={active===section.id?'active':''} aria-current={active===section.id?'location':undefined}>{section.label}</a>)}<a className="nav-contact" href="#contact">Let’s talk<ArrowUpRight aria-hidden="true"/></a></nav><div className="nav-tools"><button className="nav-search" type="button" aria-label="Search portfolio" onClick={()=>{setOpen(false);onSearch()}}><Search aria-hidden="true"/><kbd>⌘ K</kbd></button><button className="menu-toggle" type="button" aria-expanded={open} aria-controls="navigation" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}</button></div></div></header><nav className="mobile-dock" aria-label="Mobile navigation">{sections.filter(section=>section.id!=='about').map(section=>{const Icon=section.icon;return <a key={section.id} href={`#${section.id}`} className={active===section.id?'is-active':''} aria-current={active===section.id?'location':undefined}><Icon aria-hidden="true"/><span>{section.id==='journey'?'Journey':section.label}</span></a>})}</nav></>;
}

export function CommandMenu({ open, onClose, onProject }) {
  const dialog=useRef(null);
  const input=useRef(null);
  const [query,setQuery]=useState('');
  const [selected,setSelected]=useState(0);
  const { copy }=useNotice();
  const actions=[
    ...sections.map(section=>({id:section.id,label:section.label,detail:'Jump to section',icon:section.icon,run:()=>{window.location.hash=section.id;document.getElementById(section.id)?.scrollIntoView({block:'start'})}})),
    ...projectCatalog.map(project=>({id:`project-${project.id}`,label:project.title,detail:project.category,icon:FolderCode,run:()=>onProject(project.id)})),
    {id:'email',label:'Copy email address',detail:profile.email,icon:Mail,run:()=>copy(profile.email,'Email address copied')},
    {id:'resume',label:'Download résumé',detail:'One-page PDF',icon:FileDown,run:()=>{const a=document.createElement('a');a.href='/assets/sandul-hansana-cv.pdf';a.download='sandul-hansana-cv.pdf';a.click()}},
  ];
  const matches=actions.filter(action=>`${action.label} ${action.detail}`.toLowerCase().includes(query.trim().toLowerCase()));
  useEffect(()=>{if(open&&!dialog.current.open){setQuery('');setSelected(0);dialog.current.showModal();input.current?.focus()}if(!open&&dialog.current.open)dialog.current.close()},[open]);
  useEffect(()=>{document.getElementById(`command-${matches[selected]?.id}`)?.scrollIntoView({block:'nearest'})},[selected,query]);
  const execute=action=>{if(!action)return;dialog.current.close();onClose();requestAnimationFrame(()=>action.run())};
  return <dialog id="command-dialog" className="command-dialog" ref={dialog} onCancel={event=>{event.preventDefault();onClose()}} aria-labelledby="command-title" onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose()}}}>
    <h2 id="command-title" className="sr-only">Quick navigation</h2><div className="command-input-row"><Search aria-hidden="true"/><input ref={input} role="combobox" aria-label="Search the portfolio" aria-expanded={open} aria-autocomplete="list" aria-controls="command-results" aria-activedescendant={matches[selected]?`command-${matches[selected].id}`:undefined} placeholder="Where would you like to go?" value={query} onChange={e=>{setQuery(e.target.value);setSelected(0)}} onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();setSelected(index=>(index+1)%Math.max(matches.length,1))}if(e.key==='ArrowUp'){e.preventDefault();setSelected(index=>(index-1+matches.length)%Math.max(matches.length,1))}if(e.key==='Enter'){e.preventDefault();execute(matches[selected])}}}/><button type="button" onClick={onClose} aria-label="Close quick navigation"><X aria-hidden="true"/></button></div>
    <div className="command-results" id="command-results" role="listbox" aria-label="Portfolio destinations" data-native-scroll>{matches.map((action,index)=>{const Icon=action.icon;return <button id={`command-${action.id}`} key={action.id} type="button" role="option" tabIndex={-1} aria-selected={selected===index} onMouseMove={()=>setSelected(index)} onClick={()=>execute(action)}><span className="command-icon"><Icon aria-hidden="true"/></span><span><strong>{action.label}</strong><small>{action.detail}</small></span><ChevronRight aria-hidden="true"/></button>})}{!matches.length&&<div className="command-empty">No matches. Try “projects”, “skills”, or “email”.</div>}</div><div className="command-footer"><span><Command aria-hidden="true"/> Your portfolio, a shortcut away.</span><span>↑ ↓ to navigate <CornerDownLeft aria-hidden="true"/> to open</span></div>
  </dialog>;
}
