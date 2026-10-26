# Sandul Hansana — Personal Portfolio

A responsive React and Tailwind CSS portfolio with a premium navy theme, an interactive iridescent 3D sculpture, spring animations, magnetic buttons, card tilt and spotlights, smooth scrolling, accessible project dialogs, animated project filtering, contact form, and downloadable PDF résumé.

## Development

Use Node.js 22.12 or later.

```sh
npm install
npm run dev
```

Create the production build with `npm run build`, and preview it with `npm run preview`.

## Content

Contact details and project descriptions are in `src/profile.js`. Add repository and live links there when available; links without a destination are not rendered. Page content is in `src/App.jsx`, the hero is in `src/Hero.jsx`, and skill groups and brand icons are in `src/Skills.jsx` and `src/SkillIcon.jsx`. Internship details live in `src/data/experience.json`, shared by the experience timeline in `src/Journey.jsx` and the PDF résumé generator. Contact behavior is in `src/Contact.jsx`, with styles in `src/styles.css`, `src/skills.css`, `src/journey.css`, and `src/effects.css`.

## Frontend libraries

| Library | Role |
| --- | --- |
| [Motion for React](https://motion.dev/docs/react) | Spring entrances, viewport reveals, card tilt, magnetic buttons, reading progress, and project-filter transitions. |
| [Lenis](https://github.com/darkroomengineering/lenis) | Smooth desktop wheel and anchor scrolling; pauses when a project dialog opens. |
| [React Three Fiber](https://r3f.docs.pmnd.rs/) + [Drei](https://drei.docs.pmnd.rs/) + [Three.js](https://threejs.org/) | Procedurally lit, interactive 3D hero sculpture with no external model or environment downloads. |
| [Lucide React](https://lucide.dev/guide/react/) | Consistent navigation, action, and foundation-skill icons. Technology brand artwork remains local SVG. |

`src/Experience.jsx` configures Motion and Lenis. Reusable animation components live in `src/Animated.jsx`; `src/HeroScene.jsx` holds the lazy-loaded 3D scene.

The 3D bundle is not requested for narrow screens, reduced-motion preferences, unsupported WebGL, or data-saving mode. Those visitors see the SVG hero instead. The scene pauses offscreen and in background tabs. Pointer effects and smooth scrolling respect reduced-motion preferences, including changes made while the page is open.

All education, skills, projects, experience, and contact details come from information supplied by Sandul. The internships at Sri Lanka Telecom (March–September 2026) and the Prime Minister’s Office Sri Lanka (July 2025–January 2026) use the titles, dates, employment types, and locations Sandul supplied from LinkedIn. Responsibilities and achievements are omitted because none were provided. No employment, grades, dates, or project results have been invented. PlotGuard artwork is labelled as a concept visual.

Timeline logos are stored locally in `public/assets/logos/`. The employer logos are the images Sandul supplied from the [Sri Lanka Telecom](https://www.linkedin.com/company/166104/) and [Prime Minister’s Office Sri Lanka](https://www.linkedin.com/company/109893347/) LinkedIn company pages. The IIT logo comes from [IIT’s official website](https://www.iit.ac.lk/wp-content/uploads/2026/08/IIT-Logo-Black.png). Original colors and proportions are preserved on white logo tiles.

The experience explorer has All chapters, Experience, and Education filters, expandable placement details, a scroll-linked timeline, and a sticky career snapshot on larger screens. Details use the confirmed employment types, work arrangements, locations, and education stage; no responsibilities are inferred. Filter buttons and detail toggles support keyboard use, expose their state to assistive technology, and respect reduced-motion settings. The résumé and LinkedIn actions are available beside the timeline.

## Contact form activation

The form posts over HTTPS to FormSubmit, addressed to `sandulhansana@gmail.com`. It includes required-field checks, name/email/message validation, a honeypot, submission state, a request timeout, and explicit success/error handling. A failed request preserves the visitor's message and provides the email address for direct contact.

**One-time action:** the first real form submission triggers FormSubmit's confirmation email. Sandul must click that email's activation link before email delivery is enabled. This activation cannot be completed from the source code. See https://formsubmit.co/ and https://formsubmit.co/ajax-documentation.

The site never claims that a message reached the inbox: success means the email service accepted the submission. No live test message was sent during implementation. Browser verification uses intercepted service responses.

## Résumé

The downloadable résumé is at `public/assets/sandul-hansana-cv.pdf`. Regenerate it from confirmed information with:

```sh
python3 scripts/create-resume.py
```

## Hosting

The Sites project identity is stored in `.openai/hosting.json`. Vite creates the static production site in `dist/`.
