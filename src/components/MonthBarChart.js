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
          "rgba(54, 162, 235, 0.4)",
          "rgba(153, 102, 255, 0.3)",
          "rgba(201, 203, 207, 0.4)",
          "rgba(206, 203, 210, 0.6)",
        ],
        borderColor: "white",
        borderWidth: 2,
        base: 0,
        barThickness: 55,
        borderRadius: 10,
        clip: 3,
        hoverBackgroundColor: "blue",
        hoverBorderColor: "black",
        hoverBorderWidth: 5,
        hoverBorderRadius: 0,
        indexAxis: "x",
        data: monthlydata,
      },
    ],
  };

  const chartOptions2 = {
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
          <Bar
            data={chartData2}
            width={130}
            height={90}
            options={chartOptions2}
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

export default MonthBarChart;
