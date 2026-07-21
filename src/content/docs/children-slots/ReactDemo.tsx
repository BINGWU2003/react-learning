import { useState } from "react";
import { ProfileCard } from "./ProfileCard";

export function ReactDemo() {
  const [completed, setCompleted] = useState(3);

  return (
    <ProfileCard
      title="本周学习进度"
      footer={
        <button
          className="demo-button"
          type="button"
          onClick={() => setCompleted((current) => current + 1)}
        >
          完成一篇
        </button>
      }
    >
      <p>已经完成 {completed} 篇 React / Vue 对比笔记。</p>
      <p className="demo-muted">正文作为 children，按钮作为 footer prop。</p>
    </ProfileCard>
  );
}

