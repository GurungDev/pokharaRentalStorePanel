"use client";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { setLoginInfo } from "@/lib/storage.utils";
import { updateDetail } from "@/redux/slices/userSlice";
import { store } from "@/redux/store";
import { updateStore } from "@/services/store.service";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
const formSchema = z.object({
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
});
const ProfilePage = () => {
  const dispatch = useDispatch();
  const { name, email, number, ownerName } = useSelector(
    (state) => state.account
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      form.setValue("name", name);
      form.setValue("phoneNumber", number);
      form.setValue("ownerName", ownerName);
    }
  }, []);

  async function onSubmit(values) {
    try {
      const res = await updateStore({
        name: values.name,
        phoneNumber: values.phoneNumber,
        ownerName: values.ownerName,
      });
      dispatch(
        updateDetail({
          name: values.name,
          number: values.phoneNumber,
          ownerName: values.ownerName,
        })
      );
      toast({
        title: "Updated Successfully",
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
    <div className="">
      <div className="layout">
        <div className="m-0 m-auto border-b-2 flex justify-between items-center">
          <div>
            <h1 className="text-[1.5rem] text-neutral-800">Store Profile</h1>
            <h2 className="text-[.8rem] pb-6 text-neutral-600">
              Update Your Store details
            </h2>
          </div>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-5 grid-cols-2 my-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid ">
                      <FormLabel>Store Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="grid ">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem className="grid ">
                      <FormLabel>Owner Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="btn w-[50%] bg-primary py-3 text-white"
              >
                Update{" "}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
