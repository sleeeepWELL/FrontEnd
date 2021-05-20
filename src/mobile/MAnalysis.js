import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import WeekBarChart from "../components/WeekBarChart";
import MonthBarChart from "../components/MonthBarChart";
import MWeekMixedChart from "../mobile/MWeekMixedChart";
import MTable from "../mobile/MTable";
import { actionCreators as userActions } from "../redux/modules/user";

import { actionCreators as todoActions } from "../redux/modules/result";

import moment from "moment";
import MConditionChart from "../mobile/MConditionChart";
import "../components/Font.css";

const MAnalysis = () => {
  const dispatch = useDispatch();
  const resulttime = useSelector((state) => state.result.result_sleeptime);
  const tags = useSelector((state) => state.result.tags);
  const MixedData = useSelector((state) => state.result);
  const table = useSelector((state) => state.result.table);
  const username = useSelector((state) => state.user.user);

  const [currentClick, setCurrentClick] = React.useState(null);
  const [prevClick, setPrevClick] = React.useState(null);

  const [Click, setClick] = React.useState("Condition");

  const GetClick = (e) => {
    setClick(e.target.id);
    setCurrentClick(e.target.id);
  };

  useEffect(async () => {
    const _today = moment().format("YYYY-MM-DD");
    dispatch(todoActions.getTimeAX());
    dispatch(todoActions.getTags(_today));
    dispatch(todoActions.getTableAX(_today));
    dispatch(todoActions.getCompareDataSV(_today));
  }, []);

  useEffect(
    (e) => {
      if (currentClick !== null) {
        let current = document.getElementById(currentClick);
        current.style.backgroundColor = "rgba(74, 85, 102, 1)";
        current.style.color = "white";
      }
      if (prevClick !== null) {
        let prev = document.getElementById(prevClick);
        prev.style.backgroundColor = "lightgray";
        prev.style.color = "black";
      }
      setPrevClick(currentClick);
    },
    [currentClick]
  );

  return (
    <React.Fragment>
      <Background>
        <Container>
          <ChartContainer1>
            {Click === "Condition" && (
              <>
                <MConditionChart />
              </>
            )}
            {Click === "weekTag" && (
              <>
                <WeekBarChart tags={tags} />
              </>
            )}
            {Click === "monthTag" && (
              <>
                <MonthBarChart tags={tags} />
              </>
            )}
            {Click === "weekSleep" && (
              <>
                <MWeekMixedChart data={MixedData} />
              </>
            )}
            {Click === "table" && (
              <>
                <MTable table={table} />
              </>
            )}
          </ChartContainer1>
          <BtnContainer>
            <ChartBtn className="TimeText" id="Condition" onClick={GetClick}>
              연간 컨디션
            </ChartBtn>
            <div style={{ width: "2rem" }}></div>
            <ChartBtn className="TimeText" id="weekTag" onClick={GetClick}>
              주간 태그 현황
            </ChartBtn>
            <div style={{ width: "2rem" }}></div>
            <ChartBtn className="TimeText" id="monthTag" onClick={GetClick}>
              월간 태그 현황
            </ChartBtn>
            <div style={{ width: "2rem" }}></div>
            <ChartBtn className="TimeText" id="weekSleep" onClick={GetClick}>
              주간 수면 시간
            </ChartBtn>
            <div style={{ width: "2rem" }}></div>
            <ChartBtn className="TimeText" id="table" onClick={GetClick}>
              요약
            </ChartBtn>
          </BtnContainer>
          <ResultContainer2>
            <InfoContainer>
              {resulttime.hour == undefined ? (
                <Text className="TimeText">
                  데이터가 부족하여 현재 측정 불가합니다
                </Text>
              ) : (
                <>
                  <Text className="TimeText">
                    {username}님의&nbsp; 적정수면시간은&nbsp;
                  </Text>
                  <Text className="TimeText">
                    <span>
                      {resulttime.hour}
                      시간 &nbsp;{resulttime.minute}분
                    </span>
                    &nbsp; 입니다.
                  </Text>
                </>
              )}
            </InfoContainer>
          </ResultContainer2>
        </Container>
      </Background>
    </React.Fragment>
  );
};

const FadeIn = keyframes`
from {
  opacity:0
}
to {
  opacity: 1;
}
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  justify-content: center;
  text-align: center;
  align-items: center;

  /* background-color: green; */
  flex-direction: column;
`;

//전체 프레임을 위해서 100vh > 87vh로 수정했습니다
const Container = styled.div`
  width: 80%;
  height: 90%;
  border: none;
  justify-content: flex-start;
  animation: ${FadeIn} 2s;
  display: flex;
  flex-direction: column;
`;

const BtnContainer = styled.div`
  word-break: keep-all;
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;

  justify-content: center;
  align-items: center;

  box-sizing: border-box;
`;

const ChartBtn = styled.div`
  display: flex;
  width: 24%;
  margin: 0px;
  height: 3rem;
  color: black;
  align-items: center;
  background-color: lightgray;
  justify-content: center;
  text-align: center;
  border-radius: 7px;
  font-size: 0.7rem;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 2px 1px;
  @media (max-width: 375px) {
    font-size: 0.5rem;
  }
  @media (max-width: 320px) {
    font-size: 0.4rem;
  }

  @media (max-width: 280px) {
    font-size: 0.3rem;
    width: 8rem;
  }
`;

const ChartContainer1 = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  margin-top: 15%;
  justify-content: center;
  align-content: center;

  @media (max-width: 320px) {
    height: 40%;
  }
`;

const ResultContainer2 = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  justify-content: center;
  padding-top: 5%;
  margin-top: 20%;
`;

const Background = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 110vh;
  background-color: rgba(219, 219, 219, 1);
  z-index: 999;
  margin: 0px;
  box-sizing: border-box;
`;

const Text = styled.div`
  word-break: keep-all;
  width: 100%;
  height: 30px;
  margin-left: 20px;
  margin-top: 5px;
  font-weight: bold;
  font-size: 1rem;
  color: black;
  & > span {
    background-color: rgba(254, 233, 133, 1);
    padding: 6px;
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 10%) 0px 2px 2px 1px;
    cursor: pointer;
  }
  @media (max-width: 320px) {
    font-size: 0.9rem;
    & > span {
      padding: 5px;
    }
  }
`;

export default MAnalysis;
