"use client";

import { useState, useEffect } from "react";
import { Link, Pencil, Plus, X, Save } from "lucide-react";
import { getData } from "@/lib/getData";
import { makePOSTRequest, makePUTRequest } from "@/lib/apiRequest";
import Deletebtn from "./Deletebtn";

export default function DailyStatusForm({
  data = [],
  TopColumns = [],
  columns = [],
  resourceTitle,
  Warehouse = [],
  Categories = [],
  ownership = ["Owned", "Rented"],
}) {
  const [rowData, setRowData] = useState(data);
  const [newRow, setNewRow] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const fetchedData = await getData(
        resourceTitle === "TopdailyStatus" ? "TopdailyStatus" : "DailyStatus"
      );
      setRowData(fetchedData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRowData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddNewRow = () => {
    setNewRow({
      warehouseId: "",
      categoryId: Categories.length > 0 ? Categories[0].id : null,
      ownership: ownership[0],
      date: "",
      refnumber: "",
    });
  };

  const handleSaveClick = async (id, updatedItem, isUpdate) => {
    if (resourceTitle === "DailyStatus" && !updatedItem.categoryId) {
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
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleInputChange = (e, column, id) => {
    const { value } = e.target;
    if (column === "warehouseId") {
      const selectedWarehouse = Warehouse.find(
        (warehouse) => warehouse.id === value
      );
      const prefix = selectedWarehouse
        ? selectedWarehouse.title.substring(0, 3).toUpperCase()
        : "";
      const incrementedValue = generateIncrementedRefNumber(prefix);

      if (id) {
        setRowData((prevData) =>
          prevData.map((item) =>
            item.id === id
              ? { ...item, [column]: value, refnumber: incrementedValue }
              : item
          )
        );
      } else {
        setNewRow((prevRow) => ({
          ...prevRow,
          [column]: value,
          refnumber: incrementedValue,
        }));
      }
    } else {
      if (id) {
        setRowData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, [column]: value } : item
          )
        );
      } else {
        setNewRow((prevRow) => ({ ...prevRow, [column]: value }));
      }
    }
  };

  const generateIncrementedRefNumber = (prefix) => {
    const existingNumbers = rowData
      .map((item) => item.refnumber)
      .filter((ref) => ref && ref.startsWith(prefix));

    const maxNumber = existingNumbers.reduce((max, ref) => {
      const numPart = parseInt(ref.slice(3), 10) || 0;
      return Math.max(max, numPart);
    }, 0);

    return `${prefix}${String(maxNumber + 1).padStart(4, "0")}`;
  };

  const handleSaveNewRow = async () => {
    await handleSaveClick(null, newRow, false);
    setNewRow(null);
  };

  const handleCancelNewRow = () => {
    setNewRow(null);
  };

  const displayedColumns =
    resourceTitle === "TopdailyStatus" ? TopColumns : columns;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {rowData.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {displayedColumns.map((columnName, i) => (
                <th key={i} scope="col" className="px-6 py-3">
                  {columnName === "warehouseId"
                    ? "Warehouse"
                    : columnName === "categoryId"
                    ? "Equipment Type"
                    : columnName}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {displayedColumns.map((columnName, i) => (
                  <td key={i} className="px-6 py-4">
                    {columnName === "warehouseId" ||
                    columnName === "categoryId" ||
                    columnName === "ownership" ? (
                      <select
                        name={columnName}
                        value={item[columnName] || ""}
                        onChange={(e) =>
                          handleInputChange(e, columnName, item.id)
                        }
                        className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-full p-1"
                      >
                        {(columnName === "categoryId"
                          ? Categories
                          : columnName === "ownership"
                          ? ownership
                          : Warehouse
                        ).map((option, i) => (
                          <option
                            key={i}
                            value={
                              columnName === "ownership" ? option : option.id
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
                <td className="px-6 py-4 text-right flex items-center space-x-4">
                  {resourceTitle.includes("TopdailyStatus") ? (
                    ""
                  ) : (
                    <Link
                      href={`/dashboard/equipments/${resourceTitle}/${item.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 flex items-center space-x-1"
                    >
                      <Pencil className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>
                  )}
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
                {displayedColumns.map((columnName, i) => (
                  <td key={i} className="px-6 py-4">
                    {columnName === "warehouseId" ||
                    columnName === "categoryId" ||
                    columnName === "ownership" ? (
                      <select
                        name={columnName}
                        value={newRow[columnName] || ""}
                        onChange={(e) => handleInputChange(e, columnName)}
                        className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-full p-1"
                      >
                        {(columnName === "categoryId"
                          ? Categories
                          : columnName === "ownership"
                          ? ownership
                          : Warehouse
                        ).map((option, i) => (
                          <option
                            key={i}
                            value={
                              columnName === "ownership" ? option : option.id
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
                        className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-24 p-1"
                      />
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 text-right flex items-center space-x-4">
                  <button
                    onClick={handleSaveNewRow}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCancelNewRow}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <p className="text-center py-4">No records available.</p>
      )}
      <button
        onClick={handleAddNewRow}
        className="mt-4 flex items-center space-x-1 text-blue-600"
      >
        <Plus className="w-5 h-5" />
        <span>Add New Row</span>
      </button>
    </div>
  );
}
