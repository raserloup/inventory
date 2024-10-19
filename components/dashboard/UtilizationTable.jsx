"use client";
import { useState } from "react";
import DataTableInline from "@/components/dashboard/DataTableInline";

export default function UtilizationTable({ data }) {
  const [rowData, setRowData] = useState(data);

  const handleSaveClick = async (id, updatedItem) => {
    try {
      const response = await fetch(`/api/Utilizations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const savedData = await response.json();
      console.log("Saved data", savedData);

      // Optionally update the state if needed
      setRowData((prevData) =>
        prevData.map((item) => (item.id === id ? savedData : item))
      );
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <DataTableInline
      data={rowData}
      columns={["title", "idelqty", "opqty", "downqty"]}
      resourceTitle={"Utilizations"}
      onSave={handleSaveClick}
    />
  );
}
