"use client";
import { useState } from "react";
import { Save } from "lucide-react";
import Deletebtn from "./Deletebtn";
export default function DataTableInline({
  data = [],
  columns = [],
  resourceTitle,
  onSave,
}) {
  const [rowData, setRowData] = useState(data);

  const handleSaveClick = async (id, updatedItem) => {
    if (onSave) {
      await onSave(id, updatedItem);
    }

    // Add a new blank row after saving
    setRowData((prevData) => [
      ...prevData.map((item) => (item.id === id ? updatedItem : item)),
      { id: Date.now(), title: "", idelqty: "", opqty: "", downqty: "" }, // New empty row
    ]);
  };

  const handleInputChange = (e, column, id) => {
    const { value } = e.target;
    setRowData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [column]: value } : item
      )
    );
  };

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
            {rowData.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {columns.map((columnName, i) => (
                  <td key={i} className="px-6 py-4">
                    <input
                      type="text"
                      name={columnName}
                      value={item[columnName]}
                      onChange={(e) =>
                        handleInputChange(e, columnName, item.id)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </td>
                ))}
                <td className="px-6 py-4 text-right flex items-center space-x-4">
                  <button
                    onClick={() => handleSaveClick(item.id, item)}
                    className="text-blue-600 dark:text-blue-500 flex items-center space-x-1"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <Deletebtn id={item.id} endpoint={resourceTitle} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="p-4 text-xl bg-white text-center">
          There is NO Data to Display
        </p>
      )}
    </div>
  );
}
