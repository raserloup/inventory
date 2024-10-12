import React from "react";
import { getData } from "@/lib/getData";
import NewUnit from "../../new/page";

export default async function Update({ params: { id } }) {
  const data = await getData(`units/${id}`); //Here We find ny id
  console.log(data);
  return (
    <div>
      <NewUnit initialDataById={data} isUpdate={true} />
    </div>
  );
}
