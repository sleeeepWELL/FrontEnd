import React,{useEffect} from "react";
import moment from "moment";
import Calendarjj from "../components/Calendarjj";
import KyuCalendar from "../pages/KyuCalendar";
import Popup from "../components/Popup";
import DetailPost from "../components/DetailPost";
import DetailWrite from "../components/DetailWrite";
import DetailEmpty from "../components/DetailWrite";
import ToDo from "../elements/ToDo";
import styled from "styled-components";

import { Button } from "../elements/Styles";
import { actionCreators as todoActions } from "../redux/modules/todo";

import { useSelector, useDispatch } from "react-redux";


const MainCalendar = (props) => {
  const dispatch = useDispatch()
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
  const [is_modify, setModify] = React.useState(false);
  const [is_empty, setEmpty] = React.useState(false);


 

  return (
    <React.Fragment>
      <AllContainer>
     <Calendarjj 
        show_completed={show_completed}
        _showPopup={setIsOpen}
        _setSeletedTodo={setSeletedTodo}
      />
      {is_empty && <DetailEmpty _showEmpty={setEmpty}/>}
      {is_modify && !is_empty ?<DetailWrite _showModify={setModify}/>:<DetailPost  _showModify={setModify}/>}
      {is_open && (
        <Popup
          type="todo_detail"
          selected_todo={selected_todo}
          _showPopup={setIsOpen}
        />
      )}
      <Button
        float
        right="10px"
        bottom="10px"
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
      </AllContainer>
    </React.Fragment>
  );
};

const AllContainer = styled.div`
display:flex;
flex-direction: column;
width:90%;
`



export default MainCalendar;




