import moment from "moment";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";
import { config } from "../../shared/config";
import { createAction, handleActions } from "redux-actions";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";

const GET_TIME = "GET_TIME";
const GET_TAG = "GET_TAG";


const getTime = createAction(GET_TIME,(data) => ({data}));
const getTag = createAction(GET_TAG,(data) => ({data}));

const initialState = {
    result_sleeptime:{
        hour: 4,
        minute: 121,
    },
    tags:{
      weekly: [],
      monthly: [],
    },
};

const getTags= (today) => {
  return function (dispatch) {
    axios
      .get(`${config.api}/chart/barChart/${today}`)
      .then((res) => {
        let data={
            weekly: res.data[0],
            monthly: res.data[1],
        }
        console.log(data);
      dispatch(getTag(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const getTimeAX= () => {
  return function (dispatch) {
    axios
      .get(`${config.api}/chart/yourSleepTime`)
      .then((res) => {
        console.log(res);
        let data={
            hour: res.data[0],
            minute: res.data[1],
        }
        console.log(data)
      dispatch(getTime(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


// 리듀서
export default handleActions(
  {
    [GET_TIME]: (state, action) =>
      produce(state, (draft) => {
        draft.result_sleeptime = action.payload.data;
      }),
    [GET_TAG]: (state, action) =>
      produce(state, (draft) => {
        draft.tags = action.payload.data;
      }),
  },
  initialState
);

const actionCreators = {
    getTime,
    getTimeAX,
    getTags,
    getTag,
};

export { actionCreators };
