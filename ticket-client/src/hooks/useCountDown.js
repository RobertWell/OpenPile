import React, { useEffect, useState } from "react";

const useCountDown = (seconds) => {
  const time = new Date(Date.now() + seconds * 1000);
  const [timeLeft, setTimeLeft] = useState(seconds);
  const now = new Date();

  useEffect(() => {
    const timer = setInterval(() => {
      now.setTime(now.getTime() + 1000);
      const msLeft = time - now;
      setTimeLeft(msLeft/1000);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return { secondsLeft: timeLeft };
};

export default useCountDown;
