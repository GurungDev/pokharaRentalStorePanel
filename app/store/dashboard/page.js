"use client";
import withAuth from "@/components/authMiddleware";
import { toast } from "@/components/ui/use-toast";
import { getBoatCount } from "@/services/boat.service";
import { getcycleCount } from "@/services/cycle.service";
import { Chart } from "react-google-charts";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import { HiUsers } from "react-icons/hi2";
import { LiaStoreSolid } from "react-icons/lia";
import { getRevenue, getSalesPerDay } from "@/services/order.service";
import { getSubscriberCount } from "@/services/subscriber.service";

export const options = {
  title: " Data",
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
  const [orderData, setorderData] = useState([]);
  const [ordeCountToday, setordeCountToday] = useState();
  const [salesToday, setsalesToday] = useState();
  const [totalSales, setTotalSales] = useState(0);
  const [orderCount, setorderCount] = useState(0);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const currentMonth = new Date().getMonth() + 1;
  const [revenue, setrevenue] = useState(0);

  useEffect(() => {
    setSalesData([]);
    const fetchData = async () => {
      try {
        const boatCountResult = await getBoatCount();
        const cycleCountResult = await getcycleCount();
        const subscriberResult = await getSubscriberCount();
        setsubscriberCount(subscriberResult?.data);
        setboatCount(boatCountResult.data);
        setcycleCount(cycleCountResult.data);
        const salesDataRes = await getSalesPerDay({ month: 4, year: 2024 });
        let data = [["Days", "Sales"]];
        let data1 = [["Days", "Orders"]];
        salesDataRes?.data.forEach((element) => {
          data1.push([new Date(element.date), parseInt(element.count, 10)]);
          return data.push([
            new Date(element.date),
            parseInt(element.sales, 10),
          ]);
        });

        setSalesData(data);
        setorderData(data1);

        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const currentMonthSales = salesDataRes?.data.filter((data) => {
          const dataMonth = new Date(data.date).getMonth() + 1; // Adding 1 to match the format of currentMonth
          return dataMonth === currentMonth;
        });

        const todayOrderCount = salesDataRes?.data.filter((data) => {
          const dataMonth = new Date(data.date);

          return dataMonth >= today;
        });
        const todayTotalSales = todayOrderCount.reduce((acc, data) => {
          return acc + (parseInt(data?.sales, 10) || 0); // Add sales of each item to the accumulator
        }, 0);

        setsalesToday(todayTotalSales);
        setordeCountToday(todayOrderCount?.length);

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

  useEffect(() => {
    setrevenue(0);
    const fetchData = async () => {
      try {
        const salesAnalysis = await getRevenue({
          month: month,
          year: year,
        });
        let revenue = 0;
        salesAnalysis?.data.forEach((item) => {
          revenue += parseInt(item.sales, 10);
        });
     
        setrevenue(revenue - revenue / 10);
        console.log(revenue);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Couldn't connect to the server",
        });
      }
    };
    fetchData();
  }, [month]);
  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  const getMonthName = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1] || "";
  };
  return (
    <div className="">
      <div className="grid grid-cols-3 m-auto layout py-7 gap-5 ">
        <div className=" mt-10 aspect-video w-[70%] md:w-full  h-[100px] m-auto bg-[#333] rounded-md shadow-xl ">
          <div className="relative p-5 text-white h-full flex flex-col justify-end ">
            <div className="absolute top-0  shadow-xl bg-red-600 p-5 rounded-full   transform translate-y-[-50%]">
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
            <div className="absolute top-0  shadow-xl bg-red-600 p-5 rounded-full   transform translate-y-[-50%]">
              <LiaStoreSolid className="text-[2.2rem]" />
            </div>

            <div className=" items-center flex justify-between">
              <p className="text-[1.5rem]  ">Cycles </p>{" "}
              <div className="h-[1px] w-[20px] bg-white"></div>
              <p className="  text-[1.5rem]"> {cycleCount}</p>
            </div>
          </div>
        </div>
        <div className=" mt-10 aspect-video  w-[70%] md:w-full h-[100px]   m-auto bg-[#333] rounded-md shadow-xl ">
          <div className="relative p-5 text-white h-full flex flex-col justify-end ">
            <div className="absolute top-0  shadow-xl bg-red-600 p-5 rounded-full   transform translate-y-[-50%]">
              <HiUsers className="text-[2.2rem]" />
            </div>
            <div className="text-right ">
              <p className=" text-green-300 text-[.8rem]">
                {" "}
                + {subscriberCount?.today ? subscriberCount?.today : 0}
              </p>
            </div>
            <div className=" items-center flex  justify-between">
              <p className="secondary-title ">Subscribers </p>{" "}
              <div className="h-[1px] w-[20px] bg-white"></div>
              <p className="  text-[1.5rem]"> {subscriberCount?.count}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 items-start  justify-start  m-auto layout   gap-5  ">
        <div className="col-span-1">
          <div className=" my-3 bg-[#333] rounded-md shadow-xl ">
            <div className="relative p-5 text-white  py-5 ">
              <div className=" ">
                <div>
                  <h1 className="text-[1.5rem]">Sales Details</h1>
                  <h2 className="text-[.8rem] pb-6">Total Sales this month.</h2>
                </div>
                <div className="text-right ">
                  <p className=" text-green-300 text-[.8rem]">
                    {" "}
                    + {salesToday ? salesToday : 0}
                  </p>
                </div>
                <div className="h-[1px] w-[20px] bg-white"></div>
                <p className="  text-[1.5rem]"> Rs {totalSales}</p>
              </div>
            </div>
          </div>
          <div className="   my-3 bg-[#333] rounded-md shadow-xl ">
            <div className="  p-5 text-white h-full ">
              <div className=" ">
                <div>
                  <h1 className="text-[1.5rem] ">Revenue Details</h1>
                  <h2 className="text-[.8rem] pb-6  ">
                    Total Revenues in : {getMonthName(month)} / {year}
                  </h2>
                </div>
                <div className="flex items-center ustify-end flex-end my-3 gap-2">
                  <button
                    onClick={handlePrevMonth}
                    className="bg-white flex group items-center gap-2 text-black   px-3 py-2 rounded-md shadow-md"
                  >
                    {" "}
                    <GrLinkPrevious className="group-hover:translate-x-[-5px] duration-300" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="bg-white flex group items-center gap-2 text-black px-3 py-2 rounded-md shadow-md"
                  >
                    <GrLinkNext className="group-hover:translate-x-[5px] duration-300" />
                  </button>
                </div>
                <div className="h-[1px] w-[20px] bg-white"></div>
                <p className="  text-[1.5rem]">Rs {revenue ? revenue : 0}</p>
              </div>
            </div>
          </div>

          <div className="  my-3 bg-[#333] rounded-md shadow-xl ">
            <div className="relative p-5 text-white h-full ">
              <div className=" ">
                <div>
                  <h1 className="text-[1.5rem] ">Order Details</h1>
                  <h2 className="text-[.8rem] pb-6  ">
                    Total Orders this month.
                  </h2>
                </div>
                <div className="text-right ">
                  <p className=" text-green-300 text-[.8rem]">
                    {" "}
                    + {ordeCountToday ? ordeCountToday : 0}
                  </p>
                </div>

                <div className="h-[1px] w-[20px] bg-white"></div>
                <p className="  text-[1.5rem]"> {orderCount}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          {salesData.length > 1 && (
            <div className="w-full py-10">
              <div>
                <h1 className="text-[1.5rem] text-neutral-800">
                  Sales Details
                </h1>
                <h2 className="text-[.8rem] pb-6 text-neutral-600">
                  Average sales per day.
                </h2>
              </div>
              <div className="">
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="400px"
                  data={salesData}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {orderData.length > 1 && (
        <div className="  layout py-10  ">
          <div>
            <h1 className="text-[1.5rem] text-neutral-800">Order Details</h1>
            <h2 className="text-[.8rem] pb-6 text-neutral-600">
              Average Order per day.
            </h2>
          </div>
          <div className="">
            <Chart
              chartType="LineChart"
              height="500px"
              data={orderData}
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
