import React from "react";
import styled from "styled-components";

import Navigator from "../components/Navigator";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MainCalendar from "../pages/MainCalendar";
import Analysis from "../pages/Analysis";
import PracAnalysis from "../pages/PracAnalysis";
import FindPassword from "../pages/FindPassword";
import Ready from "../pages/Ready";
import MyPage from "../pages/MyPage";
import NotFound from "../pages/NotFound";

import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import { useDispatch, useSelector } from "react-redux";
import LoginCheck from "../pages/LoginCheck";

function App() {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/login" exact component={Login} />
        <Switch>
          <Route path="/signup" exact component={Signup} />

          <Route path="/findpwd" exact component={FindPassword} />
          <Wrap>
            <Route
              path="/oauth/callback/kakao"
              component={OAuth2RedirectHandler}
            ></Route>
            <Route path="/main" component={Navigator} />
            <Route path="/main" exact component={MainCalendar} />
            <Route path="/main/analysis" exact component={Analysis} />
            <Route path="/main/prac" exact component={Ready} />
            <Route path="/main/mypage" exact component={MyPage} />
            <Route path="/" component={LoginCheck} />
          </Wrap>
          <Route component={NotFound} />
        </Switch>
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
