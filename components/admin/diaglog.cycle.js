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
import { useEffect, useRef, useState } from "react";
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
import { createAcycle } from "@/services/cycle.service";
import Image from "next/image";

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

export function CycleDialogBox() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [secondaryImage, setsecondaryImage] = useState(null);
  const [thumbnailFormData, setThumbnailFormData] = useState(null);
  const [secondaryImageFormData, setsecondaryImageFormData] = useState(null);
  const fileInputRef = useRef();
  const fileInputRef2 = useRef();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priceInRs: "",
    },
  });

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnailFormData(file);
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const handleSecondaryImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setsecondaryImageFormData(file);
      setsecondaryImage(URL.createObjectURL(file));
    }
  };

  async function onSubmit(values) {
    try {
      if (!thumbnailFormData || thumbnailFormData.size === 0) {
        toast({
          variant: "destructive",
          title: "Thumbnail is required!",
        });
        return;
      }

      // Create a new FormData object to hold all form data
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("priceInRs", values.priceInRs);

      formData.append("thumbnail", thumbnailFormData);
      formData.append("secondaryImage", secondaryImageFormData);

      const res = await createAcycle(formData);

      if (!res) {
        throw new Error(400, "Something went wrong");
      }

      toast({
        title: "Sucessfully added a cycle",
      });
      form.reset();
      setThumbnail(null);
      setThumbnailFormData(null);
      setsecondaryImage(null);
      setsecondaryImageFormData(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed listing",
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shadow-md btn float-right bg-blue-600 text-[.9rem] text-white rounded py-2 px-5">
          {" "}
          Add a Cycle
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
                  <FormLabel>Price of the cycle for an hour</FormLabel>
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
                  <FormLabel>Description of the cycle</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div></div>

            <div>
              <label className="block">
                <span className="sr-only">thumbnail of the boat</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleThumbnailChange}
                />
                <button
                  type="button"
                  className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload thumbnail
                </button>
              </label>
              <div className=" border-[2px] my-4 w-full h-[200px] overflow-scroll">
                {/* ... */}
                {thumbnail && (
                  <Image
                    src={thumbnail}
                    alt="Description of the image"
                    width={500}
                    height={300}
                    className={"object-cover"}
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block">
                <span className="sr-only">Secondary of the boat</span>
                <input
                  ref={fileInputRef2}
                  type="file"
                  className="hidden"
                  onChange={handleSecondaryImageChange}
                />
                <button
                  type="button"
                  className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  onClick={() => fileInputRef2.current.click()}
                >
                  Upload Secondary Image
                </button>
              </label>
              <div className=" border-[2px] my-4 w-full h-[200px] overflow-scroll">
                {/* ... */}
                {secondaryImage && (
                  <Image
                    src={secondaryImage}
                    alt="Description of the image"
                    width={500}
                    height={300}
                    className={" "}
                  />
                )}
              </div>
            </div>

            <DialogFooter className={"col-span-2"}>
              <DialogClose asChild>
                <Button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="btn bg-secondary w-[50%]"
                >
                  Close
                </Button>
              </DialogClose>

              <Button type="submit" className="btn w-[50%]">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
