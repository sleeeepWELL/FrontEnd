import React, { useEffect } from "react";
import moment from "moment";

import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import "../components/Font.css";

import beer from "../image/beer.png";
import snack from "../image/snack.png";
import work from "../image/work.png";
import workout from "../image/workout.png";

import one from "../image/1-condition.png";
import two from "../image/2-condition.png";
import three from "../image/3-condition.png";
import four from "../image/4-condition.png";
import five from "../image/5-condition.png";

import Swal from "sweetalert2";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MemoryTwoTone } from "@material-ui/icons";

//태그 글씨 이미지로 바꾸기
const mapKeywordToImg = {
  음주: beer,
  야식: snack,
  야근: work,
  운동: workout,
};

const MDetailPost = (props) => {
  const dispatch = useDispatch();
  const today = useSelector((state) => state.todo.today);
  const _today = moment();
  const hour = Number(_today.format("HH"));

  const deletePost = () => {
    Swal.fire({
      title: "삭제 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(todoActions.removePostAX(props.date.selectedAt));
      }
    });
  };

  //컨디션
  const myCon = String(props.date.conditions);
  //조건식을 통해 분별한다

  if (props.date.selectedAt == undefined) {
    let _day = props.date.slice(14, 24);
    return (
      <>
        <Wrap>
          <ModalComponent>
            <DateContainer>
              <LeftHeader>
                <MoveDButton
                  onClick={() => {
                    let tDate = new Date(_day);
                    tDate.setDate(tDate.getDate() - 1);
                    dispatch(
                      todoActions.getOnePostAX(
                        moment(tDate).format("YYYY-MM-DD")
                      )
                    );
                    dispatch(
                      todoActions.changeToday(
                        moment(tDate).format("YYYY-MM-DD")
                      )
                    );
                  }}
                >
                  <ChevronLeftIcon />
                </MoveDButton>

                <DText className="HelveticaB">{_day}</DText>

                <MoveDButton
                  onClick={() => {
                    let tDate = new Date(_day);
                    tDate.setDate(tDate.getDate() + 1);
                    dispatch(
                      todoActions.getOnePostAX(
                        moment(tDate).format("YYYY-MM-DD")
                      )
                    );
                    dispatch(
                      todoActions.changeToday(
                        moment(tDate).format("YYYY-MM-DD")
                      )
                    );
                  }}
                >
                  <ChevronRightIcon />
                </MoveDButton>
              </LeftHeader>
            </DateContainer>
            <EmptyTextContainer>
              <EmptyText className="TimeText">
                {0 <= hour && hour < 6 ? (
                  <Text>당신의 새벽을 응원합니다!</Text>
                ) : null}
                {6 <= hour && hour < 12 ? (
                  <Text>Sleepwell과 시작하는 하루!</Text>
                ) : null}
                {12 <= hour && hour < 18 ? <Text>Good Afternoon!</Text> : null}
                {18 <= hour && hour < 24 ? (
                  <Text>저녁식사는 잘 하셨나요?</Text>
                ) : null}
                <Text2>수면기록을 입력해주세요! </Text2>
              </EmptyText>
              <DayHeader1>
                {moment(props.date.slice(14, 24)) <= _today && (
                  <AddButton
                    onClick={() => {
                      props._showModify(true);
                    }}
                  >
                    수면 기록하기
                  </AddButton>
                )}
              </DayHeader1>
            </EmptyTextContainer>
          </ModalComponent>
          {props.date[0].conditions == "First_View"
            ? dispatch(
                todoActions.getOnePostAX(moment(today).format("YYYY-MM-DD"))
              )
            : null}
        </Wrap>
      </>
    );
  } else {
    return (
      <>
        <Wrap>
          <DayHeader>
            <ModifyButton
              onClick={() => {
                props._showModify(true);
              }}
            >
              수정
            </ModifyButton>
            <ModifyButton onClick={deletePost}>삭제</ModifyButton>
          </DayHeader>

          <ModalComponent>
            <DateContainer>
              <LeftHeader>
                <MoveDButton
                  onClick={() => {
                    let tDate = new Date(props.date.selectedAt);
                    tDate.setDate(tDate.getDate() - 1);
                    dispatch(
                      todoActions.getOnePostAX(
                        moment(tDate).format("YYYY-MM-DD")
                      )
                    );
                    dispatch(
                      todoActions.changeToday(
                        moment(tDate).format("YYYY-MM-DD")
                      )
                    );
                  }}
                >
                  <ChevronLeftIcon />
                </MoveDButton>

                <DText className="HelveticaB">{props.date.selectedAt}</DText>

                <MoveDButton
                  onClick={() => {
                    let tDate = new Date(props.date.selectedAt);
                    tDate.setDate(tDate.getDate() + 1);
                    dispatch(
                      todoActions.getOnePostAX(
                        moment(tDate).format("YYYY-MM-DD")
                      )
                    );
                    dispatch(
                      todoActions.changeToday(
                        moment(tDate).format("YYYY-MM-DD")
                      )
                    );
                  }}
                >
                  <ChevronRightIcon />
                </MoveDButton>
              </LeftHeader>
            </DateContainer>

            <ConditContainer>
              <ConditionContainer>
                <ConditionText className="ConditionText">
                  <SideTextBox>컨디션</SideTextBox>
                </ConditionText>
                <ConditionImgBox>
                  <InnerBox>
                    {/* 기록된 컨디션에 따라 이미지를 보여준다  */}
                    {myCon === "1" && <ConImg img={one}></ConImg>}
                    {myCon === "2" && <ConImg img={two}> </ConImg>}
                    {myCon === "3" && <ConImg img={three}></ConImg>}
                    {myCon === "4" && <ConImg img={four}></ConImg>}
                    {myCon === "5" && <ConImg img={five}></ConImg>}
                  </InnerBox>
                </ConditionImgBox>
              </ConditionContainer>
            </ConditContainer>

            <TimeContainer>
              <ConditionText className="ConditionText">
                <SideTextBox>수면시간</SideTextBox>
              </ConditionText>
              <TimeText2>
                <InnerBox className="TimeText">
                  {`${props.date.totalSleepHour} 시간 ${props.date.totalSleepMinute} 분`}
                  ({props.date.startSleep} ~ {props.date.endSleep})
                </InnerBox>
              </TimeText2>
            </TimeContainer>

            <TagContainer>
              <ConditionText className="ConditionText">
                <SideTextBox>태그</SideTextBox>
              </ConditionText>
              <TagImgBox>
                <InnerBox>
                  {props.date.tag.map((currentTag, idx) => {
                    //서버에서 태그를 string으로 받기 때문에 해당하는 이미지로 바꿔준다
                    return (
                      <TagImg
                        key={idx}
                        img={mapKeywordToImg[currentTag]}
                      ></TagImg>
                    );
                  })}
                </InnerBox>
              </TagImgBox>
            </TagContainer>

            <Contents>
              <MemoInfoBox>
                <TimeText className="ConditionText">
                  <SideTextBox style={{ paddingTop: "2%" }}>메모</SideTextBox>
                </TimeText>
              </MemoInfoBox>
              <MemoTextBox>
                <MemoTextArea className="TimeText">
                  {props.date.memo}
                </MemoTextArea>
              </MemoTextBox>
            </Contents>
          </ModalComponent>
        </Wrap>
      </>
    );
  }
};

const MemoTextArea = styled.div`
  width: 86%;
  height: 60%;
  padding: 2%;
  border-radius: 10px;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  background-color: #ffffff;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
  @media (max-width: 280px) {
    font-size: 0.8rem;
  }
`;

const MemoTextBox = styled.div`
  display: flex;
  width: 75%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const MemoInfoBox = styled.div`
  display: flex;
  width: 25%;
  height: 100%;
  align-items: center;
`;
const TagImgBox = styled.div`
  display: flex;
  width: 75%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const InnerBox = styled.div`
  display: flex;
  width: 90%;
  height: 80%;
  border-radius: 10px;
  background-color: #ffffff;
  justify-content: space-around;
  align-items: center;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  word-break: keep-all;
  text-align: center;
  @media (max-width: 280px) {
    font-size: 0.8rem;
  }
`;
const ConditionImgBox = styled.div`
  display: flex;
  width: 75%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ConditContainer = styled.div`
  display: flex;
  width: 100%;
  height: 18%;
  justify-content: center;
`;
const SideTextBox = styled.div`
  display: flex;
  height: 15px;
  border-bottom: 4px solid #ffdf48;
  color: black;
  font-size: 17px;
  font-weight: bold;
  word-break: keep-all;
  justify-content: center;
  text-align: center;
  @media (max-width: 280px) {
    font-size: 0.8rem;
  }
`;
const DateContainer = styled.div`
  display: flex;
  width: 100%;
  height: 18%;
  justify-content: center;
  align-items: center;
`;

const DayHeader = styled.div`
  display: flex;
  width: 100%;
  height: 10%;

  align-items: flex-end;
  justify-content: flex-end;
  box-sizing: border-box;
`;

const DayHeader1 = styled.div`
  display: flex;
  width: 100%;
  height: 13%;

  justify-content: center;

  box-sizing: border-box;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const RightHeader = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: flex-end;
  width: 100%;
  height: 80%;
  padding-right: 2%;
  box-sizing: border-box;
  border: 1px solid red;
`;
const ModalComponent = styled.div`
  width: 100%;
  height: 92%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

//비어있을 때
const EmptyTextContainer = styled.div`
  width: 100%;
  height: 80%;
  padding-bottom: 20%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

//컨디션
const ConditionContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
`;

const ConditionText = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MemoText = styled.div`
  width: 75%;
  height: 50%;
  color: black;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  overflow-y: scroll;
`;

const ConImg = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  width: 30%;
  height: 90%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
`;

//수면시간
const TimeContainer = styled.div`
  width: 100%;
  height: 18%;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

const TimeText = styled.div`
  display: flex;
  width: 100%;
  color: black;
  justify-content: center;
`;

const TimeText2 = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//태그
const TagContainer = styled.div`
  width: 100%;
  height: 18%;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

const TagImg = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
  width: 30%;
  height: 90%;
  display: flex;
  background-position: center;
`;

const LeftHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  height: 60%;
  text-align: center;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

const MoveDButton = styled.button`
  display: flex;
  width: 10%;
  height: 100%;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  outline: none;
  justify-content: center;
  cursor: pointer;
  color: #4a5566;
  background-color: #f3f3f3;
  align-items: center;
  text-shadow: rgb(10 50 10 / 40%) 0.7px 0.7px 0.7px;
`;
const DText = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 120%;
  color: #4a5566;
  width: 68%;
  text-align: center;
  justify-content: center;
  height: 100%;

  align-items: center;
  border-radius: 10px;
  text-shadow: rgb(10 50 10 / 40%) 0.7px 0.7px 0.7px;
`;

const ModifyButton = styled.button`
  width: 15%;
  height: 70%;
  background-color: #4a5566;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  border: none;
  font-size: 85%;
  margin-right: 5%;

  @media (max-width: 280px) {
    font-size: 0.7rem;
  }
`;

const AddButton = styled.button`
  width: 85%;
  height: 100%;
  background-color: #4a5566;
  text-align: center;

  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  box-shadow: rgb(82 82 82/ 20%) 0px 5px 8px 0px;
  font-size: 100%;
  @media (max-width: 320px) {
    font-size: 0.7rem;
  }
`;

const EmptyText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 105%;
  height: 30%;
  color: black;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  opacity: 40%;
`;

const boxFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
 `;
const boxFade2 = keyframes`
 0% {
   opacity: 0; 
 }
 50%{
   opacity: 0;
 }
 100% {
   opacity: 1;
   
 }
`;

const Text = styled.div`
  font-size: 70%;
  margin-bottom: 5%;

  animation: ${boxFade} 1s;
  color: grey;
`;
const Text2 = styled.div`
  font-size: 70%;
  margin-bottom: 5%;

  animation: ${boxFade2} 2s;
  color: grey;
`;

const Contents = styled.div`
  width: 100%;
  height: 28%;
  color: black;
  font-weight: bold;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
`;

export default MDetailPost;
