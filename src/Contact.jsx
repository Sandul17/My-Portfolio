import React, { useEffect, useRef, useState } from 'react';
import { profile } from './profile';
import { ArrowUpRight, Copy, LoaderCircle, Mail, MessageSquare, X } from 'lucide-react';
import { useNotice } from './Notice';

export function ContactLinks() {
  const { copy }=useNotice();
  return <div className="contact-links">
    <a className="contact-email" href={`mailto:${profile.email}`}><Mail aria-hidden="true"/><span>{profile.email}</span><ArrowUpRight aria-hidden="true"/></a>
    <div className="contact-socials">
      <button className="button button-ghost" type="button" onClick={()=>copy(profile.email,'Email address copied')}><Copy aria-hidden="true"/>Copy email</button>
      <a className="button button-ghost" href={profile.github} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .1-2-.5-2.5 4-.5 7-2 7-6.5A5 5 0 0 0 20 5a5 5 0 0 0 0-4s-2 0-4 2a15 15 0 0 0-8 0C6 1 4 1 4 1a5 5 0 0 0 0 4 5 5 0 0 0-1.5 4c0 4.5 3 6 7 6.5C9 16 9 17 9 18v4"/></svg>GitHub</a>
      <a className="button button-ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4"/></svg>LinkedIn</a>
    </div>
  </div>;
}

const validation=(name,value)=>{
  const text=value.trim();
  if(name==='name'&&text.length<2)return 'Please enter at least 2 characters for your name.';
  if(name==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text))return 'Please enter a valid email address.';
  if(name==='message'&&text.length<10)return 'Please add a little more detail (at least 10 characters).';
  return '';
};

export function ContactForm({ projectTopic='', onClearTopic }) {
  const formRef=useRef(null);
  const [status,setStatus]=useState({type:'',message:''});
  const [errors,setErrors]=useState({});
  const [messageCount,setMessageCount]=useState(0);
  const [sending,setSending]=useState(false);
  const startedAt=useRef(Date.now());
  const pending=useRef(false);
  useEffect(()=>{if(projectTopic&&formRef.current)formRef.current.elements.namedItem('subject').value='Project discussion'},[projectTopic]);
  const onBlur=event=>{const {name,value}=event.target;setErrors(previous=>({...previous,[name]:validation(name,value)}))};
  const onChange=event=>{const {name,value}=event.target;if(name==='message')setMessageCount(value.length);if(errors[name])setErrors(previous=>({...previous,[name]:validation(name,value)}))};
  const handleSubmit=async event=>{
    event.preventDefault();if(pending.current)return;
    const form=event.currentTarget;const fields=new FormData(form);
    if(fields.get('_honey'))return;
    const values={name:String(fields.get('name')||'').trim(),email:String(fields.get('email')||'').trim(),message:String(fields.get('message')||'').trim()};
    const nextErrors=Object.fromEntries(Object.entries(values).map(([name,value])=>[name,validation(name,value)]));
    setErrors(nextErrors);
    const invalid=Object.keys(nextErrors).find(name=>nextErrors[name]);
    if(invalid){setStatus({type:'error',message:'Please check the highlighted fields before sending.'});form.elements.namedItem(invalid).focus();return}
    if(Date.now()-startedAt.current<2000){setStatus({type:'error',message:'Please take a moment to review your message, then try again.'});return}
    pending.current=true;setSending(true);setStatus({type:'',message:''});
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
    try {
      const subject=String(fields.get('subject')||'Portfolio inquiry')+(projectTopic?` — ${projectTopic}`:'');
      const response=await fetch(profile.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},signal:controller.signal,body:JSON.stringify({...values,subject,_subject:`Portfolio: ${subject}`,_replyto:values.email,_template:'table',_honey:''})});
      const result=await response.json();
      if(!response.ok||!(result.success===true||result.success==='true'))throw new Error('Message not accepted');
      setStatus({type:'success',message:'Thanks! Your message has been accepted. I look forward to connecting with you.'});form.reset();setMessageCount(0);setErrors({});onClearTopic?.();startedAt.current=Date.now();
    }catch{setStatus({type:'error',message:`Your message could not be submitted. Please try again, or email ${profile.email} directly. Your message is still here.`})}
    finally{clearTimeout(timeout);pending.current=false;setSending(false)}
  };
  return <form id="contact-form" className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={sending}>
    <div className="contact-form-heading"><span className="card-label">Send a message</span><h3>Say hello 👋</h3></div>
    {projectTopic&&<div className="contact-topic"><MessageSquare aria-hidden="true"/><span>Regarding <strong>{projectTopic}</strong></span><button type="button" aria-label="Remove project topic" onClick={onClearTopic} disabled={sending}><X aria-hidden="true"/></button></div>}
    <div className="form-row"><div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" placeholder="Alex Morgan" autoComplete="name" required minLength={2} maxLength={100} disabled={sending} onBlur={onBlur} onChange={onChange} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name?'name-error':undefined}/>{errors.name&&<p className="field-error" id="name-error">{errors.name}</p>}</div><div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="alex@example.com" autoComplete="email" required maxLength={254} disabled={sending} onBlur={onBlur} onChange={onChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email?'email-error':undefined}/>{errors.email&&<p className="field-error" id="email-error">{errors.email}</p>}</div></div>
    <div className="form-field"><label htmlFor="subject">What’s on your mind?</label><select id="subject" name="subject" disabled={sending}><option>Let’s collaborate</option><option>Internship or job opportunity</option><option>Project discussion</option><option>Just saying hello</option></select></div>
    <div className="form-field"><div className="message-label"><label htmlFor="message">Your message</label><span aria-hidden="true">{messageCount.toLocaleString()} / 5,000</span></div><textarea id="message" name="message" placeholder="Tell me a little about your idea…" rows={4} required minLength={10} maxLength={5000} disabled={sending} onBlur={onBlur} onChange={onChange} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message?'message-error':undefined}/>{errors.message&&<p className="field-error" id="message-error">{errors.message}</p>}</div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="_honey" tabIndex={-1} autoComplete="off"/></div>
    <button className="button button-solid button-lg send-button" type="submit" disabled={sending}>{sending?'Sending…':'Send message'}{sending?<LoaderCircle className="send-icon-spin" aria-hidden="true"/>:<ArrowUpRight aria-hidden="true"/>}</button>
    <p className="form-note">Delivered securely with <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">FormSubmit</a>. Your details are used to reply to your message.</p>
    <p id="form-status" className={`form-status ${status.type}`} role={status.type==='error'?'alert':'status'} aria-live="polite">{status.message}</p>
  </form>;
}
