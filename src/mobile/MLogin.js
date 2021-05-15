import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import kakaologo from "../images/kakao.png";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import "../components/Font.css";
import { KAKAO_AUTH_URL } from "../shared/OAuth";
import background from "../images/background_A.png";

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
        <Background>
          <LoginContainer>
            <SemiContainer className="TimeText">
              <LoGin className="TimeText">로그인</LoGin>
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
            </SemiContainer>
          </LoginContainer>
        </Background>
      </Wrap>
    </React.Fragment>
  );
};

const Background = styled.div`
  background: url(${background});
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  z-index: 999;
  border: none;
  display: flex;
  justify-content: center;
`;

const LoGin = styled.div`
  font-size: 25px;
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
  padding: 2rem 2rem;
  width: 60%;
  height: 70%;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 20%) 0px 10px 20px 0px;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 40px;
  align-items: center;
  margin: 10px 0px;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  color: gray;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: flex-start;
`;

const LoginContainer = styled.div`
  display: flex;
  margin: 0px;
  width: 70vw;
  height: 100%;
  border: none;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  margin-top: 15%;
  font-weight: bold;
  color: black;
  opacity: 0.7;
  ::placeholder {
    font-size: 0.7rem;
  }
`;

const PwBox = styled.input`
  background-color: white;
  padding: 15px;
  border: 0.5px solid rgba(76, 76, 76, 0.3);
  border-radius: 10px;
  margin: 2rem 0px;
  outline: none;
  font-size: 0.7rem;
  font-weight: bold;
  color: black;
  opacity: 0.7;
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
  background-color: rgba(1, 0, 1, 1);
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
