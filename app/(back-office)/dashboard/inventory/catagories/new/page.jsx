"use client";
import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import { makePOSTRequest } from "@/lib/apiRequest";

import { useState } from "react";

import { useForm } from "react-hook-form";

export default function NewCategory() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  async function onSubmit(data) {
    console.log(data);
    makePOSTRequest(setLoading, "api/catagories", data, "Catagories", reset);
  }
  return (
    <div>
      {/*Header */}
      <FormHeader title="New Category" href="/dashboard/inventory/catagories" />
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
        <SubmitButton isloading={loading} title="Category" />
      </form>
    </div>
  );
}
