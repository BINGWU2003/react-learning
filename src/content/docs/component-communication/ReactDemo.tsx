import { useState } from "react";

type MessageInputProps = {
  onSend: (message: string) => void;
};

function MessageInput({ onSend }: MessageInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = value.trim();
    if (!message) return;
    onSend(message);
    setValue("");
  }

  return (
    <form className="demo-form" onSubmit={handleSubmit}>
      <label className="demo-field">
        子组件输入
        <input
          className="demo-input"
          value={value}
          placeholder="输入一条消息"
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
      <div className="demo-actions">
        <button className="demo-button" type="submit">
          发送给父组件
        </button>
      </div>
    </form>
  );
}

export function ReactDemo() {
  const [message, setMessage] = useState("还没有收到消息");

  return (
    <div className="demo-stack">
      <div className="demo-card">
        <span className="demo-tag">Parent</span>
        <h2>组件通信</h2>
        <p>父组件把 onSend 回调交给子组件。</p>
      </div>
      <MessageInput onSend={setMessage} />
      <p className="demo-result" aria-live="polite">
        父组件收到：{message}
      </p>
    </div>
  );
}
