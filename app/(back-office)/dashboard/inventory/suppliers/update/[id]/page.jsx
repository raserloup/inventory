import React from "react";

import { getData } from "@/lib/getData";
import NewSupplier from "../../new/page";

export default async function Update({ params: { id } }) {
  const data = await getData(`suppliers/${id}`); //Here We find the id
  console.log(data);
  return (
    <div>
      <h2>update form</h2>
      the suppliers id is :{id}
      <NewSupplier initialDataById={data} isUpdate={true} />
    </div>
  );
}
