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

const MToDo = (props) => {
  const myTags = props.tag;
  const myTag = String(props.tag);

  const myCon = String(props.conditions);

  return (
    <React.Fragment>
      <Container>
        <TopInfo>
          <SleepTime>
            <Total className="SleepTime">{`${props.totalSleepHour}h`}</Total>
            <TotalMin className="SleepMin">
              {`${props.totalSleepMinute}m`}
            </TotalMin>
          </SleepTime>
          {myCon === "1" && <ConImg img={one}></ConImg>}
          {myCon === "2" && <ConImg img={two}></ConImg>}
          {myCon === "3" && <ConImg img={three}></ConImg>}
          {myCon === "4" && <ConImg img={four}></ConImg>}
          {myCon === "5" && <ConImg img={five}></ConImg>}
        </TopInfo>
      </Container>
    </React.Fragment>
  );
};

MToDo.defaultProps = {};

const ConImg = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  display: flex;
  position: absolute;
  background-position: center;
  padding: 1.3%;
  margin-bottom: 4%;
`;

const TopInfo = styled.div`
  width: 80%;
  height: 100%;

  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  /* background-color: blue; */
`;

const SleepTime = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  color: black;
  z-index: 1;

  border: 1px solid black;
`;

const Total = styled.div`
  display: flex;
  font-size: 1.7vh;
  margin-top: 0.5vh;
  margin-bottom: 0.15vh;
  /* border: 1px solid blue; */
`;

const TotalMin = styled.div`
  display: flex;
  font-size: 1.2vh;
  margin-bottom: 0.7vh;
  margin-top: 0.15vh;
  /* border: 1px solid blue; */
`;

const TagImg = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;

  display: flex;
  background-position: center;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* border: 1px solid black; */
`;

const BottomInfo = styled.div`
  display: flex;

  width: 30%;
  height: 90%;
  margin: 0% 4% 15% 0%;
  box-sizing: border-box;
  /* background-color: yellow; */
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  border-radius: 8px;
  /* box-shadow: rgb(0 0 0 / 10%) 0px 4px 10px 0px; */

  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  /* background-color: pink; */
`;

export default MToDo;
