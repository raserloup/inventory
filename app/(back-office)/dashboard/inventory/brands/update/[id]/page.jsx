import React from "react";
import NewBrand from "../../new/page";
import { getData } from "@/lib/getData";

export default async function Update({ params: { id } }) {
  const data = await getData(`brands/${id}`); //Here We find ny id
  console.log(data);
  return (
    <div>
      <h2>update form</h2>
      the Brand id is :{id}
      <NewBrand initialDataById={data} isUpdate={true} />
    </div>
  );
}
