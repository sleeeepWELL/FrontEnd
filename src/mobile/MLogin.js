import React from "react";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";
import kakaologo from "../images/kakao.png";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import "../components/Font.css";
import { KAKAO_AUTH_URL } from "../shared/OAuth";
import Logo from "../images/Logo.png";

//로그인
const MLogin = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState(null);
  const [password, setPw] = React.useState(null);

  const Swal = require("sweetalert2");

  const login = () => {
    if (id === null || password === null) {
      Swal.fire({
        title: "이메일 & 패스워드",
        text: "모두 입력해주세요",
        icon: "info",
        confirmButtonText: "확인",
      });
      return;
    }
    dispatch(userActions.loginSV(id, password));
  };

  const onClick = () => {
    login();
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      login();
    }
  };

  return (
    <React.Fragment>
      <Wrap>
        <TotalContainer>
          <LogoContainer>
            <LogoImg src={Logo} />
          </LogoContainer>
          <SemiContainer className="TimeText">
            <LoGin className="TimeText">로그인</LoGin>
            <div style={{ height: "2rem" }}></div>
            <IdBox
              className="TimeText"
              onChange={(e) => {
                setId(e.target.value);
              }}
              placeholder="이메일   ex) sleep@gmail.com"
            />
            <PwBox
              className="TimeText"
              onChange={(e) => {
                setPw(e.target.value);
              }}
              placeholder="비밀번호"
              type="password"
              onKeyPress={onKeyPress}
            />
            <InfoBox>
              <div
                style={{ cursor: "pointer", fontSize: "0.7rem" }}
                onClick={() => {
                  history.replace("/signup");
                }}
              >
                회원가입
              </div>
              <div
                style={{ cursor: "pointer", fontSize: "0.7rem" }}
                onClick={() => {
                  history.replace("/findpwd");
                }}
              >
                비밀번호 찾기
              </div>
            </InfoBox>
            <div style={{ height: "1rem" }}></div>
            <LoginButton className="TimeText" onClick={onClick}>
              <span>로그인</span>
            </LoginButton>
            <Or>혹은</Or>
            <KaKaoBtn href={KAKAO_AUTH_URL}>
              <KaKaoWrap>
                <KaKaoImg className="TimeText" src={kakaologo}></KaKaoImg>
                <span>카카오계정 로그인</span>
              </KaKaoWrap>
            </KaKaoBtn>
          </SemiContainer>
          <BottomContainer />
        </TotalContainer>
      </Wrap>
    </React.Fragment>
  );
};

const LogoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
  align-items: flex-end;
  justify-content: center;
`;

const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
`;

const TotalContainer = styled.div`
  width: 92%;
  padding: 0 8%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const boxFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
 `;

const LogoImg = styled.img`
  display: flex;
  position: absolute;
  width: 100px;
  height: 13vh;
  justify-content: center;
 animation: ${boxFade} 2s;
`;

const LoGin = styled.div`
  font-size: 25px;
  color: black;
`;

const Or = styled.div`
  display: flex;
  width: 100%;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: inherit;
  font-weight: 550;
  color: gray;
`;

const KaKaoWrap = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  & span {
    font-size: 16px;
    color: black;
    font-weight: bold;
  }
`;

const SemiContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  flex-direction: column;
  justify-content: center;
  background-color: white;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 40px;
  align-items: center;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  color: gray;
`;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
`;

const IdBox = styled.input`
  width: auto;
  height: 20px;
  background-color: white;
  border: 0.5px solid rgba(76, 76, 76, 0.3);
  border-radius: 10px;
  padding: 15px;
  outline: none;
  font-size: 0.7rem;
  font-weight: bold;
  color: black;
  ::placeholder {
    font-size: 0.7rem;
  }
`;

const PwBox = styled.input`
  background-color: white;
  padding: 15px;
  border: 0.5px solid rgba(76, 76, 76, 0.3);
  border-radius: 10px;
  margin-top: 2rem;
  outline: none;
  font-size: 0.7rem;
  font-weight: bold;
  color: black;
  ::placeholder {
    font-size: 0.7rem;
  }
`;

const LoginButton = styled.a`
  display: flex;
  border-radius: 10px;
  width: auto;
  height: 50px;
  margin-top: 10px;
  background-color: rgba(74, 85, 102, 1);
  border: none;
  text-align: center;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  & > span {
    font-family: inherit;
  }
`;

const KaKaoBtn = styled.a`
  display: flex;
  height: 50px;
  background-color: #ffe500;
  text-align: center;
  border-radius: 10px;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
`;

const KaKaoImg = styled.img`
  display: flex;
  width: 17px;
  height: 17px;
  margin-right: 10px;
  & > span {
    font-family: inherit;
  }
`;

export default MLogin;
