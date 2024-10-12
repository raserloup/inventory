import React from "react";

import { getData } from "@/lib/getData";

import NewWarehouse from "../../new/page";

export default async function Update({ params: { id } }) {
  const data = await getData(`warehouse/${id}`); //Here We find the id
  console.log(data);
  return (
    <div>
      <h2>update form</h2>
      the warehouse id is :{id}
      <NewWarehouse initialDataById={data} isUpdate={true} />
    </div>
  );
}
