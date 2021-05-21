import React, { useEffect } from "react";
import moment from "moment";

import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
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

import Swal from "sweetalert2";

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
      <React.Fragment>
        <Wrap>
          <DayHeader>
            <RightHeader>
              {moment(props.date.slice(14, 24)) <= _today && (
                <AddButton
                  onClick={() => {
                    props._showModify(true);
                  }}
                >
                  기록
                </AddButton>
              )}
            </RightHeader>
          </DayHeader>
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
                  }}
                >
                  <ChevronRightIcon />
                </MoveDButton>
              </LeftHeader>
            </DateContainer>
            <EmptyTextContainer>
              <EmptyText className="TimeText">
                수면기록을 입력해주세요!
              </EmptyText>
            </EmptyTextContainer>
          </ModalComponent>
          {props.date[0].conditions == "First_View"
            ? dispatch(
                todoActions.getOnePostAX(moment(today).format("YYYY-MM-DD"))
              )
            : null}
        </Wrap>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Wrap>
          <DayHeader>
            <RightHeader>
              <ModifyButton
                className="TimeText"
                onClick={() => {
                  props._showModify(true);
                }}
              >
                수정
              </ModifyButton>
              <ModifyButton className="TimeText" onClick={deletePost}>
                삭제
              </ModifyButton>
            </RightHeader>
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
                <SideTextBox>수면 시간</SideTextBox>
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
                  <SideTextBox style={{ paddingTop: "10%" }}>메모</SideTextBox>
                </TimeText>
              </MemoInfoBox>
              <MemoTextBox>
                <MemoText className="TimeText">{props.date.memo}</MemoText>
              </MemoTextBox>
            </Contents>
          </ModalComponent>
        </Wrap>
      </React.Fragment>
    );
  }
};

const SideTextBox = styled.div`
  display: flex;
  height: 15px;
  border-bottom: 4px solid #ffdf48;
  color: black;
  font-size: 17px;
  font-weight: bold;
`;

const InnerBox = styled.div`
  display: flex;
  width: 90%;
  height: 80%;
  border-radius: 20px;
  background-color: #ffffff;
  justify-content: space-around;
  align-items: center;
  color: black;
  font-size: 1rem;
  font-weight: bold;
`;
const MemoInfoBox = styled.div`
  display: flex;
  width: 25%;
  height: 100%;
  align-items: center;
`;

const MemoTextBox = styled.div`
  display: flex;
  width: 75%;
  height: 100%;
  justify-content: center;
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

const ConditionImgBox = styled.div`
  display: flex;
  width: 75%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DateContainer = styled.div`
  display: flex;
  width: 100%;
  height: 12%;
  padding-bottom: 4%;
  justify-content: center;
  align-items: center;
`;

const ConditContainer = styled.div`
  display: flex;
  width: 100%;
  height: 12%;
  justify-content: center;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ModalComponent = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

//비어있을 때
const EmptyTextContainer = styled.div`
  width: 100%;
  height: 83%;
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

const ConImg = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  width: 25%;
  height: 80%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
`;

//수면시간
const TimeContainer = styled.div`
  width: 100%;
  height: 12%;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

const TimeText = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  justify-content: center;
`;

const TimeText2 = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 975px) {
    height: 40%;
  }
`;
const MemoText = styled.div`
  width: 80%;
  height: 80%;
  padding: 5%;
  border-radius: 20px;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  background-color: #ffffff;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
`;

//태그
const TagContainer = styled.div`
  width: 100%;
  height: 12%;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

const TagImg = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
  width: 15%;
  height: 60%;
  display: flex;
  background-position: center;
`;

//카드 헤더
const DayHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 5%;
  box-sizing: border-box;
`;

const LeftHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  height: 60%;
  text-align: center;
  box-sizing: border-box;
`;

const RightHeader = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: flex-end;
  width: 100%;
  height: 80%;
  box-sizing: border-box;
`;

const MoveDButton = styled.button`
  width: 10%;
  height: 100%;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  border: none;
  cursor: pointer;
  color: #4a5566;
  background-color: #f3f3f3;
  text-align: center;
  text-shadow: rgb(10 50 10 / 40%) 0.7px 0.7px 0.7px;
`;
const DText = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 3.5vh;
  color: #4a5566;
  width: 80%;
  text-align: center;
  justify-content: center;
  height: 100%;

  align-items: center;
  border-radius: 10px;
  text-shadow: rgb(10 50 10 / 40%) 0.7px 0.7px 0.7px;
`;

const ModifyButton = styled.button`
  width: 13%;
  height: 100%;
  background-color: #4a5566;
  border: 1px solid white;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  box-shadow: rgb(82 82 82/ 20%) 0px 5px 8px 0px;
  font-size: 90%;
  margin-right: 10px;
`;

const AddButton = styled.button`
  width: 14%;
  height: 100%;
  background-color: #4a5566;
  border: 1px solid white;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  box-shadow: rgb(82 82 82/ 20%) 0px 5px 8px 0px;
  font-size: 90%;
  margin: 0px 10px 0px 0px;
`;

const EmptyText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  opacity: 40%;
`;

const Contents = styled.div`
  width: 100%;
  height: 50%;
  color: black;
  font-weight: bold;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
`;

export default DetailPost;
