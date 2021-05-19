import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { history } from "../redux/configureStore";
import moment from "moment";

const Search = (props) => {
  const dispatch = useDispatch();
  const today = moment();
  const [year, setYear] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [day, setDay] = React.useState("");

  const Swal = require("sweetalert2");

   const search=()=>{
    if (year === null||year.length!==4 || month >12 || month=== null || day>31 || day===null) {
      Swal.fire({
        title: "연도와 월과 일",
        text: "모두 예시와 같은 올바른 형식으로 입력해주세요",
        icon: "info",
      });
      return;
    }
    let myDate = new Date(`${year}-${month}-${day}`);
    dispatch(todoActions.getOnePostAX(moment(myDate).format("YYYY-MM-DD")));
    dispatch(todoActions.changeToday(moment(myDate).format("YYYY-MM-DD")));
    window.scrollTo({top:0, left:0, behavior:'smooth'});
   }

  const onSearch = (e) => {
    if (e.key == "Enter") {
      search()
    }
  };

  return (
    <React.Fragment>
      {year.length == 4 ? document.getElementById("second").focus() : null}
      {month.length == 2 ? document.getElementById("third").focus() : null}
      {year.length == 4 && month.length == 2 &&  day.length == 2 
      ? document.getElementById("ReturnBtn").focus() : null}
       {/* <div className="Search">날짜 검색하기</div>  */}
        <InputContainer>
          <InputBox
            id="first"
            onChange={(e) => {
              setYear(e.target.value);
            }}
            placeholder={moment(today).format("YYYY")}
          />

        <InputBox
          onChange={(e) => {
            setMonth(e.target.value);
          }}
          placeholder={moment(today).format("MM")}
          value={month}
          maxLength="2"
          id="second"
        />
        <InputBox
          onChange={(e) => {
            setDay(e.target.value);
          }}
          placeholder={moment(today).format("DD")}
          value={day}
          maxLength="2"
          id="third"
          onKeyPress={onSearch}
        />
        {/* className 수정해야함 */}
        <SearchBtn className="ReturnBtn" id="ReturnBtn"
          onClick={search}
        >
         검색
        </SearchBtn>
        <ReturnBtn className="ReturnBtn"
          onClick={() => {
            props._showModify(false);
            dispatch(
              todoActions.getOnePostAX(moment(today).format("YYYY-MM-DD"))
            );
            dispatch(
              todoActions.changeToday(moment(today).format("YYYY-MM-DD"))
            );
            window.scrollTo({top:0, left:0, behavior:'smooth'});
          }}
        >
         오늘
        </ReturnBtn>
        </InputContainer>
 
    </React.Fragment>
  );
};

const InputContainer = styled.div`
 display: flex;
 flex-direction:row;
 margin-top: 10px;
 width:100%;
`

const InputBox = styled.input`
  background-color: white;
  border: 0.5px solid rgba(76, 76, 76, 0.3);
  border-radius: 5px;
  outline: none;
  font-size: 3%;
  font-weight: bold;
  color: black;
  margin-right: 0.5rem;
  width: 18%;
  height: 90%;
  opacity: 0.5;
  ::placeholder {
    font-size: 13px;
  }
`;

const SearchBtn = styled.button`
  background-color:#4A5566;
  color: white;
  border-radius: 5px;
  width: 15%;
  height:4vh;
`;


const ReturnBtn = styled.button`
  background-color:#4A5566;

  color: white;
  border-radius: 5px;
  width: 15%;
  height:100%;
  margin-left:1%;
`;





export default Search;
