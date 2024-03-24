"use client";
import { listing } from "@/lib/enum";
import { deleteAHighlight } from "@/services/highlight.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
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

  async function onHighLightDelete() {
    try {
      const res = await deleteAHighlight({
        issueId: props?.id,
        highlightFor: props?.listingFor,
      });

      if (!res) {
        throw new Error(400, "Something went wrong");
      }
      props?.setUpdated();
      toast({
        title: "Sucessfully Deleted highlight",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed ",
      });
    }
  }

  return (
    <div className="  grid gap-4 border-b-[2px] py-5">
      {" "}
      <div className="flex items-center justify-between gap-5">
        <div>HighLight no {props?.no}</div>
        <button onClick={onHighLightDelete} type="button" className="py-1 hover:translate-x-[-10px] duration-300 px-4 text-sm bg-red-600 text-white rounded-md shadow ">
          Delete
        </button>
      </div>
      <div className="">
        <div className="text-sm text-neutral-600">{props?.description}</div>
      </div>
    </div>
  );
};

export default HIghLightCard;
