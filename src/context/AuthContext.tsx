import React, { createContext, useState, type ReactNode } from "react";
import type { CurrentUser } from "@/types/auth/auth.types";

type AuthContextType = {
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;

  user: CurrentUser | null;
  setUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const [user, setUser] = useState<CurrentUser | null>(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  return (
    <AuthContext.Provider value={{ userToken, setUserToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
