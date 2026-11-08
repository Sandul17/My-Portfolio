import React from 'react';
import { Card, SectionHead } from './Animated';
import { SkillIcon } from './SkillIcon';
import { skillGroups } from './profile';

const iconFor = label => ({ 'Node.js': 'nodejs', 'React Native': 'react', 'Object-Oriented Programming': 'oop' }[label] ?? label.toLowerCase());

export function Skills() {
  return <section id="skills" className="section container" aria-labelledby="skills-heading">
    <SectionHead index="02" eyebrow="Toolbox" id="skills-heading" title={<>The right tools<br/>for <em>good ideas.</em></>}>Technologies I use to take products from a Figma frame to a working, deployed application.</SectionHead>
    <div className="skills-grid">
      {skillGroups.map((g, i) => <Card key={g.id} index={i} className={`skill-card skill-${g.id}`}>
        <div className="skill-card-head"><span className="mono">0{i + 1}</span><h3>{g.title}</h3></div>
        <ul className="skill-chips">{g.skills.map(s => <li key={s}><SkillIcon name={iconFor(s)}/>{s}</li>)}</ul>
      </Card>)}
    </div>
  </section>;
}
