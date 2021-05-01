import moment from "moment";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";
import { config } from "../../shared/config";
import { createAction, handleActions } from "redux-actions";

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
const deleteTodo = createAction(DELETE, (todo_id) => ({ todo_id }));
const changeToday = createAction(CHANGE_TODAY, (date) => ({ date }));

const initialState = {
  today: moment(),
  day_list: [
    {
      id: 5,
      startSleep: "00:00",
      endSleep: "09:00",
      totalSleepHour: 540,
      totalSleepMinute: 540,
      tag: ["운동", "음주"],
      conditions: 1,
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
    {
      id: 4,
      startSleep: "00:00:00",
      endSleep: "09:00:00",
      totalSleep: 9,
      tag: ["운동", "음주"],
      conditions: 1,
      selectedAt: "2021-04-26",
    },
    {
      id: 7,
      startSleep: "00:00:00",
      endSleep: "09:00:00",
      totalSleep: 9,
      tag: ["운동", "음주"],
      conditions: 1,
      selectedAt: "2021-04-27",
    },
  ],
};

const getAllPostAX = () => {
  return function (dispatch) {
    console.log(axios.defaults);
    axios
      .get(`${config.api}/calendars`)
      .then((response) => {
        console.log(response);
        console.log(axios.default)
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
        console.log(err);
      });
  };
};

const getOnePostAX = (selectedAt) => {
  console.log(selectedAt);
  return function (dispatch) {
    axios
      .get(`${config.api}/cards/${selectedAt}`)
      .then((response) => {
        console.log(response.data);
        

        dispatch(loadOneTodo(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addPostAX = (post) => {
  console.log(axios.defaults)
  let _day =post.selectedAt.slice(14,24);
  console.log(_day);
  return function (dispatch) {
    
    let data = {
      startSleep: post.startSleep,
      endSleep: post.endSleep,
      tag: post.tag,
      conditions: post.conditions,
      memo: post.memo,
      selectedAt: _day,
    };
    console.log(data);
    axios
      .post(`${config.api}/cards`, data)
      .then((response) => {
        console.log(response);

        dispatch(addTodo(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const editPostAX = (post) => {
  return function (dispatch) {
    let data = {
      id: post.id,
      startSleep: post.startSleep,
      endSleep: post.endSleep,
      totalSleep: post.totalSleep,
      tag: post.tag,
      condition: post.condition,
      memo: post.memo,
      selectedAt: post.selectedAt,
    };
    axios
      .put(`${config.api}/cards/${post.selectedAt}`, data)
      .then((response) => {
        console.log(response);

        let data = {
          id: post.id,
          startSleep: post.startSleep,
          endSleep: post.endSleep,
          totalSleep: post.totalSleep,
          tag: post.tag,
          condition: post.condition,
          memo: post.memo,
          selectedAt: post.selectedAt,
        };
        dispatch(updateTodo(post.selectedAt, data));
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  };
};

const removePostAX = (selectedAt) => {
  return function (dispatch) {
    axios.delete(`${config.api}/cards/${selectedAt}`).then((reponse) => {
      console.log(reponse.data);
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
      }),
    // [UPDATE]: (state, action) => produce(state, (draft) => {
    //   let idx = draft.todo_list.findIndex((d)=>d.selectedAt === action.payload.date)
    //   draft.todo_list[idx]={...draft.todo_list[idx],...action.payload.date}
    // }),
    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        draft.todo_list = draft.todo_list.filter((p) => {
          if (p.selectedAt !== action.payload.todo_id) {
            return [...draft.todo_list, p];
          }
        });
      }),
    [CHANGE_TODAY]: (state, action) => 
    produce(state, (draft) => {
      return {...draft, today: moment(action.payload.date)}
    }),
  },

  // case "todo/CHANGE_TODAY": {
  //   //       // action에서 받아오는 값 : date
  //   //       return { ...state, today: moment(action.date) };
  //   //     }
    
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
