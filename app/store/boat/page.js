"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Switch } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
 
import { toast } from "@/components/ui/use-toast";
import withAuth from "@/components/authMiddleware";
import { getAllBoatList } from "@/services/boat.service";
import Admin_Card from "@/components/admin/card.boat";
import { DialogBox } from "@/components/admin/diaglog.boat";
 

function Boats() {
 
  const [listing, setListing] = useState([]);
  useEffect(() => {
    async function getRows() {
      try {
        let row = await getAllBoatList();
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
    <div className=" ">
      <div className="layout">
        <div className="m-0 sticky top-[0vh] z-[10] bg-white pt-5 m-auto border-b-2 flex justify-between items-center">
          <div>
            <h1 className="text-[1.5rem] text-neutral-800">Boats Details</h1>
            <h2 className="text-[.8rem] pb-6 text-neutral-600">
              List of all the Boats
            </h2>
          </div>
          <div>
            <DialogBox >
            </DialogBox>
          </div>
        </div>

        <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-5 ">
          {listing.map((e, index) => {
            return (
              <Admin_Card
                key={index}
                details={e.description}
                image={e.thumbnail}
                name={e.title}
                id={e.id}
              />
            );
          })}
           {listing.map((e, index) => {
            return (
              <Admin_Card
                key={index}
                details={e.description}
                image={e.thumbnail}
                name={e.title}
                id={e.id}
              />
            );
          })}
        </div>
 
      </div>
    </div>
  );
}


export default withAuth(Boats)