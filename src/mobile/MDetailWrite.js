import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { history } from "../redux/configureStore";

import TextField from "@material-ui/core/TextField";
import MWrite from "../mobile/MWrite";
import MModify from "../mobile/MModify";

const MDetailWrite = (props) => {
  
  if (props.date.selectedAt !== undefined) {
   return (
   <React.Fragment>

    <MModify props={props}/>

   </React.Fragment>)
  }else{
    return(
    <React.Fragment>

      <MWrite props={props}/>

    </React.Fragment>);
  }
};


export default MDetailWrite;
