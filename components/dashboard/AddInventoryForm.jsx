"use client";

import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import { makePOSTRequest } from "@/lib/apiRequest";

import { React, useState } from "react";

import { useForm } from "react-hook-form";

export default function AddInventoryForm() {
  const items = [
    {
      label: "Item A",
      value: "00024",
    },
    {
      label: "Item B",
      value: "00025",
    },
    {
      label: "Item C",
      value: "000256",
    },
  ];
  const branches = [
    {
      label: "Branch A",
      value: "thysfkhasdfu345",
    },
    {
      label: "Branch B",
      value: "lashdf0937459235",
    },
    {
      label: "Branch C",
      value: "lashdf0937459235",
    },
    {
      label: "Main A ",
      value: "lashdf0937459235",
    },
    {
      label: "Main B ",
      value: "lashdf0937459235",
    },
  ];
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
          label="Reference Number"
          name="referenceNumber"
          register={register}
          errors={errors}
          //defaultValue="refeeff"
        />
        <SelectInput
          register={register}
          className="w-full"
          name="itemId"
          label="Select the Item"
          options={items}
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
          options={branches}
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
