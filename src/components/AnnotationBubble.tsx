import { useMemo } from "react";
import type { AnnotationDef } from "@/lib/annotations";

export interface DynamicCoords {
  toX: number;
  toY: number;
  topPx: number;
  fromY: number;
}

interface Props {
  def: AnnotationDef;
  active: boolean;
  arrowStyle?: "curved" | "loop";
  isScrolling?: boolean;
  dynamicCoords?: DynamicCoords | null;
}

export default function AnnotationBubble({
  def,
  active,
  isScrolling = false,
  dynamicCoords,
}: Props) {
  const isLeft = def.side === "left";

  const toX = dynamicCoords?.toX ?? def.toX;
  const toY = dynamicCoords?.toY ?? def.toY;
  const topPx = dynamicCoords?.topPx ?? def.topPx;
  
  // Position card comfortably in upper/middle screen so it never overflows bottom
  const cardTop = Math.max(15, Math.min(200, topPx - 35));

  // Arrow origin dynamically tracks target Y along the card edge for natural curved sweep
  const fromY = Math.max(cardTop + 45, Math.min(cardTop + 380, toY));
  
  // Arrow origin anchored right at the edge of the card
  const fromX = isLeft ? -25 : 395;

  const { pathData, headData } = useMemo(() => {
    let stem = "";
    let approachX = 0;
    let approachY = 0;

    if (isLeft) {
      // Sweeps from right edge of card, over the titanium bezel, landing on the screen element
      const c1x = fromX + (toX - fromX) * 0.45;
      const c1y = fromY - 24;
      const c2x = toX - (toX - fromX) * 0.35;
      const c2y = toY - 16;

      stem = `M ${fromX} ${fromY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${toX} ${toY}`;
      approachX = c2x;
      approachY = c2y;
    } else {
      // Sweeps from left edge of card, over the right titanium bezel, landing on the screen element
      const c1x = fromX + (toX - fromX) * 0.45;
      const c1y = fromY - 24;
      const c2x = toX - (toX - fromX) * 0.35;
      const c2y = toY - 16;

      stem = `M ${fromX} ${fromY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${toX} ${toY}`;
      approachX = c2x;
      approachY = c2y;
    }

    // Precise arrowhead calculation pointing toward the target on the screen
    const dx = toX - approachX;
    const dy = toY - approachY;
    const angle = Math.atan2(dy, dx);
    const headLen = 16;

    const h1x = toX - headLen * Math.cos(angle - 0.46);
    const h1y = toY - headLen * Math.sin(angle - 0.46);
    const h2x = toX - headLen * Math.cos(angle + 0.46);
    const h2y = toY - headLen * Math.sin(angle + 0.46);

    const head = `M ${h1x} ${h1y} L ${toX} ${toY} L ${h2x} ${h2y}`;

    return { pathData: stem, headData: head };
  }, [fromX, fromY, toX, toY, isLeft]);

  return (
    <div
      className="desktop-doodle-annotation"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 50,
        opacity: active && !isScrolling ? 1 : 0,
        transition: "opacity 180ms ease",
      }}
    >
      {/* Hand-drawn bold doodle arrow reaching onto the phone screen */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
        className="doodle-arrow-float"
      >
        <path
          d={pathData}
          fill="none"
          stroke="#292820"
          strokeWidth={4.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={headData}
          fill="none"
          stroke="#292820"
          strokeWidth={4.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Complete Executive Strategy Card outside the phone */}
      <div
        style={{
          position: "absolute",
          top: cardTop,
          ...(isLeft
            ? { left: -385, width: 355, textAlign: "left" }
            : { left: 400, width: 355, textAlign: "left" }),
          background: "#EFE9DC",
          border: "1.5px solid #D8C7A2",
          borderRadius: 16,
          padding: "15px 17px 14px",
          boxShadow: "0 14px 34px -8px rgba(41,40,32,0.16)",
          pointerEvents: "auto",
          maxHeight: 580,
          overflowY: "auto",
        }}
        className="ig-scroll select-text"
      >
        {/* Header Tag */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 10.5,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              background: "#292820",
              color: "#F7F4EC",
              padding: "3px 9px",
              borderRadius: 20,
            }}
          >
            {def.label}
          </span>
          <span
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 11,
              fontWeight: 600,
              color: "#898274",
            }}
          >
            Proposal Note
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 16,
            fontWeight: 700,
            color: "#292820",
            lineHeight: 1.25,
            marginBottom: 3,
          }}
        >
          {def.title}
        </div>

        {/* Hook / Tagline in Handwriting style */}
        {def.hook && (
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: 21,
              fontWeight: 700,
              color: "#55583E",
              lineHeight: 1.25,
              marginBottom: 10,
              borderBottom: "1px dashed #D8C7A2",
              paddingBottom: 6,
            }}
          >
            "{def.hook}"
          </div>
        )}

        {/* Narrative / Strategy Overview Description */}
        {def.description && (
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 12.5,
              lineHeight: 1.5,
              color: "#4A463E",
              margin: "0 0 12px 0",
              fontWeight: 450,
            }}
          >
            {def.description}
          </p>
        )}

        {/* Full Unreduced Strategic Sections */}
        {def.sections?.map((sec, secIdx) => (
          <div key={secIdx} style={{ marginBottom: 10 }}>
            <div
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 10.5,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                color: "#746E62",
                marginBottom: 5,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span style={{ color: "#929477" }}>▸</span>
              {sec.title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, paddingLeft: 4 }}>
              {sec.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 12,
                    lineHeight: 1.42,
                    color: "#292820",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 6,
                  }}
                >
                  <span style={{ color: "#929477", fontSize: 13, lineHeight: 1.1 }}>•</span>
                  <span>
                    {item.bold && (
                      <strong style={{ fontWeight: 600, color: "#1F1E18" }}>
                        {item.bold}{" "}
                      </strong>
                    )}
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Strategic Objective Card */}
        {def.objective && (
          <div
            style={{
              marginTop: 12,
              background: "#F7F4EC",
              border: "1px solid #D8C7A2",
              borderRadius: 10,
              padding: "9px 12px",
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 14, lineHeight: 1.2 }}>🎯</span>
            <div>
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 9.5,
                  fontWeight: 700,
                  color: "#746E62",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  display: "block",
                  marginBottom: 2,
                }}
              >
                Objective
              </span>
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#1F1E18",
                  lineHeight: 1.38,
                  display: "block",
                }}
              >
                {def.objective}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
