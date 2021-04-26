import React from "react";
import { Grid, Button, Text, Input } from "../elements/Styles";
import moment from "moment";
import styled from "styled-components";

// 임포트 해오기!
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../redux/modules/todo";

const CalendarWrite = (props) => {
  const dispatch = useDispatch();

  // 작성할 내용과 시간을 ref로 넣을거예요. :)
  const [contents, setContents] = React.useState("");
  const datetime = React.useState("");

  const changeContents = (e) => {
    setContents(e.target.value);
    console.log(e.target.value);
  };

  // // 내용 없으면 경고!
  // if (contents.current.value === "") {
  //   window.alert("내용을 입력해주세요!");
  //   return;
  // }

  // // 일시 없으면 경고!
  // if (datetime.current.value === "") {
  //   window.alert("날짜를 입력해주세요!");
  //   return;
  // }

  const writeTodo = () => {
    // 콘솔로 내가 선택한 데이터가 잘 왔나 확인해볼까요? :)
    // console.log(contents.current.value);
    // console.log(datetime.current.value);

    // let _new_todo = {
    //   todo_id: "dummy_id1111", // 아이디는 나중에 디비에 저장되면, 그때 가져와야죠! 일단 가짜로 둡니다!
    //   datetime: moment(datetime.current.value).format("YYYY-MM-DD hh:mm:ss"), // 우리 데이터 형식대로 맞춰줍니다.
    //   contents: contents.current.value,
    //   completed: false, // 지금 만들었으니 당연히 false겠죠!
    // };

    // console.log(_new_todo);

    // 리덕스에 넣자!
    dispatch(addTodo(contents));
    // 추가로 하나만 더! 일정을 추가했으면 원래 페이지로 돌아가야죠! replace 사용해봅시다!
    props.history.replace("/calendar");
  };

  return (
    <Grid margin="auto" flex_direction="column" width="80vw" height="80vh">
      <Text type="title">일정 만들기</Text>
      <Grid
        bg="#ffffff"
        flex_direction="column"
        width="80vw"
        padding="16px"
        margin="8px auto"
      >
        <Text type="label">- 내용 -</Text>
        <Input type="text" onChange={changeContents} />

        <Text type="label">- 날짜 -</Text>
        <Input type="datetime-local" ref={datetime} />

        <Button onClick={writeTodo}>일정 추가하기</Button>
      </Grid>
    </Grid>
  );
};

export default CalendarWrite;
