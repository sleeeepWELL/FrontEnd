import React from "react";
import styled from "styled-components";
import notfound from "../images/notfound.png";
import { history } from "../redux/configureStore";

const NotFound = () => {
  return (
    <>
      <Wrap>
        <MainImg src={notfound} />
        <MainInfo>페이지를 찾을 수 없습니다.</MainInfo>
        <SubInfo>주소가 잘못 입력되었거나, 변경 혹은 삭제되어</SubInfo>
        <SubInfo>요청하신 페이지를 찾을 수 없습니다.</SubInfo>
        <SubInfo>입력하신 주소가 정확한지 다시 한번 확인해 주세요.</SubInfo>
        <MainBtn
          onClick={() => {
            history.replace("/main");
          }}
        >
          메인으로 이동
        </MainBtn>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const MainImg = styled.img`
  width: 250px;
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

const MainBtn = styled.div`
  display: flex;
  margin: 1rem;
  width: 8rem;
  height: 2.5rem;
  border: 1px solid royalblue;
  border-radius: 10px;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-weight: 600;
  color: royalblue;
  cursor: pointer;
  :hover {
    background-color: royalblue;
    color: white;
  }
`;

export default NotFound;
