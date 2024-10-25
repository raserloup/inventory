import React from "react";

export default function dailyStatusRegistrationForm() {
  return (
    <div>
      {" "}
      {/*Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200
       rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800
        dark:border-gray-700 mx-auto my-3"
      >
        {/*  title */}
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
