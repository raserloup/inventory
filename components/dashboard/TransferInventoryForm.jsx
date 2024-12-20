"use client";

import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import { makePOSTRequest } from "@/lib/apiRequest";

import { React, useState } from "react";

import { useForm } from "react-hook-form";

export default function TransferInventoryForm({ items, warehouse }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  async function onSubmit(data) {
    console.log(data);
    makePOSTRequest(
      setLoading,
      "api/adjustments/transfer",
      data,
      "StockAdjustment",
      reset
    );
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200
         rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800
          dark:border-gray-700 mx-auto my-3"
    >
      <div
        className="grid gap-4 sm:grid-cols-2 
        sm:gap-6"
      >
        <TextInput
          label="Reference Number"
          name="referenceNumber"
          register={register}
          errors={errors}
          // defaultValue="We will you this later since the reference number is a default value"
          // className="w-full"
          placeholder="Type the reference number"
        />
        <SelectInput
          register={register}
          className="w-full"
          name="itemId"
          label="Select the Item"
          options={items}
        />
        <TextInput
          className="w-full"
          type="number"
          label="Enter Quantity of Stock to transfer"
          name="transferStockQty"
          register={register}
          errors={errors}
          placeholder=" Type the transfer Stock Qty "
        />
        <SelectInput
          register={register}
          className="w-full"
          name="givingWarehouseId"
          label="Select the Warehouse that will give the Stock"
          options={warehouse}
        />
        <SelectInput
          register={register}
          className="w-full"
          name="receivingWarehouseId"
          label="Select the Warehouse that will receive Stock"
          options={warehouse}
        />
        <TextAreaInput
          label="Adjustment Notes"
          name="notes"
          register={register}
          errors={errors}
        />
      </div>
      <SubmitButton isloading={loading} title="Adjustment" />
    </form>
  );
}
