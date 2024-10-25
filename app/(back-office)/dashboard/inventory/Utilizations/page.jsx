// UtilizationPage.js (Server Component)
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

import UtilizationTable from "@/components/dashboard/UtilizationTable";

export default async function Utilization() {
  const utilizationData = await getData("Utilizations");

  const columns = ["platenumber", "idelqty", , "opqty", "downqty", "refnumber"];
  return (
    <>
      <div>
        <FixedHeader
          title="Utilizations"
          newLink="#"
          // newLink=""/dashboard/inventory/Utilization/new
        />
        <div>This is the Utilization Table</div>

        <UtilizationTable
          data={utilizationData}
          columns={columns}
          resourceName="Utilizations"
        />
      </div>
    </>
  );
}
{
  /* <INDataTable
          data={Utilization}
          columns={columns}
          resourceName="Utilizations"
        /> */
}
