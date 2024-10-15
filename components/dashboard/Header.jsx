"use client";
import {
  AlignJustify,
  Bell,
  ChevronDown,
  History,
  LayoutGrid,
  Plus,
  Settings,
  Users2,
} from "lucide-react";
import React from "react";
import SearchInput from "./SearchInput";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header({ setShowSidebar }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <p>loading User...</p>; //should have good component
  }
  if (status === "unauthenticated") {
    router.push("/login");
  }
  const username = session?.user?.name ?? "";
  {
    /*you can split the name name as below paused here 0:40:22 */
  }
  function handleClick() {
    console.log("Btn Clicked");
  }
  return (
    <div
      className="bg-gray-100 h-12 flex 
    items-center justify-between px-8 border-b
     border-slate-200 "
    >
      {/*when we press this three dot for small screen
        should show as side bar */}
      <button className="lg:hidden" onClick={() => setShowSidebar(true)}>
        <AlignJustify className="w-6 h-6" />
      </button>
      <div className="flex gap-3">
        {/*Recent activities */}
        <button className="hidden lg:block">
          <History className="w-6 h-6" />
        </button>
        {/*Search */}
        <SearchInput />
      </div>
      <div className=" items-center gap-3 hidden lg:flex">
        {/*Plus Icons - with ToolTip -*/}
        <div
          className="pr-2 border-r
         border-gray-300"
        >
          <button className="p-1 bg-blue-600 rounded-lg">
            <Plus
              className="text-slate-50
          w-4 h-4"
            />
          </button>
        </div>
        <div className="flex  border-gray-300 space-x-2">
          <button
            className="p-1 
          rounded-lg hover:bg-slate-200"
          >
            <Users2
              className="text-slate-900
          w-4 h-4"
            />
          </button>
          <button
            className="p-1 
          rounded-lg hover:bg-slate-200"
          >
            <Bell
              className="text-slate-900
          w-4 h-4"
            />
          </button>
          <button
            className="p-1 
          rounded-lg hover:bg-slate-200"
          >
            <Settings
              className="text-slate-900
          w-4 h-4"
            />
          </button>
        </div>
        {/* */}
        <div className="flex gap-3">
          <button className="flex items-center">
            <span>{username}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <button>
            <LayoutGrid
              className="w-6 h-6
             text-slate-900"
            />
          </button>
        </div>

        {/* */}
      </div>
      <button>
        <Image
          src="/user.jpg"
          alt="user image"
          width={2448}
          height={3264}
          className="w-8 h-9 rounded-full
              border border-slate-800 "
        />
      </button>
    </div>
  );
}
