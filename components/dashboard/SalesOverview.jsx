import React from "react";
import SalesActivityCard from "./SalesActivityCard";
import InventorySummeryCard from "./InventorySummeryCard";

export default function SalesOverview() {
  const inventorySummery = [
    {
      title: "Quantity in Hand",
      number: 10,
    },
    {
      title: "Quantity to be received",
      number: 0,
    },
  ];
  const salesActivity = [
    {
      title: "To be Packed",
      number: "0",
      unit: "Qty",
      href: "#",
      color: "text-blue-600",
    },
    {
      title: "To be Shipped",
      number: "0",
      unit: "Pkgs",
      href: "#",
      color: "text-green-600",
    },
    {
      title: "To be Invoiced",
      number: "0",
      unit: "Qty",
      href: "#",
      color: "text-orange-600",
    },
    {
      title: "To be Delivered",
      number: "0",
      unit: "Pkgs",
      href: "#",
      color: "text-red-600",
    },
  ];
  return (
    <div
      className="bg-blue-50 border-b
     border-slate-300 p-8 grid grid-cols-12 gap-4"
    >
      {/*sales activity*/}
      <div
        className="col-span-8 border-r
         border-slate-300 p-8"
      >
        <h2 className="mb-6 text-xl">Sales Activity</h2>
        <div
          className=" pr-8 grid grid-cols-4 
         gap-4"
        >
          {salesActivity.map((item, i) => {
            {
              /* sales activity card component */
            }
            return <SalesActivityCard item={item} key={i} />;
          })}
        </div>
      </div>
      {/*Inventory summery*/}
      <div className="col-span-4 p-8">
        <h2 className="mb-6 text-xl">Inventory summery</h2>
        <div className="">
          {inventorySummery.map((item, i) => {
            {
              /*Inventory summery card component*/
            }
            return <InventorySummeryCard item={item} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}
