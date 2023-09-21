"use client";
import {
  localStorageRefresher,
  removeItemFromLocalStorage,
} from "@/utilities/client/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export const LoginButtons = () => {
  const [token, setToken] = useState("");
  const router = useRouter();
  useEffect(
    () =>
      localStorageRefresher("user", (e) =>
        setToken(e ? JSON.parse(e).token : "")
      ),
    [token]
  );

  // check localStorage for token, if got one, present the logout button
  return token ? (
    <button
      onClick={() => {
        removeItemFromLocalStorage("user");
        router.replace("/login");
      }}
    >
      Logout
    </button>
  ) : (
    <>
      <Link href="/login">Login</Link>
      <Link href="/create-user">Create User</Link>
    </>
  );
};
