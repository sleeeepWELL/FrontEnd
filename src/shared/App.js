import React from "react";
import styled from "styled-components";

import Navigator from "../components/Navigator";
import {
  Login,
  Signup,
  MainCalendar,
  Analysis,
  FindPassword,
  MyPage,
  NotFound,
  Intro,
  UseInfo,
} from "../pages/index";

import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import PrivateRoute from "./PrivateRoute";
import Footer from "../components/Footer";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Intro} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/findpwd" exact component={FindPassword} />
          <Route path="/oauth/callback/kakao"component={OAuth2RedirectHandler}/>
          <Route path="/main">
       
              <PrivateRoute path="/main" component={Navigator} />
              <PrivateRoute path="/main" exact component={MainCalendar} />
              <PrivateRoute path="/main/analysis" exact component={Analysis} />
              <PrivateRoute path="/main/prac" exact component={UseInfo} />
              <PrivateRoute path="/main/mypage" exact component={MyPage} />
         
          </Route>
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
      <Footer />
    </>
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
