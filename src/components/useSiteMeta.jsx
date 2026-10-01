import { useEffect } from "react";
import content from "../content.json";

const { site, navbar } = content;

function buildBadgeFavicon(text, background, textColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="90" fill="${background}"/>
  <text x="100" y="110" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, sans-serif" font-weight="bold" font-size="80"
        fill="${textColor}">${text}</text>
</svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

export default function useSiteMeta() {
  useEffect(() => {
    document.title = site.title;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    if (site.favicon) {
      link.href = site.favicon;
      link.type = site.favicon.endsWith(".svg") ? "image/svg+xml" : "";
    } else {
      link.type = "image/svg+xml";
      link.href = buildBadgeFavicon(
        navbar.circleBadge,
        site.faviconBackground,
        site.faviconTextColor,
      );
    }
  }, []);
}