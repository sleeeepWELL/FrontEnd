import React, { useEffect } from "react";
import { Grid, Button, Text } from "../elements/Styles";
import ToDo from "../elements/ToDo";
import moment from "moment";
import { setCookie, deleteCookie, getCookie } from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import styled, { keyframes } from "styled-components";

import "./Font.css";

// import HattonLight from "../fonts/Hatton-Light.ttf";

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

          //여기 코드 쓸모없는게 많음(다시 수정)
          if (_day.format("MM") !== today.format("MM")) {
            return (
              <DayGrid
                key={`${moment(today).format(
                  "MM"
                )}_week_${week_index}_day_${day_index}`}
                bg={"#FFFFFF"}
              ></DayGrid>
            );
          } else {
            return (
              <DayGrid
                key={`${moment(today).format(
                  "MM"
                )}_week_${week_index}_day_${day_index}`}
                // bg={
                //   is_today && moment(today).format("MM") === _day.format("MM")
                //     ? "gray"
                //     : "#FFFFFF"
                // }

                onClick={() => {
                  props._showModify(false);
                  dispatch(todoActions.getOnePostAX(_day.format("YYYY-MM-DD")));
                }}
              >
                <DayText
                  className="DayText"
                  bg={is_today ? "black" : "white"}
                  font_c={is_today ? "white" : "black"}
                  br={is_today ? "9px" : "null"}
                >
                  {_day.format("DD")}
                </DayText>

                {_list && list}
              </DayGrid>
            );
          }
        })}
      </Container>
    );
  });

  // 요일이 나올 배열도 만들어주기!
  const nomal_week = ["mon", "tue", "wed", "thu", "fri"];
  const move_month = parseInt(moment(today).format("M"));
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
          <MMText>◀</MMText>
          <div className="MText">
            {move_month - 1 === 0
              ? parseInt(moment(today).format("YYYY")) - 1 + "." + 12
              : moment(today).format("YYYY") +
                "." +
                (move_month <= 10 ? "0" + (move_month - 1) : move_month - 1)}
          </div>
        </MoveMButton>

        <div className="TitleText">
          {moment(today).format("YYYY")}. {moment(today).format("MM")}
        </div>

        <MoveMButton
          onClick={() => {
            // 기준일을 한달 후로 돌려요!
            dispatch(
              todoActions.changeToday(moment(today).clone().add(1, "month"))
            );
          }}
        >
          <div className="MText">
            {move_month + 1 === 13
              ? parseInt(moment(today).format("YYYY")) + 1 + "." + "01"
              : moment(today).format("YYYY") +
                "." +
                (move_month < 9 ? "0" + (move_month + 1) : move_month + 1)}
          </div>
          <MMText>▶</MMText>
        </MoveMButton>
      </Grid>
      <WeekGrid>
        <div className="WEEK">
          <Text bold type="sun">
            sun
          </Text>
        </div>
        {nomal_week.map((_d, idx) => {
          return (
            <div className="WEEK" key={idx}>
              <Text bold type="week">
                {_d}
              </Text>
            </div>
          );
        })}
        <div className="WEEK">
          <Text bold type="sat">
            sat
          </Text>
        </div>
      </WeekGrid>
      {week_arr}
    </Grid>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  // margin: 2px auto;
  flex-direction: row;
  display: flex;
  width: 95%;
  height: 70vh;
  align-items: center;
  // border: 1px solid black;
`;

const DailyGrid = styled.div`
  flex-direction: row;
  height: 100%;
  width: 100%;
  margin: 1px 0px;
  flex-wrap: nowrap;
  // border: 1px solid black;
`;

const WeekGrid = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 95%;
  min-width: 50px;
  height: 20%;
  align-items: center;
  justify-content: flex-start;
  // border-bottom: 3px solid #746d6d;
  background-color: #000000;
  // border-radius: 5px;
`;

//현재는 6월 기준
const DayGrid = styled.div`
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  width: 100%;

  height: 15.5vh;

  border: 1px #000000 solid;
  align-items: flex-end;
  :hover {
    box-shadow: rgb(10 50 10 / 100%) 0px 4px 10px 0px;
    transition: box-shadow 0.2s ease-in 0s;
  }

  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
`;

const DayText = styled.div`
  color: ${(props) => props.font_c};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.br};
  padding: 2px 4px 0px 4px;
  border-bottom: ${(props) => props.bb};
`;

const MoveMButton = styled.button`
  width: 15%;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const MText = styled.div`
  margin: 0px 3px 0px 3px;
  border-bottom: 2px solid black;
`;

const MMText = styled.div`
  font-weight: bold;
  margin: 0px 3px 0px 3px;
  font-size: 12px;
  color: #6c6969;
`;

export default Calendar;
