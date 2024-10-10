import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import DataTable from "@/components/dashboard/DataTable";

export default async function Suppliers() {
  const suppliers = await getData("suppliers");
  const data = suppliers.map((obj) => {
    return {
      title: obj.title,
      phone: obj.phone,
      email: obj.email,
    };
  });

  const columns = ["title", "phone", "email"];
  return (
    <div>
      {/*Header */}
      <FixedHeader
        title="suppliers"
        newLink="/dashboard/inventory/suppliers/new"
      />
      {/*Table */}
      <div className="my-4 p-8">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
}
