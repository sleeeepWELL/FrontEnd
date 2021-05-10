import React, { useEffect } from "react";
import { Grid, Button, Text } from "../elements/Styles";
import ToDo from "../elements/ToDo";
import moment from "moment";
import { setCookie, deleteCookie, getCookie } from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import styled from "styled-components";


const Calendar = (props) => {
  const dispatch = useDispatch();
  const today = useSelector((state) => state.todo.today);
  const todo_list = useSelector((state) => state.todo.todo_list);

  React.useEffect(() => {
    dispatch(todoActions.getAllPostAX());
  }, []);

  const start_week = moment(today).startOf("month").week();
  const end_week = moment(today).endOf("month").week();
  const week_num =
    (start_week > end_week ? 53 - start_week : end_week - start_week) + 1;
  const _week_arr = Array.from({ length: week_num }, (v, i) => start_week + i);

  const week_arr = _week_arr.map((week_index) => {
    return (
      <Container key={`${moment(today).format("MM")}_week_${week_index}`}>
        {Array.from({ length: 7 }, (v, i) => i).map((day_index) => {
          let _day = today
            .clone()
            .startOf("year")
            .week(week_index)
            .startOf("week")
            .add(day_index, "day");

          const is_today =
            moment().format("YYYY-MM-DD") === _day.format("YYYY-MM-DD");

          const _list = todo_list.filter((item, idx) => {
            if (item.selectedAt == _day.format("YYYY-MM-DD"))
              return item.selectedAt;
          });

          const list = _list.map((_l, idx) => {
            // 일정을 뿌려줘요!
            return (
              <DailyGrid key={`${_l.selectedAt}_${_l.id}`}>
                {/* 한 칸에 들어갈 것들 */}
                {_l.selectedAt.split("-")[1] === moment(today).format("MM") ? (
                  <ToDo {..._l}></ToDo>
                ) : (
                  ""
                )}
              </DailyGrid>
            );
          });

          if (_day.format("MM") !== today.format("MM")) {
            return (
              <DayGrid
                key={`${moment(today).format(
                  "MM"
                )}_week_${week_index}_day_${day_index}`}
                bg={
                  is_today && moment(today).format("MM") === _day.format("MM")
                    ? "grey"
                    : "#121212"
                }
              >
                {_day.format("MM") === moment(today).format("MM") ? (
                  <DayText font_c={is_today ? "white" : "black"}>
                    {_day.format("DD")}
                  </DayText>
                ) : (
                  <DayText font_c={is_today ? "white" : "black"}></DayText>
                )}

                {_list && list}
              </DayGrid>
            );
          } else {
            return (
              <DayGrid
                key={`${moment(today).format(
                  "MM"
                )}_week_${week_index}_day_${day_index}`}
                bg={
                  is_today && moment(today).format("MM") === _day.format("MM")
                    ? "gray"
                    : "#121212"
                }
                onClick={() => {
                  props._showModify(false);
                  dispatch(todoActions.getOnePostAX(_day.format("YYYY-MM-DD")));
                }}
              >
                {_day.format("MM") === moment(today).format("MM") ? (
                  <DayText font_c={is_today ? "black" : "white"}>
                    {_day.format("DD")}
                  </DayText>
                ) : (
                  <DayText font_c={is_today ? "white" : "black"}></DayText>
                )}
                {_list && list}
              </DayGrid>
            );
          }
        })}
      </Container>
    );
  });

  // 요일이 나올 배열도 만들어주기!
  const nomal_week = ["MON", "TUE", "WED", "THU", "FRI"];

  return (
    <Grid flex_direction="column" width="100%" height="85vh" margin="auto">
      <Grid
        height="10%"
        justify_contents="space-between"
        margin="5px 0px 5px 0px"
      >
        <MoveMButton
          onClick={() => {
            dispatch(
              todoActions.changeToday(
                moment(today).clone().subtract(1, "month")
              )
            );
          }}
        >
          {" "}
          <MText>◀</MText>
          <MText>
            {parseInt(moment(today).format("M")) - 1 === 0
              ? 12
              : parseInt(moment(today).format("M")) - 1}
            월
          </MText>
        </MoveMButton>

        <Text type="title">
          {moment(today).format("YYYY")}년 {moment(today).format("MM")}월
        </Text>
        <MoveMButton
          onClick={() => {
            // 기준일을 한달 후로 돌려요!
            dispatch(
              todoActions.changeToday(moment(today).clone().add(1, "month"))
            );
          }}
        >
          <MText>
            {" "}
            {parseInt(moment(today).format("M")) + 1 === 13
              ? 1
              : parseInt(moment(today).format("M")) + 1}
            월
          </MText>
          <MText>▶</MText>
        </MoveMButton>
      </Grid>
      <WeekGrid>
        <WEEK>
          <Text bold type="sun">
            SUN
          </Text>
        </WEEK>
        {nomal_week.map((_d, idx) => {
          return (
            <WEEK key={idx}>
              <Text bold type="week">
                {_d}
              </Text>
            </WEEK>
          );
        })}
        <WEEK>
          <Text bold type="sat">
            SAT
          </Text>
        </WEEK>
      </WeekGrid>
      {week_arr}
    </Grid>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  margin: 2px auto;
  flex-direction: row;
  display: flex;
  width: 100%;
  min-width: 50px;
  height: 100%;
  align-items: center;
  padding: 2px;
  background-color: black;
  border-radius: 5px;
`;

const DailyGrid = styled.div`
  flex-direction: row;
  height: 100%;
  margin: 1px 0px;
  flex-wrap: nowrap;
`;

const WEEK = styled.div`
  margin: 4px 2px;
  width: 100%;
  flex-direction: column;
  background-color: black;
  height: auto;
  box-sizing: border-box;
  display: flex;
  min-width: 50px;
  align-items: center;
  justify-content: flex-start;
`;

const WeekGrid = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 50px;
  height: 4%;
  font-size: 2px;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 3px solid #746d6d;
  background-color: black;
  border-radius: 5px;
  margin-top: 9px;
`;

const DayGrid = styled.div`
  box-sizing: border-box;
  flex-direction: column;
  margin: 0px 2px;
  display: flex;
  width: 100%;
  min-width: 50px;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px #fafad2 solid;
  border-radius: 3px;

  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
`;

const DayText = styled.div`
  font-size: 9px;
  margin: 3px 0px 0px 3px;
  color: ${(props) => props.font_c};
  font-weight: bold;
`;

const MoveMButton = styled.button`
  padding: 7px 10px;
  display: flex;
  flex-direction: row;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #121212;
  color: white;
`;

const MText = styled.div`
  font-weight: bold;
  margin: 0px 3px 0px 3px;
  font-size: 12px;
`;

export default Calendar;
