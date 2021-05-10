import React from "react";
import Navigator from "../components/Navigator";
import styled from "styled-components";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MainCalendar from "../pages/MainCalendar";
import Analysis from "../pages/Analysis";
import PracAnalysis from "../pages/PracAnalysis";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "./Cookie";
import LoginCheck from "../pages/LoginCheck";
import { actionCreators as userActions } from "../redux/modules/user";

function App() {
  const dispatch = useDispatch();
  const is_login = getCookie("is_login");

  React.useEffect(() => {
    dispatch(userActions.getUserSV());
  }, []);

  return (
    <React.Fragment>
      <ConnectedRouter history={history} is_login={is_login}>
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Wrap>
          <Route
            path="/oauth/callback/kakao"
            component={OAuth2RedirectHandler}
          ></Route>
          <Route path="/main" component={Navigator} />
          <Route path="/main" exact component={MainCalendar} />
          <Route path="/main/analysis" exact component={Analysis} />
          <Route path="/main/prac" exact component={PracAnalysis} />
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
