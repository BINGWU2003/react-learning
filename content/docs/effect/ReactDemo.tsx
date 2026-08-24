import { useEffect, useRef, useState } from "react";

type RoomId = "general" | "react" | "vue";

type ConnectionEvent = {
  id: number;
  message: string;
};

const rooms: { id: RoomId; label: string }[] = [
  { id: "general", label: "综合讨论" },
  { id: "react", label: "React 交流" },
  { id: "vue", label: "Vue 交流" },
];

function createConnection(roomId: RoomId, notify: (message: string) => void) {
  const roomName = rooms.find((room) => room.id === roomId)?.label ?? roomId;
  let timer: number | undefined;

  return {
    connect() {
      notify(`正在连接：${roomName}`);
      timer = window.setTimeout(() => notify(`已连接：${roomName}`), 400);
    },
    disconnect() {
      window.clearTimeout(timer);
      notify(`已断开：${roomName}`);
    },
  };
}

export function ReactDemo() {
  const [roomId, setRoomId] = useState<RoomId>("general");
  const [status, setStatus] = useState("等待连接");
  const [events, setEvents] = useState<ConnectionEvent[]>([]);
  const nextEventId = useRef(1);

  useEffect(() => {
    const connection = createConnection(roomId, (message) => {
      const event = { id: nextEventId.current++, message };
      setStatus(message);
      setEvents((current) => [event, ...current].slice(0, 5));
    });

    connection.connect();
    return connection.disconnect;
  }, [roomId]);

  return (
    <div className="demo-stack">
      <label className="demo-field">
        当前房间
        <select
          className="demo-select"
          value={roomId}
          onChange={(event) => setRoomId(event.target.value as RoomId)}
        >
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.label}
            </option>
          ))}
        </select>
      </label>

      <div className="demo-card">
        <span className="demo-tag">连接状态</span>
        <h2>{status}</h2>
        <p>切换房间会先清理旧连接，再建立新连接。</p>
      </div>

      <p className="demo-muted">连接日志（最近 5 条）</p>
      <ul className="demo-list" aria-live="polite">
        {events.map((event) => (
          <li key={event.id}>{event.message}</li>
        ))}
      </ul>
    </div>
  );
}
