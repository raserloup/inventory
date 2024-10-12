import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import DataTable from "@/components/dashboard/DataTable";

export default async function Suppliers() {
  const Supplier = await getData("suppliers");
  const Suppliers = Supplier.map((obj) => {
    return {
      id: obj.id,
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
        <DataTable
          data={Suppliers}
          columns={columns}
          resourceTitle="suppliers"
        />
      </div>
    </div>
  );
}
