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

  //day_list를 받아서 props로 넘겨주는 것과 바로 day_list를 가져오는 것은 차이가 있다.
  //날짜를 고르고 그 값을 전달하는 건 되는데 바로하는 경우 initialState값이 들어간다
  const day_list = useSelector((state) => state.todo.day_list);

 

  return (
    <React.Fragment>
      <AllContainer>
     <Calendarjj 
        show_completed={show_completed}
        _showPopup={setIsOpen}
        _setSeletedTodo={setSeletedTodo}
      />
      {is_modify ? <DetailWrite date={day_list} _showModify={setModify}/>:<DetailPost  _showModify={setModify}/>}
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




