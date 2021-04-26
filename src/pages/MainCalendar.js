import React from "react";
import moment from "moment";
import Calendar from "../components/Calendar";
// import Popup from "./Popup";

const MainCalendar = (props) => {
  const [today, setToday] = React.useState(moment());
  const todo_list = {
    "2021-04-01": [
      {
        todo_id: 11,
        datetime: "2021-04-01 10:10:00",
        contents: "산책가기1",
        completed: false,
      },
      {
        todo_id: 155555,
        datetime: "2021-04-01 10:15:00",
        contents: "산책가기2",
        completed: false,
      },
    ],
    "2021-04-21": [
      {
        todo_id: 8,
        datetime: "2021-04-21 10:00:00",
        contents: "산책가기3",
        completed: false,
      },
      {
        todo_id: 4,
        datetime: "2021-04-21 10:10:00",
        contents: "산책가기4",
        completed: false,
      },
    ],
  };
  return (
    <React.Fragment>
      <Calendar todo_list={todo_list} today={today} _changeMonth={setToday} />
    </React.Fragment>
  );
};

export default MainCalendar;
