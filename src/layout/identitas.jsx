import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DataSiswa from "../pages/identitas/dataSiswa";
import PendidikanTerakhir from "../pages/identitas/pendidikanTerakhir";
import DataAyah from "../pages/identitas/dataAyah";
import DataIbu from "../pages/identitas/dataIbu";
import DataWali from "../pages/identitas/dataWali";
import { useSelector } from "react-redux";
import LoadingPage from "../pages/auth/loadingPage,";
export default function Identitas() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <div className=" px-5 lg:px-28 py-5 h-full lg:py-10">
      <Switch>
        <Redirect exact from="/identitas" to="/identitas/santri" />
        <Route path="/identitas/santri">
        {isAuth ? (
            <DataSiswa></DataSiswa>
          ) : (
            <LoadingPage></LoadingPage>
          )}
        </Route>
        <Route path="/identitas/data-sekolah-asal">
        {/* <LoadingPage></LoadingPage> */}
          {isAuth ? (
            <PendidikanTerakhir></PendidikanTerakhir>
          ) : (
            <LoadingPage></LoadingPage>
          )}
        </Route>
        <Route path="/identitas/data-ayah">
        {isAuth ? (
            <DataAyah></DataAyah>
          ) : (
            <LoadingPage></LoadingPage>
          )}
        </Route>
        <Route path="/identitas/data-ibu">
        {isAuth ? (
            <DataIbu></DataIbu>
          ) : (
            <LoadingPage></LoadingPage>
          )}
        </Route>
        <Route path="/identitas/data-wali">
        {isAuth ? (
            <DataWali></DataWali>
          ) : (
            <LoadingPage></LoadingPage>
          )}
        </Route>
      </Switch>
    </div>
  );
}
