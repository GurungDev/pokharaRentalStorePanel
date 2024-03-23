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
import { updateABoat } from "@/services/boat.service";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import {
  createAHighlight,
  getAllHighlightList,
} from "@/services/highlight.service";
import { listing } from "@/lib/enum";
import HIghLightCard from "./highlightCardComponent";

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
  priceInRs: z.optional(
    z.string().refine(
      (value) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && isFinite(numericValue)) {
          return numericValue;
        }
        return false;
      },
      { message: "Invalid number format" }
    )
  ),

  capacity: z.optional(
    z.string().refine(
      (value) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && isFinite(numericValue)) {
          return numericValue;
        }
        return false;
      },
      { message: "Invalid number format" }
    )
  ),
});

const IssueFormSchema = z.object({
  description: z.string({ message: "must be string" }).min(5, {
    message: " must be at least 5 characters.",
  }),
});

export function BoatUpdateComponent(props) {
  const { toast } = useToast();

  const [highlightList, setHighlightList] = useState(null);
  const [updated, setUpdated] = useState(true);
  async function getHighlights() {
    const highlightList = await getAllHighlightList({
      data: { highlightFor: listing.BOAT, issueId: props?.id },
    });
    setHighlightList(highlightList?.data);
  }
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
      capacity: props?.capacity,
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
      console.log(values);
      const res = await createAHighlight({
        ...values,
        highlightFor: listing.BOAT,
        issueId: props.id,
      });

      if (!res) {
        throw new Error(400, "Something went wrong");
      }

      toast({
        title: "Sucessfully added highlight",
      });
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
      const res = await updateABoat(props.id, values);
      console.log("sdhsdgsdi", values);
      if (!res) {
        throw new Error(400, "Something went wrong");
      }

      toast({
        title: "Sucessfully updated the Boat",
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
      <div className="h-[90vh] px-1 overflow-scroll  scroll-hidden pb-10 ">
        <Link
          href={"/store/boat"}
          className="flex gap-2 py-5 pb-7 items-center group"
        >
          <IoMdArrowBack
            size={15}
            className="group-hover:translate-x-[-9px] duration-300"
          />
          <small className="text-neutral-500 small">Get back</small>
        </Link>

        <h2 className="secondary-title">Boat listing</h2>
        <p className="paragraph my-5">
          Fill all the details to update the boat.
        </p>

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
                    <Input defaultValue={props?.title} {...field} />
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
                    <Input
                      type="text"
                      defaultValue={props?.priceInRs}
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
                  <FormLabel>Description of the boat</FormLabel>
                  <FormControl>
                    <Input defaultValue={props?.description} {...field} />
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
                    <Input
                      type="text"
                      defaultValue={props?.capacity}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <HIghLightCard description={"this is a test "} no={1} id={1} />
        </div>
      </div>
    </div>
  );
}
