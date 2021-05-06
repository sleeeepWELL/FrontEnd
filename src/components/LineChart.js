import React from "react";
import styled from "styled-components";
import {Line} from 'react-chartjs-2';
 
const LineChart = () => {
  
 const weeklydata = [3,7,4,4,4,4,4]   
 const monthlydata = [1,2,3,1,4]    
 //최대값 고정

  const chartData1 = {
    labels: ['M', 'T', 'W','T','F','S','S'],
    datasets: [
      {
        label: 'Sleep Time',
        backgroundColor: 'black',
        borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
        borderCapStyle: 'circle',
        borderDash:[10],
        // borderDashOffset:1.0,
        // borderJoinStyle:'miter',
        borderWidth: 10,
        base: 0,
        barThickness: 10,
        cubicInterpolationMode:'monotone',
        // borderSkipped: 'start',
        // categoryPercentage: 0.5,
        // clip: 3, 
        // grouped: false, 
        hoverBackgroundColor: 'blue',
        hoverBorderColor: 'black',
        hoverBorderWidth: 5,
        hoverBorderRadius:0,
        // indexAxis: 'y',
        indexAxis: 'x',
        data: weeklydata,
        pointBackgroundColor: 'black',
        pointStyle:'square',
        // order: 30,
        // pointStyle: 'triangle',
      }
    ]
  };

  const chartData2 = {
    labels: ['1','2','3','4','5'],
    datasets: [
      {
        label: 'Sleep Time',
        backgroundColor: 'black',
        borderColor: 'purple',
        borderWidth: 2,
        base: 0,
        barThickness: 10,
        // borderSkipped: 'start',
        borderRadius: 10,
        // categoryPercentage: 0.5,
        // clip: 3, 
        // grouped: false, 
        hoverBackgroundColor: 'blue',
        hoverBorderColor: 'black',
        hoverBorderWidth: 5,
        hoverBorderRadius:0,
        // indexAxis: 'y',
        indexAxis: 'x',
        data: monthlydata,
        // order: 30,
        // pointStyle: 'triangle',
      }
    ]
  };


  const chartOptions1 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        backgroundColor: 'yellow'
      },
      title: {
        display: true,
        text: 'Weekly SleepWell Chart'
      },
      
    }
  };

  const chartOptions2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        backgroundColor: 'yellow'
      },
      title: {
        display: true,
        text: 'Monthly SleepWell Chart'
      },
      
    }
  };
 
 
 
 return (
    <React.Fragment>
       
        <CContainer>
          <CContainer1>
            <Line
              data={chartData1}
              width={120}
              height={50}
              options={chartOptions1}
            />
          </CContainer1>
            <CContainer1>
            <Line
            data={chartData2}
            width={120}
            height={50}
            options={chartOptions2}
            />
            </CContainer1>
      </CContainer>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid blue;
  margin: 30px;
`;

const CContainer = styled.div`
  width: 80%;
  height: 40%;
  margin: 30px;
  display: flex;
  

`;

const CContainer1 = styled.div`
  width: 40%;
  height: 10%;
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

export default  LineChart ;
