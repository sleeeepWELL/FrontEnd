import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import Calendarjj from "../components/Calendarjj";
import DetailPost from "../components/DetailPost";
import DetailWrite from "../components/DetailWrite";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const MainCalendar = (props) => {
  const [is_modify, setModify] = React.useState(false);
  const day_list = useSelector((state) => state.todo.day_list);

  return (
    <React.Fragment>
      <Background>
        <AllContainer>
          <Calendarjj _showModify={setModify} />
          <div style={{ width: "40px" }}></div>
          {is_modify ? (
            <DetailWrite date={day_list} _showModify={setModify} />
          ) : (
            <DetailPost date={day_list} _showModify={setModify} />
          )}
        </AllContainer>
      </Background>
    </React.Fragment>
  );
};

const AllContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin: auto;
  align-items: center;
`;

const Background = styled.div`
  width: 100%;
  left: 0;
  top: 0;
  background-color: #121212;
`;

export default MainCalendar;
