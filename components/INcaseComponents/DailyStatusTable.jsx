"use client";
import { useState, useEffect } from "react";
import DataTableInline from "@/components/INcaseComponents/DataTableInline";
import {
  makePOSTRequest,
  makePUTRequest,
  makeDELETERequest,
} from "@/lib/apiRequest";
import { getData } from "@/lib/getData";

export default function DailyStatusTable({
  data = [],
  columns = [],
  resourceTitle,
}) {
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState(data);

  const fetchData = async () => {
    const data = await getData("DailyStatus");
    setRowData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveClick = async (id, updatedItem, isUpdate) => {
    try {
      if (isUpdate) {
        await makePUTRequest(
          setLoading,
          `api/DailyStatus/${updatedItem.id}`,
          updatedItem,
          "DailyStatus"
        );
      } else {
        await makePOSTRequest(
          setLoading,
          "api/DailyStatus",
          updatedItem,
          "DailyStatus"
        );
      }
      await fetchData(); // Refresh data after save
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await makeDELETERequest(
        setLoading,
        `api/DailyStatus?id=${id}`,
        "DailyStatus",
        () => {}
      );
      await fetchData(); // Refresh data after delete
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <DataTableInline
      data={rowData}
      columns={columns}
      resourceTitle={resourceTitle}
      isUpdate={handleSaveClick}
      handleDelete={handleDeleteClick}
    />
  );
}
