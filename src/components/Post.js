import React from "react";
import styled from "styled-components";

const Post = (props) => {
  return (
    <React.Fragment>
      <Container>
        <TopInfoBox>
          <div style={{ marginLeft: "1rem", fontWeight: "bold" }}>
            {props.createdAt}
          </div>
          <div style={{ marginRight: "1rem", fontWeight: "bold" }}>
            {props.sleeptime}H
          </div>
        </TopInfoBox>
        <BottomInfoBox>
          {props.tag.map((p, idx) => {
            return (
              <Tag key={idx} {...p}>
                {p}
              </Tag>
            );
          })}
        </BottomInfoBox>
      </Container>
    </React.Fragment>
  );
};

Post.defaultProps = {
  createdAt: "2020-02-20",
  sleeptime: 4,
  tag: ["음주", "운동", "야근"],
};

const Container = styled.div`
  width: 20rem;
  background-color: #c6c4c4;
  max-height: 7rem;
`;

const TopInfoBox = styled.div`
  display: flex;
  width: 100%;
  height: 2.3rem;
  justify-content: space-between;
  padding-top: 10px;
  align-items: center;
`;

const BottomInfoBox = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  align-items: center;
`;

const Tag = styled.div`
  display: flex;
  width: 5rem;
  height: 2rem;
  background-color: #9c8bdf;
  margin: 0px 1rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default Post;
