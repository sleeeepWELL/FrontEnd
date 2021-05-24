import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import Swal from "sweetalert2";
import { emailCheck, passwordCheck } from "../shared/common";
import "../components/Font.css";
import Logo from "../images/Logo.png";

//회원가입
const MFindPassword = () => {
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
  const [authNum, setAuthNum] = React.useState(null); //인증번호

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

    if (document.getElementById("M_Pauthinput").value.length < 6) {
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

  // 인증번호 입력
  const insertAuth = (e) => {
    setAuthNum(e.target.value);
    document.getElementById("M_Pauthinput").value.length > 5
      ? (document.getElementById("M_Pauthcheck").disabled = false)
      : (document.getElementById("M_Pauthcheck").disabled = true);
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

  return (
    <React.Fragment>
      <Wrap>
        <TotalContainer>
          <LogoContainer>
            <LogoImg src={Logo} />
          </LogoContainer>
          <SemiContainer className="TimeText">
            <div
              className="TimeText"
              style={{ color: "black", fontSize: "25px" }}
            >
              비밀번호 찾기
            </div>
            <Between />
            <Between />
            <InputContainer>
              <InfoTitle>이메일</InfoTitle>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <InputBox
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="가입한 이메일 입력"
                  onBlur={CheckEmail}
                />
                <CheckBnt
                  className="TimeText"
                  id="M_auth"
                  disabled=""
                  onClick={sendPwdAuth}
                >
                  인증메일 발송
                </CheckBnt>
              </div>
              <InfoDiv>
                <Info ref={emailInfo}>{emailMSG}</Info>
              </InfoDiv>
            </InputContainer>
            <InputContainer>
              <Between />
              <InfoTitle>인증번호</InfoTitle>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <InputBox
                  id="M_Pauthinput"
                  onChange={insertAuth}
                  placeholder="인증번호 입력"
                  onBlur={CheckAuth}
                />
                <CheckBnt
                  id="M_Pauthcheck"
                  disabled=""
                  className="TimeText"
                  onClick={confirmAuth}
                >
                  인증 완료
                </CheckBnt>
              </div>
              <InfoDiv>
                <Info ref={authNumInfo}>{authMSG}</Info>
              </InfoDiv>
            </InputContainer>
            <Between />
            <InfoTitle>새 비밀번호</InfoTitle>
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

            <Between />
            <InfoTitle>새 비밀번호 확인</InfoTitle>
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
        </TotalContainer>
      </Wrap>
    </React.Fragment>
  );
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

const Between = styled.div`
  display: flex;
  height: 0.7rem;
`;

const InfoTitle = styled.div`
  display: flex;
  margin-bottom: 8px;
  font-size: 12px;
`;

const LogoImg = styled.img`
  display: flex;
  position: absolute;
  width: 100px;
  height: 13vh;
  justify-content: center;
`;
const LogoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
  align-items: flex-end;
  justify-content: center;
`;

const TotalContainer = styled.div`
  width: 92%;
  padding: 0 8%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SemiContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  flex-direction: column;
  justify-content: flex-start;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 40px;
  align-items: center;
  background-color: white;
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
  background-color: rgba(74, 85, 102, 1);
  line-height: 15px;
  border-radius: 10px;
  align-items: flex-end;
  font-size: 0.6rem;
  cursor: pointer;
  width: 27%;
  color: white;
  border: 0.5px solid lightgray;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 3px 0px;
  :hover {
    background-color: gray;
    color: white;
  }
`;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: flex-start;
`;

const InputBox = styled.input`
  background-color: white;
  padding: 12px;
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
  padding: 12px;
  border: 0.5px solid rgba(76, 76, 76, 0.3);
  border-radius: 10px;
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
  background-color: rgba(74, 85, 102, 1);
  border: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 3px 0px;
`;

export default MFindPassword;
