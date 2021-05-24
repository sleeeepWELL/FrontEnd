import React from "react";
import styled, { keyframes } from "styled-components";
import background from "../images/background_A.png";
import "./Font.css";

import Astronaut from "../image/astronaut.png";
import Star1 from "../image/star1.png";
import Star2 from "../image/star2.PNG";
import Star3 from "../image/star.png";
import Moon from "../image/moon.png";
import Planet from "../image/planet.png";
import Spaceship from "../image/spaceship.PNG";

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
          <AstroImg src={Astronaut} />
          <Star3Img src={Star3} />
          {/* <Star1Img src={Star1}/> */}
          {/* <Star2Img src={Star2}/> */}
          <MoonImg src={Moon} />
          <PlanetImg src={Planet} />
          {/* <SpaceshipImg src={Spaceship}/> */}

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
  width: 60vw;
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

const boxFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
 `;

const slidein = keyframes`
  0% {
    margin-top: 1%;
    background-color: yellow;
  }

  100% {
    margin-top: 0%;
    background-color: gold;
  }
  `;

//
const Star1Img = styled.img`
  display: flex;
  position: absolute;
  width: 5.5%;
  height: 7%;
  justify-content: center;
  animation: ${boxFade} 1.5s infinite alternate;
  top: 12.5%;
  left: 22.3%;
  z-index: 1;
`;
const Star2Img = styled.img`
  display: flex;
  position: absolute;
  width: 100px;
  height: 13vh;
  justify-content: center;
  animation: ${boxFade} 1.5s infinite alternate;
  top: 43%;
  left: 29%;
  z-index: 1;
`;

const Star3Img = styled.img`
  display: flex;
  position: absolute;
  width: 4%;
  height: 5%;
  justify-content: center;
  animation: ${boxFade} 2.5s infinite alternate;
  top: 5%;
  left: 32%;
  z-index: 1;
`;

const AstroImg = styled.img`
  display: flex;
  position: absolute;
  width: 13%;
  height: 29%;
  background-color: white;
  justify-content: center;
  animation: ${slidein} 1.3s infinite alternate;
  top: 58%;
  left: 42%;
  z-index: 1;
`;

const MoonImg = styled.img`
  display: flex;
  position: absolute;
  width: 15.5%;
  height: 22%;
  background-color: white;
  justify-content: center;
  animation: ${slidein} 2s infinite alternate;
  top: 6.9%;
  left: 5.5%;
  z-index: 1;
`;

const PlanetImg = styled.img`
  display: flex;
  position: absolute;
  width: 12%;
  height: 15.5%;
  background-color: white;
  justify-content: center;
  animation: ${slidein} 1.7s infinite alternate;
  top: 8%;
  left: 45%;
  z-index: 1;
`;

const SpaceshipImg = styled.img`
  display: flex;
  position: absolute;
  width: 8%;
  height: 12%;
  background-color: white;
  justify-content: center;
  animation: ${slidein} 2.2s infinite alternate;
  top: 30%;
  left: 42.5%;
  z-index: 1;
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
  width: 100%;
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
  word-break: keep-all;
`;

export default Graphic;
