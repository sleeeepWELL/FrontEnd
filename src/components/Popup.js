import React from "react";
import { Grid, Button, Text, Input } from "../elements/Styles";
import moment from "moment";

import styled from "styled-components";

// 임포트 해오기!
import { useSelector, useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../redux/modules/todo";

const Popup = (props) => {
  const dispatch = useDispatch();

  const { type, selected_todo, _showPopup } = props;

  const contents = React.useRef(null);
  const datetime = React.useRef(null);

  // 팝업 타입이 todo_detail일 경우!
  if (type === "todo_detail") {
    if (!selected_todo) {
      return null;
    }
    return (
      <Dim
        onClick={(e) => {
          // 팝업 닫기!
          props._showPopup(false);
        }}
      >
        <Grid
          bg="#ffffff"
          width="50vw"
          margin="auto"
          height="auto"
          padding="16px"
          onClick={(e) => {
            // 이벤트 전파를 막아줘요! 2주차 과제 하실 때 본 칭구들! :)
            e.stopPropagation();
          }}
        >
          <Grid flex_direction="column">
            <Grid padding="0px 0px 8px 0px" justify_contents="space-between">
              <Text type="title">일정 상세보기</Text>
              {!selected_todo.completed && (
                <Button
                  onClick={() => {
                    //   완료 데이터를 만들어줄거예요.
                    let update_data = { ...selected_todo, completed: true };

                    //   그리고 데이터 수정하는 함수를 불러다가 수정!
                    dispatch(
                      updateTodo(
                        moment(selected_todo.datetime).format("YYYY-MM-DD"),
                        selected_todo.todo_id,
                        update_data
                      )
                    );
                    _showPopup(false);
                  }}
                >
                  완료
                </Button>
              )}
            </Grid>
            <Grid flex_direction="column">
              <Text type="label">내용</Text>
              <Input
                type="text"
                placeholder={selected_todo.contents}
                ref={contents}
              />
              <Text type="label">일자</Text>
              <Input
                type="datetime-local"
                placeholder={selected_todo.datetime}
                ref={datetime}
              />
            </Grid>
            <Grid></Grid>
            <Grid
              border="1px 0px 0px 0px solid #888"
              justify_contents="space-between"
            >
              <Button
                bg
                onClick={() => {
                  dispatch(
                    deleteTodo(
                      moment(selected_todo.datetime).format("YYYY-MM-DD"),
                      selected_todo.todo_id
                    )
                  );
                  _showPopup(false);
                }}
              >
                삭제
              </Button>
              <Button
                onClick={() => {
                  //   수정할 데이터를 만들어줄거예요.
                  let update_data = {};
                  //   입력한 내용이 없으면 그대로 유지!
                  let _contents =
                    contents.current.value === ""
                      ? selected_todo.contents
                      : contents.current.value;
                  let _datetime =
                    datetime.current.value === ""
                      ? selected_todo.datetime
                      : datetime.current.value;

                  //   수정할 데이터를 만들어요!
                  update_data = {
                    ...selected_todo,
                    contents: _contents,
                    datetime: moment(_datetime).format("YYYY-MM-DD hh:mm:ss"),
                  };

                  dispatch(
                    updateTodo(
                      moment(selected_todo.datetime).format("YYYY-MM-DD"),
                      selected_todo.todo_id,
                      update_data
                    )
                  );
                  _showPopup(false);
                }}
              >
                수정
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dim>
    );
  }

  return null;
};

Popup.defaultProps = {
  type: "alert",
  selected_todo: null,
  _showPopup: () => {},
};

// background: #00000055; <- 앗 해쉬가 8글자? :) 6글자는 컬러를, 뒤의 두글자는 투명도를 나타냅니다.
const Dim = styled.div`
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #00000055;
`;

export default Popup;
