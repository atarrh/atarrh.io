import type { CollectionEntry } from "astro:content";

// Dev shows every post for previewing. Production skips drafts and future-dated
// posts; the scheduled rebuild (.github/workflows/scheduled-deploy.yml) publishes them.
export const isPublished = ({ data }: CollectionEntry<"blog">) =>
  import.meta.env.DEV || (!data.draft && data.pubDate.valueOf() <= Date.now());
