import { useRef, useState } from "react";

export function ReactDemo() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lastAction, setLastAction] = useState("首次 render，读取初始 state");
  const renderExecutions = useRef(0);

  renderExecutions.current += 1;

  function incrementCount() {
    setLastAction("setCount(current => current + 1)");
    setCount((current) => current + 1);
  }

  function toggleTheme() {
    setLastAction("setTheme(current => 切换主题)");
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  function reset() {
    setLastAction("同一事件中调用 2 个 setter");
    setCount(0);
    setTheme("light");
  }

  return (
    <div className="demo-stack">
      <div className="demo-card">
        <span className="demo-tag">当前 render snapshot</span>
        <h2>count：{count}</h2>
        <p>无关状态 theme：{theme}</p>
      </div>

      <div className="demo-actions">
        <button
          className="d-btn d-btn-primary d-btn-sm"
          type="button"
          onClick={incrementCount}
        >
          count + 1
        </button>
        <button
          className="d-btn d-btn-primary d-btn-sm"
          type="button"
          onClick={toggleTheme}
        >
          切换无关状态
        </button>
        <button
          className="d-btn d-btn-primary d-btn-sm"
          type="button"
          onClick={reset}
        >
          重置
        </button>
      </div>

      <ol className="demo-trace" aria-label="React 执行观察">
        <li>
          <span>01 / 最近事件</span>
          <code>{lastAction}</code>
        </li>
        <li>
          <span>02 / 组件函数</span>
          <strong>已执行 {renderExecutions.current} 次</strong>
        </li>
        <li>
          <span>03 / Hook 顺序</span>
          <code>#1 count → #2 theme → #3 lastAction → #4 renderRef</code>
        </li>
        <li>
          <span>04 / 观察</span>
          <p>更新 count 或 theme，整个 ReactDemo 都会再次执行。</p>
        </li>
      </ol>
    </div>
  );
}
