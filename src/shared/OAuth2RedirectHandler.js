import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import Spinner from "./Spinner";

const OAuth2RedirectHandler = (props) => {
  const dispatch = useDispatch();
  
  const user = useSelector((state)=> state.user.user);
  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(async () => {
    await dispatch(userActions.kakaoLogin(code,user));
  }, []);

  return <Spinner />;
};

export default OAuth2RedirectHandler;
