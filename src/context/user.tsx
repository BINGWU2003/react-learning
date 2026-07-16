import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type User = {
  name: string;
  role: string;
  city: string;
};

type UserContextValue = {
  user: User;
  updateUserName: (nextUserName: string) => void;
  switchUserRole: () => void;
};

const defaultUser: User = {
  name: "小明",
  role: "访客",
  city: "杭州",
};

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  const contextValue = useMemo<UserContextValue>(() => {
    const updateUserName = (nextUserName: string) => {
      setUser((currentUser) => ({
        ...currentUser,
        name: nextUserName.trim() || defaultUser.name,
      }));
    };

    const switchUserRole = () => {
      setUser((currentUser) => ({
        ...currentUser,
        role: currentUser.role === "访客" ? "管理员" : "访客",
      }));
    };

    return {
      user,
      updateUserName,
      switchUserRole,
    };
  }, [user]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const contextValue = useContext(UserContext);

  if (contextValue === null) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return contextValue;
};
