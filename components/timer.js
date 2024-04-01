"use client";

import React, { useState, useRef, useEffect } from "react";

const Timer = (props) => {
  const Ref = useRef(null);

  const [timer, setTimer] = useState("00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("00:10");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 120);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  return (
    <div className="w-full">
      {timer == "00:00" ? (
        <div className="flex items-center justify-between w-full ">
          <small className="text-red-600 ">OTP has been expired !</small>
          <div
            onClick={() => {
              props.onSendOTPFormSubmit();
              onClickReset();
            }}
            className="flex hover:translate-x-[-10px] duration-300 cursor-pointer gap-2   items-center"
          >
            <small> Send Otp Again</small>
          </div>
        </div>
      ) : (
        <small>{timer}</small>
      )}
    </div>
  );
};

export default Timer;
