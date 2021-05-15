import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useSelector, useDispatch } from "react-redux";
import "../shared/App.css";
import "./Font.css";
import Swal from "sweetalert2";
import Logo from "../images/Logo.png";

const Navigator = () => {
  const dispatch = useDispatch();

  // 로그인 상태
  const status = useSelector((state) => state.user.is_login);
  console.log(status);

  const [currentClick, setCurrentClick] = React.useState(null);
  const [prevClick, setPrevClick] = React.useState(null);

  const LogoClick = () => {
    setCurrentClick(null);
    history.replace("/main");
  };

  const GetClick = (e) => {
    setCurrentClick(e.target.id);
    history.replace(`/${e.target.id}`);
  };

  const LOGOUT = () => {
    dispatch(userActions.logOut());
    history.replace("/login");
    Swal.fire({
      icon: "success",
      title: "로그아웃 되었습니다.",
      showConfirmButton: false,
    });
  };

  React.useEffect(() => {
    if (status) {
      dispatch(userActions.getUserSV());
    } else {
      dispatch(userActions.extensionAccess());
    }
  }, [status]);

  React.useEffect(
    (e) => {
      if (currentClick !== null) {
        let current = document.getElementById(currentClick);
        current.style.color = "black";
        current.style.borderBottom = "2px solid";
        current.style.borderBottomColor = "#1c28f4";
      }
      if (prevClick !== null) {
        let prev = document.getElementById(prevClick);
        prev.style.color = "#bebcbc";
        prev.style.borderBottom = "none";
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
        <LogoImg className="Logo" id="logo" onClick={LogoClick} />
        <CategoryContainer>
          <div></div>
          <CategoryBox className="TimeText" id="main" onClick={GetClick}>
            캘린더
          </CategoryBox>
          <CategoryBox className="TimeText" id="main/prac" onClick={GetClick}>
            내 컨디션
          </CategoryBox>
          <CategoryBox
            className="TimeText"
            id="main/analysis"
            onClick={GetClick}
          >
            분석
          </CategoryBox>
          <CategoryBox className="TimeText" id="main/mypage" onClick={GetClick}>
            마이페이지
          </CategoryBox>
          <div></div>
        </CategoryContainer>
        <LogoutBox className="TimeText" onClick={LOGOUT}>
          <span>로그아웃</span>
        </LogoutBox>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  display: flex;
  background-color: rgba(219, 219, 219, 1);
  width: 100%;
  height: 7vh;
  align-items: center;
  border-bottom: 0.8px solid #bebcbc;
  position: sticky;
  top: 0%;
  z-index: 9999;
`;

const CategoryBox = styled.div`
  display: flex;
  height: 7vh;
  align-items: center;
  color: #bebcbc;
  letter-spacing: -1px;
  cursor: pointer;
`;

const LogoImg = styled.div`
  width: 10rem;
  height: 7vh;
  display: flex;
  cursor: pointer;
  justify-content: center;
  outline: none;
  border: none;
  background: url(${Logo});
  background-size: auto 100%;
  background-repeat: no-repeat;
`;

const LogoutBox = styled.div`
  position: absolute;
  width: 15%;
  right: 0%;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  cursor: pointer;
  color: black;
  & > span {
    background-color: rgba(56, 56, 56, 1);
    padding: 0.6rem;
    border-radius: 4px;
    color: white;
  }
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
