import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import Graphic from "../components/Graphic";
import Swal from "sweetalert2";
import { debounce } from "lodash";

import { emailCheck, passwordCheck } from "../shared/common";
import MFindPassword from "../mobile/MFindPassword";
import "../components/Font.css";

//회원가입
const FindPassword = () => {
  const dispatch = useDispatch();

  const emailInfo = useRef();
  const authNumInfo = useRef();
  const pwdInfo = useRef();
  const pwdCheckInfo = useRef();
  const [emailMSG, setEmailMSG] = React.useState(null);
  const [authMSG, setAuthMSG] = React.useState(null);
  const [pwdMSG, setPwdMSG] = React.useState(null);
  const [pwdCheckMSG, setPwdCheckMSG] = React.useState(null);

  const [email, setEmail] = React.useState(null);
  const [pwd, setPwd] = React.useState(null);
  const [pwdCheck, setPwdCheck] = React.useState(null);
  const [authNum, setAuthNum] = React.useState(0); //인증번호
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

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

  // 인증메일 발송
  const sendPwdAuth = (e) => {
    if (emailMSG !== "완료") {
      return;
    }
    document.getElementById(e.target.id).disabled = true;
    dispatch(userActions.sendPwdAuth(email));
  };

  // 인증번호 관련 체크
  const CheckAuth = () => {
    if (authNum === "") {
      setAuthMSG("인증번호를 입력해주세요.");
      authNumInfo.current.style.color = "red";
      authNumInfo.current.style.display = "flex";
      return;
    }

    if (document.getElementById("Pauthinput").value.length < 6) {
      setAuthMSG("인증번호를 모두 입력해주세요.");
      authNumInfo.current.style.color = "red";
      authNumInfo.current.style.display = "flex";
      return;
    }

    // 이상없으면 메세지 완료 설정
    setAuthMSG("완료");
    authNumInfo.current.style.display = "flex";
    authNumInfo.current.style.color = "green";
    return;
  };

  // 인증번호 입력
  const insertAuth = (e) => {
    setAuthNum(e.target.value);
    document.getElementById("Pauthinput").value.length > 5
      ? (document.getElementById("Pauthcheck").disabled = false)
      : (document.getElementById("Pauthcheck").disabled = true);
  };

  // 인증완료 버튼
  const confirmAuth = () => {
    // 완료 메세지 없으면 체크 통과 못한것임
    if (authMSG !== "완료") {
      return;
    }
    dispatch(userActions.ConfirmAuth(email, authNum));
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
    // 이상없으면 메세지 완료 설정
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

  //최종 완료 버튼
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

    if (
      emailMSG !== "완료" ||
      authMSG !== "완료" ||
      pwdMSG !== "완료" ||
      pwdCheckMSG !== "완료"
    ) {
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
                <div
                  style={{
                    color: "black",
                    fontSize: "30px",
                    fontWeight: "600",
                  }}
                >
                  비밀번호 찾기
                </div>
                <InputContainer>
                  <InfoTitle>이메일</InfoTitle>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <InputBox
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="가입한 이메일 입력"
                      onBlur={CheckEmail}
                    />
                    <CheckBnt id="auth" disabled="" onClick={sendPwdAuth}>
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
                      id="Pauthinput"
                      onChange={insertAuth}
                      placeholder="인증번호 입력"
                      onBlur={CheckAuth}
                    />
                    <CheckBnt id="Pauthcheck" disabled="" onClick={confirmAuth}>
                      인증 완료
                    </CheckBnt>
                  </div>
                  <InfoDiv>
                    <Info ref={authNumInfo}>{authMSG}</Info>
                  </InfoDiv>
                </InputContainer>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "2rem",
                  }}
                >
                  <InfoTitle>새로운 비밀번호 설정</InfoTitle>
                  <PwBox
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

                  <div style={{ height: "2rem" }}></div>
                  <InfoTitle>새로운 비밀번호 재입력</InfoTitle>
                  <PwBox
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

const InfoDiv = styled.div`
  display: flex;
  width: 100%;
  font-weight: 500;
  height: 12px;
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
  width: 35%;
  height: 90%;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
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
  margin: 10px 0px;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  color: gray;
  font-size: 15px;
`;

const CheckBnt = styled.button`
  word-break: keep-all;
  font-weight: 400;
  line-height: 16px;
  background-color: rgba(74, 85, 102, 1);
  border-radius: 10px;
  border: none;
  height: 3rem;
  align-items: flex-end;
  cursor: pointer;
  width: 27%;
  border: 0.5px solid lightgray;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 3px 0px;
  font-family: inherit;
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
  background-color: rgba(74, 85, 102, 1);
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
