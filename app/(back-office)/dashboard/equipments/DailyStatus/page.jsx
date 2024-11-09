// DailyStatusPage.js (Server Component)

import DailyStatusTopForm from "@/components/dashboard/DailyStatusTopForm";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

export default async function DailyStatus() {
  // const dailystatusData = await getData("DailyStatus");
  const CategoriesData = getData(`catagories`);

  const warehouseData = getData(`warehouse`);

  const dailystatusTopData = getData(`TopdailyStatus`);

  const [Categories, Warehouse, dailystatusTop] = await Promise.all([
    CategoriesData,
    warehouseData,
    dailystatusTopData,
  ]);

  const TopColumns = ["warehouseId", "date", "refnumber", "id"];
  // const columns = [
  //   "categoryId",
  //   "ownership",
  //   "opqty",
  //   "idelqty",
  //   "downqty",
  //   "remark",
  //   "refnumber",
  // ];
  return (
    <div>
      <FixedHeader title="Daily Status" newLink="#" />
      {/* <DailyStatusSubTable
        Categories={Categories}
        data={dailystatusData}
        columns={columns}
        resourceTitle="DailyStatus"
      /> */}
      <div className="my-4 p-8">
        <DailyStatusTopForm
          TopColumns={TopColumns}
          resourceTitle="TopdailyStatus"
          data={dailystatusTop}
          Warehouse={Warehouse}
          Categories={CategoriesData}
        />
      </div>
      {/* <DailyStatusForm
        TopColumns={TopColumns}
        resourceTitle="TopdailyStatus" // Set to the desired resource type
        data={dailystatusData} // Use `dailystatusData` or `dailystatusTop` based on `resourceTitle`
        Warehouse={Warehouse}
        Categories={Categories}
        columns={columns}
      /> */}
    </div>
  );
}
{
  /* <INDataTable
  data={DailyStatus}
  columns={columns}
  resourceName="DailyStatuss"
  /> */
  {
    /* <DailyStatusTable
      data={dailystatusData}
      columns={columns}
      resourceName="DailyStatus"
      /> */
    // warehouses={[
    //   { title: "Warehouse 1" },
    //   { title: "Warehouse 2" },
    //   { title: "Warehouse 3" },
    // ]}
    // data={[
    //   {
    //     warehouse: "Warehouse 1",
    //     date: "2024-10-29",
    //     referenceNumber: "W1-00001",
    //   },
    //   {
    //     warehouse: "Warehouse 2",
    //     date: "2024-10-30",
    //     referenceNumber: "W2-00002",
    //   },
    //   {
    //     warehouse: "Warehouse 3",
    //     date: "2024-10-30",
    //     referenceNumber: "W3-00003",
    //   },
    //   // other entries...
    // ]}
  }
}
