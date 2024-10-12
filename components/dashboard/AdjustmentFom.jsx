"use client";

import FormHeader from "@/components/dashboard/FormHeader";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import TransferInventoryForm from "./TransferInventoryForm";
import AddInventoryForm from "./AddInventoryForm";

export default function AdjustmentForm({ items, warehouse }) {
  const tabs = [
    {
      title: "Add Stock",
      icon: Plus,
      form: "add",
    },
    {
      title: "Transfer Stock",
      icon: Minus,
      form: "transfer",
    },
  ];
  const [activeForm, SetActiveForm] = useState("add");
  return (
    <div>
      {/*Header */}
      <FormHeader
        title="New Adjustments"
        href="/dashboard/inventory/adjustments"
      />

      {/*Tabs */}

      <div
        className="border-b border-gray-200
       dark:border-gray-700 w-full max-w-4xl px-4 py-2
        bg-white border mx-auto my-4 shadow rounded"
      >
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <li className="me-2" key={i}>
                <button
                  onClick={() => SetActiveForm(tab.form)}
                  className={`${
                    activeForm === tab.form
                      ? "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                      : "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <Icon
                    className="w-4 h-4 me-2
                   text-gray-400
                    group-hover:text-gray-500
                     dark:text-gray-500
                      dark:group-hover:text-gray-300"
                  />
                  {tab.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {/*Form */}
      {activeForm === "add" ? (
        <AddInventoryForm items={items} warehouse={warehouse} />
      ) : (
        <TransferInventoryForm items={items} warehouse={warehouse} />
      )}
    </div>
  );
}
