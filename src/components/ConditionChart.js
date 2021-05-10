import React, { useEffect } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/result";

const ConditionChart = (props) => {
  const dispatch = useDispatch();

  const condition = useSelector((state) => state.result.condition);
  console.log(condition);

  useEffect(() => {
    dispatch(todoActions.getConditionAX());
  }, []);

  return (
    <Container>
      <ResponsiveCalendar
        data={condition}
        from="2021-01-01"
        to="2021-12-31"
        emptyColor="#eeeeee"
        colors={["#FF0000", "#FF9100", "#FFDC3C", "#80E12A", "#1E821E"]}
        minValue={1}
        maxValue={5}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />

      <ColorBox>
        <One /> 매우 나쁨 <Two /> 나쁨
        <Three /> 보통
        <Four />
        좋음 <Five /> 매우 좋음
      </ColorBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 400px;
`;

const One = styled.div`
  width: 20px;
  height: 20px;
  background-color: red;
  display: flex;
`;

const Two = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  display: flex;
`;

const Three = styled.div`
  width: 20px;
  height: 20px;
  background-color: yellow;
  display: flex;
`;

const Four = styled.div`
  width: 20px;
  height: 20px;
  background-color: yellowgreen;
  display: flex;
`;

const Five = styled.div`
  width: 20px;
  height: 20px;
  background-color: green;
  display: flex;
`;

const ColorBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: space-evenly;
`;

export default ConditionChart;
