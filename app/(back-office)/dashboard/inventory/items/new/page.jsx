"use client";
import FormHeader from "@/components/dashboard/FormHeader";
import ImageInput from "@/components/FormInputs/ImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";

import { React, useState } from "react";

import { useForm } from "react-hook-form";

export default function NewItem() {
  const [imageUrl, setImageUrl] = useState("");
  const suppliers = [
    {
      label: "supplier A",
      value: "aeriry88990r8ryr",
    },
    {
      label: "supplier B",
      value: "caiesriry5688990ry9",
    },
    {
      label: "supplier C",
      value: "caiersgiry9788990ry9",
    },
  ];
  const warehouses = [
    {
      label: "Warehouse A",
      value: "aeriry88990r8ryr",
    },
    {
      label: "Warehouse B",
      value: "caieriry5688990ry9",
    },
    {
      label: "Warehouse C",
      value: "caieriry9788990ry9",
    },
  ];
  const brands = [
    {
      label: "HP",
      value: "aeriry88990r8ryr",
    },
    {
      label: "Dell",
      value: "caieriry5788990ry9",
    },
  ];
  const units = [
    {
      label: "Kg",
      value: "aeriry88990r8ryr",
    },
    {
      label: "Pcs",
      value: "caieriry5788990ry9",
    },
  ];
  const Categories = [
    {
      label: "Electronics",
      value: "aeriry88990r8ryr",
    },
    {
      label: "Clothes",
      value: "caieriry5788990ry9",
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
    data.imageUrl = imageUrl; //(if the image uploadthing worked you this)
    console.log(data);
    setLoading(true);
    const baseUrl = "http://localhost:3000";
    try {
      const response = await fetch(`${baseUrl}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(response);
        reset();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <div>
      {/*Header */}
      <FormHeader title="New Item" href="/dashboard/inventory/" />
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
          <TextInput
            label="Warehouse Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Type the Warehouse Title "
          />
          <SelectInput
            name="categoryId"
            label="Select the Item Category"
            register={register}
            className="w-full"
            options={Categories}
          />

          <TextInput
            label="Item SKU"
            name="sku"
            register={register}
            errors={errors}
            className="w-full"
            //  isRequired='false'
          />
          <TextInput
            label="Item Barcode"
            name="barcode"
            register={register}
            errors={errors}
            //  isRequired='false'
            className="w-full"
          />
          <TextInput
            label="Item Quantity"
            name="quantity"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Provide the Item Quantity "
          />
          <SelectInput
            name="unitId"
            label="Select the Item Unit"
            register={register}
            className="w-full"
            options={units}
          />
          <SelectInput
            name="brandId"
            label="Select the Item Brand"
            register={register}
            className="w-full"
            options={brands}
          />
          <TextInput
            label="Buying Price"
            name="buyingPrice"
            register={register}
            errors={errors}
            className="w-full"
            type="number"
            placeholder=" Provide the Buying Price"
          />
          <TextInput
            label="Selling Price"
            name="sellingPrice"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Provide the Selling Price"
          />
          <SelectInput
            name="supplierId"
            label="Select the Item supplier"
            register={register}
            className="w-full"
            options={suppliers}
          />
          <TextInput
            label="Re-Order Point"
            name="reOrderPoint"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Provide the Re-Order Point"
          />
          <SelectInput
            name="warehouseId"
            label="Select the Item Warehouse"
            register={register}
            className="w-full"
            options={warehouses}
          />
          <TextInput
            label="Item Weight in kgs"
            name="weight"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
            // placeholder=" Provide the Re-Order Point"
          />
          <TextInput
            label="Item Dimensions in cm (20 x 30 x 100)"
            name="dimensions"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Provide the Item Dimensions"
          />
          <TextInput
            label="Item Tax Rate in %"
            name="taxRate"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
            placeholder=" Item Tax  Rate in %"
          />
          <TextAreaInput
            label="Item Description"
            name="description"
            register={register}
            errors={errors}
            placeholder=" Type the Item Description "
          />
          <TextAreaInput
            label="Item Notes"
            name="notes"
            register={register}
            errors={errors}
            placeholder=" Type Item Notes "
          />
          {/*a component for uploading an image from uploadthing.com */}

          {/* Upload thing */}
          <ImageInput
            Label="Item Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="imageUploader"
          />
        </div>
        <SubmitButton isloading={loading} title="Item" />
      </form>
    </div>
  );
}
