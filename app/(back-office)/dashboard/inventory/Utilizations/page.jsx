// UtilizationPage.js (Server Component)
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
import UtilizationTable from "@/components/dashboard/UtilizationTable";

export default async function Utilization() {
  const utilizationData = await getData("Utilizations");
  const Utilizations = utilizationData.map((obj) => ({
    id: obj.id,
    title: obj.title,
    idelqty: obj.idelqty,
    opqty: obj.opqty,
    downqty: obj.downqty,
  }));

  return (
    <>
      <div>
        <FixedHeader
          title="Utilization"
          newLink="/dashboard/inventory/Utilization/new"
        />
        <div>This is the Utilization Table</div>
        <UtilizationTable data={Utilizations} />
      </div>
    </>
  );
}
