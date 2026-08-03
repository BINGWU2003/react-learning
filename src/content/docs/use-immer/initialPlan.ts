export type PlanLevel = "初级" | "进阶";

export type PlanTask = {
  id: string;
  title: string;
  completed: boolean;
};

export type PlanModule = {
  id: string;
  title: string;
  tasks: PlanTask[];
};

export type StudyPlan = {
  title: string;
  owner: {
    name: string;
    level: PlanLevel;
  };
  modules: PlanModule[];
};

export function createInitialPlan(): StudyPlan {
  return {
    title: "React × Vue 学习计划",
    owner: {
      name: "小明",
      level: "初级",
    },
    modules: [
      {
        id: "react",
        title: "React 核心",
        tasks: [
          { id: "react-render", title: "理解渲染模型", completed: true },
          { id: "react-state", title: "练习状态更新", completed: false },
          { id: "react-hooks", title: "掌握常用 Hooks", completed: false },
        ],
      },
      {
        id: "vue",
        title: "Vue 核心",
        tasks: [
          { id: "vue-reactivity", title: "理解响应式系统", completed: true },
          { id: "vue-composition", title: "练习组合式 API", completed: false },
        ],
      },
    ],
  };
}
