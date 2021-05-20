import React from "react";
import styled, { keyframes } from "styled-components";
import "../components/Font.css";

const MTable = (props) => {
  const monthly_tag = props.table.monthly_tag;
  const monthly_condition = props.table.monthly_condition;
  const weekly_s_average = props.table.week_sleepaverage;

  return (
    <React.Fragment>
      <CContainer>
        <TitleContainer>
          <TText className="TimeText"> 월간 태그 빈도수</TText>
          <TText className="TimeText"> 월간 컨디션 빈도수</TText>
          <TText className="TimeText"> 주간 수면시간 평균 </TText>{" "}
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
              <Title2>
                <div>매우 나쁨</div>
                <div>나쁨 </div>
                <div>보통 </div>
                <div>좋음 </div>
                <div>매우 좋음</div>
              </Title2>
              <Value2>
                <div>{monthly_condition[0]}</div>
                <div>{monthly_condition[1]}</div>
                <div>{monthly_condition[2]}</div>
                <div>{monthly_condition[3]}</div>
                <div>{monthly_condition[4]}</div>
              </Value2>
            </Text>
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
  color: black;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  width: 100%;
  height: 95%;
  font-weight: 700;
  font-size: 0.4rem;
  @media (max-width: 320px) {
    font-size: 0.2rem;
  }
`;

const TText = styled.div`
  width: 33%;
  height: 100%;
  font-weight: 700;
  font-size: 0.7rem;

  text-align: center;
  align-items: center;
  @media (max-width: 320px) {
    font-size: 0.5rem;
  }
`;

const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  margin-bottom:5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 50%;
  justify-content: space-between;
  text-align: center;
  margin: auto 14%;
`;

const Value = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 50%;
  justify-content: space-between;
  margin: auto 10%;
  color: black;
  text-align: left;
`;

const Title2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 60%;
  justify-content: space-between;
  text-align: left;
  margin: 17% 0% 0% 12%;
  padding-left: 4px;
  @media (max-width: 320px) {
    width: 70%;
    font-size: 0.2rem;
    padding-left: 5px;
    padding-bottom: 2px;
  }
`;

const Value2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 60%;
  justify-content: space-between;
  margin: 17% 0% 0% 7%;
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
   background-color:  #FFF9DF;
 }
 // 50%{
 //   margin-top: 1%;
 // }
 100% {
   margin-top: 0%;
   background-color: #FEFOAE ;
 }
`;

const Box1 = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  top: 0;
  left: 0;
  width: 31%;
  border-radius: 50%;
  text-align: center;
  background-color:  #FFF9DF;
  align-items: center;
  animation: ${slidein} 1.3s infinite alternate;
  animation-iteration-count: 3;
  box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;
  margin-left: 1.5%;
`;

const Box2 = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 33%;
  width: 31%;
  height: 100%;

  border-radius: 50%;
  background-color:  #FFF9DF;
  text-align: center;
  align-items: center;
  animation: ${slidein} 1s infinite alternate;
  animation-iteration-count: 3;
  box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;
  margin-left: 1.5%;
`;

const Box3 = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 66%;
  width: 31%;
  height: 100%;
  border-radius: 50%;
  background-color:  #FFF9DF;
  align-items: center;
  animation: ${slidein} 1.5s alternate;
  animation-iteration-count: 3;
  box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;
  margin-left: 1.5%;
`;

const BoxContainer = styled.div`
  position: relative;
  width: 105%;
  padding-bottom: 33%;
  display: flex;
 
`;

export default MTable;
