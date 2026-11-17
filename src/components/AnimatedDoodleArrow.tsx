import { useState } from "react";

export type ArrowStyle = "curved" | "wiggly" | "loop" | "double";

interface Props {
  styleType?: ArrowStyle;
  color?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export default function AnimatedDoodleArrow({
  styleType = "curved",
  color = "#25A4D9",
  size = "md",
  label = "Shop Here!",
  className = "",
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine sizing
  const scale = size === "sm" ? 0.75 : size === "lg" ? 1.25 : 1;
  const width = Math.round(90 * scale);
  const height = Math.round(68 * scale);

  return (
    <div
      className={`inline-flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "scale(1.06)" : "scale(1)",
        transition: "transform 200ms ease",
      }}
    >
      {label && (
        <span
          className="doodle-text-sparkle"
          style={{
            fontFamily: '"Caveat", cursive',
            fontWeight: 700,
            fontSize: size === "sm" ? 13 : 16,
            color: color === "#25A4D9" ? "#1D4860" : color,
            letterSpacing: "0.02em",
            marginBottom: -4,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span>{label}</span>
          <span className="doodle-star">✦</span>
        </span>
      )}

      <div
        className="doodle-arrow-bounce"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          width={width}
          height={height}
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            overflow: "visible",
            filter: "drop-shadow(0 2px 4px rgba(37, 164, 217, 0.25))",
          }}
        >
          {/* Subtle marker texture behind for authentic hand-drawn boldness */}
          <path
            d={getPathData(styleType)}
            stroke={color}
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
          />

          {/* Main bold doodle arrow stem */}
          <path
            d={getPathData(styleType)}
            stroke={color}
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="doodle-stroke-draw"
          />

          {/* Bold hand-drawn doodle arrowhead */}
          {renderArrowHead(styleType, color)}

          {/* Playful doodle accent lines / motion marks */}
          <path
            d="M 24 16 C 21 12 18 10 14 11"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.75"
            className="doodle-accent-spark"
          />
          <path
            d="M 28 22 C 24 22 20 23 16 26"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.75"
            className="doodle-accent-spark"
          />
          <circle cx="82" cy="18" r="2" fill={color} opacity="0.6" />
          <path
            d="M 80 24 L 84 28"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
}

function getPathData(type: ArrowStyle): string {
  switch (type) {
    case "wiggly":
      // Playful S-curve wiggle arrow pointing down
      return "M 48 8 C 58 16 38 28 54 42 C 60 48 56 56 50 64";
    case "loop":
      // A fun loop-de-loop doodle pointing down
      return "M 32 8 C 50 4 64 16 60 28 C 56 38 40 36 44 26 C 48 18 64 36 50 64";
    case "double":
      // Dynamic arc pointing down towards right
      return "M 36 10 C 44 22 56 36 52 64";
    case "curved":
    default:
      // Organic hand-drawn curved arc from top-left curving down to bottom center
      return "M 38 8 C 66 12 68 36 50 64";
  }
}

function renderArrowHead(type: ArrowStyle, color: string) {
  switch (type) {
    case "wiggly":
      return (
        <g className="doodle-arrowhead">
          <path
            d="M 38 54 C 44 58 48 62 50 65 L 62 54"
            stroke={color}
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 49 65 L 43 57"
            stroke={color}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </g>
      );
    case "loop":
      return (
        <g className="doodle-arrowhead">
          <path
            d="M 39 52 C 45 58 49 62 50 65 L 62 55"
            stroke={color}
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );
    case "double":
      return (
        <g className="doodle-arrowhead">
          <path
            d="M 40 52 L 52 65 L 64 53"
            stroke={color}
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 43 45 L 52 56 L 61 46"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
        </g>
      );
    case "curved":
    default:
      return (
        <g className="doodle-arrowhead">
          {/* Main doodle arrowhead with hand-drawn slight asymmetry */}
          <path
            d="M 38 52 C 44 58 48 62 50 65 C 52 62 56 57 63 53"
            stroke={color}
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Sketchy extra stroke for authentic hand doodle feel */}
          <path
            d="M 42 54 L 50 64 L 59 55"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
        </g>
      );
  }
}
