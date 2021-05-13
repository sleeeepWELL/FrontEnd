import React, { useEffect } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/result";
import "./Font.css";

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
        colors={["#F27153", "#F29846", "#EAE35E", "#81D3A2", "#309EB7"]}
        minValue={1}
        maxValue={5}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        // monthSpacing={5}
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
        <One /> <Text className="TimeText2">매우 나쁨</Text> <Two />{" "}
        <Text className="TimeText2">나쁨</Text>
        <Three /> <Text className="TimeText2">보통</Text>
        <Four /> <Text className="TimeText2">좋음</Text>
        <Five /> <Text className="TimeText2">매우 좋음</Text>
      </ColorBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 100px;
  height: 60%;
  font-size: 14px;
`;

const One = styled.div`
  width: 20px;
  height: 20px;
  background-color: #f27153;
  display: flex;
`;

const Two = styled.div`
  width: 20px;
  height: 20px;
  background-color: #f29846;
  display: flex;
`;

const Three = styled.div`
  width: 20px;
  height: 20px;
  background-color: #eae35e;
  display: flex;
`;

const Four = styled.div`
  width: 20px;
  height: 20px;
  background-color: #81d3a2;
  display: flex;
`;

const Five = styled.div`
  width: 20px;
  height: 20px;
  background-color: #309eb7;
  display: flex;
`;

const ColorBox = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: space-evenly;
`;

const Text = styled.div`
  font-size: 14px;
`;
export default ConditionChart;
