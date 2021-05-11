import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";

const WeekBarChart = (props) => {
  const weeklydata = props.tags.weekly;

  const chartData1 = {
    type: "bar",
    labels: ["운동", "음주", "야근", "야식"],
    datasets: [
      {
        label: "빈도",
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
          "rgba(206, 203, 210, 0.5)",
        ],

        borderColor: "white",
        borderWidth: 2,
        base: 0,
        max: 100,
        barThickness: 55,
        color: "white",
        borderRadius: 10,
        hoverBackgroundColor: "white",
        hoverBorderColor: "black",
        hoverBorderWidth: 5,
        hoverBorderRadius: 0,
        indexAxis: "x",
        data: weeklydata,
      },
    ],
  };

  const chartOptions1 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
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
          <Bar
            data={chartData1}
            width={130}
            height={90}
            options={chartOptions1}
          />
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
  width: 50%;
  max-height: 43vh;
`;

export default WeekBarChart;
