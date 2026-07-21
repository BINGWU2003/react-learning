import { lazy } from "react";
import type { NoteDefinition } from "../types";

const ComponentCommunicationDemo = lazy(() =>
  import("./ComponentCommunicationDemo").then((module) => ({
    default: module.ComponentCommunicationDemo,
  })),
);

const reactCode = `import { useState } from "react";

type MessageInputProps = {
  onSend: (text: string) => void;
};

function MessageInput({ onSend }: MessageInputProps) {
  const [value, setValue] = useState("");

  return (
    <div>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={() => onSend(value)}>发送</button>
    </div>
  );
}

export function Parent() {
  const [message, setMessage] = useState("");

  return (
    <>
      <MessageInput onSend={setMessage} />
      <p>{message}</p>
    </>
  );
}`;

const vueCode = `<!-- MessageInput.vue -->
<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  send: [text: string];
}>();

const value = ref("");
</script>

<template>
  <div>
    <input v-model="value" />
    <button @click="emit('send', value)">发送</button>
  </div>
</template>

<!-- Parent.vue -->
<script setup lang="ts">
import { ref } from "vue";
import MessageInput from "./MessageInput.vue";

const message = ref("");
</script>

<template>
  <MessageInput @send="message = $event" />
  <p>{{ message }}</p>
</template>`;

export const componentCommunicationNote: NoteDefinition = {
  path: "/component-communication",
  title: "Props / Callback 与 props / emit",
  label: "组件通信",
  description:
    "React 通过 props 向下传值，并把回调函数交给子组件；Vue 通常使用 props 和 emit 表达相同的数据流。",
  keywords: ["props", "callback", "emit", "父传子", "子传父", "组件通信"],
  Demo: ComponentCommunicationDemo,
  react: {
    fileName: "Parent.tsx",
    language: "TSX",
    syntax: "tsx",
    code: reactCode,
  },
  vue: {
    fileName: "Parent.vue / MessageInput.vue",
    language: "Vue SFC",
    syntax: "markup",
    code: vueCode,
  },
};
