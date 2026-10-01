import { useId } from "react";

/**
 * CircleBadge
 * A circular badge with text "cut out" of it, so the text appears
 * transparent and shows whatever is behind the SVG.
 *
 * Props:
 * - text:        the text to display (default "DM")
 * - size:        rendered width/height in px (default 120)
 * - circleColor: fill color of the circle (default "#000000")
 * - fontSize:    font size relative to the internal 200x200 grid (default 70)
 * - fontFamily:  font family for the text (default "Arial, sans-serif")
 * - fontWeight:  font weight for the text (default "bold")
 */
export default function CircleBadge({
  text = "DM",
  size = 120,
  circleColor = "#000000",
  fontSize = 70,
  fontFamily = "Arial, sans-serif",
  fontWeight = "bold",
  className = "",
}) {
  const maskId = useId();

  const resolvedColor = circleColor.startsWith("var(")
  ? circleColor
  : `var(--${circleColor})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask id={maskId}>
        <rect width="200" height="200" fill="white" />
        <text
        //text coordinates
          x="100"
          y="110"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          fill="black"
        >
          {text}
        </text>
      </mask>
      <circle cx="100" cy="100" r="90" fill={resolvedColor} mask={`url(#${maskId})`} />
    </svg>
  );
}