export const categories = [
  "All",
  "Coding",
  "Writing",
  "Marketing",
  "Business",
  "Design",
  "Productivity"
];

export const mockPrompts = [
  {
    id: "prompt-1",
    title: "Senior React Hooks Consultant",
    description: "A prompt that instructs ChatGPT to act as a senior principal React developer, providing advanced patterns for custom hooks and performance optimization strategies.",
    content: "Act as a senior principal React developer with expertise in performance optimization and advanced hook patterns. I will provide you with a React component or a feature requirement, and you will respond with the most optimized, clean, and modern React implementation using custom hooks, useMemo, useCallback, and context where appropriate. Always explain the 'why' behind your architectural decisions.",
    author: {
      name: "Alex Dev",
      handle: "@alexdev",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    category: "Coding",
    tags: ["React", "Performance", "Web Dev"],
    likes: 1243,
    bookmarks: 890,
    createdAt: "2023-10-24T12:00:00Z"
  },
  {
    id: "prompt-2",
    title: "SaaS Landing Page Copywriter",
    description: "Generate high-converting, concise marketing copy for B2B SaaS landing pages using the AIDA framework.",
    content: "Act as a world-class SaaS copywriter specializing in B2B landing pages. Your goal is to write high-converting, concise copy using the AIDA (Attention, Interest, Desire, Action) framework. I will give you the name of the product, its target audience, and 3 key features. You will generate a punchy H1, a descriptive H2, 3 feature blurbs, and a compelling CTA.",
    author: {
      name: "Sarah Writes",
      handle: "@sarah_copy",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d"
    },
    category: "Marketing",
    tags: ["Copywriting", "SaaS", "Sales"],
    likes: 856,
    bookmarks: 412,
    createdAt: "2023-11-02T09:30:00Z"
  },
  {
    id: "prompt-3",
    title: "Midjourney Photorealistic Portait",
    description: "An advanced Midjourney v6 prompt structure to generate highly detailed, cinematic, and photorealistic portraits with specific camera settings.",
    content: "/imagine prompt: A cinematic close-up portrait of a [subject], highly detailed skin texture, dramatic studio lighting, neon rim light, shot on 85mm lens, f/1.8, bokeh background, award-winning photography, 8k resolution, photorealistic, cinematic color grading --ar 16:9 --style raw --v 6.0",
    author: {
      name: "Jordan Pixel",
      handle: "@ai_jordan",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d"
    },
    category: "Design",
    tags: ["Midjourney", "Photography", "AI Art"],
    likes: 2104,
    bookmarks: 1530,
    createdAt: "2023-12-15T14:20:00Z"
  },
  {
    id: "prompt-4",
    title: "Startup Pitch Deck Architect",
    description: "Guides the AI to outline and script a complete 10-slide startup pitch deck for seed funding.",
    content: "Act as an experienced Silicon Valley venture capitalist and startup advisor. I am a founder raising a seed round. I will provide my startup's name and a one-sentence value proposition. You will generate a 10-slide pitch deck outline (Problem, Solution, Market, Product, Traction, Team, Competition, Financials, Ask). For each slide, write the exact bullet points and script I should use when pitching.",
    author: {
      name: "Founder X",
      handle: "@founderx",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d"
    },
    category: "Business",
    tags: ["Startups", "Pitching", "Fundraising"],
    likes: 342,
    bookmarks: 289,
    createdAt: "2024-01-10T08:45:00Z"
  },
  {
    id: "prompt-5",
    title: "SQL Query Optimizer",
    description: "Provide a complex SQL query and receive an optimized version with explanations on indexing and execution plans.",
    content: "Act as a Senior Database Administrator. I will provide a complex, slow-running SQL query and the database schema. You must analyze it, rewrite it for maximum performance, and explain exactly why the new query is faster. Suggest any composite indexes that should be added to support the query.",
    author: {
      name: "DB Master",
      handle: "@dbmaster",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    category: "Coding",
    tags: ["SQL", "Database", "Optimization"],
    likes: 671,
    bookmarks: 520,
    createdAt: "2024-02-05T16:15:00Z"
  },
  {
    id: "prompt-6",
    title: "Weekly Newsletter Curator",
    description: "Turns a list of 5 URLs into a cohesive, engaging weekly email newsletter.",
    content: "Act as the editor-in-chief of a popular tech newsletter. I will provide 5 URLs or short summaries of news articles. You will synthesize them into a single, cohesive, engaging weekly newsletter. Adopt a witty, conversational tone similar to Morning Brew or The Hustle. Include an intro, the 5 summarized points with clever subheadings, and a brief sign-off.",
    author: {
      name: "News Geek",
      handle: "@newsgeek",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026703d"
    },
    category: "Writing",
    tags: ["Newsletter", "Content", "Tech"],
    likes: 428,
    bookmarks: 315,
    createdAt: "2024-02-28T10:00:00Z"
  }
];
