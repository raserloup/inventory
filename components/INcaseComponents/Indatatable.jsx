"use client";
import { makePOSTRequest, makePUTRequest } from "@/lib/apiRequest";
import React, { useEffect, useState } from "react";

export default function INDataTable({ data = [], columns = [], resourceName }) {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState(data);
  const [editData, setEditData] = useState({});
  const [inEditMode, setInEditMode] = useState({ status: false, rowKey: null });

  const onEdit = (item) => {
    setInEditMode({ status: true, rowKey: item.id });
    setEditData(item);
  };

  const updateInventory = async (NewDataToUpdate) => {
    try {
      let savedData;
      setLoading(true);
      if (NewDataToUpdate.id) {
        savedData = await makePUTRequest(
          setLoading,
          `api/DailyStatus/${NewDataToUpdate.id}`,
          NewDataToUpdate,
          "DailyStatus"
        );
      } else {
        savedData = await makePOSTRequest(
          setLoading,
          "api/DailyStatus",
          NewDataToUpdate,
          "DailyStatus"
        );
      }

      // Update the table data after a successful save
      setTableData((prevData) =>
        prevData.map((item) =>
          item.id === NewDataToUpdate.id ? savedData : item
        )
      );

      setInEditMode({ status: false, rowKey: null });
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSave = () => {
    if (editData) {
      updateInventory(editData);
    }
  };

  const onCancel = () => {
    setInEditMode({ status: false, rowKey: null });
    setEditData({});
  };

  const handleChange = (event, key) => {
    setEditData({ ...editData, [key]: event.target.value });
  };

  return (
    <div className="container">
      <h1>{resourceName || "Simple Inventory Table"}</h1>
      {loading && <p>Loading...</p>}
      <table>
        <thead>
          <tr>
            {columns.map((columnName, i) => (
              <th key={i} scope="col" className="px-6 py-3">
                {columnName}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tableData) && tableData.length > 0 ? (
            tableData.map((item) => (
              <tr key={item.id}>
                {columns.map((columnName) => (
                  <td key={columnName}>
                    {inEditMode.status && inEditMode.rowKey === item.id ? (
                      <input
                        value={editData[columnName] || ""}
                        onChange={(event) => handleChange(event, columnName)}
                      />
                    ) : (
                      item[columnName]
                    )}
                  </td>
                ))}
                <td>
                  {inEditMode.status && inEditMode.rowKey === item.id ? (
                    <>
                      <button className="btn-success" onClick={onSave}>
                        Save
                      </button>
                      <button
                        className="btn-secondary"
                        style={{ marginLeft: 8 }}
                        onClick={onCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn-primary"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
