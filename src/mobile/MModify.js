import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { history } from "../redux/configureStore";
import "../components/Font.css";
import Swal from "sweetalert2";

import TextField from "@material-ui/core/TextField";
import MobileTimePicker from "@material-ui/lab/MobileTimePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import moment from "moment";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

//태그
import beer_word from "../image/beer_word.png";
import snack_word from "../image/snack_word.png";
import work_word from "../image/work_word.png";
import workout_word from "../image/workout_word.png";

import beer_word_gray from "../image/beer_word_gray.png";
import snack_word_gray from "../image/snack_word_gray.png";
import work_word_gray from "../image/work_word_gray.png";
import workout_word_gray from "../image/workout_word_gray.png";

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

const MModify = (props) => {
  const dispatch = useDispatch();

  const post_list = useSelector((state) => state.todo.day_list);

  const _post = props.props.date.selectedAt ? post_list : null;

  //받아온 취침시간
  const getStart = _post.startSleep;
  const myStart = "2021-05-12T" + getStart;

  //받아온 기상시간
  const getEnd = _post.endSleep;
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

  const beer_icon = checkbeer ? beer_word : beer_word_gray;
  const snack_icon = checksnack ? snack_word : snack_word_gray;
  const work_icon = checkwork ? work_word : work_word_gray;
  const workout_icon = checkworkout ? workout_word : workout_word_gray;

  const icon_beer = checkbeer ? beer_word_gray : beer_word;
  const icon_snack = checksnack ? snack_word_gray : snack_word;
  const icon_work = checkwork ? work_word_gray : work_word;
  const icon_workout = checkworkout ? workout_word_gray : workout_word;

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

  const sendCon = Number(TotalCon.concat(editCon)[0]);

  const getClick = (e) => {
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

  //mobiletimepicker 색 변환
  const Theme = {
    palette: {
      primary: {
        contrastText: "#FFFFFF",
        dark: "#4a5566",
        main: "#4a5566",
        light: "#4a5566",
      },
    },
    typography: {
      fontSize: 12,
    },
    // overrides: {
    //   MuiOutlinedInput: {
    //     input: {
    //       padding: "14px",
    //     },
    //   },
    // },
  };

  const theme = createTheme(Theme);

  const moreClasses = {
    label: { style: { color: "blue" } },
    input: {
      style: {
        // paddingBottom: "8px",
        // color: "red",
        // borderBottom: `1px solid green`,
      },
    },
  };

  //수정하는 경우
  if (props.props.date.selectedAt !== undefined) {
    return (
      <React.Fragment>
        <ModalComponent>
          <DateContainer>
            <DText className="Helvetica">{props.props.date.selectedAt}</DText>
          </DateContainer>

          <TimeContainer>
            <CheckTimeL>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ThemeProvider theme={theme}>
                  <MobileTimePicker
                    label="취침 시간 선택"
                    value={start}
                    onChange={(newStart) => {
                      setStart(newStart);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        InputProps={{
                          ...params.InputProps,
                          ...moreClasses.input,
                        }}
                      />
                    )}
                  />
                </ThemeProvider>
              </LocalizationProvider>
            </CheckTimeL>
            <CheckTimeR>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ThemeProvider theme={theme}>
                  <MobileTimePicker
                    style={{ size: "large" }}
                    label="기상 시간 선택"
                    value={end}
                    onChange={(newEnd) => {
                      setEnd(newEnd);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        InputProps={{
                          ...params.InputProps,
                          ...moreClasses.input,
                        }}
                      />
                    )}
                  />
                </ThemeProvider>
              </LocalizationProvider>
            </CheckTimeR>
          </TimeContainer>

          <TagContainer>
            <TagText>태그 </TagText>
            <TotalTagGrid>
              {editTags.find((p) => p === "음주") ? (
                <TagImg
                  src={icon_beer}
                  alt="beer"
                  value={"음주"}
                  onClick={(e) => {
                    setEditTags(editTags.filter((p) => p !== "음주"));
                  }}
                />
              ) : (
                <TagImg
                  src={beer_icon}
                  alt="beer"
                  value={"음주"}
                  onClick={(e) => {
                    checkbeer ? setTags1(null) : setTags1(e.target.value);
                    checkbeer ? setCheckBeer(false) : setCheckBeer(true);
                  }}
                />
              )}
              {editTags.find((p) => p === "야식") ? (
                <TagImg
                  src={icon_snack}
                  alt="snack"
                  value={"야식"}
                  onClick={(e) => {
                    setEditTags(editTags.filter((p) => p !== "야식"));
                  }}
                />
              ) : (
                <TagImg
                  src={snack_icon}
                  alt="snack"
                  value={"야식"}
                  onClick={(e) => {
                    checksnack ? setTags2(null) : setTags2(e.target.value);

                    checksnack ? setCheckSnack(false) : setCheckSnack(true);
                  }}
                />
              )}
              {editTags.find((p) => p === "야근") ? (
                <TagImg
                  src={icon_work}
                  alt="work"
                  value={"야근"}
                  onClick={(e) => {
                    setEditTags(editTags.filter((p) => p !== "야근"));
                  }}
                />
              ) : (
                <TagImg
                  src={work_icon}
                  alt="work"
                  value={"야근"}
                  onClick={(e) => {
                    checkwork ? setTags3(null) : setTags3(e.target.value);
                    checkwork ? setCheckWork(false) : setCheckWork(true);
                  }}
                />
              )}
              {editTags.find((p) => p === "운동") ? (
                <TagImg
                  src={icon_workout}
                  alt="workout"
                  value={"운동"}
                  onClick={(e) => {
                    setEditTags(editTags.filter((p) => p !== "운동"));
                  }}
                />
              ) : (
                <TagImg
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
            </TotalTagGrid>
          </TagContainer>

          <ConditionContainer>
            <TagText>컨디션</TagText>
            <TotalImgGrid>
              <ConImg
                src={one_icon}
                alt="매우나쁨"
                value={1}
                onClick={getClick}
              />
              <ConImg src={two_icon} alt="나쁨" value={2} onClick={getClick} />
              <ConImg
                src={three_icon}
                alt="보통"
                value={3}
                onClick={getClick}
              />
              <ConImg src={four_icon} alt="좋음" value={4} onClick={getClick} />
              <ConImg
                src={five_icon}
                alt="매우 좋음"
                value={5}
                onClick={getClick}
              />
            </TotalImgGrid>
          </ConditionContainer>

          <BottomContainer>
            <MemoText>메모</MemoText>
            <TextArea
              className="TimeText2"
              minRows={6}
              cols={10}
              placeholder={props.props.date.memo}
              onChange={changeMemo}
              value={memo}
            ></TextArea>
          </BottomContainer>

          <ButtonHeader>
            <BtnDivSemi>
              <AddButton
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
                저장
              </AddButton>
            </BtnDivSemi>
          </ButtonHeader>
        </ModalComponent>
      </React.Fragment>
    );
  }
};

const TagImg = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.src});
  outline: none;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #f3f3f3;
  border: none;
  width: 20%;
  height: 90%;
`;

const ConImg = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 90%;
  background-image: url(${(props) => props.src});
  outline: none;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #f3f3f3;
  border: none;
`;

const BtnDivSemi = styled.div`
  display: flex;
  width: 85%;
  height: 85%;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  box-sizing: border-box;
`;

//취침 기상
const TimeContainer = styled.div`
  background-color: #f3f3f3;
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: row;
  justify-content: space-around;
  box-sizing: border-box;
  /* background-color: lightpink; */
`;

const CheckTimeL = styled.div`
  display: flex;
  align-items: center;
  min-height: 80px;
  width: 40%;
  box-sizing: border-box;
  justify-content: center;

  /* background-color: lightblue; */
`;
const CheckTimeR = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  width: 40%;
  box-sizing: border-box;

  /* background-color: lightsalmon; */
`;

const DText = styled.div`
  font-size: 140%;
  color: #4a5566;
  font-weight: bold;
`;

const AddButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: #4a5566;
  border: 1px solid white;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  box-shadow: rgb(82 82 82/ 20%) 0px 5px 8px 0px;
  font-size: 90%;
`;

const ButtonHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 10%;
  box-sizing: border-box;
  /* background-color: lightskyblue; */
`;

const TotalImgGrid = styled.div`
  display: flex;
  width: 90%;
  height: 70%;
  flex-direction: row;
  justify-content: space-between;
  /* background-color: lightgreen; */
  align-items: center;
`;

const TotalTagGrid = styled.div`
  display: flex;
  width: 90%;
  height: 70%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

//메모
const MemoText = styled.div`
  display: flex;
  width: 90%;
  height: 25%;
  font-size: 0.8rem;
  font-weight: bold;
  color: black;
  justify-content: flex-start;
  align-items: center;
`;
const TextArea = styled.textarea`
  width: 80%;
  padding: 3%;
  border: none;
  border-radius: 6px;
  outline: none;
  font-weight: 300;
  font-size: 0.9rem;
  height: 50%;
  resize: none;
  background-color: #dcdcdc;
`;

const DateContainer = styled.div`
  width: 100%;
  height: 9%;
  padding-bottom: 3%;
  justify-content: center;
  align-items: center;
  display: flex;
  /* background-color: lightyellow; */
`;

//태그
const TagText = styled.div`
  display: flex;
  font-size: 0.8rem;
  font-weight: bold;
  color: black;
  width: 90%;
  height: 30%;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 17%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* background-color: lightsteelblue; */
`;

const ConditionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 17%;
  box-sizing: border-box;
  /* background-color: lightslategray; */
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 27%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  /* background-color: lightpink; */
`;

const ModalComponent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* background-color: lightgreen; */
`;

export default MModify;
