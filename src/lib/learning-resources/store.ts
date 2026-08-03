import type {
  CreateResourceInput,
  LearningResource,
  TopicFilter,
} from "./types";

let resources: LearningResource[] = [
  { id: 1, title: "React 渲染模型", topic: "react", minutes: 18 },
  { id: 2, title: "React Hook Form 与 Zod", topic: "react", minutes: 24 },
  { id: 3, title: "TanStack Query 缓存策略", topic: "react", minutes: 28 },
  { id: 4, title: "Vue 响应式原理", topic: "vue", minutes: 20 },
  { id: 5, title: "组合式 API 逻辑复用", topic: "vue", minutes: 16 },
];

let nextId = resources.length + 1;

export function readResources(topic: TopicFilter) {
  const result =
    topic === "all"
      ? resources
      : resources.filter((resource) => resource.topic === topic);

  return result.map((resource) => ({ ...resource }));
}

export function insertResource(input: CreateResourceInput) {
  const resource: LearningResource = {
    id: nextId,
    title: input.title.trim(),
    topic: input.topic,
    minutes: 12,
  };

  nextId += 1;
  resources = [resource, ...resources];

  return { ...resource };
}
