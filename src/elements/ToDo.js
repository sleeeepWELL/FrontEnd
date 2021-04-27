import React from "react";
import styled from "styled-components";

const ToDo = (props) => {
  return (
    <React.Fragment>
      <Container>
        <TopInfo>
          <div style={{ padding: "5px" }}>{props.condition}</div>
          <div style={{ padding: "5px" }}>{props.totalsleep}H</div>
        </TopInfo>
        <BottomInfo>{props.tag}</BottomInfo>
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
  width: 10rem;
  height: 6rem;
  background-color: white;
  border-radius: 8px;
  /* box-shadow: rgb(0 0 0 / 10%) 0px 4px 10px 0px; */
  flex-direction: column;
  justify-content: space-between;
  :hover {
    box-shadow: rgb(0 0 0 / 15%) 0px 4px 10px 0px;
    transition: box-shadow 0.2s ease-in 0s;
  }

  cursor: pointer;
`;

const TopInfo = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: space-between;
`;

const BottomInfo = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: flex-start;
  padding: 8px;
`;

export default ToDo;
