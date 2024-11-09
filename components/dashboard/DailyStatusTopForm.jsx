"use client";
import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  Save,
  ChevronLast,
  ChevronRight,
  ChevronLeft,
  FilePlus2,
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
  // Categories,
}) {
  const [isAddingNewRow, setIsAddingNewRow] = useState(false);
  const [newRow, setNewRow] = useState(null);
  const [rowData, setRowData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const [CategoriesData, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData("TopdailyStatus");
        setRowData(fetchedData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setRowData([]);
      }
    };

    const fetchCategory = async () => {
      try {
        const data = await getData("catagories");
        setCategory(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
    fetchCategory();
  }, []);

  useEffect(() => {
    setCurrentPage(Math.ceil(rowData.length / itemsPerPage));
  }, [rowData]);

  const handleAddingNewRow = () => {
    setNewRow({
      warehouseId: "",
      date: "",
      refnumber: "",
    });
    setIsAddingNewRow(true);
  };

  const handleSaveClick = async (id, updatedItem, isUpdate) => {
    const endpoint = isUpdate
      ? `api/${resourceTitle}/${updatedItem.id}`
      : `api/${resourceTitle}`;
    const saveRequest = isUpdate ? makePUTRequest : makePOSTRequest;
    try {
      await saveRequest(setLoading, endpoint, updatedItem, resourceTitle);
      const updatedData = await getData("TopdailyStatus");
      setRowData(updatedData || []);
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
      const refNumber = generateIncrementedRefNumber(prefix);

      if (id) {
        setRowData((prevData) =>
          prevData.map((item) =>
            item.id === id
              ? { ...item, [column]: value, refnumber: refNumber }
              : item
          )
        );
      } else {
        setNewRow((prevRow) => ({
          ...prevRow,
          [column]: value,
          refnumber: refNumber,
        }));
      }
    } else {
      const updater = id ? setRowData : setNewRow;
      updater((prev) =>
        id
          ? prev.map((item) =>
              item.id === id ? { ...item, [column]: value } : item
            )
          : { ...prev, [column]: value }
      );
    }
  };

  const generateIncrementedRefNumber = (prefix) => {
    const existingNumbers = rowData
      .map((item) => item.refnumber)
      .filter((ref) => ref && ref.startsWith(prefix));
    const maxNumber = existingNumbers.reduce(
      (max, ref) => Math.max(max, parseInt(ref.slice(3), 10) || 0),
      0
    );
    return `${prefix}${String(maxNumber + 1).padStart(4, "0")}`;
  };

  const handleSaveNewRow = async () => {
    await handleSaveClick(null, newRow, false);
    setNewRow(null);
    setIsAddingNewRow(false);
  };

  const handleCancelNewRow = () => {
    setNewRow(null);
    setIsAddingNewRow(false);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [rowData]);

  const totalPages = Math.ceil(rowData.length / itemsPerPage);
  const currentData = rowData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(Math.min(Math.max(newPage, 1), totalPages));
  };

  return (
    <div className="w-full max-w-9xl mx-auto bg-white rounded-lg shadow-lg border border-gray-300 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {resourceTitle} Management
        </h2>
        <button
          onClick={handleAddingNewRow}
          className="flex items-center space-x-1 bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          <FilePlus2 className="w-4 h-4" />
          <span>New</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        {rowData.length > 0 ? (
          <table className="min-w-full text-sm text-left text-gray-700 border">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                {TopColumns.map((col, i) => (
                  <th key={i} className="px-6 py-3">
                    {col === "warehouseId" ? "Warehouse" : col}
                  </th>
                ))}
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isAddingNewRow ? (
                <tr className="bg-gray-50">
                  {TopColumns.map((col, i) => (
                    <td key={i} className="px-6 py-4">
                      {col === "warehouseId" ? (
                        <select
                          value={newRow[col] || ""}
                          onChange={(e) => handleInputChange(e, col)}
                          className="w-full bg-white border border-gray-300 rounded-md p-1"
                        >
                          <option value="">Select Warehouse</option>
                          {Warehouse.map((wh) => (
                            <option key={wh.id} value={wh.id}>
                              {wh.title}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={newRow[col] || ""}
                          onChange={(e) => handleInputChange(e, col)}
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
              ) : (
                currentData.map((item, i) => (
                  <React.Fragment key={i}>
                    <tr className="bg-white border-b hover:bg-gray-50">
                      {TopColumns.map((col, j) => (
                        <td key={j} className="px-5 py-3 whitespace-nowrap">
                          {col === "warehouseId" ? (
                            <select
                              value={item[col] || ""}
                              onChange={(e) =>
                                handleInputChange(e, col, item.id)
                              }
                              className="w-full bg-white border border-gray-300 rounded-md p-2"
                            >
                              <option value="">Select Warehouse</option>
                              {Warehouse.map((wh) => (
                                <option key={wh.id} value={wh.id}>
                                  {wh.title}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              value={item[col] || ""}
                              onChange={(e) =>
                                handleInputChange(e, col, item.id)
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
                          onDeleteSuccess={() =>
                            setRowData((prev) =>
                              prev.filter((data) => data.id !== item.id)
                            )
                          }
                        />
                      </td>
                    </tr>

                    {/* Inline Table for Each Item */}
                    <tr>
                      <td colSpan={TopColumns.length + 1} className="p-4">
                        <DailyStatusInline
                          Categories={CategoriesData}
                          columns={[
                            "topdailyStatusId",
                            "categoryId",
                            "ownership",
                            "opqty",
                            "idelqty",
                            "downqty",
                            "remark",
                            "refnumber",
                          ]}
                          resourceTitle="DailyStatus"
                          parentRefnumber={item.refnumber || ""}
                          parenttopdailyStatusId={item.id} // Pass the item's ID here
                        />
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No data available.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-4 mt-4">
          <button onClick={() => handlePageChange(1)}>
            <ChevronLast />
          </button>
          <button onClick={() => handlePageChange(currentPage - 1)}>
            <ChevronLeft />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => handlePageChange(currentPage + 1)}>
            <ChevronRight />
          </button>
          <button onClick={() => handlePageChange(totalPages)}>
            <ChevronLast />
          </button>
        </div>
      )}
    </div>
  );
}
