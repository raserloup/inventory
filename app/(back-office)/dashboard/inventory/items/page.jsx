import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import DataTable from "@/components/dashboard/DataTable";

export default async function Items() {
  const items = await getData("items");
  // const Item = items.map((obj) => {
  //   return {
  //     id: obj.id,
  //     title: obj.title,
  //     description: obj.description,
  //     sku: obj.sku,
  //     barcode: obj.barcode,
  //     quantity: obj.quantity,
  //     // sellingPrice: obj.sellingPrice,
  //     // buyingPrice: obj.buyingPrice,
  //     // reOrderPoint: obj.reOrderPoint,
  //     // imageUrl: obj.imageUrl,
  //     // weight: obj.weight,
  //     // dimensions: obj.dimensions,
  //     // taxRate: obj.taxRate,
  //     // notes: obj.notes,
  //   };
  // });

  const columns = [
    "title",
    "description",
    "sku",
    "barcode",
    "quantity",
    // "sellingPrice",
    // "buyingPrice",
    // "reOrderPoint",
    // "imageUrl",
    // "weight",
    // "dimensions",
    // "taxRate",
    // "notes",
  ];
  return (
    <div>
      {/*Header */}
      <FixedHeader title="Items" newLink="/dashboard/inventory/items/new" />
      {/*Table */}
      <div className="my-4 p-8">
        {/*<DataTable data={items} columns={columns} />*/}
        <DataTable data={items} columns={columns} resourceTitle="items" />
      </div>
    </div>
  );
}
