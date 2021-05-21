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
import Title3 from "../images/Title3.png";


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
        <Backgroud bg={"#494949"}>
          <BackImg src={IntroG} />
        </Backgroud>
      </Wrap>
    </React.Fragment>
  );
};

const GoBtn = styled.div`
  word-break: keep-all;
  width: 50%;
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
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
`;

const BackImg = styled.img`
  width: 70%;
  border: none;
  margin: 0px;
  background-color: none;
  @media (max-width: 414px) {
    width: 100%;
  }
`;


const boxFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
 `;
const PlusImg1 = styled.img`
display: flex;
position: absolute;
 width:65%;
 height: 22%;
 top:37%;
 left: 19%;
 z-index:1;
 animation: ${boxFade} 2.5s ease-in alternate;
`
export default Intro;

// const slidein = keyframes`
// 0% {
//   margin-left: 30%;
//   background-color: yellow;
// }

// 100% {
//   margin: 0%;
//   background-color: gold;
// }
// `;

// const Title3Img = styled.img`
// display: flex;
//   position: absolute;
// width: 60%;
// height: 18%;
// top:45%;
// left:20%;
// z-index:1;
//   white-space: nowrap;

//   animation:${slidein}  1s steps(30, end);
//`;
