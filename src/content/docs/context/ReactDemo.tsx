import { createContext, useContext, useState } from "react";

type User = {
  name: string;
  role: "访客" | "管理员";
};

type UserContextValue = {
  user: User;
  setName: (name: string) => void;
  toggleRole: () => void;
};

const UserContext = createContext<UserContextValue | null>(null);

function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("Missing UserProvider");
  return context;
}

function UserProfile() {
  const { user } = useUser();
  return (
    <div className="demo-card">
      <span className="demo-tag">Consumer A</span>
      <h2>{user.name}</h2>
      <p>当前角色：{user.role}</p>
    </div>
  );
}

function UserActions() {
  const { user, setName, toggleRole } = useUser();
  return (
    <div className="demo-form">
      <label className="demo-field">
        Consumer B 修改用户名
        <input
          className="demo-input"
          value={user.name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <div className="demo-actions">
        <button className="demo-button" type="button" onClick={toggleRole}>
          切换角色
        </button>
      </div>
    </div>
  );
}

export function ReactDemo() {
  const [user, setUser] = useState<User>({ name: "小明", role: "访客" });

  const value: UserContextValue = {
    user,
    setName: (name) =>
      setUser((current) => ({ ...current, name: name || "小明" })),
    toggleRole: () =>
      setUser((current) => ({
        ...current,
        role: current.role === "访客" ? "管理员" : "访客",
      })),
  };

  return (
    <UserContext.Provider value={value}>
      <div className="demo-stack">
        <UserProfile />
        <UserActions />
      </div>
    </UserContext.Provider>
  );
}
