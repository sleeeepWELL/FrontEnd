import React from "react";
import styled from "styled-components";
import { actionCreators as todoActions } from "../redux/modules/todo";
import { useDispatch, useSelector } from "react-redux";

import beer from "../image/beer.jpg";
import overeat from "../image/overeat.jpg";
import work from "../image/work.jpg";
import workout from "../image/workout.jpg";

const ToDo = (props) => {
  //태그 배열을 string 값으로
  const myTags = props.tag;
  console.log(myTags);
  const beer_icon = beer;
  return (
    <React.Fragment>
      <Container>
        <TopInfo>
          <div style={{ padding: "5px" }}>{props.condition}</div>
          <div style={{ padding: "5px" }}>{props.totalsleep}H</div>
        </TopInfo>
        <BottomInfo>{props.tag}</BottomInfo>
        <TagImg src={beer_icon}></TagImg>
      </Container>
    </React.Fragment>
  );
};

ToDo.defaultProps = {
  totalsleep: 9,
  condition: "😄",
  tag: ["🍻", "💪", "💻"],
  memo: "힘든 날이었다.",
  createdAt: "2021-04-02",
  completed: false,
};

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

const TagImg = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
`;

export default ToDo;
