import React from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";

const WeekMixedChart = (props) => {
  //   let ctx = document.getElementById("mixedChart").getContext("2d");

  const mixedChart = new Chart({
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
      <Wrap>
        <Container>
          <mixedChart width={150} height={100}></mixedChart>
        </Container>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  max-height: 45vh;
  display: flex;
  background-color: red;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  width: 60%;
  height: auto;
  background-color: white;
  opacity: 0.7;
`;

export default WeekMixedChart;
