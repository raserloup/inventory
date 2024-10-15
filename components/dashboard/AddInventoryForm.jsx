"use client";

import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import { makePOSTRequest } from "@/lib/apiRequest";

import { React, useState } from "react";

import { useForm } from "react-hook-form";

export default function AddInventoryForm({ items, warehouse, suppliers }) {
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
      "api/adjustments/add",
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
          type="text" //by default it will be text so you can remove this type
          label="Reference Number"
          name="referenceNumber"
          register={register}
          errors={errors}
          //defaultValue="refeeff"
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
        <SelectInput
          register={register}
          className="w-full"
          name="supplierId"
          label="Select the supplier"
          options={suppliers}
        />
        <TextInput
          type="number"
          label="Enter Quantity of Stock to Add"
          name="addStockQty"
          register={register}
          errors={errors}
          className="w-full"
          placeholder=" Type the Added Stock Qty "
        />
        <SelectInput
          register={register}
          className="w-full"
          name="receivingWarehouseId"
          label="Select the Warehouse that will receive the Stock"
          options={warehouse}
        />

        <TextAreaInput
          label="Adjustment Notes"
          name="notes"
          register={register}
          errors={errors}
          //placeholder=" Type the Warehouse Description "
        />
      </div>
      <SubmitButton isloading={loading} title="Adjustment" />
    </form>
  );
}
