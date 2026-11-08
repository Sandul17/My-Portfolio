import React from 'react';
import { ArrowUpRight, Download, MapPin } from 'lucide-react';
import { Card, Reveal, SectionHead } from './Animated';
import experience from './data/experience.json';
import { profile } from './profile';

const month = v => new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${v}-01T00:00:00Z`));

export function Experience() {
  return <section id="experience" className="section container" aria-labelledby="experience-heading">
    <SectionHead index="04" eyebrow="Experience" id="experience-heading" title={<>Where I’ve put<br/>it into <em>practice.</em></>}>Hands-on internships building and improving real systems in the public and telecom sectors.</SectionHead>
    <ol className="timeline">
      {experience.map((job, i) => <li key={job.id}>
        <Reveal className="timeline-date mono" delay={i * .05}><time dateTime={job.startDate}>{month(job.startDate)}</time> — <time dateTime={job.endDate}>{month(job.endDate)}</time></Reveal>
        <span className="timeline-node" aria-hidden="true"/>
        <Card index={i} className="timeline-card">
          <div className="timeline-head">
            <a className="timeline-logo" href={job.companyUrl} target="_blank" rel="noopener noreferrer" aria-label={`${job.company} on LinkedIn`}><img src={job.logo} alt="" width="100" height="100" loading="lazy"/></a>
            <div><h3>{job.role}</h3><a className="timeline-company" href={job.companyUrl} target="_blank" rel="noopener noreferrer">{job.company}<ArrowUpRight aria-hidden="true"/></a></div>
            <span className="badge">{job.employmentType}</span>
          </div>
          {job.summary && <p>{job.summary}</p>}
          <div className="timeline-foot mono"><span><MapPin aria-hidden="true"/>{job.location}</span><span>{job.workplace}</span></div>
        </Card>
      </li>)}
    </ol>
    <Reveal className="cv-banner">
      <div><strong>Want the full picture?</strong><span>Education, projects, skills and references — all on one page.</span></div>
      <div className="cv-banner-actions"><a className="button button-solid" href={profile.cv} download="Sandul-Hansana-CV.pdf">Download CV<Download aria-hidden="true"/></a><a className="button button-ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight aria-hidden="true"/></a></div>
    </Reveal>
  </section>;
}
