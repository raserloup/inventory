import React from "react";

import { getData } from "@/lib/getData";
import NewItem from "@/components/dashboard/NewItem";

export default async function Page() {
  const data = {};

  return (
    <div>
      <h2>New form</h2>
      <NewItem initialDataById={data} isUpdate={false} />
    </div>
  );
}
