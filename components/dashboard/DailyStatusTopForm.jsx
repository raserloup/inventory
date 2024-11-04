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
  const [isAddingNewRow, setIsAddingNewRow] = useState(false); // New state to track if adding a new row
  const [newRow, setNewRow] = useState(null);
  const [rowData, setRowData] = useState(data);
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
  const goToLastPage = (newRowData) => {
    const totalPages = Math.ceil(newRowData.length / itemsPerPage);
    setCurrentPage(totalPages);
  };

  useEffect(() => {
    fetchCategory();
    fetchData();
    fetchSubDailystatusData();
  }, []);
  useEffect(() => {
    goToLastPage(rowData);
  }, [rowData]);

  const handleAddingNewRow = () => {
    setNewRow({
      warehouseId: "",
      date: "",
      refnumber: "",
    });
    setIsAddingNewRow(true); // Set adding row mode to true
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
    setIsAddingNewRow(false); // Reset adding row mode after save
  };

  const handleCancelNewRow = () => {
    setNewRow(null);
    setIsAddingNewRow(false); // Reset adding row mode on cancel
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
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg border border-gray-300 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {resourceTitle} Management
        </h2>
        <p className="text-gray-500 text-sm">
          View, edit, and manage daily status records.
        </p>
        <button
          onClick={handleAddingNewRow}
          className="flex items-center space-x-1 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-blue-300"
        >
          <Plus className="w-4 h-4" />
          <span>Entry</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        {rowData.length > 0 ? (
          <table className="min-w-full text-sm text-left text-gray-700 border">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                {TopColumns.map((columnName, i) => (
                  <th key={i} scope="col" className="px-6 py-3">
                    {columnName === "warehouseId" ? "Warehouse" : columnName}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Render existing data rows */}
              {!isAddingNewRow &&
                currentData.map((item, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b hover:bg-gray-50 transition-colors"
                  >
                    {TopColumns.map((columnName, j) => (
                      <td key={j} className="px-5 py-3 whitespace-nowrap">
                        {columnName === "warehouseId" ? (
                          <select
                            name={columnName}
                            value={item[columnName] || ""}
                            onChange={(e) =>
                              handleInputChange(e, columnName, item.id)
                            }
                            className="w-full bg-white border border-gray-300 rounded-md p-2"
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
                            className="w-full bg-white border border-gray-300 rounded-md p-1"
                          />
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 flex justify-center space-x-3">
                      <button
                        onClick={() => handleSaveClick(item.id, item, true)}
                        className="text-green-600 hover:text-green-800"
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

              {/* New row for adding data */}
              {newRow && (
                <tr className="bg-gray-50">
                  {TopColumns.map((columnName, j) => (
                    <td key={j} className="px-6 py-4">
                      {columnName === "warehouseId" ? (
                        <select
                          name={columnName}
                          value={newRow[columnName] || ""}
                          onChange={(e) => handleInputChange(e, columnName)}
                          className="w-full bg-white border border-gray-300 rounded-md p-1"
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
                          className="w-full bg-white border border-gray-300 rounded-md p-1"
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 flex justify-center space-x-3">
                    <button
                      onClick={handleSaveNewRow}
                      className="text-green-600 hover:text-green-800 flex items-center space-x-1"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancelNewRow}
                      className="text-red-600 hover:text-red-800 flex items-center space-x-1"
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
          <p className="p-6 text-gray-600 text-center">
            There is no data to display.
          </p>
        )}
      </div>

      {/* Sub Table Component */}
      <div className="mt-8 w-full">
        <DailyStatusInline
          Categories={CategoriesData}
          data={rowData}
          columns={columns}
          resourceTitle="DailyStatus"
        />
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex space-x-2">
          <span className="px-3 py-1">Record:</span>
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400"
          >
            <ChevronLast className="w-4 h-4 transform rotate-180" />
          </button>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Editable Page Number Input */}
          <input
            type="number"
            value={currentPage}
            onChange={(e) => {
              let page = parseInt(e.target.value, 10);
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              } else if (page < 1) {
                setCurrentPage(1);
              } else if (page > totalPages) {
                setCurrentPage(totalPages);
              }
            }}
            className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center"
            min="1"
            max={totalPages}
          />

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400"
          >
            <ChevronLast className="w-4 h-4" />
          </button>
          <span className="px-3 py-1">{`of ${totalPages}`}</span>
        </div>
      </div>
    </div>
  );
}
