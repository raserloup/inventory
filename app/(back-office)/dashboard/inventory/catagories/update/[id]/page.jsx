import React from "react";

import { getData } from "@/lib/getData";
import NewCategory from "../../new/page";

export default async function Update({ params: { id } }) {
  const data = await getData(`catagories/${id}`); //This catagories/update/id
  console.log(data);
  return (
    <div>
      <h2>update form</h2>
      the catagories id is :{id}
      <NewCategory initialDataById={data} isUpdate={true} />
    </div>
  );
}
