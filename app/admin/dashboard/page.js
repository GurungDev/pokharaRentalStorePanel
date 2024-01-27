"use client"
import withAuth from "@/components/authMiddleware";
 import { toast } from "@/components/ui/use-toast";
import { getCustomerCount } from "@/services/customer.service";
import { getStoreCount } from "@/services/store.service";
import React, { useEffect, useState } from "react";
import { HiUsers } from "react-icons/hi2";
import { LiaStoreSolid } from "react-icons/lia";
 
 

 function Dashoard() {
  const [customerCount, setCustomerCount] = useState(0)
  const [storeCount, setStoreCount] = useState(0)
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerCountResult = await getCustomerCount();
        const storeCountResult = await getStoreCount();
        setCustomerCount(customerCountResult.data);
        setStoreCount(storeCountResult.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Couldn't connect to the server",
        });
      }
    };
    fetchData();  
  }, []); 
  return (
    <div className="">
        <div className="grid grid-cols-3 m-auto layout py-10 gap-10 ">
          <div className=" mt-10 aspect-video w-[70%] md:w-full   m-auto bg-[#333] rounded-md shadow-xl ">
              <div className="relative p-5 text-white h-full flex flex-col justify-end ">
                <div className="absolute top-0  shadow-xl bg-red-600 p-7 rounded-full   transform translate-y-[-50%]">
                  <HiUsers className="text-[2.2rem]" />
                </div>
              
                <div className=" items-center flex  justify-between">
                  <p className="secondary-title ">Customers </p>{" "}
                  <div className="h-[1px] w-[20px] bg-white"></div>
                  <p className="  text-[1.5rem]"> {customerCount}</p>
                </div>
              </div>
            </div>


            <div className=" mt-10 aspect-video w-[70%] md:w-full   m-auto bg-[#333] rounded-md shadow-xl ">
            <div className="relative p-5 text-white h-full flex flex-col justify-end ">
                <div className="absolute top-0  shadow-xl bg-red-600 p-7 rounded-full   transform translate-y-[-50%]">
                  <LiaStoreSolid className="text-[2.2rem]" />
                </div>
               
                <div className=" items-center flex justify-between">
                  <p className="text-[1.5rem]  ">Stores </p>{" "}
                  <div className="h-[1px] w-[20px] bg-white"></div>
                  <p className="  text-[1.5rem]"> {storeCount}</p>
                </div>
              </div>
            </div>

        </div>
       
        


    </div>
  );
}

export default withAuth(Dashoard);