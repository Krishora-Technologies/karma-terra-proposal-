export type AnnotationId =
  | "name"
  | "bio"
  | "highlights"
  | "grid";

export interface BulletSection {
  title: string;
  items: { bold?: string; text: string }[];
}

export interface AnnotationDef {
  id: AnnotationId;
  label: string;
  title: string;
  hook?: string;
  description?: string;
  sections: BulletSection[];
  objective?: string;
  summaryText: string;
  side: "left" | "right";
  topPx: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

// 4 Focused Sections: Name Field, Bio, Highlights, and Grid
export const ANNOTATIONS: AnnotationDef[] = [
  {
    id: "name",
    label: "Name Field",
    title: "Brand Name & Keywords",
    hook: "Keyword & Category SEO Discovery",
    sections: [
      {
        title: "Why Is This Important?",
        items: [
          { bold: "Brand Name:", text: "Clearly highlights the brand identity." },
          { bold: "Search Visibility:", text: "Keywords help new customers find the profile on Instagram." },
          { bold: "Category Clarity:", text: "Immediately explains the business domain." },
          { bold: "Future-Proof:", text: "Stays relevant as product lines expand." },
        ],
      },
    ],
    summaryText: "Optimized Name Field combining brand identity with high-search keywords.",
    side: "right",
    topPx: 145,
    fromX: 410,
    fromY: 171,
    toX: 215,
    toY: 184,
  },
  {
    id: "bio",
    label: "Strategic Bio",
    title: "Bio & Value Proposition",
    hook: "Core Positioning & Value Proposition",
    sections: [
      {
        title: "Why Is This Suitable?",
        items: [
          { bold: "Core Positioning:", text: "Clearly communicates the brand's unique philosophy." },
          { bold: "Category Coverage:", text: "Key offerings are covered cleanly." },
          { bold: "Premium Ritual:", text: "Reflects elevated quality and care." },
          { bold: "Traffic Encouraged:", text: "Direct call to action drives qualified website clicks." },
        ],
      },
    ],
    summaryText: "Structured bio highlighting brand positioning with a direct shop CTA.",
    side: "left",
    topPx: 200,
    fromX: -45,
    fromY: 232,
    toX: 32,
    toY: 245,
  },
  {
    id: "highlights",
    label: "Story Highlights",
    title: "Instagram Highlights Architecture",
    hook: "Mini Digital Storefront for Immediate Discovery 🛍️",
    sections: [
      {
        title: "Why Are These Highlights Important?",
        items: [
          { bold: "Our Story:", text: "Helps customers understand the brand's background, vision and philosophy." },
          { bold: "Products:", text: "Makes it easier for customers to explore the complete product range." },
          { bold: "Ingredients:", text: "Builds transparency and trust by educating customers about product formulations." },
          { bold: "How To Use:", text: "Helps customers understand the correct way to use each product." },
        ],
      },
    ],
    summaryText: "Highlights act as a mini digital storefront answering customer concerns.",
    side: "right",
    topPx: 330,
    fromX: 410,
    fromY: 388,
    toX: 295,
    toY: 410,
  },
  {
    id: "grid",
    label: "Post Grid",
    title: "Aesthetic Feed & Conversion Grid",
    hook: "High-Converting Visual Feed ✨",
    sections: [
      {
        title: "Why Is This Essential?",
        items: [
          { bold: "Brand Authority:", text: "Cohesive visual grid designed to build lasting trust." },
          { bold: "Carousel Education:", text: "Multi-slide posts educate visitors into buyers." },
          { bold: "Application Rituals:", text: "Engaging posts that turn passive viewers into loyal customers." },
        ],
      },
    ],
    summaryText: "Calm, cohesive visual grid designed to build lasting authority.",
    side: "left",
    topPx: 460,
    fromX: -45,
    fromY: 518,
    toX: 32,
    toY: 535,
  },
];

export const ANNOTATION_MAP: Record<AnnotationId, AnnotationDef> = ANNOTATIONS.reduce(
  (acc, def) => {
    acc[def.id] = def;
    return acc;
  },
  {} as Record<AnnotationId, AnnotationDef>
);
