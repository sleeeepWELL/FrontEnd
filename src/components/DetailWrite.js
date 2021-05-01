import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { history } from "../redux/configureStore";

import TextField from "@material-ui/core/TextField";
import { isMoment } from "moment";
import Input from "@material-ui/core/Input";

//태그
import beer from "../image/beer.jpg";
import overeat from "../image/overeat.jpg";
import work from "../image/work.jpg";
import workout from "../image/workout.jpg";

import beer_gray from "../image/beer_gray.jpg";
import overeat_gray from "../image/overeat_gray.jpg";
import work_gray from "../image/work_gray.jpg";
import workout_gray from "../image/workout_gray.jpg";

//컨디션
import bad from "../image/bad-condition.jpg";
import good from "../image/good-condition.jpg";
import soso from "../image/soso-condition.jpg";

import bad_gray from "../image/bad-gray.jpg";
import good_gray from "../image/good-gray.jpg";
import soso_gray from "../image/soso-gray.jpg";

const DetailWrite = (props) => {
  const dispatch = useDispatch();

  const [startSleep, setstartSleep] = React.useState("");
  const [endSleep, setendSleep] = React.useState("");
  const [memo, setMemo] = React.useState("");

  //태그
  const mytags = ["음주", "야근", "운동", "야식"];
  const TotalTags = [];

  const [tags1, setTags1] = React.useState("");
  const [tags2, setTags2] = React.useState("");
  const [tags3, setTags3] = React.useState("");
  const [tags4, setTags4] = React.useState("");

  const [checkbeer, setCheckBeer] = React.useState(false);
  const [checkovereat, setCheckOvereat] = React.useState(false);
  const [checkwork, setCheckWork] = React.useState(false);
  const [checkworkout, setCheckWorkOut] = React.useState(false);

  const beer_icon = checkbeer ? beer : beer_gray;
  const overeat_icon = checkovereat ? overeat : overeat_gray;
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
  const [conditions, setCondition] = React.useState("");
  const [checkgood, setCheckGood] = React.useState(false);
  const [checksoso, setCheckSoso] = React.useState(false);
  const [checkbad, setCheckBad] = React.useState(false);

  const good_icon = checkgood ? good : good_gray;
  const soso_icon = checksoso ? soso : soso_gray;
  const bad_icon = checkbad ? bad : bad_gray;

  const checkSleep = (event) => {
    setstartSleep(event.target.value);
  };
  const checkoutSleep = (event) => {
    setendSleep(event.target.value);
  };
  const changeMemo = (event) => {
    setMemo(event.target.value);
    console.log(event.target.value);
  };

  console.log(TotalTags);
  const addPost = () => {
    let post = {
      startSleep: startSleep,
      endSleep: endSleep,
      selectedAt: props.date, //리덕스에서 가져오면 되나
      tag: TotalTags,
      conditions: conditions,
      memo: memo,
    };
    dispatch(todoActions.addPostAX(post));
  };
  // window.alert("기록이 추가되었습니다😀");

  return (
    <React.Fragment>
      <ModalComponent>
        <TopContainer>
          <Text>{props.date}</Text>
          <FixButton
            onClick={() => {
              addPost();
              props._showModify(false);
              dispatch(todoActions.getOnePostAX(props.date));
            }}
          >
            완료
          </FixButton>
        </TopContainer>

        <Container>
          <TextField
            id="time"
            label="취침시간"
            type="time"
            // value={startSleep}
            onChange={checkSleep}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <TextField
            id="time"
            label="기상시간"
            type="time"
            // value={endSleep}
            onChange={checkoutSleep}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </Container>

        <TagContainer>
          <TotalImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={beer_icon}
                alt="beer"
                value={mytags[0]}
                onClick={(e) => {
                  if (!checkbeer) {
                    setTags1(e.target.value);
                  }
                  if (checkbeer) {
                    setTags1(null);
                  }

                  checkbeer ? setCheckBeer(false) : setCheckBeer(true);
                }}
              />
            </ImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={overeat_icon}
                alt="overeat"
                value={"야식"}
                onClick={(e) => {
                  setTags2(e.target.value);

                  if (!checkovereat) {
                    setTags2(e.target.value);
                  }
                  if (checkovereat) {
                    setTags2(null);
                  }

                  console.log(e.target.value);
                  checkovereat ? setCheckOvereat(false) : setCheckOvereat(true);
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
                  setTags3(e.target.value);

                  if (!checkwork) {
                    setTags3(e.target.value);
                  }
                  if (checkwork) {
                    setTags3(null);
                  }

                  console.log(e.target.value);
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
                  setTags4(e.target.value);

                  if (!checkworkout) {
                    setTags4(e.target.value);
                  }
                  if (checkworkout) {
                    setTags4(null);
                  }

                  console.log(e.target.value);
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
                src={good_icon}
                alt="컨디션 good"
                value={1}
                onClick={(e) => {
                  setCondition(e.target.value);
                  console.log(e.target.value);
                  checkgood ? setCheckGood(false) : setCheckGood(true);
                }}
              />
            </ImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={soso_icon}
                alt="컨디션 soso"
                value={2}
                onClick={(e) => {
                  setCondition(e.target.value);
                  console.log(e.target.value);
                  checksoso ? setCheckSoso(false) : setCheckSoso(true);
                }}
              />
            </ImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={bad_icon}
                alt="컨디션 bad"
                value={3}
                onClick={(e) => {
                  setCondition(e.target.value);
                  console.log(e.target.value);
                  checkbad ? setCheckBad(false) : setCheckBad(true);
                }}
              />
            </ImgGrid>
          </TotalImgGrid>
        </ConditionContainer>

        <BottomContainer>
          <input
            type="text"
            multiline
            placeholder="메모를 입력하세요"
            onChange={changeMemo}
          ></input>
        </BottomContainer>
      </ModalComponent>
    </React.Fragment>
  );
};

const Container = styled.div`
  background-color: grey;
  display: flex;
  width: 100%;
  height: 15%;
  margin: 5px 0px 5px 0px;
  justify-content: space-between;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin: 5px 0px 0px 5px;
`;

const FixButton = styled.button`
  width: 10%;
  height: 30px;
  background-color: white;
  border: #fee500;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  margin: 10px 2px 10px 0px;
`;
const ImgGrid = styled.div`
  display: flex;
  /* background-color: blue; */
  padding: 10px;
`;

const TotalImgGrid = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  justify-content: space-evenly;
  background-color: white;
`;

const TopContainer = styled.div`
  background-color: grey;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 20%;
  margin-bottom: 5px;
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

export default DetailWrite;
