"use client";
import React, { useEffect, useState } from "react";
 
import { toast } from "@/components/ui/use-toast";
import withAuth from "@/components/authMiddleware";

import { getAllcycleList } from "@/services/cycle.service";
import { CycleDialogBox } from "@/components/admin/diaglog.cycle";
import Admin_Card_Cycle from "@/components/admin/card.cycle";
 

function Cycle() {
 
  const [listing, setListing] = useState([]);
  useEffect(() => {
    async function getRows() {
      try {
        let row = await getAllcycleList();
        setListing(row.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error.response?.data?.message || "Couldn't connect to the server",
        });
      }
    }
    getRows();
  }, []);

 

  return (
    <div className=" pt-10">
      <div className="layout">
        <div className="m-0 m-auto border-b-2 flex justify-between items-center">
          <div>
            <h1 className="text-[1.5rem] text-neutral-800">Cycle Details</h1>
            <h2 className="text-[.8rem] pb-6 text-neutral-600">
              List of all the Cycles
            </h2>
          </div>
          <div>
            <CycleDialogBox >
            </CycleDialogBox>
          </div>
        </div>

        <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-5 overflow-y-auto h-[70vh]">
          {listing.map((e, index) => {
            return (
              <Admin_Card_Cycle
                key={index}
                details={e.description}
                image={e.image}
                name={e.title}
                price={e.priceInRs}
                id={e.id}
              />
            );
          })}
        </div>
 
      </div>
    </div>
  );
}


export default withAuth(Cycle)