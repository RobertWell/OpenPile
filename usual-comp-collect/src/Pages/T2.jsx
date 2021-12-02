import React, { useRef, useEffect } from "react";
import { plotLine } from "../composables/plotLine";

function T2() {
  const myCanvas = useRef(null);
  useEffect(() => {
    console.log("----canvas", myCanvas.current);

    // const labels = ["January", "February", "March", "April", "May", "June"];
    const labels = [2014, 2015, 2016, 2017, 2018, 2019];
    const data = {
      labels,
      
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(218, 223, 225, 0.5)",
          borderColor: "rgba(218, 223, 225, 0.5)",
          data: [0, 10, 5, 2, 20, 30, 41],
          fill:'origin',
        },
        // {
        //   label: "My Second dataset",
        //   backgroundColor: "rgb(255, 99, 132)",
        //   borderColor: "rgb(255, 99, 132)",
        //   data: [10, 12, 35, 21, 2, 3, 45],
        //   fill:'origin',
        // },
      ],
    };

    plotLine({ ctx: myCanvas.current.getContext('2d'), data, title: "Hello wolrd" });
  }, []);
  return (
    <div style={{ width: "50%", height: "50%" }}>
      
      <canvas ref={myCanvas} />
    </div>
  );
}

export default T2;
