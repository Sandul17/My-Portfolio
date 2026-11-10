import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useScroll, useSpring } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowUpRight, Building2, CalendarRange, Download, MapPin } from 'lucide-react';
import { Card, Reveal, SectionHead } from './Animated';
import { useMotionPreference } from './motion-preferences';
import experience from './data/experience.json';
import { profile } from './profile';

const month = v => new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${v}-01T00:00:00Z`));
const span = job => { const [sy, sm] = job.startDate.split('-').map(Number); const [ey, em] = job.endDate.split('-').map(Number); return (ey - sy) * 12 + (em - sm) + 1; };
const totalMonths = experience.reduce((sum, job) => sum + span(job), 0);
const longest = Math.max(...experience.map(span));

function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: .6 });
  const reduced = useMotionPreference();
  const [shown, setShown] = useState(reduced ? value : 0);
  useEffect(() => {
    if (!inView || reduced) { if (reduced) setShown(value); return; }
    const controls = animate(0, value, { duration: 1.4, ease: [.2, .7, .2, 1], onUpdate: v => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduced, value]);
  return <strong ref={ref}>{String(shown).padStart(2, '0')}{suffix && <small>{suffix}</small>}</strong>;
}

function Entry({ job, index }) {
  const reduced = useMotionPreference();
  const side = index % 2 === 0 ? 'left' : 'right';
  const months = span(job);
  return <li className={`xp-item xp-${side}`}>
    <m.span className="xp-node" aria-hidden="true" initial={reduced ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 14 }}><span/></m.span>
    <m.div className="xp-date" initial={reduced ? false : { opacity: 0, x: side === 'left' ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .8 }} transition={{ duration: .7, ease: [.2, .7, .2, 1], delay: .1 }}>
      <span className="mono">{String(index + 1).padStart(2, '0')}</span>
      <strong><time dateTime={job.startDate}>{month(job.startDate)}</time> — <time dateTime={job.endDate}>{month(job.endDate)}</time></strong>
    </m.div>
    <m.div className="xp-card-wrap" initial={reduced ? false : { opacity: 0, x: side === 'left' ? -60 : 60, rotate: side === 'left' ? -2 : 2, filter: 'blur(6px)' }} whileInView={{ opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: .35 }} transition={{ type: 'spring', stiffness: 90, damping: 18 }}>
      <Card as="div" className="xp-card">
        <div className="xp-head">
          <a className="xp-logo" href={job.companyUrl} target="_blank" rel="noopener noreferrer" aria-label={`${job.company} on LinkedIn`}><img src={job.logo} alt="" width="100" height="100" loading="lazy"/></a>
          <div className="xp-title"><h3>{job.role}</h3><a href={job.companyUrl} target="_blank" rel="noopener noreferrer">{job.company}<ArrowUpRight aria-hidden="true"/></a></div>
          <span className="badge">{job.employmentType}</span>
        </div>
        <div className="xp-duration">
          <div className="xp-duration-label mono"><span><CalendarRange aria-hidden="true"/>{months} months</span><span>Completed</span></div>
          <div className="xp-bar"><m.span initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: months / longest }} viewport={{ once: true, amount: 1 }} transition={{ duration: 1.2, ease: [.2, .7, .2, 1], delay: .3 }}/></div>
        </div>
        {job.summary && <p className="xp-summary">{job.summary}</p>}
        <ul className="xp-tags"><li><MapPin aria-hidden="true"/>{job.location}</li><li><Building2 aria-hidden="true"/>{job.workplace}</li></ul>
      </Card>
    </m.div>
  </li>;
}

export function Experience() {
  const reduced = useMotionPreference();
  const list = useRef(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 70%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const orgs = new Set(experience.map(j => j.company)).size;
  return <section id="experience" className="section container" aria-labelledby="experience-heading">
    <SectionHead index="04" eyebrow="Experience" id="experience-heading" title={<>Where I’ve put<br/>it into <em>practice.</em></>}>Hands-on internships building and improving real systems in the public and telecom sectors.</SectionHead>

    <div className="xp-stats">
      {[[totalMonths, 'Months of experience', 'mo'], [experience.length, 'Internships completed'], [orgs, 'Organisations']].map(([v, label, suffix], i) =>
        <Reveal key={label} className="xp-stat" delay={i * .08}><Counter value={v} suffix={suffix}/><span>{label}</span></Reveal>)}
    </div>

    <ol className="xp-list" ref={list}>
      <span className="xp-rail" aria-hidden="true"><m.span style={{ scaleY: reduced ? 1 : fill }}/></span>
      {experience.map((job, i) => <Entry key={job.id} job={job} index={i}/>)}
    </ol>

    <Reveal className="cv-banner">
      <div><strong>Want the full picture?</strong><span>Education, projects, skills and references — all on one page.</span></div>
      <div className="cv-banner-actions"><a className="button button-solid" href={profile.cv} download="Sandul-Hansana-CV.pdf">Download CV<Download aria-hidden="true"/></a><a className="button button-ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight aria-hidden="true"/></a></div>
    </Reveal>
  </section>;
}
