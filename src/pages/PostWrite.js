import React from "react";
import styled from "styled-components";

const PostWrite = (props) => {
  return (
    <React.Fragment>
      <Wrap>
        <SettingContainer>날짜, 취침시간, 기상시간, 컨디션</SettingContainer>
        <TagContainer>태그선택</TagContainer>
        <MemoContainer>메모 입력</MemoContainer>
        <BtnContainer>Ok, cancel 버튼</BtnContainer>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 40rem;
  height: 40rem;
  background-color: #c6c4c4;
`;

const SettingContainer = styled.div`
  width: 100%;
  height: 15rem;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 5rem;
`;

const MemoContainer = styled.div`
  width: 100%;
  height: 15rem;
`;

const BtnContainer = styled.div`
  width: 100%;
  height: 5rem;
`;

export default PostWrite;
