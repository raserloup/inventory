import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import DataTable from "@/components/dashboard/DataTable";

export default async function Unites() {
  const units = await getData("units");

  const columns = ["title", "abbreviation"];
  return (
    <div>
      {/*Header */}
      <FixedHeader title="units" newLink="/dashboard/inventory/units/new" />
      {/*Table */}
      <div className="my-4 p-8">
        <DataTable data={units} columns={columns} resourceTitle="units" />
      </div>
    </div>
  );
}
