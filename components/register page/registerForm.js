"use client";
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
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { SendOtp } from "@/services/auth/sendOtp.service";

import { OtpPurpose } from "@/lib/enum";
import { useState } from "react";
import OtpForm from "./otpForm";

const RegisterForm = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const formSchema = z.object({
    email: z.string().email({
      message: "Invalid email format.",
    }),
    name: z.string().min(3, {
      message: " must be at least 3 characters.",
    }),
    location: z.string().min(2, {
      message: " must be at least 2 characters.",
    }),
    ownerName: z.string().min(5, {
      message: " must be at least 5 characters.",
    }),
    phoneNumber: z
      .string()
      .regex(
        new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
        "Invalid Number!"
      ),

    password: z.string({ message: "must be string" }).min(5, {
      message: " must be at least 5 characters.",
    }),
  });
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      location: "",
      ownerName: "",
      phoneNumber: "",
      password: "",
      long: "50.23",
      lat: "40.23",
    },
  });

  async function onSubmit(values) {
    try {
      const res = await SendOtp({
        email: values.email,
        phoneNumber: values.phoneNumber,
        purpose: OtpPurpose.SIGNUP_STORE,
      });

      if (!res) {
        throw new Error(400, res?.data?.message);
      }
      setIsOtpSent(true);
      toast({
        title: "Otp sent",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.response?.data?.message || "Something went wrong",
      });
    }
  }

  return isOtpSent ? (
    <OtpForm registerForm={form} />
  ) : (
    <Form {...form}>
      <form
        className="login-register-form grid gap-7 bg-neutral-100 my-5 py-10 px-20 shadow-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="md:flex justify-between gap-10">
          <div className="grow grid  gap-7">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input placeholder="store name" {...field} />
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

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="location" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grow grid gap-7">
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
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Name</FormLabel>
                  <FormControl>
                    <Input placeholder="ownerName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="phoneNumber" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* <MapComponent className="h-[40vh]"/> */}
        <div className="flex justify-between items-center">
          <Link href="/" className="text-primary">
            <small>Already have an account? login</small>
          </Link>
        </div>
        <Button type="submit" className="btn">
          Login
        </Button>
      </form>
    </Form>
  );

  
};

export default RegisterForm;
