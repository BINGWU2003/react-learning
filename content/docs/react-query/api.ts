import type {
  CreateResourceInput,
  LearningResource,
  TopicFilter,
} from "@/lib/learning-resources/types";

async function getErrorMessage(response: Response) {
  const fallback = `请求失败（${response.status}）`;

  try {
    const body: unknown = await response.json();
    if (body && typeof body === "object" && "message" in body) {
      const message = (body as { message?: unknown }).message;
      return typeof message === "string" ? message : fallback;
    }
  } catch {
    return fallback;
  }

  return fallback;
}

export async function fetchResources(
  topic: TopicFilter,
  simulateError: boolean,
  signal?: AbortSignal,
) {
  const search = new URLSearchParams({
    topic,
    fail: String(simulateError),
  });
  const response = await fetch(`/api/learning-resources?${search}`, { signal });

  if (!response.ok) throw new Error(await getErrorMessage(response));
  return (await response.json()) as LearningResource[];
}

export async function createResource(input: CreateResourceInput) {
  const response = await fetch("/api/learning-resources", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error(await getErrorMessage(response));
  return (await response.json()) as LearningResource;
}
