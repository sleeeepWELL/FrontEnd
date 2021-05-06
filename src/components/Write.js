import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { history } from "../redux/configureStore";

import TextField from "@material-ui/core/TextField";

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

const Write = (props) => {
  const dispatch = useDispatch();
  const [startSleep, setstartSleep] = React.useState("");
  const [endSleep, setendSleep] = React.useState("");
  const [memo, setMemo] = React.useState("");
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

  const icon_beer = checkbeer ? beer_gray : beer;
  const icon_overeat = checkovereat ? overeat_gray : overeat;
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



  //컨디션
  const [checkgood, setCheckGood] = React.useState(false);
  const [checksoso, setCheckSoso] = React.useState(false);
  const [checkbad, setCheckBad] = React.useState(false);

  const good_icon = checkgood ? good : good_gray;
  const soso_icon = checksoso ? soso : soso_gray;
  const bad_icon = checkbad ? bad : bad_gray;

  //컨디션 배열에 넣고 빼기
  const [con1, setCon1] = React.useState("");
  const [con2, setCon2] = React.useState("");
  const [con3, setCon3] = React.useState("");

  const TotalCon = [];
  if (con1) {TotalCon.push(con1);}
  if (con2) {TotalCon.push(con2);}
  if (con3) {TotalCon.push(con3);}

  const mycondition = String(TotalCon);

  //컨디션 수정
  const checkSleep = (e) => {
    setstartSleep(e.target.value);
  };
  const checkoutSleep = (e) => {
    setendSleep(e.target.value);
  };
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

            <FixButton
              onClick={() => {
                addPost();
                props.props._showModify(false);
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
                  value={'음주'}
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

                    checkovereat
                      ? setCheckOvereat(false)
                      : setCheckOvereat(true);
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

                    checkworkout
                      ? setCheckWorkOut(false)
                      : setCheckWorkOut(true);
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
                    if (!checkgood) {
                      setCon1(e.target.value);
                    }
                    if (checkgood) {
                      setCon1(null);
                    }

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
                    if (!checksoso) {
                      setCon2(e.target.value);
                    }
                    if (checksoso) {
                      setCon2(null);
                    }

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
                    if (!checkbad) {
                      setCon3(e.target.value);
                    }
                    if (checkbad) {
                      setCon3(null);
                    }

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

export default Write;