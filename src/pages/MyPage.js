import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const MyPage = () => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.user);

  const [nickname, setNickname] = React.useState(username);
  const [pwd, setPwd] = React.useState(null);
  const [pwdCheck, setPwdCheck] = React.useState(null);

  //회원탈퇴
  const deleteUser = () => {
    if (window.confirm("탈퇴 하시겠습니까?")) {
      dispatch(userActions.deleteUserSV());
    } else {
      return;
    }
  };

  //비밀번호 변경 버튼
  const changePwd = () => {
    dispatch(userActions.changePwdSV(pwd, pwdCheck));
  };

  // 닉네임 변경 버튼
  const changeNickname = () => {
    dispatch(userActions.changeUsernameSV(nickname));
  };

  return (
    <>
      <Background>
        <Wrap>
          <Container>
            <Title>정보변경</Title>
            <InputContainer>
              <InputBox
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                placeholder="변경할 닉네임 입력"
              />
              <CheckBnt onClick={changeNickname}>닉네임변경</CheckBnt>
            </InputContainer>
            <PwdContainer>
              <PwBox
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                placeholder="새 비밀번호 입력"
                type="password"
              />
              <PwBox
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
                <CheckBnt onClick={changePwd}>비밀번호변경</CheckBnt>
              </div>
            </PwdContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <CheckBnt onClick={deleteUser}>회원탈퇴</CheckBnt>
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
  margin: 0px;
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
  font-weight: 600;
`;

export default MyPage;
