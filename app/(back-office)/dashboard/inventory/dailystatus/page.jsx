"use client";

import FormHeader from "@/components/dashboard/FormHeader";
import { makePOSTRequest, makePUTRequest } from "@/lib/apiRequest";
import { getData } from "@/lib/getData";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Check, Plus } from "lucide-react"; // Import the icons you need
import TextInput from "@/components/FormInputs/TextInput";

export default function DailyStatus({
  initialDataById = {},
  isUpdate = false,
}) {
  const [utilizationData, setUtilizationData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getData("Utilizations");
      setUtilizationData(data);
    }
    fetchData();
  }, []);

  const handleNewData = (newData) => {
    setUtilizationData((prevData) => [...prevData, newData]);
  };
  //router.refresh();
  return (
    <div>
      <FormHeader
        title={isUpdate ? "Update Utilization" : "New Utilization"}
        href="/dashboard/inventory/Utilizations"
      />
      {/* {utilizationData.map((item) => (
        <Form
          key={item.id}
          initialDataById={item}
          isUpdate={true}
          setLoading={setLoading}
          loading={loading}
        />
      ))}
      <Form
        initialDataById={{}}
        isUpdate={false}
        setLoading={setLoading}
        loading={loading}
        handleNewData={handleNewData}
      /> */}
    </div>
  );
}

function Form({
  initialDataById,
  isUpdate,
  setLoading,
  loading,
  handleNewData,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialDataById,
  });

  async function onSubmit(data) {
    console.log(data);
    if (isUpdate) {
      makePUTRequest(
        setLoading,
        `api/Utilizations/${initialDataById.id}`,
        data,
        "Utilization"
      );
    } else {
      const response = await makePOSTRequest(
        setLoading,
        "api/Utilizations",
        data,
        "Utilization"
      );
      if (response && response.id) {
        handleNewData(response);
        reset();
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-7xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="flex flex-wrap gap-4">
        <TextInput
          label="platenumber"
          name={`platenumber`}
          register={register}
          errors={errors}
        />
        <TextInput
          label="idelqty"
          name={`idelqty`}
          register={register}
          errors={errors}
        />
        <TextInput
          label="opqty"
          name={`opqty`}
          register={register}
          errors={errors}
        />
        <TextInput
          label="downqty"
          name={`downqty`}
          register={register}
          errors={errors}
        />
        <TextInput
          label="refnumber"
          name={`refnumber`}
          register={register}
          errors={errors}
        />
        <button
          type="submit"
          className="flex items-center justify-center p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {isUpdate ? <Check /> : <Plus />}{" "}
        </button>
      </div>
    </form>
  );
}
