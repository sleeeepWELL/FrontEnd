import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";

const JieunCalendar = () => {
  const [getMoment, setMoment] = useState(moment());

  const today = getMoment;
  const firstWeek = today.clone().startOf("month").week();
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  const calendarArr = () => {
    let result = [];
    let week = firstWeek;
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <CalendarInnerBox key={week}>
          {/* {7일을 기준으로 반복문 출력} */}
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let days = today
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day");

              //오늘 빨간색 표시
              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                return (
                  <Daily
                    key={index}
                    style={{ backgroundColor: "pink" }}
                    date={days.format("YYYY/MM/DD")}
                    // day={days.format("D")}
                  >
                    <span>{days.format("D")}</span>
                  </Daily>
                );
                //이번 달의 날짜가 아닌 경우들
              } else if (days.format("MM") !== today.format("MM")) {
                return <Daily key={index}></Daily>;
              } else {
                return (
                  <Daily
                    key={index}
                    date={days.format("YYYY/MM/DD")}
                    // day={days.format("D")}
                  >
                    <span>{days.format("D")}</span>
                  </Daily>
                );
              }
            })}
        </CalendarInnerBox>
      );
    }
    return result;
  };

  return (
    <div className="App">
      <div className="control">
        <button
          onClick={() => {
            setMoment(getMoment.clone().subtract(1, "month"));
          }}
        >
          이전달
        </button>
        <span>{today.format("YYYY 년 MM 월")}</span>
        <button
          onClick={() => {
            setMoment(getMoment.clone().add(1, "month"));
          }}
        >
          다음달
        </button>
      </div>

      <WeekBox>
        <Week>일</Week>
        <Week>월</Week>
        <Week>화</Week>
        <Week>수</Week>
        <Week>목</Week>
        <Week>금</Week>
        <Week>토</Week>
      </WeekBox>
      {calendarArr()}
    </div>
  );
};

const CalendarInnerBox = styled.div`
  display: flex;
  min-width: 800px;

  /* @media all and (max-width: 767px) {
    min-width: 70px;
  } */
`;

const Daily = styled.div`
  width: 100%;
  height: 100%;

  min-width: 80px;

  min-height: 90px;
  /* @media all and (max-width: 767px) {
    min-width: 10px;
    min-height: 25px;
  } */
`;

const WeekBox = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
`;

const Week = styled.div`
  font-size: 12px;
  font-weight: 600;
  width: 100%;
  min-width: 40px;
  height: 40px;
  /* @media all and (max-width: 767px) {
    min-width: 10px;
    font-size: 10px;
  } */
`;

export default JieunCalendar;
