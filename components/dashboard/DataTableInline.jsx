"use client";

import { useEffect, useState } from "react";
import { Save, Trash, Plus, X } from "lucide-react"; // Import Plus and X icons

export default function DataTableInline({
  data = [],
  columns = [],
  resourceTitle,
  isUpdate,
  handleDelete,
}) {
  const [rowData, setRowData] = useState(data);
  const [newRow, setNewRow] = useState(null); // State for new row data

  // Update rowData whenever the data prop changes
  useEffect(() => {
    setRowData(data);
  }, [data]);

  const handleAddNewRow = () => {
    setNewRow({}); // Initialize a new row with empty values
  };

  const handleInputChange = (e, column, id) => {
    const { value } = e.target;
    if (id) {
      // Update existing row data
      setRowData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, [column]: value } : item
        )
      );
    } else {
      // Update new row data
      setNewRow((prev) => ({ ...prev, [column]: value }));
    }
  };

  const handleSaveNewRow = async () => {
    const savedRow = await isUpdate(null, newRow, false);
    if (savedRow) {
      setRowData((prevData) => [...prevData, savedRow]); // Ensure savedRow is defined
    }
    setNewRow(null);
  };

  const handleCancelNewRow = () => {
    setNewRow(null); // Reset new row
  };

  const handleUpdateClick = async (id, updatedItem) => {
    const updatedRow = await isUpdate(id, updatedItem, true);
    if (updatedRow) {
      setRowData((prevData) =>
        prevData.map((item) => (item.id === id ? updatedRow : item))
      );
    }
  };

  const handleDeleteClick = async (id) => {
    await handleDelete(id); // Call the delete function passed as a prop
    setRowData((prevData) => prevData.filter((item) => item.id !== id)); // Remove the deleted row from state
  };
  console.log("Row Data:", rowData);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {rowData.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((columnName, i) => (
                <th key={i} scope="col" className="px-6 py-3">
                  {columnName}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((item) =>
              item ? (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {columns.map((columnName, i) => (
                    <td key={i} className="px-6 py-4">
                      <input
                        type="text"
                        name={columnName}
                        value={item[columnName] || ""} // Fallback to an empty string if undefined
                        onChange={(e) =>
                          handleInputChange(e, columnName, item.id)
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right flex items-center space-x-4">
                    <button
                      onClick={() => handleUpdateClick(item.id, item)}
                      className="text-blue-600 dark:text-blue-500 flex items-center space-x-1"
                    >
                      <Save className="w-4 h-4" />
                      <span>Update</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="text-red-600 dark:text-red-500 flex items-center space-x-1"
                    >
                      <Trash className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ) : null
            )}
            {newRow && (
              <tr className="bg-gray-100">
                {columns.map((columnName, i) => (
                  <td key={i} className="px-6 py-4">
                    <input
                      type="text"
                      name={columnName}
                      value={newRow[columnName] || ""}
                      onChange={(e) => handleInputChange(e, columnName)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
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
        <div className="flex justify-center py-4">
          <button
            onClick={handleAddNewRow}
            className="flex items-center space-x-1 text-blue-600 dark:text-blue-500"
          >
            <Plus className="w-6 h-6" />
            <span>Add New Row</span>
          </button>
        </div>
      )}
    </div>
  );
}
