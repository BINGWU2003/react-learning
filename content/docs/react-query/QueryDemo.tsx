import { useState } from "react";
import type { SubmitEvent } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createResource } from "./api";
import { resourceKeys, resourceListOptions } from "./queryOptions";
import type {
  LearningTopic,
  TopicFilter,
} from "@/lib/learning-resources/types";
import "./QueryDemo.css";

const topicOptions = [
  { label: "全部", value: "all" },
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
];

const createTopicOptions = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
];

const timeFormatter = new Intl.DateTimeFormat("zh-CN", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
}

function ResourcePanel() {
  const queryClient = useQueryClient();
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [simulateError, setSimulateError] = useState(false);
  const [title, setTitle] = useState("");
  const [createTopic, setCreateTopic] = useState<LearningTopic>("react");
  const query = useQuery(resourceListOptions(topic, simulateError));
  const mutation = useMutation({
    mutationFn: createResource,
    onSuccess: async () => {
      setTitle("");
      await queryClient.invalidateQueries({ queryKey: resourceKeys.lists() });
    },
  });

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedTitle = title.trim();
    if (!normalizedTitle) return;
    mutation.mutate({ title: normalizedTitle, topic: createTopic });
  }

  function refreshCurrentList() {
    void queryClient.invalidateQueries({
      queryKey: resourceKeys.list(topic, simulateError),
    });
  }

  const updatedAt = query.dataUpdatedAt
    ? timeFormatter.format(query.dataUpdatedAt)
    : "尚未获取";
  const queryStatus = query.isError
    ? { label: "请求失败", tone: "d-badge-error" }
    : query.isPending
      ? { label: "首次加载", tone: "d-badge-info" }
      : query.isFetching
        ? { label: "后台更新", tone: "d-badge-info" }
        : query.isStale
          ? { label: "缓存已过期", tone: "d-badge-warning" }
          : { label: "缓存新鲜", tone: "d-badge-success" };

  return (
    <div className="query-demo not-content">
      <div className="query-demo__toolbar">
        <div
          className="d-join query-demo__topic-filter"
          role="group"
          aria-label="学习资料分类"
        >
          {topicOptions.map((option) => (
            <button
              key={option.value}
              className={`d-btn d-btn-sm d-join-item ${
                topic === option.value ? "d-btn-primary" : "d-btn-outline"
              }`}
              type="button"
              aria-pressed={topic === option.value}
              onClick={() => setTopic(option.value as TopicFilter)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="query-demo__status">
          <span className="d-badge d-badge-info d-badge-outline">
            Astro API · Netlify Function
          </span>
          <span
            className={`d-badge d-badge-outline ${queryStatus.tone}`}
            aria-live="polite"
          >
            {queryStatus.label}
          </span>
        </div>
      </div>

      <div className="query-demo__status">
        <button
          className="d-btn d-btn-outline d-btn-sm"
          type="button"
          onClick={refreshCurrentList}
        >
          使当前缓存失效
        </button>
        <label className="query-demo__toggle">
          <span>模拟接口失败</span>
          <input
            className="d-toggle d-toggle-primary d-toggle-sm"
            type="checkbox"
            checked={simulateError}
            onChange={(event) => setSimulateError(event.target.checked)}
          />
        </label>
        <p className="query-demo__status-text" aria-live="polite">
          最近更新：{updatedAt}
        </p>
      </div>

      <div className="query-demo__panel" aria-busy={query.isFetching}>
        {query.isPending ? (
          <div
            className="query-demo__skeleton"
            role="status"
            aria-label="正在加载学习资料"
          >
            <div className="d-skeleton query-demo__skeleton-title" />
            <div className="d-skeleton query-demo__skeleton-line" />
            <div className="d-skeleton query-demo__skeleton-line" />
            <div className="d-skeleton query-demo__skeleton-line" />
          </div>
        ) : query.isError ? (
          <div className="d-alert d-alert-error query-demo__alert" role="alert">
            <div>
              <strong>学习资料加载失败</strong>
              <p>{query.error.message}</p>
            </div>
            <button
              className="d-btn d-btn-sm"
              type="button"
              onClick={() => setSimulateError(false)}
            >
              恢复接口
            </button>
          </div>
        ) : query.data.length === 0 ? (
          <p className="query-demo__empty">暂无学习资料</p>
        ) : (
          <ul className="query-demo__list">
            {query.data.map((resource) => (
              <li key={resource.id}>
                <div>
                  <strong>{resource.title}</strong>
                  <span>预计学习 {resource.minutes} 分钟</span>
                </div>
                <span
                  className={`d-badge d-badge-outline ${
                    resource.topic === "react"
                      ? "d-badge-info"
                      : "d-badge-success"
                  }`}
                >
                  {resource.topic === "react" ? "React" : "Vue"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <section className="query-demo__create" aria-labelledby="create-title">
        <h3 id="create-title">Mutation：新增学习资料</h3>
        <form className="query-demo__create-form" onSubmit={submit}>
          <input
            className="d-input d-input-sm query-demo__title-input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="输入资料标题"
            aria-label="资料标题"
          />
          <select
            className="d-select d-select-sm query-demo__topic-select"
            value={createTopic}
            aria-label="资料所属方向"
            onChange={(event) =>
              setCreateTopic(event.target.value as LearningTopic)
            }
          >
            {createTopicOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            className="d-btn d-btn-primary d-btn-sm"
            type="submit"
            aria-busy={mutation.isPending}
            disabled={mutation.isPending || !title.trim()}
          >
            {mutation.isPending ? (
              <span
                className="d-loading d-loading-spinner d-loading-xs"
                aria-hidden="true"
              />
            ) : null}
            {mutation.isPending ? "正在新增" : "新增并重新同步"}
          </button>
        </form>
        {mutation.isError ? (
          <div className="d-alert d-alert-error" role="alert">
            <span>{mutation.error.message}</span>
          </div>
        ) : mutation.isSuccess ? (
          <div className="d-alert d-alert-success" role="status">
            <span>新增成功，相关查询已失效并重新获取</span>
          </div>
        ) : (
          <p className="query-demo__status-text">
            Mutation 成功后调用 invalidateQueries，所有分类缓存都会重新同步。
          </p>
        )}
      </section>
    </div>
  );
}

export function QueryDemo() {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ResourcePanel />
    </QueryClientProvider>
  );
}
