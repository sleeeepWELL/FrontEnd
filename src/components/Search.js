import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import moment from "moment";

const Search = (props) => {
  const dispatch = useDispatch();
  const today = moment();
  const [year, setYear] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [day, setDay] = React.useState("");

  const Swal = require("sweetalert2");

  const search = () => {
    if (
      year === null ||
      month === null ||
      day === null ||
      year.length !== 4 ||
      month.length !== 2 ||
      day.length !== 2 ||
      month > 12 ||
      month < 1 ||
      day > 31 ||
      day < 1 ||
      year % 1 !== 0 ||
      month % 1 !== 0 ||
      day % 1 !== 0
    ) {
      Swal.fire({
        title: "다시 입력해주세요",
        text: "모두 예시와 같은 올바른 형식으로 입력해주세요",
        icon: "info",
      });
      return;
    }
    let myDate = new Date(`${year}-${month}-${day}`);
    dispatch(todoActions.getOnePostAX(moment(myDate).format("YYYY-MM-DD")));
    dispatch(todoActions.changeToday(moment(myDate).format("YYYY-MM-DD")));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const onSearch = (e) => {
    if (e.key == "Enter") {
      search();
    }
  };

  return (
    <React.Fragment>
      {year.length == 4 && month.length == 0
        ? document.getElementById("second").focus()
        : null}
      {month.length == 2 && day.length == 0
        ? document.getElementById("third").focus()
        : null}
      {day.length == 2 ? document.getElementById("third").blur() : null}

      <InputContainer>
        <InputBox
          id="first"
          type="number"
          pattern="\d*"
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
          type="number"
          pattern="\d*"
          maxLength="2"
          id="second"
        />
        <InputBox
          onChange={(e) => {
            setDay(e.target.value);
          }}
          placeholder={moment(today).format("DD")}
          value={day}
          type="number"
          pattern="\d*"
          maxLength="2"
          id="third"
          onKeyPress={onSearch}
        />
        <SearchBtn
          className="ReturnBtn"
          id="ReturnBtn"
          onClick={() => {
            search();
          }}
        >
          검색
        </SearchBtn>
        <ReturnBtn
          className="ReturnBtn"
          onClick={() => {
            props._showModify(false);
            dispatch(
              todoActions.getOnePostAX(moment(today).format("YYYY-MM-DD"))
            );
            dispatch(
              todoActions.changeToday(moment(today).format("YYYY-MM-DD"))
            );
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const InputBox = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 0.5px solid rgba(76, 76, 76, 0.3);
  border-radius: 5px;
  outline: none;
  font-size: 13px;
  font-weight: bold;
  color: black;
  margin-right: 1%;
  width: 17%;
  height: 4vh;
  opacity: 0.5;

  ::placeholder {
    font-size: 13px;
  }
  @media (max-width: 280px) {
    margin-right: 0.2rem;
    width: 15%;
  }
`;

const SearchBtn = styled.button`
  display: flex;
  background-color: #4a5566;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 5px;
  width: 15.5%;
  height: 4vh;
  font-size: 70%;
  @media (max-width: 320px) {
    font-size: 0.7rem;
  }
`;

const ReturnBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4a5566;
  color: white;
  border-radius: 5px;
  width: 15.5%;
  height: 4vh;
  margin-left: 1%;
  font-size: 70%;
  @media (max-width: 320px) {
    font-size: 0.7rem;
  }
`;

export default Search;
