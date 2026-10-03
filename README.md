# Developer Portfolio Template

A single-page portfolio template built with React, Vite and Tailwind CSS. All text, links, skills and projects live in one JSON file, so you can publish a personalized site without touching the component code.

**Live demo:** [Demo](https://portfolio-template-lac-sigma.vercel.app/)

![Portfolio template preview](public\Portfolio-Template-preview.gif)

## Table of Contents

- [Preview and Live Demo](#preview-and-live-demo)
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Content Reference](#content-reference)
- [Facts, Skills, Project Filters and Contact Links in Depth](#facts-skills-project-filters-and-contact-links-in-depth)
- [Contact Form Setup](#contact-form-setup)
- [Theming and Styling](#theming-and-styling)
- [Images and Static Assets](#images-and-static-assets)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Accessibility](#accessibility)
- [Known Limitations](#known-limitations)
- [License](#license)

## Preview and Live Demo

| | |
| --- | --- |
| Live demo | [https://portfolio-template-lac-sigma.vercel.app/](https://portfolio-template-lac-sigma.vercel.app/) |
| Source | [https://github.com/DanielManaloto/Portfolio-Template](https://github.com/DanielManaloto/Portfolio-Template) |

The demo uses the placeholder content from `src/content.json`, so you can see every section and interaction before changing anything. Try the following:

- Toggle the light and dark themes with the button in the navigation bar.
- Select different languages in the Skills section and follow the "Works alongside" pills.
- Use the filter buttons in Projects, then open a project to see the preview dialog.
- Resize the window to check the layout on tablet and phone widths.

To show your own screenshot above, save an image of the site to `docs/preview.png` (or change the path in the image link at the top of this file). Keep the `docs/` folder out of `.gitignore` so the image is published with the repository.

## Overview

The template contains five sections: Home, About, Skills, Projects and Contact. A fixed navigation bar tracks the visible section and includes a light/dark theme toggle. Placeholder content ships in `src/content.json`; replace it with your own and the site is ready to deploy.

## Features

- **Content-driven**: every visible string, link and list is defined in `content.json`.
- **Typed code snippet** on the home page, rendered by a reusable `IDE` component that respects the reduced-motion setting.
- **Interactive skills picker**: a slider-style selector with a detail card per language, including a code sample, confidence rating and links to related skills.
- **Filterable project list** with a preview dialog, screenshot gallery and image lightbox.
- **Working contact form** that delivers messages to your inbox through Web3Forms, with spam protection and clear success and error states.
- **Copy-to-clipboard** for the email address.
- **Light and dark themes** that persist between visits.
- **Generated favicon** built from your initials, or a custom icon file if you prefer.
- **Responsive layout** from small phones to wide desktop screens.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI library | React |
| Build tool | Vite |
| Styling | Tailwind CSS v4 (design tokens defined in `src/index.css`) |
| Contact delivery | Web3Forms (client-side API) |
| Content | JSON |

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm (or another package manager of your choice)
- A free Web3Forms access key for the contact form (see [Contact Form Setup](#contact-form-setup))

### Installation

```bash
git clone <your-repository-url>
cd <your-project-folder>
npm install
```

### Environment variables

Create a file named `.env.local` in the project root:

```bash
VITE_WEB3FORMS_KEY=your-access-key-here
```

### Run the development server

```bash
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173`. Changes to components and to `content.json` reload automatically.

### Build for production

```bash
npm run build
npm run preview
```

The production build is written to `dist/`. `npm run preview` serves it locally so you can check it before deploying.

## Configuration

### Editing content

Open `src/content.json` and replace the placeholder values. Follow these rules to keep the file valid:

- Edit only the values, never the key names. The components look up those exact names.
- Keep all commas, quotes, braces `{}` and brackets `[]` intact.
- Keys that start with an underscore (`_readme`, `_comment` and similar) are notes for humans. The site ignores them, and you can delete them once you are comfortable with the file.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_WEB3FORMS_KEY` | Yes, for the contact form | Access key used to deliver form submissions to your email |

`.env.local` is excluded from version control by the `*.local` rule in `.gitignore`. Do not commit it. Vite embeds `VITE_` variables in the built JavaScript at build time, so treat the key as public and configure any available restrictions in your Web3Forms dashboard.

If the key is missing, the form shows an error message that points visitors to your email address instead.

## Content Reference

Every visible piece of text on the site comes from `src/content.json`. This section describes each object and every field inside it. Types use JSON terms: string, number, boolean, list (an array written with `[ ]`) and object (written with `{ }`).

### `navbar`

Controls the brand mark in the top navigation bar.

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Your full name, shown beside the badge. On screens narrower than 561px only the badge is shown. Also used in the accessible label of the "back to top" link. |
| `circleBadge` | string | Short text cut out of the circular badge, normally your initials. Two letters fit best. It is also the text drawn on the generated favicon when no custom favicon is set. |

### `site`

Controls what the browser shows for the page itself.

| Field | Type | Description |
| --- | --- | --- |
| `title` | string | Text shown on the browser tab, in bookmarks and in search results. A format such as `Your Name — Your Specialty` works well. |
| `favicon` | string | Path to your own icon inside `public/`, for example `/favicon.svg`. Leave it as an empty string (`""`) to generate an icon from `navbar.circleBadge`. |
| `faviconBackground` | string | Fill color of the generated favicon circle, as a hex code such as `#0b0b0b`. Ignored when `favicon` is set. |
| `faviconTextColor` | string | Color of the initials on the generated favicon. Ignored when `favicon` is set. |

### `home`

The introduction at the top of the page.

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Large heading at the top of the page. |
| `role` | string | Subheading under your name. A short list of roles separated by a middle dot (`·`) reads well. |
| `tagline` | string | One or two sentences stating what you build and which tools you use. |
| `codeSnippet` | object | Settings for the typed code window beside the introduction. Fields below. |
| `codeSnippet.variableName` | string | Name of the variable in the typed snippet, for example `developer` produces `const developer = { ... }`. |
| `codeSnippet.writes` | list of strings | Languages or technologies typed into the snippet. They are grouped three per line, and you can add, remove or reorder them freely. |
| `codeSnippet.status` | string | Value on the last line of the snippet, such as `"open to work"`. It also becomes the status bar label once typing finishes, with the first letter capitalized. |
| `primaryCta` | object | The first call-to-action button. |
| `secondaryCta` | object | The second call-to-action button. |
| `primaryCta.label`, `secondaryCta.label` | string | Text on the button. |
| `primaryCta.href`, `secondaryCta.href` | string | Where the button goes. Use `#` plus a section id (`#about`, `#skills`, `#projects`, `#contact`) to scroll to a section, or a full URL to link elsewhere. |

The first editor tab is named after `codeSnippet.variableName` (for example `developer.js`). The second tab (`index.js`) and the status text shown while typing (`Running developer.js`) are written directly in `Home.jsx`. Edit that file if you want them to change.

### `about`

The About section: a heading, a portrait, short paragraphs and a list of facts.

| Field | Type | Description |
| --- | --- | --- |
| `sectionTitle` | string | Heading of the section. A single line that sums up who you are or how you work is enough. |
| `imagePath` | string | Path to your portrait. Place the file in `public/` and use a leading slash, for example `/portrait.jpg`. |
| `paragraphs` | list of strings | Body text, one string per paragraph. The template suggests three: your background, what you do outside school or work, and what you are looking for next. |
| `facts` | list of objects | Label and value rows shown under the paragraphs. See [Facts in depth](#facts-about-section). |

### `skills`

The interactive language picker. Each card is described in [Skills in depth](#skills-in-depth).

| Field | Type | Description |
| --- | --- | --- |
| `sectionTitle` | string | Heading above the picker. |
| `sectionDescription` | string | Short introduction explaining how the skills are organized and inviting visitors to pick a language. |
| `endLabels` | object | Captions under the left (`start`) and right (`end`) ends of the picker, for example `"Runs in the browser"` and `"Runs close to the hardware"`. They describe the spectrum your cards are ordered along. |
| `confidenceLabels` | object | Text shown beside the confidence bars. Keys are the numbers `"1"` to `"5"`, and each value is the label for that rating, for example `"3": "Working knowledge"`. Every rating used by a card needs a label. |
| `skillCardContent` | list of objects | One object per language card. |

### `projects`

The project list and its filter buttons. Details are in [Project filters and cards in depth](#project-filters-and-cards-in-depth).

| Field | Type | Description |
| --- | --- | --- |
| `sectionTitle` | string | Heading above the project list. |
| `sectionDescription` | string | Short introduction describing the kinds of projects shown, such as client work, side projects or coursework. |
| `filters` | list of objects | The filter buttons shown above the list. |
| `projectList` | list of objects | One object per project. |

### `contact`

Contact details and the small print under the message form. See [Contact links in depth](#contact-links-in-depth) for the `links` list.

| Field | Type | Description |
| --- | --- | --- |
| `sectionTitle` | string | Heading above the contact details. |
| `sectionDescription` | string | Short invitation to get in touch, including how quickly you reply. |
| `email` | string | Your email address. Shown in the first row of the contact list, copied by the Copy button, and quoted in form error messages as a fallback. It is plain text, not a `mailto:` link. |
| `links` | list of objects | Other contact links shown under the email, in the order listed. Each item has a `label` and a `url`. |
| `links[].label` | string | Name shown on the left of the row, for example `GitHub`. Must be unique within the list. |
| `links[].url` | string | Full address starting with `https://`. Used as the link target. |
| `formNote` | string | Small print under the message form. It is shown while the form is idle or sending, and again in green after a message is sent successfully, so write a sentence that reads well both before and after sending. |

## Facts, Skills, Project Filters and Contact Links in Depth

### Facts (About section)

Facts are the label and value rows displayed under your paragraphs. They give visitors a quick summary they can scan in a few seconds, so the paragraphs can focus on your story instead of listing details.

```json
"facts": [
  { "label": "Focus", "value": "Embedded software and firmware" },
  { "label": "Education", "value": "BS in Electronics Engineering, Example University, 2021 to 2026" },
  { "label": "Availability", "value": "Open to full-time and freelance roles" }
]
```

How facts behave:

- Each fact is a row with the label on the left in a fixed-width column and the value on the right.
- Rows appear in the order listed. There is no limit, and you can add, remove or reorder them. If you remove the `facts` list entirely, no rows are drawn.
- Labels should be short, ideally under 20 characters. The label column has a fixed width, so longer labels wrap onto a second line.
- Values are plain text. HTML and Markdown are not interpreted.
- Each fact may include an optional `id`. It is only used internally to keep the list stable. If you set it, make it unique; if you omit it, the position in the list is used.

The template ships with eight suggested rows:

| Label | What to put there |
| --- | --- |
| Focus | Your main area of work or specialty. |
| Also comfortable with | Secondary skills or related areas. |
| Education | Degree, school and years attended. |
| Experience | Most recent job or internship, with company and dates. |
| Web stack | Frameworks and technologies you use for web work. |
| Tools | Version control, build tools, editors and other software. |
| Achievement | An award, competition result or certification, with the date. |
| Availability | The kinds of roles or projects you are open to. |

Treat these as a starting point. Replace "Web stack" with something that fits your field, such as "Hardware" or "Protocols", and delete rows that do not apply. Keep each value to a single line of facts rather than a full sentence, and avoid repeating what the paragraphs already say.

### Skills in depth

#### How the section works

The Skills section shows a horizontal track with one dot per card. Visitors click a dot, or move between dots with the keyboard, and a detail card below updates to match.

- Dots are spaced evenly along the track in the order the cards appear in `skillCardContent`.
- The first card in the list is selected when the page loads.
- Labels alternate above and below the track so they do not collide.
- The colored line fills from the left up to the selected dot, in that card's color.
- The two captions under the track come from `skills.endLabels`. Order your cards from the left caption to the right one, or change the captions if your skills follow a different spectrum.
- The picker needs at least two cards to draw correctly.

#### Card fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Short, unique, lowercase identifier used internally. Not shown on screen. |
| `language` | string | Large heading of the card, for example `JavaScript`. |
| `fileExtension` | string | The pill beside the heading, and the label under the dot on the track. Include the leading dot, for example `.js`. Also used by other cards' `workWith` lists to link to this card. |
| `color` | string | Hex code such as `#E0A800`. Used for the card's top border, the extension pill, the filled confidence bars, the track fill and the selected dot. |
| `confidence` | number | Whole number from 1 to 5. It sets how many of the five bars are filled and selects the matching entry in `confidenceLabels`. |
| `code` | list of objects | The snippet shown in the small code window. Format below. |
| `useWith` | string | One sentence under "What I use it for". |
| `builtWith` | string | One sentence under "What I've built with it". |
| `workWith` | list of strings | File extensions of related cards. Each becomes a clickable pill under "Works alongside". |

#### Writing the code sample

The `code` list is a series of pieces that are joined end to end into one block. Each piece has two fields:

- `text`: the characters to show. Use `\n` for a new line and spaces for indentation.
- `className`: a color class applied to that piece. Use an empty string for plain text.

| Class | Use for |
| --- | --- |
| `""` (empty) | Plain text |
| `text-sky-400` | Keywords |
| `text-amber-300` | Function and class names |
| `text-emerald-400` | Strings |

```json
"code": [
  { "text": "def ", "className": "text-sky-400" },
  { "text": "greet", "className": "text-amber-300" },
  { "text": "(name):\n    return f\"Hello, {name}\"", "className": "" }
]
```

This produces:

```python
def greet(name):
    return f"Hello, {name}"
```

Things to keep in mind:

- JSON requires escaping. A double quote inside `text` is written `\"`, a backslash is written `\\`, and a new line is written `\n`.
- Pieces are joined with nothing between them, so add any space you need inside the `text` values.
- The code window has a fixed height of 8rem, which fits roughly five lines. Longer samples scroll inside the window, so short snippets look best.
- The snippet is typed out when the card scrolls into view and replays whenever a different card is selected.

#### Related skills (`workWith`)

`workWith` lists the file extensions of other cards, for example `[".css", ".js"]`. Each entry is matched against the `fileExtension` of the other cards, and the match must be exact, including the leading dot and the letter case.

- A matching entry renders as a pill outlined in that card's color. Clicking it jumps to that card.
- An entry with no matching card renders as a gray pill that does nothing. This is useful as a quick check for typos.
- Links do not have to be mutual. `.html` can point to `.css` without `.css` pointing back.
- Use it to show how your skills connect, such as a language and the framework or tool you usually pair it with.

#### Adding a skill

1. Copy one complete `{ ... }` block in `skillCardContent`, including the comma that separates it from the next block.
2. Paste it where you want the card to appear on the track.
3. Change every field: `id`, `language`, `fileExtension`, `color`, `confidence`, `code`, `useWith`, `builtWith` and `workWith`.
4. Confirm the `id` and `fileExtension` are unique.
5. Add the language to a filter in `projects.filters` if you want to filter projects by it (see below).

To remove a skill, delete its block and remove its extension from any `workWith` lists that mention it.

### Project filters and cards in depth

#### How filtering works

The filter buttons are generated from `projects.filters`. Selecting a button hides every project that does not match it.

```json
"filters": [
  { "label": "All" },
  { "label": "Web", "languages": ["HTML", "CSS", "JS", "JSX"] },
  { "label": "Python", "languages": ["Python"] },
  { "label": "C / C++", "languages": ["C", "C++"] }
]
```

| Field | Type | Description |
| --- | --- | --- |
| `label` | string | Text on the button. It also identifies the filter, so every label must be unique. |
| `languages` | list of strings | Languages that make a project appear under this filter. Omit the field for a filter that should show everything. |

The rules, in order:

1. The first filter in the list is selected when the page loads. Keep "All" first so visitors see every project by default.
2. A filter without a `languages` field matches every project. This is what makes "All" work.
3. Any other filter shows a project if at least one entry in the project's `language` list appears in the filter's `languages` list.
4. A filter with an empty list (`"languages": []`) matches nothing and shows the "No projects found." message. Leave the field out instead if you want it to match everything.
5. Matching is exact and case-sensitive: `JS` is not the same as `js` or `JavaScript`.

#### Grouping languages

One button can cover several languages. In the example above, "Web" groups four languages, and a project tagged `["HTML", "CSS", "JS"]` appears under it. A project can appear under several filters at once, because each filter is checked independently. A project tagged `["Python", "C"]` would show under both "Python" and "C / C++".

Filters are independent of the skills cards. You can have filters for languages that have no skill card, and skill cards for languages that have no filter.

#### Adding a filter for a new language

1. Use one consistent spelling in your projects, for example `TypeScript`.
2. Add that value to the `language` list of each relevant project.
3. Add a filter object, or add the value to an existing filter's `languages` list:

```json
{ "label": "TypeScript", "languages": ["TypeScript"] }
```

A language that is not listed in any filter still appears in the project's tags and under "All", but no other button will show that project.

#### Project fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Project title. Must be unique because it identifies the card. |
| `description` | string | Two or three sentences about what the project is, what it does and what you built. Line breaks (`\n`) are kept in the preview dialog but not in the list. |
| `language` | list of strings | Languages used. They appear as small tags on the card and in the preview, and they decide which filters show the project. Use the exact spelling from your filters. |
| `hasLive` | boolean | `true` to show a "Live Site" button in the preview dialog, `false` to hide it. |
| `liveUrl` | string | Address of the live site. Only needed when `hasLive` is `true`. If `hasLive` is `true` and this is missing, the button points nowhere. |
| `sourceUrl` | string | Link to the repository. The "Source Code" button is always shown, so every project should have one. |
| `images` | list of strings | Paths to screenshots in `public/`, such as `/projects/my-app-1.png`. |

How images are used:

- The first image is the thumbnail on the project card.
- Every image is shown in the preview dialog, and clicking one opens an enlarged view that closes with the Escape key or a click.
- An empty list shows a placeholder on the card and the text "No screenshots added yet." in the preview.
- An image that fails to load is hidden instead of showing a broken icon, so check the browser console if a screenshot does not appear.

#### Adding a project

1. Copy one complete `{ ... }` block in `projectList`, including the trailing comma.
2. Give it a unique `name` and write the `description`.
3. Set `language` using spellings that match your filters.
4. Set `hasLive` and, if it is `true`, `liveUrl`. Set `sourceUrl`.
5. Add screenshot paths to `images`, or leave the list empty.
6. Open the matching filter button and confirm the project appears.

### Contact links in depth

The contact list always starts with the email row. Every item in `contact.links` adds one more row beneath it, so you can show as many profiles as you need.

```json
"links": [
  { "label": "GitHub", "url": "https://github.com/your-username" },
  { "label": "LinkedIn", "url": "https://www.linkedin.com/in/your-profile" },
  { "label": "Instagram", "url": "https://www.instagram.com/your-handle" }
]
```

How links behave:

- Rows appear in the order listed. Add, remove or reorder items freely. If you remove the `links` list, only the email row is shown.
- The `url` is the link target, so it must be a complete address including `https://`.
- The text shown to visitors is a cleaned-up version of the URL, with `https://` and a leading `www.` removed. `https://www.linkedin.com/in/your-profile` is displayed as `linkedin.com/in/your-profile`.
- Links open in a new browser tab and use `rel="noopener noreferrer"`.
- The label column is fixed at about five rem wide on larger screens, so short labels (roughly ten characters or fewer) fit best.
- The `label` also identifies the row, so each label must be unique.
- The "Email" label and the Copy button are written in `Contact.jsx` and cannot be changed from `content.json`.

## Contact Form Setup

1. Go to [web3forms.com](https://web3forms.com) and request an access key using the email address that should receive messages.
2. Copy the key from the confirmation email.
3. Add it to `.env.local` as `VITE_WEB3FORMS_KEY`.
4. Restart the development server so Vite picks up the change.
5. Submit a test message and confirm it arrives in your inbox.

The form sends a JSON request to the Web3Forms API and uses the visitor's email as the reply-to address. A hidden checkbox acts as a honeypot for basic bot protection. Submissions that fill it in are discarded silently.

When deploying, add the same variable to your hosting provider's environment settings. Because the value is read at build time, trigger a new build after setting it.

## Theming and Styling

Colors are defined as CSS variables in `src/index.css` and exposed to Tailwind through the `@theme` block. The variables are grouped into pairs, such as `--primary` and `--primary-foreground`, and have separate values for light mode (`:root`) and dark mode (`.dark`).

To change the palette, edit the variable values in those two blocks. Components use semantic utility classes such as `bg-background`, `text-foreground` and `border-border`, so a palette change applies across the whole site.

Other style settings:

- **Typography**: set `--font-sans` in the `@theme` block. The template references Noto Sans; add a font link to `index.html` or install a font package to load it.
- **Heading and paragraph defaults**: defined under `@layer base` in `index.css`.
- **Theme toggle**: the selected theme is stored in `localStorage` under the key `theme` and applied by toggling the `dark` class on the `<html>` element. The default is light.
- **Page margins**: set by the horizontal padding on the root element in `App.jsx`.

## Images and Static Assets

- Place the portrait and project screenshots in the `public/` folder and reference them with a leading slash, for example `/portrait.jpg` or `/projects/my-app-1.png`.
- Use `about.imagePath` for the portrait and each project's `images` list for screenshots.
- Images that fail to load are hidden automatically instead of showing a broken icon.
- For a custom favicon, place the file in `public/` and set `site.favicon` to its path.

## Project Structure

```text
.
├── public/                  Static files: portrait, screenshots, favicon
├── src/
│   ├── components/
│   │   ├── About.jsx        Portrait, paragraphs and fact rows
│   │   ├── CircleBadge.jsx  SVG badge with cut-out initials
│   │   ├── Contact.jsx      Contact details and copy button
│   │   ├── ContactForm.jsx  Web3Forms message form
│   │   ├── Home.jsx         Introduction and typed code snippet
│   │   ├── IDE.jsx          Reusable editor window with typing effect
│   │   ├── Navbar.jsx       Fixed navigation and theme toggle
│   │   ├── ProjectPreview.jsx  Project dialog and image lightbox
│   │   ├── Projects.jsx     Filterable project list
│   │   ├── Skills.jsx       Interactive skills selector and cards
│   │   └── useSiteMeta.jsx  Sets page title and favicon
│   ├── App.jsx              Page layout and section order
│   ├── content.json         All editable site content
│   ├── index.css            Tailwind setup and design tokens
│   └── main.jsx             Application entry point
├── .env.local               Local environment variables (not committed)
├── .gitignore
└── index.html
```

## Deployment

The build output in `dist/` is a static site and can be hosted anywhere that serves static files, including Netlify, Vercel, Cloudflare Pages and GitHub Pages.

General steps:

1. Push the repository to your Git provider.
2. Connect the repository to your hosting provider.
3. Set the build command to `npm run build` and the output directory to `dist`.
4. Add `VITE_WEB3FORMS_KEY` to the provider's environment variables.
5. Deploy.

If you publish to a sub-path, such as a GitHub Pages project site, set the `base` option in your Vite configuration and use paths that work from that base.

## Accessibility

- Navigation and sections use semantic landmarks, and the active section is exposed with `aria-current`.
- The skills selector is built on radio inputs, so it works with the keyboard and screen readers.
- The typed code snippet exposes its full text to assistive technology instead of announcing partial characters.
- Animations, including the typing effect and caret blink, are disabled when the visitor's system requests reduced motion.
- Form fields have visible labels, and form status messages use live regions.
- The project dialog closes with the Escape key, and the image lightbox closes first when both are open.

## Known Limitations

- The skills cards use fixed light-mode colors (white card, slate text and track) and do not adapt to the dark theme.
- The skills section needs at least two cards, because the progress line is calculated from the number of cards minus one.
- The portrait path is used as given. Use a path that works in the browser, such as `/portrait.jpg`, and prefer `.jpg` or `.png` over `.jfif`.
- Navigation links, the Email label and Copy button, the contact form labels and button, the skill card headings, the project buttons and the "No projects found." message are written in the components and cannot be changed from `content.json`.

## License

This template is licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

You are free to:

- **Share**: copy and redistribute the material in any medium or format.
- **Adapt**: remix, transform and build upon the material for any purpose, including commercial use.

Under the following terms:

- **Attribution**: you must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in a way that suggests the licensor endorses you or your use.
- **No additional restrictions**: you may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.
