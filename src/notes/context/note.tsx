import { lazy } from "react";
import type { NoteDefinition } from "../types";

const ContextDemo = lazy(() =>
  import("./ContextDemo").then((module) => ({ default: module.ContextDemo })),
);

const reactCode = `import { createContext, useContext, useState } from "react";

type User = { name: string };
type UserContextValue = {
  user: User;
  setName: (name: string) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({ name: "小明" });

  const setName = (name: string) => {
    setUser((current) => ({ ...current, name }));
  };

  return (
    <UserContext.Provider value={{ user, setName }}>
      {children}
    </UserContext.Provider>
  );
}

export function Profile() {
  const context = useContext(UserContext);
  if (!context) throw new Error("Missing UserProvider");

  return <p>{context.user.name}</p>;
}`;

const vueCode = `<!-- UserProvider.vue -->
<script setup lang="ts">
import { provide, reactive } from "vue";
import { userKey } from "./userKey";

const user = reactive({ name: "小明" });
const setName = (name: string) => {
  user.name = name;
};

provide(userKey, { user, setName });
</script>

<template>
  <slot />
</template>

<!-- Profile.vue -->
<script setup lang="ts">
import { inject } from "vue";
import { userKey } from "./userKey";

const context = inject(userKey);
if (!context) throw new Error("Missing provider");
</script>

<template>
  <p>{{ context.user.name }}</p>
</template>`;

export const contextNote: NoteDefinition = {
  path: "/context",
  title: "Context 与 provide / inject",
  label: "跨组件状态",
  description:
    "对比 React Context 和 Vue provide / inject 如何绕过逐层 props，共享同一份上下文数据。",
  keywords: ["context", "provide", "inject", "useContext", "跨组件"],
  Demo: ContextDemo,
  react: {
    fileName: "UserContext.tsx",
    language: "TSX",
    syntax: "tsx",
    code: reactCode,
  },
  vue: {
    fileName: "UserProvider.vue / Profile.vue",
    language: "Vue SFC",
    syntax: "markup",
    code: vueCode,
  },
};
