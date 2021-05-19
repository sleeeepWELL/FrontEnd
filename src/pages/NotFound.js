import React from "react";
import styled from "styled-components";
import notfound from "../images/notfound.png";
import { history } from "../redux/configureStore";
import "../components/Font.css";

const NotFound = () => {
  return (
    <>
      <Wrap>
        <Container>
          <MainImg src={notfound} />
          <MainInfo className="TimeText">페이지를 찾을 수 없습니다.</MainInfo>
          <SubInfo className="Text">
            주소가 잘못 입력되었거나, 변경 혹은 삭제되어
          </SubInfo>
          <SubInfo className="Text">
            요청하신 페이지를 찾을 수 없습니다.
          </SubInfo>
          <SubInfo className="Text">
            입력하신 주소가 정확한지 다시 한번 확인해 주세요.
          </SubInfo>
          <MainBtn
            className="TimeText"
            onClick={() => {
              history.replace("/");
            }}
          >
            메인으로 이동
          </MainBtn>
        </Container>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  position: fixed;
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
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
