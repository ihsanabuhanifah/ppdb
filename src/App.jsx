import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import LupaPassword from "./pages/auth/lupa-password";
import UbahPassword from "./pages/auth/change-password";
import {
  TestMatematika,
  TestDiniyahDasar,
  TestAnalogi,
  TestBahasaInggris,
} from "./pages/tes";
import PPDB from "./layout/ppdb";
import DataSiswa from "./pages/identitas/dataSiswa";
import PendidikanTerakhir from "./pages/identitas/pendidikanTerakhir";
import DataAyah from "./pages/identitas/dataAyah";
import DataIbu from "./pages/identitas/dataIbu";
import DataWali from "./pages/identitas/dataWali";
import Admin from "./layout/admin";
import Home from "./pages/auth/home";

import {
  SiswaPageProtected,
  AdminPageProtected,
  TesPageProtected,
} from "./layout/ProtetedRoute";
import { useSelector } from "react-redux";
import LoadingPage from "./pages/auth/loadingPage,";
import VueLanding from "./components/Vue";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <main className="text-md h-screen">
      <Switch>
        <Route exact path="/">
          <VueLanding></VueLanding>
        </Route>

        <Route path="/login">
          <Login></Login>
        </Route>

        <Route path="/register">
          <Register></Register>
        </Route>
        <Route path="/lupa-password">
          <LupaPassword></LupaPassword>
        </Route>
        <Route path="/reset/:id/:token">
          <UbahPassword></UbahPassword>
        </Route>
        <SiswaPageProtected path="/ppdb">
          {isAuth ? <PPDB></PPDB> : <LoadingPage></LoadingPage>}
        </SiswaPageProtected>
        <TesPageProtected path="/tes/matematika">
          {isAuth ? (
            <TestMatematika></TestMatematika>
          ) : (
            <LoadingPage></LoadingPage>
          )}
        </TesPageProtected>
        <TesPageProtected path="/tes/diniyah-dasar">
          {isAuth ? (
            <TestDiniyahDasar></TestDiniyahDasar>
          ) : (
            <LoadingPage></LoadingPage>
          )}
        </TesPageProtected>
        <TesPageProtected path="/tes/tes-analogi">
          {isAuth ? <TestAnalogi></TestAnalogi> : <LoadingPage></LoadingPage>}
        </TesPageProtected>
        <TesPageProtected path="/tes/tes-bahasa-inggris">
          {isAuth ? (
            <TestBahasaInggris></TestBahasaInggris>
          ) : (
            <LoadingPage></LoadingPage>
          )}
        </TesPageProtected>

        <SiswaPageProtected path="/identitas/santri">
          {isAuth ? <DataSiswa></DataSiswa> : <LoadingPage></LoadingPage>}
        </SiswaPageProtected>
        <SiswaPageProtected path="/identitas/data-sekolah-asal">
          {/* <LoadingPage></LoadingPage> */}
          {isAuth ? (
            <PendidikanTerakhir></PendidikanTerakhir>
          ) : (
            <LoadingPage></LoadingPage>
          )}
        </SiswaPageProtected>
        <SiswaPageProtected path="/identitas/data-ayah">
          {isAuth ? <DataAyah></DataAyah> : <LoadingPage></LoadingPage>}
        </SiswaPageProtected>
        <SiswaPageProtected path="/identitas/data-ibu">
          {isAuth ? <DataIbu></DataIbu> : <LoadingPage></LoadingPage>}
        </SiswaPageProtected>
        <SiswaPageProtected path="/identitas/data-wali">
          {isAuth ? <DataWali></DataWali> : <LoadingPage></LoadingPage>}
        </SiswaPageProtected>

        <AdminPageProtected path="/admin">
          {isAuth ? <Admin></Admin> : <LoadingPage></LoadingPage>}
        </AdminPageProtected>
        <Redirect from="/" to="/login" />
        <Redirect from="*" to="/login" />
      </Switch>
    </main>
  );
}

export default App;
