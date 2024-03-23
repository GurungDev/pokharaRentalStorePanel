"use client";
import React from "react";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { FormControl } from "@mui/material";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updateAHighlight } from "@/services/highlight.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
const IssueFormSchema = z.object({
  description: z.optional(
    z.string({ message: "must be string" }).min(5, {
      message: " must be at least 5 characters.",
    })
  ),
});
const HIghLightCard = (props) => {
  const issueForm = useForm({
    resolver: zodResolver(IssueFormSchema),
    defaultValues: {
      description: props?.description,
    },
  });

  async function onHighLightSubmit(values) {
    try {
      console.log(values);
      const res = await updateAHighlight({
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

  return (
    <div>
      {" "}
      <Form {...issueForm}>
        <form
          onSubmit={issueForm.handleSubmit(onHighLightSubmit)}
          className=" my-5 border-t-[2px] py-5"
        >
          <FormField
            control={issueForm.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>HighLight no {props?.no}</FormLabel>
                <FormControl>
                  <Input defaultValue={props?.description} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-5">
            <Button type="submit" className="btn mt-2">
              Update
            </Button>
            <Button type="button" className="btn mt-2">
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HIghLightCard;
