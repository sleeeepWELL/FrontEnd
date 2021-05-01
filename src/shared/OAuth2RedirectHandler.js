import React, { Component } from "react";
import { ACCESS_TOKEN } from "./OAuth";
import { setCookie } from "./Cookie";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const OAuth2RedirectHandler = (props) => {
  return (
    <Redirect
      to={{
        pathname: "/",
        state: {
          from: props.location,
        },
      }}
    />
  );
};

// 여기에 백으로부터 토큰을 받아오는 작업이 들어가야 할 것 같다.(GET)
// 토큰을 받아오면 마찬가지로 RefreshToken은 쿠키에,
// AccessToken은 자체 변수명에 ..?
// 자체변수명에 설정해놓으면 어쨌든 지역변수에서 선언되어 할당되는부분이라 다른 함수에서
// AccessToken을 꺼내 써먹질 못하는 단점이 생김....
// 그렇다면 변수에 할당하는 방법보다는 유연하게...로컬에 저장을 해두어야 할까?
// 로컬에 저장하면 생기는 장단점에 대해 알아보자.

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
