import IDE from "./IDE";
import content from "../content.json";

const home = content.home;
const { variableName, writes, status } = home.codeSnippet;

const KEYWORD = "text-blue-400";
const IDENT = "text-yellow-300";
const STRING = "text-green-400";

// Group the "writes" list a few items per line so the snippet wraps the
// same way regardless of how many languages content.json lists.
const WRITES_PER_LINE = 3;
const writeLines = [];
for (let i = 0; i < writes.length; i += WRITES_PER_LINE) {
  writeLines.push(writes.slice(i, i + WRITES_PER_LINE));
}

// The snippet as a flat list of coloured tokens, so the IDE can type it out.
const developerTokens = [
  { text: "const", className: KEYWORD },
  { text: " " },
  { text: variableName, className: IDENT },
  { text: " = {\n  name: " },
  { text: `"${home.name}"`, className: STRING },
  { text: ",\n  writes: [" },
  ...writeLines.flatMap((line, i) => [
    ...(i > 0 ? [{ text: "\n           " }] : []),
    { text: line.map((item) => `"${item}"`).join(", "), className: STRING },
    { text: i === writeLines.length - 1 ? " ]," : "," },
  ]),
  { text: "\n  status: " },
  { text: `"${status}"`, className: STRING },
  { text: "\n};" },
];

// Derive the line count from the text so it can never drift out of sync.
const developerLineCount =
  developerTokens.reduce((n, t) => n + t.text.split("\n").length - 1, 0) + 1;

const statusLabels = {
  running: "Running developer.js",
  done: status.charAt(0).toUpperCase() + status.slice(1),
};

function Home() {
  return (
    <div className="min-h-screen w-full flex max-sm:flex-col gap-10 items-center justify-between pt-16">
      <div className="flex flex-col gap-3 w-full">
        <h1>{home.name}</h1>
        <h3>{home.role}</h3>

        <p>{home.tagline}</p>

        <div className="flex gap-5">
          <a
            href={`${home.primaryCta.href}`}
            className="border border-ring rounded-4xl py-2 px-4 whitespace-nowrap hover:bg-secondary"
          >
            {home.primaryCta.label}
          </a>

          <a
            href={`${home.secondaryCta.href}`}
            className="border border-ring rounded-4xl py-2 px-4 whitespace-nowrap hover:bg-secondary"
          >
            {home.secondaryCta.label}
          </a>
        </div>
      </div>
      <div className="w-full max-w-[30rem]">
        <IDE
          width="100%"
          height="16rem"
          tabs={[
            {
              name: "developer.js",
              language: "JS",
              active: true,
              closable: true,
            },
            {
              name: "index.js",
              language: "JS",
              active: false,
              closable: true,
            },
          ]}
          lineCount={developerLineCount}
          tokens={developerTokens}
          typing
          status={statusLabels}
        />
      </div>
    </div>
  );
}

export default Home;