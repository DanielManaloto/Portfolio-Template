# Developer Portfolio Template

A responsive, content-driven portfolio website built with React and Tailwind CSS. All text, links, skills, and projects live in a single JSON file, so you can personalize the site without touching component code.

![Portfolio preview](docs/preview.png)

**Live demo:** [your-portfolio-url.com](https://your-portfolio-url.com)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Customizing Your Content](#customizing-your-content)
- [Adding Images](#adding-images)
- [Styling and Theming](#styling-and-theming)
- [Extending the Template](#extending-the-template)
- [Deployment](#deployment)
- [Accessibility](#accessibility)
- [License](#license)

---

## Features

- **Single source of content.** Every editable string, link, and list is stored in `src/content.json`.
- **Five focused sections.** Home, About, Projects, Skills, and Contact, with a fixed navigation bar and a mobile menu.
- **Interactive skills selector.** A timeline-style language picker with per-language accent colors, confidence meters, and a typed code sample.
- **Filterable project gallery.** Filter buttons are defined in JSON and can group multiple languages under one label.
- **Project preview modal.** Screenshot gallery with an enlarged image view, keyboard dismissal (Escape), and click-outside to close.
- **Animated code window.** A reusable `IDE` component that renders a VS Code style editor with optional typing animation.
- **Copy-to-clipboard email.** One-click copy with visual confirmation.
- **Responsive layout.** Designed for phone, tablet, and desktop viewports.
- **Reduced-motion support.** Typing animations are skipped when the operating system requests reduced motion.

## Tech Stack

| Layer      | Technology                                       |
| ---------- | ------------------------------------------------ |
| UI         | React 19 (function components and hooks)         |
| Styling    | Tailwind CSS v4 (CSS-first configuration)        |
| Tooling    | Vite                                             |
| Content    | Local JSON                                       |

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository (or use the "Use this template" button on GitHub)
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173` by default.

### Available Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the development server with hot reload |
| `npm run build`   | Create an optimized production build in `dist/` |
| `npm run preview` | Serve the production build locally           |

## Project Structure

```
.
├── public/                    # Static assets (screenshots, portrait, favicon)
├── src/
│   ├── components/
│   │   ├── About.jsx          # Portrait, biography, and fact rows
│   │   ├── CircleBadge.jsx    # SVG monogram with cut-out text
│   │   ├── Contact.jsx        # Contact details and copy-to-clipboard
│   │   ├── ContactForm.jsx    # Message form (presentational)
│   │   ├── Home.jsx           # Hero section with animated code window
│   │   ├── IDE.jsx            # Reusable editor-style code window
│   │   ├── Navbar.jsx         # Fixed navigation with mobile menu
│   │   ├── ProjectPreview.jsx # Modal with screenshots and lightbox
│   │   ├── Projects.jsx       # Filterable project list
│   │   └── Skills.jsx         # Interactive language selector
│   ├── App.jsx                # Page layout and section order
│   ├── content.json           # All editable site content
│   ├── index.css              # Tailwind import, theme tokens, base styles
│   └── main.jsx               # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Customizing Your Content

Open `src/content.json` and edit the values. Keys beginning with an underscore (for example `_comment`) are notes for humans and are ignored by the site.

> **Important:** Do not rename keys. The components look up fields by their exact names. Keep commas, quotes, and brackets intact, or the file will fail to parse.

### `navbar`

| Key           | Type   | Description                                     |
| ------------- | ------ | ----------------------------------------------- |
| `name`        | string | Name displayed next to the logo                 |
| `circleBadge` | string | Two-letter monogram rendered inside the badge   |

### `home`

| Key                        | Type     | Description                                              |
| -------------------------- | -------- | -------------------------------------------------------- |
| `name`                     | string   | Main heading                                             |
| `role`                     | string   | Subtitle beneath the heading                             |
| `tagline`                  | string   | One or two sentences describing what you do              |
| `codeSnippet.variableName` | string   | Variable name in the typed snippet                       |
| `codeSnippet.writes`       | string[] | Languages listed in the snippet (wrapped three per line) |
| `codeSnippet.status`       | string   | Final line of the snippet, such as `"open to work"`      |
| `primaryCta`               | object   | `label` and `href` for the primary button                |
| `secondaryCta`             | object   | `label` and `href` for the secondary button              |

Button `href` values should be `#` followed by a section id, for example `#projects`.

### `about`

| Key          | Type     | Description                                           |
| ------------ | -------- | ----------------------------------------------------- |
| `sectionTitle` | string | Section heading                                       |
| `imagePath`  | string   | Path to your portrait (see [Adding Images](#adding-images)) |
| `paragraphs` | string[] | Body text, one string per paragraph                   |
| `facts`      | object[] | Label and value rows shown beneath the text           |

### `skills`

| Key                | Type     | Description                                             |
| ------------------ | -------- | ------------------------------------------------------- |
| `sectionTitle`     | string   | Section heading                                         |
| `sectionDescription` | string | Introductory paragraph                                  |
| `endLabels`        | object   | `start` and `end` captions on either side of the selector |
| `confidenceLabels` | object   | Maps each confidence level (`"1"` to `"5"`) to a short label, for example `"5": "Daily driver"` |
| `skillCardContent` | object[] | One entry per language card                             |

Each entry in `skillCardContent` supports the following fields:

| Field           | Type     | Description                                                                  |
| --------------- | -------- | ---------------------------------------------------------------------------- |
| `id`            | string   | Unique, lowercase identifier used internally                                 |
| `language`      | string   | Display name, such as `"JavaScript"`                                         |
| `fileExtension` | string   | Extension shown on the selector and card, such as `".js"`                    |
| `color`         | string   | Hex color used for the card accent                                           |
| `confidence`    | number   | Integer from 1 to 5, controlling how many meter bars are filled              |
| `lineCount`     | number   | Number of lines in the code sample (informational)                           |
| `code`          | object[] | Code sample as `{ text, className }` tokens (see below)                      |
| `useWith`       | string   | What you use the language for                                                |
| `builtWith`     | string   | What you have built with it                                                  |
| `workWith`      | string[] | File extensions of related languages, rendered as clickable pills            |

**Code tokens.** Each token is a piece of text with an optional Tailwind color class. Use `\n` to start a new line.

| `className`        | Use for                |
| ------------------ | ---------------------- |
| `""`               | Plain text             |
| `"text-sky-400"`   | Keywords               |
| `"text-amber-300"` | Function or class names |
| `"text-emerald-400"` | Strings              |

Languages appear on the selector in the order they are listed. To add one, copy an entire `{ ... }` block, including the trailing comma, and edit every field.

### `projects`

| Key                  | Type     | Description                                        |
| -------------------- | -------- | -------------------------------------------------- |
| `sectionTitle`       | string   | Section heading                                    |
| `sectionDescription` | string   | Introductory paragraph                             |
| `filters`            | object[] | Filter buttons (see below)                         |
| `projectList`        | object[] | Project entries (see below)                        |

**Filters.** Each filter has a `label`. The first entry should be `{ "label": "All" }` with no `languages` field, which matches every project. Any other filter requires a `languages` array; a project appears under that filter if any of its own languages appear in the list.

```json
{ "label": "C / C++", "languages": ["C", "C++"] }
```

**Projects.** Each entry supports:

| Field         | Type     | Description                                                              |
| ------------- | -------- | ------------------------------------------------------------------------ |
| `name`        | string   | Project title (must be unique)                                           |
| `description` | string   | Short summary shown on the card and in the preview                       |
| `language`    | string[] | Any of `"HTML"`, `"CSS"`, `"JS"`, `"JSX"`, `"Python"`, `"C"`, `"C++"`   |
| `hasLive`     | boolean  | Whether to show a "Live Site" button in the preview                      |
| `liveUrl`     | string   | Deployed URL (used when `hasLive` is `true`)                             |
| `sourceUrl`   | string   | Link to the repository                                                   |
| `images`      | string[] | Screenshot paths. Use `[]` to display a placeholder                      |

The language spellings must match the filter values exactly, or the filters will not work.

### `contact`

| Key                  | Type   | Description                                     |
| -------------------- | ------ | ----------------------------------------------- |
| `sectionTitle`       | string | Section heading                                 |
| `sectionDescription` | string | Short paragraph inviting contact                |
| `email`              | string | Email address                                   |
| `github`             | string | Full GitHub profile URL beginning with `https://` |
| `linkedin`           | string | Full LinkedIn profile URL                       |
| `formNote`           | string | Small print displayed beneath the form          |

## Adding Images

Static files placed in `public/` are served from the site root. Reference them in `content.json` with a leading slash.

```
public/
├── portrait.jpg
└── My-Project/
    ├── screenshot-1.png
    └── screenshot-2.png
```

```json
"imagePath": "/portrait.jpg",
"images": ["/My-Project/screenshot-1.png", "/My-Project/screenshot-2.png"]
```

Guidelines:

- File names are **case-sensitive** on most hosting platforms. Match the exact casing, including extensions (`.PNG` and `.png` are different files on Linux).
- Images that fail to load are hidden automatically rather than showing a broken icon.
- Keep screenshots reasonably sized (under roughly 300 KB each) for faster page loads.
- If `public/` is listed in `.gitignore`, your images will not be committed or deployed. Remove that entry before publishing.

## Styling and Theming

### Design tokens

Colors are defined as CSS variables in `src/index.css`, with a light set under `:root` and a dark set under `.dark`.

| Token                                    | Purpose                          |
| ---------------------------------------- | -------------------------------- |
| `--background`, `--foreground`           | Page background and default text |
| `--surface`, `--surface-foreground`      | Alternate section background     |
| `--card`, `--card-foreground`            | Card surfaces                    |
| `--muted`, `--muted-foreground`          | Subdued surfaces and text        |
| `--border`, `--input`, `--ring`          | Borders, inputs, focus rings     |
| `--primary`, `--secondary`, `--accent`   | Interactive and emphasis colors  |

The dark variant is class-based (`@custom-variant dark`). Adding the `dark` class to the root element activates the dark tokens.

### Typography

The default font family is set in the `@theme` block of `index.css`:

```css
@theme {
  --font-sans: "Noto Sans", sans-serif;
}
```

Load your chosen font (for example, through a `<link>` tag in `index.html`) and update this value.

### Base element styles

Headings, paragraphs, and buttons receive default styles in the `@layer base` block. Adjust these to change the look of the whole site at once.

## Extending the Template

### Reordering or removing sections

Sections are rendered in `src/App.jsx`. Reorder, remove, or restyle them there. Keep the `id` on each `<section>` in sync with the links in `Navbar.jsx`.

### Adding a new section

1. Create a component in `src/components/`.
2. Add a matching block to `content.json` and read it in your component.
3. Render the component inside a `<section id="your-id">` in `App.jsx`.
4. Add an entry to `navItems` in `Navbar.jsx` with `href: "#your-id"`.

### Using the IDE component

`IDE` can be used anywhere you want an editor-style code window.

```jsx
<IDE
  width="100%"
  height="10rem"
  tabs={[{ name: "example.js", language: "JS", active: true }]}
  tokens={[
    { text: "const ", className: "text-sky-400" },
    { text: "greeting = 'hello';", className: "" },
  ]}
  typing
  startOnVisible
/>
```

| Prop             | Description                                                       |
| ---------------- | ----------------------------------------------------------------- |
| `width`, `height`| Dimensions of the window                                          |
| `tabs`           | Array of `{ name, language, active }`; pass `[]` to hide the tab bar |
| `code`           | Pre-rendered JSX, displayed without animation                     |
| `tokens`         | Array of `{ text, className }`, used instead of `code`            |
| `typing`         | Animate `tokens` as if typed                                      |
| `startOnVisible` | Delay the animation until the window scrolls into view            |
| `typingSpeed`    | `{ charsPerTick, intervalMs }` (default 2 characters per 24 ms)   |
| `status`         | `{ running, done }` labels for an optional status bar             |

### Contact form

`ContactForm.jsx` is presentational and does not submit data. Common options for making it functional:

- Build a `mailto:` link from the form values so it opens a draft in the visitor's email client.
- Connect it to a form backend such as Formspree, Web3Forms, or Netlify Forms.
- Post to your own serverless function.

## Deployment

Build the site with:

```bash
npm run build
```

The output is written to `dist/` and can be hosted on any static platform.

| Platform         | Notes                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Vercel           | Import the repository; the Vite preset is detected automatically      |
| Netlify          | Build command `npm run build`, publish directory `dist`              |
| Cloudflare Pages | Build command `npm run build`, output directory `dist`               |
| GitHub Pages     | Set `base: "/<repo-name>/"` in `vite.config.js`, then publish `dist/` |

## Accessibility

- The language selector is built on native radio inputs, so it is keyboard navigable and announced correctly by screen readers.
- Animated code samples expose their full text to assistive technology instead of partial characters.
- Interactive elements have visible focus states and descriptive labels.
- The preview modal closes with the Escape key.
- Motion is disabled when `prefers-reduced-motion` is set.

## License

Released under the [MIT License](LICENSE). You are free to use, modify, and distribute this template for personal or commercial projects. Attribution is appreciated but not required.

---

If this template helped you, consider starring the repository.