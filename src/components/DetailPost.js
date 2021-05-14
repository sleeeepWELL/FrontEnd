import React, { useEffect } from "react";
import moment from "moment";

import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import "./Font.css";

import beer from "../image/beer.png";
import snack from "../image/snack.png";
import work from "../image/work.png";
import workout from "../image/workout.png";

import one from "../image/1-condition.png";
import two from "../image/2-condition.png";
import three from "../image/3-condition.png";
import four from "../image/4-condition.png";
import five from "../image/5-condition.png";

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
  const _today = moment();

 



  //컨디션
  const myCon = String(props.date.conditions);
  //조건식을 통해 분별한다

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
                ◀{/* <ChevronLeftIcon /> */}
              </MoveDButton>

              <DText className="DayText">{_day}</DText>

              <MoveDButton
                onClick={() => {
                  let tDate = new Date(_day);
                  tDate.setDate(tDate.getDate() + 1);
                  dispatch(
                    todoActions.getOnePostAX(moment(tDate).format("YYYY-MM-DD"))
                  );
                }}
              >
                ▶{/* <ChevronRightIcon /> */}
              </MoveDButton>
            </LeftHeader>
            <RightHeader>
              {moment(props.date.slice(14, 24))<=_today &&
               <AddButton
                className="TimeText"
                onClick={() => {
                  props._showModify(true);
                }}
              >
                ADD
              </AddButton>
              }
            </RightHeader>
          </DayHeader>

          <ConditionContainer style={{ height: "30%" }}>
            <EmptyText className="TimeText">NO CONTENTS</EmptyText>
          </ConditionContainer>
        </ModalComponent>
        {props.date[0].conditions == "First_View"
          ? dispatch(
              todoActions.getOnePostAX(moment(today).format("YYYY-MM-DD"))
            )
          : null}
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
                ◀{/* <ChevronLeftIcon/> */}
              </MoveDButton>

              <DText className="DayText">{props.date.selectedAt}</DText>

              <MoveDButton
                onClick={() => {
                  let tDate = new Date(props.date.selectedAt);
                  tDate.setDate(tDate.getDate() + 1);
                  dispatch(
                    todoActions.getOnePostAX(moment(tDate).format("YYYY-MM-DD"))
                  );
                }}
              >
                ▶{/* <ChevronRightIcon /> */}
              </MoveDButton>
            </LeftHeader>

            <RightHeader>
              <ModifyButton
                className="TimeText"
                onClick={() => {
                  props._showModify(true);
                }}
              >
                MODIFY
              </ModifyButton>
              <ModifyButton
                className="TimeText"
                onClick={() => {
                  dispatch(todoActions.removePostAX(props.date.selectedAt));
                }}
              >
                DELETE
              </ModifyButton>
            </RightHeader>
          </DayHeader>

          <ConditionContainer>
            <ConditionText className="ConditionText">컨디션</ConditionText>
            {myCon === "1" && <img width="45px" height="45px" src={one}></img>}
            {myCon === "2" && <img width="45px" height="45px" src={two}></img>}
            {myCon === "3" && (
              <img width="45px" height="45px" src={three}></img>
            )}
            {myCon === "4" && <img width="45px" height="45px" src={four}></img>}
            {myCon === "5" && <img width="45px" height="45px" src={five}></img>}
          </ConditionContainer>

          <TimeContainer>
            <TimeText className="TimeText">수면 시간</TimeText>
            <TimeText2 className="TimeText2">
              {`${props.date.totalSleepHour} 시간 ${props.date.totalSleepMinute} 분`}
              ({props.date.startSleep} ~ {props.date.endSleep})
            </TimeText2>
          </TimeContainer>

          <TagContainer>
            <TimeText className="TimeText">태그</TimeText>
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
          </TagContainer>

          <Contents>
            <TimeText className="TimeText">메모</TimeText>
            <TimeText2 className="TimeText2">{props.date.memo}</TimeText2>
          </Contents>
        </ModalComponent>
      </React.Fragment>
    );
  }
};

const ModalComponent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  // border-radius: 20px;
`;

const DayHeader = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 20%;
  margin: 20px 0px 30px 0px;
`;

const ConditionContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 12%;
  display: flex;
  margin-bottom: 20px;
`;

const TimeContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 10%;
  display: flex;
  margin-bottom: 20px;
`;

const TagContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 12%;
  display: flex;
  margin-bottom: 20px;
`;

const LeftHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  height: 100%;
  border: none;
  // background-color: white;
`;

const MoveDButton = styled.button`
  width: 15%;
  height: 25%;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  border: none;
  cursor: pointer;
  color: black;
  background-color: white;
  text-align: center;
`;
const DText = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: black;
  width: 80%;
  border: none;
  text-align: center;
`;
const RightHeader = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  width: 30%;
  height: 100%;
`;

const AddButton = styled.button`
  width: 50%;
  height: 60%;
  background-color: black;
  border: 2px solid white;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;

  font-size: 3px;
`;

const ModifyButton = styled.button`
  width: 50%;
  background-color: black;
  border: 2px solid white;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;

  font-size: 3px;
`;

const TimeText = styled.div`
  width: 35%;
  color: black;
  font-size: 17px;
  margin: 5px 0px 0px 10px;
  font-weight: bold;
`;
const EmptyText = styled.div`
  width: 100%;
  color: black;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const TimeText2 = styled.div`
  width: 65%;
  color: black;
  font-size: 13px;
  margin: 5px 0px 0px 10px;
  font-weight: bold;
`;

const ConditionText = styled.div`
  width: 35%;
  color: black;
  font-size: 17px;
  margin: 5px 0px 0px 10px;
  font-weight: bold;
`;

const Contents = styled.div`
  width: 100%;
  height: 55%;
  background-color: white;
  color: black;
  font-weight: bold;
  display: flex;
  margin-bottom: 20px;
`;

export default DetailPost;
