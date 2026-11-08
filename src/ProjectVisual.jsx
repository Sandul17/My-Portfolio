import React from 'react';

/* Illustrative, CSS-only previews — one style per kind of project. */
export function ProjectVisual({ project }) {
  let art;
  if (project.kind === 'mobile') art = <div className="pv-phone"><i className="pv-notch"/><div className="pv-phone-hero"/><div className="pv-row"><i/><i/></div><div className="pv-list"><i/><i/><i/></div><div className="pv-pill"/></div>;
  else if (project.kind === 'research') art = <div className="pv-radar"><i/><i/><i/><b/><span className="pv-dot d1"/><span className="pv-dot d2"/><span className="pv-dot d3"/></div>;
  else if (project.kind === 'software') art = <div className="pv-terminal"><div className="pv-bar"><i/><i/><i/></div><div className="pv-seats">{Array.from({ length: 24 }, (_, i) => <i key={i} className={[1, 2, 7, 10, 11, 16, 21].includes(i) ? 'on' : ''}/>)}</div><code>$ java CinemaBooking</code></div>;
  else art = <div className="pv-browser"><div className="pv-bar"><i/><i/><i/><span/></div><div className="pv-page"><div className="pv-side"><i/><i/><i/><i/></div><div className="pv-main"><b/><div className="pv-cards"><i/><i/><i/></div><div className="pv-table"><i/><i/><i/></div></div></div></div>;
  return <div className={`project-visual tone-${project.tone}`} aria-hidden="true">{art}</div>;
}
