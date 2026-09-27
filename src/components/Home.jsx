import IDE from "./IDE";
import content from "../content.json";

const home = content.home;

const developerCode = (
  <>
    <span className="text-blue-400">const</span>{" "}
    <span className="text-yellow-300">developer</span> = {"{"}
    {"\n  "}
    <span>name: </span>
    <span className="text-green-400">"{home.name}"</span>
    {","}
    {"\n  "}
    <span>writes: </span>
    {"["}
    <span className="text-green-400">"HTML", "CSS", "JavaScript",</span>
    {"\n           "}
    <span className="text-green-400">"Python", "C / C++"</span> {"],"}
    {"\n  "}
    <span>status: </span>
    <span className="text-green-400">"open to work"</span>
    {"\n};"}
  </>
);

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
            className="border border-amber-700 rounded-4xl py-2 px-4 whitespace-nowrap"
          >
            {home.primaryCta.label}
          </a>

          <a
            href={`${home.secondaryCta.href}`}
            className="border border-amber-700 rounded-4xl py-2 px-4 whitespace-nowrap"
          >
            {home.secondaryCta.label}
          </a>
        </div>
      </div>
      <div className="w-full max-w-[30rem]">
        <IDE
          width="100%"
          height="15rem"
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
          lineCount={7}
          code={developerCode}
        />
      </div>
    </div>
  );
}

export default Home;
