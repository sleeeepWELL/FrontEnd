import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { AspectRatio } from "@material-ui/icons";

const WeekBarChart = (props) => {
  const weeklydata = props.tags.weekly;

  const chartData1 = {
    type: "bar",
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
        max: 100,
        barThickness: 55,
        color: "white",
        borderRadius: 10,
        // hoverBackgroundColor: "white",
        hoverBorderColor: "white",
        hoverBorderWidth: 1,
        hoverBorderRadius: 10,
        indexAxis: "x",
        data: weeklydata,
      },
    ],
  };

  const chartOptions1 = {
    maintainAspectRatio: false, //상위 컴포넌트에 사이즈 귀속
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "주간 태그 현황",
      },
    },
  };

  return (
    <React.Fragment>
      <Wrap>
        <CContainer1>
          <Bar data={chartData1} options={chartOptions1} />
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
  @media (max-width: 500px) {
    width: 92%;
    height: 80%;
    padding: 1% 2%;
  };
`;

export default WeekBarChart;
