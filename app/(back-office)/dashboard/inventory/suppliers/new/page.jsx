"use client";
import FormHeader from "@/components/dashboard/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import { makePOSTRequest } from "@/lib/apiRequest";

import { useState } from "react";

import { useForm } from "react-hook-form";

export default function NewSupplier() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  async function onSubmit(data) {
    console.log(data);
    //here api post happens
    makePOSTRequest(setLoading, "api/suppliers", data, "Supplier", reset);
  }
  return (
    <div>
      {/*Header */}
      <FormHeader title="New Suppliers" href="/dashboard/inventory/" />
      {/*Form */}
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
            label="Supplier Name"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Type the suppliers name "
          />
          <TextInput
            label="Supplier Phone"
            name="phone"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" provide the suppliers phone "
          />
          <TextInput
            label="Supplier Email"
            name="email"
            type="email"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Type the suppliers E-mail "
          />
          <TextInput
            label="Supplier Address"
            name="address"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Type the suppliers Address "
          />
          <TextInput
            label="Supplier Contact Person"
            name="contactPerson"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Type the suppliers Contact Person "
          />
          <TextInput
            label="Supplier Code"
            name="supplierCode"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Type the suppliers Code "
          />
          <TextInput
            label="Supplier TIN"
            name="taxID"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Type the suppliers Tin"
          />
          <TextAreaInput
            label="Supplier Payment terms"
            name="paymentTerms"
            register={register}
            errors={errors}
            placeholder=" Type the Supplier Payment terms "
            //className="w-full"
          />
          <TextAreaInput
            label="Notes"
            name="notes"
            register={register}
            errors={errors}
            placeholder=" Provide if any notes you have to.. "
          />
        </div>
        <SubmitButton isloading={loading} title="Supplier" />
      </form>
    </div>
  );
}
