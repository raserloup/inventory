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
  ChevronFirst,
} from "lucide-react";
import Deletebtn from "./Deletebtn";
import { getData } from "@/lib/getData";
import { makePOSTRequest, makePUTRequest } from "@/lib/apiRequest";
import DailyStatusInline from "./DailyStatusSubTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DailyStatusTopForm({
  data = [],
  TopColumns = [],
  resourceTitle,
  Warehouse,
}) {
  const [isAddingNewRow, setIsAddingNewRow] = useState(false);
  const [newRow, setNewRow] = useState(null);
  const [rowData, setRowData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const [CategoriesData, setCategory] = useState([]);
  const [filterDate, setFilterDate] = useState(null); // Filter date state
  const [filterRefNumber, setFilterRefNumber] = useState(""); // Filter refnumber state

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

  const handleDateChange = (date) => {
    if (newRow) {
      const isoDate = date ? date.toISOString() : "";
      setNewRow((prevRow) => ({ ...prevRow, date: isoDate }));
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [rowData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(Math.min(Math.max(newPage, 1), totalPages));
  };
  const handleDateFilterChange = (date) => {
    setFilterDate(date);
    setCurrentPage(1); // Reset to first page when filter changes
  };
  const handleRefNumberFilterChange = (e) => {
    setFilterRefNumber(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const filteredData = rowData.filter((item) => {
    const matchesDate =
      !filterDate ||
      (item.date &&
        new Date(item.date).toDateString() === filterDate.toDateString());
    const matchesRefNumber =
      !filterRefNumber ||
      (item.refnumber && item.refnumber.includes(filterRefNumber));
    return matchesDate && matchesRefNumber;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full max-w-9xl mx-auto bg-white rounded-lg shadow-lg border border-gray-300 p-6">
      <div className="flex flex-col sm:flex-row justify-between bg-gradient-to-r from-blue-500 via-red-300 to-blue-500 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-lg font-semibold text-white mb-4 sm:mb-0 sm:text-xl">
          {resourceTitle} Management
        </h2>

        {/* Filters by date and ref number */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
          {/* Date Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-white">
              Filter by Date:
            </span>
            <DatePicker
              selected={filterDate}
              onChange={handleDateFilterChange}
              className="bg-white border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              dateFormat="yyyy-MM-dd"
              isClearable
              placeholderText="Select date"
            />
          </div>

          {/* RefNumber Filter */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-sm font-medium text-white">
              Filter by RefNumber:
            </span>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                value={filterRefNumber}
                onChange={handleRefNumberFilterChange}
                className="w-full sm:w-48 bg-white border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter refnumber"
              />
              {filterRefNumber && (
                <button
                  onClick={() => setFilterRefNumber("")} // Clear filter
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-teal-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* New Row Button */}
        <button
          onClick={handleAddingNewRow}
          //   className="flex items-center space-x-2  px-4 py-2 text-white rounded-lg text-sm hover:scale-105 transition-transform duration-200 ease-in-out shadow-lg mt-4 sm:mt-0"
          className="p-1 bg-blue-600 rounded-sm
         px-4 flex items-center space-x-2 text-white shadow-lg mt-4 sm:mt-0 hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          <FilePlus2 className="w-4 h-4" />
          <span className="text-sm">New</span>
        </button>
      </div>

      {/* Table with filtered data */}
      <div className="overflow-x-auto">
        {filteredData.length > 0 ? (
          <table className="min-w-full text-sm text-left text-gray-700 border">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                {TopColumns.map((col, i) => (
                  <th key={i} className="px-6 py-3 text-sm">
                    {col === "warehouseId" ? "Warehouse" : col}
                  </th>
                ))}
                <th className="px-6 py-3 text-sm text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isAddingNewRow ? (
                <tr className="bg-white border-b hover:bg-gray-50">
                  {TopColumns.map((col, i) => (
                    <td key={i} className="px-5 py-3 text-sm whitespace-nowrap">
                      {col === "warehouseId" ? (
                        <select
                          value={newRow[col] || ""}
                          onChange={(e) => handleInputChange(e, col)}
                          className="w-full bg-white border border-gray-300 rounded-md p-2 text-sm"
                        >
                          <option value="">Select Warehouse</option>
                          {Warehouse.map((wh) => (
                            <option key={wh.id} value={wh.id}>
                              {wh.title}
                            </option>
                          ))}
                        </select>
                      ) : col === "date" ? (
                        <DatePicker
                          selected={newRow.date ? new Date(newRow.date) : null}
                          onChange={handleDateChange}
                          className="w-full bg-white border border-gray-300 rounded-md p-2 text-sm"
                          dateFormat="yyyy-MM-dd"
                        />
                      ) : (
                        <input
                          type="text"
                          value={newRow[col] || ""}
                          onChange={(e) => handleInputChange(e, col)}
                          className="w-full bg-white border border-gray-300 rounded-md p-1 text-sm"
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 flex justify-center space-x-3">
                    <button
                      onClick={handleSaveNewRow}
                      className="text-green-600 hover:text-green-800 flex items-center space-x-1 text-sm"
                    >
                      <Save className="w-4 h-4" />
                      <span className="text-sm">Save</span>
                    </button>
                    <button
                      onClick={handleCancelNewRow}
                      className="text-red-600 hover:text-red-800 flex items-center space-x-1 text-sm"
                    >
                      <X className="w-4 h-4" />
                      <span className="text-sm">Cancel</span>
                    </button>
                  </td>
                </tr>
              ) : (
                currentData.map((item, i) => (
                  <React.Fragment key={i}>
                    <tr className="bg-white border-b hover:bg-gray-50">
                      {TopColumns.map((col, j) => (
                        <td
                          key={j}
                          className="px-5 py-3 text-sm whitespace-nowrap"
                        >
                          {col === "warehouseId" ? (
                            <select
                              value={item[col] || ""}
                              onChange={(e) =>
                                handleInputChange(e, col, item.id)
                              }
                              className="w-full bg-white border border-gray-300 rounded-md p-2 text-sm"
                            >
                              <option value="">Select Warehouse</option>
                              {Warehouse.map((wh) => (
                                <option key={wh.id} value={wh.id}>
                                  {wh.title}
                                </option>
                              ))}
                            </select>
                          ) : col === "date" ? (
                            <DatePicker
                              selected={item.date ? new Date(item.date) : null}
                              onChange={(date) =>
                                handleInputChange(
                                  { target: { value: date } },
                                  col,
                                  item.id
                                )
                              }
                              className="w-full bg-white border border-gray-300 rounded-md p-2 text-sm"
                              dateFormat="yyyy-MM-dd"
                            />
                          ) : (
                            <input
                              type="text"
                              value={item[col] || ""}
                              onChange={(e) =>
                                handleInputChange(e, col, item.id)
                              }
                              className="w-full bg-white border border-gray-300 rounded-md p-1 text-sm"
                            />
                          )}
                        </td>
                      ))}
                      <td className="px-6 py-4 flex justify-center space-x-3 text-sm">
                        <button
                          onClick={() => handleSaveClick(item.id, item, true)}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <Deletebtn
                          data={rowData}
                          setData={setRowData}
                          id={item.id}
                          title="TopdailyStatus"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={TopColumns.length + 1}>
                        <DailyStatusInline
                          Categories={CategoriesData}
                          columns={[
                            // { title: "Id", field: "topdailyStatusId" },
                            //"topdailyStatusId",
                            "categoryId",
                            "ownership",
                            "opqty",
                            "idelqty",
                            "downqty",
                            "remark",
                            // "refnumber",
                          ]}
                          resourceTitle="DailyStatus"
                          parentRefnumber={item.refnumber || ""}
                          parenttopdailyStatusId={item.id}
                        />
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-700 py-6">
            No data available for selected date.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-4 text-sm">
        <button onClick={() => handlePageChange(1)} className="text-gray-500">
          <ChevronFirst />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="text-gray-500"
        >
          <ChevronLeft />
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="text-gray-500"
        >
          <ChevronRight />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="text-gray-500"
        >
          <ChevronLast />
        </button>
      </div>
    </div>
  );
}
