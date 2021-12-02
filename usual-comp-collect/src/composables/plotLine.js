import React from "react";
import Chart from "chart.js/auto";

function plotLine({ ctx, data, title }) {


    let gradient = ctx.createLinearGradient(0,0,0,900)
    gradient.addColorStop(0, 'rgba(58, 123, 213, 1)')
    gradient.addColorStop(1, 'rgba(0, 210, 255, 0.3)')
    data.datasets[0]['backgroundColor']=gradient
// console.log(ctx.getContext('2d'));

  const config = {
    type: "line",
    data,

    options: {
        radius:2,
      scales: {
        y:{
           ticks:{
            callback: function (value, index, values) {
                return `${value} 人`;
              },
           }
        }
      },
      //   plugins: {
      //     title: {
      //       text: title,
      //       display: title !== null || title !== undefined,
      //     },
      //   },
      // plugins: {
      //     backgrounds: {
      //       hbars: [{
      //         // from: 0,
      //         // to: 'MIN',
      //         color: "rgb(230, 195, 195)"
      //       }]
      //     }
      //   }
    },
  };
  let chart = new Chart(ctx, config);
}

export { plotLine };
