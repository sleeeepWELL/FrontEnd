import React from "react";
import Cube from "../components/Cube";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";
import IntroImg from "../images/Intro.jpg";
import IntroA from "../images/Intro_A.jpg";
import IntroB from "../images/Intro_B.jpg";
import IntroC from "../images/Intro_C.jpg";
import IntroD from "../images/Intro_D.jpg";
import IntroE from "../images/Intro_E.jpg";
import IntroF from "../images/Intro_F.jpg";
import IntroG from "../images/Intro_G.jpg";

const Intro = () => {
  return (
    <React.Fragment>
      <Wrap>
        <Backgroud bg={"#DBDBDB"}>
          <BackImg src={IntroA} />
        </Backgroud>

        <BackImg src={IntroB} />
        <BackImg src={IntroC} />
        <BackImg src={IntroD} />
        <BackImg src={IntroE} />
        <BackImg src={IntroF} />
        <BackImg src={IntroG} />
        <CubeButton
          onClick={() => {
            console.log("hi");
          }}
        >
          <Cube />
          <Text>로그인하러 가기</Text>
        </CubeButton>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  display: flex;
  width: 100vw;
  height: 700vh;
  flex-direction: column;
  align-items: center;
`;

const Backgroud = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
`;

const BackImg = styled.img`
  width: 80%;
`;

const CubeButton = styled.div`
  width: 20rem;
  display: flex;
  border: 1px solid black;
  border: none;
  background-color: yellow;
`;
const Text = styled.div`
  font-weight: bold;
  z-index: 2;
  color: #121212;
  :hover {
    color: white;
  }
  margin-top: 24px;
`;

export default Intro;
