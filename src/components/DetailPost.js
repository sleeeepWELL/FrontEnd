import React, { useEffect } from "react";

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
  const day_list = useSelector((state) => state.todo.day_list);

  console.log(day_list.tag);

  //컨디션
  const myCon = String(day_list.condition);
  console.log(myCon);

  if (day_list.selectedAt == undefined) {
    let _day = day_list.slice(14, 24);
    return (
      <React.Fragment>
        <ModalComponent>
          <EmptyHeader>
            <TimeText> {_day}</TimeText>
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
            <TimeText> {day_list.selectedAt}</TimeText>
            <RightHeader>
              <FixButton
                onClick={() => {
                  props._showModify(true);
                }}
              >
                수정하기
              </FixButton>
              <FixButton
                onClick={() => {
                  dispatch(todoActions.removePostAX(day_list.selectedAt));
                }}
              >
                삭제하기
              </FixButton>
            </RightHeader>
          </ModalHeader>

          <TopContainer>
            <TimeText>
              수면시간{" "}
              {`${day_list.totalSleepHour} 시간 ${day_list.totalSleepMinute} 분`}{" "}
              ({day_list.startSleep} ~ {day_list.endSleep})
            </TimeText>
          </TopContainer>

          <TagContainer>
            <TimeText>
              태그{" "}
              {day_list.tag.map((currentTag) => {
                return (
                  <img
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
            <Contents>{day_list.memo}</Contents>
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
