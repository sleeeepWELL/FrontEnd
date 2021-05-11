import React, { useEffect } from "react";
import ConditionChart from "../components/ConditionChart";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/result";

const PracAnalysis = () => {
  return (
    <React.Fragment>
      <Container>
        <ConditionChart />
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: 50%;
`;

export default PracAnalysis;
