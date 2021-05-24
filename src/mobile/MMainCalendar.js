import React, {useState,useEffect} from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import MCalendar from "../mobile/MCalendar";
import MDetailPost from "../mobile/MDetailPost";
import MDetailWrite from "../mobile/MDetailWrite";
import Search from "../components/Search";
import Cube from "../components/Cube";

const MMainCalendar = () => {
  const [is_modify, setModify] = React.useState(false);
  const day_list = useSelector((state) => state.todo.day_list);
  const [is_search, setSearch] = React.useState(false);

  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태
  
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if(ScrollY > 10) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  }

  const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setScrollY(0);  // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  }

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
      handleFollow();
    }
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
      handleFollow();
    }
  })



  return (
    <React.Fragment>
      <Background>
        <AllContainer>
          <CalendarContainer>
            <MCalendar _showModify={setModify} />
          
          </CalendarContainer>
          <RightContainer>
            <PostContainer>
              {is_modify ? (
                <MDetailWrite date={day_list} _showModify={setModify} />
              ) : (
                <MDetailPost date={day_list} _showModify={setModify} />
              )}
            </PostContainer>
            <SearchContainer>
              {is_search? <Search _showModify={setModify} />:null}
            </SearchContainer>
          </RightContainer>
          <CubeContainer>
                
                <CubeButton onClick={()=>{setSearch(true)}}><CubeText className="BottomInfo">날짜 검색</CubeText><Cube/></CubeButton>
               </CubeContainer>
        </AllContainer>
        
      </Background>
     {BtnStatus?<TopButton className="Helvetica" onClick={handleTop}>TOP</TopButton>:null} 
    </React.Fragment>
  );
};

const fadein = keyframes`
from {opacity:0}
to {opacity: 1;}

`;

const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 96%;
  height: 98%;
  margin-top: 2%;
  animation: ${fadein} 1s;
  // ease-in infinite alternate
`;

//캘린더 배경
const CalendarContainer = styled.div`
  width: 100%;
  height: 60vh;
  background-color: #f3f3f3;
  border-radius: 15px;
  padding-bottom: 1.5%;
  box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;
`;

// 카드와 검색
const RightContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  @media (max-width: 280px) {
    height: auto;
  }
`;

const PostContainer = styled.div`
  display: flex;
  width: 100%;
  height: 60vh;
  margin-top: 4%;
  background-color: #f3f3f3;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;
`;
const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5%;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #dbdbdb;
  // box-shadow: rgb(82 82 82/ 40%) 0px 5px 8px 0px;
`;
const CubeContainer = styled.div`

position:relative;

  justify-content: flex-start;

  width: 65%;
  height: 10%;
  
`;

const CubeButton = styled.button`
position:absolute;
  height: 100%;
  background-color: #dbdbdb;
  outline: none;
  border: none;

  
`;

const CubeText = styled.div`
position:absolute;
width: 70%;
font-size: 100%;
font-weight: bold;

 z-index:1;
 color: #121212;
 :hover {
  font-size: 100%;

}
`
const TopButton = styled. button`
position: fixed; 
  bottom: 80px; 
  right: 15px;
  font-weight: bold;
  font-size: 100%;
  z-index: 1; 
  width: 50px; 
  height: 50px;
  border-radius: 100%;
  border: 0 none;
  background: rgb(255,255,204);
  border: #121212;
  letter-spacing: -0.5px;
  box-shadow: 1px 1px 3px 1px rgba(0,0,0,0.3);
  cursor: pointer;
  transition: opacity 2s ease-in;


` 
const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 150vh;
  left: 0;
  top: 0;
  background-color: #dbdbdb;
`;

export default MMainCalendar;
