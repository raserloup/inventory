"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Corrected the access to environment variables
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [loginErr, setLoginErr] = useState("");

  async function onSubmit(data) {
    try {
      setLoading(true);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (loginData.ok) {
        setLoading(false);
        toast.success("Logged in Successfully");
        router.push(baseUrl); // This should probably be a specific route like "/dashboard"
      } else {
        setLoading(false);
        setLoginErr(loginData.error || "Login failed");
        toast.error(loginData.error || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Network error, please try again");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
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
        {loginErr && <span className="text-red-600">{loginErr}</span>}
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
        {loading ? "Logging in..." : "Log in"}
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign up
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
