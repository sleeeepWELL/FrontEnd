import React from "react";
import styled from "styled-components";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
 
const Analysis = () => {
 

 return (
    <React.Fragment>
      <Container>
       
        {/* <SleepTime>수면시간</SleepTime>
        <Condition>컨디션</Condition>
        <Graph>그래프</Graph> */}
        <BarChart/>
        <LineChart/>
   </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: 90%;
  border: 1px solid blue;
  margin: 30px;
`;

const CContainer = styled.div`
  width: 90%;
  height: 50%;
  border: 1px solid blue;
  margin: 30px;
  display: flex;
  

`;

const CContainer1 = styled.div`
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
