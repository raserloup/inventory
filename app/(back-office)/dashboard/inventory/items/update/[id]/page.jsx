import React from "react";

import { getData } from "@/lib/getData";

import NewItem from "../../new/page";

export default async function Update({ params: { id } }) {
  const data = await getData(`items/${id}`); //This item/update/id
  console.log(data);
  return (
    <div>
      <h2>update form</h2>
      the items id is :{id}
      <NewItem initialDataById={data} isUpdate={true} />
    </div>
  );
}
