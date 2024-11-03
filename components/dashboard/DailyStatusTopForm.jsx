"use client";
import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  Save,
  ChevronLast,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Deletebtn from "./Deletebtn";
import { getData } from "@/lib/getData";
import { makePOSTRequest, makePUTRequest } from "@/lib/apiRequest";
import DailyStatusInline from "./DailyStatusSubTable";

export default function DailyStatusTopForm({
  data = [],
  TopColumns = [],
  resourceTitle,
  Warehouse,
  Categories,
}) {
  const [rowData, setRowData] = useState(data);
  const [newRow, setNewRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Adjust items per page as needed
  const [CategoriesData, setCategory] = useState([]);

  // const CategoriesData = getData(`catagories`);

  const fetchCategory = async () => {
    try {
      const data = await getData("catagories");
      setCategory(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    console.log("this is category Data:", data);
  };
  const columns = [
    "categoryId",
    "ownership",
    "opqty",
    "idelqty",
    "downqty",
    "remark",
    "refnumber",
  ];
  const fetchSubDailystatusData = async () => {
    try {
      const dailystatusData = await getData("DailyStatus");
    } catch (error) {
      console.error("Error the sub daily status data fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const fetchedData = await getData("TopdailyStatus");
      setRowData(fetchedData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRowData([]);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchData();
    fetchSubDailystatusData();
  }, []);

  const handleAddNewRow = () => {
    setNewRow({
      warehouseId: "",
      date: "",
      refnumber: "",
    });
  };

  const handleSaveClick = async (id, updatedItem, isUpdate) => {
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

    const newNumber = maxNumber + 1;
    return `${prefix}${String(newNumber).padStart(4, "0")}`;
  };

  const handleSaveNewRow = async () => {
    await handleSaveClick(null, newRow, false);
    setNewRow(null);
  };

  const handleCancelNewRow = () => {
    setNewRow(null);
  };

  // Pagination Controls
  const totalPages = Math.ceil(rowData.length / itemsPerPage);
  const currentData = rowData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {rowData.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {TopColumns.map((columnName, i) => (
                <th key={i} scope="col" className="px-6 py-3">
                  {columnName === "warehouseId" ? "warehouse" : columnName}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, i) => (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {TopColumns.map((columnName, j) => (
                  <td key={j} className="px-6 py-4">
                    {columnName === "warehouseId" ? (
                      <select
                        name={columnName}
                        value={item[columnName] || ""}
                        onChange={(e) =>
                          handleInputChange(e, columnName, item.id)
                        }
                        className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-full p-1"
                      >
                        <option value="">Select Warehouse</option>
                        {Warehouse.map((warehouse) => (
                          <option key={warehouse.id} value={warehouse.id}>
                            {warehouse.title}
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
                {TopColumns.map((columnName, j) => (
                  <td key={j} className="px-6 py-4">
                    {columnName === "warehouseId" ? (
                      <select
                        name={columnName}
                        value={newRow[columnName] || ""}
                        onChange={(e) => handleInputChange(e, columnName)}
                        className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-full p-1"
                      >
                        <option value="">Select Warehouse</option>
                        {Warehouse.map((warehouse) => (
                          <option key={warehouse.id} value={warehouse.id}>
                            {warehouse.title}
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
        <p className="p-4 text-xl bg-white text-center">
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
      {/* Here i provided the SubTable Component */}

      <DailyStatusInline
        Categories={CategoriesData}
        data={rowData}
        columns={columns}
        resourceTitle="DailyStatus"
      />

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2 mt-4">
        <span className="px-3 py-1">Record:</span>

        {/* First Page Button */}
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          <ChevronLast className="w-4 h-4 transform rotate-180" />
        </button>

        {/* Previous Page Button */}
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Current Page Number */}
        <span className="px-3 py-1">{`${currentPage} `}</span>

        {/* Next Page Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page Button */}
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          <ChevronLast className="w-4 h-4" />
        </button>

        <span className="px-3 py-1">{`of ${totalPages}`}</span>
      </div>
    </div>
  );
}
