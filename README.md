# Sandul Hansana — Personal Portfolio

A responsive React and Tailwind CSS portfolio with a premium navy theme, blue and purple accents, custom CSS illustrations, accessible project dialogs, project filtering, a mobile menu, contact form, and downloadable PDF résumé.

## Development

Use Node.js 22.12 or later.

```sh
npm install
npm run dev
```

Create the production build with `npm run build`, and preview it with `npm run preview`.

## Content

Contact details and project descriptions are in `src/profile.js`. Add repository and live links there when available; links without a destination are not rendered. Page content is in `src/App.jsx`, with contact behavior in `src/Contact.jsx` and styles in `src/styles.css`.

All education, skills, projects, and contact details come from information supplied by Sandul. No internship, employment, grades, dates, or project results have been invented. PlotGuard artwork is labelled as a concept visual.

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
