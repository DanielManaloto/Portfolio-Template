import { useState } from "react";
import ProjectPreview from "./ProjectPreview";

import content from "../content.json";
const { sectionTitle, sectionDescription, projectList, filters } =
  content.projects;


function Projects() {
  const [filter, setFilter] = useState(filters[0].label);
  const [previewProject, setPreviewProject] = useState(null);

  const activeFilter = filters.find((item) => item.label === filter);

  const filteredProjects = projectList.filter((project) => {
    // A filter with no "languages" list (e.g. "All") matches everything.
    if (!activeFilter?.languages) {
      return true;
    }

    return project.language.some((language) =>
      activeFilter.languages.includes(language),
    );
  });

  return (
    <div className="flex flex-col gap-6">
      <h1>{sectionTitle}</h1>

      <p>{sectionDescription}</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-1 pb-4 border-b border-border text-sm">
        {filters.map((item) => (
          <button
            key={item.label}
            onClick={() => setFilter(item.label)}
            className={`px-3 py-1 rounded  ${
              filter === item.label
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-transparent text-foreground border-border hover:bg-muted-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Projects */}
      <div className="grid gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.name}
            className="grid sm:grid-cols-[200px_1fr] gap-6 border-b border-border pb-6"
          >
            {/* Image / preview trigger */}
            <button
              onClick={() => setPreviewProject(project)}
              className="group relative h-50 w-full overflow-hidden self-center border border-border bg-muted text-left"
            >
              {project.images[0] ? (
                <img
                  src={project.images[0]}
                  alt={project.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                  Image Placeholder
                </span>
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 text-sm font-bold text-secondary opacity-0 transition group-hover:bg-foreground/40 group-hover:opacity-100">
                Preview
              </span>
            </button>

            {/* Project information */}
            <div className="grid gap-3">
              <h2>{project.name}</h2> <p>{project.description}</p>
              {/* Languages */}
              <div className="flex gap-2">
                {project.language.map((language) => (
                  <span className="text-[12px] text-muted-foreground" key={language}> {language} </span>
                ))}
              </div>
              {/* Preview trigger */}
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewProject(project)}
                  className="text-surface-foreground hover:underline hover:bg-muted"
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredProjects.length === 0 && <p>No projects found.</p>}
      </div>

      <ProjectPreview
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />
    </div>
  );
}

export default Projects;