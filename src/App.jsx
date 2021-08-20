import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import store from "./redux/store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="/admin">
            <p>admin</p>
          </Route>
          <Redirect from="/" to="/login" />
          <Redirect from="*" to="/login" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
