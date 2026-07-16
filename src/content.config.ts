import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/posts",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    readTime: z.string(),
    tag: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      tag: z.string(),
      cover: image(),
      coverAlt: z.string(),
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
          }),
        )
        .optional(),
      tools: z.array(z.string()),
      client: z.string().optional(),
      url: z.string().optional(),
      services: z.array(z.string()).optional(),
      featured: z.boolean().default(false),
    }),
});

export const collections = { posts, projects };
