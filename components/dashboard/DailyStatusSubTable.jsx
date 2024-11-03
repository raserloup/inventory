"use client";
import { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import { getData } from "@/lib/getData";
import {
  makePOSTRequest,
  makePUTRequest,
  makeDELETERequest,
} from "@/lib/apiRequest";
import Deletebtn from "./Deletebtn";

export default function DailyStatusInline({
  columns = [],
  resourceTitle,
  Categories = [], // Default to an empty array if Categories is undefined
  warehouse,
}) {
  const [rowData, setRowData] = useState([]); // Initialize as an empty array
  const [newRow, setNewRow] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getData("DailyStatus");
      setRowData(data || []); // Set to empty array if data is undefined
    } catch (error) {
      console.error("Error fetching data:", error);
      setRowData([]); // Reset rowData on error
    }
  };

  useEffect(() => {
    fetchData();
    // fetchCategories();
  }, []);

  const ownership = ["Owned", "Rented"];

  const handleSaveClick = async (id, updatedItem, isUpdate) => {
    if (!updatedItem.categoryId) {
      console.error("Category ID is required.");
      return;
    }
    try {
      if (isUpdate) {
        await makePUTRequest(
          setLoading,
          `api/${resourceTitle}/${updatedItem.id}`,
          updatedItem,
          resourceTitle
        );
      } else {
        await makePOSTRequest(
          setLoading,
          `api/${resourceTitle}`,
          updatedItem,
          resourceTitle
        );
      }
      await fetchData();
      console.log("dailyStatusData:", updatedItem);
      console.log("Fetched warehouse:", warehouse);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleInputChange = (e, column, id) => {
    const { value } = e.target;
    if (id) {
      setRowData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, [column]: value } : item
        )
      );
    } else {
      setNewRow((prev) => ({ ...prev, [column]: value }));
    }
  };

  const handleSaveNewRow = async () => {
    await handleSaveClick(null, newRow, false);
    setNewRow(null);
  };

  const handleCancelNewRow = () => {
    setNewRow(null);
  };

  const handleAddNewRow = () => {
    setNewRow({
      opqty: "",
      idelqty: "",
      downqty: "",
      remark: "",
      refnumber: "",
      ownership: ownership[0],
      categoryId: Categories.length > 0 ? Categories[0].id : null,
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center bg-white py-6 px-4 rounded-lg shadow-lg border-gray-500">
        <div className="relative overflow-x-auto w-full border-gray-500">
          {Array.isArray(rowData) && rowData.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-600 border-gray-500">
              <thead className="text-gray-600 uppercase bg-orange-300">
                <tr>
                  {columns.map((columnName, i) => (
                    <th key={i} className="px-4 py-2 border-b border-gray-300">
                      {columnName === "categoryId"
                        ? "Equipment Type"
                        : columnName}
                    </th>
                  ))}
                  <th className="px-4 py-2 border-b border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowData.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white hover:bg-orange-300 transition duration-200"
                  >
                    {columns.map((columnName, i) => (
                      <td
                        key={i}
                        className="px-2 py-2 border-b border-gray-200"
                      >
                        {columnName === "categoryId" ||
                        columnName === "ownership" ? (
                          <select
                            name={columnName}
                            value={item[columnName] || ""}
                            onChange={(e) =>
                              handleInputChange(e, columnName, item.id)
                            }
                            className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-full p-1"
                          >
                            {(columnName === "categoryId" &&
                            Categories.length > 0
                              ? Categories
                              : ownership
                            ).map((option, i) => (
                              <option
                                key={i}
                                value={
                                  columnName === "ownership"
                                    ? option
                                    : option.id
                                }
                              >
                                {columnName === "ownership"
                                  ? option
                                  : option.title || option.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            name={columnName}
                            value={item[columnName] || ""}
                            onChange={(e) =>
                              handleInputChange(e, columnName, item.id)
                            }
                            className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-24 p-1"
                          />
                        )}
                      </td>
                    ))}
                    {/* Actions column */}
                    <td className="px-2 py-2 text-right flex items-center space-x-2">
                      <button
                        onClick={() => handleSaveClick(item.id, item, true)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <Deletebtn
                        id={item.id}
                        endpoint={resourceTitle}
                        onDeleteSuccess={fetchData}
                      />
                    </td>
                  </tr>
                ))}
                {newRow && (
                  <tr className="bg-gray-100">
                    {columns.map((columnName, j) => (
                      <td key={j} className="px-6 py-4">
                        {columnName === "categoryId" ||
                        columnName === "ownership" ? (
                          <select
                            name={columnName}
                            value={newRow[columnName] || ""}
                            onChange={(e) => handleInputChange(e, columnName)}
                            className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-full p-1"
                          >
                            {(columnName === "categoryId" &&
                            Categories.length > 0
                              ? Categories
                              : ownership
                            ).map((option, i) => (
                              <option
                                key={i}
                                value={
                                  columnName === "ownership"
                                    ? option
                                    : option.id
                                }
                              >
                                {columnName === "ownership"
                                  ? option
                                  : option.title || option.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            name={columnName}
                            value={newRow[columnName] || ""}
                            onChange={(e) => handleInputChange(e, columnName)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                          />
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right flex items-center space-x-4">
                      <button
                        onClick={handleSaveNewRow}
                        className="text-blue-600 dark:text-blue-500 flex items-center space-x-1"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelNewRow}
                        className="text-red-600 dark:text-red-500 flex items-center space-x-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <p className="p-4 text-xl text-center">
              There is NO Data to Display
            </p>
          )}
          {!newRow && (
            <div className="flex justify-center items-center py-1 w-full">
              <button
                onClick={handleAddNewRow}
                className="px-3 py-1 bg-green-500 text-white rounded ml-2"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
