import AdjustmentForm from "@/components/dashboard/AdjustmentFom";
import { getData } from "@/lib/getData";

export default async function NewAdjustments() {
  const itemsData = getData("items");
  const warehousesData = getData("warehouse");

  const [items, warehouse] = await Promise.all([itemsData, warehousesData]);
  return <AdjustmentForm items={items} warehouse={warehouse} />;
}
