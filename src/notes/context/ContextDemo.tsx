import { ChangeEvent } from "react";
import { useUser } from "./userContext";
import { UserProvider } from "./UserProvider";

const UserProfileCard = () => {
  const { user } = useUser();

  return (
    <section className="demo-copy dynamic-copy">
      <p className="eyebrow">useContext Consumer A</p>
      <h2>用户信息展示</h2>
      <p>当前用户：{user.name}</p>
      <p>当前角色：{user.role}</p>
      <p>所在城市：{user.city}</p>
    </section>
  );
};

const UserActionPanel = () => {
  const { user, updateUserName, switchUserRole } = useUser();

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateUserName(event.target.value);
  };

  return (
    <section className="demo-copy dynamic-copy">
      <p className="eyebrow">useContext Consumer B</p>
      <h2>跨组件修改 Context</h2>
      <p>
        这里和左侧展示组件没有父子传值关系，但它们都通过
        <code>useUser()</code> 读取同一份 Context。
      </p>
      <label>
        用户名：
        <input value={user.name} onChange={handleUserNameChange} />
      </label>
      <button onClick={switchUserRole}>切换角色</button>
    </section>
  );
};

export function ContextDemo() {
  return (
    <UserProvider>
      <div className="demo-grid">
        <UserProfileCard />
        <UserActionPanel />
      </div>
    </UserProvider>
  );
}
