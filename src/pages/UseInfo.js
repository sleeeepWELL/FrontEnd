import React from "react";
import styled from "styled-components";
import InfoA from "../images/UseInfo_A.png";
import InfoB from "../images/UseInfo_B.png";
import InfoC from "../images/UseInfo_C.png";
import "../components/Font.css";

const UseInfo = () => {
  return (
    <React.Fragment>
      <Wrap>
        <Backgroud bg={"#F6F6F6"}>
          <BackImg src={InfoA} />
        </Backgroud>
        <Backgroud bg={"#F6F6F6"}>
          <BackImg src={InfoB} />
        </Backgroud>
        <Backgroud bg={"#F6F6F6"}>
          <BackImg src={InfoC} />
        </Backgroud>
      </Wrap>
    </React.Fragment>
  );
};

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
