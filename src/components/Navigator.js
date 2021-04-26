import React from "react";
import styled from "styled-components";

const Navigator = () => {
  return (
    <React.Fragment>
      <Wrap>
        <Logo>sleepwell</Logo>
        <div style={{ height: "4rem" }}></div>
        <Button>내 컨디션</Button>
        <Button>분석</Button>
        <Button>로그아웃</Button>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  background-color: #c6c4c4;
  width: 10rem;
  height: 100rem;
  justify-content: center;
`;

const Button = styled.button`
  display: flex;
  border: none;
  background-color: #6c6a6a;
  width: 7rem;
  margin: auto;
  margin-top: 1rem;
  padding: 10px;
  justify-content: center;
  cursor: pointer;
  color: white;
`;

const Logo = styled.div`
  display: flex;
  font-size: 1.5rem;
  color: black;
  margin: auto;
  padding-top: 1rem;
  font-weight: bold;
  cursor: pointer;
  justify-content: center;
`;

export default Navigator;
