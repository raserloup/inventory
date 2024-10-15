import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import DataTable from "@/components/dashboard/DataTable";

export default async function Adjustments() {
  const addAdjustmentsData = getData("adjustments/add");
  const transferAdjustmentsData = getData("adjustments/transfer");

  const [addAdjustments, transferAdjustments] = await Promise.all([
    addAdjustmentsData,
    transferAdjustmentsData,
  ]);
  const addcolumns = ["referenceNumber", "addStockQty", "createdAt"];
  const transfercolumns = ["referenceNumber", "transferStockQty", "createdAt"];
  return (
    <div>
      {/*Header */}
      <FixedHeader
        title="Adjustments"
        newLink="/dashboard/inventory/adjustments/new"
      />
      {/*Table */}
      <div className="my-4 p-8">
        <h2 className="border bottom-2  bg-slate-50 border-cyan-500 flex justify-between items-center py-4 font-semibold">
          Stock Increment Adjustment
        </h2>
        <DataTable
          data={addAdjustments}
          columns={addcolumns}
          resourceTitle="adjustments/add"
        />
      </div>
      <div className="my-4 p-8">
        <h2 className="border bottom-2 bg-slate-50 border-cyan-500 flex justify-between items-center py-4 font-semibold">
          Stock Transfer Adjustment
        </h2>
        <DataTable
          data={transferAdjustments}
          columns={transfercolumns}
          resourceTitle="adjustments/transfer"
        />
      </div>
    </div>
  );
}
