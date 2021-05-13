import React from "react";
import ready from "../images/ready.png";
import styled from "styled-components";

const Ready = () => {
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
