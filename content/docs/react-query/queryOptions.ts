import { queryOptions } from "@tanstack/react-query";
import { fetchResources } from "./api";
import type { TopicFilter } from "@/lib/learning-resources/types";

export const resourceKeys = {
  all: ["learning-resources"] as const,
  lists: () => [...resourceKeys.all, "list"] as const,
  list: (topic: TopicFilter, simulateError: boolean) =>
    [...resourceKeys.lists(), topic, { simulateError }] as const,
};

export function resourceListOptions(
  topic: TopicFilter,
  simulateError: boolean,
) {
  return queryOptions({
    queryKey: resourceKeys.list(topic, simulateError),
    queryFn: ({ signal }) => fetchResources(topic, simulateError, signal),
    staleTime: 10_000,
    retry: false,
  });
}
