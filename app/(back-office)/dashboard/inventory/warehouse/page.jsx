import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import DataTable from "@/components/dashboard/DataTable";

export default async function Warehouses() {
  const warehouse = await getData("warehouse");

  const columns = ["title", "location", "description", "warehouseType"];
  return (
    <div>
      {/*Header */}
      <FixedHeader
        title="Warehouse"
        newLink="/dashboard/inventory/warehouse/new"
      />
      {/*Table */}
      <div className="my-4 p-8">
        <DataTable data={warehouse} columns={columns} />
      </div>
    </div>
  );
}
