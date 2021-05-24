// 이메일 체크
export const emailCheck = (email) => {
  let _reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return _reg.test(email);
};

// 비밀번호 체크
//숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력
export const passwordCheck = (pwd) => {
  let _reg =
    /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

  return _reg.test(pwd);
};

// 닉네임 체크
export const nicknameCheck = (nickname) => {
  let _reg = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,9}$/;
  return _reg.test(nickname);
};
