import React from "react";
import Navigator from "../components/Navigator";
import Post from "../components/Post";
import styled from "styled-components";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MainCalendar from "../pages/MainCalendar";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

function App() {
  // const dispatch = useDispatch();
  // const is_session = sessionStorage.getItem('JWT') ? true : false;

  // React.useEffect(() => {
  //   if (is_session) {
  //     dispatch(userActions.loginCheck());
  //   }
  // }, []);

  return (
    <React.Fragment>
      <Wrap>
        <Navigator />
        <ContentWrap>
          <ConnectedRouter history={history}>
            <div style={{ display: "flex" }}>
              <Route path="/" exact component={Post} />
            </div>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            {/* <Route exact component={NotFound}/> */}
            <Route path="/calendar" exact component={MainCalendar} />
          </ConnectedRouter>
        </ContentWrap>
      </Wrap>
    </React.Fragment>
  );
}

const Wrap = styled.div`
  display: flex;
`;

const ContentWrap = styled.div`
  display: flex;
  width: 100%;
  margin: 1.5rem;
`;

export default App;
