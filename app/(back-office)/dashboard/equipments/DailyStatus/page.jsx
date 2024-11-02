// DailyStatusPage.js (Server Component)
import DailyStatusSubTable from "@/components/dashboard/DailyStatusSubTable";
import DailyStatusTopForm from "@/components/dashboard/DailyStatusTopForm";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

export default async function DailyStatus() {
  const dailystatusData = await getData("DailyStatus");
  const CategoriesData = getData(`catagories`);
  const [Categories] = await Promise.all([CategoriesData]);
  const warehouseData = getData(`warehouse`);
  const [Warehouse] = await Promise.all([warehouseData]);
  const dailystatusTopData = getData(`TopdailyStatus`);
  const [dailystatusTop] = await Promise.all([dailystatusTopData]);

  const TopColumns = ["warehouseId", "date", "refnumber"];
  const columns = [
    "categoryId",
    "ownership",
    "opqty",
    "idelqty",
    "downqty",
    "remark",
    "refnumber",
  ];
  return (
    <div>
      <FixedHeader title="Daily Status" newLink="#" />
      <DailyStatusSubTable
        Categories={Categories}
        data={dailystatusData}
        columns={columns}
        resourceTitle="DailyStatus"
      />
      <DailyStatusTopForm
        TopColumns={TopColumns}
        resourceTitle="TopdailyStatus"
        data={dailystatusTop}
        Warehouse={Warehouse}
      />
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
