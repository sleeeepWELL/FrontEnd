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
<<<<<<< HEAD
          <div style={{ padding: "5px" }}>
            {myCon === "1" && (
              <img width="20px" height="20px" src={one} alt="condition"></img>
            )}
            {myCon === "2" && (
              <img width="20px" height="20px" src={two} alt="condition"></img>
            )}
            {myCon === "3" && (
              <img width="20px" height="20px" src={three} alt="condition"></img>
            )}
            {myCon === "4" && (
              <img width="20px" height="20px" src={four} alt="condition"></img>
            )}
            {myCon === "5" && (
              <img width="20px" height="20px" src={five} alt="condition"></img>
            )}
          </div>
          <div style={{ padding: "5px", color: "white" }}>
=======
          <div style={{ padding: "1px" }}>
            {myCon === "1" && <img width="30%" height="50%" src={one}></img>}
            {myCon === "2" && <img width="30%" height="50%" src={two}></img>}
            {myCon === "3" && <img width="30%" height="50%" src={three}></img>}
            {myCon === "4" && <img width="30%" height="50%" src={four}></img>}
            {myCon === "5" && <img width="30%" height="50%" src={five}></img>}
        
         
>>>>>>> kyu0507
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
                width="21%"
                height="90%"
                src={beer}
                alt="tag"
              ></img>
            ) : (
              <img
                // key={idx}
                width="21%"
                height="90%"
                src={beer_gray}
                alt="tag"
              ></img>
            )}
            {myTags.find((p) => p === "야식") ? (
              <img
                // key={idx}
                width="21%"
                height="90%"
                src={overeat}
                alt="tag"
              ></img>
            ) : (
              <img
                // key={idx}
                width="21%"
                height="90%"
                src={overeat_gray}
                alt="tag"
              ></img>
            )}
            {myTags.find((p) => p === "야근") ? (
              <img
                // key={idx}
                width="21%"
                height="90%"
                src={work}
                alt="tag"
              ></img>
            ) : (
              <img
                // key={idx}
                width="21%"
                height="90%"
                src={work_gray}
                alt="tag"
              ></img>
            )}
            {myTags.find((p) => p === "운동") ? (
              <img
                // key={idx}
                width="21%"
                height="90%"
                src={workout}
                alt="tag"
              ></img>
            ) : (
              <img
                // key={idx}
                width="21%"
                height="90%"
                src={workout_gray}
                alt="tag"
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

  border-radius: 8px;
  /* box-shadow: rgb(0 0 0 / 10%) 0px 4px 10px 0px; */

  justify-content: center;

  :hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 4px 10px 0px;
    transition: box-shadow 0.2s ease-in 0s;
  }

  cursor: pointer;
  position: relative;
`;

const TopInfo = styled.div`
  width: 100%;
  height: 50%;
  font-size: 2px;
  background-color: white;
  display: flex;
  flex-direction: row;
`;

const BottomInfo = styled.div`
  display: flex;
  width:100%;
  height: 50%;
  /* justify-content: center; */
 background-color: white;
 margin-top: 3px;
  /* font-size: 2px; */
`;

export default ToDo;
