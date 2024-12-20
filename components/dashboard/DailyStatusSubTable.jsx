"use client";
import { useState, useEffect } from "react";
import { FilePenLine, Save } from "lucide-react";
import { getData } from "@/lib/getData";
import {
  makePOSTRequest,
  makePUTRequest,
  makeDELETERequest,
} from "@/lib/apiRequest";
import Deletebtn from "./Deletebtn";

export default function DailyStatusInline({
  columns = [],
  resourceTitle,
  Categories = [],
  warehouse,
  parentRefnumber,
  parenttopdailyStatusId,
}) {
  const [rowData, setRowData] = useState([]);
  const [newRow, setNewRow] = useState({
    opqty: "",
    idelqty: "",
    downqty: "",
    remark: "",
    refnumber: parentRefnumber || "",
    topdailyStatusId: parenttopdailyStatusId || "",
    ownership: "Owned",
    categoryId: Categories.length > 0 ? Categories[0].id : null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (parenttopdailyStatusId) {
      fetchData(); // Fetches data specific to the current topdailyStatusId
    }
  }, [parenttopdailyStatusId]);

  const [noData, setNoData] = useState(false); // New state to handle no data condition

  const fetchData = async () => {
    try {
      const data = await getData(
        `DailyStatus/parentId/${parenttopdailyStatusId}`
      );
      if (data && data.length > 0) {
        setRowData(data);
        setNoData(false);
      } else {
        setRowData([]);
        setNoData(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setRowData([]);
      setNoData(true);
    }
  };

  useEffect(() => {
    setNewRow((prev) => ({ ...prev, refnumber: parentRefnumber || "" }));
  }, [parentRefnumber]);

  useEffect(() => {
    setNewRow((prev) => ({
      ...prev,
      topdailyStatusId: parenttopdailyStatusId || "",
    }));
  }, [parenttopdailyStatusId]);

  const ownership = ["Owned", "Rented"];

  const handleSaveClick = async (id, updatedItem, isUpdate) => {
    if (!updatedItem.categoryId) {
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
    await handleSaveClick(null, newRow, false);
    setNewRow({
      opqty: "",
      idelqty: "",
      downqty: "",
      remark: "",
      refnumber: parentRefnumber || "",
      topdailyStatusId: parenttopdailyStatusId || "",
      ownership: "Owned",
      categoryId: Categories.length > 0 ? Categories[0].id : null,
    });
  };

  return (
    <div className="min-w-full text-sm text-left text-gray-700 border">
      {Array.isArray(rowData) && rowData.length > 0 ? (
        <table className="min-w-full text-sm text-left text-gray-700 border">
          <thead className="text-gray-700 bg-gray-100">
            <tr>
              {columns.map((columnName, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-5 py-2 border border-gray-200 text-sm"
                >
                  {columnName === "categoryId" ? "Equipment Type" : columnName}
                </th>
              ))}
              <th className="px-4 py-2 border border-gray-300 text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((item) => (
              <tr
                key={item.id}
                className="bg-white hover:bg-gray-100 transition"
              >
                {columns.map((columnName, i) => (
                  <td
                    key={i}
                    className="px-5 py-2 border border-gray-200 text-sm"
                  >
                    {columnName === "categoryId" ||
                    columnName === "ownership" ? (
                      <select
                        name={columnName}
                        value={item[columnName] || ""}
                        onChange={(e) =>
                          handleInputChange(e, columnName, item.id)
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-orange-500 p-2 w-auto text-sm"
                      >
                        {(columnName === "categoryId" && Categories.length > 0
                          ? Categories
                          : ownership
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
                        className="bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 w-full p-1 text-sm"
                      />
                    )}
                  </td>
                ))}
                <td className="px-3 py-2 border border-gray-200 text-center">
                  <button
                    onClick={() => handleSaveClick(item.id, item, true)}
                    className="text-green-500 hover:text-green-700 transition"
                  >
                    <FilePenLine className="w-4 h-4 inline-block" />
                  </button>
                  <Deletebtn
                    id={item.id}
                    endpoint={resourceTitle}
                    onDeleteSuccess={fetchData}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="p-4 text-lg text-gray-500 text-center">
          No data available to display, you can insert your data
        </p>
      )}

      {/* Add New Row */}
      <table className="min-w-full text-sm text-left text-gray-700 border">
        <tbody>
          <tr className="bg-gray-50 hover:bg-gray-100 transition">
            {columns.map((columnName, j) => (
              <td key={j} className="px-5 py-2 border border-gray-200 text-sm">
                <div className="mb-1 text-sm text-center text-gray-500">
                  {/* Title for the column */}
                  {columnName === "categoryId" ? "Equipment Type" : columnName}
                </div>
                {columnName === "categoryId" || columnName === "ownership" ? (
                  <select
                    name={columnName}
                    value={newRow[columnName] || ""}
                    onChange={(e) => handleInputChange(e, columnName)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-orange-500 p-1 text-sm"
                  >
                    {(columnName === "categoryId" && Categories.length > 0
                      ? Categories
                      : ownership
                    ).map((option, i) => (
                      <option
                        key={i}
                        value={columnName === "ownership" ? option : option.id}
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
                    className="bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 w-full p-1 text-sm"
                  />
                )}
              </td>
            ))}
            <td className="px-3 py-2 text-center">
              <button
                onClick={handleSaveNewRow}
                className="text-orange-500 hover:text-green-700 transition"
              >
                <Save className="w-4 h-4 inline-block" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
