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
    <Modify props={props}/>
   </React.Fragment>
   )
  } else {
    return(
    <React.Fragment>
      <Write props={props}/>
    </React.Fragment>
    );
  }
};

export default DetailWrite;
