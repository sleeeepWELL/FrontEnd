import React from "react";
import styled from "styled-components";
import {Bar} from 'react-chartjs-2';
 
const BarChart = (props) => {
  

 //오늘을 드리면 음주는 몇번 / 운동은 몇번/ 야근은 몇번
 //해당하는 월을  드리면 음주는 몇번/ ...
 const weeklydata = props.tags.weekly; 
 const monthlydata = props.tags.monthly;   
 //최대값 고정

  const chartData1 = {
    labels: ['WORKOUT', 'DRINK', 'OVERTIME','OVEREAT'],
    datasets: [
      {
        label: 'Frequency',
        backgroundColor: ['rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(201, 203, 207, 0.2)'],
        borderColor: 'purple',
        borderWidth: 2,
        base: 0,
        max: 100,
        barThickness: 50,
        // borderSkipped: 'start',
        borderRadius: 10,
        // barPercentage:2.0,
        // categoryPercentage: 0.5,
        // clip: 3, 
        // grouped: false, 
        hoverBackgroundColor: 'white',
        hoverBorderColor: 'black',
        hoverBorderWidth: 5,
        hoverBorderRadius:0,
        // indexAxis: 'y',
        indexAxis: 'x',
        data: weeklydata,
        // order: 30,
        // pointStyle: 'triangle',
      }
    ]
  };

  const chartData2 = {
    labels: ['WORKOUT', 'DRINK', 'OVERTIME','OVEREAT'],
    datasets: [
      {
        label: 'Frequency',
        backgroundColor: ['rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(255, 205, 86, 0.2)'],
        borderColor: 'purple',
        borderWidth: 2,
        base: 0,
        barThickness: 50,
        
        // borderSkipped: 'start',
        borderRadius: 10,
        // categoryPercentage: 0.5,
        clip: 3, 
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
        text: 'Weekly Frequency'
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
        text: 'Monthly Frequency'
      },
      
    }
  };
 
 
 
 return (
    <React.Fragment>
       
        <CContainer>
          <CContainer1>
            <Bar
              data={chartData1}
              width={150}
              height={80}
              options={chartOptions1}
            />
          </CContainer1>
            <CContainer1>
            <Bar
            data={chartData2}
            width={150}
            height={80}
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
  margin: 30px;
`;

const CContainer = styled.div`
  width: 80%;
  height: 30%;
  margin: 30px;
  display: flex;
  // flex-direction: column;
  
  

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

export default BarChart;
