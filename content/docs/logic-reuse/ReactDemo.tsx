import { useViewportSize } from "./useViewportSize";

export function ReactDemo() {
  const { height, label, width } = useViewportSize();

  return (
    <div className="demo-stack">
      <div className="demo-card">
        <span className="demo-tag">useViewportSize()</span>
        <h2>{label}</h2>
        <p>窗口宽度：{width || "等待客户端挂载"}</p>
        <p>窗口高度：{height || "等待客户端挂载"}</p>
      </div>
      <p className="demo-muted">
        调整浏览器窗口后，Hook 内部的 resize 监听会更新组件 state。
      </p>
    </div>
  );
}

