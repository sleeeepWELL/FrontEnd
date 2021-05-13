import React from "react";
import styled from "styled-components";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { useDispatch, useSelector } from "react-redux";

import beer from "../image/beer.png";
import snack from "../image/snack.png";
import work from "../image/work.png";
import workout from "../image/workout.png";

import beer_gray from "../image/beer_gray.png";
import snack_gray from "../image/snack_gray.png";
import work_gray from "../image/work_gray.png";
import workout_gray from "../image/workout_gray.png";

import one from "../image/1-conditions.png";
import two from "../image/2-conditions.png";
import three from "../image/3-conditions.png";
import four from "../image/4-conditions.png";
import five from "../image/5-conditions.png";

const ToDo = (props) => {
  const myTags = props.tag;
  const myTag = String(props.tag);

  const myCon = String(props.conditions);

  return (
    <React.Fragment>
      <Container>
        <TopInfo>
          {myCon === "1" && <ConImg src={one}></ConImg>}
          {myCon === "2" && <ConImg src={two}></ConImg>}
          {myCon === "3" && <ConImg src={three}></ConImg>}
          {myCon === "4" && <ConImg src={four}></ConImg>}
          {myCon === "5" && <ConImg src={five}></ConImg>}

          <SleepTime>
            {`${props.totalSleepHour}h`}
            <br />
            {`${props.totalSleepMinute}m`}
          </SleepTime>
        </TopInfo>
        <BottomInfo>
          <>
            {myTags.find((p) => p === "음주") ? (
              <TagImg src={beer}></TagImg>
            ) : (
              <TagImg src={beer_gray}></TagImg>
            )}
            {myTags.find((p) => p === "야식") ? (
              <TagImg src={snack}></TagImg>
            ) : (
              <TagImg src={snack_gray}></TagImg>
            )}
            {myTags.find((p) => p === "야근") ? (
              <TagImg src={work}></TagImg>
            ) : (
              <TagImg src={work_gray}></TagImg>
            )}
            {myTags.find((p) => p === "운동") ? (
              <TagImg src={workout}></TagImg>
            ) : (
              <TagImg src={workout_gray}></TagImg>
            )}
          </>
        </BottomInfo>
      </Container>
    </React.Fragment>
  );
};

ToDo.defaultProps = {};

const ConImg = styled.img`
  width: 45%;
  height: 90%;
`;

const TagImg = styled.img`
  width: 20%;
  height: 85%;
  display: flex;
`;

const SleepTime = styled.text`
  position: absolute;
  top: 17%;
  left: 42%;
  width: 100%;
  /* margin: auto; */
  /* display: flex; */
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  border-radius: 8px;
  /* box-shadow: rgb(0 0 0 / 10%) 0px 4px 10px 0px; */

  justify-content: center;

  /* :hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 4px 10px 0px;
    transition: box-shadow 0.2s ease-in 0s;
  } */

  cursor: pointer;
  position: relative;
`;

const TopInfo = styled.div`
  width: 100%;
  height: 70%;

  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: center;
`;

const BottomInfo = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 30%;
  justify-content: center;

  margin: 3px 0px 3px 0px;
  /* font-size: 2px; */
`;

export default ToDo;
