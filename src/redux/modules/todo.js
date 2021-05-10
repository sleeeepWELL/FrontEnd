import moment from "moment";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";
import { config } from "../../shared/config";
import { createAction, handleActions } from "redux-actions";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";

const LOAD = "LOAD";
const LOADDAILY = "LOADDAILY";
const ADD = "ADD";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const CHANGE_TODAY = "CHANGE_TODAY";

const loadTodo = createAction(LOAD, (todo_list) => ({ todo_list }));
const loadOneTodo = createAction(LOADDAILY, (day_list) => ({ day_list }));
const addTodo = createAction(ADD, (todo_data) => ({ todo_data }));
const updateTodo = createAction(UPDATE, (date, data) => ({ date, data })); //이거 조심
const deleteTodo = createAction(DELETE, (date) => ({ date }));
const changeToday = createAction(CHANGE_TODAY, (date) => ({ date }));

const initialState = {
  today: moment(),
  day_list: [
    {
      id: 2,
      startSleep: "00:00",
      endSleep: "09:00",
      totalSleepHour: 540,
      totalSleepMinute: 540,
      tag: ["운동", "음주"],
      conditions: "First_View",
      memo: "오늘은 즐거웠다",
      selectedAt: "2021-04-29",
    },
  ],
  todo_list: [
    {
      id: 5,
      startSleep: "00:00:00",
      endSleep: "09:00:00",
      totalSleep: 9,
      tag: ["운동", "음주"],
      conditions: 1,
      selectedAt: "2021-04-25",
    },
  ],
};

const getAllPostAX = () => {
  return function (dispatch) {
    console.log(axios.defaults);
    const _token= localStorage.getItem("token")
    let token = {
      headers : { Authorization: `Bearer ${_token}`}
    }

    axios
      .get(`${config.test_api}/cards/calendars`, token)
      // .get(`${config.api}/cards/calendars`)
      .then((response) => {
        let todo_list = [];
        response.data.forEach((_item) => {
          let content = {
            id: _item.id,
            startSleep: _item.startSleep,
            endSleep: _item.endSleep,
            totalSleepHour: _item.totalSleepHour,
            totalSleepMinute: _item.totalSleepMinute,
            tag: _item.tag,
            conditions: _item.conditions,
            selectedAt: _item.selectedAt,
          };
          todo_list.unshift(content);
        });
        dispatch(loadTodo(todo_list));
      })
      .catch((err) => {
        console.log("캘린더 리스트 정보 불러오기 에러", err);
      });
     
  };
};

const getOnePostAX = (selectedAt) => {
  return function (dispatch) {
    axios
      .get(`${config.test_api}/cards/${selectedAt}`,config.token)
      // .get(`${config.api}/cards/${selectedAt}`)
      .then((response) => {
        dispatch(loadOneTodo(response.data));
      })
      .catch((err) => {
        console.log("가져오기 에러", err);
      });
  };
};

const addPostAX = (post) => {
  console.log(axios.data);
  return function (dispatch) {
    let data = {
      startSleep: post.startSleep,
      endSleep: post.endSleep,
      tag: post.tag,
      conditions: post.conditions,
      memo: post.memo,
      selectedAt: post.selectedAt,
    };

    axios
      .post(`${config.test_api}/cards`, data,config.token)
      .then((response) => {
        dispatch(addTodo(post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const editPostAX = (post) => {
  console.log(post);
  return function (dispatch) {
    let data = {
      startSleep: post.startSleep,
      endSleep: post.endSleep,
      tag: post.tag,
      conditions: post.conditions,
      memo: post.memo,
    };
    axios
      .put(`${config.test_api}/cards/${post.selectedAt}`, data,config.token)
      // .put(`${config.api}/cards/${post.selectedAt}`, data)
      .then((response) => {
        let data2 = {
          id: post.id,
          startSleep: post.startSleep,
          endSleep: post.endSleep,
          totalSleepHour: post.totalSleepHour,
          totalSleepMinute: post.totalSleepMinute,
          tag: post.tag,
          conditions: post.conditions,
          memo: post.memo,
          selectedAt: post.selectedAt,
        };
        dispatch(updateTodo(post.selectedAt, data2));
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  };
};

const removePostAX = (selectedAt) => {
  return function (dispatch) {
    axios.delete(`${config.test_api}/cards/${selectedAt}`,config.token).then((reponse) => {
      // axios.delete(`${config.api}/cards/${selectedAt}`).then((reponse) => {
      dispatch(deleteTodo(selectedAt));
    });
  };
};

// 리듀서
export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.todo_list = action.payload.todo_list;
      }),
    [LOADDAILY]: (state, action) =>
      produce(state, (draft) => {
        draft.day_list = action.payload.day_list;
      }),
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.todo_list.unshift(action.payload.todo_data);
        draft.day_list = action.payload.todo_data;
      }),
    [UPDATE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.todo_list.findIndex(
          (d) => d.selectedAt === action.payload.date
        );
        draft.todo_list[idx] = {
          ...draft.todo_list[idx],
          ...action.payload.data,
        };
        draft.day_list = action.payload.data;
      }),
    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        draft.todo_list = draft.todo_list.filter((p) => {
          if (p.selectedAt !== action.payload.date) {
            return [...draft.todo_list, p];
          }
        });
        let _date = `{"selectedAt":${action.payload.date}}`;
        draft.day_list = _date;
      }),
    [CHANGE_TODAY]: (state, action) =>
      produce(state, (draft) => {
        return { ...draft, today: moment(action.payload.date) };
      }),
  },
  initialState
);

const actionCreators = {
  loadTodo,
  loadOneTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  changeToday,
  getAllPostAX,
  getOnePostAX,
  addPostAX,
  editPostAX,
  removePostAX,
};

export { actionCreators };
