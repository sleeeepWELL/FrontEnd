import React from "react";
import Navigator from "../components/Navigator";
import Post from "../components/Post";
import styled from "styled-components";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

function App() {
  return (
    <React.Fragment>
      <Wrap>
        <Navigator />
        <ContentWrap>
          <ConnectedRouter history={history}>
            <div style={{ display: "flex" }}>
              <Route path="/" exact component={Post} />
            </div>
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
