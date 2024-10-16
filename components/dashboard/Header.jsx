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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect } from "react";
import SearchInput from "./SearchInput";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { generateInitials } from "@/lib/generateInitials";
import LoadingSpinner from "../auth/LoadingSpinner";

export default function Header({ setShowSidebar }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  // Safeguard against undefined session.user.name
  const username = session?.user?.name ? session.user.name.split(" ")[0] : "";
  const initials = session?.user?.name
    ? generateInitials(session.user.name)
    : "";

  function handleClick() {
    console.log("Btn Clicked");
  }

  return (
    <div className="bg-gray-100 h-12 flex items-center justify-between px-8 border-b border-slate-200">
      {/* Show sidebar button for small screens */}
      <button className="lg:hidden" onClick={() => setShowSidebar(true)}>
        <AlignJustify className="w-6 h-6" />
      </button>
      <div className="flex gap-3">
        {/* Recent activities */}
        <button className="hidden lg:block">
          <History className="w-6 h-6" />
        </button>
        {/* Search */}
        <SearchInput />
      </div>
      <div className="items-center gap-3 hidden lg:flex">
        {/* Plus Icons - with ToolTip */}
        <div className="pr-2 border-r border-gray-300">
          <button className="p-1 bg-blue-600 rounded-lg">
            <Plus className="text-slate-50 w-4 h-4" />
          </button>
        </div>
        <div className="flex border-gray-300 space-x-2">
          <button className="p-1 rounded-lg hover:bg-slate-200">
            <Users2 className="text-slate-900 w-4 h-4" />
          </button>
          <button className="p-1 rounded-lg hover:bg-slate-200">
            <Bell className="text-slate-900 w-4 h-4" />
          </button>
          <button className="p-1 rounded-lg hover:bg-slate-200">
            <Settings className="text-slate-900 w-4 h-4" />
          </button>

          {/*DropDown Menu */}
          <div className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  <span>{username}</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => signOut()}>
                  Logout
                </DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button>
              <LayoutGrid className="w-6 h-6 text-slate-900" />
            </button>
          </div>
        </div>
        {/*Image */}
        <button>
          {session?.user?.image ? (
            <Image
              src={session.user?.image}
              alt="user image"
              width={2448}
              height={3264}
              className="w-8 h-9 rounded-full border border-slate-800"
            />
          ) : (
            <div className="w-8 h-9 rounded-full border border-slate-800 bg-black text-white font-semibold">
              {initials}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
