import React, { useEffect } from "react";
import { Grid, Button, Text } from "../elements/Styles";
import ToDo from "../elements/ToDo";
import moment from "moment";
import { setCookie, deleteCookie, getCookie } from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import styled, { keyframes } from "styled-components";

import "../components/Font.css";

// import HattonLight from "../fonts/Hatton-Light.ttf";

const MCalendar = (props) => {
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
      <CalendarContainer
        key={`${moment(today).format("MM")}_week_${week_index}`}
      >
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
               
              ></DayGrid>
            );
          } else {
            return (
              <DayGrid
                key={`${moment(today).format(
                  "MM"
                )}_week_${week_index}_day_${day_index}`}
                bg={"#FFFFFF"}
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
                  bg={is_today ? "black" : null}
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
      </CalendarContainer>
    );
  });

  // 요일이 나올 배열도 만들어주기!
  const nomal_week = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const move_month = parseInt(moment(today).format("M"));
  return (
    <AllContainer>
      <TopContainer>
        <MoveLButton
          onClick={() => {
            dispatch(
              todoActions.changeToday(
                moment(today).clone().subtract(1, "month")
              )
            );
          }}
        >
          <MMText>◀</MMText>
          <div className="MText1">
            {move_month - 1 === 0
              ? parseInt(moment(today).format("YYYY")) - 1 + "." + 12
              : moment(today).format("YYYY") +
                "." +
                (move_month <= 10 ? "0" + (move_month - 1) : move_month - 1)}
          </div>
        </MoveLButton>

        <div className="TitleText">
          {moment(today).format("YYYY")}. {moment(today).format("MM")}
        </div>

        <MoveRButton
          onClick={() => {
            dispatch(
              todoActions.changeToday(moment(today).clone().add(1, "month"))
            );
          }}
        >
          <MMText>▶</MMText>
          <div className="MText2">
            {move_month + 1 === 13
              ? parseInt(moment(today).format("YYYY")) + 1 + "." + "01"
              : moment(today).format("YYYY") +
                "." +
                (move_month < 9 ? "0" + (move_month + 1) : move_month + 1)}
          </div>
          
        </MoveRButton>
      </TopContainer>
      
      <Container>

      <WeekGrid>
        <div className="WEEK" style={{color:"#C7A2A2"}}>
            Sun
        </div>
        {nomal_week.map((_d, idx) =>{
          return (
            <div className="WEEK" key={idx} style={{color:"white"}}>
                {_d}    
            </div>);
        })}
        <div className="WEEK"  style={{color:"#B8C5E9"}}>
            Sat
        </div>
      </WeekGrid>

      {week_arr}

      </Container>
    </AllContainer>
  );
};

const AllContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 85%;
  min-width: 50px;
  margin: auto;
  align-items: center;
  justify-content: flex-start;
  
`;

const TopContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 102%;
  align-items: bottom;
  height: 10vh;
  justify-content: space-between;
  margin-top: 3%;
`;


const Container = styled.div`
  box-sizing: border-box;
  width: 100%;

 
`;

//선 얇게하려고 나눠둠
const CalendarContainer = styled.div`
  box-sizing: border-box;
  flex-direction: row;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  border-right: 1px solid #AAAAAA;
  
`;

//요일 Box
const WeekGrid = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 50px;
  height: 4vh;
`;

 
const DailyGrid = styled.div`
  flex-direction: row;
  height: 100%;
  margin: 1px 0px;
  flex-wrap: nowrap;
  // border: 1px solid black;
  width: 100%;
`;

//현재는 6월 기준
const DayGrid = styled.div`
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  width: 100%;
  height: 8vh;
  border-left: 0.1px #AAAAAA solid;
  border-bottom: 0.1px #AAAAAA solid;
  align-items: flex-end;
  :hover {
    box-shadow: rgb(82 82 82/ 60%)  0px 4px 10px 0px;
    transition: box-shadow 0.2s ease-in 0s;
  }

  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
`;


const DayText = styled.div`
 display:flex;
  color: ${(props) => props.font_c};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.br};
  
`;

const MoveLButton = styled.button`
 width: 15%;
 font-size: 1.2vw;
 background-color:#F3F3F3;
 border: none;
 display:flex;
 flex-direction: row;
 align-items: center;

 cursor: pointer;
`;

const MoveRButton = styled.button`
 width: 15%;
 font-size: 1.2vw;
 background-color:#F3F3F3;
 display:flex;
 border: none;
 flex-direction: row-reverse;
 align-items: center;
 text-align: right;
 
 cursor: pointer;
`;


const MMText = styled.div`
 display: flex;
 align-items: center;

  font-weight: bold;
  color: #000000 ;
  opacity: 60%;
  margin-bottom:  0.3vw;
  text-shadow: rgb(10 50 10 / 40%) 0.5px 0.5px 0.5px;
`;

export default MCalendar;
