import React from "react";
import styled from "styled-components";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { useDispatch, useSelector } from "react-redux";
import "../components/Font.css";

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
          {myCon === "1" && <ConImg img={one}> </ConImg>}
          {myCon === "2" && <ConImg img={two}></ConImg>}
          {myCon === "3" && <ConImg img={three}></ConImg>}
          {myCon === "4" && <ConImg img={four}></ConImg>}
          {myCon === "5" && <ConImg img={five}></ConImg>}

          <SleepTime className="SleepTime">{`${props.totalSleepHour}h`}</SleepTime>

          <SleepMin className="SleepMin">{`${props.totalSleepMinute}m`}</SleepMin>
        </TopInfo>
        <BottomInfo>
          <>
            {myTags.find((p) => p === "음주") ? (
              <TagImg img={beer}></TagImg>
            ) : (
              <TagImg img={beer_gray}></TagImg>
            )}
            {myTags.find((p) => p === "야식") ? (
              <TagImg img={snack}></TagImg>
            ) : (
              <TagImg img={snack_gray}></TagImg>
            )}
            {myTags.find((p) => p === "야근") ? (
              <TagImg img={work}></TagImg>
            ) : (
              <TagImg img={work_gray}></TagImg>
            )}
            {myTags.find((p) => p === "운동") ? (
              <TagImg img={workout}></TagImg>
            ) : (
              <TagImg img={workout_gray}></TagImg>
            )}
          </>
        </BottomInfo>
      </Container>
    </React.Fragment>
  );
};

ToDo.defaultProps = {};

const ConImg = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  display: flex;
  position: relative;
  background-position: center;
`;

const TagImg = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
  width: 12%;
  height: 100%;

  display: flex;
  justify-content: center;
  margin: 0px 2px 0px 2px;
`;

const SleepTime = styled.h6`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  right: 0;
  text-align: center;

  top: -70%;
  left: 8%;
  transform: translate(-5%, -8%);

  font-weight: 700;
  color: white;
`;

const SleepMin = styled.h6`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  right: 0;
  text-align: center;

  top: -20%;
  left: 10%;
  transform: translate(-5%, -10%);

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

  /* justify-content: center; */
  align-items: center;
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
  /* align-items: center; */
  margin: 0px 0px 5px 0px;
`;

const BottomInfo = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 30%;
  justify-content: center;

  margin: 0px 0px 9px 0px;
  /* font-size: 2px; */
`;

export default ToDo;
