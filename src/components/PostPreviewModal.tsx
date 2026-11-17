import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { BrandData } from "@/lib/brands";

export interface PostSlide {
  title: string;
  tagline: string;
  highlight: string;
  badge?: string;
  icon: string;
  imageUrl?: string;
}

export interface PostItem {
  id: string;
  label: string;
  category: string;
  color: string;
  isCarousel?: boolean;
  isPinned?: boolean;
  thumbnailUrl?: string;
  aspectRatio?: "1/1" | "4/5";
  slides: PostSlide[];
  likes: number;
  commentsCount: number;
  caption: string;
  timeAgo: string;
  whyThisPost?: string | string[];
  strategyDetails?: {
    objective?: string;
    creativeMessage?: string;
    benefits?: string[];
    slidesInfo?: { title: string; desc: string }[];
    approachTitle?: string;
    approachDescription?: string;
    approachItems?: { bold?: string; text: string }[];
    approachClosing?: string;
  };
}

interface Props {
  post: PostItem;
  onClose: () => void;
  brand?: BrandData;
  isFullScreen?: boolean;
}

export default function PostPreviewModal({ post, onClose, brand, isFullScreen = false }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showFullImage) {
          setShowFullImage(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showFullImage, onClose]);

  useEffect(() => {
    if (showFullImage) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [showFullImage]);

  const totalSlides = post.slides.length;
  const slide = post.slides[currentSlide] || post.slides[0];

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div
      style={{
        position: isFullScreen ? "fixed" : "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        maxWidth: isFullScreen ? 480 : "100%",
        margin: isFullScreen ? "0 auto" : 0,
        background: "#F7F4EC",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        fontFamily: '"Inter", sans-serif',
        color: "#292820",
        boxShadow: isFullScreen ? "0 0 50px rgba(41,40,32,0.3)" : "none",
        animation: "entranceFadeUp 220ms ease-out forwards",
      }}
      className="post-preview-modal ig-scroll select-none"
    >
      {/* Top Header Bar - sticky across scroll */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px 8px",
          borderBottom: "1px solid #EAE3D2",
          background: "#F7F4EC",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 8px rgba(41,40,32,0.05)",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Back to profile"
          style={{
            background: "rgba(41,40,32,0.06)",
            border: "none",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            padding: "5px 10px 5px 6px",
            color: "#292820",
            fontSize: 12.5,
            fontWeight: 600,
            transition: "background 150ms ease",
          }}
        >
          <BackChevronIcon />
          <span>Profile</span>
        </button>

        <span
          style={{
            fontWeight: 700,
            fontSize: 13.5,
            letterSpacing: "0.02em",
            color: "#292820",
          }}
        >
          Post Preview
        </span>

        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            background: "rgba(41,40,32,0.06)",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#292820",
            transition: "background 150ms ease",
          }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Creative Media Carousel / Card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: post.aspectRatio || (brand?.slug === "karmaterra" ? "1/1" : "4/5"),
          background: slide.imageUrl ? "#F7F4EC" : post.color,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {slide.imageUrl ? (
          <>
            <img
              key={currentSlide}
              src={slide.imageUrl}
              alt={slide.title || "Slide"}
              onClick={() => setShowFullImage(true)}
              title="Click to view full image in real size"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                animation: "entranceFadeUp 200ms ease-out forwards",
                cursor: "zoom-in",
              }}
            />
            {/* Click to expand hint badge */}
            <div
              onClick={() => setShowFullImage(true)}
              style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                background: "rgba(41, 40, 32, 0.72)",
                backdropFilter: "blur(4px)",
                color: "#F7F4EC",
                borderRadius: 12,
                padding: "3px 8px",
                fontSize: 10,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
                cursor: "zoom-in",
                zIndex: 3,
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              <span>🔍</span> Full Size
            </div>
          </>
        ) : (
          <div
            style={{
              padding: "20px 18px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box",
              position: "relative",
            }}
          >
            {/* Subtle decorative circles */}
            <div
              style={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 140,
                height: 140,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.03)",
                pointerEvents: "none",
              }}
            />

            <div style={{ height: 24 }} />

            {/* Center slide artwork & messaging */}
            <div
              key={currentSlide}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                zIndex: 2,
                padding: "0 10px",
                animation: "entranceFadeUp 200ms ease-out forwards",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#F7F4EC",
                  border: "2px solid rgba(216, 199, 162, 0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  marginBottom: 12,
                  boxShadow: "0 4px 12px rgba(41,40,32,0.08)",
                }}
              >
                {slide.icon}
              </div>

              <h3
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 20,
                  fontWeight: 700,
                  lineHeight: 1.25,
                  color: "#292820",
                  margin: "0 0 8px",
                }}
              >
                {slide.title}
              </h3>

              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 12.5,
                  lineHeight: 1.45,
                  color: "#5A564C",
                  margin: 0,
                  maxWidth: 240,
                }}
              >
                {slide.tagline}
              </p>
            </div>

            {/* Bottom pill in slide */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  background: "#292820",
                  color: "#F7F4EC",
                  padding: "5px 14px",
                  borderRadius: 20,
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  boxShadow: "0 2px 6px rgba(41,40,32,0.15)",
                }}
              >
                ✓ {slide.highlight}
              </span>
            </div>
          </div>
        )}

        {/* Top bar inside creative */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            right: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 4,
            pointerEvents: "none",
          }}
        >
          {!slide.imageUrl && (
            <span
              style={{
                background: "rgba(247, 244, 236, 0.88)",
                backdropFilter: "blur(4px)",
                padding: "4px 10px",
                borderRadius: 14,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#292820",
                textTransform: "uppercase",
                boxShadow: "0 1px 3px rgba(41,40,32,0.12)",
              }}
            >
              {slide.badge || post.category}
            </span>
          )}

          {/* Slide counter indicator removed as requested */}
        </div>

        {/* Carousel Chevrons */}
        {post.isCarousel && totalSlides > 1 && (
          <>
            {currentSlide > 0 && (
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(247, 244, 236, 0.9)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(41,40,32,0.16)",
                  zIndex: 5,
                }}
              >
                <ChevronLeftIcon />
              </button>
            )}

            {currentSlide < totalSlides - 1 && (
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(247, 244, 236, 0.9)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(41,40,32,0.16)",
                  zIndex: 5,
                }}
              >
                <ChevronRightIcon />
              </button>
            )}
          </>
        )}
      </div>

      {/* Slide Pagination Dots (if carousel) */}
      {post.isCarousel && totalSlides > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            padding: "8px 0 2px",
            flexShrink: 0,
          }}
        >
          {post.slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: currentSlide === idx ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background: currentSlide === idx ? "#292820" : "#D8C7A2",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 180ms ease",
              }}
            />
          ))}
        </div>
      )}

      {/* Strategy / Info Section: Why This Post? */}
      <div style={{ padding: "14px 14px 44px" }}>
        <div
          style={{
            background: "#EFECE4",
            borderRadius: 14,
            padding: "16px",
            border: "1px solid #E2DCD0",
          }}
        >
          {/* Card Title & Objective Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>💡</span>
              <h4
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#292820",
                  margin: 0,
                }}
              >
                Why This Post?
              </h4>
            </div>
            {post.strategyDetails?.objective && (
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  background: "#292820",
                  color: "#F7F4EC",
                  padding: "3px 10px",
                  borderRadius: 12,
                  letterSpacing: "0.02em",
                }}
              >
                🎯 {post.strategyDetails.objective}
              </span>
            )}
          </div>

          {/* Creative Message Quote */}
          {post.strategyDetails?.creativeMessage && (
            <div
              style={{
                fontFamily: '"Caveat", cursive',
                fontSize: 17,
                fontWeight: 700,
                color: "#55583E",
                lineHeight: 1.3,
                marginBottom: 10,
                paddingBottom: 6,
                borderBottom: "1px dashed #D8C7A2",
              }}
            >
              "{post.strategyDetails.creativeMessage}"
            </div>
          )}

          <div
            style={{
              fontSize: 12.5,
              lineHeight: 1.55,
              color: "#4A463D",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {post.whyThisPost && (
              <div>
                {Array.isArray(post.whyThisPost) ? (
                  post.whyThisPost.map((item, idx) => (
                    <p key={idx} style={{ margin: "0 0 4px" }}>
                      • {item}
                    </p>
                  ))
                ) : (
                  <p style={{ margin: 0, color: "#292820", fontWeight: 500 }}>
                    {post.whyThisPost}
                  </p>
                )}
              </div>
            )}

            {/* Slides Breakdown Info if available */}
            {post.strategyDetails?.slidesInfo && post.strategyDetails.slidesInfo.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {post.strategyDetails.slidesInfo.map((sInfo, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      background: "#F7F4EC",
                      borderRadius: 10,
                      padding: "8px 12px",
                      border: "1px solid #E5DFD3",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#1F1E18",
                        marginBottom: 3,
                      }}
                    >
                      {sInfo.title}
                    </div>
                    <div
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 11.5,
                        lineHeight: 1.45,
                        color: "#4A463D",
                      }}
                    >
                      {sInfo.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Overall Profile Building / Approach Section */}
            {post.strategyDetails?.approachTitle && (
              <div
                style={{
                  background: "#F7F4EC",
                  borderRadius: 10,
                  padding: "10px 12px",
                  border: "1px solid #E5DFD3",
                }}
              >
                <div
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#746E62",
                    marginBottom: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span>📋</span> {post.strategyDetails.approachTitle}
                </div>
                {post.strategyDetails.approachDescription && (
                  <p style={{ fontSize: 11.5, lineHeight: 1.45, color: "#4A463D", margin: "0 0 6px" }}>
                    {post.strategyDetails.approachDescription}
                  </p>
                )}
                {post.strategyDetails.approachItems && post.strategyDetails.approachItems.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {post.strategyDetails.approachItems.map((app, aIdx) => (
                      <div
                        key={aIdx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 6,
                          fontSize: 11.5,
                          lineHeight: 1.4,
                          color: "#292820",
                        }}
                      >
                        <span style={{ color: "#929477", fontSize: 12, lineHeight: 1 }}>•</span>
                        <span>
                          {app.bold && (
                            <strong style={{ fontWeight: 600, color: "#1F1E18" }}>
                              {app.bold}{" "}
                            </strong>
                          )}
                          {app.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {post.strategyDetails.approachClosing && (
                  <p style={{ fontSize: 11.5, lineHeight: 1.45, color: "#4A463D", margin: "8px 0 0" }}>
                    {post.strategyDetails.approachClosing}
                  </p>
                )}
              </div>
            )}

            {/* Benefits for Customers */}
            {post.strategyDetails?.benefits && post.strategyDetails.benefits.length > 0 && (
              <div
                style={{
                  background: "#F7F4EC",
                  borderRadius: 10,
                  padding: "10px 12px",
                  border: "1px solid #E5DFD3",
                }}
              >
                <div
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 10.5,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#746E62",
                    marginBottom: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span>✨</span> Benefits for Customers:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {post.strategyDetails.benefits.map((b, bIdx) => (
                    <div
                      key={bIdx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 6,
                        fontSize: 11.5,
                        lineHeight: 1.4,
                        color: "#292820",
                      }}
                    >
                      <span style={{ color: "#929477", fontSize: 12, lineHeight: 1 }}>✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Real-Size Image Lightbox Overlay (Direct Portal into body: Zero Scroll, Pure Image) */}
      {showFullImage && slide.imageUrl && typeof document !== "undefined" &&
        createPortal(
          <div
            onClick={() => setShowFullImage(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(12, 11, 9, 0.95)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              zIndex: 999999999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              boxSizing: "border-box",
              overflow: "hidden",
              cursor: "zoom-out",
              userSelect: "none",
            }}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFullImage(false);
              }}
              aria-label="Close full size view"
              style={{
                position: "fixed",
                top: 24,
                right: 24,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.16)",
                border: "1px solid rgba(255, 255, 255, 0.28)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 1000000000,
                transition: "background 150ms ease",
              }}
            >
              <CloseIcon />
            </button>

            {/* Carousel navigation chevrons in lightbox */}
            {post.isCarousel && totalSlides > 1 && (
              <>
                {currentSlide > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    aria-label="Previous slide"
                    style={{
                      position: "fixed",
                      left: 24,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      zIndex: 1000000000,
                    }}
                  >
                    <ChevronLeftIcon />
                  </button>
                )}
                {currentSlide < totalSlides - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    aria-label="Next slide"
                    style={{
                      position: "fixed",
                      right: 24,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      zIndex: 1000000000,
                    }}
                  >
                    <ChevronRightIcon />
                  </button>
                )}
              </>
            )}

            {/* Pure Real-Size Image (Strictly contained within viewport with 0 scroll) */}
            <img
              src={slide.imageUrl}
              alt={slide.title || "Full image"}
              onClick={(e) => {
                e.stopPropagation();
                setShowFullImage(false);
              }}
              style={{
                maxWidth: "min(92vw, 920px)",
                maxHeight: "90vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                borderRadius: 8,
                boxShadow: "0 28px 72px rgba(0,0,0,0.75)",
                cursor: "zoom-out",
                userSelect: "none",
                display: "block",
              }}
            />
          </div>,
          document.body
        )}
    </div>
  );
}

function BackChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#292820" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#292820" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
