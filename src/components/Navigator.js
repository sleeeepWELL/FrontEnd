import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import "../shared/App.css";

const Navigator = () => {
  const dispatch = useDispatch();

  const [currentClick, setCurrentClick] = React.useState(null);
  const [prevClick, setPrevClick] = React.useState(null);

  const GetClick = (e) => {
    setCurrentClick(e.target.id);
    console.log(e.target.id);
    history.replace(`${e.target.id}`);
  };

  const LOGOUT = () => {
    dispatch(userActions.logOut());
    history.replace("/login");
    window.alert("로그아웃!");
  };

  React.useEffect(
    (e) => {
      if (currentClick !== null) {
        let current = document.getElementById(currentClick);
        console.log(current);
        current.style.color = "white";
        current.style.borderBottom = "2px solid";
        current.style.borderBottomColor = "#1c28f4";
      }

      if (prevClick !== null) {
        let prev = document.getElementById(prevClick);
        prev.style.color = "#bebcbc";
        prev.style.borderBottom = "none";
        // prev.addEventListener("mouseover", function () {
        //   prev.setAttribute("class", "hover");
        // });
      }
      setPrevClick(currentClick);
    },
    [currentClick]
  );

  return (
    <React.Fragment>
      <Wrap>
        <Logo>sleepwell</Logo>
        <CategoryContainer>
          <div></div>
          <CategoryBox id="calendar" onClick={GetClick}>
            홈페이지
          </CategoryBox>
          <CategoryBox id="case2" onClick={GetClick}>
            내 컨디션
          </CategoryBox>
          <CategoryBox id="analysis" onClick={GetClick}>
            분석
          </CategoryBox>
          <div></div>
        </CategoryContainer>
        <LogoutBox onClick={LOGOUT}>로그아웃</LogoutBox>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  display: flex;
  background-color: black;
  width: 100%;
  height: 4rem;
  /* justify-content: center; */
  align-items: center;
  border-bottom: 0.8px solid #bebcbc;
  position: sticky;
  top: 0%;
`;

const CategoryBox = styled.div`
  display: flex;
  height: 4rem;
  align-items: center;
  color: #bebcbc;
  letter-spacing: -1px;
  cursor: pointer;
  :hover {
    color: black;
    border-bottom: 2px solid #bebcbc;
    transition: all 0.1s ease-out;
  }
`;

const Logo = styled.div`
  width: 15%;
  display: flex;
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  justify-content: center;
`;

const LogoutBox = styled.div`
  position: absolute;
  width: 15%;
  right: 0%;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  color:white;
`;

const CategoryContainer = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-around;
  align-items: center;
  position: relative;
  font-weight: 600;
 
`;

export default Navigator;
