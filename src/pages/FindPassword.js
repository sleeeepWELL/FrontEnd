import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import Graphic from "../components/Graphic";
import Swal from "sweetalert2";
import { debounce } from "lodash";

import { passwordCheck } from "../shared/common";
import MFindPassword from "../mobile/MFindPassword";
import "../components/Font.css";

//회원가입
const FindPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState(null);
  const [pwd, setPwd] = React.useState(null);
  const [pwdCheck, setPwdCheck] = React.useState(null);
  const [authNum, setAuthNum] = React.useState(null); //인증번호
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  //인증완료 성공 여부 (true면 완료, false면 미완료)
  const authCheck = useSelector((state) => state.user.auth_check);

  // 인증번호 발송
  const sendPwdAuth = (e) => {
    document.getElementById(e.target.id).disabled = true;
    dispatch(userActions.sendPwdAuth(email));
  };

  // 인증완료
  const confirmAuth = () => {
    dispatch(userActions.ConfirmAuth(email, authNum));
  };

  //표현식 함수사용 및 체크구문
  const changePwd = () => {
    if (email === "" || pwd === "" || pwdCheck === "") {
      Swal.fire({
        title: "모든항목을 입력해주세요.",
        icon: "info",
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: "확인",
      });
      return;
    }

    if (authCheck === false) {
      Swal.fire({
        title: "이메일 인증이 완료되지 않았습니다.",
        icon: "info",
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: "확인",
      });
      return;
    }

    if (pwd !== pwdCheck) {
      Swal.fire({
        title: "비밀번호가 다르게 입력되었습니다.",
        icon: "info",
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: "확인",
      });
      return;
    }

    if (!passwordCheck(pwd)) {
      Swal.fire({
        title: "비밀번호를 재설정해주세요.",
        html: "비밀번호는 8글자 이상, 영문+숫자+특수문자로 구성해야합니다.",
        icon: "info",
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: "확인",
      });
      return;
    }

    dispatch(userActions.changePwd(email, pwd, pwdCheck));
  };

  const handleResize = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 100);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  if (windowSize < 415) {
    return <MFindPassword />;
  } else {
    return (
      <React.Fragment>
        <Wrap>
          <Graphic />
          <LoginWrap>
            <SignUpContainer>
              <SemiContainer className="TimeText">
                <div style={{ fontSize: "30px", fontWeight: "600" }}>
                  비밀번호 찾기
                </div>
                <InputContainer>
                  <InputBox
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="가입한 이메일 입력"
                  />
                  <CheckBnt id="auth" disabled="" onClick={sendPwdAuth}>
                    인증 번호 발송
                  </CheckBnt>
                </InputContainer>
                <InputContainer>
                  <InputBox
                    onChange={(e) => {
                      setAuthNum(e.target.value);
                    }}
                    placeholder="인증번호를 입력"
                  />
                  <CheckBnt onClick={confirmAuth}>인증 완료</CheckBnt>
                </InputContainer>
                <PwBox
                  onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                  placeholder="새로운 비밀번호 입력"
                  type="password"
                />
                <PwBox
                  onChange={(e) => {
                    setPwdCheck(e.target.value);
                  }}
                  placeholder="새로운 비밀번호 재입력"
                  type="password"
                />
                <InfoBox>
                  <div
                    style={{ cursor: "pointer", fontSize: "13px" }}
                    onClick={() => {
                      history.replace("/login");
                    }}
                  >
                    로그인
                  </div>
                  <div
                    style={{ cursor: "pointer", fontSize: "13px" }}
                    onClick={() => {
                      history.replace("/signup");
                    }}
                  >
                    회원가입
                  </div>
                </InfoBox>

                <SignUpButton onClick={changePwd}>
                  <span>완료</span>
                </SignUpButton>
              </SemiContainer>
            </SignUpContainer>
          </LoginWrap>
        </Wrap>
      </React.Fragment>
    );
  }
};

const SemiContainer = styled.div`
  width: 36%;
  height: 90%;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
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
  margin: 10px 0px;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  color: gray;
  font-size: 15px;
`;

const CheckBnt = styled.button`
  word-break: keep-all;
  background-color: rgba(238, 238, 238, 1);
  border-radius: 10px;
  border: none;
  height: 3rem;
  align-items: flex-end;
  cursor: pointer;
  width: 27%;
  border: 0.5px solid lightgray;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 3px 0px;
  font-family: inherit;
  :hover {
    background-color: gray;
    color: white;
  }
`;

const Wrap = styled.div`
  width: 80vw;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: flex-start;
  margin: auto;
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
  border: 0.5px solid rgba(76, 76, 76, 0.3);
  border-radius: 10px;
  outline: none;
  font-size: 15px;
  font-weight: bold;
  color: black;
  margin-right: 0.5rem;
  width: 70%;
  opacity: 0.7;
  ::placeholder {
    font-size: 13px;
  }
`;

const PwBox = styled.input`
  background-color: white;
  padding: 15px;
  border: 0.5px solid rgba(76, 76, 76, 0.3);
  border-radius: 10px;
  margin-top: 2rem;
  outline: none;
  font-size: 15px;
  font-weight: bold;
  color: black;
  opacity: 0.7;
  ::placeholder {
    font-size: 13px;
  }
`;

const SignUpButton = styled.a`
  margin-top: 10px;
  display: flex;
  height: 50px;
  margin-top: 10px;
  background-color: rgba(1, 0, 1, 1);
  border: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  color: white;
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
export default FindPassword;
