"use client";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { RegisterStore } from "@/services/auth/register.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
export const registerFormAlongWithOtpSchema = z.object({
  otp: z.string().min(3, {
    message: " must be at least 3 characters.",
  }),
});
const OtpForm = ({ registerForm }) => {
  const registerFormAlognWithOtp = useForm({
    resolver: zodResolver(registerFormAlongWithOtpSchema),
    defaultValues: {
      otp: "",
    },
  });
  async function onRegisterFormAlongWithOtpSubmit(values) {
    try {
      let data = { otp: values.otp, ...registerForm.getValues() };
      const res = await RegisterStore(data);
      toast({
        title: "Register Success",
        description:
          "Store has been registered. Please wait for admin to verify your store.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Register failed",
        description: error.response?.data?.message || "Something went wrong",
      });
    }
  }
  return (
    <div>
      {" "}
      <Form {...registerFormAlognWithOtp}>
        <form className="login-register-form  grid gap-3 bg-neutral-100 my-5 py-10 px-20 shadow-md">
          <div className="   ">
            <FormField
              control={registerFormAlognWithOtp.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="OTP"
                      className="text-center w-full "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" ">
            <p className="text-sm text-gray-500   text-center">
              OTP has been sent to your email. Please verify !!
            </p>
          </div>
          <div>
            <button
              type="submit"
              className="btn py-2 w-full bg-primary text-white rounded-md  "
              onClick={registerFormAlognWithOtp.handleSubmit(
                onRegisterFormAlongWithOtpSubmit
              )}
            >
              Submit
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OtpForm;
