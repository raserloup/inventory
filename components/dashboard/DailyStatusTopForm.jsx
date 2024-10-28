"use client";
import React, { useState, useEffect } from "react";

export default function DailyStatusTopForm({
  warehouses = [],
  resourceTitle,
  data = [],
}) {
  const [warehouse, setWarehouse] = useState("");
  const [date, setDate] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  // State for new row in modal
  const [newRow, setNewRow] = useState({
    warehouse: "",
    date: "",
    referenceNumber: "",
  });
  const [showNewRow, setShowNewRow] = useState(false); // Toggle modal visibility

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  // Counter to increment reference number
  const [counter, setCounter] = useState(0);

  // Update reference number when warehouse changes for new row
  useEffect(() => {
    if (newRow.warehouse) {
      const formattedCounter = String(counter).padStart(5, "0");
      setNewRow((prevRow) => ({
        ...prevRow,
        referenceNumber: `${newRow.warehouse}-${formattedCounter}`,
      }));
    }
  }, [newRow.warehouse, counter]);

  // Handle warehouse selection change
  const handleWarehouseChange = (e, index) => {
    const selectedWarehouse = e.target.value;
    setWarehouse(selectedWarehouse);
    setCounter((prevCounter) => prevCounter + 1);

    // Update the specific row in data
    if (data[index]) {
      data[index].warehouse = selectedWarehouse;
    }
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Determine current data for display
  const currentData = Array.isArray(data)
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil(
    (Array.isArray(data) ? data.length : 0) / itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Handle changes for the new row inside the modal
  const handleNewRowChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };

  // Toggle the modal visibility
  const toggleNewRow = () => {
    setShowNewRow(!showNewRow);
  };

  return (
    <div className="w-full flex flex-col items-center bg-white py-6 px-4 rounded-lg shadow-lg border-gray-500">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {resourceTitle || "Daily Status Form"}
      </h2>
      <div className="relative overflow-x-auto w-full border-gray-500">
        <table className="w-full text-sm text-left text-gray-600 border-gray-500">
          <tbody>
            {/* Map paginated data */}
            {currentData.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b border-gray-300 bg-orange-300 font-medium">
                  Warehouse:
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <select
                    value={row.warehouse || warehouse}
                    onChange={(e) => handleWarehouseChange(e, index)}
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-full p-1"
                  >
                    <option value="">Select Warehouse</option>
                    {warehouses.map((warehouse, idx) => (
                      <option key={idx} value={warehouse.title}>
                        {warehouse.title}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <input
                    type="date"
                    value={row.date || date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-full p-1"
                  />
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  <input
                    type="text"
                    value={row.referenceNumber || referenceNumber}
                    readOnly
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-full p-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            First
          </button>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Last
          </button>
          {currentPage === totalPages && (
            <button
              onClick={toggleNewRow}
              className="px-3 py-1 bg-green-500 text-white rounded ml-2"
            >
              New
            </button>
          )}
        </div>
      </div>

      {/* Modal for new row entry */}
      {showNewRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add New Entry</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Warehouse:
              </label>
              <select
                name="warehouse"
                value={newRow.warehouse}
                onChange={handleNewRowChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-full p-1"
              >
                <option value="">Select Warehouse</option>
                {warehouses.map((warehouse, idx) => (
                  <option key={idx} value={warehouse.title}>
                    {warehouse.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Date:
              </label>
              <input
                type="date"
                name="date"
                value={newRow.date}
                onChange={handleNewRowChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-full p-1"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Reference Number:
              </label>
              <input
                type="text"
                value={newRow.referenceNumber}
                readOnly
                className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-full p-1"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={toggleNewRow}
                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Logic for adding newRow to data
                  data.push(newRow); // Example addition
                  setShowNewRow(false); // Close modal
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
