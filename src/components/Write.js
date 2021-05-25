import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { history } from "../redux/configureStore";
import "./Font.css";
import Swal from "sweetalert2";
// import { useToasts,ToastProvider } from 'react-toast-notifications'

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
import { LatheBufferGeometry } from "three";

const Write = (props) => {
  const dispatch = useDispatch();
  // const { addToast } = useToasts();
  // const contents ="기록이 추가되었습니다"

  const [memo, setMemo] = React.useState("");

  const [start, setStart] = React.useState(new Date("2021-01-01T23:00"));
  const startSleep = moment(start).format("HH:mm");
  const [end, setEnd] = React.useState(new Date("2021-01-01T09:00"));

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
  const TrueCon = [];
  if (checkone) {
    TrueCon.push(1);
  }
  if (checktwo) {
    TrueCon.push(2);
  }
  if (checkthree) {
    TrueCon.push(3);
  }
  if (checkfour) {
    TrueCon.push(4);
  }
  if (checkfive) {
    TrueCon.push(5);
  }

  const mycondition = Number(String(TrueCon));
  console.log("추가할 컨디션:", mycondition);

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
  };

  const theme = createTheme(Theme);

  return (
   
    <React.Fragment>
    
      <ModalComponent>
    
        <DateContainer>
          <Text>{props.props.date.slice(14, 24)}</Text>
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
                  renderInput={(params) => <TextField {...params} />}
                />
              </ThemeProvider>
            </LocalizationProvider>
          </CheckTimeL>
          <CheckTimeR>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ThemeProvider theme={theme}>
                <MobileTimePicker
                  label="기상 시간 선택"
                  value={end}
                  onChange={(newEnd) => {
                    setEnd(newEnd);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </ThemeProvider>
            </LocalizationProvider>
          </CheckTimeR>
        </TimeContainer>

        <TagContainer>
          <TagText className="BottomInfo">태그 </TagText>
          <TotalTagGrid>
            <TagGrid>
              <IconInput
                type="image"
                src={beer_icon}
                alt="beer"
                value={"음주"}
                onClick={(e) => {
                  checkbeer ? setTags1(null) : setTags1(e.target.value);
                  checkbeer ? setCheckBeer(false) : setCheckBeer(true);
                }}
              />
            </TagGrid>
            <TagGrid>
              <IconInput
                type="image"
                src={snack_icon}
                alt="snack"
                value={"야식"}
                onClick={(e) => {
                  checksnack ? setTags2(null) : setTags2(e.target.value);
                  checksnack ? setCheckSnack(false) : setCheckSnack(true);
                }}
              />
            </TagGrid>
            <TagGrid>
              <IconInput
                type="image"
                src={work_icon}
                alt="work"
                value={"야근"}
                onClick={(e) => {
                  checkwork ? setTags3(null) : setTags3(e.target.value);
                  checkwork ? setCheckWork(false) : setCheckWork(true);
                }}
              />
            </TagGrid>
            <TagGrid>
              <IconInput
                type="image"
                src={workout_icon}
                alt="workout"
                value={"운동"}
                onClick={(e) => {
                  checkworkout ? setTags4(null) : setTags4(e.target.value);
                  checkworkout ? setCheckWorkOut(false) : setCheckWorkOut(true);
                }}
              />
            </TagGrid>
          </TotalTagGrid>
        </TagContainer>

        <ConditionContainer>
          <TagText className="BottomInfo">컨디션</TagText>
          <TotalImgGrid>
            <ImgGrid>
              <IconInput
                type="image"
                src={one_icon}
                alt="매우나쁨"
                value={1}
                onClick={getClick}
              />
            </ImgGrid>
            <ImgGrid>
              <IconInput
                type="image"
                src={two_icon}
                alt="나쁨"
                value={2}
                onClick={getClick}
              />
            </ImgGrid>
            <ImgGrid>
              <IconInput
                type="image"
                src={three_icon}
                alt="보통"
                value={3}
                onClick={getClick}
              />
            </ImgGrid>
            <ImgGrid>
              <IconInput
                type="image"
                src={four_icon}
                alt="좋음"
                value={4}
                onClick={getClick}
              />
            </ImgGrid>
            <ImgGrid>
              <IconInput
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
          <MemoText className="BottomInfo">메모</MemoText>
          <TextArea
            className="TimeText2"
            placeholder="메모를 입력하세요"
            onChange={changeMemo}
          ></TextArea>
        </BottomContainer>

        <ButtonHeader>
          <BtnDiv>
            <AddButton
              className="TimeText"
              onClick={() => {
                if (startSleep === "" || endSleep === "" || mycondition === 0) {
                  Swal.fire({
                    title: "입력이 부족해요!",
                    icon: "정확한 수면분석을 위해 취침시간, 기상시간, 컨디션을 모두 입력해주세요!",
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText: "확인",
                  });
                  return;
                } else {
                  addPost();
                  props.props._showModify(false);
                  // addToast(contents, {
                  //   appearance: 'success',
                  // });
                }
              }}
            >
              저장
            </AddButton>
          </BtnDiv>
        </ButtonHeader>
     
      </ModalComponent>
    
    </React.Fragment>
    
  );
};

//취침 기상
const TimeContainer = styled.div`
  background-color: #f3f3f3;
  display: flex;
  width: 100%;
  height: 12%;
  flex-direction: row;
  justify-content: space-around;
  box-sizing: border-box;
  /* background-color: lime; */
`;

const CheckTimeL = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 40%;
  box-sizing: border-box;
  justify-content: center;
`;
const CheckTimeR = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 40%;
  box-sizing: border-box;
`;

const Text = styled.div`
  font-weight: bold;
  font-size: 175%;
  color: #4a5566;
  @media (max-width: 1300px) {
    font-size: 125%;
  }
`;

const AddButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: #4a5566;
  border: 2px solid white;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  box-shadow: rgb(82 82 82/ 20%) 0px 5px 8px 0px;
  font-size: 90%;
`;

const BtnDiv = styled.div`
  display: flex;
  width: 90%;
  height: 50%;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  box-sizing: border-box;
`;

const ButtonHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  box-sizing: border-box;
  /* background-color: lightskyblue; */
`;

const ImgGrid = styled.div`
  display: flex;
`;

const TotalImgGrid = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2%;
  margin-bottom: 1%;
`;

const TotalTagGrid = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1%;
  margin-bottom: 1%;
`;

const TagGrid = styled.div`
  display: flex;
`;

//메모
const MemoText = styled.div`
  display: flex;
  width: 90%;
  font-size: 100%;
  color: #121212;
  /* justify-content: flex-start;
  padding: 0.6rem 0; */
`;
const TextArea = styled.textarea`
  width: 80%;
  padding: 5%;
  border: none;
  border-radius: 6px;
  outline: none;
  font-weight: 300;
  font-size: 0.9rem;
  height: 85%;
  resize: none;
  background-color: #dcdcdc;
`;

//헤더
const TopContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 15%;
  margin: 20px 0px 0px 0px;

  /* background-color: red; */
`;

const DateContainer = styled.div`
  width: 100%;
  height: 9%;
  margin-top: 3%;
  margin-bottom: 3%;
  justify-content: center;
  align-items: center;
  display: flex;
  /* background-color: maroon; */
`;

//태그
const TagText = styled.div`
  display: flex;
  font-size: 100%;
  color: #121212;
  width: 90%;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 12%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-top: 7%;
  /* background-color: lightsteelblue; */
`;

const ConditionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 12%;
  box-sizing: border-box;
  margin-top: 7%;
  margin-bottom: 7%;
  /* background-color: lightslategray; */
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 40%;
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
  flex-direction: column; ;
`;

const IconInput = styled.input`
  width: 80%;
  height: 100%;
  margin: 0% auto;
  border-radius: 50%;
  :hover {
    box-shadow: lightgrey 0px 3px 7px 0px;
    transition: box-shadow 0.2s ease-in 0s;
  }
`;
const ConInput = styled.input`
  width: 80%;
  height: 100%;
  margin: 0% auto;
  border-radius: 50%;
  :hover {
    box-shadow: lightgrey 0px 3px 7px 0px;
    transition: box-shadow 0.2s ease-in 0s;
  }
`;

export default Write;
