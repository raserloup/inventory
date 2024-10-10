"use client";
import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import { makePOSTRequest } from "@/lib/apiRequest";
import { useState } from "react";

import { useForm } from "react-hook-form";

export default function NewUnit() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  async function onSubmit(data) {
    console.log(data);
    makePOSTRequest(setLoading, "api/units", data, "Unit", reset);
  }
  return (
    <div>
      {/*Header */}
      <FormHeader title="New Units" href="/dashboard/inventory/units" />
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
        <SubmitButton isloading={loading} title="units" />
      </form>
    </div>
  );
}
