"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  createAHighlight,
  getAllHighlightList,
} from "@/services/highlight.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
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
import HIghLightCard from "./highlightCardComponent";
import { updateAcycle } from "@/services/cycle.service";
import { listing } from "@/lib/enum";

const formSchema = z.object({
  title: z.optional(
    z.string({ message: "must be string" }).min(5, {
      message: " must be at least 5 characters.",
    })
  ),

  description: z.optional(
    z.string({ message: "must be string" }).min(5, {
      message: " must be at least 5 characters.",
    })
  ),
  priceInRs: z.number({ message: "Invalid number format" }),
});

const IssueFormSchema = z.object({
  description: z.string({ message: "must be string" }).min(5, {
    message: " must be at least 5 characters.",
  }),
});

export function CycleUpdateComponent(props) {
  const { toast } = useToast();
  let count = 0;
  const { id } = useParams();
  const [highlightList, setHighlightList] = useState(null);

  const [thumbnail, setThumbnail] = useState(
    props?.thumbnail != "null" ? props?.thumbnail : null
  );
  const [secondaryImage, setsecondaryImage] = useState(
    props?.secondaryImage != "null" ? props?.secondaryImage : null
  );
  const [thumbnailFormData, setThumbnailFormData] = useState(null);
  const [secondaryImageFormData, setsecondaryImageFormData] = useState(null);

  const fileInputRef = useRef();
  const fileInputRef2 = useRef();
  const [updated, setUpdated] = useState(true);

  async function getHighlights() {
    let highlightList;
    highlightList = await getAllHighlightList({
      data: { issueId: id, highlightFor: listing.CYCLE },
    });
    setHighlightList(highlightList?.data);
  }

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

  useEffect(() => {
    try {
      getHighlights();
    } catch (error) {
      console.log("couldn't load highlights");
    }
  }, [updated]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props?.title,
      description: props?.description,
      priceInRs: props?.priceInRs,
    },
  });

  const issueForm = useForm({
    resolver: zodResolver(IssueFormSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onHighLightSubmit(values) {
    try {
      const res = await createAHighlight({
        ...values,
        highlightFor: listing.CYCLE,
        issueId: props.id,
      });

      if (!res) {
        throw new Error(400, "Something went wrong");
      }
      setUpdated(!updated);
      toast({
        title: "Sucessfully added highlight",
      });
      issueForm.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed listing",
        description: error.response?.data?.message || "Something went wrong",
      });
    }
  }

  async function onSubmit(values) {
    try {
      // Create a new FormData object to hold all form data
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("priceInRs", values.priceInRs);
      if(thumbnailFormData){
        formData.append("thumbnail", thumbnailFormData);
      }
      if(secondaryImageFormData){
        formData.append("secondaryImage", secondaryImageFormData);
      }
     
      
      const res = await updateAcycle(props.id, formData);

      if (!res) {
        throw new Error(400, "Something went wrong");
      }

      toast({
        title: "Sucessfully updated the Cycle",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed listing",
        description: error.response?.data?.message || "Something went wrong",
      });
    }
  }
  return (
    <div>
      <div className="h-[80vh] px-1 overflow-scroll  scroll-hidden pb-10 ">
        <Link
          href={"/store/cycle"}
          className="flex gap-2 py-5 pb-7 items-center group"
        >
          <IoMdArrowBack
            size={15}
            className="group-hover:translate-x-[-9px] duration-300"
          />
          <small className="text-neutral-500 small">Get back</small>
        </Link>

        <h2 className="secondary-title">Cycle listing</h2>
        <p className="paragraph my-5">
          Fill all the details to update the Cycle.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-5 grid-cols-2"
          >
            <div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input value={props?.title} {...field} />
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
                    <FormLabel>Price of the Cycle for an hour</FormLabel>
                    <FormControl>
                      <Input value={props?.priceInRs.toString()} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description of the Cycle</FormLabel>
                  <FormControl>
                    <TextField
                      rows={7}
                      multiline
                      draggable={true}
                      fullWidth={true}
                      value={props?.description}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <label className="block">
                <span className="sr-only">thumbnail of the Cycle</span>
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
                <span className="sr-only">Secondary of the Cycle</span>
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

            <Button type="submit" className="btn w-[50%]">
              Update{" "}
            </Button>
          </form>
        </Form>

        <Form {...issueForm}>
          <form
            onSubmit={issueForm.handleSubmit(onHighLightSubmit)}
            className=" my-5 border-t-[2px] py-5"
          >
            <FormField
              control={issueForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Write a Highlight</FormLabel>
                  <FormControl>
                    <Input placeholder={"Description"} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="btn mt-2">
              Create
            </Button>
          </form>
        </Form>

        <div>
          {highlightList?.map((e, index) => {
            return (
              <HIghLightCard
                key={index}
                description={e.description}
                no={++count}
                id={e.id}
                issueId={e?.issueId}
                setUpdated={() => setUpdated(!updated)}
                listingFor={listing.CYCLE}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
