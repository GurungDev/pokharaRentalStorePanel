"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { loginUser } from "@/services/auth/login.service";
import { useRouter } from "next/navigation";
import storeanimation from "@/animation/store.json";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { setDetails, setLogin } from "@/redux/slices/userSlice";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { store } from "@/redux/store";
import Link from "next/link";
import { getDetails } from "@/services/store.service";
import Lottie from "lottie-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email format.",
  }),

  password: z.string({ message: "must be string" }).min(5, {
    message: " must be at least 5 characters.",
  }),
});

export default function Home() {
  const { toast } = useToast();
  const { push } = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const state = store.getState();
  useEffect(() => {
    if (state.account.loginStatus == true && state.account.token != null) {
      push("/store/dashboard");
    }
  }, []);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const res = await loginUser({
        email: values.email,
        password: values.password,
        validateFor: "store",
      });

      if (!res) {
        throw new Error(400, "Something went wrong");
      }
      dispatch(setLogin({ token: res?.data?.token, isRememberMe: rememberMe }));
      const userDetails = await getDetails();

      dispatch(
        setDetails({
          name: userDetails?.data?.name,
          email: userDetails?.data?.email,
          number: userDetails?.data?.phoneNumber,
          ownerName: userDetails?.data?.ownerName,
          isRememberMe: rememberMe,
        })
      );

      push("/store/dashboard");
      toast({
        title: "Login sucess",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.response?.data?.message || "Something went wrong",
      });
    }
  }

  return (
    <main className="md:flex items-center justify-between layout m-auto h-full ">
      <div className="custom-shape-divider-top-1711974809  z-[-10]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="md:w-[35%] w-[50%] m-auto md:m-0 md:mt-20">
        <Lottie animationData={storeanimation} loop={true} />
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">
            Pokhara Rental
          </h1>
          <small className="">Login into the staff panel</small>
        </div>
      </div>
      <div className=" md:w-[50%] max-w-[500px]   m-auto md:m-0 md:mt-20 ">
        <Form {...form}>
          <form
            className="login-register-form grid gap-7 bg-neutral-100 my-5 py-10 px-20 shadow-md"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col min-[1100px]:flex-row justify-between items-center">
              <div className="flex gap-2 items-center">
                <Switch onClick={() => setRememberMe(!rememberMe)} />
                <small> Remember me </small>
              </div>
            </div>
            <div>
              <Button type="submit" className="btn w-full">
                Login
              </Button>
              <div className="flex flex-col min-[1100px]:flex-row justify-between items-center mt-2">
                <Link href="/forgotPassword" className="text-primary">
                  <small>Forgot your password?</small>
                </Link>
                <Link href="/register" className="text-primary">
                  <small>Register now?</small>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
