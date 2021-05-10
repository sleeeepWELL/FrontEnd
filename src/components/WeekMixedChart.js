import React from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";

const WeekMixedChart = (props) => {
  let ctx = document.getElementById("mixedChart").getContext("2d");

  const mixedChart = new Chart(ctx, {
    data: {
      datasets: [
        {
          type: "bar",
          label: "Bar Dataset",
          data: [10, 20, 30, 40],
        },
        {
          type: "line",
          label: "Line Dataset",
          data: [50, 50, 50, 50],
        },
      ],
      labels: ["January", "February", "March", "April"],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  return (
    <>
      <mixedChart></mixedChart>
    </>
  );
};

export default WeekMixedChart;
