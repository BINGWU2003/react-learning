import { useState } from "react";
import type { FormEvent } from "react";

export function ReactDemo() {
  const [name, setName] = useState("小明");
  const [direction, setDirection] = useState("React");
  const [submitted, setSubmitted] = useState(0);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted((current) => current + 1);
  }

  return (
    <div className="demo-stack">
      <form className="demo-form" onSubmit={submit}>
        <label className="demo-field">
          姓名
          <input
            className="demo-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="demo-field">
          学习方向
          <select
            className="demo-select"
            value={direction}
            onChange={(event) => setDirection(event.target.value)}
          >
            <option>React</option>
            <option>Vue</option>
            <option>两者对比</option>
          </select>
        </label>
        <button className="demo-button" type="submit">
          保存资料
        </button>
      </form>
      <div className="demo-card">
        <span className="demo-tag">实时 state</span>
        <h2>{name || "未填写姓名"}</h2>
        <p>正在学习：{direction}</p>
        <p>已保存：{submitted} 次</p>
      </div>
    </div>
  );
}
