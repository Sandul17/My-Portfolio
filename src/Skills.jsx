import React, { useEffect, useRef } from 'react';
import { SkillIcon } from './SkillIcon';
import './skills.css';

const groups = [
  { title: 'Frontend development', description: 'Interfaces with people in mind.', icon: 'frontend', tone: 'blue', skills: [
    ['HTML', 'html'], ['CSS', 'css'], ['JavaScript', 'javascript'], ['React', 'react'],
  ] },
  { title: 'Backend & languages', description: 'The logic that makes it all work.', icon: 'backend', tone: 'purple', skills: [
    ['Java', 'java'], ['Python', 'python'], ['JavaScript', 'javascript'],
  ] },
  { title: 'Tools & workflow', description: 'Better tools. Better building.', icon: 'tools', tone: 'teal', skills: [
    ['Git', 'git'], ['GitHub', 'github'], ['VS Code', 'vscode'], ['IntelliJ IDEA', 'intellij'],
  ] },
  { title: 'Core foundations', description: 'Good software starts with good thinking.', icon: 'oop', tone: 'amber', skills: [
    ['Object-Oriented Programming', 'oop'], ['Software Engineering', 'engineering'], ['Problem Solving', 'problem'],
  ] },
];

export function Skills() {
  const section = useRef(null);

  useEffect(() => {
    const root = section.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const updateMotion = () => {
      observer?.disconnect();
      const animate = !preference.matches && 'IntersectionObserver' in window;
      root.classList.toggle('skills-animated', animate);
      if (!animate) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('skill-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      root.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
    };
    updateMotion();
    preference.addEventListener('change', updateMotion);
    return () => {
      observer?.disconnect();
      preference.removeEventListener('change', updateMotion);
      root.classList.remove('skills-animated');
    };
  }, []);

  return <section id="skills" className="section skills-section" ref={section} aria-labelledby="skills-heading">
    <div className="container">
      <div className="section-label"><span>02 / MY TOOLBOX</span><span className="label-line"/></div>
      <div className="section-heading"><h2 id="skills-heading">The skills behind<br/><span className="text-muted">the solutions.</span></h2><p>A growing collection of technologies and tools<br className="desktop-break"/> I use to bring ideas to life.</p></div>
      <div className="skills-grid">
        {groups.map((group, index) => <article className={`skill-card skill-category-${group.tone}`} key={group.title} style={{ '--card-delay': `${index * 90}ms` }}>
          <div className={`skill-icon ${group.tone}`}><SkillIcon name={group.icon}/></div>
          <h3>{group.title}</h3>
          <p>{group.description}</p>
          <ul className="skill-list" aria-label={`${group.title} skills`}>
            {group.skills.map(([label, icon], skillIndex) => <li className="skill-chip" key={label} style={{ '--skill-delay': `${index * 90 + skillIndex * 65 + 160}ms` }}>
              <span className={`skill-brand skill-brand-${icon}`}><SkillIcon name={icon}/></span>
              <span>{label}</span>
            </li>)}
          </ul>
          <span className="card-number" aria-hidden="true">0{index + 1}</span>
        </article>)}
      </div>
    </div>
  </section>;
}
