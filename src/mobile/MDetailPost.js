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

//글씨 이미지로 바꾸기
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

        <ModalComponent>
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

            <DText className="HelveticaB">{_day}</DText>

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

          <EmptyTextContainer>
            <EmptyText className="TimeText">수면기록을 입력해주세요!</EmptyText>
          </EmptyTextContainer>
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
        <RightHeader>
          <ModifyButton
            onClick={() => {
              props._showModify(true);
            }}
          >
            수정
          </ModifyButton>
          <ModifyButton onClick={deletePost}>삭제</ModifyButton>
        </RightHeader>

        <ModalComponent>
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

            <DText className="HelveticaB">{props.date.selectedAt}</DText>

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

          <MainContainer>
            <ConditionContainer>
              <ConditionText className="ConditionText">컨디션</ConditionText>
              {myCon === "1" && <ConImg img={one}></ConImg>}
              {myCon === "2" && <ConImg img={two}> </ConImg>}
              {myCon === "3" && <ConImg img={three}></ConImg>}
              {myCon === "4" && <ConImg img={four}></ConImg>}
              {myCon === "5" && <ConImg img={five}></ConImg>}
            </ConditionContainer>

            <TimeContainer>
              <TimeText className="ConditionText">수면시간</TimeText>
              <TimeText2 className="TimeText">
                {`${props.date.totalSleepHour} 시간 ${props.date.totalSleepMinute} 분`}
                ({props.date.startSleep} ~ {props.date.endSleep})
              </TimeText2>
            </TimeContainer>

            <TagContainer>
              <ConditionText className="ConditionText">태그</ConditionText>
              {props.date.tag.map((currentTag, idx) => {
                return <TagImg img={mapKeywordToImg[currentTag]}></TagImg>;
              })}
            </TagContainer>

            <Contents>
              <TimeText className="ConditionText">메모</TimeText>
              <MemoText className="TimeText">{props.date.memo}</MemoText>
            </Contents>
          </MainContainer>
        </ModalComponent>
      </React.Fragment>
    );
  }
};

const RightHeader = styled.div`
  /* background-color: blue; */
  display: flex;
  flex-direction: row;
  text-align: center;
  margin-top: 3%;
  justify-content: flex-end;
  width: 100%;
  height: 10%;
  padding-right: 3%;
  box-sizing: border-box;
`;
const ModalComponent = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  // border-radius: 20px;
  /* background-color: green; */
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 8%;
  margin-bottom: 5%;
  box-sizing: border-box;
  /* background-color: green; */
`;

//비어있을 때
const EmptyTextContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  margin-top: 15%;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

//컨디션
const ConditionContainer = styled.div`
  /* background-color: yellow; */
  width: 100%;
  height: 28%;
  display: flex;
  flex-direction: row;
  margin-bottom: 3.5%;
  box-sizing: border-box;
  align-items: center;
  @media (max-width: 280px) {
    margin-bottom: 1.5rem;
  }
`;

const ConditionText = styled.div`
  width: 25%;
  height: 100%;
  color: black;
  font-size: 17px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const MemoText = styled.div`
  width: 75%;
  height: 50%;
  color: black;
  font-size: 14px;
  /* margin: 5px 0px 0px 10px; */
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  overflow-y: scroll;
`;

const ConImg = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  width: 15%;
  height: 110%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  @media (max-width: 280px) {
    width: 13%;
  }
`;

//수면시간
const TimeContainer = styled.div`
  /* background-color: blue; */
  width: 90%;
  height: 7%;
  display: flex;
  margin-bottom: 3%;
  box-sizing: border-box;
  align-items: center;
  @media (max-width: 280px) {
    margin-bottom: 1.5rem;
  }
`;

const TimeText = styled.div`
  width: 30%;
  color: black;
  font-size: 17px;
  font-weight: bold;
`;

const TimeText2 = styled.div`
  width: 75%;
  color: black;
  font-size: 14px;
  /* margin: 5px 0px 0px 10px; */
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  @media (max-width: 280px) {
    font-size: 0.7rem;
  }
`;

//태그
const TagContainer = styled.div`
  /* background-color: pink; */
  width: 100%;
  height: 28%;
  display: flex;
  margin-bottom: 3%;
  box-sizing: border-box;
  align-items: center;
  @media (max-width: 280px) {
    margin-bottom: 0.8rem;
  }
`;

const TagImg = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
  width: 15%;
  height: 110%;

  display: flex;
  background-position: center;
  margin: 0px 2px 0px 2px;
  @media (max-width: 280px) {
    width: 13%;
  }
`;

const LeftHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  height: 13%;
  margin: 2% auto;
  text-align: center;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

const MoveDButton = styled.button`
display:flex;  
width: 15%;
  height: 100%;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  outline: none;
  justify-content: center;
  cursor: pointer;
  color: #4a5566;
  background-color: white;
  text-align: center;
  text-shadow: rgb(10 50 10 / 40%) 0.7px 0.7px 0.7px;
`;
const DText = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 100%;
  color: #4a5566;
  width: 68%;
  text-align: center;
  justify-content: center;
  height: 100%;
  margin-bottom:1.5%;
  align-items: center;
  border-radius: 10px;
  text-shadow: rgb(10 50 10 / 40%) 0.7px 0.7px 0.7px;
  
`;

const ModifyButton = styled.button`
  width: 16%;
  height: 100%;
  background-color: #4a5566;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  box-shadow: rgb(82 82 82/ 20%) 0px 5px 8px 0px;
  font-size: 80%;
  margin: 0px 1% 0px 0px;
  @media (max-width: 280px) {
    font-size: 0.5rem;
    padding: 3px 0;
  }
`;

const AddButton = styled.button`
  width: 16%;
  height: 103%;
  background-color: #4a5566;
  font-weight: bold;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  color: white;
  box-shadow: rgb(82 82 82/ 20%) 0px 5px 8px 0px;
  font-size: 80%;
  margin: 0px 1% 0px 0px;
`;

const EmptyText = styled.div`
  width: 100%;
  color: black;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  opacity: 40%;
`;

const Contents = styled.div`
  /* background-color: green; */
  width: 85%;
  height: 38%;
  color: black;
  font-weight: bold;
  display: flex;
  margin-bottom: 5%;
  box-sizing: border-box;
  align-items: baseline;
  overflow:auto;
  white-space:pre-wrap;
  word-break:break-all;
  
`;

export default MDetailPost;
