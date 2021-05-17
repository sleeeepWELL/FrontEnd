import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import Graphic from "../components/Graphic";
import "../components/Font.css";
import Swal from "sweetalert2";
import { passwordCheck, nicknameCheck } from "../shared/common";
import MSignup from "../mobile/MSignup";
import { debounce } from "lodash";

//회원가입
const Signup = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState(null);
  const [nickname, setNickname] = React.useState(null);
  const [pwd, setPwd] = React.useState(null);
  const [pwdCheck, setPwdCheck] = React.useState(null);
  const [authNum, setAuthNum] = React.useState(null);
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  //닉네임 중복검사 통과 여부 (true면 중복, false면 통과)
  const nameCheck = useSelector((state) => state.user.name_check);

  //인증완료 성공 여부 (true면 완료, false면 미완료)
  const authCheck = useSelector((state) => state.user.auth_check);

  // 인증번호 발송
  const sendAuth = (e) => {
    document.getElementById(e.target.id).disabled = true;
    dispatch(userActions.SendAuth(email));
  };

  // 인증완료
  const confirmAuth = () => {
    dispatch(userActions.ConfirmAuth(email, authNum));
  };

  // 닉네임 중복검사
  const userNameCheck = () => {
    if (!nicknameCheck(nickname)) {
      Swal.fire({
        title: "닉네임을 다시 정해주세요",
        html: "닉네임은 1글자 이상 9글자 이하로 정해주세요!",
        icon: "info",
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: "확인",
      });
      return;
    }
    dispatch(userActions.userNameCheck(nickname));
  };

  //회원가입 버튼
  const signup = () => {
    if (email === "" || nickname === "" || pwd === "" || pwdCheck === "") {
      Swal.fire({
        title: "모든항목을 입력해주세요.",
        icon: "info",
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: "확인",
      });
      return;
    }

    if (nameCheck) {
      Swal.fire({
        title: "닉네임 중복확인이 완료되지 않았습니다.",
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

    dispatch(userActions.signUpSV(email, nickname, pwd, pwdCheck));
  };

  // 반응형
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
    return <MSignup />;
  } else {
    return (
      <React.Fragment>
        <Wrap>
          <Graphic />
          <LoginWrap>
            <SignUpContainer>
              <SemiContainer className="TimeText">
                <div style={{ color: "black", fontSize: "30px" }}>회원가입</div>

                <InputContainer>
                  <InfoTitle>이메일</InfoTitle>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <InputBox
                      className="TimeText"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Sleep@well.com"
                    />
                    <CheckBnt id="userauth" disabled="" onClick={sendAuth}>
                      인증 번호 발송
                    </CheckBnt>
                  </div>
                </InputContainer>
                <InputContainer>
                  <InfoTitle>인증번호</InfoTitle>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <InputBox
                      className="TimeText"
                      onChange={(e) => {
                        setAuthNum(e.target.value);
                      }}
                      placeholder="인증번호 입력"
                    />
                    <CheckBnt onClick={confirmAuth}>인증 완료</CheckBnt>
                  </div>
                </InputContainer>
                <InputContainer>
                  <InfoTitle>닉네임</InfoTitle>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <InputBox
                      className="TimeText"
                      onChange={(e) => {
                        setNickname(e.target.value);
                      }}
                      placeholder="1글자 이상 9글자 이하"
                    />
                    <CheckBnt onClick={userNameCheck}>중복 확인</CheckBnt>
                  </div>
                </InputContainer>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "2rem",
                  }}
                >
                  <InfoTitle>비밀번호</InfoTitle>
                  <PwBox
                    className="TimeText"
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                    placeholder="영문/숫자/특수문자 포함 8글자 이상"
                    type="password"
                  />
                  <div style={{ height: "2rem" }}></div>
                  <InfoTitle>비밀번호 재입력</InfoTitle>
                  <PwBox
                    className="TimeText"
                    onChange={(e) => {
                      setPwdCheck(e.target.value);
                    }}
                    placeholder="영문/숫자/특수문자 포함 8글자 이상"
                    type="password"
                  />
                </div>
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
                      history.replace("/findpwd");
                    }}
                  >
                    비밀번호 찾기
                  </div>
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
  }
};

const InfoTitle = styled.div`
  display: flex;
  margin-bottom: 5px;
  font-size: 14px;
`;

const SemiContainer = styled.div`
  width: 35%;
  height: 90%;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
  box-sizing: border-box;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 2rem;
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

const CheckBnt = styled.button`
  font-weight: 400;
  word-break: keep-all;
  line-height: 16px;
  background-color: rgba(74, 85, 102, 1);
  border-radius: 10px;
  border: none;
  height: 3rem;
  align-items: flex-end;
  font-size: 0.8rem;
  cursor: pointer;
  width: 27%;
  font-family: inherit;
  border: 0.5px solid lightgray;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 3px 0px;
  color: white;
  :hover {
    background-color: gray;
    color: white;
  }
`;

const Wrap = styled.div`
  width: 100vw;
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
  margin-left: 0.7rem;
  width: 90%;
  height: 100%;
  border: none;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
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
  display: flex;
  height: 50px;
  background-color: rgba(74, 85, 102, 1);
  border: none;
  text-align: center;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
`;

export default Signup;
