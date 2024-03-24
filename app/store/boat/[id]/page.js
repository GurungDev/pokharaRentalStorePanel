"use client";
import { BoatUpdateComponent } from "@/components/admin/diaglog.boat.edit";
import { toast } from "@/components/ui/use-toast";
import { getOneBoat } from "@/services/boat.service";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BoatUpdatepage = () => {
  const { id } = useParams();
  const[boatData, setBoatData] = useState(null);
  async function getData (){
    const response = await getOneBoat(id);  
    setBoatData(response?.data)
}

  useEffect(() => {
   try {
    getData()
   } catch (error) {
     toast("Couldn't load the data !")
   }
  }, []);
  return (
    <div className=" pt-10">
      <div className="layout">
        <BoatUpdateComponent title={boatData?.title} thumbnail={boatData?.thumbnail} secondaryImage={boatData?.secondaryImage} capacity={boatData?.capacity} id={boatData?.id}  description = {boatData?.description} priceInRs = {boatData?.priceInRs} />
      </div>
    </div>
  );
};

export default BoatUpdatepage;
