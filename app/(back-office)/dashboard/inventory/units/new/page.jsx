"use client";
import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import { makePOSTRequest, makePUTRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";

export default function NewUnit({ initialDataById = {}, isUpdate = false }) {
  const router = useRouter();
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
    router.push("/dashboard/inventory/units");
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
        `api/units/${initialDataById.id}`,
        data,
        "units",
        redirect, //after updating for page redirection
        reset
      );
    } else {
      //POST request here
      makePOSTRequest(setLoading, "api/units", data, "units", reset);
    }
  }

  return (
    <div>
      {/*Header */}
      <FormHeader
        title={isUpdate ? "Update unit" : "New Unit"}
        href="/dashboard/inventory/units"
      />
      {/*Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200
         rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800
          dark:border-gray-700 mx-auto my-3"
      >
        {/* unit title */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Units Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Type the Units Title "
          />

          {/* unit abbreviation */}
          <TextInput
            label="Units Abbreviation"
            name="abbreviation"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Type the Units Abbreviation "
          />
        </div>
        <SubmitButton
          isloading={loading}
          title={isUpdate ? "Update unit" : "New Unit"}
          href="/dashboard/inventory/units"
        />
      </form>
    </div>
  );
}
