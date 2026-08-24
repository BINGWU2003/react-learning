<script setup lang="ts">
import { ref, watch } from "vue";

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

const roomId = ref<RoomId>("general");
const status = ref("等待连接");
const events = ref<ConnectionEvent[]>([]);
let nextEventId = 1;

watch(
  roomId,
  (currentRoomId, _, onCleanup) => {
    const connection = createConnection(currentRoomId, (message) => {
      status.value = message;
      events.value = [
        { id: nextEventId++, message },
        ...events.value,
      ].slice(0, 5);
    });

    connection.connect();
    onCleanup(connection.disconnect);
  },
  { immediate: true },
);
</script>

<template>
  <div class="demo-stack">
    <label class="demo-field">
      当前房间
      <select v-model="roomId" class="demo-select">
        <option v-for="room in rooms" :key="room.id" :value="room.id">
          {{ room.label }}
        </option>
      </select>
    </label>

    <div class="demo-card">
      <span class="demo-tag">连接状态</span>
      <h2>{{ status }}</h2>
      <p>切换房间会先清理旧连接，再建立新连接。</p>
    </div>

    <p class="demo-muted">连接日志（最近 5 条）</p>
    <ul class="demo-list" aria-live="polite">
      <li v-for="event in events" :key="event.id">
        {{ event.message }}
      </li>
    </ul>
  </div>
</template>
