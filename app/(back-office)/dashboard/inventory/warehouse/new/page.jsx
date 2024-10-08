"use client";
import FormHeader from "@/components/dashboard/FormHeader";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";

import { React, useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function NewWarehouse() {
  const selectOptions = [
    {
      label: "Main",
      value: "main",
    },
    {
      label: "Branch",
      value: "branch",
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
    setLoading(true);
    const baseUrl = "http://localhost:3000";
    try {
      const response = await fetch(`${baseUrl}/api/warehouse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(response);
        toast.success("New warehouse created Successfully");
        setLoading(false);
        reset();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <div>
      {/*Header */}
      <FormHeader title="New warehouse" href="/dashboard/inventory/" />
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
        <SubmitButton isloading={loading} title="Warehouse" />
      </form>
    </div>
  );
}
