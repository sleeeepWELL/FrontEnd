import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import "../shared/App.css";
import "./Font.css";

const Navigator = () => {
  const dispatch = useDispatch();

  const [currentClick, setCurrentClick] = React.useState(null);
  const [prevClick, setPrevClick] = React.useState(null);

  const GetClick = (e) => {
    setCurrentClick(e.target.id);
    console.log(e.target.id);
    history.replace(`/${e.target.id}`);
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

  //로그인 회원가입에서 헤더 안보이게
  if (window.location.href === "/login" || window.location.href === "/signup")
    return null;

  return (
    <React.Fragment>
      <Wrap>
        <Logo className="Logo" onClick={()=>{history.replace("/main")}}>SLEEPWELL</Logo>
        <CategoryContainer>
          <div></div>
          <CategoryBox id="main" onClick={GetClick}>
            캘린더
          </CategoryBox>
          <CategoryBox id="main/prac" onClick={GetClick}>
            내 컨디션
          </CategoryBox>
          <CategoryBox id="main/analysis" onClick={GetClick}>
            분석
          </CategoryBox>
          <CategoryBox id="main/mypage" onClick={GetClick}>
            마이페이지
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
  background-color: rgba(242, 242, 242, 1);
  width: 100%;
  height: 2.5rem;
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

const Logo = styled.button`
  width: 15%;
  display: flex;
  font-size: 1.5rem;
  color: black;
  font-weight: bold;
  cursor: pointer;
  justify-content: center;
  outline: none;
  border: none;
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
  color: black;
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
