"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CollapsibleLink from "./collapsibleLink";
import { ChevronRight } from "lucide-react";

export default function SidebarDropdownLink({
  title,
  items,
  icon,
  setShowSidebar,
}) {
  const Icon = icon;
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex justify-between items-center w-full">
        <div className="p-2 flex items-center space-x-2">
          <Icon className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <div>
          <ChevronRight className="w-4 h-4" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {items.map((item, i) => {
          return (
            <CollapsibleLink
              setShowSidebar={setShowSidebar}
              key={i}
              href={item.href}
              title={item.title}
            />
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
