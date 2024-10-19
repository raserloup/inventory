"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { generateInitials } from "@/lib/generateInitials";
import { useState } from "react";
import ThemeLink from "./ThemeLink";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [show, setShow] = useState(false);

  const username = session?.user?.name ? session.user.name.split(" ")[0] : "";
  const initials = session?.user?.name
    ? generateInitials(session.user.name)
    : "";

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          Construction Inventory
        </Link>
        <button
          className="block sm:hidden ml-auto"
          onClick={() => setShow(!show)}
        >
          ☰
        </button>
        <div
          className={`sm:flex items-center space-x-4 ${
            show ? "block" : "hidden"
          }`}
        >
          <nav className="flex flex-col sm:flex-row items-center gap-3">
            <Link href="/">Home</Link>
            <Link href="#features">Features</Link>
            <Link href="#about">About Us</Link>
          </nav>
          {status === "authenticated" ? (
            <div className="flex items-center gap-4">
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {initials}
                </span>
              </div>
              <div className="font-medium dark:text-white">
                <div>{session.user.name}</div>
                <div className="text-sm text-slate-50 dark:text-slate-400">
                  {session.user.email}
                </div>
              </div>
              <button
                className="px-3 py-2 text-sm bg-rose-600 hover:bg-rose-700 focus:ring-red-300 shadow-lg rounded-lg transition"
                onClick={() => signOut()}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="px-3 py-2 text-sm bg-rose-600 hover:bg-rose-700 focus:ring-red-300 shadow-lg rounded-lg transition">
              <Link href="/login">Login</Link>
              <ThemeLink
                className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-300"
                title="Register"
                href="/register"
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
