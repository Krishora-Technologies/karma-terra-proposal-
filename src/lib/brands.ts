import type { AnnotationDef, AnnotationId } from "./annotations";
import type { PostItem } from "@/components/PostPreviewModal";

export type BrandId = "mummagodi" | "karmaterra";

export interface BrandBioLine {
  text: string;
  isBold?: boolean;
}

export interface BrandHighlight {
  name: string;
  img?: string;
  icon?: string;
}

export interface BrandData {
  id: BrandId;
  slug: string;
  displayName: string;
  handle: string;
  proposalTarget: string;
  category: string;
  nameLabel: string;
  avatarUrl: string;
  website: string;
  stats: {
    posts: number | string;
    followers: string;
    following: number | string;
  };
  bioLines: BrandBioLine[];
  highlights: BrandHighlight[];
  posts: PostItem[];
  annotations: AnnotationDef[];
}

export const MUMMAGODI_BRAND: BrandData = {
  id: "mummagodi",
  slug: "mummagodi",
  displayName: "Mummagodi",
  handle: "mummagodi.diapers",
  proposalTarget: "@mummagodi.diapers",
  category: "Baby & children's care",
  nameLabel: "Mummagodi™",
  avatarUrl: "/mummagodi-pfp.png",
  website: "mummagodi.com",
  stats: {
    posts: 128,
    followers: "24.8K",
    following: 182,
  },
  bioLines: [
    { text: "👶 Comfort for Every Little One" },
    { text: "🌿 Thoughtfully Made Baby Care" },
    { text: "🧸 Diapers | Baby Wipes" },
    { text: "💙 Explore Mummagodi" },
    { text: "👇 Shop Your Baby Essentials", isBold: true },
  ],
  highlights: [
    { name: "Our Brand", img: "/highlight-brand.png" },
    { name: "Diapers", img: "/highlight-diapers.png" },
    { name: "Baby Wipes", img: "/highlight-wipes.png" },
    { name: "Why Us?", img: "/highlight-whyus.png" },
  ],
  posts: [
    {
      id: "1",
      label: "01",
      category: "MEET MUMMAGODI",
      color: "#97C5EB",
      isCarousel: true,
      isPinned: true,
      thumbnailUrl: "/mummagodi-pinned-slide1.jpg",
      slides: [
        {
          badge: "PINNED • 1/4",
          icon: "👶",
          title: "Meet Mummagodi",
          tagline: "Your Baby Care Partner.",
          highlight: "Pure Care for Little Ones",
          imageUrl: "/mummagodi-pinned-slide1.jpg",
        },
        {
          badge: "PINNED • 2/4",
          icon: "🌿",
          title: "Baby Care Essentials",
          tagline: "Introducing our range of baby care essentials.",
          highlight: "Diapers & 98% Pure Water Wipes",
          imageUrl: "/mummagodi-pinned-slide2.jpg",
        },
        {
          badge: "PINNED • 3/4",
          icon: "☁️",
          title: "Everyday Comfort & Care",
          tagline: "Comfort and care for your little one's everyday needs.",
          highlight: "Ultra-Soft Cloud Cushions",
          imageUrl: "/mummagodi-pinned-slide3.jpg",
        },
        {
          badge: "PINNED • 4/4",
          icon: "💙",
          title: "Parent Commitment",
          tagline: "Our commitment to making baby care easier for parents.",
          highlight: "Discover Mummagodi. Shop Now!",
          imageUrl: "/mummagodi-pinned-slide4.jpg",
        },
      ],
      likes: 2840,
      commentsCount: 64,
      caption:
        "Welcome to Mummagodi! 👶💙 Your trusted baby care partner crafted with love, pure water, and ultra-gentle cloud-soft protection. Swipe through to explore our full range of essentials designed to make parenting easier. Discover Mummagodi & shop now at the link in bio!",
      timeAgo: "PINNED POST",
      whyThisPost:
        "This post introduces Mummagodi as a baby-care brand and creates an emotional connection with parents through a mother-and-baby visual. It helps establish brand identity and familiarity.",
      strategyDetails: {
        objective: "Brand Introduction & Emotional Connection",
        creativeMessage: "Meet Mummagodi – Your Baby Care Partner",
        slidesInfo: [
          {
            title: "1. Meet Mummagodi – Your Baby Care Partner",
            desc: "This post introduces Mummagodi as a baby-care brand and creates an emotional connection with parents through a mother-and-baby visual. It helps establish brand identity and familiarity.",
          },
          {
            title: "2. Introducing Our Range of Baby Care Essentials",
            desc: "This post showcases Mummagodi's product range, including diapers and baby wipes. It builds product awareness and helps visitors understand what the brand offers.",
          },
          {
            title: "3. Comfort and Care for Your Little One's Everyday Needs",
            desc: "This post highlights the diaper product through a close-up visual, focusing on comfort and everyday baby-care needs. It creates product interest through a clean, premium presentation.",
          },
          {
            title: "4. Our Commitment to Making Baby Care Easier for Parents",
            desc: "This post communicates the brand's commitment to supporting parents with baby-care essentials. The clear Shop Now CTA also encourages profile visitors to explore the products.",
          },
        ],
        approachTitle: "Overall Profile Building Approach",
        approachItems: [
          { bold: "Brand Introduction:", text: "Who we are." },
          { bold: "Product Awareness:", text: "What we offer." },
          { bold: "Parenting Education:", text: "Useful tips for parents." },
          { bold: "Brand Trust & Engagement:", text: "Why parents should connect with Mummagodi." },
        ],
      },
    },
    {
      id: "2",
      label: "02",
      category: "BABY CARE ESSENTIALS",
      color: "#97C5EB",
      isCarousel: true,
      thumbnailUrl: "/mummagodi-c2-slide1.jpg",
      slides: [
        {
          badge: "ESSENTIALS • 1/6",
          icon: "👶",
          title: "Everyday Baby Care Starts With Mummagodi",
          tagline: "Creates brand recall by positioning Mummagodi as an everyday baby-care choice.",
          highlight: "Everyday Baby Care",
          imageUrl: "/mummagodi-c2-slide1.jpg",
        },
        {
          badge: "ESSENTIALS • 2/6",
          icon: "💧",
          title: "Baby Wipes & Sizes",
          tagline: "Highlights the baby wipes pack details, usage benefits and available diaper sizes.",
          highlight: "Wipes Pack & Diaper Sizes",
          imageUrl: "/mummagodi-c2-slide2.jpg",
        },
        {
          badge: "ESSENTIALS • 3/6",
          icon: "☁️",
          title: "Mummagodi Diapers – Key Features",
          tagline: "Communicates the diaper's key features and product benefits for informed decisions.",
          highlight: "Key Diaper Features",
          imageUrl: "/mummagodi-c2-slide3.jpg",
        },
        {
          badge: "ESSENTIALS • 4/6",
          icon: "🌿",
          title: "Why Mummagodi?",
          tagline: "Builds brand trust by communicating the brand's thoughtful approach to baby care.",
          highlight: "Brand Trust & Care",
          imageUrl: "/mummagodi-c2-slide4.jpg",
        },
        {
          badge: "ESSENTIALS • 5/6",
          icon: "🧸",
          title: "Because Your Baby Deserves Better Care!",
          tagline: "Creates an emotional product-focused connection by showcasing diapers & wipes.",
          highlight: "Better Care For Baby",
          imageUrl: "/mummagodi-c2-slide5.jpg",
        },
        {
          badge: "ESSENTIALS • 6/6",
          icon: "💙",
          title: "Why Choose Mummagodi?",
          tagline: "Strengthens product positioning by showcasing why Mummagodi deserves consideration.",
          highlight: "Complete Product Range",
          imageUrl: "/mummagodi-c2-slide6.jpg",
        },
      ],
      likes: 1980,
      commentsCount: 45,
      caption:
        "Everyday baby care starts with Mummagodi! 👶💙 From 12-hour leak-proof diapers with wetness indicators to ultra-gentle baby wipes, Mummagodi brings you trusted everyday baby-care essentials thoughtfully designed to keep your little one comfy, clean, and smiling. Swipe through all 6 slides to discover our complete range! Tap link in bio to shop. 🛒✨",
      timeAgo: "2 DAYS AGO",
      whyThisPost:
        "These posts focus on Brand Positioning, Product Awareness, Product Education and Purchase Intent. The objective is to make the profile informative, visually consistent and conversion-oriented.",
      strategyDetails: {
        objective: "Brand Positioning, Product Awareness & Purchase Intent",
        creativeMessage: "Because Your Baby Deserves Better Care!",
        slidesInfo: [
          {
            title: "1. Everyday Baby Care Starts With Mummagodi",
            desc: "Creates brand recall by positioning Mummagodi as an everyday baby-care choice and encourages visitors to explore the brand online.",
          },
          {
            title: "2. Baby Wipes & Sizes",
            desc: "Highlights the baby wipes pack details, usage benefits and available diaper sizes, helping parents understand the product range.",
          },
          {
            title: "3. Mummagodi Diapers – Key Features",
            desc: "Communicates the diaper's key features and product benefits, helping parents make informed purchase decisions.",
          },
          {
            title: "4. Why Mummagodi?",
            desc: "Builds brand trust by communicating the brand's approach to baby care and highlighting its product range for parents.",
          },
          {
            title: "5. Because Your Baby Deserves Better Care!",
            desc: "Creates an emotional product-focused connection by showcasing the diaper and wipes range with a strong brand message.",
          },
          {
            title: "6. Why Choose Mummagodi?",
            desc: "Strengthens product positioning by showcasing the complete product range and communicating why Mummagodi deserves consideration.",
          },
        ],
        approachTitle: "Overall Strategy",
        approachItems: [
          { bold: "Focus Areas:", text: "Brand Positioning, Product Awareness, Product Education and Purchase Intent." },
          { bold: "Profile Objective:", text: "Make the profile informative, visually consistent and conversion-oriented." },
        ],
      },
    },
    {
      id: "3",
      label: "03",
      category: "BABY CARE TIPS",
      color: "#97C5EB",
      isCarousel: true,
      thumbnailUrl: "/mummagodi-c3-slide1.jpg",
      slides: [
        {
          badge: "BABY CARE • 1/4",
          icon: "🎒",
          title: "Stepping Out With Your Little One?",
          tagline: "A save-worthy parenting checklist featuring five essential items for baby outings.",
          highlight: "5 Outing Essentials",
          imageUrl: "/mummagodi-c3-slide1.jpg",
        },
        {
          badge: "BABY CARE • 2/4",
          icon: "💧",
          title: "Little Messes? We've Got You Covered!",
          tagline: "Highlights Mummagodi Baby Wipes and their everyday uses through a product-focused creative.",
          highlight: "Pure Water Baby Wipes",
          imageUrl: "/mummagodi-c3-slide2.jpg",
        },
        {
          badge: "BABY CARE • 3/4",
          icon: "📏",
          title: "Is Your Baby Wearing the Right Diaper Size?",
          tagline: "An educational post that helps parents understand diaper sizing and proper fitting.",
          highlight: "Diaper Sizing & Fit",
          imageUrl: "/mummagodi-c3-slide3.jpg",
        },
        {
          badge: "BABY CARE • 4/4",
          icon: "💙",
          title: "Real Parents, Real Love! – Extra Love",
          tagline: "Creates an emotional connection with parents through a relatable baby visual.",
          highlight: "Made With Extra Love",
          imageUrl: "/mummagodi-c3-slide4.jpg",
        },
      ],
      likes: 2154,
      commentsCount: 52,
      caption:
        "Stepping out with your little one or managing everyday little messes? 👶💙 We're here to help you navigate baby care with confidence and ease. From diaper sizing guides to outing checklists and pure water wipes, discover the essentials crafted with extra love. Swipe through our guide! Link in bio to explore. 🧸✨",
      timeAgo: "4 DAYS AGO",
      whyThisPost:
        "These creatives are designed to make the profile a mix of Educational Content, Product Awareness, Parenting Tips and Emotional Branding. The goal is to increase profile engagement, build trust among parents and gradually convert profile visitors into potential customers.",
      strategyDetails: {
        objective: "Educational Content, Parenting Tips & Emotional Branding",
        creativeMessage: "Real Parents, Real Love!",
        slidesInfo: [
          {
            title: "1. Stepping Out With Your Little One?",
            desc: "A save-worthy parenting checklist featuring five essential items for baby outings. Encourages saves and shares while naturally showcasing Mummagodi products.",
          },
          {
            title: "2. Little Messes? We've Got You Covered!",
            desc: "Highlights Mummagodi Baby Wipes and their everyday uses through a product-focused creative. Builds product awareness and encourages parents to consider wipes as a daily essential.",
          },
          {
            title: "3. Is Your Baby Wearing the Right Diaper Size?",
            desc: "An educational post that helps parents understand diaper sizing and proper fitting. Builds brand credibility by offering useful parenting information.",
          },
          {
            title: "4. Real Parents, Real Love! – Extra Love",
            desc: "Creates an emotional connection with parents through a relatable baby visual. Strengthens the brand's emotional identity and makes the profile feel more personal and engaging.",
          },
        ],
        approachTitle: "Strategic Objective",
        approachItems: [
          { bold: "Content Mix:", text: "Educational Content, Product Awareness, Parenting Tips and Emotional Branding." },
          { bold: "Conversion Funnel:", text: "Increase profile engagement, build trust among parents and gradually convert profile visitors into potential customers." },
        ],
      },
    },
    {
      id: "4",
      label: "04",
      category: "DIAPER SIZING GUIDE",
      color: "#97C5EB",
      isCarousel: false,
      thumbnailUrl: "/mummagodi-post4.jpg",
      slides: [
        {
          badge: "SIZING GUIDE",
          icon: "📏",
          title: "Is Your Baby Wearing the Right Diaper Size?",
          tagline: "Choosing the right diaper size matters! Weight, waist comfort & snug leg cuffs.",
          highlight: "NB (Up to 5kg) & M (7-12kg)",
          imageUrl: "/mummagodi-post4.jpg",
        },
      ],
      likes: 1840,
      commentsCount: 36,
      caption:
        "Is your baby wearing the right diaper size? 👶💙 Choosing the right fit makes all the difference for comfort and leak protection! Check baby's weight, ensure a comfy fit around the waist, and inspect leg cuffs for gentle snugness. Find the perfect fit with Mummagodi NB (up to 5kg) and M (7–12kg). Tap link in bio to shop! 🧸✨",
      timeAgo: "1 WEEK AGO",
      whyThisPost:
        "This post educates parents about choosing the correct diaper size. It builds trust by providing useful information and helps customers understand the importance of a comfortable diaper fit.",
    },
    {
      id: "5",
      label: "05",
      category: "BABY WIPES ESSENTIAL",
      color: "#97C5EB",
      isCarousel: false,
      thumbnailUrl: "/mummagodi-post5.jpg",
      slides: [
        {
          badge: "EVERYDAY ESSENTIAL",
          icon: "💧",
          title: "Little Messes? We've Got You Covered!",
          tagline: "Baby Wipes – An Everyday Essential! 80 Wipes, 98% pure water, extra soft & pH balanced.",
          highlight: "80 Pack Pure Water Wipes",
          imageUrl: "/mummagodi-post5.jpg",
        },
      ],
      likes: 1920,
      commentsCount: 38,
      caption:
        "Little messes? We've got you covered! 👶💙 Mummagodi Baby Wipes are your everyday parenting essential: 98% pure water, extra-soft plant-based fibres, alcohol & paraben free. Easy to carry while travelling, handy for everyday clean-ups, a must-have in every diaper bag, and convenient for diaper changing. Keep Mummagodi handy wherever you go! Tap link in bio to shop. 🧸✨",
      timeAgo: "1 WEEK AGO",
      whyThisPost:
        "This post highlights Mummagodi Baby Wipes as an everyday baby-care essential. The product-focused design improves product awareness and communicates its practical uses to parents.",
    },
    {
      id: "6",
      label: "06",
      category: "OUTING ESSENTIALS",
      color: "#97C5EB",
      isCarousel: false,
      thumbnailUrl: "/mummagodi-post6.jpg",
      slides: [
        {
          badge: "TRAVEL CHECKLIST",
          icon: "🎒",
          title: "Stepping Out With Your Little One?",
          tagline: "Don't Forget These 5 Essentials! Diapers, wipes, extra clothes, changing mat & bags.",
          highlight: "Save This Checklist",
          imageUrl: "/mummagodi-post6.jpg",
        },
      ],
      likes: 2240,
      commentsCount: 49,
      caption:
        "Stepping out with your little one? 👶🎒 Don't forget these 5 essentials before your next outing: extra diapers, Mummagodi pure water baby wipes, spare clothes, changing mat, and disposal bags. Save this checklist before you go! Tap link in bio to shop. 💙🧸",
      timeAgo: "2 WEEKS AGO",
      whyThisPost:
        "This post provides a useful checklist of five outing essentials. It makes the brand relatable to parents, encourages saves and shares, and creates awareness about Mummagodi's baby-care products.",
    },
  ],
  annotations: [
    {
      id: "name",
      label: "Name Field (SEO)",
      title: "Mummagodi™ • Baby Care",
      hook: "Brand Authority + High-Search Keywords",
      sections: [
        {
          title: "Why Is This Important?",
          items: [
            { bold: "Brand Name:", text: "Mummagodi™ clearly highlights the trademark brand name." },
            { bold: "Search Discovery:", text: "Baby & Children's Care optimizes search visibility for new parents." },
            { bold: "Category Recognition:", text: "New parents instantly understand the brand domain." },
            { bold: "Future-Proof:", text: "Stays relevant as Mummagodi introduces new baby care products." },
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
      title: "Instagram Bio Strategy",
      hook: "Comfort for Every Little One 👶",
      description: "The Instagram bio is designed to communicate the brand's identity, product category and value proposition within a few lines.",
      sections: [
        {
          title: "Bio Line Strategy",
          items: [
            { bold: "Comfort for Every Little One:", text: "Creates an emotional brand connection." },
            { bold: "Thoughtfully Made Baby Care:", text: "Establishes the brand's positioning." },
            { bold: "Diapers | Baby Wipes:", text: "Clearly communicates the product range." },
            { bold: "Explore Mummagodi:", text: "Encourages profile visitors to discover the brand." },
            { bold: "Shop Your Baby Essentials:", text: "Provides a clear purchase-oriented CTA." },
          ],
        },
      ],
      objective: "Make the profile instantly understandable, professional and customer-friendly while encouraging visitors to explore and shop Mummagodi products.",
      summaryText: "The Instagram bio is designed to communicate the brand's identity, product category and value proposition within a few lines.",
      side: "left",
      topPx: 200,
      fromX: -45,
      fromY: 232,
      toX: 32,
      toY: 245,
    },
    {
      id: "highlights",
      label: "4 Story Highlights",
      title: "Instagram Highlight Covers",
      hook: "Organised Profile & Easy Navigation 🛍️",
      description: "We have designed four Instagram Highlight Covers to organise the profile and make it look professional, consistent and easy to navigate.",
      sections: [
        {
          title: "Highlight Architecture",
          items: [
            { bold: "1. Our Brand:", text: "Introduces Mummagodi, its brand identity, story and commitment to baby care." },
            { bold: "2. Diapers:", text: "Helps visitors explore diaper products, available sizes, features and product information." },
            { bold: "3. Baby Wipes:", text: "Showcases the baby wipes range, product details and everyday uses." },
            { bold: "4. Why Us?:", text: "Communicates Mummagodi's key USPs, product features and reasons to choose the brand." },
          ],
        },
      ],
      objective: "To create a well-organised Instagram profile where new visitors can quickly understand the brand, explore its products and build confidence in Mummagodi.",
      summaryText: "We have designed four Instagram Highlight Covers to organise the profile and make it look professional, consistent and easy to navigate.",
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
      title: "Overall Instagram Profile Strategy",
      hook: "Brand Awareness + Product Education + Parenting Tips 🧸",
      sections: [
        {
          title: "Overall Profile Strategy",
          items: [
            {
              bold: "Content Philosophy:",
              text: "We are not just posting product creatives. We are building a profile that combines Brand Awareness + Product Education + Parenting Tips.",
            },
            {
              bold: "4. Diaper Sizing Guide:",
              text: "Educates parents about choosing the correct diaper size. Builds trust by providing useful information and helps customers understand the importance of a comfortable diaper fit.",
            },
            {
              bold: "5. Little Messes Baby Wipes:",
              text: "Highlights Mummagodi Baby Wipes as an everyday baby-care essential. The product-focused design improves product awareness and communicates its practical uses to parents.",
            },
            {
              bold: "6. Stepping Out Checklist:",
              text: "Provides a useful checklist of five outing essentials. Makes the brand relatable to parents, encourages saves and shares, and creates awareness about Mummagodi's baby-care products.",
            },
          ],
        },
      ],
      summaryText: "We are not just posting product creatives. We are building a profile that combines Brand Awareness + Product Education + Parenting Tips.",
      side: "left",
      topPx: 460,
      fromX: -45,
      fromY: 518,
      toX: 32,
      toY: 535,
    },
  ],
};

export const KARMATERRA_BRAND: BrandData = {
  id: "karmaterra",
  slug: "karmaterra",
  displayName: "Karma Terra",
  handle: "karmaterra.skincare",
  proposalTarget: "@karmaterra.skincare",
  category: "Skin & Hair Care",
  nameLabel: "Karma Terra | Skin & Hair Care",
  avatarUrl: "/karmaterra-logo.png",
  website: "www.karmaterra.in",
  stats: {
    posts: 78,
    followers: "38.4K",
    following: 142,
  },
  bioLines: [
    { text: "🌿 Ayurveda Meets Modern Science" },
    { text: "✨ Thoughtfully crafted skincare & haircare" },
    { text: "🌸 Discover your personalised beauty ritual" },
    { text: "🍃 100% Pure • Ancient Indian Botanicals" },
    { text: "👇 Explore our collection", isBold: true },
  ],
  highlights: [
    { name: "Our Story", img: "/karmaterra-hl-story.png" },
    { name: "Products", img: "/karmaterra-hl-products.png" },
    { name: "Ingredients", img: "/karmaterra-hl-ingredients.png" },
    { name: "How To Use", img: "/karmaterra-hl-howtouse.png" },
  ],
  posts: [
    {
      id: "1",
      label: "01",
      category: "BRAND INTRODUCTION",
      color: "#D8C7A2",
      isCarousel: false,
      thumbnailUrl: "/karmaterra-post2.jpg",
      slides: [
        {
          badge: "BRAND INTRODUCTION",
          icon: "✨",
          title: "1. Introducing Karma Terra",
          tagline: "Beauty, Reimagined. Nature-Inspired Care. Rooted in Ayurveda.",
          highlight: "Brand Awareness & First Impression",
          imageUrl: "/karmaterra-post2.jpg",
        },
      ],
      likes: 3120,
      commentsCount: 82,
      caption:
        "Welcome to Karma Terra 🌿✨ Where ancient Ayurvedic rituals meet modern, thoughtful care. We believe true beauty is mindful, pure, and deeply connected to nature. Discover our collection of nature-inspired formulations crafted to elevate your daily self-care ritual.",
      timeAgo: "1 DAY AGO",
      whyThisPost:
        "Introduces Karma Terra, its brand identity and its focus on skincare, haircare and personal care.",
      strategyDetails: {
        objective: "Brand Awareness & First Impression",
        creativeMessage: "Beauty, Reimagined. Nature-Inspired Care. Rooted in Ayurveda.",
        benefits: [
          "Understand what the brand offers.",
          "Get familiar with its philosophy.",
          "Build brand recognition and curiosity.",
        ],
      },
    },
    {
      id: "2",
      label: "02",
      category: "BRAND PHILOSOPHY",
      color: "#D8C7A2",
      isCarousel: false,
      thumbnailUrl: "/karmaterra-post3.jpg",
      slides: [
        {
          badge: "BRAND PHILOSOPHY",
          icon: "🔬",
          title: "2. Nature Meets Modern Science",
          tagline: "Rooted in Nature. Refined by Science.",
          highlight: "Brand Trust & Positioning",
          imageUrl: "/karmaterra-post3.jpg",
        },
      ],
      likes: 2780,
      commentsCount: 59,
      caption:
        "Rooted in nature. Refined by science. 🔬🌿 At Karma Terra, ancient Ayurvedic botanicals are carefully combined with clinically proven modern science to create high-performance, skin-loving formulations that truly deliver. Experience the harmony of tradition and innovation at link in bio.",
      timeAgo: "3 DAYS AGO",
      whyThisPost:
        "Highlights Karma Terra's approach of combining Ayurvedic inspiration with modern science, helping the brand stand out.",
      strategyDetails: {
        objective: "Brand Trust & Positioning",
        creativeMessage: "Rooted in Nature. Refined by Science.",
        benefits: [
          "Understand the brand's philosophy.",
          "Learn about its nature-inspired approach.",
          "Build trust and interest.",
        ],
      },
    },
    {
      id: "3",
      label: "03",
      category: "HAIR TREATMENT OIL",
      color: "#D8C7A2",
      isCarousel: false,
      thumbnailUrl: "/karmaterra-post4.jpg",
      slides: [
        {
          badge: "CHAMPI RITUAL",
          icon: "🌺",
          title: "3. Bring Back the Champi Ritual",
          tagline: "Your Hair Deserves a Little Tradition.",
          highlight: "Product Awareness & Interest",
          imageUrl: "/karmaterra-post4.jpg",
        },
      ],
      likes: 2190,
      commentsCount: 48,
      caption:
        "Bring back the timeless Champi ritual! 💆‍♀️🌺 Your hair deserves the grounding comfort of tradition. Infused with potent Ayurvedic herbs and cold-pressed oils, Karma Terra Hair Treatment Oil nourishes the scalp, strengthens roots, and turns hair care into a soothing self-care ritual. Tap link in bio to shop! ✨",
      timeAgo: "5 DAYS AGO",
      whyThisPost:
        "Introduces Karma Terra's Hair Treatment Oil by connecting it with the traditional Champi ritual.",
      strategyDetails: {
        objective: "Product Awareness & Interest",
        creativeMessage: "Your Hair Deserves a Little Tradition.",
        benefits: [
          "Discover the haircare range.",
          "Understand the product's use.",
          "Connect with traditional haircare.",
          "Develop interest in the product.",
        ],
      },
    },
    {
      id: "4",
      label: "04",
      category: "FACIAL OIL",
      color: "#D8C7A2",
      isCarousel: false,
      thumbnailUrl: "/karmaterra-post5.jpg",
      slides: [
        {
          badge: "KUMKUMADI GLOW",
          icon: "✨",
          title: "4. The Timeless Goodness of Kumkumadi",
          tagline: "A Touch of Ayurveda. A Ritual of Glow.",
          highlight: "Product Education & Consideration",
          imageUrl: "/karmaterra-post5.jpg",
        },
      ],
      likes: 3450,
      commentsCount: 94,
      caption:
        "Golden radiance in every single drop. ✨ Meet the timeless beauty ritual of Kumkumadi. Blended with authentic saffron and revered Ayurvedic botanicals, Karma Terra Kumkumadi Facial Oil restores natural luminosity, evens skin tone, and locks in deep nourishment. Tap link in bio to experience the glow! 🌸",
      timeAgo: "1 WEEK AGO",
      whyThisPost:
        "Introduces Karma Terra's Kumkumadi Facial Oil and highlights its Ayurvedic-inspired skincare approach.",
      strategyDetails: {
        objective: "Product Education & Consideration",
        creativeMessage: "A Touch of Ayurveda. A Ritual of Glow.",
        benefits: [
          "Discover the facial oil.",
          "Explore the skincare range.",
          "Learn about its place in a skincare routine.",
        ],
      },
    },
    {
      id: "5",
      label: "05",
      category: "ULTRA SUNSCREEN",
      color: "#D8C7A2",
      isCarousel: false,
      thumbnailUrl: "/karmaterra-post6.jpg",
      slides: [
        {
          badge: "DAILY SPF RITUAL",
          icon: "☀️",
          title: "5. Sunscreen Isn't Just for Sunny Days",
          tagline: "Sun Protection Is an Everyday Ritual.",
          highlight: "Product Awareness & Daily-use Education",
          imageUrl: "/karmaterra-post6.jpg",
        },
      ],
      likes: 1980,
      commentsCount: 43,
      caption:
        "Sun protection is an everyday ritual, not just for sunny days! ☀️ UV rays penetrate clouds and glass all year round. Keep your skin protected, radiant, and hydrated every single day with Karma Terra Ultra Sunscreen SPF 50 PA+++. Non-greasy, lightweight, and zero white cast. Tap link in bio to shop your daily shield! 🌿",
      timeAgo: "1 WEEK AGO",
      whyThisPost:
        "Highlights the importance of daily sun protection while introducing Karma Terra's Ultra Sunscreen SPF 50 PA+++.",
      strategyDetails: {
        objective: "Product Awareness & Daily-use Education",
        creativeMessage: "Sun Protection Is an Everyday Ritual.",
        benefits: [
          "Discover the sunscreen.",
          "Understand SPF 50 PA+++.",
          "Learn the importance of daily sun protection.",
        ],
      },
    },
    {
      id: "6",
      label: "06",
      category: "PERSONALISED SKINCARE",
      color: "#D8C7A2",
      isCarousel: false,
      thumbnailUrl: "/karmaterra-post1.jpg",
      slides: [
        {
          badge: "PERSONAL RITUAL",
          icon: "🌿",
          title: "6. Your Skin. Your Needs. Your Ritual.",
          tagline: "Skincare Should Be Personal.",
          highlight: "Customer Connection & Engagement",
          imageUrl: "/karmaterra-post1.jpg",
        },
      ],
      likes: 2410,
      commentsCount: 64,
      caption:
        "Skincare should never be one-size-fits-all. 🌿 Because every skin is different, your daily regimen should be thoughtfully tailored to what your skin and hair truly need. Discover a smarter approach to understanding your unique Ayurvedic ritual at www.karmaterra.in ✨",
      timeAgo: "2 WEEKS AGO",
      whyThisPost:
        "Encourages customers to understand their individual skin and hair needs before choosing suitable products.",
      strategyDetails: {
        objective: "Customer Connection & Engagement",
        creativeMessage: "Skincare Should Be Personal.",
        benefits: [
          "Understand their personal care needs.",
          "Explore suitable products.",
          "Feel encouraged to interact with the brand.",
        ],
      },
    },
  ],
  annotations: [
    {
      id: "name",
      label: "Name Field (SEO)",
      title: "Karma Terra | Skin & Hair Care",
      hook: "Brand Name + SEO Keyword Visibility",
      sections: [
        {
          title: "Why Is This Important?",
          items: [
            { bold: "Karma Terra:", text: "clearly highlights the Brand Name." },
            { bold: "Skin Care & Hair Care:", text: "help improve search visibility through relevant keywords." },
            { bold: "Category Understanding:", text: "New customers can easily understand the brand category." },
            { bold: "Future-Proof:", text: "The Name Field remains relevant even when new products are introduced in the future." },
          ],
        },
      ],
      summaryText: "Karma Terra | Skin & Hair Care clearly highlights the Brand Name, improves SEO keyword discovery, and clarifies the brand category.",
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
      hook: "Ayurveda Meets Modern Science 🌿",
      sections: [
        {
          title: "Why Is This Suitable?",
          items: [
            { bold: "Core Positioning:", text: "Ayurveda and Modern Science clearly communicate the brand's core positioning." },
            { bold: "Dual Category Coverage:", text: "Both Skincare and Haircare categories are covered." },
            { bold: "Premium Ritual:", text: "Personalised Beauty Ritual reflects the brand's premium positioning." },
            { bold: "Direct Traffic:", text: "Website traffic is encouraged through a direct link." },
          ],
        },
      ],
      summaryText: "Ayurveda Meets Modern Science clearly communicates core positioning, covers skin & hair categories, and encourages website traffic.",
      side: "left",
      topPx: 200,
      fromX: -45,
      fromY: 232,
      toX: 32,
      toY: 245,
    },
    {
      id: "highlights",
      label: "4 Story Highlights",
      title: "Instagram Story Highlights",
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
      summaryText: "Highlights act as a mini digital storefront answering customer concerns: Our Story, Products, Ingredients, and How To Use.",
      side: "right",
      topPx: 330,
      fromX: 410,
      fromY: 388,
      toX: 295,
      toY: 410,
    },
    {
      id: "grid",
      label: "Post Grid & Visual Identity",
      title: "Cohesive Visual Feed & Rituals",
      hook: "High-Converting Beauty & Wellness Grid ✨",
      sections: [
        {
          title: "Why Is This Essential?",
          items: [
            { bold: "Aesthetic Cohesion:", text: "Harmonious feed palette blending earthy herbs with modern clinical minimalism." },
            { bold: "Educational Carousels:", text: "Multi-slide breakdowns showing scientific clinical proof alongside ancient herbs." },
            { bold: "Daily Rituals:", text: "Step-by-step application rituals that turn passive visitors into loyal daily users." },
            { bold: "Direct Conversion:", text: "Seamlessly converts feed engagement into purchases on www.karmaterra.in." },
          ],
        },
      ],
      summaryText: "Harmonious visual grid blending Ayurvedic botanicals with clean modern science to inspire daily rituals.",
      side: "left",
      topPx: 460,
      fromX: -45,
      fromY: 518,
      toX: 32,
      toY: 535,
    },
  ],
};

export const BRANDS: Record<BrandId, BrandData> = {
  mummagodi: MUMMAGODI_BRAND,
  karmaterra: KARMATERRA_BRAND,
};
