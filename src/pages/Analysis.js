import React from "react";
import styled from "styled-components";
import {Doughnut} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
 
const Analysis = () => {
  
  const data = {
    labels: [
      'Red',
      'Green',
      'Yellow',
      'Blue',
    ],
    
    datasets: [{
      data: [0, 50, 100, 200],
      backgroundColor: [
      'red',
      'green',
      'yellow',
      'blue'
      ],
      hoverBackgroundColor: [
      'pink',
      'white',
      'gold',
      'skyblue'
      ]
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'SleepWell Dought'
      }
    }
  };
  
 const weeklydata = [60,70,60,70,60,70,60]  

  //몇번 째 주를 보내주면 그 주에 해당하는 정보를 월-일까지 쭉 내려주는 
  const chartData = {
    labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    datasets: [
      {
        label: 'Sleep Time',
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 2,
        hoverBackgroundColor: 'blue',
        hoverBorderColor: 'grey',
        data: weeklydata
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        backgroundColor: 'black'
      },
      title: {
        display: true,
        text: 'SleepWell Chart'
      }
    }
  };
 
 
 return (
    <React.Fragment>
      <Container>
        <SleepTime>수면시간</SleepTime>
        <Condition>컨디션</Condition>
        <Graph>그래프</Graph>
        <DContainer>
        <Doughnut 
        data={data}
        options={options}
        />
        </DContainer>
        <CContainer>
        <Bar
        data={chartData}
        options={chartOptions}
        
        />
        </CContainer>
   </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid blue;
  margin: 30px;
`;

const DContainer = styled.div`
  width: 20%;
  height: 30%;
  border: 1px solid blue;
  margin: 30px;
`;
const CContainer = styled.div`
  width: 40%;
  height: 10%;
  border: 1px solid blue;
  margin: 30px;
`;


const SleepTime = styled.div`
  width: auto;
  height: auto;
  border: 1px solid blue;
  margin: 20px;
  padding: 10px;
`;

const Condition = styled.div`
  width: auto;
  height: auto;
  border: 1px solid blue;
  margin: 20px;
  padding: 10px;
`;

const Graph = styled.div`
  width: auto;
  height: auto;
  border: 1px solid blue;
  margin: 20px;
  padding: 10px;
`;

export default Analysis;
