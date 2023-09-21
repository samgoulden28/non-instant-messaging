"use client";
import { localStorageRefresher } from "@/utilities/client/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  username: string;
  token: string;
}

export const UserDisplay = () => {
  const [user, setUser] = useState<User>();
  useEffect(
    () =>
      localStorageRefresher("user", (e) => {
        console.log("e is", e);
        setUser(e ? JSON.parse(e) : "");
      }),
    [setUser]
  );
  return user?.username;
};
