import React from "react";
import styled, { keyframes } from "styled-components";
import "../components/Font.css";

const MTable = (props) => {
  console.log(props);
  const monthly_tag = props.table.monthly_tag;
  const monthly_condition = props.table.monthly_condition;
  const weekly_s_average = props.table.week_sleepaverage;

  return (
    <React.Fragment>
      <CContainer>
        <TitleContainer>
          <TText className="TimeText"> 월간 태그 빈도수&nbsp;</TText>
          <TText className="TimeText"> 월간 컨디션 빈도수&nbsp;</TText>
          <TText className="TimeText"> &nbsp;주간 수면시간 평균 </TText>{" "}
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
  color: black;
  align-items: center;
  /* border: 1px solid black; */
`;

const Text = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 700;
  font-size: 0.5rem;
`;

const TText = styled.div`
  width: 33%;
  height: 100%;
  font-weight: 700;
  font-size: 0.8rem;

  text-align: center;
  align-items: center;
  /* border: 1px solid black; */
`;

const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  /* padding-bottom: 5%; */
  display: flex;
  justify-content: space-between;
  margin: 20% 0 -5% 0;

  /* text-align: center; */
  /* text-align: justify; */

  /* align-items: center; */
  /* border: 1px solid red; */
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 50%;
  justify-content: space-between;
  text-align: left;
  margin: auto 10%;
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

const Title2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 50%;
  justify-content: space-between;
  text-align: left;
  margin: 16%;
`;

const Value2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 50%;
  justify-content: space-between;
  margin: 16% 0% 0% 0%;
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
  display: flex;
  top: 0;
  left: 0;
  width: 31%;
  height: 99%;
  border-radius: 23vh;
  text-align: center;

  align-items: center;
  animation: ${slidein} 1.3s infinite alternate;
  box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;

  margin-left: 1.5%;
`;

const Box2 = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 33%;
  width: 31%;
  height: 99%;

  border-radius: 23vh;
  text-align: center;
  align-items: center;
  animation: ${slidein} 1s infinite alternate;
  box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;
  margin-left: 1.5%;
`;

const Box3 = styled.div`
  position: absolute;
  display: flex;
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
  width: 100%;
  height: 0;
  padding-bottom: 30%;
  top: 10%;
  justify-content: space-between;

  display: flex;

  align-items: center;
  /* border: 1px solid blue; */
`;

export default MTable;
