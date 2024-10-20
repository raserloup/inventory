import DashboardBanner from "@/components/dashboard/DashboardBanner";
import SalesOverview from "@/components/dashboard/SalesOverview";
import React from "react";
import CurrentStock from "@/components/dashboard/CurrentStock";
import { getData } from "@/lib/getData";

export default async function Dashboard() {
  const items = await getData("items");
  const warehouses = await getData("warehouse");

  return (
    <div>
      <DashboardBanner />
      <SalesOverview />
      <CurrentStock title="Available Stock items stock" items={items} />

      {warehouses.map((warehouse, i) => {
        return (
          <CurrentStock
            key={i}
            title={`Available Stock Items in ${warehouse.title}`}
            items={warehouse.items}
          />
        );
      })}
    </div>
  );
}
