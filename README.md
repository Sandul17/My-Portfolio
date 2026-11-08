# Sandul Hansana — Personal Portfolio

A responsive React and Tailwind CSS portfolio with a premium navy theme, an interactive iridescent 3D sculpture, spring animations, magnetic buttons, card tilt and spotlights, smooth scrolling, a searchable project explorer, keyboard command menu, contextual contact form, and downloadable PDF résumé.

## Development

Use Node.js 22.12 or later.

```sh
npm install
npm run dev
```

Create the production build with `npm run build`, and preview it with `npm run preview`.

## Content

All content — profile, projects, skill groups, soft skills, education and achievements — lives in `src/profile.js` and comes from Sandul’s CV (`public/assets/sandul-hansana-cv.pdf`). Internship details live in `src/data/experience.json`. Nothing beyond the CV and previously supplied LinkedIn details has been invented; project previews are illustrative CSS mock-ups (`src/ProjectVisual.jsx`), not screenshots.

`src/App.jsx` assembles the page from `Hero`, `About` (bento grid), `Skills`, `Projects` (+ `ProjectDialog`), `Experience` (timeline) and `Contact`. All styles are in `src/styles.css`, built on CSS custom-property design tokens with light and dark themes.

## Design

- Light/dark theme that follows the system setting, with a manual toggle (remembered per browser) and a View Transitions circular reveal.
- Geist + Instrument Serif typography, a single orange accent, bento-grid layout, subtle grain and grid backgrounds.
- Floating glass navigation with an animated active pill, a ⌘K / Ctrl K command menu, and a full-screen menu on phones.
- Spotlight hover cards, blur-in scroll reveals, a tech marquee, and filterable project grid with shareable `/?project=<id>#projects` links.
- Every animation respects `prefers-reduced-motion`.

## Frontend libraries

| Library | Role |
| --- | --- |
| [Motion for React](https://motion.dev/docs/react) | Entrances, viewport reveals, shared-layout pills, spotlight cards, reading progress. |
| [Lenis](https://github.com/darkroomengineering/lenis) | Smooth desktop wheel and anchor scrolling; pauses while a dialog is open. |
| [Lucide React](https://lucide.dev/guide/react/) | UI icons. Technology brand artwork is local SVG in `src/SkillIcon.jsx`. |

## Contact form activation

The form posts over HTTPS to FormSubmit, addressed to `sandulhansana@gmail.com`. It includes required-field checks, name/email/message validation, a honeypot, submission state, a request timeout, and explicit success/error handling. A failed request preserves the visitor's message and provides the email address for direct contact.

**One-time action:** the first real form submission triggers FormSubmit's confirmation email. Sandul must click that email's activation link before email delivery is enabled. This activation cannot be completed from the source code. See https://formsubmit.co/ and https://formsubmit.co/ajax-documentation.

The site never claims that a message reached the inbox: success means the email service accepted the submission. No live test message was sent during implementation. Browser verification uses intercepted service responses.

## CV

The downloadable CV is `public/assets/sandul-hansana-cv.pdf`. To update it, replace that file with the new PDF (keep the filename).

## Hosting

The Sites project identity is stored in `.openai/hosting.json`. Vite creates the static production site in `dist/`.
