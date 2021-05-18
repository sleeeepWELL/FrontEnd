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
        prev.style.color = "#8b8a8a";
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
        <FstContainer>
          <Between></Between>
          <LogoImg className="Logo" id="logo" onClick={LogoClick} />
        </FstContainer>
        <CategoryContainer>
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
        </CategoryContainer>
        <LogoutBox className="TimeText" onClick={LOGOUT}>
          <span>로그아웃</span>
        </LogoutBox>
      </Wrap>
    </React.Fragment>
  );
};

const Between = styled.div`
  display: flex;
  width: 15px;
  box-sizing: border-box;
  @media (max-width: 411px) {
    width: 5px;
  }

  @media (max-width: 320px) {
    width: 5px;
  }

  @media (max-width: 280px) {
    width: 1px;
  }
`;

const FstContainer = styled.div`
  display: flex;
  width: 15%;
  height: 7vh;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: rgba(219, 219, 219, 1);
  width: 100vw;
  height: 7vh;
  align-items: center;
  border-bottom: 0.8px solid #bebcbc;
  position: sticky;
  box-sizing: border-box;
  top: 0%;
  z-index: 9999;
`;

const CategoryBox = styled.div`
  display: flex;
  height: 7vh;
  align-items: center;
  color: #8b8a8a;
  letter-spacing: -1px;
  cursor: pointer;
  font-size: 1.6rem;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 540px) {
    font-size: 1rem;
  }

  @media (max-width: 414px) {
    font-size: 0.9rem;
  }

  @media (max-width: 375px) {
    font-size: 0.8rem;
  }
  @media (max-width: 320px) {
    font-size: 0.7rem;
  }
`;

const LogoImg = styled.div`
  width: 100%;
  height: 7vh;
  display: flex;
  margin: 0px;
  cursor: pointer;
  outline: none;
  border: none;
  background: url("${Logo}");
  background-size: auto 100%;
  background-repeat: no-repeat;
`;

const LogoutBox = styled.div`
  width: 15%;
  display: flex;
  font-size: 1.4rem;
  justify-content: center;
  cursor: pointer;
  color: black;
  & > span {
    background-color: rgba(56, 56, 56, 1);
    padding: 0.6rem;
    border-radius: 4px;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    & > span {
      padding: 0.6rem;
    }
  }

  @media (max-width: 540px) {
    font-size: 0.9rem;
    & > span {
      padding: 0.4rem;
    }
  }

  @media (max-width: 414px) {
    font-size: 0.7rem;
    & > span {
      padding: 0.3rem;
    }
  }
  @media (max-width: 360px) {
    font-size: 0.6rem;
    & > span {
      padding: 0.2rem;
    }
  }

  @media (max-width: 320px) {
    font-size: 0.5rem;
    & > span {
      padding: 0.2rem;
    }
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-around;
  font-weight: 600;
`;

export default Navigator;
