import React, { createRef } from "react";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";
import IntroA from "../images/Intro_A.png";
import IntroB from "../images/Intro_B.png";
import IntroC from "../images/Intro_C.png";
import IntroD from "../images/Intro_D.png";
import IntroE from "../images/Intro_E.png";
import IntroF from "../images/Intro_F.png";

import "../shared/Intro.scss";

import IntroHeader from "../components/IntroHeader";
import "../components/Font.css";
import { ExpandLessSharp } from "@material-ui/icons";

const Intro = () => {
  // const lazyLoad = (target) => {
  //   const io = new IntersectionObserver((e, o) => {
  //     e.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         const img = entry.target;
  //         const src = img.getAttribute("data-lazy");
  //         img.setAttribute("src", src);
  //         o.disconnect();
  //       }
  //     });
  //   });
  //   io.observe(target);
  // };

  // const parallax = (target) => {
  //   const io = new IntersectionObserver((e, o) => {
  //     e.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         const div = entry.target;
  //         const arr = div.classList;

  //         if (arr.contains("up")) {
  //           div.classList.add("showUp");
  //         } else if (arr.contains("left")) {
  //           div.classList.add("showLeft");
  //         } else if (arr.contains("in")) {
  //           div.classList.add("showIn");
  //         } else {
  //           div.classList.add("showRight");
  //         }
  //         o.disconnect();
  //       }
  //     });
  //   });
  //   io.observe(target);
  // };

  // React.useEffect(() => {
  //   const imgs = document.querySelectorAll("img");
  //   imgs.forEach(lazyLoad);

  //   const targets = document.querySelectorAll(".animate");
  //   targets.forEach(parallax);
  // });

  return (
    <>
      <Wrap>
        <IntroHeader />
        <Background bg={"#DBDBDB"}>
          <BackImg src={IntroA} />
        </Background>
        <Background bg={"white"}>
          <BackImg src={IntroB} />
        </Background>
        <Background bg={"#4A5666"}>
          <BackImg src={IntroC} />
        </Background>
        <Background bg={"#DBDBDB"}>
          <BackImg src={IntroD} />
        </Background>
        <Background bg={"#4A5666"}>
          <BackImg src={IntroE} />
        </Background>
        <Background bg={"#DBDBDB"}>
          <BackImg src={IntroF}></BackImg>
          <GoBtn
            className="TimeText"
            onClick={() => {
              history.replace("/login");
            }}
          >
            수면기록하러 가기
          </GoBtn>
        </Background>
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

const Background = styled.div`
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
  position: relative;
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

export default Intro;
