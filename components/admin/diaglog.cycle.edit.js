"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAcycle, updateAcycle } from "@/services/cycle.service";

const formSchema = z.object({
  title: z.string({ message: "must be string" }).min(5, {
    message: " must be at least 5 characters.",
  }),

  description: z.string({ message: "must be string" }).min(5, {
    message: " must be at least 5 characters.",
  }),
  priceInRs: z.string().refine(
    (value) => {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue) && isFinite(numericValue)) {
        return numericValue;
      }
      return false;
    },
    { message: "Invalid number format" }
  ),
});

export function CyclePatchDialogBox(props) {
  const { toast } = useToast();
  console.log(props);
  useEffect(() => {}, []);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.title,
      description: props.description,
      priceInRs: props.priceInRs,
    },
  });

  async function onSubmit(values) {
    try {
      const res = await updateAcycle(props.id, {
        title: values.title,
        description: values.description,
        priceInRs: values.priceInRs,
      });
      console.log(res);
      if (!res) {
        throw new Error(400, "Something went wrong");
      }

      toast({
        title: "Sucessfully updated the cycle",
      });

      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed listing",
        description: error.response?.data?.message || "Something went wrong",
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-6 py-1 bg-blue-600 rounded text-white ease-in-out duration-[.5s] hover:bg-red-600  shadow mt-2">
          {" "}
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Cycle listing</DialogTitle>
          <DialogDescription>
            Fill all the details to list a new cycle.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-5 grid-cols-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder={props?.title} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priceInRs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price of the cycle for an hour</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={props?.priceInRs}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description of the cycle</FormLabel>
                  <FormControl>
                    <Input placeholder={props?.description} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className={"col-span-2"}>
              <DialogClose asChild>
                <Button type="submit" className="btn w-[50%]">
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
