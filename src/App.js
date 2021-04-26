import React from "react"
import Login from  "./pages/Login"
import Signup from  "./pages/Signup"
import {Switch, Route,BrowserRouter} from "react-router-dom"
// import { ConnectedRouter } from "connected-react-router";
// import { history } from "../redux/configureStore";

// import styled from 'styled-components'
// import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";

function App() {

  // const dispatch = useDispatch();
  // const is_session = sessionStorage.getItem('JWT') ? true : false;

  // React.useEffect(() => {
  //   if (is_session) {
  //     dispatch(userActions.loginCheck());
  //   }
  // }, []);

  return (

      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
          {/* <Route exact component={NotFound}/> */}
        </Switch>
      </BrowserRouter>
 
  )
}


export default App;
