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
import { createABoat } from "@/services/boat.service";

const formSchema = z.object({
  title: z.string({ message: "must be string" }).min(5, {
    message: " must be at least 5 characters.",
  }),

  description: z.string({ message: "must be string" }).min(5, {
    message: " must be at least 5 characters.",
  }),
  priceInRs: z.string().refine((value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && isFinite(numericValue)) {
      return numericValue;
    }
    return false;
  }, { message: "Invalid number format" }),

  capacity: z.string().refine((value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && isFinite(numericValue)) {
      return numericValue;
    }
    return false;
  }, { message: "Invalid number format" }),
});

export function DialogBox() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  useEffect(() => {}, []);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priceInRs: '',
      capacity: '',
    },
  });

  async function onSubmit(values) {
    try {
      const res = await createABoat({
        title: values.title,
        description: values.description,
        priceInRs: values.priceInRs,
        capacity: values.capacity,
      });

      if (!res) {
        throw new Error(400, "Something went wrong");
      }

      toast({
        title: "Sucessfully added a boat",
      });
      form.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed listing",
        description: error.response?.data?.message || "Something went wrong",
      });
    }
  }
  return (
    <Dialog  >
      <DialogTrigger  asChild>
        <Button className="shadow-md btn float-right bg-blue-600 text-[.9rem] text-white rounded py-2 px-5">
          {" "}
          Add a boat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Boat listing</DialogTitle>
          <DialogDescription>
            Fill all the details to list a new boat.
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
                    <Input placeholder="title" {...field} />
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
                  <FormLabel>Price of the boat for an hour</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="priceInRs" {...field} />
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
                  <FormLabel>Description of the boat</FormLabel>
                  <FormControl>
                    <Input  placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity of the boat</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="capacity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className={"col-span-2"}>
                <DialogClose asChild>
                    <Button type="button" onClick={()=> window.location.reload()} className="btn bg-secondary w-[50%]">
                    Close
                    </Button>
                </DialogClose>

              <Button type="submit" className="btn w-[50%]">
                Login
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
