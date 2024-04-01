"use client";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { FaPhone, FaUser } from "react-icons/fa6";
import { MdEmail, MdOutlineStorefront } from "react-icons/md";

const TopBar = () => {
  const { name, email, number, ownerName } = useSelector(
    (state) => state.account
  );
  const [isClient, setisClient] = useState(false);
  useEffect(() => {
    setisClient(true);
  }, []);

  return (
    <div className="my-5">
      <div className="bg-neutral-700 layout rounded-xl ">
        <div className="py-3 px-10 flex flex-col md:flex-row gap-5 items-start justify-between">
          <div className="flex items-center gap-3">
            <MdOutlineStorefront size={25} className="text-white" />
            <div className="grid">
              <small className="small text-white">Store Name</small>
              {isClient && <small className="small text-white">{name} </small>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaUser size={25} className="text-white" />
            <div className="grid">
              <small className="small text-white">Owner</small>
              {isClient && (
                <small className="small text-white">{ownerName} </small>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdEmail size={25} className="text-white" />
            <div className="grid">
              <small className="small text-white">Store Email</small>
              {isClient && <small className="small text-white">{email} </small>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaPhone size={25} className="text-white" />
            <div className="grid">
              <small className="small text-white">Phone Number</small>
              {isClient && (
                <small className="small text-white">{number} </small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
