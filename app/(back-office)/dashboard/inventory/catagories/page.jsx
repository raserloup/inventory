import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import DataTable from "@/components/dashboard/DataTable";

export default async function Categories() {
  const categories = await getData("catagories");

  const columns = ["title", "description"];
  return (
    <div>
      {/*Header */}
      <FixedHeader
        title="Categories"
        newLink="/dashboard/inventory/catagories/new"
      />
      {/*Table */}
      <div className="my-4 p-8">
        <DataTable data={categories} columns={columns} />
      </div>
    </div>
  );
}
