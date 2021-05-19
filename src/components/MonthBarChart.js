import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";

const MonthBarChart = (props) => {
  const monthlydata = props.tags.monthly;

  const chartData2 = {
    labels: ["운동", "음주", "야근", "야식"],
    datasets: [
      {
        label: "빈도",
        backgroundColor: [
          "rgba(26,35,78,1)",
          "rgba(64,81,133,1)",
          "rgba(153,163,196,1)",
          "rgba(220,228,239,1)",
        ],
        borderColor: "white",
        borderWidth: 2,
        base: 0,
        barThickness: 55,
        borderRadius: 10,
        clip: 3,
        hoverBorderWidth: 2,
        hoverBorderRadius: 10,
        indexAxis: "x",
        data: monthlydata,
      },
    ],
  };

  const chartOptions2 = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "월간 태그 현황",
      },
    },
  };

  return (
    <React.Fragment>
      <Wrap>
        <CContainer1>
          <Bar data={chartData2} options={chartOptions2} />
        </CContainer1>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 100%;
  max-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CContainer1 = styled.div`
  display: flex;
  border-radius: 20px;
  width: 98%;
  height: 88%;
  background-color: white;
  position: relative;
  align-items: center;
  border: 0.5px solid black;
  box-shadow: rgb(0, 0, 0, 15%) 0px 5px 5px 0px;
  padding: 1% 5%;
  @media (max-width: 375px) {
    width: 92%;
    height: 80%;
    padding: 1% 2%;
  };
  `;

export default MonthBarChart;
