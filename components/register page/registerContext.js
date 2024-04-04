import React, { createContext, useState } from "react";
import RegisterForm from "./registerForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
 import * as z from "zod";

import { SendOtp } from "@/services/auth/sendOtp.service";

import { OtpPurpose } from "@/lib/enum";
import { toast } from "../ui/use-toast";
export const MapContext = createContext();

const RegisterContext = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);

  const [long, setLong] = useState(null);
  const [ltd, setLtd] = useState(null);
  const formSchema = z.object({
    email: z.string().email({
      message: "Invalid email format.",
    }),
    name: z.string().min(3, {
      message: " must be at least 3 characters.",
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
  

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      location: "",
      ownerName: "",
      phoneNumber: "",
      password: "",
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


  return (
    <MapContext.Provider value={{ ltd, long, setLtd, setLong, form,onSubmit, isOtpSent, setIsOtpSent  }}>
      <RegisterForm />
    </MapContext.Provider>
  );
};

export default RegisterContext;
