import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import Swal from "sweetalert2";
import { passwordCheck } from "../shared/common";
import background from "../images/background_A.png";
import "../components/Font.css";

//회원가입
const MFindPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState(null);
  const [pwd, setPwd] = React.useState(null);
  const [pwdCheck, setPwdCheck] = React.useState(null);
  const [authNum, setAuthNum] = React.useState(null); //인증번호

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

  return (
    <React.Fragment>
      <Wrap>
        <Background>
          <SignUpContainer>
            <SemiContainer className="TimeText">
              <div className="TimeText" style={{ fontSize: "25px" }}>
                비밀번호 찾기
              </div>
              <InputContainer>
                <InputBox
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="가입한 이메일 입력"
                />
                <CheckBnt
                  className="TimeText"
                  id="auth"
                  disabled=""
                  onClick={sendPwdAuth}
                >
                  인증번호 발송
                </CheckBnt>
              </InputContainer>
              <InputContainer>
                <InputBox
                  onChange={(e) => {
                    setAuthNum(e.target.value);
                  }}
                  placeholder="인증번호 입력"
                />
                <CheckBnt className="TimeText" onClick={confirmAuth}>
                  인증 완료
                </CheckBnt>
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
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.replace("/login");
                  }}
                >
                  로그인
                </div>
                <div
                  style={{ cursor: "pointer" }}
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

const InputContainer = styled.div`
  display: flex;
  margin-top: 8%;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 40px;
  align-items: center;
  background-color: white;
  margin: 5px 0px;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  color: gray;
  & > div {
    font-size: 0.7rem;
  }
`;

const CheckBnt = styled.button`
  word-break: keep-all;
  background-color: rgba(238, 238, 238, 1);
  border-radius: 10px;
  align-items: flex-end;
  font-size: 0.6rem;
  cursor: pointer;
  width: 27%;
  border: 0.5px solid lightgray;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 3px 0px;
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

const SignUpContainer = styled.div`
  display: flex;
  margin: 0px;
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
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
  font-size: 0.7rem;
  font-weight: bold;
  color: black;
  margin-right: 0.5rem;
  width: 70%;
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
  margin-top: 8%;
  outline: none;
  font-size: 0.7rem;
  font-weight: bold;
  color: black;
  opacity: 0.7;
  ::placeholder {
    font-size: 0.7rem;
  }
`;

const SignUpButton = styled.a`
  display: flex;
  border-radius: 10px;
  height: 50px;
  background-color: rgba(1, 0, 1, 1);
  border: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 3px 0px;
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

export default MFindPassword;
