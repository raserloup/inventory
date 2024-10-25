"use client";
import { useState, useEffect } from "react";
import DataTableInline from "@/components/dashboard/DataTableInline";
import {
  makePOSTRequest,
  makePUTRequest,
  makeDELETERequest,
} from "@/lib/apiRequest";
import { getData } from "@/lib/getData";

export default function UtilizationTable({
  data = [],
  columns = [],
  resourceTitle,
}) {
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState(data);

  const fetchData = async () => {
    const data = await getData("Utilizations");
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
          `api/Utilizations/${updatedItem.id}`,
          updatedItem,
          "Utilizations"
        );
      } else {
        await makePOSTRequest(
          setLoading,
          "api/Utilizations",
          updatedItem,
          "Utilizations"
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
        `api/Utilizations?id=${id}`,
        "Utilizations",
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
