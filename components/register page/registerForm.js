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
import { createContext, useContext, useEffect, useState } from "react";
import OtpForm from "./otpForm";
import MapComponent from "./mapComponent";
import { MapContext } from "./registerContext";

const RegisterForm = () => {
  const { toast } = useToast();
  const {form, onSubmit, isOtpSent, setIsOtpSent} = useContext(MapContext)
  return isOtpSent ? (
    <OtpForm registerForm={form} />
  ) : (
    <Form {...form}>
      <form
        className="login-register-form grid gap-7 bg-neutral-100 my-5 py-10 px-20 shadow-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grow grid  md:grid-cols-2 gap-7">
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
        </div>
        <MapComponent className="h-[40vh]" />
        <div className="flex justify-between items-center">
          <Link href="/" className="text-primary">
            <small>Already have an account? login</small>
          </Link>
        </div>
        <Button type="submit" className="btn">
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
