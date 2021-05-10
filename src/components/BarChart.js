import React from "react";
import styled from "styled-components";
import {Bar} from 'react-chartjs-2';

const BarChart = (props) => {
  
 const weeklydata = props.tags.weekly; 
 const monthlydata = props.tags.monthly;   

  const chartData1 = {
    type: 'bar',
    labels: ['WORKOUT', 'DRINK', 'OVERTIME','SNACK'],
    datasets: [
      {
        label: 'Frequency',
        backgroundColor: 
        ['rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(206, 203, 210, 0.5)'],
      
        borderColor: 'white',
        borderWidth: 2,
        base: 0,
        max: 100,
        barThickness: 50,
        color: 'white',
        borderRadius: 10,
        hoverBackgroundColor: 'white',
        hoverBorderColor: 'black',
        hoverBorderWidth: 5,
        hoverBorderRadius:0,
        indexAxis: 'x',
        data: weeklydata,
      }
    ]
  };

  const chartData2 = {
    labels: ['WORKOUT', 'DRINK', 'OVERTIME','SNACK'],
    datasets: [
      {
        label: 'Frequency',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        base: 0,
        barThickness: 50,
        borderRadius: 10,
        clip: 3, 
        hoverBackgroundColor: 'blue',
        hoverBorderColor: 'black',
        hoverBorderWidth: 5,
        hoverBorderRadius:0,
        indexAxis: 'x',
        data: monthlydata,
      }
    ]
  };
  

  const chartOptions1 = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          fontColor: "white",
          fontSize: 18
        }
      },
      title: {
        display: true,
        text: 'Weekly Frequency',
      },
    }
  };

  const chartOptions2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        backgroundColor: 'black'
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
              height={100}
              options={chartOptions1}
            />
          </CContainer1>
            <CContainer1>
            <Bar
            data={chartData2}
            width={150}
            height={100}
            options={chartOptions2}
            />
            </CContainer1>
      </CContainer>
    </React.Fragment>
  );
};

const CContainer = styled.div`
  width: 80%;
  height: 30%;
  display: flex;
  // flex-direction: column;
`;

const CContainer1 = styled.div`
  width: 40%;
  height: 10%;
  margin: 30px 0px 0px 40px;
`;

export default BarChart;
