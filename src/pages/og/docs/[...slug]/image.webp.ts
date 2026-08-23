import { source } from "@/lib/source";
import type { APIRoute } from "astro";
import { createElement } from "react";
import { generate as DefaultImage } from "fumadocs-ui/og/takumi";
import { ImageResponse } from "takumi-js/response";

export function getStaticPaths() {
  return source.getPages().map((page) => ({
    params: {
      slug: page.slugs.length > 0 ? page.slugs.join("/") : undefined,
    },
  }));
}

export const GET: APIRoute = ({ params }) => {
  const slugs = params.slug?.split("/").filter(Boolean) ?? [];
  const page = source.getPage(slugs);

  if (!page) return new Response(undefined, { status: 404 });

  return new ImageResponse(
    createElement(DefaultImage, {
      title: page.data.title,
      description: page.data.description,
      site: "React × Vue",
    }),
    { width: 1200, height: 630, format: "webp" },
  );
};
