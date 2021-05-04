import React, { Component } from "react";
import { ACCESS_TOKEN } from "./OAuth";
import { setCookie } from "./Cookie";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const OAuth2RedirectHandler = (props) => {
  const dispatch = useDispatch();
  // 인가코드
  let requestURL = new URL(window.location.href).searchParams.get("code");

  console.log(requestURL);
  React.useEffect(() => {
    dispatch(userActions.kakaoLogin(requestURL));
  }, []);

  return (
    <Redirect
      to={{
        pathname: "/calendar",
      }}
    />
  );
};

// class OAuth2RedirectHandler extends Component {
//   getUrlParameter(name) {
//     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

//     var results = regex.exec(this.props.location.search);
//     return results === null
//       ? ""
//       : decodeURIComponent(results[1].replace(/\+/g, " "));
//   }

//   render() {
//     const token = this.getUrlParameter("token");
//     const error = this.getUrlParameter("error");
//     console.log(token, error);

//     if (token) {
//       setCookie(ACCESS_TOKEN, token);
//       return (
//         <Redirect
//           to={{
//             pathname: "/",
//             state: { from: this.props.location },
//           }}
//         />
//       );
//     } else {
//       return (
//         <Redirect
//           to={{
//             pathname: "/",
//             state: {
//               from: this.props.location,
//               error: error,
//             },
//           }}
//         />
//       );
//     }
//   }
// }

export default OAuth2RedirectHandler;
