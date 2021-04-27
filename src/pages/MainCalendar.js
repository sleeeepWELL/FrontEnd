import React from "react";
import moment from "moment";
import Calendarjj from "../components/Calendarjj";
import KyuCalendar from "../pages/KyuCalendar";
import Popup from "../components/Popup";
import ToDo from "../elements/ToDo";

import { Button } from "../elements/Styles";

import { useSelector, useDispatch } from "react-redux";

const _todo_list = {
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

const MainCalendar = (props) => {
  // is_open 사용해서 팝업을 보였다가 안보이게 해줄거예요 :)
  const [is_open, setIsOpen] = React.useState(false);
  // 이 값에 선택한 일정 정보를 넣어줄거예요.
  // 없을 때는 null로!
  // 앗, 여기서 잠깐! 팝업을 닫을 때 이 값을 어떻게 해줘야할까요?
  // -> 그렇습니다 :) null로 다시 바꿔줘야죠!
  const [selected_todo, setSeletedTodo] = React.useState(null);

  //   완료된 일정만 보기 토글이에요!
  //   이 값은 캘린더에도 전달해줄거예요.
  //   그럼 캘린더가 이 값을 보고 완료된 일정만 보여주자! 앗 아니야, 전체를 보여주자! 결정할 수 있겠죠? :)
  const [show_completed, setShowCompleted] = React.useState(false);

  return (
    <React.Fragment>
      <Calendarjj
      // <KyuCalendar
        show_completed={show_completed}
        _showPopup={setIsOpen}
        _setSeletedTodo={setSeletedTodo}
      />
      {is_open && (
        <Popup
          type="todo_detail"
          selected_todo={selected_todo}
          _showPopup={setIsOpen}
        />
      )}
      <Button
        float
        right="20px"
        bottom="20px"
        onClick={() => {
          // 버튼을 눌렀을 때 페이지 이동이 잘되나 한 번 봅시다!
          props.history.push("/calendarwrite");
        }}
      >
        추가하기
      </Button>
      {/* <Button
        float
        right="20px"
        bottom="60px"
        onClick={() => {
          //   !를 변수 앞에 붙여주면 무슨 뜻일까요? :) 찾아보기!
          setShowCompleted(!show_completed);
        }}
      >
        {show_completed ? "전체 일정 보기" : "완료된 일정만 보기"}
      </Button> */}
    </React.Fragment>
  );
};

export default MainCalendar;
