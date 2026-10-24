import React, { useRef, useState } from 'react';
import { profile } from './profile';

export function ContactLinks() {
  return <div id="contact-links" className="contact-links">
    <a className="contact-email" href={`mailto:${profile.email}`}><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>{profile.email}<span aria-hidden="true">↗</span></a>
    <a className="social-link" href={profile.github} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .1-2-.5-2.5 4-.5 7-2 7-6.5A5 5 0 0 0 20 5a5 5 0 0 0 0-4s-2 0-4 2a15 15 0 0 0-8 0C6 1 4 1 4 1a5 5 0 0 0 0 4 5 5 0 0 0-1.5 4c0 4.5 3 6 7 6.5C9 16 9 17 9 18v4"/></svg>GitHub<span aria-hidden="true">↗</span></a>
    <a className="social-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4"/></svg>LinkedIn<span aria-hidden="true">↗</span></a>
  </div>;
}

export function ContactForm() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);
  const startedAt = useRef(Date.now());
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = fields.get('name').trim();
    const email = fields.get('email').trim();
    const message = fields.get('message').trim();
    if (fields.get('_honey')) return;
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      setStatus({ type: 'error', message: 'Please enter your name, a valid email, and a message with at least 10 characters.' });
      return;
    }
    if (Date.now() - startedAt.current < 2000) {
      setStatus({ type: 'error', message: 'Please take a moment to review your message, then try again.' });
      return;
    }
    setSending(true);
    setStatus({ type: '', message: '' });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(profile.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ name, email, message, subject: fields.get('subject'), _subject: `Portfolio: ${fields.get('subject')}`, _replyto: email, _template: 'table', _honey: '' }),
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === 'true')) throw new Error('Service did not accept the message.');
      setStatus({ type: 'success', message: 'Thanks! Your message has been accepted. I look forward to connecting with you.' });
      form.reset();
      startedAt.current = Date.now();
    } catch {
      setStatus({ type: 'error', message: `Your message could not be submitted. Please try again, or email ${profile.email} directly. Your message is still here.` });
    } finally {
      clearTimeout(timeout);
      setSending(false);
    }
  };

  return <form id="contact-form" className="contact-form" onSubmit={handleSubmit} aria-busy={sending}>
    <h3>Send a little hello <span aria-hidden="true">↗</span></h3>
    <div className="form-row">
      <div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" placeholder="Alex Morgan" autoComplete="name" required minLength={2} maxLength={100} disabled={sending}/></div>
      <div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="alex@example.com" autoComplete="email" required maxLength={254} disabled={sending}/></div>
    </div>
    <div className="form-field"><label htmlFor="subject">What’s on your mind?</label><select id="subject" name="subject" disabled={sending}><option>Let’s collaborate</option><option>Internship or job opportunity</option><option>Project discussion</option><option>Just saying hello</option></select></div>
    <div className="form-field"><label htmlFor="message">Your message</label><textarea id="message" name="message" placeholder="Tell me a little about your idea…" rows={4} required minLength={10} maxLength={5000} disabled={sending}/></div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="_honey" tabIndex={-1} autoComplete="off"/></div>
    <button className="button button-primary send-button disabled:opacity-60" type="submit" disabled={sending}>{sending ? 'Sending your message…' : 'Let’s start a conversation'}<span aria-hidden="true">↗</span></button>
    <p className="form-note">Delivered securely with <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">FormSubmit</a>. Your details are used to reply to your message.</p>
    <p id="form-status" className={`form-status ${status.type}`} role={status.type === 'error' ? 'alert' : 'status'} aria-live="polite">{status.message}</p>
  </form>;
}
