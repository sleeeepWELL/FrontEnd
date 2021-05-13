import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { history } from "../redux/configureStore";
import moment from "moment";

const Write = (props) => {
  const dispatch = useDispatch();

  const [date, setDate] = React.useState(null);

  return (
    <React.Fragment>
      <ModalComponent>
        <InputBox
          onChange={(e) => {
            setDate(e.target.value);
          }}
          placeholder="날짜를 입력해주세요 ex) 2020-04-05"
        />
        <button
          onClick={() => {
            let myDate = new Date(date);
            dispatch(
              todoActions.getOnePostAX(moment(myDate).format("YYYY-MM-DD"))
            );
            dispatch(
              todoActions.changeToday(moment(myDate).format("YYYY-MM-DD"))
            );
          }}
        >
          검색
        </button>
      </ModalComponent>
    </React.Fragment>
  );
};

const InputBox = styled.input`
  background-color: white;
  padding: 15px;
  border: 0.5px solid rgba(76, 76, 76, 0.3);
  border-radius: 10px;
  outline: none;
  font-size: 12px;
  font-weight: bold;
  color: black;
  margin-right: 0.5rem;
  width: 90%;
  opacity: 0.5;
  ::placeholder {
    font-size: 13px;
  }
`;

const ModalComponent = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
`;

export default Write;
