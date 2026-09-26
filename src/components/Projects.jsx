import { useState } from "react";
import ProjectPreview from "./ProjectPreview";

const projectList = [
  {
    name: "Portfolio Website",
    description: `My personal portfolio website.`,
    language: ["HTML", "CSS", "JS", "JSX"],
    hasLive: true,
    liveUrl: "https://example.com",
    sourceUrl: "https://github.com/example/portfolio",
    images: [],
  },
  {
    name: "Bitmap Image Viewer",
    description: `A simple BMP image viewer written in C using SDL2.
                  This project focuses on parsing and rendering BMP 
                  files with support for multiple formats and compression types.`,
    language: ["C"],
    hasLive: true,
    liveUrl: "",
    sourceUrl:
      "https://github.com/DanielManaloto/my_projects/tree/main/bmp_viewer",
    images: [],
  },
  {
    name: "LC-3 Virtual Machine (Python)",
    description: `A simple LC-3 (Little Computer 3) virtual machine implemented in Python.
                  This project emulates the LC-3 architecture, including registers, memory, 
                  instruction set, and trap routines.`,
    language: ["Python"],
    hasLive: false,
    sourceUrl:
      "https://github.com/DanielManaloto/my_projects/tree/main/python_lc3",
    images: [],
  },
  {
    name: "PH Acquired Properties Scraper",
    description: `Scrapes publicly listed acquired/foreclosed real estate from four Philippine government and bank sources, combines them into one normalized dataset, and optionally loads everything into MySQL.`,
    language: ["Python"],
    hasLive: false,
    sourceUrl: "https://github.com/DanielManaloto/my_projects/tree/main/ph-acquired-properties-scraper",
    images: [],
  },
  {
    name: "TLS Analyzer",
    description: `A from-scratch, live TLS handshake inspector — built to learn packet capture, protocol parsing, and systems programming from the wire up.`,
    language: ["C", "C++"],
    hasLive: false,
    sourceUrl: "https://github.com/DanielManaloto/TLS-Analyzer",
    images: [
              "/TLS-Analyzer/TLS_ANALYZER_LOGO.png",
              "/TLS-Analyzer/Capture1.PNG",
              "/TLS-Analyzer/Capture2.PNG",
              "/TLS-Analyzer/Capture3.PNG",
              "/TLS-Analyzer/Capture4.PNG",
              "/TLS-Analyzer/Capture5.PNG",
              "/TLS-Analyzer/Capture6.PNG",
              "/TLS-Analyzer/architecture-diagram.svg "
    ],
  },
  {
    name: "WinEventHook",
    description: `A lightweight Windows console application written in C using the Win32 API.
    WinEventHook records and replays keyboard and mouse input using low-level Windows hooks and SendInput().`,
    language: ["C"],
    hasLive: false,
    sourceUrl: "https://github.com/DanielManaloto/WinEventHook",
    images: [],
  },
  {
    name: "Todo App",
    description: `A responsive todo app built with React and Tailwind CSS. 
    Supports adding, completing, deleting, and filtering todos, a persistent light/dark theme, 
    and drag-and-drop reordering using the native HTML5 Drag and Drop API.`,
    language: ["HTML", "CSS", "JS", "JSX"],
    hasLive: true,
    liveUrl: "https://your-todo-app-url.com",
    sourceUrl: "https://github.com/DanielManaloto/frontend-mentor-challenge-solutions/tree/main/todo-app-main",
    images: [
      "/Todo-App/desktop-design-light.png",
      "/Todo-App/desktop-design-dark.png",
      "/Todo-App/mobile-design-light.png",
      "/Todo-App/mobile-design-dark.png",
    ],
  },
  {
    name: "Weather App",
    description: `A weather app built with vanilla JavaScript and the Open-Meteo API.
    Features city search with debounced autocomplete, current conditions, hourly and 7-day forecasts, 
    and switchable metric/imperial units, all in a responsive layout.`,
    language: ["HTML", "CSS", "JS"],
    hasLive: true,
    liveUrl: "https://your-weather-app-url.com",
    sourceUrl: "https://github.com/DanielManaloto/frontend-mentor-challenge-solutions/tree/main/weather-app-main",
    images: [
      "/Weather-App/desktop-design-metric.png",
      "/Weather-App/desktop-design-imperial.png",
      "/Weather-App/mobile-design.png",
      "/Weather-App/no-result-state.png",
      "/Weather-App/loading-state.png",
      "/Weather-App/dropdown-state.png",
    ],
  },
  {
    name: "Order Summary Card",
    description: `A small order summary card built as a Flexbox layout exercise. 
    Uses Flexbox for centering and stacking the card contents, with hover states on the interactive elements.`,
    language: ["HTML", "CSS"],
    hasLive: true,
    liveUrl: "https://your-order-summary-url.com",
    sourceUrl: "https://github.com/DanielManaloto/frontend-mentor-challenge-solutions/tree/main/order-summary-component-main",
    images: [],
  },
  {
    name: "Interactive Rating Component",
    description: `An interactive rating card with a "Thank you" state after submitting. 
    Uses visually restyled radio buttons for single-select ratings and JavaScript to switch between states.`,
    language: ["HTML", "CSS", "JS"],
    hasLive: true,
    liveUrl: "https://your-rating-component-url.com",
    sourceUrl: "https://github.com/DanielManaloto/frontend-mentor-challenge-solutions/tree/main/interactive-rating-component-main",
    images: [
      "/Interactive-Rating/desktop-design.png",
      "/Interactive-Rating/desktop-thankyou-state.png",
      "/Interactive-Rating/active-state.png",
      "/Interactive-Rating/mobile-design.png",
      "/Interactive-Rating/mobile-thankyou-state.png",
    ],
  },
  {
    name: "Bento Grid",
    description: `A responsive bento grid layout built with CSS Grid.
    Uses named grid areas and media queries to rearrange the boxes across mobile, tablet, and desktop screens.`,
    language: ["HTML", "CSS"],
    hasLive: true,
    liveUrl: "https://your-bento-grid-url.com",
    sourceUrl: "https://github.com/DanielManaloto/frontend-mentor-challenge-solutions/tree/main/bento-grid-main",
    images: ["/Bento-Grid/desktop-design.png", "/Bento-Grid/mobile-design.png"],
  },
  {
    name: "Age Calculator App",
    description: `An age calculator that takes a birth date and shows the age in years, months, and days.
    Includes form validation for empty, out-of-range, invalid, and future dates, with a responsive layout.`,
    language: ["HTML", "CSS", "JS"],
    hasLive: true,
    liveUrl: "https://your-age-calculator-url.com",
    sourceUrl: "https://github.com/DanielManaloto/frontend-mentor-challenge-solutions/tree/main/age-calculator-app-main",
    images: ["/Age-Calculator/preview.jpg"],
  },
];



function Projects() {
  const [filter, setFilter] = useState("All");
  const [previewProject, setPreviewProject] = useState(null);

  const filters = ["All", "HTML / CSS / JS", "JSX", "Python", "C / C++"];

  const filteredProjects = projectList.filter((project) => {
    if (filter === "All") {
      return true;
    }

    if (filter === "HTML / CSS / JS") {
      return project.language.some((language) =>
        ["HTML", "CSS", "JS"].includes(language),
      );
    }

    if (filter === "C / C++") {
      return project.language.some((language) =>
        ["C", "C++"].includes(language),
      );
    }

    return project.language.includes(filter);
  });

  return (
    <div className="flex flex-col gap-6">
      <h1>Projects I've built</h1>

      <p>A collection of projects I've worked on.</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-1 pb-4 border-b border-gray-300 text-sm">
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
      <div className="grid gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.name}
            className="grid sm:grid-cols-[200px_1fr] gap-6 border-b border-gray-300 pb-6"
          >
            {/* Image / preview trigger */}
            <button
              onClick={() => setPreviewProject(project)}
              className="group relative h-50 w-full overflow-hidden self-center border border-gray-400 text-left"
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
                <span className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                  Image Placeholder
                </span>
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-sm text-white opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                Preview
              </span>
            </button>

            {/* Project information */}
            <div className="grid gap-3">
              <h2>{project.name}</h2> <p>{project.description}</p>
              {/* Languages */}
              <div className="flex gap-2">
                {project.language.map((language) => (
                  <span key={language}> {language} </span>
                ))}
              </div>
              {/* Preview trigger */}
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewProject(project)}
                  className="hover:underline"
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