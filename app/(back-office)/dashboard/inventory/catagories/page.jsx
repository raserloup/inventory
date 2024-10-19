import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import DataTable from "@/components/dashboard/DataTable";

export default async function Categories() {
  const Category = await getData("catagories");
  console.log(Category);
  const Catagories = Category.map((obj) => {
    return {
      id: obj.id,
      title: obj.title,
      description: obj.description,
    };
  });
  console.log(Catagories);
  const columns = ["title", "description"];
  return (
    <>
      {/*Header */}
      <FixedHeader
        title="catagories"
        newLink="/dashboard/inventory/catagories/new"
      />
      {/*Table */}
      <div className="my-4 p-8">
        <DataTable
          data={Catagories}
          columns={columns}
          resourceTitle="catagories"
        />
      </div>
    </>
  );
}
