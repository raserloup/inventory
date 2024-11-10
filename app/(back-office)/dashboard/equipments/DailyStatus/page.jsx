import DailyStatusTopForm from "@/components/dashboard/DailyStatusTopForm";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

export default async function DailyStatus() {
  const CategoriesData = getData(`catagories`);

  const warehouseData = getData(`warehouse`);

  const dailystatusTopData = getData(`TopdailyStatus`);

  const [Categories, Warehouse, dailystatusTop] = await Promise.all([
    CategoriesData,
    warehouseData,
    dailystatusTopData,
  ]);

  const TopColumns = ["warehouseId", "date", "refnumber" /*"id"*/];

  return (
    <div>
      <FixedHeader title="Daily Status" newLink="#" />

      <div className="my-4 p-8">
        <DailyStatusTopForm
          TopColumns={TopColumns}
          resourceTitle="TopdailyStatus"
          data={dailystatusTop}
          Warehouse={Warehouse}
          Categories={CategoriesData}
        />
      </div>
    </div>
  );
}
