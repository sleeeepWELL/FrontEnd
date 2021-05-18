import React from "react";
import styled from "styled-components";
import InfoA from "../images/fin_Info_1.png";
import InfoB from "../images/fin_Info_2.png";
import InfoC from "../images/fin_Info_3.png";
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
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #dbdbdb;
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
  width: 70%;
  z-index: 1;
`;

export default UseInfo;
