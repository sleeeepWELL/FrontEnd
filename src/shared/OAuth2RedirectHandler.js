import React, { Component } from "react";
import { ACCESS_TOKEN } from "./OAuth";
import { setCookie } from "./Cookie";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const OAuth2RedirectHandler = (props) => {
  const dispatch = useDispatch();
  //   const code = {
  //   axios({
  //     method: "POST",
  //     url: "/oauth/token HTTP/1.1",
  //     headers: {
  //       "Content-type": application/x-www-form-urlencoded;charset=utf-8
  //     }
  //   }).then((res) => {}}.catch((err) => {console.log(err)})
  // }

  React.useEffect(() => {
    dispatch(userActions.SocialLogin());
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
