"use client";
import Image from "next/image";
import Link from "next/link";
import ConstEquipmE from "../public/ConstEquipmE.jpg";
import { useSession } from "next-auth/react";

export default function Hero() {
  const { data: session, status } = useSession();

  return (
    <section className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in">
          Efficient Construction Inventory Management
        </h1>
        <p className="text-lg mb-8 animate-fade-in delay-1">
          Streamline your construction projects with our robust inventory
          system. Increase your sales and keep track of every unit with our
          powerful stock management, order fulfillment, and inventory control
          software.
        </p>
        <div className="flex gap-4 justify-center mx-auto px-4 text-center">
          {session ? (
            <button className="mt-8 px-6 py-3 bg-rose-600 hover:bg-rose-700 focus:ring-red-300 shadow-lg rounded-lg transition">
              <Link href="/dashboard/home/overview">View Dashboard</Link>
            </button>
          ) : (
            <button className="mt-8 px-6 py-3 bg-rose-600 hover:bg-rose-700 focus:ring-red-300 shadow-lg rounded-lg transition">
              <Link href="/dashboard/home/overview">
                Access the Demo Account
              </Link>
            </button>
          )}
          <button className="mt-8 px-6 py-3 bg-white text-blue-600 rounded-lg shadow-lg hover:bg-gray-100 transition">
            <Link href="/dashboard/home/overview"> Contact Info</Link>
          </button>
        </div>
      </div>
      <div className="mt-12 flex justify-center">
        <Image
          src={ConstEquipmE}
          alt="Inventory App"
          className="rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
}
