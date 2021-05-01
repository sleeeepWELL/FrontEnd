import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import { Repeat } from "@material-ui/icons";
import { ACCESS_TOKEN } from "../../shared/OAuth";
import moment from "moment";

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

        // 쿠키에 RefreshToken 저장(아직 httpOnly 설정 못함)
        setCookie("is_login", REFRESH_TOKEN);

        // accessToken 디폴트 설정
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${ACCESS_TOKEN}`;

        const user = {
          email: email,
        };
        console.log(ACCESS_TOKEN_EXP);
        console.log(moment(ACCESS_TOKEN_EXP).format("DD, hh:mm:ss"));
        console.log(moment(ACCESS_TOKEN_EXP - 60000).format("DD, hh:mm:ss"));
        dispatch(setUser(user));

        const data = {
          accessToken: ACCESS_TOKEN,
          refreshToken: REFRESH_TOKEN,
        };

        // 토큰 만료 1분전에 로그인 연장 실행
        setTimeout(
          axios
            .post(`${config.api}/reissue`, data)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log("연장실패", err);
            }),
          ACCESS_TOKEN_EXP - 60 * 1000
        );

        history.replace("/");
      })
      .catch((err) => {
        console.log("로그인 에러", err);
      });
  };
};

// 로그인 연장 함수
const extensionAccess = () => {
  return function (dispatch, getState, { history }) {
    const REFRESH_TOKEN = getCookie("is_login");
    axios({
      method: "POST",
      url: `${config.api}/reissue`,
      data: {
        accessToken: ACCESS_TOKEN,
        refreshToken: REFRESH_TOKEN,
      },
    })
      .then(console.log("연장성공!"))
      .catch((err) => {
        console.log("연장실패!", err);
      });
  };
};

// 회원가입
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
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        // 쿠키삭제
        deleteCookie("is_login");
        draft.is_login = false;
      }),

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
