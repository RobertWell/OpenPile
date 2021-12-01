import  { useEffect, useState } from "react";

const useTimer = (time) => {
  const [timeLeft, setTimeLeft] = useState("");


  useEffect(() => {
    const now = new Date();
    const timer = setInterval(() => {
      now.setTime(now.getTime() + 1000);
      const msLeft = time - now;
      setTimeLeft(msLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  return { timeLeft };
};

export default useTimer;
