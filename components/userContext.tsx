// create a context with user data including token etc

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import jwt from "jsonwebtoken";

interface UserContext {
  user: {
    username: string;
    token: string;
    isAuthenticated: boolean;
  };
  setUser: Dispatch<SetStateAction<UserContext["user"]>>;
}

const UserContext = createContext<UserContext>({
  user: {
    username: "",
    token: "",
    isAuthenticated: false,
  },
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContext["user"]>({
    username: "",
    token: "",
    isAuthenticated: false,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  return ctx;
};
