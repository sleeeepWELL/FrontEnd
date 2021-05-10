import React, { useEffect } from "react";
import moment from "moment";

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";

import beer from "../image/beer.png";
import snack from "../image/snack.png";
import work from "../image/work.png";
import workout from "../image/workout.png";

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
  야식: snack,
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
          <DayHeader>
            <LeftHeader>
              <MoveDButton
                onClick={() => {
                  let tDate = new Date(_day);
                  tDate.setDate(tDate.getDate() - 1);
                  dispatch(
                    todoActions.getOnePostAX(moment(tDate).format("YYYY-MM-DD"))
                  );
                }}
              >
                <ChevronLeftIcon />
              </MoveDButton>

              <DText>{_day}</DText>

              <MoveDButton
                onClick={() => {
                  let tDate = new Date(_day);
                  tDate.setDate(tDate.getDate() + 1);
                  dispatch(
                    todoActions.getOnePostAX(moment(tDate).format("YYYY-MM-DD"))
                  );
                }}
              >
                <ChevronRightIcon />
              </MoveDButton>
            </LeftHeader>
            <RightHeader>
              <AddButton
                onClick={() => {
                  props._showModify(true);
                }}
              >
                추가하기
              </AddButton>
            </RightHeader>
          </DayHeader>

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
          <DayHeader>
            <LeftHeader>
              <MoveDButton
                onClick={() => {
                  let tDate = new Date(props.date.selectedAt);
                  tDate.setDate(tDate.getDate() - 1);
                  dispatch(
                    todoActions.getOnePostAX(moment(tDate).format("YYYY-MM-DD"))
                  );
                }}
              >
                <ChevronLeftIcon />
              </MoveDButton>
              <DText>{props.date.selectedAt}</DText>
              <MoveDButton
                onClick={() => {
                  let tDate = new Date(props.date.selectedAt);
                  tDate.setDate(tDate.getDate() + 1);
                  dispatch(
                    todoActions.getOnePostAX(moment(tDate).format("YYYY-MM-DD"))
                  );
                }}
              >
                <ChevronRightIcon />
              </MoveDButton>
            </LeftHeader>

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
          </DayHeader>

          <SleepTimeContainer>
            <TimeText>
              수면시간 :{" "}
              {`${props.date.totalSleepHour} 시간 ${props.date.totalSleepMinute} 분`}{" "}
              ({props.date.startSleep} ~ {props.date.endSleep})
            </TimeText>
          </SleepTimeContainer>

          <TagContainer>
            <TimeText>
              태그 :{" "}
              {props.date.tag.map((currentTag, idx) => {
                return (
                  <img
                    key={idx}
                    width="40px"
                    height="40px"
                    src={mapKeywordToImg[currentTag]}
                  ></img>
                );
              })}
            </TimeText>
          </TagContainer>

          <ConditionContainer>
            <TimeText>
              컨디션 :{" "}
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

          <Contents> 메모 :{props.date.memo}</Contents>
        </ModalComponent>
      </React.Fragment>
    );
  }
};

const ModalComponent = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const DayHeader = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30%;
  margin: 20px 0px 5px 0px;
`;
const LeftHeader = styled.div`
  background-color: black;
  display: flex;
  flex-direction: row;
  width: 65%;
  height: 100%;
  border: none;
`;

const MoveDButton = styled.button`
  width: 10%;
  background-color: black;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  border: none;
  cursor: pointer;
  color: white;
`;
const DText = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: white;
  height: 100%;
  width: 40%;
  border: none;
  text-align: center;
  padding-top: 2px;
`;
const RightHeader = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-between;
  width: 35%;
  height: 60%;
`;
const FixButton = styled.button`
  width: 50%;
  height: 100%;
  background-color: black;
  border: 2px solid white;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  margin: 9px 0px 0px 9px;
`;

const AddButton = styled.button`
  width: 50%;
  height: 100%;
  background-color: black;
  border: 2px solid white;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  margin: 9px 9px 0px 0px;
`;

const SleepTimeContainer = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 12%;
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
  height: 12%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ConditionContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 12%;
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
  margin: 5px 0px 0px 10px;
  color: white;
  font-weight: bold;
`;

export default DetailPost;
