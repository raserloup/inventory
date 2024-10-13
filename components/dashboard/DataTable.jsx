import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import Deletebtn from "./Deletebtn";

export default function DataTable({ data = [], columns = [], resourceTitle }) {
  {
    /*const headerTitles = Object.keys(data[0]);*/
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      {/* Here if you change the table w-full to w-auto to fixed the size with grabbed data */}
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
                    href={`/dashboard/inventory/${resourceTitle}/update/${item.id}`}
                    className="font-medium text-blue-600 
                  dark:text-blue-500  flex items-center space-x-1"
                  >
                    <Pencil className="w-4 h-4" />
                    {/*<span>Edit</span>*/}
                  </Link>
                  {/*Here i make the delete btn as component 
                   b/c it's an event handler so that it has to use "use Client" */}
                  <Deletebtn id={item.id} endpoint={resourceTitle} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
