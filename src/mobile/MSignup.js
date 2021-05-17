import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import "../components/Font.css";
import Swal from "sweetalert2";
import { passwordCheck, nicknameCheck } from "../shared/common";
import Logo from "../images/Logo.png";

//회원가입
const MSignup = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState(null);
  const [nickname, setNickname] = React.useState(null);
  const [pwd, setPwd] = React.useState(null);
  const [pwdCheck, setPwdCheck] = React.useState(null);
  const [authNum, setAuthNum] = React.useState(null);

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
              style={{ fontSize: "25px", color: "black" }}
            >
              회원가입
            </div>
            <Between />
            <InputContainer>
              <InfoTitle>이메일</InfoTitle>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <InputBox
                  className="TimeText"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Sleep@well.com"
                />
                <CheckBnt
                  className="TimeText"
                  id="userauth"
                  disabled=""
                  onClick={sendAuth}
                >
                  인증번호 발송
                </CheckBnt>
              </div>
            </InputContainer>
            <Between />
            <InputContainer>
              <InfoTitle>인증번호</InfoTitle>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <InputBox
                  className="TimeText"
                  onChange={(e) => {
                    setAuthNum(e.target.value);
                  }}
                  placeholder="인증번호 입력"
                />
                <CheckBnt className="TimeText" onClick={confirmAuth}>
                  인증 완료
                </CheckBnt>
              </div>
            </InputContainer>
            <InputContainer>
              <Between />
              <InfoTitle>닉네임</InfoTitle>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <InputBox
                  className="TimeText"
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                  placeholder="1글자 이상 9글자 이하"
                />
                <CheckBnt className="TimeText" onClick={userNameCheck}>
                  중복 확인
                </CheckBnt>
              </div>
            </InputContainer>
            <Between />
            <InfoTitle>비밀번호</InfoTitle>
            <PwBox
              className="TimeText"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              placeholder="영문/숫자/특수문자 포함 8글자 이상"
              type="password"
            />
            <Between />
            <InfoTitle>비밀번호 확인</InfoTitle>
            <PwBox
              className="TimeText"
              onChange={(e) => {
                setPwdCheck(e.target.value);
              }}
              placeholder="영문/숫자/특수문자 포함 8글자 이상"
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
        </TotalContainer>
      </Wrap>
    </React.Fragment>
  );
};

const Between = styled.div`
  display: flex;
  height: 1rem;
`;

const InfoTitle = styled.div`
  display: flex;
  font-size: 12px;
  margin-bottom: 7px;
`;

const LogoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
  align-items: flex-end;
  justify-content: center;
`;

const LogoImg = styled.img`
  display: flex;
  position: absolute;
  width: 100px;
  height: 13vh;
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
  margin: 3px 0px;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  color: gray;
  & div {
    font-size: 0.7rem;
  }
`;

const CheckBnt = styled.button`
  word-break: keep-all;
  line-height: 16px;
  background-color: rgba(74, 85, 102, 1);
  border-radius: 10px;
  border: 0.5px solid lightgray;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 3px 0px;
  align-items: flex-end;
  font-size: 0.6rem;
  cursor: pointer;
  width: 27%;
  color: white;
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
  height: 50px;
  border-radius: 10px;
  background-color: rgba(74, 85, 102, 1);
  border: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 3px 0px;
`;

export default MSignup;
