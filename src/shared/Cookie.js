// 쿠키에 값을 저장, 삭제, 조회

import { SecurityRounded } from "@material-ui/icons";

// 쿠키 생성
const setCookie = (name, value, exp = 1) => {
  let date = new Date();

  // 쿠키 유효기간 : 12시간으로 설정
  date.setTime(date.getTime() + exp * 1000 * 60 * 60 * 12);

  // date를 그냥 가져오면 object로 나오기때문에 toUTCString으로 문자열 변환
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/; HttpOnly`;
};

// 쿠키삭제
const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

// 쿠키가져오기
const getCookie = (name) => {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  } else if (parts === "; ") {
    return undefined;
  } else {
    return parts.pop().split("=")[1];
  }
};
export { setCookie, deleteCookie, getCookie };
