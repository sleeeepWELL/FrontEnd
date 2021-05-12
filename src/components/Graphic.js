import React from "react";
import styled from "styled-components";
import graphic from "../images/graphic.png";
import background from "../images/background.png";

const Graphic = () => {
  return (
    <>
      <Background>
        <TopContainer>
          <TitleWrap>
            <Title>DO YOU</Title>
            <Title>SLEEP WELL?</Title>
          </TitleWrap>
        </TopContainer>
        <MiddleContainer>
          <MadeByWrap>
            <MadeByInfo>develped by</MadeByInfo>
            <div style={{ width: "120%" }}></div>
            <MadeByInfo>sleepwell</MadeByInfo>
          </MadeByWrap>
        </MiddleContainer>
        <BottomContainer>
          <BottomInfoBox>
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
  width: 60vw;
  height: 100vh;
  background-repeat: no-repeat;
  z-index: 999;
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 25vh;
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
  color: white;
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
  color: white;
  font-size: 0.5rem;
  justify-content: center;
`;

const BottomInfoBox = styled.div`
  width: 50%;
  height: 50%;
  margin-left: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const BottomInfo = styled.div`
  font-size: 0.4rem;
  color: white;
  display: flex;
`;

export default Graphic;
