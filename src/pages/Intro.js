import React from "react";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";
import IntroA from "../images/Intro_A.jpg";
import IntroB from "../images/Intro_B.jpg";
import IntroC from "../images/Intro_C.jpg";
import IntroD from "../images/Intro_D.jpg";
import IntroEE from "../images/Intro_EE.jpg";
import IntroG from "../images/Intro_G.jpg";
import IntroH from "../images/Intro_H.jpg";
import IntroHeader from "../components/IntroHeader";
import "../components/Font.css";

const Intro = () => {
  return (
    <React.Fragment>
      <Wrap>
        <IntroHeader />
        <Backgroud bg={"#DBDBDB"}>
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
          <BackImg src={IntroEE} />
        </Backgroud>
        <Backgroud bg={"#DBDBDB"}>
          <BackImg src={IntroG}></BackImg>
          <GoBtn
            className="TimeText"
            onClick={() => {
              history.replace("/login");
            }}
          >
            수면기록하러 가기
          </GoBtn>
        </Backgroud>
        <Backgroud bg={"#494949"}>
          <BackImg src={IntroH} />
        </Backgroud>
      </Wrap>
    </React.Fragment>
  );
};

const GoBtn = styled.div`
  width: 50%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 2rem;
  /* background-color: green; */
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
    font-size: 0.9rem;
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
  width: 100vw;
  height: 100vh;
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
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
`;

const BackImg = styled.img`
  width: 70%;
  border: none;
  margin: 0px;
  background-color: none;
  z-index: 1;

  @media (max-width: 414px) {
    width: 100%;
  }
`;

export default Intro;
