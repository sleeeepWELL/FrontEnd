import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../shared/config";

// 액션 타입
const SET_USER = "SET_USER"; // 로그인
const GET_USER = "GET_USER"; //회원정보 조회
const LOG_OUT = "LOG_OUT"; // 로그아웃

// 액션 생성함수
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

// 초기값
const initialState = {
  user: "",
  is_login: false,
};

const loginSV = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/api/login`,
      data: {
        email: email,
        password: pwd,
      },
    })
      .then((res) => {
        console.log(res);
        const ACCESS_TOKEN = res.data.accessToken;
        const ACCESS_TOKEN_EXP = res.data.accessTokenExpiresIn; // access토큰 만료시간
        const REFRESH_TOKEN = res.data.refreshToken;

        // accessToken 디폴트 설정
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${ACCESS_TOKEN}`;

        // 토큰 만료 1분전에 로그인 연장
        // setTimeout(, ACCESS_TOKEN_EXP - 60000);
      })
      .catch((err) => {
        console.log("로그인 에러", err);
      });
  };
};

const signUpSV = (email, nickname, pwd, pwdCheck) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/signup`,
      data: {
        email: email,
        password: pwd,
        passwordCheck: pwdCheck,
        username: nickname,
      },
    })
      .then((res) => {
        console.log(res);
        history.replace("/login");
      })
      .catch((err) => {
        console.log("회원가입 에러", err);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [SET_USER]: (state, action) => produce(state, (draft) => {}),

    [LOG_OUT]: (state, action) => produce(state, (draft) => {}),

    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  setUser,
  getUser,
  logOut,
  signUpSV,
  loginSV,
};

export { actionCreators };
