import type { ReactNode } from "react";
import { ComponentA } from "./ComponentA";
import { ComponentB } from "./ComponentB";
import { DynamicSelectCard } from "./DynamicSelectCard";
import { ForwardRefDemo } from "./ForwardRefDemo";
import Fruits from "./Fruits";
import Game from "./Game";
import { ParentChildDemo } from "./ParentChildDemo";
import { UserContextDemo } from "./UserContextDemo";

export type NoteRoute = {
  path: string;
  title: string;
  label: string;
  description: string;
  keywords: string[];
  content: ReactNode;
};

export const noteRoutes: NoteRoute[] = [
  {
    path: "/component-communication",
    title: "Props / Callback 与 props / emit",
    label: "组件通信",
    description:
      "React 通过 props 向下传值，并把回调函数交给子组件；Vue 通常使用 props 和 emit 表达相同的数据流。",
    keywords: ["props", "callback", "emit", "父传子", "子传父", "组件通信"],
    content: <ParentChildDemo />,
  },
  {
    path: "/context",
    title: "Context 与 provide / inject",
    label: "跨组件状态",
    description:
      "对比 React Context 和 Vue provide / inject 如何绕过逐层 props，共享同一份上下文数据。",
    keywords: ["context", "provide", "inject", "useContext", "跨组件"],
    content: <UserContextDemo />,
  },
  {
    path: "/ref",
    title: "useRef 与模板 ref",
    label: "DOM 引用",
    description:
      "React 使用 useRef 保存 DOM 引用，并可通过 forwardRef 转发；Vue 则通过模板 ref 获取组件或元素实例。",
    keywords: ["useRef", "forwardRef", "ref", "DOM", "defineExpose"],
    content: <ForwardRefDemo />,
  },
  {
    path: "/state",
    title: "useState 与 ref / reactive",
    label: "状态管理",
    description:
      "通过井字棋的状态、历史记录和派生值，观察 React 状态快照与 Vue 响应式数据的不同。",
    keywords: ["useState", "ref", "reactive", "state", "状态", "井字棋"],
    content: <Game />,
  },
  {
    path: "/derived-state",
    title: "派生状态与 computed",
    label: "数据筛选",
    description:
      "筛选结果直接由当前输入和库存状态计算，不额外保存一份重复 state；对应 Vue 中常见的 computed 场景。",
    keywords: ["computed", "派生状态", "filter", "筛选", "Thinking in React"],
    content: <Fruits />,
  },
  {
    path: "/css-modules",
    title: "CSS Modules 与 scoped",
    label: "样式隔离",
    description:
      "观察 CSS Modules 如何生成局部类名，以及 :global 与 Vue scoped 样式穿透在使用方式上的区别。",
    keywords: ["CSS Modules", "scoped", "global", "样式穿透", "样式隔离"],
    content: (
      <div className="demo-grid">
        <ComponentA />
        <ComponentB />
      </div>
    ),
  },
  {
    path: "/dynamic-styles",
    title: "Props 动态样式与 CSS 变量",
    label: "动态样式",
    description:
      "通过 props 传入动态值，再交给 CSS 变量消费；对应 Vue 中绑定 style 和 CSS 自定义属性的用法。",
    keywords: ["props", "CSS Variables", "style", "动态样式", "v-bind"],
    content: (
      <div className="demo-grid">
        <DynamicSelectCard
          title="动态组件 A"
          description="props 传入蓝色背景和 24px 圆角。"
          accentColor="#0958d9"
          borderColor="#1677ff"
          selectBg="#d6eaff"
          radius={24}
          defaultValue="hangzhou"
          options={[
            { value: "hangzhou", label: "Hangzhou" },
            { value: "shanghai", label: "Shanghai" },
            { value: "shenzhen", label: "Shenzhen" },
          ]}
        />
        <DynamicSelectCard
          title="动态组件 B"
          description="props 传入紫色背景和 8px 圆角。"
          accentColor="#531dab"
          borderColor="#9254de"
          selectBg="#f3e8ff"
          radius={8}
          defaultValue="design"
          options={[
            { value: "design", label: "Design" },
            { value: "frontend", label: "Frontend" },
            { value: "backend", label: "Backend" },
          ]}
        />
      </div>
    ),
  },
];
