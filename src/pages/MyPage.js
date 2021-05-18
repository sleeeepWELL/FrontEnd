import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import "../components/Font.css";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { passwordCheck, nicknameCheck } from "../shared/common";

const MyPage = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.user);
  const [nickname, setNickname] = React.useState(username);
  const [pwd, setPwd] = React.useState(null);
  const [pwdCheck, setPwdCheck] = React.useState(null);

  //회원탈퇴
  const deleteUser = () => {
    Swal.fire({
      title: "정말 탈퇴 하시겠습니까?",
      text: "탈퇴시 입력하신 수면정보를 모두 잃게됩니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "네, 탈퇴할래요.",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userActions.deleteUserSV());
      }
    });
  };

  //비밀번호 변경 버튼
  const changePwd = () => {
    if (pwd !== pwdCheck) {
      Swal.fire({
        title: "비밀번호 입력오류",
        html: "비밀번호가 서로 다릅니다. 다시 입력해주세요.",
        icon: "info",
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: "확인",
      });
      return;
    }

    if (!passwordCheck(pwd)) {
      Swal.fire({
        title: "비밀번호 설정오류",
        html: "8글자 이상, 영문+숫자+특수문자로 구성해야합니다.",
        icon: "info",
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: "확인",
      });
      return;
    }
    dispatch(userActions.changePwdSV(pwd, pwdCheck));
  };

  // 닉네임 변경 버튼
  const changeNickname = () => {
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
    dispatch(userActions.changeUsernameSV(nickname));
  };

  return (
    <>
      <Background>
        <Wrap>
          <TotalContainer>
            <Title className="TimeText">정보변경</Title>
            <Container>
              <InfoText>닉네임 변경</InfoText>
              <InputContainer>
                <SemiContainer>
                  <InputBox
                    className="TimeText"
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                    placeholder="변경할 닉네임 입력"
                  />
                </SemiContainer>
                <CheckBnt onClick={changeNickname} className="TimeText">
                  변경
                </CheckBnt>
              </InputContainer>
            </Container>
            <Container>
              <InfoText>비밀번호 변경</InfoText>
              <PwdContainer>
                <SemiContainer>
                  <InputBox
                    className="TimeText"
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                    placeholder="새 비밀번호 입력"
                    type="password"
                  />
                  <div style={{ height: "0.8rem" }} />
                  <InputBox
                    className="TimeText"
                    onChange={(e) => {
                      setPwdCheck(e.target.value);
                    }}
                    placeholder="새 비밀번호 다시 입력"
                    type="password"
                  />
                </SemiContainer>
                <div
                  style={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div></div>
                  <CheckBnt2 onClick={changePwd} className="TimeText">
                    변경
                  </CheckBnt2>
                </div>
              </PwdContainer>
            </Container>
            <Container>
              <WithdrawBtn onClick={deleteUser} className="TimeText2">
                회원탈퇴
              </WithdrawBtn>
            </Container>
          </TotalContainer>
        </Wrap>
      </Background>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 0.7rem 0px;
`;

const SemiContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const InfoText = styled.div`
  display: flex;
  font-size: 0.6rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Title = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  margin: 0px 0px 0.4rem 0px;
  font-size: 1.5rem;
  font-weight: 600;
`;
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(219, 219, 219, 1);
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 40%;
  height: 75%;
  background-color: none;
  border-radius: 20px;

  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 320px) {
    width: 70%;
  }
`;

const CheckBnt = styled.button`
  color: rgba(238, 238, 238, 1);
  background-color: rgba(56, 56, 56, 1);
  border-radius: 10px;
  border: none;
  height: 3rem;
  font-size: 13px;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 25%) 0px 3px 2px 1px;
  width: 20%;
  :hover {
    background-color: gray;
    color: white;
    transition: ease 0.5s;
  }
`;

const CheckBnt2 = styled.button`
  color: rgba(238, 238, 238, 1);
  background-color: rgba(56, 56, 56, 1);
  box-shadow: rgb(0 0 0 / 25%) 0px 3px 2px 1px;
  border-radius: 10px;
  border: none;
  height: 3rem;
  font-size: 13px;
  cursor: pointer;
  width: 100%;
  :hover {
    background-color: gray;
    color: white;
    transition: ease 0.5s;
  }
`;

const WithdrawBtn = styled.button`
  background-color: rgb(210 210 210);
  border: none;
  height: 1rem;
  color: #909090;
  border-radius: 5px;
  font-size: 0.6rem;
  :hover {
    background-color: gray;
    color: white;
    transition: ease 0.5s;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const InputBox = styled.input`
  display: flex;
  justify-content: center;
  background-color: white;
  padding: 15px;
  border: 0.5px solid rgba(76, 76, 76, 0.3);
  border-radius: 10px;
  outline: none;
  font-size: 15px;
  font-weight: bold;
  color: black;
  margin-right: 0.5rem;
  opacity: 0.7;
  ::placeholder {
    font-size: 13px;
  }
`;

const PwdContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  font-weight: 600;
`;

export default MyPage;
