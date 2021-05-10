import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import { actionCreators as todoActions } from "../redux/modules/result";
import moment from "moment";
import { CSSTransitionGroup } from 'react-transition-group'
 
const Analysis = () => {
  const dispatch = useDispatch();
  const resulttime = useSelector((state) => state.result.result_sleeptime);
  const tags =useSelector((state) => state.result.tags);
  const _today = moment();

  useEffect(() => {
    dispatch(todoActions.getTimeAX());
    dispatch(todoActions.getTags(_today.format("YYYY-MM-DD")));
  }, []);

 return (
    <React.Fragment>
    <CSSTransitionGroup
        transitionName="homeTransition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>
        <Background>
        <Container>
          <ResultContainer1>
          {/* <SleepTime>수면시간</SleepTime>
          <Condition>컨디션</Condition>
          <Graph>그래프</Graph> */}
          <BarChart tags={tags}/>
          {/* <LineChart/> */}
          </ResultContainer1>

          <ResultContainer2>
          {resulttime.hour==undefined ? <Text>충분한 데이터가 있지 않아 현재 측정 불가합니다</Text>
          :<Text>당신의 적정수면시간은 {resulttime.hour}시간 {resulttime.minute}분 입니다</Text>}
          </ResultContainer2>
          
        </Container>
        </Background>
   </CSSTransitionGroup>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: 90%;
  border: 1px solid blue;
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
 left:0;
 top:0;
 background-color:#121212;
`


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
