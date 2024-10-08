"use client";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function HomeNavbar() {
  const pathname = usePathname();

  const navLinks = [
    {
      title: "Dashboard",
      href: "/dashboard/home/overview",
    },
    {
      title: "Getting Stated",
      href: "/dashboard/home/getting-started",
    },
    {
      title: "Recent Updates",
      href: "/dashboard/home/updates",
    },
    {
      title: "Announcement",
      href: "/dashboard/home/announcements",
    },
  ];
  return (
    <div
      className="h-32 p-5
    header-bg bg-slate-50 border-b border-slate-300 "
    >
      {/* this header-bg if a function from main.scss for the background i used*/}
      <div className="flex space-x-3">
        <div
          className="flex w-12 h-12 rounded-lg
         bg-white items-center justify-center"
        >
          <Building2 />
        </div>
        <div className="flex flex-col">
          <p className="text-slate-700 font-semibold">
            Hello, Ermi WEBDEVELOPER
          </p>
          <span className="text-sm">Er.Studio</span>
        </div>
      </div>
      <nav className="sticky mt-6 flex space-x-4 ">
        {navLinks.map((item, i) => {
          return (
            <Link
              key={i}
              href={item.href}
              className={`${
                pathname === item.href
                  ? "py-1 border-b-2 border-blue-600"
                  : "py-1"
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
