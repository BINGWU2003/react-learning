import { useState } from "react";

type Profile = {
  name: string;
  score: number;
};

export function ReactDemo() {
  const [count, setCount] = useState(0);
  const [profile, setProfile] = useState<Profile>({
    name: "小明",
    score: 0,
  });

  function increment() {
    setCount((current) => current + 1);
    setProfile((current) => ({
      ...current,
      score: current.score + 1,
    }));
  }

  function reset() {
    setCount(0);
    setProfile((current) => ({ ...current, score: 0 }));
  }

  return (
    <div className="demo-stack">
      <div className="demo-card">
        <span className="demo-tag">useState</span>
        <h2>{profile.name}的计数器</h2>
        <p>count：{count}</p>
        <p>score：{profile.score}</p>
      </div>
      <div className="demo-actions">
        <button className="demo-button" type="button" onClick={increment}>
          同时加一
        </button>
        <button className="demo-button" type="button" onClick={reset}>
          重置
        </button>
      </div>
    </div>
  );
}
