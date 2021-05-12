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
        backgroundColor: "rgba(0, 216, 190, 1)",
        borderColor: "rgba(0, 216, 190, 1)",
        type: "line",
      },
      {
        // 막대그래프
        label: "실제 수면시간",
        data: bardata,
        backgroundColor: "rgba(54, 162, 235, 0.4)",
        borderColor: "rgba(54, 162, 235, 0.4)",
        borderRadius: 5,
        // stack: "combined",
        type: "bar",
      },
    ],
  };
  const chartOptions = {
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
          <Bar data={data} width={140} height={80} options={chartOptions}></Bar>
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
  width: 50%;
  max-height: 43vh;
  /* background-color: white; */
  /* opacity: 0.7; */
`;

export default WeekMixedChart;