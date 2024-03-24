"use client";
import { CycleUpdateComponent } from "@/components/admin/diaglog.cycle.edit";
 import { toast } from "@/components/ui/use-toast";
import { getOnecycle } from "@/services/cycle.service";
 import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CycleUpdatepage = () => {
  const { id } = useParams();
  const [CycleData, setCycleData] = useState(null);
  async function getData() {
    const response = await getOnecycle(id);
    setCycleData(response?.data);
  }

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      toast("Couldn't load the data !");
    }
  }, []);
  return (
    <div className=" pt-10">
      <div className="layout">
        {CycleData && (
          <CycleUpdateComponent
            title={CycleData?.title}
            thumbnail={CycleData?.thumbnail || ""}
            secondaryImage={CycleData?.secondaryImage || ""}
            capacity={CycleData?.capacity}
            id={CycleData?.id}
            description={CycleData?.description}
            priceInRs={CycleData?.priceInRs}
          />
        )}
      </div>
    </div>
  );
};

export default CycleUpdatepage;
