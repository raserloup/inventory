import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import DataTable from "@/components/dashboard/DataTable";

export default async function Brands() {
  const brands = await getData("brands");

  const columns = ["title", "createdAt", "updateAt"];
  return (
    <div>
      {/*Header */}
      <FixedHeader title="Brands" newLink="/dashboard/inventory/brands/new" />
      {/*Table */}
      <div className="my-4 p-8">
        <DataTable data={brands} columns={columns} resourceTitle="brands" />
      </div>
    </div>
  );
}
