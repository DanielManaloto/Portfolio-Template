import { useState } from "react";
import IDE from "./IDE";

// Each language gets its own accent color instead of one color for
// everything, and its own line count so the IDE's line numbers match
// the code that's actually shown.
const skillCardContent = [
  {
    id: "html",
    language: "HTML",
    fileExtension: ".html",
    color: "#E4572E",
    confidence: 5,
    lineCount: 6,
    code: [
      { text: "<nav aria-label=", className: "text-sky-400" },
      { text: '"Main"', className: "text-emerald-400" },
      {
        text: '>\n  <ul>\n    <li><a href=',
        className: "text-sky-400",
      },
      { text: '"/projects"', className: "text-emerald-400" },
      {
        text: ">Projects</a></li>\n    <li><a href=",
        className: "text-sky-400",
      },
      { text: '"/contact"', className: "text-emerald-400" },
      {
        text: ">Contact</a></li>\n  </ul>\n</nav>",
        className: "text-sky-400",
      },
    ],
    useWith:
      "Semantic page structure, accessible forms, and the landmarks that search engines and screen readers rely on.",
    builtWith:
      "Marketing sites, responsive email templates, and multi-step forms.",
    workWith: [".css", ".js"],
  },
  {
    id: "css",
    language: "CSS",
    fileExtension: ".css",
    color: "#2F6FED",
    confidence: 4,
    lineCount: 5,
    code: [
      { text: ".card {\n  display: grid;\n  gap: ", className: "" },
      { text: "var(--space-3)", className: "text-sky-400" },
      {
        text: ";\n  container-type: inline-size;\n}",
        className: "",
      },
    ],
    useWith:
      "Grid and flexbox layouts, custom properties for theming, and container queries.",
    builtWith:
      "Design systems, dark-mode themes, and layouts that hold up from phone to widescreen.",
    workWith: [".html", ".jsx"],
  },
  {
    id: "js",
    language: "JavaScript",
    fileExtension: ".js",
    color: "#E0A800",
    confidence: 5,
    lineCount: 5,
    code: [
      { text: "async function ", className: "text-sky-400" },
      { text: "loadProjects", className: "text-amber-300" },
      {
        text: "() {\n  const res = await fetch(",
        className: "",
      },
      { text: '"/api/projects"', className: "text-emerald-400" },
      {
        text: ");\n  if (!res.ok) throw new Error(",
        className: "",
      },
      { text: '"Request failed"', className: "text-emerald-400" },
      { text: ");\n  return res.json();\n}", className: "" },
    ],
    useWith:
      "DOM scripting, async data fetching, form validation, and small Node.js services.",
    builtWith:
      "Interactive dashboards, a REST API client, and a lightweight build script.",
    workWith: [".jsx", ".py"],
  },
  {
    id: "jsx",
    language: "JSX",
    fileExtension: ".jsx",
    color: "#16A5C6",
    confidence: 4,
    lineCount: 7,
    code: [
      { text: "function ", className: "text-sky-400" },
      { text: "SkillTag", className: "text-amber-300" },
      {
        text: "({ name }) {\n  const [open, setOpen] = ",
        className: "",
      },
      { text: "useState", className: "text-amber-300" },
      { text: "(false);\n  return (\n    ", className: "" },
      { text: "<button ", className: "text-sky-400" },
      { text: "onClick", className: "" },
      { text: "={() => setOpen(!open)}", className: "" },
      {
        text: ">\n      {name}\n    </button>",
        className: "text-sky-400",
      },
      { text: "\n  );\n}", className: "" },
    ],
    useWith:
      "React components with hooks and props, state management, and reusable UI libraries.",
    builtWith: "A component library, a task tracker, and this portfolio site.",
    workWith: [".js", ".css"],
  },
  {
    id: "python",
    language: "Python",
    fileExtension: ".py",
    color: "#2E9E5B",
    confidence: 4,
    lineCount: 5,
    code: [
      { text: "def ", className: "text-sky-400" },
      { text: "moving_average", className: "text-amber-300" },
      {
        text:
          "(values, n):\n    return [\n        sum(values[i:i + n]) / n\n        for i in range(len(values) - n + 1)\n    ]",
        className: "",
      },
    ],
    useWith:
      "Automation scripts, data cleanup, small web APIs, and quick prototypes.",
    builtWith:
      "A CSV report generator, a Flask API, and a scraper that runs on a schedule.",
    workWith: [".js", ".c"],
  },
  {
    id: "c",
    language: "C",
    fileExtension: ".c",
    color: "#6A5ACD",
    confidence: 3,
    lineCount: 5,
    code: [
      { text: "int *", className: "text-sky-400" },
      { text: "make_buffer", className: "text-amber-300" },
      {
        text:
          "(size_t n) {\n  int *buf = malloc(n * sizeof(int));\n  if (!buf) return NULL;\n  return buf;\n}",
        className: "",
      },
    ],
    useWith:
      "Data structures, manual memory management, and performance-critical code.",
    builtWith:
      "A linked-list library, a text parser, and coursework in embedded programming.",
    workWith: [".py"],
  },
];

const findSkill = (ext) =>
  skillCardContent.find((skill) => skill.fileExtension === ext);

const SkillCard = ({ skill, onSelect }) => {
  return (
    <div
      className="grid gap-8 overflow-hidden rounded-2xl border-t-4 bg-white p-6 shadow-sm ring-1 ring-slate-200 md:grid-cols-[1.3fr_1fr] md:p-8"
      style={{ borderTopColor: skill.color }}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-end gap-4">
          <h3 className="text-4xl font-bold leading-none tracking-tight text-slate-900 md:text-5xl">
            {skill.language}
          </h3>
          <span
            className="rounded-full border px-3 py-1 font-mono text-sm"
            style={{ borderColor: skill.color, color: skill.color }}
          >
            {skill.fileExtension}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className="h-2 w-8 rounded-full bg-slate-200"
                style={
                  level <= skill.confidence
                    ? { backgroundColor: skill.color }
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        <IDE
          width="100%"
          height="13rem"
          tabs={[]}
          lineCount={skill.lineCount}
          code={skill.code.map((token, index) => (
            <span key={index} className={token.className || undefined}>
              {token.text}
            </span>
          ))}
        />
      </div>

      <div className="flex flex-col gap-5 md:border-l md:border-slate-200 md:pl-8">
        <div>
          <h4 className="mb-1 text-sm font-semibold text-slate-500">
            What I use it for
          </h4>
          <p className="text-slate-700">{skill.useWith}</p>
        </div>

        <div>
          <h4 className="mb-1 text-sm font-semibold text-slate-500">
            What I've built with it
          </h4>
          <p className="text-slate-700">{skill.builtWith}</p>
        </div>

        <div>
          <h4 className="mb-1 text-sm font-semibold text-slate-500">
            Works alongside
          </h4>
          <div className="flex flex-wrap gap-2">
            {skill.workWith.map((ext) => {
              const related = findSkill(ext);
              return (
                <button
                  key={ext}
                  type="button"
                  onClick={() => related && onSelect(related.id)}
                  className="rounded-full border px-3 py-1 font-mono text-xs text-slate-600 transition-colors hover:text-slate-900"
                  style={{ borderColor: related ? related.color : "#CBD5E1" }}
                >
                  {ext}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

function Skills() {
  const [selectedId, setSelectedId] = useState(skillCardContent[0].id);

  const selectedIndex = skillCardContent.findIndex(
    (skill) => skill.id === selectedId
  );
  const selectedSkill = skillCardContent[selectedIndex];

  const handleSelectedLang = (event) => {
    setSelectedId(event.target.value);
  };

  // Percentage for the progress bar, evenly spaced across every stop.
  const progressPercentage =
    (selectedIndex / (skillCardContent.length - 1)) * 100;

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-12 md:px-0">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Six languages, from the browser to the machine
        </h2>
        <p className="mt-3 text-slate-600">
          Most of my day is spent in the browser stack. Python and C round
          out the automation work and the parts that need to run close to
          the hardware. Pick a language to see how I use it.
        </p>
      </div>

      {/* Language selector */}
      <div className="flex flex-col gap-10">
        <div className="relative flex h-11 items-center justify-between">
          <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200" />
          <div
            className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: selectedSkill.color,
            }}
          />

          {skillCardContent.map((skill, index) => {
            const isSelected = skill.id === selectedId;
            const labelAbove = index % 2 !== 0;
            return (
              <label
                key={skill.id}
                className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-full focus-within:ring-2 focus-within:ring-offset-2"
                style={
                  isSelected
                    ? { "--tw-ring-color": skill.color }
                    : { "--tw-ring-color": "#94A3B8" }
                }
              >
                <input
                  type="radio"
                  name="language"
                  value={skill.id}
                  checked={isSelected}
                  onChange={handleSelectedLang}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none h-3 w-3 rounded-full border-2 transition-colors"
                  style={{
                    borderColor: isSelected ? skill.color : "#CBD5E1",
                    backgroundColor: isSelected ? skill.color : "#FFFFFF",
                  }}
                />
                <span
                  className={`pointer-events-none absolute whitespace-nowrap font-mono text-sm ${
                    labelAbove ? "bottom-full mb-2" : "top-full mt-2"
                  } ${isSelected ? "font-medium text-slate-900" : "text-slate-500"}`}
                >
                  {skill.fileExtension}
                </span>
              </label>
            );
          })}
        </div>

        <div className="flex justify-between text-sm text-slate-500 md:mt-4">
          <span>Runs in the browser</span>
          <span>Runs close to the hardware</span>
        </div>
      </div>

      {/* Selected skill */}
      <SkillCard skill={selectedSkill} onSelect={setSelectedId} />
    </section>
  );
}

export default Skills;