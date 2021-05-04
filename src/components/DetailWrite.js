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

  //수정하기
  const editPost = () => {
    let post = {
      id: props.date.id,
      startSleep: startSleep,
      endSleep: endSleep,
      selectedAt: props.date.selectedAt, //리덕스에서 가져오면 되나
      tag: EditTotalTags,
      conditions: conditions,
      memo: memo,
    };
    dispatch(todoActions.editPostAX(post));
  };

  const post_list = useSelector((state) => state.todo.day_list);
  console.log(post_list);

  const post_id = props.date.id;
  const is_edit = post_id ? true : false;

  const _post = is_edit ? post_list : null;
  console.log(_post);

  // 취침시간 기상시간 메모
  const [startSleep, setstartSleep] = React.useState(
    _post ? _post.startSleep : ""
  );
  const [endSleep, setendSleep] = React.useState(_post ? _post.endSleep : "");
  const [memo, setMemo] = React.useState(_post ? _post.memo : "");

  //태그
  const mytags = ["음주", "야근", "운동", "야식"];
  const TotalTags = [];
  const EditTotalTags = [];

  const [tags1, setTags1] = React.useState("");
  const [tags2, setTags2] = React.useState("");
  const [tags3, setTags3] = React.useState("");
  const [tags4, setTags4] = React.useState("");

  const [editTags1, setEditTags1] = React.useState("");
  const [editTags2, setEditTags2] = React.useState("");
  const [editTags3, setEditTags3] = React.useState("");
  const [editTags4, setEditTags4] = React.useState("");

  const [checkbeer, setCheckBeer] = React.useState(false);
  const [checkovereat, setCheckOvereat] = React.useState(false);
  const [checkwork, setCheckWork] = React.useState(false);
  const [checkworkout, setCheckWorkOut] = React.useState(false);

  const beer_icon = checkbeer ? beer : beer_gray;
  const overeat_icon = checkovereat ? overeat : overeat_gray;
  const work_icon = checkwork ? work : work_gray;
  const workout_icon = checkworkout ? workout : workout_gray;

  //선택되었을 때 보여줄 값
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

  //edit
  if (editTags1) {
    EditTotalTags.push(editTags1);
  }
  if (editTags2) {
    EditTotalTags.push(editTags2);
  }
  if (editTags3) {
    EditTotalTags.push(editTags3);
  }
  if (editTags4) {
    EditTotalTags.push(editTags4);
  }

  //수정하기 태그 가져오기

  const bringConditions = String(post_list.conditions);
  const bringTags = props.date.tag;
  console.log(bringConditions);
  console.log(bringTags);
  console.log(EditTotalTags);

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

  console.log(props.date.selectedAt);

  if (props.date.id) {
    return (
      <React.Fragment>
        <ModalComponent>
          <TopContainer>
            <Text>{props.date.selectedAt}</Text>
            <FixButton
              onClick={() => {
                editPost();
                props._showModify(false);
                dispatch(todoActions.getOnePostAX(props.date.selectedAt));
              }}
            >
              수정완료
            </FixButton>
          </TopContainer>

          <Container>
            <TextField
              id="time"
              label="취침시간"
              type="time"
              value={startSleep}
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
              value={endSleep}
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
                {bringTags.find((p) => p === "음주") ? (
                  <input
                    id="beer"
                    width="40"
                    height="40"
                    type="image"
                    src={icon_beer}
                    alt="beer"
                    value={"음주"}
                    onClick={(e) => {
                      if (!checkbeer) {
                        setEditTags1(e.target.value);
                      }
                      if (checkbeer) {
                        setEditTags1(null);
                      }
                      checkbeer ? setCheckBeer(false) : setCheckBeer(true);
                    }}
                  />
                ) : (
                  <input
                    id="beer"
                    width="40"
                    height="40"
                    type="image"
                    src={beer_icon}
                    alt="beer"
                    value={"음주"}
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
                )}
              </ImgGrid>
              <ImgGrid>
                {bringTags.find((p) => p === "야식") ? (
                  <input
                    width="40"
                    height="40"
                    type="image"
                    src={icon_overeat}
                    alt="overeat"
                    value={"야식"}
                    onClick={(e) => {
                      if (!checkovereat) {
                        setEditTags2(e.target.value);
                      }
                      if (checkovereat) {
                        setEditTags2(null);
                      }

                      checkovereat
                        ? setCheckOvereat(false)
                        : setCheckOvereat(true);
                    }}
                  />
                ) : (
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
                      checkovereat
                        ? setCheckOvereat(false)
                        : setCheckOvereat(true);
                    }}
                  />
                )}
              </ImgGrid>
              <ImgGrid>
                {bringTags.find((p) => p === "야근") ? (
                  <input
                    width="40"
                    height="40"
                    type="image"
                    src={icon_work}
                    alt="work"
                    value={"야근"}
                    onClick={(e) => {
                      if (!checkwork) {
                        setEditTags3(e.target.value);
                      }
                      if (checkwork) {
                        setEditTags3(null);
                      }

                      console.log(e.target.value);
                      checkwork ? setCheckWork(false) : setCheckWork(true);
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
                )}
              </ImgGrid>
              <ImgGrid>
                {bringTags.find((p) => p === "운동") ? (
                  <input
                    width="40"
                    height="40"
                    type="image"
                    src={icon_workout}
                    alt="workout"
                    value={"운동"}
                    onClick={(e) => {
                      setEditTags4(e.target.value);

                      if (!checkworkout) {
                        setEditTags4(e.target.value);
                      }
                      if (checkworkout) {
                        setEditTags4(null);
                      }

                      console.log(e.target.value);
                      checkworkout
                        ? setCheckWorkOut(false)
                        : setCheckWorkOut(true);
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
                      setTags4(e.target.value);

                      if (!checkworkout) {
                        setTags4(e.target.value);
                      }
                      if (checkworkout) {
                        setTags4(null);
                      }

                      console.log(e.target.value);
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
                {bringConditions === "1" ? (
                  <input
                    width="40"
                    height="40"
                    type="image"
                    src={good}
                    alt="컨디션 good"
                    value={1}
                  />
                ) : (
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
                )}
              </ImgGrid>
              <ImgGrid>
                {bringConditions === "2" ? (
                  <input
                    width="40"
                    height="40"
                    type="image"
                    src={soso}
                    alt="컨디션 good"
                    value={2}
                  />
                ) : (
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
                )}
              </ImgGrid>
              <ImgGrid>
                {bringConditions === "3" ? (
                  <input
                    width="40"
                    height="40"
                    type="image"
                    src={bad}
                    alt="컨디션 bad"
                    value={3}
                  />
                ) : (
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
                )}
              </ImgGrid>
            </TotalImgGrid>
          </ConditionContainer>

          <BottomContainer>
            <input
              type="text"
              multiline
              value={memo}
              onChange={changeMemo}
            ></input>
          </BottomContainer>
        </ModalComponent>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <ModalComponent>
          <TopContainer>
            <Text>{props.date.slice(14, 24)}</Text>
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
                  value={"음주"}
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
