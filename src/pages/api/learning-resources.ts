import type { APIRoute } from "astro";
import {
  insertResource,
  readResources,
} from "../../lib/learning-resources/store";
import type {
  CreateResourceInput,
  TopicFilter,
} from "../../lib/learning-resources/types";

export const prerender = false;

const responseDelay = 700;
const responseHeaders = { "Cache-Control": "no-store" };

function wait(duration: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });
}

function parseTopic(value: string | null): TopicFilter {
  return value === "react" || value === "vue" ? value : "all";
}

function isCreateResourceInput(value: unknown): value is CreateResourceInput {
  if (!value || typeof value !== "object") return false;

  const input = value as Record<string, unknown>;
  return (
    typeof input.title === "string" &&
    input.title.trim().length > 0 &&
    (input.topic === "react" || input.topic === "vue")
  );
}

export const GET: APIRoute = async ({ request }) => {
  await wait(responseDelay);

  const url = new URL(request.url);
  if (url.searchParams.get("fail") === "true") {
    return Response.json(
      { message: "模拟接口暂时不可用，请恢复后重试。" },
      { status: 500, headers: responseHeaders },
    );
  }

  const topic = parseTopic(url.searchParams.get("topic"));
  return Response.json(readResources(topic), { headers: responseHeaders });
};

export const POST: APIRoute = async ({ request }) => {
  await wait(responseDelay);

  const input: unknown = await request.json();
  if (!isCreateResourceInput(input)) {
    return Response.json(
      { message: "标题和学习方向不能为空。" },
      { status: 400, headers: responseHeaders },
    );
  }

  return Response.json(insertResource(input), {
    status: 201,
    headers: responseHeaders,
  });
};
