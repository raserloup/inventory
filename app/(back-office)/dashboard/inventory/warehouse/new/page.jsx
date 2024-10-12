"use client";
import FormHeader from "@/components/dashboard/FormHeader";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import { makePOSTRequest, makePUTRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { useForm } from "react-hook-form";

export default function NewWarehouse({
  initialDataById = {},
  isUpdate = false,
}) {
  const router = useRouter();
  const selectOptions = [
    {
      title: "Main",
      id: "main",
    },
    {
      title: "Branch",
      id: "branch",
    },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialDataById,
  });
  const [loading, setLoading] = useState(false);
  function redirect() {
    router.push("/dashboard/inventory/warehouse");
    //Here we tried to redirect the page after update the data
    //but the data on data table needs page refreshing
    //fix this later
  }
  async function onSubmit(data) {
    console.log(data);
    if (isUpdate) {
      //PUT request here
      makePUTRequest(
        setLoading,
        `api/warehouse/${initialDataById.id}`,
        data,
        "Warehouse",
        redirect, //after updating for page redirection
        reset
      );
    } else {
      makePOSTRequest(setLoading, "api/warehouse", data, "Warehouse", reset);
    }
  }
  return (
    <div>
      {/*Header */}
      <FormHeader
        title={isUpdate ? "Update Warehouse" : "New warehouse"}
        href="/dashboard/inventory/warehouse"
      />
      {/*Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200
         rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800
          dark:border-gray-700 mx-auto my-3"
      >
        {/* warehouse title */}
        <div
          className="grid gap-4 sm:grid-cols-2 
        sm:gap-6"
        >
          <SelectInput
            register={register}
            className="w-full"
            name="type"
            label="Select the Warehouse type"
            options={selectOptions}
          />
          <TextInput
            label="Warehouse Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Type the Warehouse Title "
          />
          <TextInput
            label="Warehouse location"
            name="location"
            register={register}
            errors={errors}
            //className="w-full"
            placeholder=" Type the Warehouse location "
          />
          {/* Ware house description */}
          <TextAreaInput
            label="Warehouse Description"
            name="description"
            register={register}
            errors={errors}
            placeholder=" Type the Warehouse Description "
          />
        </div>
        <SubmitButton
          isloading={loading}
          title={isUpdate ? "Updated Warehouse" : "New warehouse"}
          href="/dashboard/inventory/warehouse"
        />
      </form>
    </div>
  );
}
