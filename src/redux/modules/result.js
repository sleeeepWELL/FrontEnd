import moment from "moment";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";
import { config } from "../../shared/config";
import { createAction, handleActions } from "redux-actions";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";

const GET = "GET";


const getTime = createAction(GET, (data) => ({ data}));


const initialState = {
    result_sleeptime:{
        hour: 4,
        minute: 121,
    }
};

const getTimeAX= () => {
  return function (dispatch) {
    axios
      .get(`${config.api}/yourSleepTime`)
      .then((res) => {
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
    [GET]: (state, action) =>
      produce(state, (draft) => {
        draft.result_sleeptime = action.payload.data;
      }),
  },
  initialState
);

const actionCreators = {
    getTime,
    getTimeAX,
};

export { actionCreators };
