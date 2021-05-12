import React from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import Calendarjj from "../components/Calendarjj";
import DetailPost from "../components/DetailPost";
import DetailWrite from "../components/DetailWrite";

const MainCalendar = () => {
  const [is_modify, setModify] = React.useState(false);
  const day_list = useSelector((state) => state.todo.day_list);

  const GetClick = () => {};

  return (
    <React.Fragment>
      <Background>
        <AllContainer>
          <CalendarContainer>
            <Calendarjj _showModify={setModify} />
          </CalendarContainer>
          <PostContainer>
            {is_modify ? (
              <DetailWrite date={day_list} _showModify={setModify} />
            ) : (
              <DetailPost date={day_list} _showModify={setModify} />
            )}
          </PostContainer>
        </AllContainer>
      </Background>
    </React.Fragment>
  );
};
const slidein = keyframes`
 from {
  /* margin-left: 100%;
  width: 50% */
  opacity:0
}

to {
  /* margin-left: 5%;
  width: 90%; */
  opacity:1;
}
 `;

const AllContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: auto;
  animation: ${slidein} 1s;
`;

const CalendarContainer = styled.div`
  display: flex;
  width: 75%;
  margin: auto;
`;
const PostContainer = styled.div`
  display: flex;
  width: 20%;
  height: 100%;
  margin-left: 5%;
`;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(242, 242, 242, 1);
`;

export default MainCalendar;
