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
const NAME_CHECK = "NAME_CHECK"; //닉네임 중복검사 완료유무
const AUTH_CHECK = "AUTH_CHECK"; // 인증완료 실시여부
const DELETE_USER = "DELETE_USER"; // 회원탈퇴

// 액션 생성함수
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (username) => ({ username }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const nameCheck = createAction(NAME_CHECK, (name_check) => ({ name_check }));
const authCheck = createAction(AUTH_CHECK, (auth_check) => ({ auth_check }));
const deleteUser = createAction(DELETE_USER, () => ({}));

// 초기값
const initialState = {
  user: "",
  is_login: false,
  name_check: false,
  auth_check: false,
};

// 로그인
const loginSV = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/api/login`,
      // url: `${config.api}/api/login`,
      data: {
        email: email,
        password: pwd,
      },
    })
      .then(async (res) => {
        console.log(res);
        const ACCESS_TOKEN = res.data.accessToken;
        const ACCESS_TOKEN_EXP = res.data.accessTokenExpiresIn; // access토큰 만료시간
        const REFRESH_TOKEN = res.data.refreshToken;

        // 쿠키에 RefreshToken 저장(아직 httpOnly 설정 못함)
        setCookie("is_login", REFRESH_TOKEN);

        // 로컬에 AccessToken 저장
        localStorage.setItem("token", ACCESS_TOKEN);

        // accessToken 디폴트 설정
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${ACCESS_TOKEN}`;

        const user = {
          email: email,
        };

        const Current_time = new Date().getTime();
        dispatch(setUser(user));

        // ACCESS토큰 만료 1분전마다 연장함수 실행
        setTimeout(extensionAccess(), ACCESS_TOKEN_EXP - Current_time - 60000);

        history.replace("/main");
        window.alert("환영합니다");
      })
      .catch((err) => {
        window.alert("잘못된 정보입니다.");
        console.log("로그인 에러", err);
      });
  };
};

// 로그인 연장 함수
const extensionAccess = () => {
  return function (dispatch, getState) {
    const accessToken = localStorage.getItem("token");
    const refreshToken = getCookie("is_login");
    // console.log(accessToken, refreshToken);
    axios({
      method: "POST",
      url: `${config.api}/reissue`,
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
        // 1000 * 60 * 29 - 1000 * 56

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
        window.alert("회원가입이 완료되었습니다");
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
      url: `${config.api}/oauth/callback/kakao?code=${code}`,
      // url: `${config.api}/oauth/callback/kakao?code=${code}`,
    })
      .then(async (res) => {
        const ACCESS_TOKEN = res.data.accessToken;
        const ACCESS_TOKEN_EXP = res.data.accessTokenExpiresIn;
        const REFRESH_TOKEN = res.data.refreshToken;

        // refresh 토큰 쿠키저장
        setCookie("is_login", REFRESH_TOKEN);

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
        console.log("연장성공");

        // 메인화면 이동
        history.replace("/main");
        window.alert("환영합니다");
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
      url: `${config.api}/email/certification/send`,
      data: {
        email: email,
      },
    })
      .then((res) => {
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
      url: `${config.api}/email/certification/confirm`,
      data: {
        email: email,
        certificationNumber: AuthNum,
      },
    })
      .then((res) => {
        console.log(res);
        window.alert("인증이 완료되었습니다");
        let check = true;
        dispatch(authCheck(check));
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

// 닉네임 중복 체크
const userNameCheck = (nickname) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `${config.api}/username/${nickname}`,
    })
      .then((res) => {
        console.log(res.data);
        res.data
          ? window.alert("중복된 닉네임입니다")
          : window.alert("사용가능한 닉네임입니다");

        dispatch(nameCheck(res.data));
      })
      .catch((err) => {
        console.log("닉네임 중복검사 오류", err);
      });
  };
};

// 이메일 인증번호 발송(비밀번호 찾기전용)
const sendPwdAuth = (email) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/email/certification/send/reset`,
      data: {
        email: email,
      },
    })
      .then((res) => {
        console.log(res);
        window.alert("인증번호가 발송되었습니다");
      })
      .catch((err) => {
        console.log("인증번호발송 에러", err);
        window.alert("가입되지 않은 이메일 입니다");
      });
  };
};

// 비밀번호 재설정
const changePwd = (email, pwd, pwdCheck) => {
  return function (dispatch, getState, { history }) {
    const data = { email: email, password: pwd, passwordCheck: pwdCheck };
    axios
      .put(`${config.api}/setting/password`, data)
      .then((res) => {
        window.alert("비밀번호가 변경되었습니다");
        history.replace("/login");
      })
      .catch((err) => {
        console.log("비밀번호 재설정 에러", err);
      });
  };
};

// 회원 탈퇴
const deleteUserSV = () => {
  return function (dispatch, getState, { history }) {
    axios
      .delete(`${config.api}/withdrawal/membership`)
      .then(async () => {
        await dispatch(deleteUser());
        await history.replace("/login");
        await window.alert("정상처리 되었습니다. 이용해주셔서 감사합니다.");
      })
      .catch((err) => {
        console.log("회원탈퇴 에러", err);
      });
  };
};

// 마이페이지
// username 변경
const changeUsernameSV = (username) => {
  return function (dispatch, getState, { history }) {
    const data = {
      username: username,
    };
    axios
      .put(`${config.api}/setting/username`, data)
      .then(() => {
        window.alert("닉네임이 변경되었습니다.");
      })
      .catch((err) => {
        console.log("닉네임변경 에러", err);
      });
  };
};

// 비밀번호 변경
const changePwdSV = (password, passwordCheck) => {
  return function (dispatch, getState, { history }) {
    const data = { password: password, passwordCheck: passwordCheck };
    axios
      .put(`${config.api}/setting/password/new`, data)
      .then(() => {
        window.alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요.");
        history.replace("/login");
      })
      .catch((err) => {
        console.log("비밀번호 변경 오류", err);
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

    [NAME_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.name_check = action.payload.name_check;
      }),

    [AUTH_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.auth_check = action.payload.auth_check;
      }),

    [DELETE_USER]: (state, action) =>
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
  userNameCheck,
  nameCheck,
  changePwd,
  sendPwdAuth,
  deleteUserSV,
  deleteUser,
  changeUsernameSV,
  changePwdSV,
};

export { actionCreators };
