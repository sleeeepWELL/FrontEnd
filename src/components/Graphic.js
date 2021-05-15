import React from "react";
import styled from "styled-components";
import background from "../images/background_B.png";
import "./Font.css";

const Graphic = () => {
  return (
    <>
      <Background>
        <TopContainer>
          {/* <TitleWrap className="TimeText">
            <Title>DO YOU</Title>
            <Title>SLEEP WELL?</Title>
          </TitleWrap> */}
        </TopContainer>
        <MiddleContainer>
          {/* <MadeByWrap>
            <MadeByInfo className="TimeText2">develped by</MadeByInfo>
            <div style={{ width: "250%" }}></div>
            <MadeByInfo className="TimeText2">sleepwell</MadeByInfo>
          </MadeByWrap> */}
        </MiddleContainer>
        <BottomContainer>
          <BottomInfoBox className="BottomInfo">
            <BottomInfo>
              sleepwell은 수면 시간을 기록하여 정확한 분석을 바탕으로 가장
              최적의 수면시간을 제안하는 웹사이트 입니다.
            </BottomInfo>
            <div style={{ height: "8px" }}></div>
            <BottomInfo>
              sleepwell을 통해 높은 수면의 질을 경험하세요.
            </BottomInfo>
          </BottomInfoBox>
        </BottomContainer>
      </Background>
    </>
  );
};

const Background = styled.div`
  display: grid;
  flex-direction: column;
  background: url(${background});
  background-size: 100% 100%;
  width: 45vw;
  height: 100vh;
  background-repeat: no-repeat;
  z-index: 999;
  border: none;
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 25vh;
  border: none;
`;

const MiddleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 55vh;
  align-items: center;
`;

const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  height: 20vh;
  align-items: flex-end;
`;

const Title = styled.div`
  display: flex;
  width: auto;
  height: auto;
  color: black;
  font-size: 2.5rem;
  border: none;
  margin: 0px;
  box-sizing: border-box;
  text-decoration: underline 1.6px;
  text-underline-position: under;
  font-weight: 350;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.8rem;
  margin-left: 1rem;
`;

const MadeByWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 2rem;
`;

const MadeByInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  color: black;
  font-size: 0.5rem;
  justify-content: center;
`;

const BottomInfoBox = styled.div`
  width: 80%;
  height: 50%;
  margin-left: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const BottomInfo = styled.div`
  font-size: 0.4rem;
  color: black;
  display: flex;
`;

export default Graphic;
