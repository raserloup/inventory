import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DataTable({ data, columns }) {
  {
    /*const headerTitles = Object.keys(data[0]);*/
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((columnName, i) => {
              return (
                <th key={i} scope="col" className="px-6 py-3">
                  {columnName}
                </th>
              );
            })}
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {columns.map((columnName, i) => {
                  return (
                    <td key={i} className="px-6 py-4">
                      {/*  item['title']==item.title*/}
                      {item[columnName]}
                    </td>
                  );
                })}
                <td className="px-6 py-4 text-right flex items-center space-x-4 ">
                  <Link
                    href="#"
                    className="font-medium text-blue-600 
                  dark:text-blue-500  flex items-center space-x-1"
                  >
                    <Pencil className="w-4 h-4" />
                    {/*<span>Edit</span>*/}
                  </Link>
                  <button
                    className="font-medium text-red-600 
                  dark:text-red-500 flex items-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    {/*<span>Delete</span>*/}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
