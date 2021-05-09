import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

//회원가입
const Signup = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState(null);
  const [nickname, setNickname] = React.useState(null);
  const [pwd, setPwd] = React.useState(null);
  const [pwdCheck, setPwdCheck] = React.useState(null);
  const [authNum, setAuthNum] = React.useState(null);

  //표현식 체크함수
  const emailCheck = (email) => {
    let emailReg = /^(?=.*[@])(?=.*[.])[a-zA-Z0-9@.]{14,30}$/g;
    return emailReg.test(email);
  };

  const pwCheck = (pwd) => {
    let pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9].{4,}$/;
    return pwReg.test(pwd);
  };
  const nicknameCheck = (nickname) => {
    let nicknameReg = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,9}$/g;
    return nicknameReg.test(nickname);
  };

  const sendAuth = () => {
    console.log(email);
    dispatch(userActions.SendAuth(email));
  };

  const confirmAuth = () => {
    console.log(authNum);
    console.log(email);
    dispatch(userActions.ConfirmAuth(email, authNum));
  };

  //표현식 함수사용 및 체크구문
  const signup = () => {
    if (email === "" || nickname === "" || pwd === "" || pwdCheck === "") {
      window.alert("모든 항목을 입력해주세요!");
      return;
    }
    // if (pwd !== pwdCheck) {
    //   window.alert("비밀번호 설정을 다시 확인하세요!");
    //   return;
    // }
    // if (!pwCheck(pwd)) {
    //   window.alert(
    //     "비밀번호는 4자리 이상이며,  영문(대/소문자)과 숫자와 특수문자로 구성해야합니다😅"
    //   );
    //   return;
    // }
    // if (!nicknameCheck(nickname)) {
    //   window.alert("닉네임은 1자리 이상 10자리 미만입니다😅");
    //   return;
    // }
    // if (!emailCheck(email)) {
    //   window.alert("이메일은 14자리 이상 30자리 이하며,  형식을 지켜주세요😅");
    //   return;
    // }
    // if (pwd.search(/\s/) !== -1) {
    //   window.alert("비밀번호에 공백이 포함되었습니다😅");
    //   return;
    // }
    // if (nickname.search(/\s/) !== -1) {
    //   window.alert("닉네임에 공백이 포함되었습니다😅");
    //   return;
    // }
    console.log(email, nickname, pwd, pwdCheck);
    dispatch(userActions.signUpSV(email, nickname, pwd, pwdCheck));
  };

  return (
    <React.Fragment>
      <Wrap>
        <Background></Background>
        <LoginWrap>
          <LogoContainer>
            <Logo>SleepWell</Logo>
          </LogoContainer>
          <SignUpContainer>
            <SemiContainer>
              <div style={{ fontSize: "30px", fontWeight: "600" }}>
                회원가입
              </div>
              <InputContainer>
                <InputBox
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="이메일을 입력해주세요"
                />
                <CheckBnt onClick={sendAuth}>인증번호발송</CheckBnt>
              </InputContainer>
              <InputContainer>
                <InputBox
                  onChange={(e) => {
                    setAuthNum(e.target.value);
                  }}
                  placeholder="인증번호를 입력해주세요"
                />
                <CheckBnt onClick={confirmAuth}>인증완료</CheckBnt>
              </InputContainer>
              <InputContainer>
                <InputBox
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                  placeholder="닉네임을 입력해주세요"
                />
                <CheckBnt>중복확인</CheckBnt>
              </InputContainer>
              <PwBox
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                placeholder="비밀번호를 입력해주세요"
                type="password"
              />
              <PwBox
                onChange={(e) => {
                  setPwdCheck(e.target.value);
                }}
                placeholder="비밀번호를 확인해주세요"
                type="password"
              />

              <InfoBox>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.replace("/login");
                  }}
                >
                  로그인
                </div>
                <div>비밀번호 찾기</div>
              </InfoBox>

              <SignUpButton onClick={signup}>
                <span>가입완료</span>
              </SignUpButton>
            </SemiContainer>
          </SignUpContainer>
        </LoginWrap>
      </Wrap>
    </React.Fragment>
  );
};

const SemiContainer = styled.div`
  width: 36%;
  height: 70%;
  display: flex;
  position: absolute;
  top: 26%;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 2rem;
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

const CheckBnt = styled.button`
  background-color: white;
  border: 1px gray solid;
  height: 3rem;
  align-items: flex-end;
  font-size: 0.7rem;
  cursor: pointer;
  width: 7rem;
  :hover {
    background-color: gray;
    color: white;
  }
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

const SignUpContainer = styled.div`
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
  font-weight: bold;
  color: black;
`;

const InputBox = styled.input`
  background-color: white;
  padding: 15px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid grey;
  border-radius: 1px;
  outline: none;
  font-size: 15px;
  font-weight: bold;
  color: black;
  width: 100%;
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
`;

const SignUpButton = styled.a`
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
export default Signup;
