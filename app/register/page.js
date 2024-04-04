"use client";
import RegisterForm from "@/components/register page/registerForm";
import Lottie from "lottie-react";
import Image from "next/image";
import storeanimation from "@/animation/store.json";
import RegisterContext from "@/components/register page/registerContext";

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-between layout m-auto h-full ">
      <div className=" custom-shape-divider-top-1711974809  z-[-10]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between ">
        <div className="mt-20 w-full md:w-[60%]">
          <RegisterContext />
        </div>
        <div className="md:w-[35%] w-[50%] order-first md:md:order-last">
          <Lottie animationData={storeanimation} loop={true} />
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">
              Pokhara Rental
            </h1>
            <small className="">Register Your store</small>
          </div>
        </div>
      </div>
    </main>
  );
}
