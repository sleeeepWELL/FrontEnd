import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import Graphic from "../components/Graphic";
import "../components/Font.css";
import Swal from "sweetalert2";
import { emailCheck, passwordCheck, nicknameCheck } from "../shared/common";
import MSignup from "../mobile/MSignup";
import { debounce } from "lodash";

//회원가입
const Signup = () => {
  const dispatch = useDispatch();

  const emailInfo = useRef();
  const authNumInfo = useRef();
  const nickNameInfo = useRef();
  const pwdInfo = useRef();
  const pwdCheckInfo = useRef();
  const [emailMSG, setEmailMSG] = React.useState(null);
  const [authMSG, setAuthMSG] = React.useState(null);
  const [nicknameMSG, setNicknameMSG] = React.useState(null);
  const [pwdMSG, setPwdMSG] = React.useState(null);
  const [pwdCheckMSG, setPwdCheckMSG] = React.useState(null);

  const [email, setEmail] = React.useState(null);
  const [authNum, setAuthNum] = React.useState(null);
  const [nickname, setNickname] = React.useState(null);
  const [pwd, setPwd] = React.useState(null);
  const [pwdCheck, setPwdCheck] = React.useState(null);
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  //닉네임 중복검사 통과 여부 (true면 중복, false면 통과)
  const nameCheck = useSelector((state) => state.user.name_check);

  //인증완료 성공 여부 (true면 완료, false면 미완료)
  const authCheck = useSelector((state) => state.user.auth_check);

  // 이메일 관련 체크
  const CheckEmail = () => {
    // 이메일칸 미입력시
    if (email === "") {
      setEmailMSG("이메일을 입력해주세요.");
      emailInfo.current.style.color = "red";
      emailInfo.current.style.display = "flex";
      return;
    }

    // 이메일 양식 체크
    if (!emailCheck(email)) {
      setEmailMSG("이메일 형식에 맞춰서 입력해주세요.");
      emailInfo.current.style.color = "red";
      emailInfo.current.style.display = "flex";
      return;
    }

    // 이메일 공백여부
    if (email.search(/\s/) != -1) {
      setEmailMSG("이메일에 공백을 빼주세요.");
      emailInfo.current.style.color = "red";
      emailInfo.current.style.display = "flex";
      return;
    }

    setEmailMSG("완료");
    emailInfo.current.style.display = "flex";
    emailInfo.current.style.color = "green";
    return;
  };

  // 인증메일 발송 버튼
  const sendAuth = (e) => {
    if (emailMSG !== "완료") {
      return;
    }

    // 발송시키면 버튼 계속못누르게 막기(인증메일 연속 발송 저지)
    document.getElementById(e.target.id).disabled = true;
    dispatch(userActions.SendAuth(email));
  };

  // 인증번호 관련 체크
  const CheckAuth = () => {
    if (authNum === "") {
      setAuthMSG("인증번호를 입력해주세요.");
      authNumInfo.current.style.color = "red";
      authNumInfo.current.style.display = "flex";
      return;
    }

    if (document.getElementById("Eauthinput").value.length < 6) {
      setAuthMSG("인증번호를 모두 입력해주세요.");
      authNumInfo.current.style.color = "red";
      authNumInfo.current.style.display = "flex";
      return;
    }

    // 이상없으면 메세지 초기화
    setAuthMSG("완료");
    authNumInfo.current.style.display = "flex";
    authNumInfo.current.style.color = "green";
    return;
  };

  // 인증번호 입력(인증번호 입력 글자수 확인)
  const insertAuth = (e) => {
    setAuthNum(e.target.value);
    // 인증번호 6글자 입력 안하면 인증완료 버튼 비활성화
    document.getElementById("Eauthinput").value.length > 5
      ? (document.getElementById("Eauthcheck").disabled = false)
      : (document.getElementById("Eauthcheck").disabled = true);
  };

  // 인증완료 버튼
  const confirmAuth = () => {
    // 완료 메세지 없으면 체크 통과 못한것임
    if (authMSG !== "완료") {
      return;
    }
    dispatch(userActions.ConfirmAuth(email, authNum));
  };

  // 닉네임 관련 체크
  const CheckNickName = () => {
    if (nickname === "") {
      setNicknameMSG("닉네임을 입력해주세요.");
      nickNameInfo.current.style.color = "red";
      nickNameInfo.current.style.display = "flex";
      return;
    }

    if (!nicknameCheck(nickname)) {
      setNicknameMSG("1글자 이상 9글자 이하로 정해주세요.");
      nickNameInfo.current.style.color = "red";
      nickNameInfo.current.style.display = "flex";
      return;
    }
    // 이상없으면 완료 메세지
    setNicknameMSG("완료");
    nickNameInfo.current.style.display = "flex";
    nickNameInfo.current.style.color = "green";
    return;
  };

  // 닉네임 중복확인 버튼
  const userNameCheck = () => {
    if (nicknameMSG !== "완료") {
      return;
    }
    dispatch(userActions.userNameCheck(nickname));
  };

  // 비밀번호 관련 체크
  const CheckPwd = () => {
    if (pwd === "") {
      setPwdMSG("비밀번호를 입력하세요.");
      pwdInfo.current.style.color = "red";
      pwdInfo.current.style.display = "flex";
      return;
    }
    if (!passwordCheck(pwd)) {
      setPwdMSG("비밀번호는 8글자 이상, 영문+숫자+특수문자로 구성해야합니다.");
      pwdInfo.current.style.color = "red";
      pwdInfo.current.style.display = "flex";
      return;
    }
    // 이상없으면 메세지 초기화
    setPwdMSG("완료");
    pwdInfo.current.style.display = "flex";
    pwdInfo.current.style.color = "green";
    return;
  };

  // 비밀번호 재입력 관련 체크
  const CheckPwdCheck = () => {
    if (pwdCheck === "") {
      setPwdCheckMSG("비밀번호를 입력하세요.");
      pwdCheckInfo.current.style.color = "red";
      pwdCheckInfo.current.style.display = "flex";
      return;
    }
    if (pwd !== pwdCheck) {
      setPwdCheckMSG("비밀번호가 다릅니다. 다시 입력하세요.");
      pwdCheckInfo.current.style.color = "red";
      pwdCheckInfo.current.style.display = "flex";
      return;
    }
    // 이상없으면 메세지 초기화
    setPwdCheckMSG("완료");
    pwdCheckInfo.current.style.display = "flex";
    pwdCheckInfo.current.style.color = "green";
    return;
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
      setNicknameMSG("닉네임 중복확인이 완료되지 않았습니다.");
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

    if (
      emailMSG !== "완료" ||
      authMSG !== "완료" ||
      nicknameMSG !== "완료" ||
      pwdMSG !== "완료" ||
      pwdCheckMSG !== "완료"
    ) {
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
                      onBlur={CheckEmail}
                      placeholder="Sleep@well.com"
                    />
                    <CheckBnt id="userauth" disabled="" onClick={sendAuth}>
                      인증 메일 발송
                    </CheckBnt>
                  </div>
                  <InfoDiv>
                    <Info ref={emailInfo}>{emailMSG}</Info>
                  </InfoDiv>
                </InputContainer>

                <InputContainer>
                  <InfoTitle>인증번호</InfoTitle>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <InputBox
                      id="Eauthinput"
                      className="TimeText"
                      onChange={insertAuth}
                      onBlur={CheckAuth}
                      placeholder="인증번호 입력"
                    />
                    <CheckBnt id="Eauthcheck" onClick={confirmAuth} disabled="">
                      인증 완료
                    </CheckBnt>
                  </div>
                  <InfoDiv>
                    <Info ref={authNumInfo}>{authMSG}</Info>
                  </InfoDiv>
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
                      onBlur={CheckNickName}
                    />
                    <CheckBnt onClick={userNameCheck}>중복 확인</CheckBnt>
                  </div>
                  <InfoDiv>
                    <Info ref={nickNameInfo}>{nicknameMSG}</Info>
                  </InfoDiv>
                </InputContainer>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "1rem",
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
                    onBlur={CheckPwd}
                  />
                  <InfoDiv>
                    <Info ref={pwdInfo}>{pwdMSG}</Info>
                  </InfoDiv>

                  <div style={{ height: "1rem" }}></div>
                  <InfoTitle>비밀번호 확인</InfoTitle>
                  <PwBox
                    className="TimeText"
                    onChange={(e) => {
                      setPwdCheck(e.target.value);
                    }}
                    placeholder="영문/숫자/특수문자 포함 8글자 이상"
                    type="password"
                    onBlur={CheckPwdCheck}
                  />
                  <InfoDiv>
                    <Info ref={pwdCheckInfo}>{pwdCheckMSG}</Info>
                  </InfoDiv>
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

const InfoDiv = styled.div`
  display: flex;
  width: 100%;
  font-weight: 500;
  height: 12px;
  /* background-color: green; */
  padding: 4px 0px 0px 4px;
`;

const Info = styled.li`
  display: none;
  font-size: 12px;
  color: #ee3a57;
`;

const InfoTitle = styled.div`
  display: flex;
  margin-bottom: 5px;
  font-size: 14px;
`;

const SemiContainer = styled.div`
  width: 30%;
  height: 90%;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  margin-left: 3%;
  box-sizing: border-box;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 1rem;
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
