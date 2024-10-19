import DataTable from "@/components/dashboard/DataTable";

export default function CurrentStock({ title, items }) {
  const columns = ["title", "quantity"];
  return (
    <div className="bg-pink-30 p-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="my-4">
        <DataTable data={items} columns={columns} resourceTitle="items" />
      </div>
    </div>
  );
}
