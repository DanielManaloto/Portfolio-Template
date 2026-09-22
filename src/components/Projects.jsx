import { useState } from "react";

const projectList = [
    {
        name: "Portfolio Website",
        description: "My personal portfolio website.",
        language: ["HTML", "CSS", "JS"],
        hasLive: true,
        liveUrl: "https://example.com",
        sourceUrl: "https://github.com/example/portfolio",
    },
    {
        name: "React Todo App",
        description: "A todo application built with React.",
        language: ["JSX"],
        hasLive: true,
        liveUrl: "https://example.com/todo",
        sourceUrl: "https://github.com/example/todo",
    },
    {
        name: "Python CLI",
        description: "A command-line application built with Python.",
        language: ["Python"],
        hasLive: false,
        sourceUrl: "https://github.com/example/python-cli",
    },
    {
        name: "C++ Game",
        description: "A small game built using C++.",
        language: ["C++"],
        hasLive: false,
        sourceUrl: "https://github.com/example/game",
    },
];

function Projects() {
    const [filter, setFilter] = useState("All");

    const filters = [
        "All",
        "HTML / CSS / JS",
        "JSX",
        "Python",
        "C / C++",
    ];

    const filteredProjects = projectList.filter((project) => {
        if (filter === "All") {
            return true;
        }

        if (filter === "HTML / CSS / JS") {
            return project.language.some((language) =>
                ["HTML", "CSS", "JS"].includes(language)
            );
        }

        if (filter === "C / C++") {
            return project.language.some((language) =>
                ["C", "C++"].includes(language)
            );
        }

        return project.language.includes(filter);
    });

    return (
        <div className="flex flex-col gap-6">
            <h1>Projects I've built</h1>

            <p>
                A collection of projects I've worked on.
            </p>

            {/* Filters */}
            <div className="flex gap-1 pb-4 border-b border-gray-300 text-sm">
                {filters.map((item) => (
                    <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`px-3 py-1 rounded ${
                            filter === item
                                ? "bg-black text-white"
                                : "bg-transparent text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* Projects */}
            <div className="flex flex-col gap-6">
                {filteredProjects.map((project) => (
                    <div
                        key={project.name}
                        className="flex gap-6 min-w-full border-b pb-6 border-gray-300"
                    >
                        {/* Image */}
                        <div className="w-50 h-50 shrink-0 border border-gray-400">
                            <span>Image Placeholder</span>
                        </div>

                        {/* Project information */}
                        <div className="flex flex-col gap-3">
                            <h2>{project.name}</h2>

                            <p>{project.description}</p>

                            {/* Languages */}
                            <div className="flex gap-2">
                                {project.language.map((language) => (
                                    <span key={language}>
                                        {language}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex gap-2">
                                {project.hasLive && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Live Code
                                    </a>
                                )}

                                <a
                                    href={project.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Source Code
                                </a>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredProjects.length === 0 && (
                    <p>No projects found.</p>
                )}
            </div>
        </div>
    );
}

export default Projects;
