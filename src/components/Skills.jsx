import { useState } from "react";
import IDE from "./IDE";

import content from "../content.json";

const skillCardContent = content.skills.skillCardContent;

const findSkill = (ext) =>
  skillCardContent.find((skill) => skill.fileExtension === ext);

const SkillCard = ({ skill, onSelect }) => {
  return (
    <div
      className="grid gap-6 overflow-hidden rounded-2xl border-t-4 bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6 lg:grid-cols-[1.3fr_1fr] md:gap-8 md:p-8"
      style={{ borderTopColor: skill.color }}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-end gap-3">
          <h3 className="text-3xl font-bold leading-none tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
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
          height="8rem"
          tabs={[]}
          lineCount={skill.lineCount}
          code={skill.code.map((token, index) => (
            <span key={index} className={token.className || undefined}>
              {token.text}
            </span>
          ))}
        />
      </div>

      <div className="flex flex-col gap-5 lg:border-l lg:border-slate-200 lg:pl-8">
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

  const progressPercentage =
    (selectedIndex / (skillCardContent.length - 1)) * 100;

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10 py-12">
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
      <div className="flex flex-col gap-5">
        <div className="relative flex h-10 items-center justify-between sm:h-11">
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
                className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full focus-within:ring-2 focus-within:ring-offset-2 sm:h-11 sm:w-11"
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
                  className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs sm:text-sm ${
                    labelAbove ? "bottom-full mb-2" : "top-full mt-2"
                  } ${isSelected ? "font-medium text-slate-900" : "text-slate-500"}`}
                >
                  {skill.fileExtension}
                </span>
              </label>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between text-xs text-slate-500 sm:text-sm md:mt-4">
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