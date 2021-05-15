import React from "react";
import styled, { keyframes } from "styled-components";
import "./Font.css";

const Table = (props) => {
  console.log(props);
  const monthly_tag = props.table.monthly_tag;
  const monthly_condition = props.table.monthly_condition;
  const weekly_s_average= props.table.week_sleepaverage;

 

  return (
    <React.Fragment>
      <CContainer>
        <BoxContainer>
      
            <Box1>
              <Text className="TimeText"> 월간 태그 빈도수</Text>
              <Text className="Contents">
                <div>운동 {monthly_tag[0]}</div>
                <div> 음주 {monthly_tag[1]}</div>
                <div> 야식 {monthly_tag[2]}</div>
                <div>야근 {monthly_tag[3]}</div>
              </Text>
            </Box1>
     

     
            <Box2>
              <Text className="TimeText"> 월간 컨디션 빈도수</Text>
              <Text className="Contents">
              <div>매우 나쁨 {monthly_condition[0]}</div>
              <div>나쁨 {monthly_condition[1]}</div>
              <div>보통 {monthly_condition[2]}</div>
              <div>좋음 {monthly_condition[3]}</div>
              <div>매우 좋음 {monthly_condition[4]}</div>
              </Text>{" "}
            </Box2>
       
   

          <Box3>
            <Text className="TimeText"> 주간 평균 수면시간</Text>{" "}
            <Text className="TimeText">
              { weekly_s_average[0]}H { weekly_s_average[1]}M
            </Text>
          </Box3>
          
        </BoxContainer>
      </CContainer>
    </React.Fragment>
  );
};

const CContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: black;
`;

const Text = styled.div`
  width: 100%;
  height: 20%;


  padding-top: 3px;
  font-weight: bold;
`;
const boxFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
 `;

const Box1 = styled.div`
  width: 25%;
  height: 100%;
  border: 5px black solid;
  border-radius: 15px;

  text-align: center;
  align-items: center;
  animation: ${boxFade} 1s;
`;

const Box2 = styled.div`
  width: 25%;
  height: 100%;
  border: 5px black solid;
  border-radius: 15px;

  text-align: center;
  align-items: center;
  animation: ${boxFade} 2s alternate;
`;

const Box3 = styled.div`
  width: 25%;
  height: 100%;
  border: 5px black solid;
  border-radius: 15px;
 
  text-align: center;
  align-items: center;
  animation: ${boxFade} 3s alternate;
`;



const BoxContainer = styled.div`
  width: 100%;
  height: 100%;
 
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
`;

export default Table;
