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

  React.useEffect(() => {}, []);

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
          <Container>
            <Title className="TimeText">정보변경</Title>
            <InputContainer>
              <InputBox
                className="TimeText"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                placeholder="변경할 닉네임 입력"
              />
              <CheckBnt onClick={changeNickname} className="TimeText">
                닉네임변경
              </CheckBnt>
            </InputContainer>
            <PwdContainer>
              <PwBox
                className="TimeText"
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                placeholder="새 비밀번호 입력"
                type="password"
              />
              <PwBox
                className="TimeText"
                onChange={(e) => {
                  setPwdCheck(e.target.value);
                }}
                placeholder="새 비밀번호 다시입력"
                type="password"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <CheckBnt onClick={changePwd} className="TimeText">
                  비밀번호변경
                </CheckBnt>
              </div>
            </PwdContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <CheckBnt onClick={deleteUser} className="TimeText2">
                회원탈퇴
              </CheckBnt>
            </div>
          </Container>
        </Wrap>
      </Background>
    </>
  );
};

const Title = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  margin: 10px 0px 0px 0px;
  font-size: 20px;
  font-weight: 600;
`;
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 60%;
  background-color: white;
  border-radius: 20px;
  padding: 2rem;
`;

const CheckBnt = styled.button`
  background-color: rgba(238, 238, 238, 1);
  border-radius: 10px;
  border: none;
  height: 3rem;
  align-items: flex-end;
  font-size: 0.7rem;
  cursor: pointer;
  width: 27%;
  :hover {
    background-color: gray;
    color: white;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 2rem 0px;
  border-bottom: 0.5px solid rgba(76, 76, 76, 0.3);
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
  width: 70%;
  opacity: 0.7;
  ::placeholder {
    font-size: 13px;
  }
`;

const PwdContainer = styled.div`
  display: flex;
  padding-bottom: 2rem;
  border-bottom: 0.5px solid rgba(76, 76, 76, 0.3);
  flex-direction: column;
`;

const PwBox = styled.input`
  /* background-color: white; */
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
  font-weight: 600;
`;

export default MyPage;
