import { ComponentA } from "./ComponentA";
import { ComponentB } from "./ComponentB";
import { DynamicSelectCard } from "./DynamicSelectCard";
import Fruits from "./Fruits";
import Game from "./Game";
import { ParentChildDemo } from "./ParentChildDemo";

function App() {
  return (
    <main className="demo-page">
      <div className="demo-copy">
        <p className="eyebrow">CSS Modules + :global</p>
        <h1>A / B 组件样式穿透隔离</h1>
        <p>
          A 和 B 的样式文件里都写了同名的 <code>.page</code>，也都覆盖了
          <code>.ant-select-content</code>，但它们会被编译成不同的哈希类名。
        </p>
      </div>

      <div className="demo-grid">
        <ComponentA />
        <ComponentB />
      </div>

      <div className="demo-copy dynamic-copy">
        <p className="eyebrow">Props + CSS Variables</p>
        <h2>通过 props 动态改变穿透样式</h2>
        <p>
          下面两个组件复用同一个 <code>DynamicSelectCard</code>，动态值来自
          props， CSS Modules 仍然负责隔离作用域。
        </p>
      </div>

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

      <div className="demo-copy dynamic-copy">
        <p className="eyebrow">Props + Callback</p>
        <h2>父传子 &amp; 子传父 数据流</h2>
      </div>
      <ParentChildDemo />

      <div className="demo-copy dynamic-copy">
        <p className="eyebrow">React State</p>
        <h2>井字棋小游戏</h2>
        <p>点击棋盘落子，也可以通过右侧记录回到任意一步。</p>
      </div>
      <Game />

      <div className="demo-copy dynamic-copy">
        <p className="eyebrow">Thinking In React</p>
        <h2>水果和蔬菜筛选表格</h2>
        <p>输入关键字筛选商品，也可以只显示有库存的商品。</p>
      </div>
      <Fruits />
    </main>
  );
}

export default App;
