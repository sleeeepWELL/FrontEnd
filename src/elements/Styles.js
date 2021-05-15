import React from "react";
import styled from "styled-components";

// 스타일을 이렇게 파일 하나에 몰아두면 편히 관리할 수 있어요! :)

// 겉 껍데기 담당
/**
 * props
 *  - flex_direction : string ㅣ row = 가로로 쌓기, column = 세로로 쌓기 (만약 값 없다면?->가로가 기본이 됩니다.)
 *  - border : string | border 속성 넣기(ex: 1px solid #dddddd)
 *  - bg: string | #aaaaaa = # + 헥사코드 (ex: #ffffff)
 *  - width: string | 1em, 1px, 1% 등 넓이 값 (기본 값: 100%;)
 *  - height: string | 1em, 1px, 1% 등 높이 값 (기본 값: 100%;)
 *  - is_root : boolean | true = 최상위 div, false = 최상위 아님
 *  - margin : (default = false) string | margin 값
 *  - padding : (default = false) string | padding 값
 */
const Grid = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${(props) =>
    props.flex_direction === "column" ? "column" : "row"};
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  width: ${(props) => (props.width ? props.width : "100%")};
  min-width: 50px;
  height: ${(props) => (props.height ? props.height : "100%")};
  align-items: center;
  justify-content: ${(props) =>
    props.justify_contents ? props.justify_contents : "flex-start"};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.is_root ? `width: 100vw; height: 100vh;` : "")}
  ${(props) =>
    props.hover ? `&:hover{cursor: pointer; background-color: #44444455;}` : ""}
`;

// 버튼
/**
 * props
 *  - flex_direction : string ㅣ row = 가로로 쌓기, column = 세로로 쌓기 (만약 값 없다면?->가로가 기본이 됩니다.)
 *  - bg : boolean | true = 배경색 있는 버전, false = 배경색 없는 버전
 *  - float : boolean | true = 플로팅 버튼 bottom, right 속성 사용해서 위치 조절
 */
const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 35%;
  cursor: pointer;
  ${(props) => props.bg && "background-color: #ff4d4d; color: #fff;"}
  ${(props) =>
    props.float &&
    `position: fixed; z-index: 10; right: ${props.right}; bottom: ${props.bottom};`}
`;

// text 담당
/**
 * props
 *  - type : string | title = 제목글(큰 글씨 + 볼드), contents = 내용글(중간 글씨), label = 라벨(작은 글씨)
 *  - bold : boolean | true면 볼드 줌, false면 볼드 안줌
 */
const Text = (props) => {
 

  if (props.type === "contents") {
    return <P>{props.children}</P>;
  }

  if (props.type === "week") {
    return <Week>{props.children}</Week>;
  }

  if (props.type === "label") {
    return <Span>{props.children}</Span>;
  }

  if (props.type === "sun") {
    return <Sun>{props.children}</Sun>;
  }

  if (props.type === "sat") {
    return <Sat>{props.children}</Sat>;
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};



const P = styled.p`
  margin: 0px;
  font-size: 1em;
`;

const Span = styled.span`
  margin: 0px;
  font-size: 0.8em;
  color: #888;
`;

const Sun = styled.span`
  margin: 0px;
  font-size: 0.9em;
  font-weight: bold;
  color: #C7A2A2;
`;

const Sat = styled.span`
  margin: 0px;
  font-size: 0.9em;
  font-weight: bold;
  color: #B8C5E9;
`;

const Week = styled.span`
  margin: 0px;
  font-size: 0.9em;
  font-weight: bold;
  color: white;
`;

// input 스타일!
const Input = styled.input`
  width: 100%;
  border: 1px solid #888;
  padding: 2px 4px;
  margin: 8px;
`;

export { Grid, Button, Text, Input };
