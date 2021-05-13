import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { history } from "../redux/configureStore";
import "./Font.css";

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

import one_gray from "../image/1-gray.png";
import two_gray from "../image/2-gray.png";
import three_gray from "../image/3-gray.png";
import four_gray from "../image/4-gray.png";
import five_gray from "../image/5-gray.png";

const Modify = (props) => {
  const dispatch = useDispatch();

  const post_list = useSelector((state) => state.todo.day_list);

  const _post = props.props.date.selectedAt ? post_list : null;

  //받아온 취침시간
  const getStart = _post.startSleep;
  // console.log("받아온 취침시간:::", getStart);
  const myStart = "2021-05-12T" + getStart;

  //받아온 기상시간
  const getEnd = _post.endSleep;
  // console.log("받아온 기상시간:::", getEnd);
  const myEnd = "2021-05-12T" + getEnd;

  const [memo, setMemo] = React.useState(_post ? _post.memo : "");

  const [start, setStart] = React.useState(_post ? myStart : "");
  const startSleep = moment(start).format("HH:mm");

  const [end, setEnd] = React.useState(_post ? myEnd : "");
  const endSleep = moment(end).format("HH:mm");

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

  const icon_beer = checkbeer ? beer_gray : beer;
  const icon_snack = checksnack ? snack_gray : snack;
  const icon_work = checkwork ? work_gray : work;
  const icon_workout = checkworkout ? workout_gray : workout;

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

  // 수정하기 태그 가져오기
  const bringTags = props.props.date.tag;

  const [editTags, setEditTags] = React.useState(bringTags);

  React.useEffect(() => {
    if (editCon == 1) {
      setEditCon(null);
      setCheckOne(true);
    } else if (editCon == 2) {
      setEditCon(null);
      setCheckTwo(true);
    } else if (editCon == 3) {
      setEditCon(null);
      setCheckThree(true);
    } else if (editCon == 4) {
      setEditCon(null);
      setCheckFour(true);
    } else if (editCon == 5) {
      setEditCon(null);
      setCheckFive(true);
    }
  }, []);

  const sendTags = TotalTags.concat(editTags);
  // console.log("받아온배열:", editTags);
  // console.log("수정한배열:", TotalTags);
  // console.log("최종 보낼배열:", sendTags);

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

  const TotalCon = [];
  if (checkone) {
    TotalCon.push(1);
  }
  if (checktwo) {
    TotalCon.push(2);
  }
  if (checkthree) {
    TotalCon.push(3);
  }
  if (checkfour) {
    TotalCon.push(4);
  }
  if (checkfive) {
    TotalCon.push(5);
  }

  const mycondition = String(TotalCon);

  //컨디션 수정
  const bringConditions = String(props.props.date.conditions);

  const [editCon, setEditCon] = React.useState(bringConditions);
  console.log("받아온 컨디션:", editCon);
  console.log("수정된 컨디션:", mycondition);

  const sendCon = Number(TotalCon.concat(editCon)[0]);
  console.log("보낼 컨디션:", sendCon);

  const getClick = (e) => {
    console.log(e.target.value); // 1,2,3,4,5 로 넘어옴
    if (e.target.value == 1) {
      setCheckOne(true);
      setCheckTwo(false);
      setCheckThree(false);
      setCheckFour(false);
      setCheckFive(false);
    } else if (e.target.value == 2) {
      setCheckOne(false);
      setCheckTwo(true);
      setCheckThree(false);
      setCheckFour(false);
      setCheckFive(false);
    } else if (e.target.value == 3) {
      setCheckOne(false);
      setCheckTwo(false);
      setCheckThree(true);
      setCheckFour(false);
      setCheckFive(false);
    } else if (e.target.value == 4) {
      setCheckOne(false);
      setCheckTwo(false);
      setCheckThree(false);
      setCheckFour(true);
      setCheckFive(false);
    } else if (e.target.value == 5) {
      setCheckOne(false);
      setCheckTwo(false);
      setCheckThree(false);
      setCheckFour(false);
      setCheckFive(true);
    }
  };

  //메모
  const changeMemo = (e) => {
    setMemo(e.target.value);
  };

  // 수정하는 경우는 데이터를 그대로 사용해도 된다
  const editPost = () => {
    let post = {
      id: props.props.date.id,
      startSleep: startSleep,
      endSleep: endSleep,
      totalSleepHour: totalSleepHour,
      totalSleepMinute: totalSleepMinute,
      selectedAt: props.props.date.selectedAt,
      tag: sendTags,
      conditions: parseInt(TotalCon),
      memo: memo,
    };

    // dispatch(todoActions.getOnePostAX(props.date.selectedAt));
    dispatch(todoActions.editPostAX(post));
  };

  // console.log(props.date);
  //수정하는 경우
  if (props.props.date.selectedAt !== undefined) {
    return (
      <React.Fragment>
        <ModalComponent>
          <TopContainer>
            <Text className="Date">{props.props.date.selectedAt}</Text>
            <FixButton
              className="TimeText"
              onClick={() => {
                if (startSleep === "" || endSleep === "" || sendCon === 0) {
                  window.alert(
                    "정확한 수면분석을 위해 취침시간, 기상시간, 컨디션을 모두 입력해주세요!"
                  );
                  return;
                } else {
                  editPost();
                  props.props._showModify(false);
                }
              }}
            >
              완료
            </FixButton>
          </TopContainer>

          <TimeContainer>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div style={{ width: "45%", margin: "auto" }}>
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
              <div style={{ width: "45%", margin: "auto" }}>
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
                {editTags.find((p) => p === "음주") ? (
                  <input
                    width="40"
                    height="40"
                    type="image"
                    src={icon_beer}
                    alt="beer"
                    value={"음주"}
                    onClick={(e) => {
                      setEditTags(editTags.filter((p) => p !== "음주"));
                    }}
                  />
                ) : (
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
                )}
              </ImgGrid>
              <ImgGrid>
                {editTags.find((p) => p === "야식") ? (
                  <input
                    width="40"
                    height="40"
                    type="image"
                    src={icon_snack}
                    alt="snack"
                    value={"야식"}
                    onClick={(e) => {
                      setEditTags(editTags.filter((p) => p !== "야식"));
                    }}
                  />
                ) : (
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
                )}
              </ImgGrid>
              <ImgGrid>
                {editTags.find((p) => p === "야근") ? (
                  <input
                    width="40"
                    height="40"
                    type="image"
                    src={icon_work}
                    alt="work"
                    value={"야근"}
                    onClick={(e) => {
                      setEditTags(editTags.filter((p) => p !== "야근"));
                    }}
                  />
                ) : (
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
                )}
              </ImgGrid>
              <ImgGrid>
                {editTags.find((p) => p === "운동") ? (
                  <input
                    width="40"
                    height="40"
                    type="image"
                    src={icon_workout}
                    alt="workout"
                    value={"운동"}
                    onClick={(e) => {
                      setEditTags(editTags.filter((p) => p !== "운동"));
                    }}
                  />
                ) : (
                  <input
                    width="40"
                    height="40"
                    type="image"
                    src={workout_icon}
                    alt="workout"
                    value={"운동"}
                    onClick={(e) => {
                      checkworkout ? setTags4(null) : setTags4(e.target.value);
                      checkworkout
                        ? setCheckWorkOut(false)
                        : setCheckWorkOut(true);
                    }}
                  />
                )}
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
                  onClick={getClick}
                />
              </ImgGrid>
              <ImgGrid>
                <input
                  width="45"
                  height="45"
                  type="image"
                  src={two_icon}
                  alt="나쁨"
                  value={2}
                  onClick={getClick}
                />
              </ImgGrid>
              <ImgGrid>
                <input
                  width="45"
                  height="45"
                  type="image"
                  src={three_icon}
                  alt="보통"
                  value={3}
                  onClick={getClick}
                />
              </ImgGrid>
              <ImgGrid>
                <input
                  width="45"
                  height="45"
                  type="image"
                  src={four_icon}
                  alt="좋음"
                  value={4}
                  onClick={getClick}
                />
              </ImgGrid>
              <ImgGrid>
                <input
                  width="45"
                  height="45"
                  type="image"
                  src={five_icon}
                  alt="매우 좋음"
                  value={5}
                  onClick={getClick}
                />
              </ImgGrid>
            </TotalImgGrid>
          </ConditionContainer>

          <BottomContainer>
            <textarea
              className="TimeText2"
              rows="7"
              cols="45"
              placeholder={props.props.date.memo}
              onChange={changeMemo}
              value={memo}
            ></textarea>
          </BottomContainer>
        </ModalComponent>
      </React.Fragment>
    );
  }
};

const Container = styled.div`
  background-color: grey;
  display: flex;
  width: 100%;
  height: 15%;
  margin: 5px 0px 5px 0px;
  justify-content: space-between;
`;

const TimeContainer = styled.div`
  background-color: white;
  display: flex;
  width: 100%;
  height: 20%;
  margin: 10px 0px 0px 0px;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin: 5px 0px 0px 11px;
`;

const FixButton = styled.button`
  width: 30%;
  height: 100%;
  background-color: black;
  border: 2px solid white;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  margin: 0px 9px 9px 0px;
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
  margin: auto;
  justify-content: space-evenly;
  background-color: white;
`;

const TopContainer = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 10%;
  margin: 19px 0px 0px 0px;
`;

const TagContainer = styled.div`
  /* background-color: grey; */
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ConditionContainer = styled.div`
  /* background-color: grey; */
  width: 100%;
  height: 20%;
  display: flex;
`;

const BottomContainer = styled.div`
  /* background-color: grey; */
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalComponent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default Modify;
