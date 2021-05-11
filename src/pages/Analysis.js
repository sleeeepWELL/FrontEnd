import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import WeekBarChart from "../components/WeekBarChart";
import MonthBarChart from "../components/MonthBarChart";
import WeekMixedChart from "../components/WeekMixedChart";
import LineChart from "../components/LineChart";
import Table from "../components/Table";
import { actionCreators as todoActions } from "../redux/modules/result";
import moment from "moment";

const Analysis = () => {
  const dispatch = useDispatch();
  const resulttime = useSelector((state) => state.result.result_sleeptime);
  const tags = useSelector((state) => state.result.tags);
  const table = useSelector((state) => state.result.table);
  const _today = moment();

  useEffect(() => {

    dispatch(todoActions.getTimeAX());
    dispatch(todoActions.getTags(_today.format("YYYY-MM-DD")));
    dispatch(todoActions.getTableAX(_today.format("YYYY-MM-DD")));
    
  }, []);

  return (
    <>
      <Background>
        <Container>
          <ResultContainer1>
            {/* <WeekBarChart tags={tags} /> */}
            <MonthBarChart tags={tags} />
            <LineChart />
          {/* <SleepTime>수면시간</SleepTime>
          <Condition>컨디션</Condition>
          <Graph>그래프</Graph> */}
          <BarChart tags={tags}/>
          {/* <LineChart/> */}
         
          </ResultContainer1>
          <ResultContainer1>
          <Table table={table}/>
         
          </ResultContainer1>
         
        

          <ResultContainer2>
            {resulttime.hour == undefined ? (
              <Text>데이터가 부족하여 현재 측정 불가합니다</Text>
            ) : (
              <Text>
                당신의 적정수면시간은 {resulttime.hour}시간 {resulttime.minute}
                분 입니다
              </Text>
            )}
          </ResultContainer2>
        </Container>
      </Background>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  justify-content: center;
`;

const ResultContainer1 = styled.div`
  width: 100%;
  height: 40%;
  justify-content: center;
  margin-bottom: 150px;
`;

const ResultContainer2 = styled.div`
  width: 100%;
  height: 50%;
  justify-content: center;
  margin: 10px 0px 0px 40px;
`;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: gray;
  z-index: -1;
`;

const Text = styled.div`
  width: 350px;
  height: 50px;
  margin-left: 20px;
  font-weight: bold;
  color: white;
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
