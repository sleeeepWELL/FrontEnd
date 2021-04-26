import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";

import MainCalendar from "./pages/MainCalendar";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={MainCalendar} />
    </BrowserRouter>
  );
}

export default App;
