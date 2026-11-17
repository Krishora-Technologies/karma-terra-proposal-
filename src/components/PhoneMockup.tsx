import { useCallback, useEffect, useRef, useState } from "react";
import type { AnnotationId, AnnotationDef } from "@/lib/annotations";
import type { BrandData } from "@/lib/brands";
import PostPreviewModal, { type PostItem } from "./PostPreviewModal";
import InstagramProfile from "./InstagramProfile";
import AnnotationBubble, { type DynamicCoords } from "./AnnotationBubble";

interface Props {
  active: AnnotationId | null;
  onSelect: (id: AnnotationId) => void;
  activeDef: AnnotationDef | null;
  arrowStyle?: "curved" | "loop";
  brand?: BrandData;
  selectedPost?: PostItem | null;
  onSelectPost?: (post: PostItem | null) => void;
  isMobile?: boolean;
}

export default function PhoneMockup({
  active,
  onSelect,
  activeDef,
  arrowStyle = "curved",
  brand,
  selectedPost,
  onSelectPost,
  isMobile = false,
}: Props) {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [dynamicCoords, setDynamicCoords] = useState<DynamicCoords | null>(null);

  const updateDynamicCoords = useCallback(() => {
    if (!activeDef || !phoneRef.current) {
      setDynamicCoords(null);
      return;
    }

    const phoneEl = phoneRef.current;
    const targetEl = phoneEl.querySelector(
      `#section-${activeDef.id}`
    ) as HTMLElement | null;

    if (!targetEl) {
      setDynamicCoords({
        toX: activeDef.toX,
        toY: activeDef.toY,
        topPx: activeDef.topPx,
        fromY: activeDef.fromY,
      });
      return;
    }

    const phoneRect = phoneEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    // Account for phone CSS scale factor (e.g. 0.85 - 1.0) to map to unscaled 368x736 space
    const scaleFactor = (phoneRect.width / 368) || 1;

    // Vertical position relative to phone
    let relY = Math.round(
      (targetRect.top - phoneRect.top) / scaleFactor +
        Math.min((targetRect.height / scaleFactor) * 0.45, 36)
    );
    if (activeDef.id === "name") {
      const nameTitleEl = targetEl.querySelector(".brand-name-title") as HTMLElement | null;
      if (nameTitleEl) {
        const titleRect = nameTitleEl.getBoundingClientRect();
        relY = Math.round(
          (titleRect.top - phoneRect.top) / scaleFactor +
            (titleRect.height / scaleFactor) * 0.5
        );
      }
    }
    const clampedToY = Math.max(70, Math.min(850, relY));
    const topPx = Math.max(30, Math.min(810, clampedToY - 32));
    const fromY = topPx + 26;

    // Horizontal landing position
    let toX = activeDef.toX;
    if (activeDef.id === "name") {
      // Pinpoint precision right at the end of the brand name text
      const nameTitleEl = targetEl.querySelector(".brand-name-title") as HTMLElement | null;
      const titleRect = nameTitleEl ? nameTitleEl.getBoundingClientRect() : targetRect;
      toX = Math.round((titleRect.right - phoneRect.left) / scaleFactor + 10);
    } else if (activeDef.side === "left") {
      toX = Math.round(Math.max(28, (targetRect.left - phoneRect.left) / scaleFactor + 16));
    } else {
      toX = Math.round(Math.min(338, (targetRect.right - phoneRect.left) / scaleFactor - 24));
    }

    setDynamicCoords({ toX, toY: clampedToY, topPx, fromY });
  }, [activeDef]);

  useEffect(() => {
    updateDynamicCoords();
    if (!activeDef || !phoneRef.current) return;
    const phoneEl = phoneRef.current;
    const targetEl = phoneEl.querySelector(
      `#section-${activeDef.id}`
    ) as HTMLElement | null;
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      const timer = setTimeout(updateDynamicCoords, 120);
      const timer2 = setTimeout(updateDynamicCoords, 320);
      const timer3 = setTimeout(updateDynamicCoords, 500);
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [active, activeDef, updateDynamicCoords]);

  useEffect(() => {
    const handleScrollOrResize = () => {
      updateDynamicCoords();
    };

    window.addEventListener("resize", handleScrollOrResize);
    const phoneEl = phoneRef.current;
    phoneEl?.addEventListener("scroll", handleScrollOrResize, true);

    const scrollEl = phoneEl?.querySelector(".ig-scroll") as HTMLElement | null;
    scrollEl?.addEventListener("scroll", handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleScrollOrResize);
      phoneEl?.removeEventListener("scroll", handleScrollOrResize, true);
      scrollEl?.removeEventListener("scroll", handleScrollOrResize);
    };
  }, [updateDynamicCoords]);

  return (
    <div
      ref={phoneRef}
      className="phone-float"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        flexShrink: 0,
      }}
    >
      {/* Side physical buttons */}
      <div
        style={{
          position: "absolute",
          left: -3,
          top: 135,
          width: 3.5,
          height: 38,
          background: "#3a3a32",
          borderRadius: "2px 0 0 2px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -3,
          top: 188,
          width: 3.5,
          height: 62,
          background: "#3a3a32",
          borderRadius: "2px 0 0 2px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -3,
          top: 260,
          width: 3.5,
          height: 62,
          background: "#3a3a32",
          borderRadius: "2px 0 0 2px",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -3,
          top: 220,
          width: 3.5,
          height: 86,
          background: "#3a3a32",
          borderRadius: "0 2px 2px 0",
        }}
      />

      {/* Outer titanium frame */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#2a2a22",
          borderRadius: 52,
          padding: 11,
          boxShadow:
            "0 36px 72px -18px rgba(41,40,32,0.36), 0 16px 32px -12px rgba(41,40,32,0.22), inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Inner bezel */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: "#F7F4EC",
            borderRadius: 42,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 104,
              height: 28,
              background: "#1a1a16",
              borderRadius: 16,
              zIndex: 30,
            }}
          />

          {/* Status bar */}
          <div
            style={{
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 26px",
              fontSize: 13.5,
              fontWeight: 600,
              color: "#292820",
              zIndex: 25,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <span style={{ fontFamily: '"Inter", sans-serif' }}>9:41</span>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <SignalIcon />
              <WifiIcon />
              <BatteryIcon />
            </span>
          </div>

          {/* Instagram Profile View */}
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <InstagramProfile
              active={active}
              onSelect={onSelect}
              brand={brand}
              selectedPost={selectedPost}
              onSelectPost={onSelectPost}
              isMobile={isMobile}
            />

            {/* Post Preview Modal cleanly covering screen above home bar on desktop */}
            {!isMobile && selectedPost && (
              <PostPreviewModal
                post={selectedPost}
                onClose={() => onSelectPost?.(null)}
                brand={brand}
              />
            )}
          </div>

          {/* Home indicator bar */}
          <div
            style={{
              height: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F7F4EC",
            }}
          >
            <div
              style={{
                width: 120,
                height: 4,
                background: "#292820",
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      </div>

      {/* Doodle Bubble & Arrow outside the screen - stops showing when a post is opened */}
      {activeDef && !selectedPost && (
        <AnnotationBubble
          def={activeDef}
          active={true}
          arrowStyle={arrowStyle}
          dynamicCoords={dynamicCoords}
        />
      )}
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 17 11" fill="#292820">
      <rect x="0" y="7.5" width="2.5" height="3.5" rx="0.6" />
      <rect x="4.5" y="5" width="2.5" height="6" rx="0.6" />
      <rect x="9" y="2.5" width="2.5" height="8.5" rx="0.6" />
      <rect x="13.5" y="0" width="2.5" height="11" rx="0.6" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="#292820" strokeWidth="1.6" strokeLinecap="round">
      <path d="M1 3.5C5.2 -0.2 10.8 -0.2 15 3.5" />
      <path d="M3.5 6.5C6.5 3.8 9.5 3.8 12.5 6.5" />
      <path d="M6.5 9.5C7.3 8.7 8.7 8.7 9.5 9.5" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <div
      style={{
        width: 24,
        height: 12,
        borderRadius: 4,
        border: "1.2px solid #292820",
        padding: 1.2,
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#292820",
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -3.5,
          width: 1.5,
          height: 4.5,
          background: "#292820",
          borderRadius: "0 1px 1px 0",
        }}
      />
    </div>
  );
}
