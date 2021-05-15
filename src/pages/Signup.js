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
                <div style={{ fontSize: "30px" }}>회원가입</div>
                <InputContainer>
                  <InputBox
                    className="TimeText"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="이메일 입력"
                  />
                  <CheckBnt id="userauth" disabled="" onClick={sendAuth}>
                    인증 번호 발송
                  </CheckBnt>
                </InputContainer>
                <InputContainer>
                  <InputBox
                    className="TimeText"
                    onChange={(e) => {
                      setAuthNum(e.target.value);
                    }}
                    placeholder="인증번호 입력"
                  />
                  <CheckBnt onClick={confirmAuth}>인증 완료</CheckBnt>
                </InputContainer>
                <InputContainer>
                  <InputBox
                    className="TimeText"
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                    placeholder="닉네임 입력"
                  />
                  <CheckBnt onClick={userNameCheck}>중복 확인</CheckBnt>
                </InputContainer>
                <PwBox
                  className="TimeText"
                  onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                  placeholder="비밀번호 입력"
                  type="password"
                />
                <PwBox
                  className="TimeText"
                  onChange={(e) => {
                    setPwdCheck(e.target.value);
                  }}
                  placeholder="비밀번호 재입력"
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
  margin: 20px 0px;
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
  font-size: 0.8rem;
  cursor: pointer;
  width: 27%;
  font-family: inherit;
  border: 0.5px solid lightgray;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 3px 0px;
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
  align-items: center;
  flex-direction: column;
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
  display: flex;
  height: 50px;
  margin-top: 10px;
  background-color: rgba(1, 0, 1, 1);
  border: none;
  text-align: center;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
export default Signup;
