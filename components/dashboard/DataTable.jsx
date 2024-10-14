import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Deletebtn from "./Deletebtn";

export default function DataTable({ data = [], columns = [], resourceTitle }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/*if data.length>0 show table other wise at the below show their is not data available */}
      {data.length > 0 ? (
        //* Here if you change the table w-full to w-auto to fixed the size with grabbed data */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                  {/* {columns.map((columnName, i) => {
                  return (
                    <td key={i} className="px-6 py-4">
                      {item[columnName]}
                    </td>
                  );
                })} */}
                  {columns.map((columnName, i) => (
                    <td key={i} className="px-6 py-4">
                      {columnName.includes(".") ? (
                        // If the column name contains a dot, it's a nested object
                        // Access the nested key using reduce
                        columnName
                          .split(".")
                          .reduce((obj, key) => obj[key], item)
                      ) : columnName === "createdAt" || //createdAt & updateAt must much with database name
                        columnName === "updateAt" ? (
                        // Convert date columns to a more readable format
                        new Date(item[columnName]).toLocaleDateString()
                      ) : columnName === "imageUrl" ? (
                        // Special handling for imageUrl to render an image
                        <img
                          src={item[columnName]}
                          alt={`Image for ${resourceTitle}`}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      ) : (
                        // Otherwise, display the value as is
                        item[columnName]
                      )}
                    </td>
                  ))}

                  <td className="px-6 py-4 text-right flex items-center space-x-4">
                    <Link
                      href={`/dashboard/inventory/${resourceTitle}/update/${item.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 flex items-center space-x-1"
                    >
                      <Pencil className="w-4 h-4" />
                      <span>Edit</span>
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
      ) : (
        <p className="p-4 text-xl bg-white text-center">
          There is NO Data to Display
        </p>
      )}
    </div>
  );
}
