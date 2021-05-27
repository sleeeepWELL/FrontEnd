import React from "react";
import styled, { keyframes } from "styled-components";
import InfoA from "../images/UseInfo_A.png";
import InfoB from "../images/UseInfo_B.png";
import InfoC from "../images/UseInfo_C.png";
import "../components/Font.css";

const UseInfo = () => {

  window.scrollTo(0,0);


  const isElementUnderBottom = (elem, triggerDiff)=> {
    const { top } = elem.getBoundingClientRect();
    const { innerHeight } = window;
    return top > innerHeight + (triggerDiff || 0);
  }
  
  const handleScrollR=()=> {
    const elems = document.querySelectorAll('.right');
    elems.forEach(elem => {
      if (isElementUnderBottom(elem, 20)) {
        elem.style.opacity = "0";
        elem.style.transform = 'translateX(40vh)';
      } else {
        elem.style.opacity = "1";
        elem.style.transform = 'translateX(0px)';
      }
    })
  }

  const handleScrollL=()=> {
    const elems = document.querySelectorAll('.left');
    elems.forEach(elem => {
      if (isElementUnderBottom(elem, -20)) {
        elem.style.opacity = "0";
        elem.style.transform = 'translateX(-40vh)';
      } else {
        elem.style.opacity = "1";
        elem.style.transform = 'translateX(0px)';
      }
    })
  }
  

  window.addEventListener('scroll', handleScrollR);
  window.addEventListener('scroll', handleScrollL);


  return (
    <React.Fragment>
      <Wrap>
        <Backgroud  bg={"#F6F6F6"}>
          <BackImg src={InfoA} />
        </Backgroud>
        <Backgroud className="right"  bg={"#F6F6F6"}>
          <BackImg src={InfoB} />
        </Backgroud>
        <Backgroud  className="left" bg={"#F6F6F6"}>
          <BackImg src={InfoC} />
        </Backgroud>
      </Wrap>
    </React.Fragment>
  );
};

const FadeIn = keyframes`
from {
  opacity:0
}
to {
  opacity: 1;
}
`;

const Wrap = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: #f6f6f6;
`;

const Backgroud = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height:100vh;
  transition: transform 7s, opacity 3s;
  // animation: ${FadeIn} 2s;
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
`;

const BackImg = styled.img`
  width: 50%;
  z-index: 1;
  @media (max-width: 414px) {
    width: 100%;
  }
`;

export default UseInfo;
