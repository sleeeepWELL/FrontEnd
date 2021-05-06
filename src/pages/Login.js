import React from "react";
import styled from "styled-components";
// import {useDispatch} from "react-redux";
// import {actionCreators as userActions } from '../redux/modules/user';
import { history } from "../redux/configureStore";
import kakaologo from "../images/kakao.png";
import { setCookie } from "../shared/Cookie";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import KaKaoLogin from "react-kakao-login";
import { KAKAO_JS_ID } from "../shared/OAuth";

import { KAKAO_AUTH_URL } from "../shared/OAuth";

//로그인
const Login = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState(null);
  const [password, setPw] = React.useState(null);

  const login = () => {
    if (id === "" || password === "") {
      window.alert("아이디 혹은 비밀번호를 입력해주세요!");
      return;
    }
    dispatch(userActions.loginSV(id, password));
  };

  // 카카오 로그인
  // const kakaoLoginSuccessHandler = (res) => {
  //   const data = res.response;
  //   console.log(res);
  // 카카오 로그인 후 받아온 토큰
  // dispatch(
  //   userActions.loginByKakao({
  //     kakaoToken: data.access_token,
  //   })
  // );
  // };

  //   onClick={()=>{history.push("/signup")}}
  return (
    <React.Fragment>
      <Wrap>
        <Background></Background>
        <LoginWrap>
          <LogoContainer>
            <Logo>SleepWell</Logo>
          </LogoContainer>
          <LoginContainer>
            <SemiContainer>
              <div style={{ fontSize: "30px", fontWeight: "600" }}>로그인</div>
              <IdBox
                onChange={(e) => {
                  setId(e.target.value);
                }}
                placeholder="이메일을 입력해주세요"
              />
              <PwBox
                onChange={(e) => {
                  setPw(e.target.value);
                }}
                placeholder="비밀번호를 입력해주세요"
                type="password"
              />

              <InfoBox>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.replace("/signup");
                  }}
                >
                  회원가입
                </div>
                <div>비밀번호 찾기</div>
              </InfoBox>
              <LoginButton onClick={login}>
                <span>로그인</span>
              </LoginButton>
              {/* <KaKaoBtn
                //styled component 통해 style을 입혀 줄 예정
                jsKey={KAKAO_JS_ID}
                //카카오에서 할당받은 jsKey를 입력
                buttonText="카카오 계정으로 로그인"
                //로그인 버튼의 text를 입력
                onSuccess={kakaoLoginSuccessHandler}
                //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장
                getProfile={true}
              ></KaKaoBtn> */}
              {/* {KAKAO_AUTH_URL} */}
              <KaKaoBtn href="http://3.35.208.142/oauth/kakao">
                <img src={kakaologo}></img>
                <span>카카오계정 로그인</span>
              </KaKaoBtn>
            </SemiContainer>
          </LoginContainer>
        </LoginWrap>
      </Wrap>
    </React.Fragment>
  );
};

// const KaKaoBtn = styled(KaKaoLogin)`
//   padding: 0;
//   width: 300px;
//   height: 45px;
//   line-height: 44px;
//   color: #783c00;
//   background-color: #ffeb00;
//   border: 1px solid transparent;
//   border-radius: 3px;
//   font-size: 14px;
//   font-weight: bold;
//   text-align: center;
//   cursor: pointer;
//   &:hover {
//     box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
//   }
// `;

const SemiContainer = styled.div`
  width: 36%;
  height: 70%;
  display: flex;
  position: absolute;
  top: 26%;
  flex-direction: column;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 40px;
  align-items: center;
  background-color: white;
  margin: 20px 0px;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  color: gray;
  font-size: 15px;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: flex-start;
`;

const Background = styled.div`
  display: flex;
  top: 0;
  left: 0;
  background-image: url("https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1343&q=80");
  width: 60vw;
  height: 100vh;
  background-size: cover;
  z-index: -1;
`;

const LoginWrap = styled.div`
  display: flex;
  width: 40vw;
  height: 100vh;
  justify-content: center;
  box-sizing: border-box;
  align-items: flex-start;
  flex-direction: column;
`;

const LoginContainer = styled.div`
  display: flex;
  margin: 0px;
  padding: 1rem;
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
  align-content: center;
  justify-content: center;
`;

const LogoContainer = styled.div`
  width: auto;
  height: 10vh;
  display: flex;
`;

const Logo = styled.div`
  width: auto;
  height: 2rem;
  font-weight: 650;
  color: black;
  margin-left: 1rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
`;
const IdBox = styled.input`
  width: auto;
  height: 20px;
  background-color: white;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid gray;
  border-radius: 1px;
  padding: 15px;
  outline: none;
  font-size: 15px;
  margin-top: 3.5rem;
  font-weight: bold;
  color: black;
`;

const PwBox = styled.input`
  background-color: white;
  padding: 15px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid grey;
  border-radius: 1px;
  margin-top: 2rem;
  outline: none;
  font-size: 15px;
  font-weight: bold;
  color: black;
  @media (max-width: 975px) {
    width: 90%;
  }
`;

const LoginButton = styled.a`
  margin-top: 30px;
  display: block;
  height: 60px;
  margin-top: 10px;
  background-color: white;
  border: 1px solid gray;
  text-align: center;
  border-radius: 4px;
  align-content: center;
  cursor: pointer;
  & > span {
    display: inline-block;
    padding-top: 17px;
    font-size: 16px;
    line-height: 24px;
    color: black;
    vertical-align: top;
    font-family: sans-serif;
    font-weight: bold;
  }
`;

const KaKaoBtn = styled.a`
  margin-top: 30px;
  display: block;
  height: 60px;
  margin-top: 15px;
  background-color: #ffe500;
  text-align: center;
  border-radius: 4px;
  align-content: center;
  cursor: pointer;
  & > img {
    width: 17px;
    height: 17px;
    background-position: -50px -110px;
    display: inline-block;
    margin-top: 22px;
    margin-right: 12px;
    vertical-align: top;
  }
  & > span {
    display: inline-block;
    padding-top: 17px;
    font-size: 16px !important;
    line-height: 24px;
    color: #191919;
    vertical-align: top;
    font-family: sans-serif;
    font-weight: bold;
  }
`;

const SLoginButton = styled.button`
  width: 360px;
  height: 30px;
  background-color: #ffd700;
  margin-top: 10px;
  border: #fee500;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
`;

export default Login;
