import React, { forwardRef, useRef, useState } from 'react';
import { AnimatePresence, useIsPresent, useScroll, useSpring } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowDownToLine, ArrowUpRight, BriefcaseBusiness, CalendarDays, Check, ChevronDown, GraduationCap, Layers3, MapPin, Sparkles } from 'lucide-react';
import { RevealSection } from './Animated';
import { useMotionPreference } from './motion-preferences';
import { profile } from './profile';
import experience from './data/experience.json';
import './journey.css';

const formatMonth = value => new Intl.DateTimeFormat('en', {
  month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${value}-01T00:00:00Z`));

const education = {
  id: 'iit', kind: 'education', role: 'BEng (Hons) Software Engineering',
  company: 'Informatics Institute of Technology (IIT)', companyUrl: 'https://www.iit.ac.lk/',
  logo: '/assets/logos/iit.png', stage: 'Fourth-Year Undergraduate', location: 'Sri Lanka',
};
const records = [...experience.map(job => ({ ...job, kind: 'work' })), education];
const filters = [
  { id: 'all', label: 'All chapters', icon: Layers3 },
  { id: 'work', label: 'Experience', icon: BriefcaseBusiness },
  { id: 'education', label: 'Education', icon: GraduationCap },
];

function Period({ record }) {
  if (record.kind === 'education') return <span>{record.stage}</span>;
  return <><time dateTime={record.startDate}>{formatMonth(record.startDate)}</time><span aria-hidden="true"> — </span><span className="sr-only"> to </span><time dateTime={record.endDate}>{formatMonth(record.endDate)}</time></>;
}

function RecordDetails({ record }) {
  const present = useIsPresent();
  const reduced = useMotionPreference();
  const work = record.kind === 'work';
  return <m.div className="journey-expanded" id={`journey-details-${record.id}`} role="region" aria-labelledby={`journey-title-${record.id}`} inert={!present ? true : undefined}
    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
    transition={{ type: 'tween', duration: reduced ? 0 : .28, ease: [.2,.7,.3,1] }}>
    <div className="journey-expanded-inner">
      <dl className="journey-detail-grid">
        <div><dt>{work ? 'EMPLOYMENT' : 'QUALIFICATION'}</dt><dd>{work ? record.employmentType : record.role}</dd></div>
        <div><dt>{work ? 'WORKPLACE' : 'CURRENT STAGE'}</dt><dd>{work ? record.workplace : record.stage}</dd></div>
        <div className="journey-detail-location"><dt>LOCATION</dt><dd><MapPin aria-hidden="true"/>{record.location}</dd></div>
      </dl>
      {!work && <div className="journey-study-tags"><span>Software development</span><span>Academic research</span><span>Engineering principles</span></div>}
      <a className="journey-source-link" href={record.companyUrl} target="_blank" rel="noopener noreferrer">{work ? 'View company profile' : 'Explore IIT'}<ArrowUpRight aria-hidden="true"/></a>
    </div>
  </m.div>;
}

const JourneyRecord = forwardRef(function JourneyRecord({ record, expanded, onToggle, index }, ref) {
  const present = useIsPresent();
  const reduced = useMotionPreference();
  const work = record.kind === 'work';
  const Icon = work ? BriefcaseBusiness : GraduationCap;
  return <m.article ref={ref} className={`journey-record journey-record-${record.id} ${expanded ? 'is-expanded' : ''}`} data-experience={work ? record.id : undefined} data-kind={record.kind}
    aria-labelledby={`journey-title-${record.id}`} inert={!present ? true : undefined} layout="position"
    initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -10, transition: { duration: reduced ? 0 : .16 } }}
    transition={{ type: 'spring', stiffness: 160, damping: 25, delay: reduced ? 0 : index * .04 }}>
    <div className="journey-node" aria-hidden="true"><span/></div>
    <div className="journey-record-surface">
      <div className="journey-record-top"><span className="journey-kind"><Icon aria-hidden="true"/>{work ? record.employmentType : 'Education'}</span><span className={`journey-state ${work ? 'is-completed' : 'is-studying'}`}>{work ? <Check aria-hidden="true"/> : <span className="status-dot"/>}{work ? 'Completed' : 'In progress'}</span></div>
      <div className="timeline-identity">
        <a className={`timeline-logo ${work ? '' : 'timeline-logo-iit'}`} href={record.companyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${record.company}`}>
          <img src={record.logo} alt={`${record.company} logo`} width={work ? 100 : 2233} height={work ? 100 : 916} loading="lazy" decoding="async"/>
        </a>
        <div className="timeline-identity-copy"><h3 id={`journey-title-${record.id}`}>{record.role}</h3><a className="experience-company" href={record.companyUrl} target="_blank" rel="noopener noreferrer">{record.company}<ArrowUpRight aria-hidden="true"/></a></div>
      </div>
      <div className="journey-record-meta"><span className="experience-dates"><CalendarDays aria-hidden="true"/><span><Period record={record}/></span></span>{work && <span className="journey-workplace"><MapPin aria-hidden="true"/>{record.workplace}</span>}</div>
      <div className="journey-record-footer"><span className="journey-record-index">{String(records.findIndex(item => item.id === record.id) + 1).padStart(2, '0')} / {work ? 'PROFESSIONAL EXPERIENCE' : 'ACADEMIC FOUNDATION'}</span><button className="journey-toggle" type="button" aria-expanded={expanded} aria-controls={`journey-details-${record.id}`} aria-label={`${expanded ? 'Hide' : 'View'} details for ${record.company}`} onClick={onToggle}>{expanded ? 'Less detail' : 'View details'}<m.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: reduced ? 0 : .2 }}><ChevronDown aria-hidden="true"/></m.span></button></div>
      <AnimatePresence initial={false}>{expanded && <RecordDetails key={record.id} record={record}/>}</AnimatePresence>
    </div>
  </m.article>;
});

export function Journey() {
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(experience[0]?.id ?? 'iit');
  const list = useRef(null);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 75%', 'end 45%'], trackContentSize: true });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const visibleRecords = records.filter(record => filter === 'all' || record.kind === filter);
  const internshipCount = experience.filter(job => job.employmentType === 'Internship').length;
  const organizationCount = new Set(experience.map(job => job.company)).size;

  return <RevealSection id="journey" className="section journey-section journey-advanced" aria-labelledby="journey-heading">
    <div className="container">
      <div className="section-label"><span>04 / EDUCATION & EXPERIENCE</span><span className="label-line"/></div>
      <div className="career-layout">
        <aside className="career-sidebar">
          <div className="career-kicker"><span className="intro-dash"/> THE JOURNEY SO FAR</div>
          <h2 id="journey-heading">Every chapter.<br/><span className="text-muted">More perspective.</span></h2>
          <p className="journey-intro">From studying software engineering at IIT to internships at Sri Lanka Telecom and the Prime Minister’s Office Sri Lanka.</p>
          <div className="career-snapshot">
            <div className="career-snapshot-title"><Sparkles aria-hidden="true"/><span>Built on curiosity.</span><span className="career-snapshot-mark" aria-hidden="true">↗</span></div>
            <div className="career-metrics"><div><strong>{String(internshipCount).padStart(2,'0')}</strong><span>Internships</span></div><div><strong>{String(organizationCount).padStart(2,'0')}</strong><span>Organizations</span></div></div>
            <div className="career-study"><span className="career-study-logo"><img src={education.logo} width="2233" height="916" alt="IIT logo" loading="lazy"/></span><div><span className="career-study-label"><span className="status-dot"/> CURRENTLY AT IIT</span><p>Fourth-year undergraduate</p></div></div>
          </div>
          <div className="career-actions"><a className="button button-primary" href="/assets/sandul-hansana-cv.pdf" download>Download résumé<ArrowDownToLine aria-hidden="true"/></a><a className="career-linkedin" href={profile.linkedin} target="_blank" rel="noopener noreferrer">View LinkedIn<ArrowUpRight aria-hidden="true"/></a></div>
          <p className="career-footnote">Learning never really stops.<span aria-hidden="true">✦</span></p>
        </aside>
        <div className="career-explorer">
          <div className="career-toolbar"><div className="journey-filters" role="group" aria-label="Filter education and experience">{filters.map(item => {
            const Icon = item.icon;
            return <button className={`journey-filter ${filter === item.id ? 'is-active' : ''}`} key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => {setFilter(item.id);setExpandedId(null);}}>{filter === item.id && <m.span className="journey-filter-pill" layoutId="journey-filter-pill" transition={{ type:'spring',stiffness:340,damping:30 }}/>}<Icon aria-hidden="true"/><span>{item.label}</span></button>;
          })}</div><span className="journey-result-count" role="status" aria-live="polite">{String(visibleRecords.length).padStart(2,'0')} {visibleRecords.length === 1 ? 'chapter' : 'chapters'}</span></div>
          <div className="journey-list" ref={list}>
            <div className="journey-rail" aria-hidden="true"><m.div className="journey-rail-fill" style={{ scaleY: reduced ? scrollYProgress : progress }}/></div>
            <AnimatePresence mode="popLayout" initial={false}>{visibleRecords.map((record,index) => <JourneyRecord key={record.id} record={record} index={index} expanded={expandedId === record.id} onToggle={() => setExpandedId(current => current === record.id ? null : record.id)}/>)}</AnimatePresence>
          </div>
          <div className="journey-bottom-note"><span className="status-dot"/><span>Still learning. Still building. Still moving forward.</span></div>
        </div>
      </div>
    </div>
  </RevealSection>;
}
