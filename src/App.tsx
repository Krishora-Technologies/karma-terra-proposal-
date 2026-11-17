import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AnnotationId, AnnotationDef } from "@/lib/annotations";
import { BRANDS, MUMMAGODI_BRAND, type BrandId } from "@/lib/brands";
import PhoneMockup from "@/components/PhoneMockup";
import PostPreviewModal, { type PostItem } from "@/components/PostPreviewModal";

const ORDERED_SECTIONS: AnnotationId[] = [
  "name",
  "bio",
  "highlights",
  "grid",
];

function getBrandFromLocation(): BrandId {
  if (typeof window === "undefined") return "mummagodi";
  const path = window.location.pathname.toLowerCase();
  if (path.includes("karmaterra") || path.includes("karma-terra")) {
    return "karmaterra";
  }
  return "mummagodi";
}

export default function App() {
  const [brandId, setBrandId] = useState<BrandId>(getBrandFromLocation);
  const [active, setActive] = useState<AnnotationId | null>("name");
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const arrowStyle = "curved";

  const touchStartX = useRef<number | null>(null);

  // Sync brand with browser URL & history navigation
  useEffect(() => {
    // If opened at root "/", normalize URL to "/mummagodi"
    const currentPath = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, "");
    if (!currentPath) {
      window.history.replaceState(null, "", "/mummagodi");
    }

    const handlePopState = () => {
      setBrandId(getBrandFromLocation());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const switchBrand = useCallback((newBrand: BrandId) => {
    setBrandId(newBrand);
    window.history.pushState(null, "", `/${newBrand}`);
  }, []);

  // Responsive scale and mobile detection
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isNarrow = w < 1024;
      setIsMobile(isNarrow);

      if (isNarrow) {
        // Calculate scale to fit phone width neatly on mobile devices
        const availableW = w - 24;
        const scaleW = availableW / 368;
        const idealScale = Math.min(0.96, Math.max(0.82, scaleW));
        setScale(idealScale);
      } else {
        const availableH = h - 130;
        const scaleH = availableH / 746;
        setScale(Math.min(1, Math.max(0.82, scaleH)));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = useCallback((id: AnnotationId) => {
    setActive(id);
  }, []);

  const handleNext = useCallback(() => {
    setActive((current) => {
      if (!current) return ORDERED_SECTIONS[0];
      const idx = ORDERED_SECTIONS.indexOf(current);
      const next = (idx + 1) % ORDERED_SECTIONS.length;
      return ORDERED_SECTIONS[next];
    });
  }, []);

  const handlePrev = useCallback(() => {
    setActive((current) => {
      if (!current) return ORDERED_SECTIONS[ORDERED_SECTIONS.length - 1];
      const idx = ORDERED_SECTIONS.indexOf(current);
      const prev = (idx - 1 + ORDERED_SECTIONS.length) % ORDERED_SECTIONS.length;
      return ORDERED_SECTIONS[prev];
    });
  }, []);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) > 42) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // PC Scroll without moving the screen: Mouse wheel steps to next/previous arrow
  useEffect(() => {
    let lastWheelTime = 0;
    const cooldownMs = 260;

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;

      // Allow natural scrolling inside modal, phone mockup, or any scrollable container
      if (
        target?.closest?.(".post-preview-modal") ||
        target?.closest?.(".phone-float") ||
        target?.closest?.(".ig-scroll")
      ) {
        return;
      }

      // If user is scrolling an overflowing proposal note card, allow them to read it
      const scrollCard = target?.closest?.(".desktop-doodle-annotation .select-text") as HTMLElement | null;
      if (scrollCard) {
        const canScrollDown = scrollCard.scrollTop + scrollCard.clientHeight < scrollCard.scrollHeight - 2;
        const canScrollUp = scrollCard.scrollTop > 2;
        if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
          return;
        }
      }

      // Prevent default page scroll on desktop so screen never moves
      if (window.innerWidth >= 1024) {
        e.preventDefault();
      }

      if (Math.abs(e.deltaY) < 10) return;

      const now = Date.now();
      if (now - lastWheelTime < cooldownMs) return;
      lastWheelTime = now;

      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrev]);

  const currentBrand = BRANDS[brandId] || MUMMAGODI_BRAND;

  const annotationMap = useMemo(() => {
    return currentBrand.annotations.reduce(
      (acc, def) => {
        acc[def.id] = def;
        return acc;
      },
      {} as Record<AnnotationId, AnnotationDef>
    );
  }, [currentBrand]);

  const activeDef = active ? annotationMap[active] : null;
  const activeIndex = active ? ORDERED_SECTIONS.indexOf(active) : -1;

  const getMobileTranslateY = (section: AnnotationId | null) => {
    switch (section) {
      case "name":
        return 0;
      case "bio":
        return -35;
      case "highlights":
        return -135;
      case "grid":
        return -350;
      default:
        return 0;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        height: isMobile ? "100dvh" : "100vh",
        maxHeight: isMobile ? "100dvh" : "100vh",
        width: "100%",
        background: "#F7F4EC",
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobile ? "flex-start" : "space-between",
        alignItems: "center",
        padding: isMobile ? "6px 12px 6px" : "10px 24px 12px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Top Header Bar */}
      <header
        style={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
          borderBottom: "1px solid #EAE3D2",
          paddingBottom: 8,
          marginBottom: 6,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: isMobile ? 18 : 22,
              fontWeight: 700,
              color: "#292820",
            }}
          >
            Viral Flux Media
          </span>
          <span style={{ color: "#D8C7A2" }}>•</span>
          <span
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#929477",
            }}
          >
            Social Media Proposal
          </span>
        </div>

        {/* Route / Brand Switcher Tabs: /mummagodi and /karmaterra */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#EFE9DC",
            border: "1px solid #D8C7A2",
            borderRadius: 24,
            padding: "3px 4px",
            gap: 4,
          }}
        >
          <button
            type="button"
            onClick={() => switchBrand("mummagodi")}
            style={{
              padding: "5px 13px",
              borderRadius: 20,
              border: "none",
              background: brandId === "mummagodi" ? "#292820" : "transparent",
              color: brandId === "mummagodi" ? "#F7F4EC" : "#746E62",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 160ms ease",
              boxShadow:
                brandId === "mummagodi" ? "0 2px 6px rgba(41,40,32,0.15)" : "none",
            }}
          >
            /mummagodi
          </button>
          <button
            type="button"
            onClick={() => switchBrand("karmaterra")}
            style={{
              padding: "5px 13px",
              borderRadius: 20,
              border: "none",
              background: brandId === "karmaterra" ? "#292820" : "transparent",
              color: brandId === "karmaterra" ? "#F7F4EC" : "#746E62",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 160ms ease",
              boxShadow:
                brandId === "karmaterra" ? "0 2px 6px rgba(41,40,32,0.15)" : "none",
            }}
          >
            /karmaterra
          </button>
        </div>

        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 12.5,
            color: "#898274",
          }}
        >
          Target: <strong style={{ color: "#292820" }}>{currentBrand.proposalTarget}</strong>
        </div>
      </header>

      {/* Main Stage: On Mobile, Info at Top & Phone slides smoothly underneath; On Desktop, Centered with outer doodle arrows */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: isMobile ? "flex-start" : "center",
          alignItems: "center",
          position: "relative",
          width: "100%",
          padding: 0,
          overflow: "hidden",
        }}
      >
        {/* On Mobile View: Strategy Info Card is at the TOP */}
        {isMobile && activeDef && (
          <div
            className="mobile-strategy-card"
            style={{
              width: "100%",
              maxWidth: 366 * scale,
              marginBottom: 8,
              flexShrink: 0,
              maxHeight: "36vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="mobile-strategy-header">
              <span className="mobile-strategy-tag">
                Strategy {activeIndex + 1} of {ORDERED_SECTIONS.length}
              </span>
              <span className="mobile-strategy-title">
                {activeDef.label}
              </span>
            </div>

            {/* Scrollable unreduced strategy bullet content */}
            <div
              className="ig-scroll select-text"
              style={{
                flex: 1,
                overflowY: "auto",
                paddingRight: 4,
              }}
            >
              {/* Title & Hook */}
              <div
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#292820",
                  marginTop: 1,
                }}
              >
                {activeDef.title}
              </div>

              {activeDef.hook && (
                <div
                  style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#55583E",
                    lineHeight: 1.25,
                    margin: "1px 0 4px",
                    borderBottom: "1px dashed #D8C7A2",
                    paddingBottom: 3,
                  }}
                >
                  "{activeDef.hook}"
                </div>
              )}

              {activeDef.description && (
                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 11,
                    lineHeight: 1.4,
                    color: "#4A463E",
                    margin: "3px 0 6px 0",
                  }}
                >
                  {activeDef.description}
                </p>
              )}

              {/* Full Unreduced Strategic Sections with Bullets */}
              {activeDef.sections?.map((sec, sIdx) => (
                <div key={sIdx} style={{ marginTop: 4, marginBottom: 3 }}>
                  <div
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: "#746E62",
                      marginBottom: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span style={{ color: "#929477" }}>▸</span>
                    {sec.title}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingLeft: 2 }}>
                    {sec.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: 11,
                          lineHeight: 1.35,
                          color: "#292820",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 4,
                        }}
                      >
                        <span style={{ color: "#929477", fontSize: 11, lineHeight: 1.1 }}>•</span>
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

              {activeDef.objective && (
                <div
                  style={{
                    marginTop: 6,
                    background: "#F7F4EC",
                    border: "1px solid #D8C7A2",
                    borderRadius: 8,
                    padding: "6px 8px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 12, lineHeight: 1.2 }}>🎯</span>
                  <div>
                    <span
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#746E62",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        display: "block",
                        marginBottom: 1,
                      }}
                    >
                      Objective
                    </span>
                    <span
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 10.5,
                        fontWeight: 600,
                        color: "#1F1E18",
                        lineHeight: 1.3,
                        display: "block",
                      }}
                    >
                      {activeDef.objective}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mobile-strategy-nav" style={{ paddingTop: 6, marginTop: 4 }}>
              <button
                type="button"
                onClick={handlePrev}
                className="mobile-nav-btn"
                aria-label="Previous strategy"
                style={{ padding: "4px 12px", fontSize: 11.5 }}
              >
                ← Prev
              </button>

              <div className="mobile-dots">
                {ORDERED_SECTIONS.map((sec, idx) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setActive(sec)}
                    className={`mobile-dot ${active === sec ? "active" : ""}`}
                    aria-label={`Jump to strategy ${idx + 1}: ${annotationMap[sec]?.label || sec}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="mobile-nav-btn"
                aria-label="Next strategy"
                style={{ padding: "4px 12px", fontSize: 11.5 }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Phone wrapper: On mobile, moves half phone under screen for top items, slides up to reveal post section for grid */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            flex: isMobile ? 1 : "none",
            width: 368 * scale,
            height: isMobile ? "100%" : 746 * scale,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            position: "relative",
            overflow: isMobile ? "hidden" : "visible",
            transition: "width 180ms ease, height 180ms ease",
          }}
        >
          <div
            style={{
              transform: `scale(${scale}) translateY(${
                isMobile ? getMobileTranslateY(active) : 0
              }px)`,
              transformOrigin: "top center",
              transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
              width: 368,
              height: 746,
            }}
          >
            <PhoneMockup
              active={active}
              onSelect={handleSelect}
              activeDef={activeDef}
              arrowStyle={arrowStyle}
              brand={currentBrand}
              selectedPost={selectedPost}
              onSelectPost={setSelectedPost}
              isMobile={isMobile}
            />
          </div>
        </div>
      </main>

      {/* Bottom Control Bar */}
      <footer
        style={{
          width: "100%",
          maxWidth: 980,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isMobile ? 3 : 6,
          borderTop: "1px solid #EAE3D2",
          paddingTop: isMobile ? 4 : 10,
          marginTop: isMobile ? 4 : 0,
          flexShrink: 0,
        }}
      >
        {!isMobile && (
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: 20,
              fontWeight: 700,
              color: "#929477",
              textAlign: "center",
            }}
          >
            Click any element to reveal the outer doodle arrow & strategy:
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? 5 : 7,
          }}
        >
          {currentBrand.annotations.map((a) => {
            const isSelected = active === a.id;
            return (
              <button
                key={a.id}
                onClick={() => handleSelect(a.id)}
                style={{
                  background: isSelected ? "#292820" : "#EFE9DC",
                  color: isSelected ? "#F7F4EC" : "#292820",
                  border: "1.5px solid",
                  borderColor: isSelected ? "#292820" : "#D8C7A2",
                  borderRadius: 24,
                  padding: isMobile ? "4px 10px" : "7px 18px",
                  fontFamily: '"Inter", sans-serif',
                  fontSize: isMobile ? 11 : 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  boxShadow: isSelected
                    ? "0 3px 10px rgba(41,40,32,0.18)"
                    : "0 1px 3px rgba(41,40,32,0.04)",
                }}
              >
                {a.label}
              </button>
            );
          })}
        </div>

        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 11.5,
            color: "#898274",
            marginTop: 2,
          }}
        >
          Target: <strong>{currentBrand.proposalTarget}</strong> • Viral Flux Media
        </div>
      </footer>

      {/* Full Screen Post Preview on Mobile */}
      {isMobile && selectedPost && (
        <PostPreviewModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          brand={currentBrand}
          isFullScreen={true}
        />
      )}
    </div>
  );
}
