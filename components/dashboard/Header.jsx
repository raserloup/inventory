import {
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

export default function Header() {
  return (
    <div
      className="bg-gray-100 h-12 flex 
    items-center justify-between px-8 border-b border-slate-200 "
    >
      <div className="flex gap-3">
        {/*Recent activities */}
        <button>
          <History className="w-6 h-6" />
        </button>
        {/*Search */}
        <SearchInput />
      </div>
      <div className="flex items-center gap-3">
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
            <span>Er.Studio</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button>
            <Image
              src="/user.jpg"
              alt="user image"
              width={2448}
              height={3264}
              className="w-8 h-9 rounded-full
              border border-slate-800"
            />
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
    </div>
  );
}
