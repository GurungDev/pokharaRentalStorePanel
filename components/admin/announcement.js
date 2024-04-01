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
import { createABoat } from "@/services/boat.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useToast } from "../ui/use-toast";
import { createANotification } from "@/services/announcement.service";

const formSchema = z.object({
  title: z.string({ message: "must be string" }).min(5, {
    message: " must be at least 5 characters.",
  }),

  body: z.string({ message: "must be string" }).min(5, {
    message: " must be at least 5 characters.",
  }),
});

export function DialogBox() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  useEffect(() => {}, []);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  async function onSubmit(values) {
    try {
      const res = await createANotification({
        title: values.title,
        body: values.body,
      });

      if (!res) {
        throw new Error(400, "Something went wrong");
      }
      toast({
        title: "Created announcement.",
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: error.response?.data?.message || "Something went wrong",
      });
    }
  }
  return (
    <Dialog open = {open} >
      <DialogTrigger asChild onClick={()=>setOpen(true)}>
        <Button className="shadow-md btn float-right bg-blue-600 text-[.9rem] text-white rounded py-2 px-5">
          {" "}
          Announce
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Announcement</DialogTitle>
          <DialogDescription>
            Fill all the details to create a new announcement.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 ">
            <FormField
              control={form.control}
              name="title"
              className=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" className="w-full " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              className=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Input placeholder="body" className="w-full " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className={"col-span-2"}>
              <DialogClose asChild>
                <Button type="button" onClick={()=>{setOpen(false);form.reset()}} className="btn bg-secondary w-[50%]">
                  Close
                </Button>
              </DialogClose>
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
