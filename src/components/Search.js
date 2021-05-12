import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { history } from "../redux/configureStore";


const Write = (props) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <ModalComponent>
       
      

  
          

      </ModalComponent>
    </React.Fragment>
  );
};

const Container = styled.div`
  background-color: grey;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;




const ModalComponent = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
`;

export default Write;
