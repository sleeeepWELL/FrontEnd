import React from "react";
import { Redirect, Route } from "react-router-dom";

// 로그인 없이 접근시 인트로화면으로 리다이렉트
function PrivateRoute({ component: Component, ...parentProps }) {
  const status = localStorage.getItem("token");

  // 토큰없으면 false(비로그인)
  const is_login = status === null ? false : true;
  return (
    <>
      <Route
        {...parentProps}
        render={(props) =>
          is_login ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </>
  );
}

export default PrivateRoute;
