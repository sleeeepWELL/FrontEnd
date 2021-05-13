import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import WeekBarChart from "../components/WeekBarChart";
import MonthBarChart from "../components/MonthBarChart";
import WeekMixedChart from "../components/WeekMixedChart";
import Table from "../components/Table";

import { actionCreators as todoActions } from "../redux/modules/result";

import moment from "moment";
import ConditionChart from "../components/ConditionChart";

const Analysis = () => {
  const dispatch = useDispatch();
  const resulttime = useSelector((state) => state.result.result_sleeptime);
  const tags = useSelector((state) => state.result.tags);
  const MixedData = useSelector((state) => state.result);
  const table = useSelector((state) => state.result.table);
  const username = useSelector((state) => state.user.user);

  const [Click, setClick] = React.useState("Condition");

  const GetClick = (e) => {
    setClick(e.target.id);
    console.log(e.target.id);
  };

  useEffect(async () => {
    const _today = moment().format("YYYY-MM-DD");
    dispatch(todoActions.getTimeAX());
    dispatch(todoActions.getTags(_today));
    dispatch(todoActions.getTableAX(_today));
    dispatch(todoActions.getCompareDataSV(_today));
  }, []);

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
            <ChartBtn id="Condition" onClick={GetClick}>
              연간컨디션
            </ChartBtn>
            <div style={{ width: "2rem" }}></div>
            <ChartBtn id="weekTag" onClick={GetClick}>
              주간태그현황
            </ChartBtn>
            <div style={{ width: "2rem" }}></div>
            <ChartBtn id="monthTag" onClick={GetClick}>
              월간태그현황
            </ChartBtn>
            <div style={{ width: "2rem" }}></div>
            <ChartBtn id="weekSleep" onClick={GetClick}>
              주간수면시간
            </ChartBtn>
            <div style={{ width: "2rem" }}></div>
            <ChartBtn id="table" onClick={GetClick}>
              요약
            </ChartBtn>
          </BtnContainer>
          <ResultContainer2>
            <InfoContainer>
              {resulttime.hour == undefined ? (
                <Text>데이터가 부족하여 현재 측정 불가합니다</Text>
              ) : (
                <Text>
                  {username}님의 적정수면시간은 {resulttime.hour}시간{" "}
                  {resulttime.minute}분 입니다
                </Text>
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
  width: 50%;
  height: 100%;
  justify-content: center;
  padding-top: 2rem;
`;

//전체 프레임을 위해서 100vh > 87vh로 수정했습니다
const Container = styled.div`
  width: 100%;
  height: 87vh;
  border: none;
  justify-content: center;
  animation: ${FadeIn} 2s;
  display: flex;
  flex-direction: column;
  
`;

const BtnContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartBtn = styled.div`
  display: flex;
  width: 6rem;
  height: 2.5rem;
  align-items: center;
  background-color: lightgray;
  justify-content: center;
  border-radius: 7px;
  font-size: 12px;
  cursor: pointer;
  :hover {
    background-color: gray;
    color: white;
  }
`;

const ChartContainer1 = styled.div`
  display: flex;
  width: 100%;
  height: 55%;
  justify-content: center;
  align-content: center;
`;

const ResultContainer2 = styled.div`
  display: flex;
  width: 100%;
  height: 35%;
  justify-content: center;
`;

//여기도 height 수정했습니다(배경이 짧지않게)
const Background = styled.div`
  width: 100%;
  height: 92.9vh;
  background-color: rgba(242, 242, 242, 1);
  z-index: 999;
`;

const Text = styled.div`
  width: 350px;
  height: 50px;
  margin-left: 20px;
  font-weight: bold;
  color: black;
`;

export default Analysis;
