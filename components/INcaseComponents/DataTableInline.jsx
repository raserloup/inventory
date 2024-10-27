"use client";

import { useEffect, useState } from "react";
import { Save, Trash, Plus, X } from "lucide-react";

export default function DataTableInline({
  data = [],
  columns = [],
  resourceTitle,
  isUpdate,
  handleDelete,
}) {
  const [rowData, setRowData] = useState(data);
  const [newRow, setNewRow] = useState(null);

  useEffect(() => {
    setRowData(data);
  }, [data]);

  const handleAddNewRow = () => {
    setNewRow({});
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
    const savedRow = await isUpdate(null, newRow, false);
    if (savedRow) {
      setRowData((prevData) => [...prevData, savedRow]);
    }
    setNewRow(null);
  };

  const handleCancelNewRow = () => {
    setNewRow(null);
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
    await handleDelete(id);
    setRowData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full flex flex-col items-center bg-white py-6 px-4 rounded-lg shadow-lg">
      <div className="relative overflow-x-auto w-full">
        {rowData.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-blue-100">
              <tr>
                {columns.map((columnName, i) => (
                  <th key={i} className="px-4 py-2 border-b border-gray-300">
                    {columnName}
                  </th>
                ))}
                <th className="px-4 py-2 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((item) =>
                item ? (
                  <tr
                    key={item.id}
                    className="bg-white hover:bg-gray-50 transition duration-200"
                  >
                    {columns.map((columnName, i) => (
                      <td
                        key={i}
                        className="px-2 py-2 border-b border-gray-200"
                      >
                        <input
                          type="text"
                          name={columnName}
                          value={item[columnName] || ""}
                          onChange={(e) =>
                            handleInputChange(e, columnName, item.id)
                          }
                          className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-24 p-1"
                        />
                      </td>
                    ))}
                    <td className="px-2 py-2 text-right flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateClick(item.id, item)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ) : null
              )}

              {newRow && (
                <tr className="bg-gray-100">
                  {columns.map((columnName, i) => (
                    <td key={i} className="px-2 py-2 border-b border-gray-200">
                      <input
                        type="text"
                        name={columnName}
                        value={newRow[columnName] || ""}
                        onChange={(e) => handleInputChange(e, columnName)}
                        className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 block w-24 p-1"
                      />
                    </td>
                  ))}
                  <td className="px-2 py-2 text-right flex items-center space-x-2">
                    <button
                      onClick={handleSaveNewRow}
                      className="text-blue-600 hover:text-blue-800 transition flex items-center"
                    >
                      <Save className="w-4 h-4" />
                      {/* <span className="ml-1">Save</span> */}
                    </button>
                    <button
                      onClick={handleCancelNewRow}
                      className="text-red-600 hover:text-red-800 transition flex items-center"
                    >
                      <X className="w-4 h-4" />
                      {/* <span className="ml-1">Cancel</span> */}
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-xl text-center">There is NO Data to Display</p>
        )}
        {!newRow && (
          <div className="flex justify-center py-4">
            <button
              onClick={handleAddNewRow}
              className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
