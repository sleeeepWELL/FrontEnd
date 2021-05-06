import React from "react";
import styled from "styled-components";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { useDispatch, useSelector } from "react-redux";

import beer from "../image/beer.jpg";
import overeat from "../image/overeat.jpg";
import work from "../image/work.jpg";
import workout from "../image/workout.jpg";

import beer_gray from "../image/beer_gray.jpg";
import overeat_gray from "../image/overeat_gray.jpg";
import work_gray from "../image/work_gray.jpg";
import workout_gray from "../image/workout_gray.jpg";

import one from "../image/1-condition.jpg";
import two from "../image/2-condition.jpg";
import three from "../image/3-condition.jpg";
import four from "../image/4-condition.jpg";
import five from "../image/5-condition.jpg";

//글씨 이미지로 바꾸기
// const mapKeywordToImg = {
//   음주: beer,
//   야식: overeat,
//   야근: work,
//   운동: workout,
// };

// const mapKeywordToGrayImg = {
//   음주: beer_gray,
//   야식: overeat_gray,
//   야근: work_gray,
//   운동: workout_gray,
// };

// const TotalTags = ["음주", "야식", "야근", "운동"];

const ToDo = (props) => {
  const myTags = props.tag;
  const myTag = String(props.tag);

  const myCon = String(props.conditions);

  return (
    <React.Fragment>
      <Container>
        <TopInfo>
          <div style={{ padding: "5px" }}>
            {myCon === "1" && <img width="20px" height="20px" src={one}></img>}
            {myCon === "2" && <img width="20px" height="20px" src={two}></img>}
            {myCon === "3" && (
              <img width="20px" height="20px" src={three}></img>
            )}
            {myCon === "4" && <img width="20px" height="20px" src={four}></img>}
            {myCon === "5" && <img width="20px" height="20px" src={five}></img>}
          </div>
          <div style={{ padding: "5px" }}>
            {`${props.totalSleepHour}H ${props.totalSleepMinute} M`}
          </div>
        </TopInfo>
        <BottomInfo>
          {/* <div>
            {props.tag.map((currentTag, idx) => {
              return (
                <img
                  key={idx}
                  width="20px"
                  height="20px"
                  src={mapKeywordToImg[currentTag]}
                ></img>
              );
            })}
          </div> */}

          <div>
            {myTags.find((p) => p === "음주") ? (
              <img
                // key={idx}
                width="20px"
                height="20px"
                src={beer}
              ></img>
            ) : (
              <img
                // key={idx}
                width="20px"
                height="20px"
                src={beer_gray}
              ></img>
            )}
            {myTags.find((p) => p === "야식") ? (
              <img
                // key={idx}
                width="20px"
                height="20px"
                src={overeat}
              ></img>
            ) : (
              <img
                // key={idx}
                width="20px"
                height="20px"
                src={overeat_gray}
              ></img>
            )}
            {myTags.find((p) => p === "야근") ? (
              <img
                // key={idx}
                width="20px"
                height="20px"
                src={work}
              ></img>
            ) : (
              <img
                // key={idx}
                width="20px"
                height="20px"
                src={work_gray}
              ></img>
            )}
            {myTags.find((p) => p === "운동") ? (
              <img
                // key={idx}
                width="20px"
                height="20px"
                src={workout}
              ></img>
            ) : (
              <img
                // key={idx}
                width="20px"
                height="20px"
                src={workout_gray}
              ></img>
            )}
          </div>
        </BottomInfo>
      </Container>
    </React.Fragment>
  );
};

ToDo.defaultProps = {};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  /* background-color: pink; */
  border-radius: 8px;
  /* box-shadow: rgb(0 0 0 / 10%) 0px 4px 10px 0px; */

  justify-content: center;

  :hover {
    box-shadow: rgb(0 0 0 / 15%) 0px 4px 10px 0px;
    transition: box-shadow 0.2s ease-in 0s;
  }

  cursor: pointer;
  position: relative;
`;

const TopInfo = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  /* justify-content: center; */
`;

const BottomInfo = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  /* justify-content: center; */

  /* font-size: 2px; */
  background-color: white;
`;

export default ToDo;
