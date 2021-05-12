import React from "react";
import ready from "../images/ready.png";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Ready = () => {
  const dispatch = useDispatch();

  const [nickname, setNickname] = React.useState(null);
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
      <Wrap>
        <MainImg src={ready}></MainImg>
        <MainInfo>
          페이지 <span style={{ color: "royalblue" }}>준비중</span> 입니다.
        </MainInfo>
        <SubInfo>
          보다 나은 서비스 제공을 위하여 페이지 준비중에 있습니다.
        </SubInfo>
        <SubInfo>빠른 시일내에 준비하여 찾아뵙겠습니다.</SubInfo>
        <div></div>
        <InputContainer>
          <InputBox
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            placeholder="변경할 닉네임 입력"
          />
          <CheckBnt onClick={changeNickname}>닉네임변경</CheckBnt>
        </InputContainer>
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
        <SignUpButton onClick={changePwd}>
          <span>비밀번호변경</span>
        </SignUpButton>
      </Wrap>
    </>
  );
};

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
  margin-top: 2rem;
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
  font-weight: 600;
`;

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const MainImg = styled.img`
  width: 120px;
`;

const MainInfo = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin: 20px;
`;

const SubInfo = styled.div`
  font-size: 13px;
  color: gray;
  margin-bottom: 5px;
`;

export default Ready;
