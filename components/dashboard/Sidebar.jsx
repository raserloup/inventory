"use client";
import {
  BaggageClaim,
  BarChart4,
  Cable,
  ChevronLeft,
  Files,
  Home,
  ShoppingBag,
  ShoppingCart,
  X,
} from "lucide-react";
import Link from "next/link";
import SubscriptionCard from "./SubscriptionCard";

import SidebarDropdownLink from "./SidebarDropdownLink";

export default function Sidebar({ showSidebar, setShowSidebar }) {
  //console.log(showSidebar);
  const inventoryLinks = [
    {
      title: "DailyStaus",
      href: "/dashboard/inventory/dailystatus",
    },
    {
      title: "All Items",
      href: "/dashboard/inventory/",
    },
    {
      title: "Items",
      href: "/dashboard/inventory/items",
    },
    {
      title: "Categories",
      href: "/dashboard/inventory/catagories",
    },
    {
      title: "Utilization",
      href: "/dashboard/inventory/Utilizations",
    },
    {
      title: "Brands",
      href: "/dashboard/inventory/brands",
    },
    {
      title: "Units",
      href: "/dashboard/inventory/units",
    },
    {
      title: "Warehouse",
      href: "/dashboard/inventory/warehouse",
    },
    {
      title: "Inventory Adjustment",
      href: "/dashboard/inventory/adjustments",
    },
    {
      title: "Supplier",
      href: "/dashboard/inventory/suppliers",
    },
  ];
  const SalesLinks = [
    {
      title: "Customers",
      href: "#",
    },
    {
      title: "Sales orders",
      href: "#",
    },
    {
      title: "Packages",
      href: "#",
    },
    {
      title: "Shipments",
      href: "#",
    },
    {
      title: "Invoices",
      href: "#",
    },
    {
      title: "Sales Recites",
      href: "#",
    },
    {
      title: "Payment Received",
      href: "#",
    },
    {
      title: "Sales returns",
      href: "#",
    },
    {
      title: "Credit Notes",
      href: "#",
    },
  ];
  return (
    <div
      className={`${
        showSidebar
          ? "w-60 min-h-screen bg-slate-800 text-slate-50  justify-between fixed lg:block z-50"
          : "w-60 min-h-screen bg-slate-800 text-slate-50 justify-between fixed hidden lg:block z-50"
      }`}
    >
      {/* Top Part*/}
      <div className="flex flex-col">
        {/* Inventory Logo */}
        <div className="flex justify-between">
          <Link
            href="#"
            className="bg-slate-950 
        flex space-x-2 
        items-center py-3 px-2 w-full"
          >
            <ShoppingCart />
            <span className=" text-x1 font-semibold">Inventory</span>
          </Link>
          <button
            className="py-3 px-4 bg-slate-950 lg:hidden"
            onClick={() => setShowSidebar(false)}
          >
            <X className="h-6 w-6 text-white " />
          </button>
        </div>
        {/*  Links */}
        <nav className="flex flex-col gap-3 px-3 py-6">
          <Link
            href="/dashboard/home/overview"
            className="flex items-center space-x-2
             bg-blue-600 text-slate-50 p-2 rounded-md"
            onClick={() => setShowSidebar(false)}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          {/*  Collapsible Inventory*/}
          <SidebarDropdownLink
            items={inventoryLinks}
            title="Inventory"
            icon={BaggageClaim}
            setShowSidebar={setShowSidebar}
          />
          {/*  Collapsible Sales*/}
          <SidebarDropdownLink
            items={SalesLinks}
            title="Sales"
            icon={ShoppingBag}
          />
          <button className=" p-2 flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4" />
            <span>Purchases</span>
          </button>
          <Link href="#" className="p-2 flex items-center space-x-2">
            <Cable className="w-4 h-4" />
            <span>Integrations</span>
          </Link>
          <Link href="#" className="p-2  flex items-center space-x-2">
            <BarChart4 className="w-4 h-4" />
            <span>Report</span>
          </Link>
          <Link href="#" className="p-2 flex items-center space-x-2">
            <Files className="w-4 h-4" />
            <span>Documents</span>
          </Link>
        </nav>
        <SubscriptionCard />
      </div>
      {/*  Bottom */}
      <div className="flex flex-col ">
        <button
          className="bg-slate-950 
        flex space-x-2 
        items-center justify-center py-3 px-2 "
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <ChevronLeft />
        </button>
      </div>
      {/*  Subscription Card */}
      {/*  Footer Icon */}
    </div>
  );
}
