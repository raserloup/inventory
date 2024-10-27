// DailyStatusPage.js (Server Component)
import DailyStatusSubTable from "@/components/dashboard/DailyStatusSubTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

export default async function DailyStatus() {
  const dailystatusData = await getData("DailyStatus");
  const CategoriesData = getData(`catagories`);
  const [Categories] = await Promise.all([CategoriesData]);

  const columns = [
    // "equipment Type",
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
      <FixedHeader
        title="Daily Status"
        newLink="#"
        // newLink=""/dashboard/inventory/DailyStatus/new
      />
      <DailyStatusSubTable
        Categories={Categories}
        data={dailystatusData}
        columns={columns}
        resourceTitle="DailyStatus"
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
  }
}
