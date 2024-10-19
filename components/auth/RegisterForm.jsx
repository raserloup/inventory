"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Corrected the access to environment variables
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");

  console.log(emailErr);

  async function onSubmit(data) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        setLoading(false);
        toast.success("User Created Successfully");
        reset();
        router.push("/login");
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr("User with this Email already exists");
          toast.error("User with this Email already exists");
        } else {
          //Handle other errors
          console.error("Server Error:", responseData.message);
          toast.error("Oops Something went Wrong");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Something went wrong with network, please Try again");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your name
        </label>
        <input
          {...register("name", { required: true })}
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Enter your name"
        />
        {errors.name && <span className="text-red-600">Name is required</span>}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="name@company.com"
        />
        {errors.email && (
          <span className="text-red-600">Email is required</span>
        )}
        {emailErr && <span className="text-red-600">{emailErr}</span>}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          {...register("password", { required: true })}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="••••••••"
        />
        {errors.password && (
          <span className="text-red-600">Password is required</span>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {loading ? "Creating account..." : "Sign up"}
      </button>

      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Login
        </a>
      </p>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Back to{" "}
        <a
          href={baseUrl}
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Home
        </a>
      </p>
    </form>
  );
}
