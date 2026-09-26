import { useEffect, useState } from "react";

function ProjectPreview({ project, onClose }) {
  const [lightboxImage, setLightboxImage] = useState(null);
 
  // Close on Escape — dismiss the enlarged image first if one is open,
  // otherwise close the whole preview.
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== "Escape") return;
      if (lightboxImage) {
        setLightboxImage(null);
      } else {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, lightboxImage]);
 
  // Reset any enlarged image whenever a different project is opened/closed
  useEffect(() => {
    setLightboxImage(null);
  }, [project]);
 
  if (!project) return null;
 
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="grid w-full max-w-2xl gap-4 max-h-[85vh] overflow-y-auto rounded border border-gray-300 bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">{project.name}</h2>
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="text-xl leading-none text-gray-500 hover:text-black"
          >
            &times;
          </button>
        </div>
 
        <p className="whitespace-pre-line text-gray-700">
          {project.description}
        </p>
 
        <div className="flex flex-wrap gap-2 text-sm">
          {project.language.map((language) => (
            <span key={language} className="rounded bg-gray-100 px-2 py-1">
              {language}
            </span>
          ))}
        </div>
 
        {project.images.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {project.images.map((src) => (
              <img
                key={src}
                src={src}
                alt={`${project.name} screenshot`}
                className="w-full cursor-zoom-in rounded border border-gray-300 object-cover transition hover:opacity-90"
                onClick={() => setLightboxImage(src)}
                onError={(e) => {
                  e.currentTarget.remove();
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No screenshots added yet.</p>
        )}
 
        <div className="flex gap-2 border-t border-gray-200 pt-4">
          {project.hasLive && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-black px-3 py-1 text-sm text-white hover:opacity-90"
            >
              Live Site
            </a>
          )}
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-gray-400 px-3 py-1 text-sm hover:bg-gray-100"
          >
            Source Code
          </a>
        </div>
      </div>
 
      {lightboxImage && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxImage(null);
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImage(null);
            }}
            aria-label="Close enlarged image"
            className="absolute top-4 right-4 text-3xl leading-none text-white hover:opacity-75"
          >
            &times;
          </button>
          <img
            src={lightboxImage}
            alt={`${project.name} screenshot enlarged`}
            className="max-h-full max-w-full rounded object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default ProjectPreview;