import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import {TestMatematika, TestDiniyahDasar, TestAnalogi, TestBahasaInggris} from "./pages/tes";
import PPDB from "./layout/ppdb";
import Identitas from "./layout/identitas";
import Admin from "./layout/admin"
import { SiswaPageProtected, AdminPageProtected, TesPageProtected } from "./layout/ProtetedRoute";
import { useSelector } from "react-redux";
import LoadingPage from "./pages/auth/loadingPage,";

function App() {
  
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
   <main className="text-md h-screen">
      <Switch>
      <Route path="/login">
        <Login></Login>
      </Route>

      <Route path="/register">
        <Register></Register>
      </Route>
     
      <SiswaPageProtected path="/ppdb">
        {isAuth ? <PPDB></PPDB> : <LoadingPage></LoadingPage>}
      </SiswaPageProtected>
       <TesPageProtected path="/tes/matematika">
        {isAuth ? <TestMatematika></TestMatematika> : <LoadingPage></LoadingPage>}
      </TesPageProtected>
      <TesPageProtected path="/tes/diniyah-dasar">
        {isAuth ? <TestDiniyahDasar></TestDiniyahDasar> : <LoadingPage></LoadingPage>}
      </TesPageProtected>
      <TesPageProtected path="/tes/tes-analogi">
        {isAuth ? <TestAnalogi></TestAnalogi> : <LoadingPage></LoadingPage>}
      </TesPageProtected>
      <TesPageProtected path="/tes/tes-bahasa-inggris">
        {isAuth ? <TestBahasaInggris></TestBahasaInggris> : <LoadingPage></LoadingPage>}
      </TesPageProtected>
      <SiswaPageProtected path="/identitas">
        <Identitas></Identitas>
      </SiswaPageProtected>
      <AdminPageProtected path="/admin">
        <Admin></Admin>
      </AdminPageProtected>
      <Redirect from="/" to="/login" />
      <Redirect from="*" to="/login" />
    </Switch>
   </main>
  );
}

export default App;
