import React from "react";
import { X, Save } from "lucide-react";

const AddRowModal = ({
  isOpen,
  onClose,
  onSave,
  TopColumns = [],
  Warehouse = [],
  newRowData,
  setNewRowData,
}) => {
  if (!isOpen) return null; // If modal is not open, render nothing

  const handleInputChange = (e, column) => {
    const { value } = e.target;
    setNewRowData((prevRow) => ({ ...prevRow, [column]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add New Row</h2>
        {TopColumns.map((columnName, j) => (
          <div key={j} className="mb-4">
            {columnName === "warehouseId" ? (
              <select
                name={columnName}
                value={newRowData[columnName] || ""}
                onChange={(e) => handleInputChange(e, columnName)}
                className="w-full bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 p-2"
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
                value={newRowData[columnName] || ""}
                onChange={(e) => handleInputChange(e, columnName)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 p-2"
              />
            )}
          </div>
        ))}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Save className="inline w-4 h-4 mr-1" />
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <X className="inline w-4 h-4 mr-1" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRowModal;
