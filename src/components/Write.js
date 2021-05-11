import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { history } from "../redux/configureStore";

import TextField from "@material-ui/core/TextField";
import MobileTimePicker from "@material-ui/lab/MobileTimePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import moment from "moment";

//태그
import beer from "../image/beer.png";
import snack from "../image/snack.png";
import work from "../image/work.png";
import workout from "../image/workout.png";

import beer_gray from "../image/beer_gray.png";
import snack_gray from "../image/snack_gray.png";
import work_gray from "../image/work_gray.png";
import workout_gray from "../image/workout_gray.png";

//컨디션
import one from "../image/1-condition.png";
import two from "../image/2-condition.png";
import three from "../image/3-condition.png";
import four from "../image/4-condition.png";
import five from "../image/5-condition.png";

import one_gray from "../image/1-gray.jpg";
import two_gray from "../image/2-gray.jpg";
import three_gray from "../image/3-gray.jpg";
import four_gray from "../image/4-gray.jpg";
import five_gray from "../image/5-gray.png";

const Write = (props) => {
  const dispatch = useDispatch();

  const [memo, setMemo] = React.useState("");

  const [start, setStart] = React.useState(new Date("2021-01-01T23:00"));
  const startSleep = moment(start).format("hh:mm");
  // console.log(startSleep);
  const [end, setEnd] = React.useState(new Date("2021-01-01T09:00"));
  const endSleep = moment(end).format("hh:mm");
  // console.log(endSleep);

  const startMinute =
    parseInt(startSleep.slice(0, 2) * 60) + parseInt(startSleep.slice(3, 5));
  const endMinute =
    parseInt(endSleep.slice(0, 2) * 60) + parseInt(endSleep.slice(3, 5));

  //초기값
  let totalSleepHour = 1;
  let totalSleepMinute = 2;

  if (endMinute - startMinute >= 0) {
    totalSleepHour = Math.floor((endMinute - startMinute) / 60);
    totalSleepMinute = (endMinute - startMinute) % 60;
  } else {
    totalSleepHour = Math.floor((endMinute - startMinute + 24 * 60) / 60);
    totalSleepMinute = (endMinute - startMinute + 24 * 60) % 60;
  }

  //태그
  const TotalTags = [];

  const [tags1, setTags1] = React.useState("");
  const [tags2, setTags2] = React.useState("");
  const [tags3, setTags3] = React.useState("");
  const [tags4, setTags4] = React.useState("");

  const [checkbeer, setCheckBeer] = React.useState(false);
  const [checksnack, setCheckSnack] = React.useState(false);
  const [checkwork, setCheckWork] = React.useState(false);
  const [checkworkout, setCheckWorkOut] = React.useState(false);

  const beer_icon = checkbeer ? beer : beer_gray;
  const snack_icon = checksnack ? snack : snack_gray;
  const work_icon = checkwork ? work : work_gray;
  const workout_icon = checkworkout ? workout : workout_gray;

  if (tags1) {
    TotalTags.push(tags1);
  }
  if (tags2) {
    TotalTags.push(tags2);
  }
  if (tags3) {
    TotalTags.push(tags3);
  }
  if (tags4) {
    TotalTags.push(tags4);
  }

  //컨디션
  const [checkone, setCheckOne] = React.useState(false);
  const [checktwo, setCheckTwo] = React.useState(false);
  const [checkthree, setCheckThree] = React.useState(false);
  const [checkfour, setCheckFour] = React.useState(false);
  const [checkfive, setCheckFive] = React.useState(false);

  const one_icon = checkone ? one : one_gray;
  const two_icon = checktwo ? two : two_gray;
  const three_icon = checkthree ? three : three_gray;
  const four_icon = checkfour ? four : four_gray;
  const five_icon = checkfive ? five : five_gray;

  //컨디션 배열에 넣고 빼기
  const [con1, setCon1] = React.useState("");
  const [con2, setCon2] = React.useState("");
  const [con3, setCon3] = React.useState("");
  const [con4, setCon4] = React.useState("");
  const [con5, setCon5] = React.useState("");

  const TotalCon = [];
  if (con1) {
    TotalCon.push(con1);
  }
  if (con2) {
    TotalCon.push(con2);
  }
  if (con3) {
    TotalCon.push(con3);
  }
  if (con4) {
    TotalCon.push(con4);
  }
  if (con5) {
    TotalCon.push(con5);
  }

  const mycondition = Number(String(TotalCon));
  console.log("추가할 컨디션:", mycondition);

  const changeMemo = (e) => {
    setMemo(e.target.value);
  };

  //추가하는 경우는 데이터를 잘라서 사용해야하고
  const addPost = () => {
    let post = {
      startSleep: startSleep,
      endSleep: endSleep,
      totalSleepHour: totalSleepHour,
      totalSleepMinute: totalSleepMinute,
      selectedAt: props.props.date.slice(14, 24),
      tag: TotalTags,
      conditions: mycondition,
      memo: memo,
    };

    dispatch(todoActions.addPostAX(post));
    // dispatch(todoActions.getOnePostAX(props.date.slice(14,24)));
  };

  return (
    <React.Fragment>
      <ModalComponent>
        <TopContainer>
          <Text>{props.props.date.slice(14, 24)}</Text>

          <AddButton
            onClick={() => {
              if (startSleep === "" || endSleep === "" || mycondition === 0) {
                window.alert(
                  "정확한 수면분석을 위해 취침시간, 기상시간, 컨디션을 모두 입력해주세요!"
                );
                return;
              } else {
                addPost();
                props.props._showModify(false);
              }
            }}
          >
            Complete
          </AddButton>
        </TopContainer>

        <TimeContainer>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{ width: 150, color: "white" }}>
              <MobileTimePicker
                label="취침 시간 선택"
                value={start}
                onChange={(newStart) => {
                  setStart(newStart);
                }}
                renderInput={(params) => (
                  <TextField {...params} margin="normal" />
                )}
              />
            </div>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{ width: 150 }}>
              <MobileTimePicker
                label="기상 시간 선택"
                value={end}
                onChange={(newEnd) => {
                  setEnd(newEnd);
                }}
                renderInput={(params) => (
                  <TextField {...params} margin="normal" />
                )}
              />
            </div>
          </LocalizationProvider>
        </TimeContainer>

        <TagContainer>
          <TotalImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={beer_icon}
                alt="beer"
                value={"음주"}
                onClick={(e) => {
                  checkbeer ? setTags1(null) : setTags1(e.target.value);
                  checkbeer ? setCheckBeer(false) : setCheckBeer(true);
                }}
              />
            </ImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={snack_icon}
                alt="snack"
                value={"야식"}
                onClick={(e) => {
                  checksnack ? setTags2(null) : setTags2(e.target.value);
                  checksnack ? setCheckSnack(false) : setCheckSnack(true);
                }}
              />
            </ImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={work_icon}
                alt="work"
                value={"야근"}
                onClick={(e) => {
                  checkwork ? setTags3(null) : setTags3(e.target.value);
                  checkwork ? setCheckWork(false) : setCheckWork(true);
                }}
              />
            </ImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={workout_icon}
                alt="workout"
                value={"운동"}
                onClick={(e) => {
                  checkworkout ? setTags4(null) : setTags4(e.target.value);
                  checkworkout ? setCheckWorkOut(false) : setCheckWorkOut(true);
                }}
              />
            </ImgGrid>
          </TotalImgGrid>
        </TagContainer>

        <ConditionContainer>
          <TotalImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={one_icon}
                alt="매우나쁨"
                value={1}
                onClick={(e) => {
                  checkone ? setCon1(null) : setCon1(e.target.value);
                  checkone ? setCheckOne(false) : setCheckOne(true);
                }}
              />
            </ImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={two_icon}
                alt="나쁨"
                value={2}
                onClick={(e) => {
                  checktwo ? setCon2(null) : setCon2(e.target.value);
                  checktwo ? setCheckTwo(false) : setCheckTwo(true);
                }}
              />
            </ImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={three_icon}
                alt="보통"
                value={3}
                onClick={(e) => {
                  checkthree ? setCon3(null) : setCon3(e.target.value);
                  checkthree ? setCheckThree(false) : setCheckThree(true);
                }}
              />
            </ImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={four_icon}
                alt="좋음"
                value={4}
                onClick={(e) => {
                  checkfour ? setCon4(null) : setCon4(e.target.value);
                  checkfour ? setCheckFour(false) : setCheckFour(true);
                }}
              />
            </ImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={five_icon}
                alt="매우 좋음"
                value={5}
                onClick={(e) => {
                  checkfive ? setCon5(null) : setCon5(e.target.value);
                  checkfive ? setCheckFive(false) : setCheckFive(true);
                }}
              />
            </ImgGrid>
          </TotalImgGrid>
        </ConditionContainer>

        <BottomContainer>
          <textarea
            rows="7"
            cols="60"
            placeholder="메모를 입력하세요"
            onChange={changeMemo}
          ></textarea>
        </BottomContainer>
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

const TimeContainer = styled.div`
  background-color: white;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin: 5px 0px 0px 5px;
`;

const AddButton = styled.button`
  width: 30%;
  height: 100%;
  background-color: black;
  border: 2px solid white;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  margin: 9px 9px 0px 0px;
  font-size: 3px;
`;
const ImgGrid = styled.div`
  display: flex;

  /* background-color: blue; */
  padding: 10px;
`;

const TotalImgGrid = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin: 20px;
  justify-content: space-evenly;
  background-color: white;
`;

const TopContainer = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 20%;
  margin: 20px 0px 20px 0px;
`;

const TagContainer = styled.div`
  background-color: grey;
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  justify-content: space-between;
`;
const ConditionContainer = styled.div`
  background-color: grey;
  width: 100%;
  height: 30%;
  display: flex;
`;

const BottomContainer = styled.div`
  background-color: grey;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const ModalComponent = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
`;

export default Write;
