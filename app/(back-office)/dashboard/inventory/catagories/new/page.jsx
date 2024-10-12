"use client";
import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import { makePOSTRequest, makePUTRequest } from "@/lib/apiRequest";

import { useState } from "react";

import { useForm } from "react-hook-form";

export default function NewCategory({
  initialDataById = {},
  isUpdate = false,
}) {
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
    router.push("/dashboard/inventory/catagories");
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
        `api/catagories/${initialDataById.id}`,
        data,
        "Category",
        redirect, //after updating for page redirection
        reset
      );
    } else {
      makePOSTRequest(setLoading, "api/catagories", data, "Category", reset);
    }
  }
  return (
    <div>
      {/*Header */}
      <FormHeader
        title={isUpdate ? "Update Category" : "New Categories"}
        href="/dashboard/inventory/catagories"
      />
      {/*Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200
         rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800
          dark:border-gray-700 mx-auto my-3"
      >
        {/* Category title */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
            placeholder=" Type the Category title "
          />

          {/* Description */}
          <TextAreaInput
            label="Category Description"
            name="description"
            register={register}
            errors={errors}
            placeholder=" Type the Category Description "
          />
        </div>
        <SubmitButton
          isloading={loading}
          title={isUpdate ? "Updated Category" : "New Categories"}
          href="/dashboard/inventory/catagories"
        />
      </form>
    </div>
  );
}
