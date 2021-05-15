import React from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import Calendarjj from "../components/Calendarjj";
import DetailPost from "../components/DetailPost";
import DetailWrite from "../components/DetailWrite";
import Search from "../components/Search";
import Cube from "../components/Cube";

const MainCalendar = () => {
  const [is_modify, setModify] = React.useState(false);
  const day_list = useSelector((state) => state.todo.day_list);

  const GetClick = () => {};

  return (
    <React.Fragment>
      <Background>
        <AllContainer>
          <CalendarContainer>
            <Calendarjj _showModify={setModify}/>
          </CalendarContainer>
          <RightContainer>
            <PostContainer>
              {is_modify ? (
                <DetailWrite date={day_list} _showModify={setModify} />
              ) : (
                <DetailPost date={day_list} _showModify={setModify} />
              )}
            </PostContainer>
            <SearchContainer>
              <Search _showModify={setModify} />
            </SearchContainer>
            <SearchContainer>
              {/* <CubeButton onClick={()=>{console.log("하이")}}>
            <Cube />
            <Text>날짜 검색</Text>
          </CubeButton> */}
            </SearchContainer>
          </RightContainer>
        </AllContainer>
      </Background>
    </React.Fragment>
  );
};


const slidein = keyframes`
from {opacity:0}
to {opacity: 1;}

`;

const AllContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  margin: auto;
  animation: ${slidein} 1s ;
  // ease-in infinite alternate
`;


 
const CalendarContainer = styled.div`
  width: 75%;
  height: 130%;
  background-color: white;
  margin-top: 20px;
  border-radius: 15px;
  padding-bottom: 20px;
`;

// 카드와 검색 
const RightContainer = styled.div`
  display: flex;
  width: 25%;
  height: 100%;
  flex-direction: column;
  margin-top: 10px;
`;

const PostContainer = styled.div`
  display: flex;
  width: 100%;
  height: 65%;
  margin-left: 5%;
  margin-top: 10px;
  margin-bottom: 120px;
  background-color: white;
  flex-direction: column;
  border-radius: 20px;
`;
const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  height: 35%;
  margin-left: 5%;
  margin-top: 10px;
  align-content: center;
  border-radius: 20px;
`;


const Background = styled.div`
  width: 100%;
  height: 111vh;
  left: 0;
  top: 0;
  background-color: #f2f2f2;
  
`;

const CubeButton = styled.div`
  width: 20%;
  display: flex;
  border: 1px solid black;
  border: none;
`;
const Text = styled.div`
  font-weight: bold;
  z-index: 2;
  color: #121212;
  :hover {
    color: white;
  }
  margin-top: 24px;
`;


export default MainCalendar;
