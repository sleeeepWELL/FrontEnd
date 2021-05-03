import { Redirect } from "react-router-dom";
import { getCookie } from "../shared/Cookie";

// 로그인없이 주소창 경로로 접근시 로그인화면으로 리다이렉트
const LoginCheck = (props) => {
  const is_login = getCookie("is_login");
  if (!is_login) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  } else {
    return <Redirect to={{ pathname: "/" }} />;
  }
};

export default LoginCheck;
