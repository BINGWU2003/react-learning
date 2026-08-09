import { useState } from "react";
import type { FormEvent } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Alert,
  Button,
  Empty,
  Input,
  Segmented,
  Select,
  Skeleton,
  Switch,
  Tag,
} from "antd";
import { SiteAntdProvider } from "../../../components/SiteAntdProvider";
import { createResource } from "./api";
import { resourceKeys, resourceListOptions } from "./queryOptions";
import type {
  LearningTopic,
  TopicFilter,
} from "../../../lib/learning-resources/types";
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

  function changeTopic(value: string | number) {
    setTopic(value as TopicFilter);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
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

  return (
    <div className="query-demo not-content">
      <div className="query-demo__toolbar">
        <Segmented
          className="query-demo__topic-filter"
          options={topicOptions}
          value={topic}
          onChange={changeTopic}
        />
        <div className="query-demo__status">
          <Tag color="cyan">Astro API · Netlify Function</Tag>
          <Tag
            color={
              query.isError ? "error" : query.isFetching ? "processing" : "success"
            }
          >
            {query.isError
              ? "请求失败"
              : query.isPending
                ? "首次加载"
                : query.isFetching
                  ? "后台更新"
                  : query.isStale
                    ? "缓存已过期"
                    : "缓存新鲜"}
          </Tag>
        </div>
      </div>

      <div className="query-demo__status">
        <Button size="small" onClick={refreshCurrentList}>
          使当前缓存失效
        </Button>
        <span>模拟接口失败</span>
        <Switch
          size="small"
          checked={simulateError}
          onChange={setSimulateError}
        />
        <p className="query-demo__status-text" aria-live="polite">
          最近更新：{updatedAt}
        </p>
      </div>

      <div className="query-demo__panel" aria-busy={query.isFetching}>
        {query.isPending ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : query.isError ? (
          <Alert
            type="error"
            showIcon
            title="学习资料加载失败"
            description={query.error.message}
            action={
              <Button size="small" onClick={() => setSimulateError(false)}>
                恢复接口
              </Button>
            }
          />
        ) : query.data.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无学习资料" />
        ) : (
          <ul className="query-demo__list">
            {query.data.map((resource) => (
              <li key={resource.id}>
                <div>
                  <strong>{resource.title}</strong>
                  <span>预计学习 {resource.minutes} 分钟</span>
                </div>
                <Tag color={resource.topic === "react" ? "blue" : "green"}>
                  {resource.topic === "react" ? "React" : "Vue"}
                </Tag>
              </li>
            ))}
          </ul>
        )}
      </div>

      <section className="query-demo__create" aria-labelledby="create-title">
        <h3 id="create-title">Mutation：新增学习资料</h3>
        <form className="query-demo__create-form" onSubmit={submit}>
          <Input
            className="query-demo__title-input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="输入资料标题"
            aria-label="资料标题"
          />
          <Select
            className="query-demo__topic-select"
            value={createTopic}
            options={createTopicOptions}
            aria-label="资料所属方向"
            onChange={setCreateTopic}
          />
          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
            disabled={!title.trim()}
          >
            新增并重新同步
          </Button>
        </form>
        {mutation.isError ? (
          <Alert type="error" showIcon title={mutation.error.message} />
        ) : mutation.isSuccess ? (
          <Alert
            type="success"
            showIcon
            title="新增成功，相关查询已失效并重新获取"
          />
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
    <SiteAntdProvider>
      <QueryClientProvider client={queryClient}>
        <ResourcePanel />
      </QueryClientProvider>
    </SiteAntdProvider>
  );
}
