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
import PracAnalysis from "../pages/PracAnalysis";

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
      <ConnectedRouter history={history} is_login={is_login}>
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <div>
          <Navigator />
          <Wrap>
            <ContentWrap>
              <Route
                path="/oauth/callback/kakao"
                component={OAuth2RedirectHandler}
              ></Route>
              <Route path="/write" exact component={PostWrite} />
              <Route path="/calendar" exact component={MainCalendar} />
              <Route path="/kyucalendar" exact component={KyuCalendar} />
              <Route path="/calendarwrite" exact component={CalendarWrite} />
              <Route path="/jieuncalendar" exact component={JieunCalendar} />
              <Route path="/analysis" exact component={Analysis} />
              <Route path="/prac" exact component={PracAnalysis} />
              <Route path="/" component={LoginCheck} />
              {/* <Route exact component={NotFound} /> */}
            </ContentWrap>
          </Wrap>
        </div>
      </ConnectedRouter>
    </React.Fragment>
  );
}

const Wrap = styled.div`
  display: flex;
`;

const ContentWrap = styled.div`
  display: flex;
  width: 100%;
`;

export default App;
