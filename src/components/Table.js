import React from "react";
import styled, { keyframes } from "styled-components";
import "./Font.css";

const Table = (props) => {
  console.log(props);
  const monthly_tag = props.table.monthly_tag;
  const monthly_condition = props.table.monthly_condition;
  const weekly_s_average = props.table.week_sleepaverage;

  return (
    <React.Fragment>
      <CContainer>
        <TitleContainer>
          <Text className="TimeText"> 월간 태그 빈도수</Text>
          <Text className="TimeText"> 월간 컨디션 빈도수</Text>
          <Text className="TimeText"> 주간 수면시간 평균</Text>{" "}
        </TitleContainer>

        <BoxContainer>
          <Box1>
            <Text className="Contents">
              <Title>
                <div>운동 </div>
                <div> 음주 </div>
                <div> 야식 </div>
                <div>야근 </div>
              </Title>
              <Value>
                <div> {monthly_tag[0]}</div>
                <div> {monthly_tag[1]}</div>
                <div> {monthly_tag[2]}</div>
                <div> {monthly_tag[3]}</div>
              </Value>
            </Text>
          </Box1>

          <Box2>
            <Text className="Contents">
              <Title>
                <div>매우 나쁨</div>
                <div>나쁨 </div>
                <div>보통 </div>
                <div>좋음 </div>
                <div>매우 좋음</div>
              </Title>
              <Value>
                <div>{monthly_condition[0]}</div>
                <div>{monthly_condition[1]}</div>
                <div>{monthly_condition[2]}</div>
                <div>{monthly_condition[3]}</div>
                <div>{monthly_condition[4]}</div>
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
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: black;
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
  width: 60%;
  height: 50%;
  justify-content: space-between;
  text-align: left;
  margin: auto 20%;
`;

const Value = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 50%;
  justify-content: space-between;
  margin: auto;
  color: black;
  text-align: left;
`;

const boxFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
 `;

const slidein = keyframes`
  0% {
    margin-top: 2%;
    background-color: yellow;
  }
  // 50%{
  //   margin-top: 1%;
  // }
  100% {
    margin-top: 0%;
    background-color: gold;
  }
 `;
const Box1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 31%;
  height: 99%;
  border-radius: 23vh;
  text-align: center;
  border: 1px grey solid;
  align-items: center;
  animation: ${slidein} 1.3s infinite alternate;
  box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;

  margin-left: 1.5%;
`;

const Box2 = styled.div`
  position: absolute;
  top: 0;
  left: 33%;
  width: 31%;
  height: 99%;

  border-radius: 23vh;
  border: 1px grey solid;
  text-align: center;
  align-items: center;
  animation: ${slidein} 1s infinite alternate;
  box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;
  margin-left: 1.5%;
`;

const Box3 = styled.div`
  position: absolute;
  top: 0;
  left: 66%;
  width: 31%;
  height: 99%;

  border-radius: 23vh;

  align-items: center;
  animation: ${slidein} 1.5s infinite alternate;
  box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;
  margin-left: 1.5%;
`;

const BoxContainer = styled.div`
  position: relative;
  width: 97%;
  height: 0;
  padding-bottom: 30%;

  display: flex;

  align-items: center;
`;
const TitleContainer = styled.div`
  position: relative;
  width: 97%;
  height: 0;
  padding-bottom: 5%;
  display: flex;
  justify-content: space-between;
  margin-top: 5%;

  text-align: center;

  align-items: center;
`;

export default Table;
