import React from "react";
import { Grid, Button, Text } from "../elements/Styles";
import ToDo from "../elements/ToDo";
import moment from "moment";

// 임포트 해오기!
import { useSelector, useDispatch } from "react-redux";
import { changeToday } from "../redux/modules/todo";
import styled from "styled-components";
/**
 * 달력 만들기 순서
 *  - 이번달이 몇 주가 필요한 지 "주"수 구하기
 *  - 주수만큼 map 돌리기
 *  - map 돌리면서 안에 날짜 넣어주기!
 *  - +) 일정도 같이 넣어주면 good!
 */
const Calendar = (props) => {
  const dispatch = useDispatch();

  const { _changeMonth, show_completed, _showPopup, _setSeletedTodo } = props;

  const today = useSelector((state) => state.todo.today);
  const todo_list = useSelector((state) => state.todo.todo_list);

  // console.log(todo_list);

  // 이번달의 시작 주, 끝 주를 구합니다.
  const start_week = moment(today).startOf("month").week();
  const end_week = moment(today).endOf("month").week();

  // 달력에 넣을 주수 배열 길이를 구합니다. (*주의* +1 해야함(7~11주는 총 몇 주인지 생각해보세요! :)!))
  // 마지막 주가 다음 해 1주일 수 있어요. (시작 주보다 끝 주가 숫자가 작을 수 있다!)
  const week_num =
    (start_week > end_week ? 53 - start_week : end_week - start_week) + 1;

  // 주수 길이의 배열을 만들고, [14, 15, 16, 17, 18]
  const _week_arr = Array.from({ length: week_num }, (v, i) => start_week + i);

  // 주마다 7개씩 날짜를 넣어주면 끝!
  const week_arr = _week_arr.map((week_index) => {
    return (
      <Container key={`${moment(today).format("MM")}_week_${week_index}`}>
        {/*한 주는 7일이니, 주에 7개씩 날짜 칸을 넣어줍니다. */}
        {Array.from({ length: 7 }, (v, i) => i).map((day_index) => {
          let _day = today
            .clone()
            .startOf("year")
            .week(week_index)
            .startOf("week")
            .add(day_index, "day");

          // console.log(day_index); // 0-6

          const is_today =
            moment().format("YYYY-MM-DD") === _day.format("YYYY-MM-DD");

          // todo_list(Main.js에서 props로 건네줬어요!)에 해당 일자 일정이 들어가 있나 보고, 추가해줍시다.
          const list_index = Object.keys(todo_list).indexOf(
            _day.format("YYYY-MM-DD")
          );

          // 주석풀고 데이터 확인해보기! :)!
          //   console.log(list_index);
          //   console.log(todo_list[_day.format("YYYY-MM-DD")]);
          // todo_list에 해당 일 일정이 있으면 일정을 list에 넣어주자! (없으면 null이나 빈배열로! 일단 빈배열로 해봅시다! :))
          const _list =
            list_index !== -1 ? todo_list[_day.format("YYYY-MM-DD")] : [];

          const list = _list.map((_l, idx) => {
            // 데이터 확인하기!
            console.log(_l);
            // 일정을 뿌려줘요!
            return (
              <DailyGrid
                key={`${_l.datetime}_${_l.todo_id}`}
                onClick={() => {
                  console.log("here");
                  props._showPopup(true);
                  props._setSeletedTodo(_l);
                }}
              >
                <ToDo {..._l}></ToDo>
              </DailyGrid>
            );
          });
          return (
            // 달력 한 칸(일단위)
            <DayGrid
              key={`${moment(today).format(
                "MM"
              )}_week_${week_index}_day_${day_index}`}
              //   flex_direction="row"
              bg={is_today ? "#ffcece" : "#ffffff"}
            >
              {_day.format("MM") === moment(today).format("MM") && (
                // 날짜 표시해주는 구간
                <Text type="label">{_day.format("DD")}</Text>
              )}
              {
                // 일정도 보여줍시다! :) null이 아닐때만 보여줘요!
                _list && list
              }
            </DayGrid>
          );
        })}
      </Container>
    );
  });

  // 요일이 나올 배열도 만들어주기!
  const nomal_week = ["월", "화", "수", "목", "금"];

  return (
    <Grid flex_direction="column" width="80vw" height="80vh" margin="auto">
      <Grid justify_contents="space-between">
        <Button
          onClick={() => {
            // 기준일을 한달 전으로 돌려요!
            dispatch(changeToday(moment(today).clone().subtract(1, "month")));
          }}
        >
          ◀
        </Button>
        <Text type="title">
          {moment(today).format("YYYY")}년 {moment(today).format("MM")}월
        </Text>
        <Button
          onClick={() => {
            // 기준일을 한달 후로 돌려요!
            dispatch(changeToday(moment(today).clone().add(1, "month")));
          }}
        >
          ▶
        </Button>
      </Grid>
      <WeekGrid>
        <WEEK>
          <Text bold type="sun">
            일
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
            토
          </Text>
        </WEEK>
      </WeekGrid>
      {week_arr}
    </Grid>
  );
};

const DailyGrid = styled.div`
  flex-direction: row;
  height: auto;
  margin: 1px 0px;
  flex-wrap: nowrap;
`;

const WEEK = styled.div`
  margin: 4px 2px;
  width: 100%;
  flex-direction: column;
  background-color: #ffffff;
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
  height: auto;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 3px solid #746d6d;
  /* margin-bottom: 10px; */
  padding-bottom: 5px;
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
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
`;

const Container = styled.div`
  box-sizing: border-box;
  margin: 0px auto;
  flex-direction: row;
  /* border: 1px solid gray;
  border-top: none; */
  display: flex;
  width: 100%;
  min-width: 50px;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
`;

// 기본적으로 꼭 필요한 props를 미리 정해줍시다!
Calendar.defaultProps = {
  _showPopup: () => {},
  _setSeletedTodo: () => {},
};

export default Calendar;
