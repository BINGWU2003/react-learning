import { useState } from "react";
import styles from "./ComponentCommunicationDemo.module.css";

/* ───────── 父传子：Props ───────── */

type User = { name: string; role: string; roleColor: string; tags: string[] };

function ChildCard({ name, role, roleColor, tags }: User) {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <span className={styles.role} style={{ background: roleColor }}>
        {role}
      </span>
      <p>以下标签由父组件通过 props 传入：</p>
      <div className={styles.tags}>
        {tags.map((t) => (
          <span key={t} className={styles.tag}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ParentToChild() {
  const users: User[] = [
    {
      name: "张三",
      role: "前端工程师",
      roleColor: "#1677ff",
      tags: ["React", "TypeScript", "Vite"],
    },
    {
      name: "李四",
      role: "后端工程师",
      roleColor: "#531dab",
      tags: ["Node.js", "Go", "PostgreSQL"],
    },
  ];

  return (
    <div className={styles.wrapper}>
      <p>
        <strong>父传子：</strong>父组件通过 JSX 属性传递数据，子组件通过 props
        接收。
      </p>
      {users.map((u) => (
        <ChildCard key={u.name} {...u} />
      ))}
    </div>
  );
}

/* ───────── 子传父：回调函数 ───────── */

type Item = { id: string; text: string; time: string };

function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <div className={styles.inputArea}>
      <input
        value={value}
        placeholder="输入消息，点击发送传给父组件"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>发送</button>
    </div>
  );
}

function ChildToParent() {
  const [messages, setMessages] = useState<Item[]>([]);

  const handleSend = (text: string) => {
    setMessages((prev) => [
      { id: crypto.randomUUID(), text, time: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  };

  return (
    <div className={styles.wrapper}>
      <p>
        <strong>子传父：</strong>父组件传递回调函数，子组件调用并传递数据。
      </p>
      <MessageInput onSend={handleSend} />
      <div className={styles.msgList}>
        {messages.length === 0 && (
          <span style={{ color: "#bbb", fontSize: 13 }}>暂无消息</span>
        )}
        {messages.map((m) => (
          <div key={m.id} className={styles.msgItem}>
            {m.text}
            <span>{m.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── 合并导出 ───────── */

export function ComponentCommunicationDemo() {
  return (
    <div className={styles.wrapper}>
      <ParentToChild />
      <hr
        style={{
          margin: "12px 0",
          border: "none",
          borderTop: "1px solid #eee",
        }}
      />
      <ChildToParent />
    </div>
  );
}
