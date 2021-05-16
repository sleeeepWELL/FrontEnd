import React from "react";
import Cube from "../components/Cube";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";

const Intro = () => {
  
  return (
    <React.Fragment>
     
          
              <CubeButton onClick={
                  ()=>{
                      console.log("hi")
                }}>
            <Cube />
            <Text>로그인하러 가기</Text>
          </CubeButton>
         
      
    </React.Fragment>
  );
};



const CubeButton = styled.div`
  width: 20%;
  display: flex;
  border: 1px solid black;
  border: none;
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

