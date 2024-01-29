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
import Image from "next/image";

import Link from "next/link";
import { RegisterStore } from "@/services/auth/register.service";

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

  phoneNumber: z.string().regex(new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  ), 'Invalid Number!'),

  password: z.string({ message: "must be string" }).min(5, {
    message: " must be at least 5 characters.",
  }),
});

export default function RegisterPage() {
  const { toast } = useToast();
  const { push } = useRouter();

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
      const res = await RegisterStore({
        email: values.email,
        password: values.password,
        name:  values.name,
        location:  values.location,
        ownerName:  values.ownerName,
        phoneNumber:  values.phoneNumber,
        validateFor: "store",
      });

      if (!res) {
        throw new Error(400, "Something went wrong");
      }

      push("/admin/dashboard");
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
    <main className=" w-[80%] md:w-[50%] lg:w-[55%] m-auto h-full ">
      <Image
        src={"/logo-black.png"}
        alt="logo"
        width={100}
        height={50}
        className="m-auto"
      ></Image>
      <Form {...form}>
        <form
          className="grid gap-7 bg-neutral-100 my-5 py-10 px-20 shadow-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Pokhara Rental
            </h1>
            <small className="">Register a store</small>
          </div>
            <div className="flex justify-between gap-10">
                    <div className="grow grid gap-7">
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
    </main>
  );
}
