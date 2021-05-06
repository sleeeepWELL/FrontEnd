import React, { useEffect } from "react";
import moment from "moment";

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";

import beer from "../image/beer.jpg";
import overeat from "../image/overeat.jpg";
import work from "../image/work.jpg";
import workout from "../image/workout.jpg";

import one from "../image/1-condition.jpg";
import two from "../image/2-condition.jpg";
import three from "../image/3-condition.jpg";
import four from "../image/4-condition.jpg";
import five from "../image/5-condition.jpg";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

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
              <ChevronLeftIcon />
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
              <ChevronRightIcon />
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
              <ChevronLeftIcon />
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
              <ChevronRightIcon />
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
                <img width="20px" height="20px" src={one}></img>
              )}
              {myCon === "2" && (
                <img width="20px" height="20px" src={two}></img>
              )}
              {myCon === "3" && (
                <img width="20px" height="20px" src={three}></img>
              )}
              {myCon === "4" && (
                <img width="20px" height="20px" src={four}></img>
              )}
              {myCon === "5" && (
                <img width="20px" height="20px" src={five}></img>
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
  background-color: black;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 15%;
  margin: 20px 0px 5px 0px;
`;

const EmptyHeader = styled.div`
  background-color: black;
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
  background-color: black;
  border: 2px solid white;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
`;

const AddButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: black;
  border: 2px solid white;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
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
  color: white;
  font-size: 15px;
  margin: 5px 0px 0px 10px;
  font-weight: bold;
`;

const TagContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
`;
const ConditionContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 10%;
  display: flex;
`;

const BottomContainer = styled.div`
  background-color: black;
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
  background-color: black;
  margin-top: 5px;
`;

const ModalComponent = styled.div`
  width: 100%;
  height: 30%;

  display: flex;
  flex-direction: column;
`;

export default DetailPost;
