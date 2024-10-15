import CreateItemForm from "@/components/dashboard/CreateItemForm";
import FormHeader from "@/components/dashboard/FormHeader";
import { getData } from "@/lib/getData";

export default async function NewItem({
  initialDataById = {},
  isUpdate = false,
}) {
  //sequential Fetching => waterfall step by step
  const CategoriesData = getData(`catagories`);
  //console.log(CategoriesData);
  const unitsData = getData(`units`);
  const brandsData = getData(`brands`);
  const warehousesData = getData(`warehouse`);
  const suppliersData = getData(`suppliers`);
  //console.log(suppliersData);
  //parallel Fetching=>more faster so use that
  const [Categories, units, brands, warehouses, suppliers] = await Promise.all([
    CategoriesData,
    unitsData,
    brandsData,
    warehousesData,
    suppliersData,
  ]);
  return (
    <div>
      {/*Header */}
      <FormHeader
        title={isUpdate ? "Update Item" : "New Item"}
        href="/dashboard/inventory/items"
      />
      {/*Form */}
      <CreateItemForm
        Categories={Categories}
        suppliers={suppliers}
        warehouses={warehouses}
        brands={brands}
        units={units}
        initialDataById={initialDataById}
        isUpdate={isUpdate} //change it isUpdate if issue appear
      />
    </div>
  );
}
