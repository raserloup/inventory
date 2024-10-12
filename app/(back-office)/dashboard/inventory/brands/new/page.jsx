"use client";
import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import { makePOSTRequest, makePUTRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { useForm } from "react-hook-form";

export default function NewBrand({ initialDataById = {}, isUpdate = false }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    //Here i use react hock for initialize form values using defaultValues
  } = useForm({
    defaultValues: initialDataById,
  });
  const [loading, setLoading] = useState(false);
  function redirect() {
    router.push("/dashboard/inventory/brands");
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
        `api/brands/${initialDataById.id}`,
        data,
        "brands",
        redirect, //after updating for page redirection
        reset
      );
    } else {
      //POST request here
      makePOSTRequest(setLoading, "api/brands", data, "Brands", reset);
    }
  }
  return (
    <div>
      {/*Header */}
      <FormHeader
        title={isUpdate ? "Update Brand" : "New Brand"}
        href="/dashboard/inventory/brands"
      />
      {/*Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200
         rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800
          dark:border-gray-700 mx-auto my-3"
      >
        {/* Brand title */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Brands Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Type the Brands Title "
          />
        </div>
        <SubmitButton
          isloading={loading}
          title={isUpdate ? "Updated Brand" : "New Brand"}
          href="/dashboard/inventory/brands"
        />
      </form>
    </div>
  );
}
