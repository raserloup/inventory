"use client";
import FixedHeader from "@/components/dashboard/FixedHeader";
import OptionCard from "@/components/dashboard/OptionCard";
import {
  Diff,
  Factory,
  LayoutGrid,
  LayoutPanelTop,
  Scale,
  Slack,
  Warehouse,
} from "lucide-react";

import React from "react";

export default function Inventory() {
  const optionCards = [
    {
      title: "Items",
      description: "Create standalone items and services that you buy and sell",
      link: "/dashboard/inventory/items/new",
      linkTitle: "New Item",
      enabled: true,
      icon: LayoutGrid,
    },
    {
      title: "Catagories",
      description: "Create standalone items and services that you buy and sell",
      link: "/dashboard/inventory/catagories/new",
      linkTitle: "New category",
      enabled: true,
      icon: LayoutPanelTop,
    },
    {
      title: "Brands",
      description:
        "Tweak your item prices for specific contacts or transactions",
      link: "/dashboard/inventory/brands/new",
      linkTitle: "New brands",
      enabled: true,
      icon: Slack,
    },
    {
      title: "warehouse",
      description: "Create standalone items and services that you buy and sell",
      link: "/dashboard/inventory/warehouse/new",
      linkTitle: "New ware house",
      enabled: true,
      icon: Warehouse,
    },
    {
      title: "Units",
      description: "Create standalone items and services that you buy and sell",
      link: "/dashboard/inventory/units/new",
      linkTitle: "New units",
      enabled: true,
      icon: Scale,
    },
    {
      title: "Suppliers",
      description: "Create standalone items and services that you buy and sell",
      link: "/dashboard/inventory/suppliers/new",
      linkTitle: "New Suppliers",
      enabled: true,
      icon: Factory,
    },
    {
      title: "Inventory Adjustment",
      description: "Transfer Stock from the main Warehouse",
      link: "/dashboard/inventory/adjustments/new",
      linkTitle: "New Adjustment",
      enabled: true,
      icon: Diff,
    },
  ];

  return (
    <div className="bg-slate-50">
      <FixedHeader newLink="/dashboard/inventory/items/new" />
      {/* the div is responsible for mapping the option cards*/}
      {/* For small screen only show one Grid "grid-cols-1 "*/}
      {/* For Medium screen only show two Grid "grid-cols-2"*/}
      {/* For Big screen only show three Grid "grid-cols-3"*/}
      <div
        className="grid grid-cols-1 lg:grid-cols-3 
     md:grid-cols-2 py-8 px-16 gap-6 "
      >
        {/* Card */}
        {optionCards.map((card, i) => {
          return <OptionCard optionData={card} key={i} />;
        })}
      </div>
    </div>
  );
}
