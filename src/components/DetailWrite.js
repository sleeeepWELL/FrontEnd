import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { history } from "../redux/configureStore";

import TextField from "@material-ui/core/TextField";
import Write from "../components/Write";
import Modify from "../components/Modify";

const DetailWrite = (props) => {
  
  if (props.date.selectedAt !== undefined) {
   return (
   <React.Fragment>
     <Container>
    <Modify props={props}/>
    </Container>
   </React.Fragment>)
  }else{
    return(
    <React.Fragment>
       <Container>
      <Write props={props}/>
      </Container>
    </React.Fragment>);
  }
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid red;
`;
export default DetailWrite;
