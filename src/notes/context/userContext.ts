import { createContext, useContext } from "react";

export type User = {
  name: string;
  role: string;
  city: string;
};

export type UserContextValue = {
  user: User;
  updateUserName: (nextUserName: string) => void;
  switchUserRole: () => void;
};

export const UserContext = createContext<UserContextValue | null>(null);

export const useUser = () => {
  const contextValue = useContext(UserContext);

  if (contextValue === null) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return contextValue;
};
