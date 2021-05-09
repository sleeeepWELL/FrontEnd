import React from "react";
import Navigator from "../components/Navigator";
import styled from "styled-components";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MainCalendar from "../pages/MainCalendar";
import KyuCalendar from "../pages/KyuCalendar";
import CalendarWrite from "../components/CalendarWrite";
import PostWrite from "../pages/PostWrite";
import JieunCalendar from "../components/JieunCalendar";
import Analysis from "../pages/Analysis";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "./Cookie";
import LoginCheck from "../pages/LoginCheck";

function App() {
  const dispatch = useDispatch();
  const is_login = getCookie("is_login");

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Wrap>
          <Route
            path="/oauth/callback/kakao"
            component={OAuth2RedirectHandler}
          ></Route>
          <Route path="/main" component={Navigator} />
          <Route path="/main" component={MainCalendar} />
          <Route path="/main/analysis" exact component={Analysis} />
          <Route path="/" component={LoginCheck} />
          {/* <Route exact component={NotFound} /> */}
        </Wrap>
      </ConnectedRouter>
    </React.Fragment>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrap = styled.div`
  display: flex;
  width: 100%;
`;

export default App;
