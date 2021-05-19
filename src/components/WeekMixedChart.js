import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import moment from "moment";

const WeekMixedChart = (props) => {
  let today = parseInt(moment().format("DD"));

  const sleepdata = props.data.compareSleepData;

  const setD1 = [];
  const setD2 = [];
  const setD3 = [];
  const setD4 = [];
  const setD5 = [];
  const setD6 = [];
  const setD7 = [];

  sleepdata.forEach((data) => {
    if (data.date[2] == today - 6) {
      setD1.push(data);
    } else if (data.date[2] == today - 5) {
      setD2.push(data);
    } else if (data.date[2] == today - 4) {
      setD3.push(data);
    } else if (data.date[2] == today - 3) {
      setD4.push(data);
    } else if (data.date[2] == today - 2) {
      setD5.push(data);
    } else if (data.date[2] == today - 1) {
      setD6.push(data);
    } else if (data.date[2] == today) {
      setD7.push(data);
    }
  });

  let labeldata = [
    "6일전",
    "5일전",
    "4일전",
    "3일전",
    "2일전",
    "1일전",
    "오늘",
  ];

  let linedata = [
    setD1[0] ? setD1[0].adequateSleepTime : null,
    setD2[0] ? setD2[0].adequateSleepTime : null,
    setD3[0] ? setD3[0].adequateSleepTime : null,
    setD4[0] ? setD4[0].adequateSleepTime : null,
    setD5[0] ? setD5[0].adequateSleepTime : null,
    setD6[0] ? setD6[0].adequateSleepTime : null,
    setD7[0] ? setD7[0].adequateSleepTime : null,
  ];

  let bardata = [
    setD1[0] ? setD1[0].mySleepTime : null,
    setD2[0] ? setD2[0].mySleepTime : null,
    setD3[0] ? setD3[0].mySleepTime : null,
    setD4[0] ? setD4[0].mySleepTime : null,
    setD5[0] ? setD5[0].mySleepTime : null,
    setD6[0] ? setD6[0].mySleepTime : null,
    setD7[0] ? setD7[0].mySleepTime : null,
  ];

  const data = {
    labels: labeldata,
    datasets: [
      {
        // 선 그래프
        label: "적정 수면시간",
        data: linedata,
        backgroundColor: "#FFDF48",
        borderColor: "#FFDF48",
        type: "line",
      },
      {
        // 막대그래프
        label: "실제 수면시간",
        data: bardata,
        backgroundColor: "#384870",
        borderColor: "rgba(54, 162, 235, 0.4)",
        borderRadius: 5,
        type: "bar",
        barThickness: 55,
      },
    ],
  };
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      //범례
      legend: {
        labels: {
          font: { size: 10 },
        },
        position: "bottom",
      },
      title: {
        display: true,
        text: "주간 수면시간",
      },
      tooltip: {
        events: ["click"],
      },
    },
    scales: {
      y: {
        min: 0,
        max: 20,
      },
    },
  };

  return (
    <>
      <Wrap>
        <Container>
          <Bar data={data} options={chartOptions}></Bar>
        </Container>
      </Wrap>
    </>
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

const Container = styled.div`
  display: flex;
  border-radius: 20px;
  width: 99%;
  height: 88%;
  background-color: white;
  position: relative;
  align-items: center;
  border: 0.5px solid black;
  box-shadow: rgb(0, 0, 0, 15%) 0px 5px 5px 0px;
  padding: 1% 5%;
  `;

export default WeekMixedChart;
