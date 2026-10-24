import React from 'react';

export function TicketCode() {
  return <pre><span className="terminal-purple">❯</span>{' run ticket-booking\n\n'}<span className="terminal-blue">{'  THE SEAT IS YOURS.\n'}</span>{'  ─────────────────────\n  A   '}<b>■ ■ ■</b>{' □ □ □ '}<b>■ ■</b>{'\n  B   □ □ '}<b>■ ■</b>{' □ □ □ □\n  C   '}<b>■</b>{' □ □ □ □ '}<b>■ ■</b>{' □\n\n'}<span className="terminal-green">  ✓ Your next experience awaits.</span></pre>;
}
