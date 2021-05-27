import React, { useEffect } from "react";
import ToDo from "../elements/ToDo";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import styled, { keyframes } from "styled-components";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import "./Font.css";

const Calendar = (props) => {
  const dispatch = useDispatch();
  const today = useSelector((state) => state.todo.today);
  const todo_list = useSelector((state) => state.todo.todo_list);

  useEffect(() => {
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
            if (item.selectedAt === _day.format("YYYY-MM-DD"))
              return item.selectedAt;
          });

          const list = _list.map((_l, idx) => {
       
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
              ></DayGrid>
            );
          } else {
            return (
              <DayGrid
                key={`${moment(today).format(
                  "MM"
                )}_week_${week_index}_day_${day_index}`}
                // bg={"#FFFFFF"}
                bg={
                  today.format("YYYY-MM-DD") === _day.format("YYYY-MM-DD")
                    ? "#4a5566"
                    : "#FFFFFF"
                }
                onClick={() => {
                  props._showModify(false);
                  dispatch(todoActions.changeToday(_day.format("YYYY-MM-DD")));
                  dispatch(todoActions.getOnePostAX(_day.format("YYYY-MM-DD")));
                }}
              >
                <DayText
                  className="Helvetica"
                  bg={is_today ? "black" : null}
                  font_c={
                    today.format("YYYY-MM-DD") === _day.format("YYYY-MM-DD") ||
                    is_today
                      ? "white"
                      : "black"
                  }
                  br={is_today ? "10px" : "null"}
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
            dispatch(
              todoActions.getOnePostAX(
                moment(today).clone().subtract(1, "month").format("YYYY-MM-DD")
              )
            );
          }}
        >
          <MMText>
            <ChevronLeftIcon />
          </MMText>
          <MText1 className="Helvetica">
            {move_month - 1 === 0
              ? parseInt(moment(today).format("YYYY")) - 1 + "." + 12
              : moment(today).format("YYYY") +
                "." +
                (move_month <= 10 ? "0" + (move_month - 1) : move_month - 1)}
          </MText1>
        </MoveLButton>

        <TitleText className="Helvetica">
          {moment(today).format("YYYY")}. {moment(today).format("MM")}
        </TitleText>

        <MoveRButton
          onClick={() => {
            dispatch(
              todoActions.changeToday(moment(today).clone().add(1, "month"))
            );
            dispatch(
              todoActions.getOnePostAX(
                moment(today).clone().add(1, "month").format("YYYY-MM-DD")
              )
            );
          }}
        >
          <MMText>
            <ChevronRightIcon />
          </MMText>
          <MText2 className="Helvetica">
            {move_month + 1 === 13
              ? parseInt(moment(today).format("YYYY")) + 1 + "." + "01"
              : moment(today).format("YYYY") +
                "." +
                (move_month < 9 ? "0" + (move_month + 1) : move_month + 1)}
          </MText2>
        </MoveRButton>
      </TopContainer>

      <Container>
        <WeekGrid>
          <WEEK className="Helvetica" style={{ color: "#C7A2A2" }}>
            Sun
          </WEEK>
          {nomal_week.map((_d, idx) => {
            return (
              <WEEK className="Helvetica" key={idx} style={{ color: "white" }}>
                {_d}
              </WEEK>
            );
          })}
          <WEEK className="Helvetica" style={{ color: "#B8C5E9" }}>
            Sat
          </WEEK>
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

//TopContainer 내부
const TitleText = styled.div`
  display: flex;
  margin-top: 0.5%;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
  color: #495465;
  width: 30vw;
  text-shadow: rgb(10 50 10 / 40%) 1px 1px 1px;
`;

const MText1 = styled.div`
  font-weight: bold;
  color: #121212;
  border-bottom: 2px solid #121212;
  opacity: 60%;
  margin-left: 5%;
  text-shadow: rgb(10 50 10 / 40%) 0.5px 0.5px 0.5px;
`;
const MText2 = styled.div`
  font-weight: bold;

  color: #121212;
  border-bottom: 2px solid #121212;
  opacity: 60%;
  margin-right: 5%;
  text-shadow: rgb(10 50 10 / 40%) 0.5px 0.5px 0.5px;
`;

const MoveLButton = styled.button`
  width: 15%;
  font-size: 1.2vw;
  background-color: #f3f3f3;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const MoveRButton = styled.button`
  width: 15%;
  font-size: 1.2vw;
  background-color: #f3f3f3;
  display: flex;
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
  color: #000000;
  opacity: 60%;
  margin-bottom: 0.3vw;
  text-shadow: rgb(10 50 10 / 40%) 0.5px 0.5px 0.5px;
`;
//

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

//Container 내부
const WEEK = styled.div`
  background-color: #4a5566;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding-top: 1%;
  font-size: 2vh;
  font-weight: bold;
`;

//캘린더 내부의 선을 최대한 얇게하려고 있는 Con
const CalendarContainer = styled.div`
  box-sizing: border-box;
  flex-direction: row;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  border-right: 1px solid #aaaaaa;
`;
//요일묶음 Grid
const WeekGrid = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 50px;
  height: 4vh;
`;

const sizeUp = keyframes`
  0% {
  margin: 0%;
  
  }
  50% {
    margin: 0.5%;
    // width: 102%;
    // height: 13vh;
  }
  100% {
    margin: 0%;
  }
 `;

//날짜 묶음 Grid
const DayGrid = styled.div`
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  width: 100%;
  height: 12.5vh;
  border-left: 0.1px #aaaaaa solid;
  border-bottom: 0.1px #aaaaaa solid;
  align-items: flex-end;
  :hover {
    box-shadow: rgb(82 82 82/ 60%) 2px 5px 12px 2px;
    transition: box-shadow 0.2s ease-in 0s;
    // animation: ${sizeUp} 2s ;
  }

  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
`;

//날짜 텍스트
const DayText = styled.div`
  display: flex;
  color: ${(props) => props.font_c};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.br};
  width: 13%;
  font-size: 0.8vw;
  margin-right: 1px;
  margin-top: 1px;
  font-weight: 550;
  opacity: 85%;
`;

//Todo들어가는 부분
const DailyGrid = styled.div`
  flex-direction: row;
  height: 100%;
  margin: 1px 0px;
  flex-wrap: nowrap;
  width: 100%;
`;

export default Calendar;
