import React from "react";
import styled, { keyframes } from "styled-components";
import "./Font.css";

const Table = (props) => {
  const monthly_tag = props.table.monthly_tag;
  const monthly_condition = props.table.monthly_condition;
  const weekly_s_average = props.table.week_sleepaverage;
 
 
  return (
    <React.Fragment>
      <CContainer>
        <TitleContainer>
          <Text className="TimeText"> 월간 태그 빈도수</Text>
          <Text className="TimeText"> 월간 컨디션 빈도수</Text>
          <Text className="TimeText"> 주간 수면시간 평균</Text>
        </TitleContainer>
        <BoxContainer>
          <Box1>
            <Text className="Contents">
              <Title>
              {monthly_tag[0]<19 ? monthly_tag[0]>9 ? <div style={{color: "orange"}}> 운동 </div> :<div> 운동</div> : <div style={{color: "red"}}> 운동</div> }
              {monthly_tag[1]<19 ? monthly_tag[1]>9 ? <div style={{color: "orange"}}> 음주 </div> :<div> 음주</div> : <div style={{color: "red"}}> 음주</div> }
              {monthly_tag[2]<19 ? monthly_tag[2]>9 ? <div style={{color: "orange"}}> 야식 </div> :<div> 야식</div> : <div style={{color: "red"}}> 야식</div> }
              {monthly_tag[3]<19 ? monthly_tag[3]>9 ? <div style={{color: "orange"}}> 야근 </div> :<div> 야근</div> : <div style={{color: "red"}}> 야근</div> }
              </Title>
              <Value>
               {monthly_tag[0]<19 ? monthly_tag[0]>9 ? <div style={{color: "orange"}}> {monthly_tag[0]}회</div> :<div> {monthly_tag[0]}회</div> : <div style={{color: "red"}}> {monthly_tag[0]}회</div> }
               {monthly_tag[1]<19 ? monthly_tag[1]>9 ? <div style={{color: "orange"}}> {monthly_tag[1]}회</div> :<div> {monthly_tag[1]}회</div> : <div style={{color: "red"}}> {monthly_tag[1]}회</div> }
               {monthly_tag[2]<19 ? monthly_tag[2]>9 ? <div style={{color: "orange"}}> {monthly_tag[2]}회</div> :<div> {monthly_tag[2]}회</div> : <div style={{color: "red"}}> {monthly_tag[2]}회</div> }
               {monthly_tag[3]<19 ? monthly_tag[3]>9 ? <div style={{color: "orange"}}> {monthly_tag[3]}회</div> :<div> {monthly_tag[3]}회</div> : <div style={{color: "red"}}> {monthly_tag[3]}회</div> }
              </Value>
            </Text>
          </Box1>
   
          <Box2>
            <Text className="Contents">
              <Title>
                {Math.max.apply(null, monthly_condition) === monthly_condition[0] ? <div style={{color:"orange"}}>매우 나쁨</div> :<div>매우 나쁨</div>}
                {Math.max.apply(null, monthly_condition) === monthly_condition[1] ? <div style={{color:"orange"}}>나쁨</div> :<div>나쁨</div>}
                {Math.max.apply(null, monthly_condition) === monthly_condition[2] ? <div style={{color:"orange"}}>보통</div> :<div>보통</div>}
                {Math.max.apply(null, monthly_condition) === monthly_condition[3] ? <div style={{color:"orange"}}>좋음</div> :<div>좋음</div>}
                {Math.max.apply(null, monthly_condition) === monthly_condition[4] ? <div style={{color:"orange"}}>매우 좋음</div> :<div>매우 좋음</div>}
              </Title>
              <Value>
              {Math.max.apply(null, monthly_condition) === monthly_condition[0] ? <div style={{color:"orange"}}>{monthly_condition[0]}일</div> :<div>{monthly_condition[0]}일</div>}
              {Math.max.apply(null, monthly_condition) === monthly_condition[1] ? <div style={{color:"orange"}}>{monthly_condition[1]}일</div> :<div>{monthly_condition[1]}일</div>}
              {Math.max.apply(null, monthly_condition) === monthly_condition[2] ? <div style={{color:"orange"}}>{monthly_condition[2]}일</div> :<div>{monthly_condition[2]}일</div>}
                {Math.max.apply(null, monthly_condition) === monthly_condition[3] ? <div style={{color:"orange"}}>{monthly_condition[3]}일</div> :<div>{monthly_condition[3]}일</div>}
                {Math.max.apply(null, monthly_condition) === monthly_condition[4] ? <div style={{color:"orange"}}>{monthly_condition[4]}일</div> :<div>{monthly_condition[4]}일</div>}
              </Value>
            </Text>{" "}
          </Box2>

          <Box3>
            <Text className="Contents">
              <Text className="BigTimeText">
                {weekly_s_average[0]}시간 {weekly_s_average[1]}분
              </Text>
            </Text>
          </Box3>
        </BoxContainer>
      </CContainer>
    </React.Fragment>
  );
};

const CContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 3px;
  font-weight: bold;
  font-size: 1vw;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 50%;
  justify-content: space-between;
  text-align: left;
  margin: auto 20%;
`;

const Value = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  height: 50%;
  justify-content: space-between;
  margin: auto;
  color: black;
  text-align: left;
`;

const slidein = keyframes`
  0% {
    margin-top: 2%;
    background-color:  #FFF9DF;
  }
  100% {
    margin-top: 0%;
    background-color: #FEFOAE ;
  }
 `;

const Box1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 31%;
  height: 100%;
  border-radius: 50%;
  text-align: center;
  background-color: #fff9df;
  align-items: center;
  animation: ${slidein} 1.3s infinite alternate;
  animation-iteration-count: 3;
  box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;
  margin-left: 1.5%;
  :hover {
    box-shadow: rgb(255 212 0/ 60%) 0px 4px 10px 0px;
    transition: box-shadow 2s ease-in 0s;
  }
`;

const Box2 = styled.div`
  position: absolute;
  top: 0;
  left: 33%;
  width: 31%;
  height: 99%;

  border-radius: 50%;
  background-color: #fff9df;
  text-align: center;
  align-items: center;
  animation: ${slidein} 1s infinite alternate;
  animation-iteration-count: 5;
  box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;
  margin-left: 1.5%;
  :hover {
    box-shadow: rgb(255 212 0/ 60%) 0px 4px 10px 0px;
    transition: box-shadow 2s ease-in 0s;
  }
`;

const Box3 = styled.div`
  position: absolute;
  top: 0;
  left: 66%;
  width: 31%;
  height: 99%;

  border-radius: 50%;
  background-color: #fff9df;
  align-items: center;
  animation: ${slidein} 1.5s alternate;
  animation-iteration-count: 7;

  box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;
  margin-left: 1.5%;
  &:hover {
    box-shadow: rgb(255 212 0/ 60%) 0px 4px 10px 0px;
    transition: box-shadow 2s ease-in 0s;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 76%;
  padding-bottom: 23%;
  margin-top: 1%;
`;
const TitleContainer = styled.div`
  display: flex;
  width: 76%;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  padding: 1rem 0px;
`;

export default Table;
