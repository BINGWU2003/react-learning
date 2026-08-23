import type { InjectionKey, Ref } from "vue";

export type User = {
  name: string;
  role: "访客" | "管理员";
};

export type UserContext = {
  user: Ref<User>;
  setName: (name: string) => void;
  toggleRole: () => void;
};

export const userKey: InjectionKey<UserContext> = Symbol("user-context");
