import React, { useEffect } from "react";
import moment from "moment";
import Calendarjj from "../components/Calendarjj";
import KyuCalendar from "../pages/KyuCalendar";
import DetailPost from "../components/DetailPost";
import DetailWrite from "../components/DetailWrite";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const MainCalendar = (props) => {
  const [is_modify, setModify] = React.useState(false);
  //day_list를 받아서 props로 넘겨주는 것과 DetailWrite에서 바로 day_list를 가져오는 것은 다르다.
  //날짜를 고르고 그 값을 전달하는 건 되는데 바로 가져오는경우 initialState값이 들어간다
  const day_list = useSelector((state) => state.todo.day_list);

  
  return (
    <React.Fragment>
      <Background>
      <AllContainer>
      
     <Calendarjj _showModify={setModify}/>
     {is_modify ? <DetailWrite date={day_list} _showModify={setModify}/>:<DetailPost  date={day_list} _showModify={setModify}/>}
      </AllContainer>
    </Background>
    </React.Fragment>
  );
};


const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin:auto;
  align-items: center;
`;

const Background = styled.div`
 width: 100%;
 left:0;
 top:0;
 background-color:#121212;
`

export default MainCalendar;
