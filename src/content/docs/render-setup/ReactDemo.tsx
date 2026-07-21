import { useRef, useState } from "react";

export function ReactDemo() {
  const executions = useRef(0);
  const [count, setCount] = useState(0);
  const [compact, setCompact] = useState(false);

  executions.current += 1;

  return (
    <div className="demo-stack">
      <div className="demo-card">
        <span className="demo-tag">函数组件执行</span>
        <h2>{compact ? "紧凑视图" : "标准视图"}</h2>
        <p>count：{count}</p>
        <p>ReactDemo 本次挂载已执行：{executions.current} 次</p>
      </div>
      <div className="demo-actions">
        <button
          className="demo-button"
          type="button"
          onClick={() => setCount((current) => current + 1)}
        >
          count + 1
        </button>
        <button
          className="demo-button"
          type="button"
          onClick={() => setCompact((current) => !current)}
        >
          切换显示模式
        </button>
      </div>
    </div>
  );
}

