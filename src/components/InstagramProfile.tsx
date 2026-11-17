import React, { useEffect, useRef, useState } from "react";
import type { AnnotationId } from "@/lib/annotations";
import PostPreviewModal, { type PostItem } from "./PostPreviewModal";
import { MUMMAGODI_BRAND, type BrandData } from "@/lib/brands";

export const POST_TILES: PostItem[] = [
  {
    id: "1",
    label: "01",
    category: "NEWBORN CARE",
    color: "#E6D6B9",
    isCarousel: true,
    slides: [
      {
        badge: "CAROUSEL • 1/3",
        icon: "👶",
        title: "Cloud-Soft Hug For Newborns",
        tagline: "Ultra-gentle feather touch designed for fragile newborn skin from day one.",
        highlight: "100% Breathable Feather-Layer",
      },
      {
        badge: "CAROUSEL • 2/3",
        icon: "🌿",
        title: "0% Fragrance, Zero Rash",
        tagline: "Dermatologist-tested cotton softness with no harsh chemical bleaching.",
        highlight: "Dermatologically Approved",
      },
      {
        badge: "CAROUSEL • 3/3",
        icon: "🛡️",
        title: "360° Snug Belly Elastic",
        tagline: "Soft waistband prevents back leaks day & night without red belly marks.",
        highlight: "Snug Belly-Fit Technology",
      },
    ],
    likes: 1842,
    commentsCount: 38,
    caption:
      "Bringing home your little one? 👶 Mummagodi Newborn Care diapers are crafted with ultra-gentle micro-pores that keep baby rash-free and calm through every cuddle. Swipe to explore the 3 layers of newborn protection 👉",
    timeAgo: "2 DAYS AGO",
  },
  {
    id: "2",
    label: "02",
    category: "CLOUD SOFT",
    color: "#D8C7A2",
    isCarousel: false,
    slides: [
      {
        badge: "CARE ESSENTIALS",
        icon: "☁️",
        title: "Soft as a Mother's Hug",
        tagline: "Diaper changes should feel like warmth and pure comfort, not a chore.",
        highlight: "Ultra-Fluffy Air Cushions",
      },
    ],
    likes: 1420,
    commentsCount: 29,
    caption:
      "Why do mothers call it cloud-soft? ☁️ Because Mummagodi diapers cushion every tumble, crawl, and nap with pillow-like softness. Zero crunch, pure comfort.",
    timeAgo: "4 DAYS AGO",
  },
  {
    id: "3",
    label: "03",
    category: "PURE WATER",
    color: "#C9B68A",
    isCarousel: true,
    slides: [
      {
        badge: "CAROUSEL • 1/2",
        icon: "💧",
        title: "99% Pure Water Wipes",
        tagline: "Clean messy faces, sticky hands & delicate bottoms with natural freshness.",
        highlight: "Infused with Organic Aloe",
      },
      {
        badge: "CAROUSEL • 2/2",
        icon: "🍃",
        title: "Thick Pearl-Weave Texture",
        tagline: "One thick wipe cleans the biggest messes without tearing or drying out.",
        highlight: "100% Plant-Based Fibers",
      },
    ],
    likes: 2154,
    commentsCount: 52,
    caption:
      "No alcohol, no artificial perfumes, no sticky residue. 🌿 Our 99% Pure Water Wipes are thick, durable, and naturally soothing with aloe extracts. Perfect for mealtime, diaper time, and playtime!",
    timeAgo: "6 DAYS AGO",
  },
  {
    id: "4",
    label: "04",
    category: "ZERO RASH",
    color: "#EFE9DC",
    isCarousel: false,
    slides: [
      {
        badge: "MOTHER VERIFIED",
        icon: "⭐",
        title: "‘Finally, Peaceful Nights!’",
        tagline: "‘Switched to Mummagodi last month and my baby hasn’t had a single rash since. Absolute lifesaver!’",
        highlight: "— Ananya M., Verified Mom",
      },
    ],
    likes: 2680,
    commentsCount: 74,
    caption:
      "Real stories from real parents. 💛 When babies sleep soundly without itching or redness, the whole family rests better. Thank you for making Mummagodi part of your parenting journey!",
    timeAgo: "1 WEEK AGO",
  },
  {
    id: "5",
    label: "05",
    category: "NIGHT PANTS",
    color: "#B5A578",
    isCarousel: true,
    slides: [
      {
        badge: "CAROUSEL • 1/2",
        icon: "🌙",
        title: "12-Hour Overnight Dryness",
        tagline: "High-capacity absorption core locks wetness deep inside all night long.",
        highlight: "No Midnight Sheet Changes",
      },
      {
        badge: "CAROUSEL • 2/2",
        icon: "✨",
        title: "Smart Wetness Indicator",
        tagline: "The color-changing strip tells you at a glance when a fresh diaper is needed.",
        highlight: "Yellow turns to Blue",
      },
    ],
    likes: 1930,
    commentsCount: 41,
    caption:
      "Good nights lead to great mornings. 🌙 With Mummagodi Night Pants, dual absorption channels distribute moisture evenly so your baby wakes up happy and dry every single morning.",
    timeAgo: "1 WEEK AGO",
  },
  {
    id: "6",
    label: "06",
    category: "ECO TOUCH",
    color: "#929477",
    isCarousel: false,
    slides: [
      {
        badge: "SUSTAINABLE CARE",
        icon: "🌱",
        title: "Gentle on Baby, Kind to Earth",
        tagline: "Responsibly harvested wood pulp & recyclable packaging for tomorrow.",
        highlight: "FSC Certified Materials",
      },
    ],
    likes: 1610,
    commentsCount: 35,
    caption:
      "Because the world our children inherit matters just as much as the comfort they feel today. 🌍 Mummagodi is committed to clean manufacturing and sustainable sourcing.",
    timeAgo: "2 WEEKS AGO",
  },
];

export const HIGHLIGHTS = [
  { name: "Our Brand", img: "/highlight-brand.png" },
  { name: "Diapers", img: "/highlight-diapers.png" },
  { name: "Baby Wipes", img: "/highlight-wipes.png" },
  { name: "Why Us?", img: "/highlight-whyus.png" },
];

interface Props {
  active: AnnotationId | null;
  onSelect: (id: AnnotationId) => void;
  brand?: BrandData;
  selectedPost?: PostItem | null;
  onSelectPost?: (post: PostItem | null) => void;
  isMobile?: boolean;
}

const interactiveBase: React.CSSProperties = {
  cursor: "pointer",
  transition: "background-color 180ms ease, transform 150ms ease",
};

const InstagramProfile = React.forwardRef<HTMLDivElement, Props>(
  function InstagramProfile(
    {
      active,
      onSelect,
      brand = MUMMAGODI_BRAND,
      selectedPost: externalSelectedPost,
      onSelectPost,
      isMobile = false,
    },
    ref
  ) {
    const internalRef = useRef<HTMLDivElement>(null);
    const containerRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

    const [following, setFollowing] = useState(false);
    const [localSelectedPost, setLocalSelectedPost] = useState<PostItem | null>(null);

    const currentSelectedPost =
      externalSelectedPost !== undefined ? externalSelectedPost : localSelectedPost;
    const handleSetSelectedPost = (post: PostItem | null) => {
      if (onSelectPost) {
        onSelectPost(post);
      } else {
        setLocalSelectedPost(post);
      }
    };

    const isAct = (id: AnnotationId) => active === id;

    // On mobile: smoothly scroll inside the phone to keep active section in comfortable view
    useEffect(() => {
      if (!isMobile || !active || !containerRef.current) return;
      const scrollToActive = () => {
        if (!containerRef.current) return;
        if (active === "name") {
          containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const targetEl = containerRef.current.querySelector(`#section-${active}`) as HTMLElement | null;
        if (targetEl) {
          const containerTop = containerRef.current.getBoundingClientRect().top;
          const targetTop = targetEl.getBoundingClientRect().top;
          const currentScroll = containerRef.current.scrollTop;
          const relativeTop = targetTop - containerTop + currentScroll;
          
          containerRef.current.scrollTo({
            top: Math.max(0, relativeTop - 8),
            behavior: "smooth",
          });
        }
      };

      // Run immediately and also after brief tick to ensure layout is settled
      scrollToActive();
      const timer = setTimeout(scrollToActive, 80);
      return () => clearTimeout(timer);
    }, [active, isMobile]);

    const hover = (_id: AnnotationId): React.CSSProperties => ({
      ...interactiveBase,
      backgroundColor: "transparent",
      borderRadius: 8,
      position: "relative",
    });

    const posts = brand.posts || MUMMAGODI_BRAND.posts;
    const highlights = brand.highlights || MUMMAGODI_BRAND.highlights;

    return (
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflowY: "auto",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
        }}
        className="ig-scroll select-none"
      >
        <div
          style={{
            minHeight: "100%",
            width: "100%",
            background: "#F7F4EC",
            display: "flex",
            flexDirection: "column",
            fontFamily: '"Inter", sans-serif',
            color: "#292820",
            paddingBottom: isMobile ? 220 : 20,
          }}
        >
          {/* Top bar */}
          <div
            id="section-username"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 16px 2px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 600,
                fontSize: 14.5,
                padding: "2px 4px",
              }}
            >
              <LockIcon />
              {brand.handle}
              <ChevronIcon />
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <PlusIcon />
              <MenuIcon />
            </div>
          </div>

          {/* Profile header */}
          <div style={{ padding: "2px 16px 2px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              {/* Avatar */}
              <div
                id="section-avatar"
                style={{
                  padding: 2,
                }}
                role="button"
                aria-label="Profile picture"
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#EFE9DC",
                    border: "2px solid #D8C7A2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    padding: 3,
                  }}
                >
                  <img
                    src={brand.avatarUrl}
                    alt={brand.displayName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{brand.stats.posts}</div>
                  <div style={{ fontSize: 11, color: "#898274" }}>posts</div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{brand.stats.followers}</div>
                  <div style={{ fontSize: 11, color: "#898274" }}>followers</div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{brand.stats.following}</div>
                  <div style={{ fontSize: 11, color: "#898274" }}>following</div>
                </div>
              </div>
            </div>

            {/* Name & Bio section */}
            <div style={{ marginTop: 6 }}>
              {/* Name Field (Brand Name & Category for Search Discovery) */}
              <div
                id="section-name"
                className={isAct("name") ? "mobile-active-target" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect("name");
                }}
                style={{
                  ...hover("name"),
                  padding: "3px 6px",
                  margin: "0 -6px",
                  cursor: "pointer",
                  borderRadius: 6,
                  backgroundColor: isAct("name") ? "rgba(216, 199, 162, 0.3)" : "transparent",
                  outline: isAct("name") ? "1.5px dashed #A89572" : "none",
                  transition: "all 180ms ease",
                }}
              >
                <div
                  className="brand-name-title"
                  style={{
                    display: "inline-block",
                    fontWeight: 600,
                    fontSize: 12.5,
                    marginBottom: 1,
                  }}
                >
                  {brand.nameLabel}
                </div>
                <div style={{ fontSize: 11, color: "#898274", marginBottom: 3 }}>
                  {brand.category}
                </div>
              </div>

              {/* Exact Bio Lines */}
              <div
                id="section-bio"
                className={isAct("bio") ? "mobile-active-target" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect("bio");
                }}
                style={{
                  ...hover("bio"),
                  padding: "3px 6px",
                  margin: "2px -6px",
                  lineHeight: 1.36,
                  fontSize: 11.5,
                  color: "#292820",
                  borderRadius: 6,
                  backgroundColor: isAct("bio") ? "rgba(216, 199, 162, 0.3)" : "transparent",
                  outline: isAct("bio") ? "1.5px dashed #A89572" : "none",
                  transition: "all 180ms ease",
                }}
              >
                {brand.bioLines.map((line, idx) => (
                  <div key={idx} style={{ fontWeight: line.isBold ? 600 : 400, color: "#292820" }}>
                    {line.text}
                  </div>
                ))}

                {/* Natural Instagram Bio Link */}
                <div
                  style={{
                    fontSize: 11.5,
                    color: "#385185",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 3,
                  }}
                >
                  <LinkIcon />
                  <span>{brand.website}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div
              id="section-follow"
              style={{
                display: "flex",
                gap: 7,
                margin: "6px 0 3px",
                padding: 1,
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFollowing(!following);
                }}
                style={{
                  flex: 1,
                  background: following ? "#EFE9DC" : "#929477",
                  color: following ? "#292820" : "#F7F4EC",
                  border: "none",
                  borderRadius: 7,
                  padding: "5.5px 0",
                  fontWeight: 600,
                  fontSize: 12,
                  cursor: "pointer",
                  transition: "all 150ms ease",
                }}
              >
                {following ? "Following" : "Follow"}
              </button>
              <button
                style={{
                  flex: 1,
                  background: "#EFE9DC",
                  color: "#292820",
                  border: "none",
                  borderRadius: 7,
                  padding: "5.5px 0",
                  fontWeight: 600,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Message
              </button>
              <button
                style={{
                  background: "#EFE9DC",
                  color: "#292820",
                  border: "none",
                  borderRadius: 7,
                  padding: "5.5px 9px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UserAddIcon />
              </button>
            </div>

            {/* Story Highlights */}
            <div
              id="section-highlights"
              className={isAct("highlights") ? "mobile-active-target" : ""}
              onClick={(e) => {
                e.stopPropagation();
                onSelect("highlights");
              }}
              style={{
                ...hover("highlights"),
                padding: "3px 4px 4px",
                margin: "0 -4px",
                borderRadius: 8,
                backgroundColor: isAct("highlights") ? "rgba(216, 199, 162, 0.28)" : "transparent",
                outline: isAct("highlights") ? "1.5px dashed #A89572" : "none",
                transition: "all 180ms ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 2px",
                }}
              >
                {highlights.map((hl) => (
                  <div
                    key={hl.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 3,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        background: "#F7F4EC",
                        border: "1.5px solid #D8C7A2",
                        padding: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 1px 2px rgba(41,40,32,0.03)",
                        overflow: "hidden",
                      }}
                    >
                      {hl.img ? (
                        <img
                          src={hl.img}
                          alt={hl.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: 22 }}>{hl.icon || "✨"}</span>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#292820",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {hl.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instagram Tab Bar */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #EAE3D2",
              marginTop: 6,
              marginBottom: 1,
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "6px 0",
                borderBottom: "1.5px solid #292820",
                color: "#292820",
              }}
            >
              <GridTabIcon />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "6px 0",
                color: "#B4ADA1",
              }}
            >
              <ReelsTabIcon />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "6px 0",
                color: "#B4ADA1",
              }}
            >
              <TaggedTabIcon />
            </div>
          </div>

          {/* 6-Post Editorial Grid (2 Rows of 3 Tiles, 100% visible without scroll) */}
          <div
            id="section-grid"
            className={isAct("grid") ? "mobile-active-target" : ""}
            onClick={(e) => {
              e.stopPropagation();
              onSelect("grid");
            }}
            style={{
              ...hover("grid"),
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              padding: 0,
            }}
          >
            {posts.map((tile) => (
              <div
                key={tile.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect("grid");
                  handleSetSelectedPost(tile);
                }}
                style={{
                  aspectRatio: tile.aspectRatio || (brand.slug === "karmaterra" ? "1/1" : "4/5"),
                  background: tile.color,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  cursor: "pointer",
                  transition: "filter 150ms ease, transform 120ms ease",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.filter = "brightness(0.96)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.filter = "none";
                }}
              >
                {/* Photo thumbnail if provided, else typographic banner */}
                {tile.thumbnailUrl ? (
                  <img
                    src={tile.thumbnailUrl}
                    alt={tile.category}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <>
                    <span
                      style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: 15,
                        fontWeight: 600,
                        color: "rgba(41,40,32,0.45)",
                      }}
                    >
                      {tile.label}
                    </span>
                    <span
                      style={{
                        fontSize: 8.5,
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        color: "rgba(41,40,32,0.6)",
                        marginTop: 2,
                      }}
                    >
                      {tile.category}
                    </span>
                  </>
                )}

                {/* Top badges: Pinned indicator and Carousel indicator */}
                <div
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    pointerEvents: "none",
                  }}
                >
                  {tile.isPinned && (
                    <div
                      style={{
                        color: "rgba(247, 244, 236, 0.95)",
                        display: "flex",
                        alignItems: "center",
                        filter: "drop-shadow(0 1px 2px rgba(41,40,32,0.5))",
                      }}
                      title="Pinned post"
                    >
                      <PinIcon />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default InstagramProfile;

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6l1 1 1-1v-6H18v-2l-2-2z" />
    </svg>
  );
}

// Minimal inline SVG icons for accurate Instagram UI
function CarouselSquareIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="rgba(247, 244, 236, 0.95)"
      style={{
        filter: "drop-shadow(0 1px 2px rgba(41,40,32,0.4))",
      }}
    >
      <rect x="2" y="2" width="14" height="14" rx="2.5" fill="currentColor" />
      <path
        d="M8 8v12a2 2 0 0 0 2 2h12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function UserAddIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  );
}

function GridTabIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="5" height="5" rx="1" />
      <rect x="9.5" y="3" width="5" height="5" rx="1" />
      <rect x="16" y="3" width="5" height="5" rx="1" />
      <rect x="3" y="9.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="16" y="9.5" width="5" height="5" rx="1" />
      <rect x="3" y="16" width="5" height="5" rx="1" />
      <rect x="9.5" y="16" width="5" height="5" rx="1" />
      <rect x="16" y="16" width="5" height="5" rx="1" />
    </svg>
  );
}

function ReelsTabIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7 3l4 6M13 3l4 6M3 9h18" />
      <polygon points="10 12 15 15 10 18 10 12" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TaggedTabIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
