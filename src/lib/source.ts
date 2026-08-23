import { type CollectionEntry, getCollection } from "astro:content";
import { structure, type StructuredData } from "fumadocs-core/mdx-plugins";
import { loader } from "fumadocs-core/source";
import type { StaticSource } from "fumadocs-core/source";
import * as path from "node:path";

export const source = loader({
  source: await createSource(),
  baseUrl: "/",
});

export function getStructuredData(
  entry: CollectionEntry<"docs">,
): StructuredData {
  return structure(entry.body ?? "");
}

export function getPageImageUrl(page: (typeof source)["$inferPage"]) {
  const segments = [...page.slugs, "image.webp"];
  return `/${[page.locale, "og", "docs", ...segments].filter(Boolean).join("/")}`;
}

async function createSource() {
  const result: StaticSource<{
    metaData: CollectionEntry<"meta">["data"];
    pageData: CollectionEntry<"docs">["data"] & {
      _raw: CollectionEntry<"docs">;
    };
  }> = { files: [] };

  for (const page of await getCollection("docs")) {
    const virtualPath = path.relative("content/docs", page.filePath!);
    result.files.push({
      type: "page",
      path: virtualPath,
      data: { ...page.data, _raw: page },
    });
  }

  for (const meta of await getCollection("meta")) {
    const virtualPath = path.relative("content/docs", meta.filePath!);
    result.files.push({
      type: "meta",
      path: virtualPath,
      data: meta.data,
    });
  }

  return result;
}
