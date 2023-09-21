"use client";
import CreateUser from "@/components/createUser";
import { LoggedInHome } from "@/components/loggedInHome";
import Login from "@/components/login";
import { UserProvider } from "@/components/userContext";
import jwt from "jsonwebtoken";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="flex justify-between w-screen p-24">
        <UserProvider>
          <LoggedInHome />
          <CreateUser />
        </UserProvider>
      </div>
    </main>
  );
}
