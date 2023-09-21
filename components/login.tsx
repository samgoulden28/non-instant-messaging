"use client";
import { useEffect, useState } from "react";
import { useUser } from "./userContext";
import jwt from "jsonwebtoken";
import { redirect, useRouter } from "next/navigation";
import {
  addItemToLocalStorage,
  removeItemFromLocalStorage,
} from "@/utilities/client/storage";

export default function Login() {
  const router = useRouter();
  const {
    user: { isAuthenticated, ...user },
    setUser,
  } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = JSON.parse(user || "{}")?.token;
    if (token) {
      // const decoded = jwt.verify(token, "your-secret-key"); // Use the same secret as in the backend
      // if (!decoded) {
      //   // kick them off
      //   removeItemFromLocalStorage("user");
      // }
    }
  }, [setUser]);

  const handleLogin = async () => {
    // Call API here
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
    });
    const data = await response.json();

    // In your login function after fetching the JWT
    if (data.token) {
      addItemToLocalStorage("token", data.token);
    }
    alert("Logged in!");
    addItemToLocalStorage("user", JSON.stringify(data));
    router.replace("/");
  };

  const handleLogout = () => {
    removeItemFromLocalStorage("token");
    setUser((user) => {
      return { ...user, isAuthenticated: false };
    });
  };

  if (isAuthenticated) {
    redirect("/");
  }

  return (
    <>
      {isAuthenticated ? (
        <button
          type="button"
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log out
        </button>
      ) : (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h5>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </a>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <a
                href="/create-account"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
