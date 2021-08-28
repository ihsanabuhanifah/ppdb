import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";

import PPDB from "./layout/ppdb";
import Identitas from "./layout/identitas";

import { SiswaPageProtected, AuthProtected } from "./layout/ProtetedRoute";
import { useSelector } from "react-redux";
import LoadingPage from "./pages/auth/loadingPage,";
function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <Switch>
      <Route path="/login">
        <Login></Login>
      </Route>

      <Route path="/register">
        <Register></Register>
      </Route>
      <SiswaPageProtected path="/admin">
        <p>admin</p>
      </SiswaPageProtected>
      <SiswaPageProtected path="/ppdb">
        {isAuth ? <PPDB></PPDB> : <LoadingPage></LoadingPage>}
      </SiswaPageProtected>
      <SiswaPageProtected path="/identitas">
        <Identitas></Identitas>
      </SiswaPageProtected>
      <Redirect from="/" to="/login" />
      <Redirect from="*" to="/login" />
    </Switch>
  );
}

export default App;
