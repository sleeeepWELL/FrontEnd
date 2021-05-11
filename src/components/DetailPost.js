import React, { useEffect } from "react";
import moment from "moment";

import styled, { keyframes } from 'styled-components';
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
              >◀
                {/* <ChevronLeftIcon /> */}
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
              >▶
                {/* <ChevronRightIcon /> */}
              </MoveDButton>
            </LeftHeader>
            <RightHeader>
              <AddButton
                onClick={() => {
                  props._showModify(true);
                }}
              >
                ADD
              </AddButton>
            </RightHeader>
          </DayHeader>

          <ConditionContainer style={{ height: "30%" }}>
            <EmptyText>NO CONTENTS</EmptyText>
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
              > ◀
              {/* <ChevronLeftIcon/> */}
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
              >▶
                {/* <ChevronRightIcon /> */}
              </MoveDButton>
            </LeftHeader>

            <RightHeader>
              <AddButton
                onClick={() => {
                  props._showModify(true);
                }}
              >
                MODIFY
              </AddButton>
              <DeleteButton
                onClick={() => {
                  dispatch(todoActions.removePostAX(props.date.selectedAt));
                }}
              >
                DELETE
              </DeleteButton>
            </RightHeader>
          </DayHeader>

          <ConditionContainer>
            <ConditionText>
              CONDITION
            </ConditionText>
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
            
          </ConditionContainer>

          <TimeContainer>  
            
          <TimeText>
          SLEEP TIME
          </TimeText>
          <TimeText2>
          {`${props.date.totalSleepHour} 시간 ${props.date.totalSleepMinute} 분`}
              ({props.date.startSleep} ~ {props.date.endSleep})
          </TimeText2>
          </TimeContainer>

          <TagContainer>
            <TimeText>
              TAG
            </TimeText>
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

         

          <Contents> MEMO {props.date.memo}</Contents>
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

`;


const DayHeader = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30%;
  margin: 20px 0px 30px 0px;
`;

const ConditionContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 12%;
  display: flex;
  margin-bottom: 20px;
`;

const TimeContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 10%;
  display: flex;
  margin-bottom: 20px;
`;

const TagContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 12%;
  display: flex;
  justify-content: space-between;
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
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  border: none;
  cursor: pointer;
  color: white;
  background-color: black;
  text-align: center;
`;
const DText = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: white;
  width: 90%;
  border: none;
  text-align: center;
  padding-top: 2px;
`;
const RightHeader = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-between;
  width: 37%;
  height: 60%;
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
  font-size: 3px;
  
`;

const DeleteButton = styled.button`
  width: 50%;
  height: 100%;
  background-color: black;
  border: 2px solid white;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  margin: 9px 0px 0px 3px;
  font-size: 3px;
  
`;

const TimeText = styled.div`
  width: 35%;
  color: white;
  font-size: 15px;
  margin: 5px 0px 0px 10px;
  font-weight: bold;

`;
const EmptyText = styled.div`
  width: 100%;
  color: white;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

const TimeText2 = styled.div`
  width: 65%;
  color: white;
  font-size: 12px;
  margin: 5px 0px 0px 10px;
  font-weight: bold;
`;


const ConditionText = styled.div`
  width: 35%;
  color: white;
  font-size: 15px;
  margin: 5px 0px 0px 10px;
  font-weight: bold;
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
