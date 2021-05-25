import React from "react";
import styled from "styled-components";
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
        <BottomInfo>
          <TagContainer>
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
          </TagContainer>
        </BottomInfo>
      </Container>
    </React.Fragment>
  );
};

ToDo.defaultProps = {};

const ConImg = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  width: 50%;
  height: 100%;
  background-repeat: no-repeat;
  display: flex;
  position: absolute;
  background-position: center;
  padding: 2px;
  border-radius: 50%;
`;

const TopInfo = styled.div`
  width: 100%;
  height: 74%;
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
  /* border: 1px solid black; */
  @media (max-height: 750px) {
    width: 60%;
    height: 98%;
  }
`;

const Total = styled.div`
  display: flex;
  margin-top: 0.5vh;
  @media (max-height: 750px) {
    width: 80%;
    height: 42%;
    margin-top: 5%;
    font-size: 75%;
    justify-content: center;
  }
`;

const TotalMin = styled.div`
  display: flex;
  margin-bottom: 0.5vh;
  /* border: 1px solid black; */
  @media (max-height: 750px) {
    height: 52%;
    width: 80%;
    font-size: 50%;
    justify-content: center;
  }
`;

const TagImg = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
  width: 20%;
  height: 80%;
  display: flex;
  background-position: center;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* border: 1px solid black; */
`;

const BottomInfo = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
  margin: 2px 0px 7px 0px;
  box-sizing: border-box;
  /* background-color: yellow; */
  @media (max-height: 750px) {
    width: 100%;
    height: 35%;
    margin: 2px 0px 2% 0px;
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

export default ToDo;
