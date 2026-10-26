import React from 'react';
import { ArrowUpRight, BriefcaseBusiness, MapPin } from 'lucide-react';
import { RevealSection } from './Animated';
import experience from './data/experience.json';
import './journey.css';

const formatMonth = value => new Intl.DateTimeFormat('en', {
  month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${value}-01T00:00:00Z`));

export function Journey() {
  return <RevealSection id="journey" className="section journey-section" aria-labelledby="journey-heading">
    <div className="container">
      <div className="section-label"><span>04 / EDUCATION & EXPERIENCE</span><span className="label-line"/></div>
      <div className="journey-layout">
        <div>
          <h2 id="journey-heading">Learning by doing.<br/><span className="text-muted">Growing with experience.</span></h2>
          <p className="journey-intro">A foundation in software engineering at IIT,<br/>with internship experience in the workplace.</p>
          <div className="journey-note"><span>✦</span> The best part? There’s always more to learn.</div>
        </div>
        <div className="timeline">
          {experience.map(job => <article className="timeline-item internship-item" key={job.id} data-experience={job.id} aria-label={`${job.role} at ${job.company}`}>
            <span className="timeline-dot"/>
            <div className="timeline-top"><span className="little-label">WORK EXPERIENCE</span><span className="internship-badge"><BriefcaseBusiness aria-hidden="true"/>{job.employmentType}</span></div>
            <h3>{job.role}</h3>
            <a className="experience-company" href={job.companyUrl} target="_blank" rel="noopener noreferrer">{job.company}<ArrowUpRight aria-hidden="true"/></a>
            <p className="experience-dates"><time dateTime={job.startDate}>{formatMonth(job.startDate)}</time><span aria-hidden="true"> — </span><span className="sr-only"> to </span><time dateTime={job.endDate}>{formatMonth(job.endDate)}</time></p>
            <p className="experience-location"><MapPin aria-hidden="true"/><span>{job.location}</span></p>
            <div className="timeline-details"><span>{job.workplace}</span></div>
          </article>)}
          <article className="timeline-item">
            <span className="timeline-dot secondary-dot"/>
            <div className="timeline-top"><span className="little-label">EDUCATION</span><span className="current-badge">CURRENT</span></div>
            <h3>BEng (Hons) Software Engineering</h3>
            <p className="institution">Informatics Institute of Technology (IIT)</p><p>Fourth-Year Undergraduate</p>
            <div className="timeline-details"><span>Software development</span><span>Academic research</span><span>Engineering principles</span></div>
          </article>
        </div>
      </div>
    </div>
  </RevealSection>;
}
