import { useState, type CSSProperties } from "react";

const themes = [
  { name: "海蓝", color: "#1677ff", background: "#eaf3ff", radius: 18 },
  { name: "葡萄", color: "#7c3aed", background: "#f4edff", radius: 8 },
];

type CardStyle = CSSProperties & {
  "--demo-accent": string;
  "--demo-background": string;
  "--demo-radius": string;
};

export function ReactDemo() {
  const [themeIndex, setThemeIndex] = useState(0);
  const theme = themes[themeIndex];
  const style: CardStyle = {
    "--demo-accent": theme.color,
    "--demo-background": theme.background,
    "--demo-radius": `${theme.radius}px`,
  };

  return (
    <div className="demo-stack">
      <section className="dynamic-demo-card" style={style}>
        <span className="demo-tag">{theme.name}</span>
        <h2>运行时主题</h2>
        <p>颜色与圆角都来自组件状态。</p>
      </section>
      <div className="demo-actions">
        {themes.map((item, index) => (
          <button
            className="demo-button"
            type="button"
            key={item.name}
            onClick={() => setThemeIndex(index)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
