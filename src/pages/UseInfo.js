import React from "react";
import styled, { keyframes } from "styled-components";
import InfoA from "../images/UseInfo_A.png";
import InfoB from "../images/UseInfo_B.png";
import InfoC from "../images/UseInfo_C.png";
import "../components/Font.css";

const UseInfo = () => {

  window.scrollTo(0,0);

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
position:sticky;
  display: flex;
  width: 100vw;
  height:100vh;
  flex-direction: column;
  align-items: center;
  background-color: #f6f6f6;
  // animation: ${FadeIn} 2s;
  @media (max-width: 600px) {
   
    height:80vh;
  }
 
`;

const Backgroud = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height:auto;
  @media (max-width: 500px) {
   
    height:70vh;
  }
  
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
 
`;

const BackImg = styled.img`
  width: 70%;
  
  z-index: 1;
  @media (max-width: 500px) {
    width:90%;
    height:90%;
  }
`;

export default UseInfo;
