import React from "react";
import SalesActivityCard from "./SalesActivityCard";
import InventorySummeryCard from "./InventorySummeryCard";
import { getData } from "@/lib/getData";

export default async function SalesOverview() {
  const CategoriesData = getData(`catagories`);
  const itemsData = getData(`items`);
  const warehousesData = getData(`warehouse`);
  const suppliersData = getData(`suppliers`);
  //console.log(suppliersData);
  //parallel Fetching=>more faster so use that
  const [categories, items, warehouses, suppliers] = await Promise.all([
    CategoriesData,
    itemsData,
    warehousesData,
    suppliersData,
  ]);

  const inventorySummery = warehouses.map((items, i) => {
    return {
      title: items.title,
      number: items.stockQty,
    };
  });

  const salesActivity = [
    {
      title: "Categories",
      number: categories.length,
      unit: "Qty",
      href: "/dashboard/inventory/catagories",
      color: "text-blue-600",
    },
    {
      title: "Items",
      number: items.length,
      unit: "Pkg's",
      href: "/dashboard/inventory/items",
      color: "text-green-600",
    },
    {
      title: "Warehouses",
      number: warehouses.length,
      unit: "Qty",
      href: "/dashboard/inventory/warehouse",
      color: "text-orange-600",
    },
    {
      title: "Suppliers",
      number: suppliers.length,
      unit: "Pkg's",
      href: "/dashboard/inventory/suppliers",
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
        className="col-span-full lg:col-span-8 border-r
         border-slate-300 p-8 py-16 lg:py-8"
      >
        <h2 className="mb-6 text-xl">Sales or Items Activity</h2>
        <div
          className=" pr-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
         gap-4"
        >
          {/* Card */}
          {salesActivity.map((item, i) => {
            {
              /* sales activity card component */
            }
            return <SalesActivityCard item={item} key={i} />;
          })}
        </div>
      </div>
      {/*Inventory summery*/}
      <div className="col-span-full lg:col-span-4 p-8">
        <h2 className="mb-6 text-xl">Stock Available Quantity</h2>
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
