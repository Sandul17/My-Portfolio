import React from 'react';
import { useMotionPreference } from './motion-preferences';
import * as m from 'motion/react-m';
import { SkillIcon } from './SkillIcon';
import { TiltCard } from './Animated';
import './skills.css';

const groups = [
  { title: 'Frontend development', description: 'Interfaces with people in mind.', icon: 'frontend', tone: 'blue', skills: [
    ['HTML', 'html'], ['CSS', 'css'], ['JavaScript', 'javascript'], ['React', 'react'],
  ] },
  { title: 'Backend & languages', description: 'The logic that makes it all work.', icon: 'backend', tone: 'purple', skills: [
    ['Java', 'java'], ['Python', 'python'], ['JavaScript', 'javascript'], ['PHP', 'php'], ['Node.js', 'nodejs'],
  ] },
  { title: 'Tools & workflow', description: 'Better tools. Better building.', icon: 'tools', tone: 'teal', skills: [
    ['Git', 'git'], ['GitHub', 'github'], ['VS Code', 'vscode'], ['IntelliJ IDEA', 'intellij'],
  ] },
  { title: 'Core foundations', description: 'Good software starts with good thinking.', icon: 'oop', tone: 'amber', skills: [
    ['Object-Oriented Programming', 'oop'], ['Software Engineering', 'engineering'], ['Problem Solving', 'problem'],
  ] },
];

export function Skills() {
  const reduced = useMotionPreference();
  const item = { hidden: { opacity: 0, y: 9 }, visible: { opacity: 1, y: 0 } };
  return <section id="skills" className="section skills-section" aria-labelledby="skills-heading">
    <div className="container">
      <div className="section-label"><span>02 / MY TOOLBOX</span><span className="label-line"/></div>
      <div className="section-heading"><h2 id="skills-heading">Good ideas meet<br/><span className="text-muted">the right tools.</span></h2><p>A growing collection of technologies and tools<br className="desktop-break"/> I use to bring ideas to life.</p></div>
      <div className="skills-grid">
        {groups.map((group, index) => <TiltCard className={`skill-card skill-category-${group.tone}`} key={group.title} index={index}>
          <div className={`skill-icon ${group.tone}`}><SkillIcon name={group.icon}/></div>
          <h3>{group.title}</h3><p>{group.description}</p>
          <m.ul className="skill-list" aria-label={`${group.title} skills`} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ visible: { transition: { staggerChildren: reduced ? 0 : .065, delayChildren: reduced ? 0 : .12 } } }}>
            {group.skills.map(([label, icon]) => <m.li className="skill-chip" key={label} variants={item}>
              <span className={`skill-brand skill-brand-${icon}`}><SkillIcon name={icon}/></span><span>{label}</span>
            </m.li>)}
          </m.ul>
          <span className="card-number" aria-hidden="true">0{index + 1}</span>
        </TiltCard>)}
      </div>
    </div>
  </section>;
}
