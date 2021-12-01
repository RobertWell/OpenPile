import React, { useEffect, useState } from "react";

const useClock = () => {
  let now = new Date();
  const [time, setTime] = useState(now);
  const [h, setH] = useState(now.getHours());
  const [m, setM] = useState(now.getMinutes());
  const [s, setS] = useState(now.getSeconds());
  const [ms, setMs] = useState(now.getMilliseconds());
  const [total_ms, setTotalMS] = useState(now.getTime());
  // console.log(h,m,s);
  useEffect(() => {
    let now = new Date();

    const timer = setInterval(() => {
      now.setTime(Date.now());
      setTime(now);
      setH(now.getHours());
      setM(now.getMinutes());
      setS(now.getSeconds());
      setMs(now.getMilliseconds())
      setTotalMS(now.getTime())
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return { time, h, m, s, ms, total_ms };
};

export default useClock;
