import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import moment from "moment";
import { REDIRECT_URI, CLIENT_ID } from "../../shared/OAuth";

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

        // 로컬에 AccessToken 저장(최후의 방법..)
        localStorage.setItem("token", ACCESS_TOKEN);

        // accessToken 디폴트 설정
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${ACCESS_TOKEN}`;

        const user = {
          email: email,
        };
        console.log(ACCESS_TOKEN_EXP);

        const Current_time = new Date().getTime();
        console.log(
          moment(ACCESS_TOKEN_EXP - Current_time - 60000).format("mm:ss")
        );
        dispatch(setUser(user));

        // const data = {
        //   accessToken: ACCESS_TOKEN,
        //   refreshToken: REFRESH_TOKEN,
        // };

        // ACCESS토큰 만료 1분전마다 연장함수 실행
        setTimeout(extensionAccess(), ACCESS_TOKEN_EXP - Current_time - 60000);

        history.replace("/");
      })
      .catch((err) => {
        console.log("로그인 에러", err);
      });
  };
};

// 로그인 연장 함수
const extensionAccess = () => {
  console.log(moment().format("hh:mm:ss"));
  return function (dispatch, getState) {
    const accessToken = localStorage.getItem("token");
    const refreshToken = getCookie("is_login");
    console.log(accessToken, refreshToken);
    axios({
      method: "POST",
      url: `${config.api}/reissue`,
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    })
      .then((res) => {
        const ACCESS_TOKEN_EXP = res.data.accessTokenExpiresIn;
        const ACCESS_TOKEN = res.data.accessToken;
        const REFRESH_TOKEN = res.data.refreshToken;

        // 현재시간
        const Current_time = new Date().getTime();

        // 새롭게 받은 리프레시 토큰도 쿠키에 다시 저장
        setCookie("is_login", REFRESH_TOKEN);

        // 새롭게 받은 access 토큰 로컬에 다시 저장(이전꺼 지우고)
        localStorage.clear();
        localStorage.setItem("token", ACCESS_TOKEN);

        // 새롭게 발급받은 ACCESS 토큰 헤더에 담기
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${ACCESS_TOKEN}`;

        setTimeout(extensionAccess(), ACCESS_TOKEN_EXP - Current_time - 60000);

        console.log(moment(Current_time).format("hh:mm:ss"));
        console.log("연장성공!");

        console.log("토큰재생성~~");
        return;
      })
      .catch((err) => {
        console.log(moment().format("hh:mm:ss"));
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

// 소셜로그인
const kakaoLogin = (requestURL) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${requestURL}`,
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
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
        // 로컬 삭제
        localStorage.clear();
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
  extensionAccess,
  kakaoLogin,
};

export { actionCreators };
