import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import moment from "moment";
import { REDIRECT_URI, CLIENT_ID } from "../../shared/OAuth";

// 액션 타입
const SET_USER = "SET_USER"; // 로그인
const GET_USER = "GET_USER"; // 유저 정보 불러오기
const LOG_OUT = "LOG_OUT"; // 로그아웃

// 액션 생성함수
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (username) => ({ username }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

// 초기값
const initialState = {
  user: "",
  is_login: false,
};

// 로그인
const loginSV = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.test_api}/api/login`,
      // url: `${config.api}/api/login`,
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
        ] = `bearer ${ACCESS_TOKEN}`;

        const user = {
          email: email,
        };
        console.log(ACCESS_TOKEN_EXP);

        const Current_time = new Date().getTime();
        console.log(
          moment(ACCESS_TOKEN_EXP - Current_time - 60000).format("mm:ss")
        );
        dispatch(setUser(user));

        // ACCESS토큰 만료 1분전마다 연장함수 실행
        setTimeout(extensionAccess(), ACCESS_TOKEN_EXP - Current_time - 60000);

        history.replace("/main/calendar");
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
      url: `${config.test_api}/reissue`,
      // url: `${config.api}/reissue`,
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
      url: `${config.test_api}/signup`,
      // url: `${config.api}/signup`,
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
const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `${config.test_api}/oauth/callback/kakao?code=${code}`,
      // url: `${config.api}/oauth/callback/kakao?code=${code}`,
    })
      .then(async (res) => {
        console.log(res);
        window.alert("환영합니다");

        const ACCESS_TOKEN = res.data.accessToken;
        const ACCESS_TOKEN_EXP = res.data.accessTokenExpiresIn;
        const REFRESH_TOKEN = res.data.refreshToken;

        // refresh 토큰 쿠키저장
        await setCookie("is_login", REFRESH_TOKEN);

        // access 토큰 로컬에 저장(이전꺼 지우고)
        localStorage.clear();
        localStorage.setItem("token", ACCESS_TOKEN);

        // 현재시간
        const Current_time = new Date().getTime();

        // 헤더 설정
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${ACCESS_TOKEN}`;

        // 토큰 만료 1분전 자동연장
        setTimeout(extensionAccess(), ACCESS_TOKEN_EXP - Current_time - 60000);

        // 메인화면 이동
        await history.replace("/calendar");
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다");
        history.replace("/login");
      });
  };
};

// 회원가입 : 이메일로 인증번호 전송
const SendAuth = (email) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.test_api}/email/certification/send`,
      data: {
        email: email,
      },
    })
      .then((res) => {
        console.log(res);
        window.alert("입력하신 이메일로 인증번호가 발송되었습니다.");
      })
      .catch((err) => {
        console.log("인증번호 발송 에러", err);
      });
  };
};

// 이메일인증번호 인증완료
const ConfirmAuth = (email, AuthNum) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.test_api}/email/certification/confirm`,
      data: {
        email: email,
        certificationNumber: AuthNum,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 유저 정보 불러오기
const getUserSV = () => {
  return function (dispatch, getState, { history }) {
    const ACCESS_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `bearer ${ACCESS_TOKEN}`;

    console.log(axios.defaults);

    axios({
      method: "GET",
      url: `${config.api}/username`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("유저 이름 가져오기 에러", err);
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

    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.username;
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
  },
  initialState
);

const actionCreators = {
  setUser,
  logOut,
  signUpSV,
  loginSV,
  extensionAccess,
  kakaoLogin,
  SendAuth,
  ConfirmAuth,
  getUserSV,
};

export { actionCreators };
