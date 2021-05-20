import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import WeekBarChart from "../components/WeekBarChart";
import MonthBarChart from "../components/MonthBarChart";
import WeekMixedChart from "../components/WeekMixedChart";
import Table from "../components/Table";
import { actionCreators as userActions } from "../redux/modules/user";
import { debounce } from "lodash";

import { actionCreators as todoActions } from "../redux/modules/result";

import moment from "moment";
import ConditionChart from "../components/ConditionChart";
import "../components/Font.css";

import MAnalysis from "../mobile/MAnalysis";

const Analysis = () => {
  const dispatch = useDispatch();
  const resulttime = useSelector((state) => state.result.result_sleeptime);
  const tags = useSelector((state) => state.result.tags);
  const MixedData = useSelector((state) => state.result);
  const table = useSelector((state) => state.result.table);
  const username = useSelector((state) => state.user.user);

  const [currentClick, setCurrentClick] = React.useState(null);
  const [prevClick, setPrevClick] = React.useState(null);

  const [Click, setClick] = React.useState("Condition");

  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

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

  const handleResize = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 100);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  if (windowSize < 450) {
    return <MAnalysis />;
  } else {
    return (
      <React.Fragment>
        <Background>
          <Container>
            <ChartContainer1>
              {Click === "Condition" && (
                <>
                  <ConditionChart />
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
                  <WeekMixedChart data={MixedData} />
                </>
              )}
              {Click === "table" && (
                <>
                  <Table table={table} />
                </>
              )}
            </ChartContainer1>
            <BtnContainer>
              <ChartBtn className="TimeText" id="Condition" onClick={GetClick}>
                연간컨디션
              </ChartBtn>
              <div style={{ width: "2rem" }}></div>
              <ChartBtn className="TimeText" id="weekTag" onClick={GetClick}>
                주간태그현황
              </ChartBtn>
              <div style={{ width: "2rem" }}></div>
              <ChartBtn className="TimeText" id="monthTag" onClick={GetClick}>
                월간태그현황
              </ChartBtn>
              <div style={{ width: "2rem" }}></div>
              <ChartBtn className="TimeText" id="weekSleep" onClick={GetClick}>
                주간수면시간
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
                  <Text className="TimeText">
                    {username}님의&nbsp; 적정수면시간은&nbsp;{" "}
                    <span>
                      {resulttime.hour}
                      시간 &nbsp;{resulttime.minute}분
                    </span>
                    &nbsp; 입니다.
                  </Text>
                )}
              </InfoContainer>
            </ResultContainer2>
          </Container>
        </Background>
      </React.Fragment>
    );
  }
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
  justify-content: center;
  text-align: center;
  padding-top: 2rem;
`;

//전체 프레임을 위해서 100vh > 87vh로 수정했습니다
const Container = styled.div`
  margin-top: 5%;
  width: 70%;
  height: 100%;
  border: none;
  justify-content: flex-start;
  animation: ${FadeIn} 2s;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const BtnContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const ChartBtn = styled.div`
  word-break: break-all;
  text-align: center;
  display: flex;
  width: auto;
  height: 2.5rem;
  align-items: center;
  background-color: lightgray;
  justify-content: center;
  border-radius: 7px;
  font-size: 14px;
  cursor: pointer;
  padding: 0px 13px;
  color: black;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 2px 1px;
`;

const ChartContainer1 = styled.div`
  display: flex;
  width: 100%;
  height: 35%;
  justify-content: center;
  align-content: center;
  @media (max-width: 1024px) {
    height: 30%;
  }
`;

const ResultContainer2 = styled.div`
  display: flex;
  width: 100%;
  height: 35%;
  justify-content: center;
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
  height: 50px;
  margin-left: 20px;
  font-weight: bold;
  font-size: 20px;
  color: black;
  & > span {
    background-color: rgba(254, 233, 133, 1);
    padding: 7px;
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 10%) 0px 2px 2px 1px;
    cursor: pointer;
  }
`;

export default Analysis;
