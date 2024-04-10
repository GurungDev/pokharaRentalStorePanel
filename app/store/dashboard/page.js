"use client";
import withAuth from "@/components/authMiddleware";
import { toast } from "@/components/ui/use-toast";
import { getBoatCount } from "@/services/boat.service";
import { getcycleCount } from "@/services/cycle.service";
import { Chart } from "react-google-charts";

import React, { useEffect, useState } from "react";
import { HiUsers } from "react-icons/hi2";
import { LiaStoreSolid } from "react-icons/lia";
import { getSalesPerDay } from "@/services/order.service";
import { getSubscriberCount } from "@/services/subscriber.service";

export const options = {
  title: "Sales Data",
  curveType: "function",
  animation: {
    duration: 1000,
    easing: "out",
    startup: true,
  },
  vAxis: {
    viewWindow: {
      min: 0,
    },
  },
};

function Dashoard() {
  const [boatCount, setboatCount] = useState(0);
  const [cycleCount, setcycleCount] = useState(0);
  const [subscriberCount, setsubscriberCount] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [orderCount, setorderCount] = useState(0);
  const currentMonth = new Date().getMonth() + 1;
  useEffect(() => {
    setSalesData([]);
    const fetchData = async () => {
      try {
        const boatCountResult = await getBoatCount();
        const cycleCountResult = await getcycleCount();
        const subscriberResult = await getSubscriberCount();
        setsubscriberCount(subscriberResult?.data)
        setboatCount(boatCountResult.data);
        setcycleCount(cycleCountResult.data);
        const salesDataRes = await getSalesPerDay({ month: 4, year: 2024 });
        let data = [["Days", "Sales"]];
        salesDataRes?.data.forEach((element) => {
          return data.push([
            new Date(element.date),
            parseInt(element.sales, 10),
          ]);
        });
        setSalesData(data);
         const currentMonthSales = salesDataRes?.data.filter((data) => {
          const dataMonth = new Date(data.date).getMonth() + 1; // Adding 1 to match the format of currentMonth
          return dataMonth === currentMonth;
        });

         const totalSales = currentMonthSales.reduce((acc, data) => {
          return acc + (parseInt(data?.sales, 10) || 0); // Add sales of each item to the accumulator
        }, 0);
        const totalOrders = currentMonthSales.reduce((acc, data) => {
          return acc + (parseInt(data?.count, 10) || 0); // Add sales of each item to the accumulator
        }, 0);
        setTotalSales(totalSales);
        setorderCount(totalOrders);
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
      <div className="grid grid-cols-3 m-auto layout py-7 gap-5 ">
        <div className=" mt-10 aspect-video w-[70%] md:w-full  h-[100px] m-auto bg-[#333] rounded-md shadow-xl ">
          <div className="relative p-5 text-white h-full flex flex-col justify-end ">
            <div className="absolute top-0  shadow-xl bg-red-600 p-7 rounded-full   transform translate-y-[-50%]">
              <HiUsers className="text-[2.2rem]" />
            </div>

            <div className=" items-center flex  justify-between">
              <p className="secondary-title ">Boats </p>{" "}
              <div className="h-[1px] w-[20px] bg-white"></div>
              <p className="  text-[1.5rem]"> {boatCount}</p>
            </div>
          </div>
        </div>

        <div className=" mt-10 aspect-video w-[70%] md:w-full h-[100px]   m-auto bg-[#333] rounded-md shadow-xl ">
          <div className="relative p-5 text-white h-full flex flex-col justify-end ">
            <div className="absolute top-0  shadow-xl bg-red-600 p-7 rounded-full   transform translate-y-[-50%]">
              <LiaStoreSolid className="text-[2.2rem]" />
            </div>

            <div className=" items-center flex justify-between">
              <p className="text-[1.5rem]  ">Cycles </p>{" "}
              <div className="h-[1px] w-[20px] bg-white"></div>
              <p className="  text-[1.5rem]"> {cycleCount}</p>
            </div>
          </div>
        </div>
        <div className=" mt-10 aspect-video w-[70%] md:w-full h-[100px]   m-auto bg-[#333] rounded-md shadow-xl ">
          <div className="relative p-5 text-white h-full flex flex-col justify-end ">
            <div className="absolute top-0  shadow-xl bg-red-600 p-7 rounded-full   transform translate-y-[-50%]">
              <HiUsers className="text-[2.2rem]" />
            </div>

            <div className=" items-center flex  justify-between">
              <p className="secondary-title ">Subscribers </p>{" "}
              <div className="h-[1px] w-[20px] bg-white"></div>
              <p className="  text-[1.5rem]"> {subscriberCount}</p>
            </div>
          </div>
        </div>

     
      </div>

      <div className="grid grid-cols-2 m-auto layout py-7 gap-5 ">
        <div className=" mt-10 aspect-video w-[70%] md:w-full  h-[150px] m-auto bg-[#333] rounded-md shadow-xl ">
          <div className="relative p-5 text-white h-full flex flex-col justify-end ">
            <div className="absolute top-0  shadow-xl bg-red-600 p-7 rounded-full   transform translate-y-[-50%]">
              <HiUsers className="text-[2.2rem]" />
            </div>

            <div className=" items-center flex  justify-between">
              <div>
                <h1 className="text-[1.5rem]">Sales Details</h1>
                <h2 className="text-[.8rem] pb-6">Total Sales this month.</h2>
              </div>
              <div className="h-[1px] w-[20px] bg-white"></div>
              <p className="  text-[1.5rem]"> Rs {totalSales}</p>
            </div>
          </div>
        </div>

        <div className=" mt-10 aspect-video w-[70%] md:w-full h-[150px]  m-auto bg-[#333] rounded-md shadow-xl ">
          <div className="relative p-5 text-white h-full flex flex-col justify-end ">
            <div className="absolute top-0  shadow-xl bg-red-600 p-7 rounded-full   transform translate-y-[-50%]">
              <LiaStoreSolid className="text-[2.2rem]" />
            </div>

            <div className=" items-center flex justify-between">
              <div>
                <h1 className="text-[1.5rem] ">Order Details</h1>
                <h2 className="text-[.8rem] pb-6  ">
                  Total Orders this month.
                </h2>
              </div>
              <div className="h-[1px] w-[20px] bg-white"></div>
              <p className="  text-[1.5rem]"> {orderCount}</p>
            </div>
          </div>
        </div>
      </div>
      {salesData.length > 1 && (
        <div className="  layout py-10">
          <div>
            <h1 className="text-[1.5rem] text-neutral-800">Sales Details</h1>
            <h2 className="text-[.8rem] pb-6 text-neutral-600">
              Average sales per day.
            </h2>
          </div>
          <div className="">
            <Chart
              chartType="LineChart"
              height="500px"
              data={salesData}
              options={options}
              chartPackages={["corechart", "controls"]}
              controls={[
                {
                  controlType: "ChartRangeFilter",
                  options: {
                    filterColumnIndex: 0,
                    ui: {
                      chartType: "LineChart",
                      chartOptions: {
                        chartArea: {
                          width: "100%",
                          margin: "1em",
                          height: "50%",
                        },
                        hAxis: { baselineColor: "none" },
                      },
                    },
                  },
                  controlPosition: "bottom",
                  controlWrapperParams: {
                    state: {
                      range: {
                        start: new Date(2023, 6, 10),
                        end: new Date(2025, 2, 20),
                      },
                    },
                  },
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(Dashoard);
