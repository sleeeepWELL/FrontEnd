import React, { useEffect } from "react";
import moment from "moment";

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";

import beer from "../image/beer.jpg";
import overeat from "../image/overeat.jpg";
import work from "../image/work.jpg";
import workout from "../image/workout.jpg";

import bad from "../image/bad-condition.jpg";
import good from "../image/good-condition.jpg";
import soso from "../image/soso-condition.jpg";

//글씨 이미지로 바꾸기
const mapKeywordToImg = {
  음주: beer,
  야식: overeat,
  야근: work,
  운동: workout,
};

const DetailPost = (props) => {
  const dispatch = useDispatch();
  const today = useSelector((state) => state.todo.today);

  //컨디션
  const myCon = String(props.date.conditions);

  //조건식을 통해 분별한다

  //처음에 데이터를 보여주는 경우를 제외하고!
  if (props.date.selectedAt == undefined) {
    let _day = props.date.slice(14, 24);

    return (
      <React.Fragment>
        <ModalComponent>
          <EmptyHeader>
            <button
              onClick={() => {
                let tDate = new Date(_day);
                tDate.setDate(tDate.getDate() - 1);
                dispatch(
                  todoActions.getOnePostAX(moment(tDate).format("YYYY-MM-DD"))
                );
              }}
            >
              이전 날
            </button>
            <Text>{_day}</Text>
            <button
              onClick={() => {
                let tDate = new Date(_day);
                tDate.setDate(tDate.getDate() + 1);
                dispatch(
                  todoActions.getOnePostAX(moment(tDate).format("YYYY-MM-DD"))
                );
              }}
            >
              다음 날
            </button>

            <RightHeader>
              <AddButton
                onClick={() => {
                  props._showModify(true);
                }}
              >
                추가하기
              </AddButton>
            </RightHeader>
          </EmptyHeader>

          <ConditionContainer style={{ height: "30%" }}>
            <TimeText>작성된 내용이 없습니다</TimeText>
          </ConditionContainer>
        </ModalComponent>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <ModalComponent>
          <ModalHeader>
            <button
              onClick={() => {
                let tDate = new Date(props.date.selectedAt);
                tDate.setDate(tDate.getDate() - 1);
                dispatch(
                  todoActions.getOnePostAX(moment(tDate).format("YYYY-MM-DD"))
                );
              }}
            >
              이전 날
            </button>
            <Text> {props.date.selectedAt}</Text>
            <button
              onClick={() => {
                let tDate = new Date(props.date.selectedAt);
                tDate.setDate(tDate.getDate() + 1);
                dispatch(
                  todoActions.getOnePostAX(moment(tDate).format("YYYY-MM-DD"))
                );
              }}
            >
              다음 날
            </button>

            <RightHeader>
              <AddButton
                onClick={() => {
                  props._showModify(true);
                }}
              >
                수정하기
              </AddButton>
              <FixButton
                onClick={() => {
                  dispatch(todoActions.removePostAX(props.date.selectedAt));
                }}
              >
                삭제하기
              </FixButton>
            </RightHeader>
          </ModalHeader>

          <TopContainer>
            <TimeText>
              수면시간{" "}
              {`${props.date.totalSleepHour} 시간 ${props.date.totalSleepMinute} 분`}{" "}
              ({props.date.startSleep} ~ {props.date.endSleep})
            </TimeText>
          </TopContainer>

          <TagContainer>
            <TimeText>
              태그{" "}
              {props.date.tag.map((currentTag, idx) => {
                return (
                  <img
                    key={idx}
                    width="20px"
                    height="20px"
                    src={mapKeywordToImg[currentTag]}
                  ></img>
                );
              })}
            </TimeText>
          </TagContainer>

          <ConditionContainer>
            <TimeText>
              컨디션{" "}
              {myCon === "1" && (
                <img width="20px" height="20px" src={good}></img>
              )}
              {myCon === "2" && (
                <img width="20px" height="20px" src={soso}></img>
              )}
              {myCon === "3" && (
                <img width="20px" height="20px" src={bad}></img>
              )}
            </TimeText>
          </ConditionContainer>

          <BottomContainer>
            <Contents>{props.date.memo}</Contents>
          </BottomContainer>
        </ModalComponent>
      </React.Fragment>
    );
  }
};

const ModalHeader = styled.div`
  background-color: grey;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 15%;
  margin: 20px 0px 5px 0px;
`;

const EmptyHeader = styled.div`
  background-color: grey;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30%;
  margin: 20px 0px 5px 0px;
`;

const RightHeader = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-between;
  width: 40%;
  height: 60%;
`;

const FixButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: white;
  border: #fee500;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
`;

const AddButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: white;
  border: #fee500;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
`;

const ConditionImg = styled.img`
  width: 10%;
  height: 100%;
`;

const TopContainer = styled.div`
  background-color: grey;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 10%;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin: 5px 0px 0px 5px;
`;
const TimeText = styled.div`
  width: 60%;
  font-size: 15px;
  margin: 5px 0px 0px 10px;
  font-weight: bold;
`;

const TagContainer = styled.div`
  background-color: grey;
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
`;
const ConditionContainer = styled.div`
  background-color: grey;
  width: 100%;
  height: 10%;
  display: flex;
`;

const BottomContainer = styled.div`
  background-color: grey;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin-top:20px;
`;

const Contents = styled.div`
  width: 100%;
  height: 55%;
  background-color: white;
  margin-top: 5px;
`;
// const ReturnButton = styled.button`
//     width: 30%;
//     height: 30px;
//     background-color: white;
//     border: #FEE500;
//     font-weight: bold;
//     border-radius: 5px;
//     outline: none;
//     cursor: pointer;
//     margin-top:10px;
// `

const ModalComponent = styled.div`
  width: 100%;
  height: 30%;

  display: flex;
  flex-direction: column;
`;

export default DetailPost;
