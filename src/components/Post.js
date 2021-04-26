import React from "react";
import styled from "styled-components";

const Post = (props) => {
  return (
    <React.Fragment>
      <Container>
        <TopInfoBox>
          <div>{props.createdAt}</div>
          <div>{props.sleeptime}</div>
        </TopInfoBox>
        <BottomInfoBox>
          {props.tag.map((p, idx) => {
            return <Tag key={idx} {...p} />;
          })}
        </BottomInfoBox>
      </Container>
    </React.Fragment>
  );
};

Post.defaultProps = {
  createdAt: "2020-02-20",
  sleeptime: "4H",
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
  height: auto;
  justify-content: space-between;
  padding-top: 10px;
`;

const BottomInfoBox = styled.div`
  width: 100%;
  height: 3rem;
`;

const Tag = styled.div`
  width: 5rem;
  background-color: green;
`;

export default Post;
