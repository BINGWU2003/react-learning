// @ts-check
import netlify from "@astrojs/netlify";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import {
  rehypeCode,
  remarkCodeTab,
  remarkHeading,
  remarkMdxMermaid,
  remarkNpm,
  remarkStructure,
} from "fumadocs-core/mdx-plugins";

/** @type {import("@astrojs/markdown-remark").RemarkPlugins} */
const remarkPlugins = [
  remarkHeading,
  remarkMdxMermaid,
  remarkCodeTab,
  remarkNpm,
  [remarkStructure, { exportAs: "structuredData" }],
];

/** @type {import("@astrojs/markdown-remark").RehypePlugins} */
const rehypePlugins = [rehypeCode];

export default defineConfig({
  adapter: netlify(),
  markdown: {
    processor: unified({
      remarkPlugins,
      rehypePlugins,
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@hookform/resolvers/zod",
        "@tanstack/react-query",
        "antd",
        "mermaid",
        "react-hook-form",
        "use-immer",
        "zod",
      ],
    },
  },
  integrations: [
    react(),
    vue(),
    mdx({
      extendMarkdownConfig: true,
      syntaxHighlight: false,
    }),
  ],
});
