export type Project = {
  name: string;
  status: string;
  summary: string;
  stack: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    name: "Sidequest",
    status: "In progress",
    summary:
      "An idle strategy game for phones, and my way of learning game development: maps, battles, 3D models and animation.",
    stack: ["Godot", "Blender"],
  },
  {
    name: "Penpal",
    status: "Alpha",
    summary:
      "A prompt-based pen-pal club: members trade real letters, with curated stationery kits. A small, low-cost test of whether people want to write by hand again.",
    stack: ["Next.js", "Supabase", "Stripe", "Netlify"],
  },
  {
    name: "PII Scanner",
    status: "Prototype",
    summary:
      "Scans datasets for personal information such as emails, phone numbers and SSN-like values, then produces a risk report. Pattern matching handles the obvious cases; an optional LLM step classifies messy free-text fields.",
    stack: ["Python", "Streamlit", "pandas", "Postgres", "Snowflake", "BigQuery", "S3"],
  },
  {
    name: "TabCapture",
    status: "Personal tool",
    summary:
      "A Firefox extension with a small local helper that saves open tabs as summarized notes in my Obsidian vault, then closes them. A filter that runs without an LLM skips pages that need no summary, which keeps costs down.",
    stack: ["Firefox WebExtension", "Python", "Obsidian"],
  },
  {
    name: "atarrh.io",
    status: "Live",
    summary: "This site: a blog, a photo gallery and a place to think out loud.",
    stack: ["Astro", "Netlify", "GitHub Actions"],
    links: [{ label: "Source", href: "https://github.com/atarrh/atarrh.io" }],
  },
];

export const openSource: Project[] = [
  {
    name: "WeVote",
    status: "Volunteer",
    summary:
      "About six months as a volunteer engineer for a nonpartisan civic-tech nonprofit: UI components and bug fixes in the React web app, and improvements to the Django API server.",
    stack: ["React", "Flux", "Python", "Django"],
    links: [
      { label: "wevote.us", href: "https://wevote.us/" },
      { label: "Web app", href: "https://github.com/wevote/WebApp" },
      { label: "API server", href: "https://github.com/wevote/WeVoteServer" },
    ],
  },
];
