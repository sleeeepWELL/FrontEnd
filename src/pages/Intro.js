import React from "react";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";
import IntroA from "../images/Intro_A.png";
import IntroB from "../images/Intro_B.png";
import IntroC from "../images/Intro_C.png";
import IntroD from "../images/Intro_D.png";
import IntroE from "../images/Intro_E.png";
import IntroF from "../images/Intro_F.png";
import IntroG from "../images/Intro_G.png";
import InA from "../images/in1.png";

import IntroHeader from "../components/IntroHeader";
import "../components/Font.css";

const Intro = () => {
  return (
    <>
      <Wrap>
        <IntroHeader />
        <Backgroud bg={"#DBDBDB"}>
          {/* <InAImg src={InA}/> */}
          <BackImg src={IntroA} />
        </Backgroud>
        <Backgroud bg={"white"}>
          <BackImg src={IntroB} />
        </Backgroud>
        <Backgroud bg={"#4A5666"}>
          <BackImg src={IntroC} />
        </Backgroud>
        <Backgroud bg={"#DBDBDB"}>
          <BackImg src={IntroD} />
        </Backgroud>
        <Backgroud bg={"#4A5666"}>
          <BackImg src={IntroE} />
        </Backgroud>
        <Backgroud bg={"#DBDBDB"}>
          <BackImg src={IntroF}></BackImg>
          <GoBtn
            className="TimeText"
            onClick={() => {
              history.replace("/login");
            }}
          >
            수면기록하러 가기
          </GoBtn>
        </Backgroud>
      </Wrap>
    </>
  );
};

const GoBtn = styled.div`
  word-break: keep-all;
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 2rem;
  cursor: pointer;
  text-decoration: underline;
  text-underline-position: under;
  color: #494949;
  font-weight: 800;
  border: none;
  :hover {
    color: white;
    transition: ease 0.3s;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    align-items: flex-start;
  }

  @media (max-width: 414px) {
    font-size: 0.5rem;
    align-items: flex-start;
    height: 1.5rem;
  }

  @media (max-width: 360px) {
    font-size: 0.8rem;
    align-items: flex-start;
    height: 1.5rem;
  }

  @media (max-width: 280px) {
    font-size: 0.7rem;
    align-items: center;
    height: 1.5rem;
  }
`;

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

const Backgroud = styled.div`
  display: flex;
  border: none;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  overflow: hidden;
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
`;

const BackImg = styled.img`
  width: 70%;
  border: none;
  margin: 5%;
  background-color: none;
  overflow: hidden;

  @media (max-width: 414px) {
    width: 100%;
    height: 100%;
  }
`;

const boxFade = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
 `;

const InAImg = styled.img`
  display: flex;
  position: absolute;
  width: 63%;
  height: 22%;
  top: 46%;
  left: 19%;
  opacity: 0%;
  z-index: 1;
  animation: ${boxFade} 3.5s;
`;
export default Intro;
