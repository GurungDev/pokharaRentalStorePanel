"use client";

import Timer from "@/components/timer";
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
import { toast } from "@/components/ui/use-toast";
import { OtpPurpose } from "@/lib/enum";
import { ChangePassword, SendOtp } from "@/services/auth/sendOtp.service";
import { zodResolver } from "@hookform/resolvers/zod";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import storeanimation from "@/animation/store.json";
import Link from "next/link";

const OTPFORM = z.object({
  email: z.string().email({
    message: "Invalid email format.",
  }),
});

const OTPPasswordChangeForm = z.object({
  otp: z.string().min(3, {
    message: " must be at least 3 characters.",
  }),

  password: z.string({ message: "must be string" }).min(5, {
    message: " must be at least 5 characters.",
  }),
});

const ForgotPassword = () => {
  const { push } = useRouter();
  const [otpForm, setOtpForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  async function onSendOTPFormSubmit(values) {
    try {
      const res = await SendOtp({
        email: values.email,
        phoneNumber: "1111111111",
        purpose: OtpPurpose.FORGOT_PASSWORD_STORE,
      });

      if (!res) {
        throw new Error(400, res?.messsage);
      }

      setOtpForm(false);
      setEmail(values?.email);
      toast({
        title: "OTP sent.",
      });
      OTPform.resetField();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed try again!",
        description: `User with email ${values.email} doesn't exists. Please signup.`,
      });
    }
  }

  async function onChangePasswordForm(values) {
    try {
      console.log(values);
      const res = await ChangePassword({
        email: email,
        password: values.password,
        otp: values.otp,
        purpose: OtpPurpose.FORGOT_PASSWORD_STORE,
      });

      if (!res) {
        throw new Error(400, res.data?.messsage);
      }

      toast({
        title: "Password Changed.",
      });
      ChangePasswordForm.resetField();
      push("/");
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed try again!",
        description: error?.response?.data?.message,
      });
    }
  }

  const OTPform = useForm({
    resolver: zodResolver(OTPFORM),
    defaultValues: {
      email: "",
    },
  });

  const ChangePasswordForm = useForm({
    resolver: zodResolver(OTPPasswordChangeForm),
    defaultValues: {
      password: "",
      otp: "",
    },
  });
  return (
    <main className="flex  min-[1100px]:flex-row flex-col items-center justify-between layout m-auto h-full ">
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
        </div>
      </div>
      <div className=" md:w-[50%] max-w-[500px]   m-auto md:m-0 md:mt-20 ">
        <div className="     m-auto h-full ">
          <div className={`${otpForm ? "block" : "hidden"}`}>
            <Form {...OTPform}>
              <form
                className="grid login-register-form gap-7  my-5 py-10 px-20  "
                onSubmit={OTPform.handleSubmit(onSendOTPFormSubmit)}
              >
                <div className="">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    Pokhara Rental
                  </h1>
                  <small className="">Forgot your password?</small>
                </div>
                <FormField
                  control={OTPform.control}
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

                <Button type="submit" className="btn">
                  Send OTP
                </Button>
                <Link href="/" className="text-primary">
                  <small>Login to your account</small>
                </Link>
              </form>
            </Form>
          </div>

          <div className={`${otpForm ? "hidden" : "block"}`}>
            <Form {...ChangePasswordForm}>
              <form
                className="grid gap-7  login-register-form my-5 py-14 px-20  "
                onSubmit={ChangePasswordForm.handleSubmit(onChangePasswordForm)}
              >
                <div className="">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    Pokhara Rental
                  </h1>
                  <small className="">
                    OTP is sent to your email. Check your email !
                  </small>
                </div>

                <FormField
                  control={ChangePasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="flex items-center   ">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            {...field}
                          />
                          <div
                            className="border-[1px] bg-neutral-800 text-white py-2 px-4 rounded-md"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <FaEyeSlash size={25} />
                            ) : (
                              <FaEye size={25} />
                            )}
                          </div>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={ChangePasswordForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input placeholder="otp" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex  justify-between items-center">
                  <Timer
                    onSendOTPFormSubmit={() =>
                      onSendOTPFormSubmit({
                        email: email,
                      })
                    }
                  />
                </div>

                <Button type="submit" className="btn">
                  Change Password
                </Button>
                <Link href="/" className="text-primary">
                  <small>Login to your account</small>
                </Link>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ForgotPassword;
