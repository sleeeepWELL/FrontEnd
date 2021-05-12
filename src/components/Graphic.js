import React from "react";
import styled from "styled-components";
import graphic from "../images/graphic.png";
import background from "../images/background.png";

const Graphic = () => {
  return (
    <>
      <Background></Background>
    </>
  );
};

const Background = styled.div`
  display: grid;
  background: url(${background});
  background-size: contain;
  width: 60%;
  height: 100vh;
  background-repeat: no-repeat;
`;

const Wrap = styled.div``;

export default Graphic;
