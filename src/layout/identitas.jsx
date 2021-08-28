import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import DataSiswa from "../pages/identitas/dataSiswa";
import PendidikanTerakhir from "../pages/identitas/pendidikanTerakhir";
import DataAyah from "../pages/identitas/dataAyah";
import DataIbu from "../pages/identitas/dataIbu";
import DataWali from "../pages/identitas/dataWali";
import { useSelector } from "react-redux";
import LoadingPage from "../pages/auth/loadingPage,";
import AlertLogout from "../components/AlertLogout";
import Cookies from "js-cookie";
export default function Identitas() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [logout, setLogout] = React.useState(false);
  let history = useHistory();
  return (
    <React.Fragment>
      <AlertLogout
        message="Apakah anda yakin akan Keluar ?"
        onConfirm={() => {
          Cookies.remove("token-ppdb");
          return history.push("/login");
        }}
        onClose={() => {
          setLogout(false);
        }}
        isOpen={logout}
      ></AlertLogout>
      <div className=" px-5 lg:px-28 py-5 h-full lg:py-10 overflow-hidden ">
        <div className="flex justify-end items-center border-b-2 pb-6 mb-5 h-1/6">
        
          <div>
            <button onClick={()=> {
              setLogout(true)
            }} className="text-green-500 font-bold text-lg">Logout</button>
          </div>
        </div>
        <div className="h-5/6 overflow-y-auto">
          <Switch>
            <Redirect exact from="/identitas" to="/identitas/santri" />
            <Route path="/identitas/santri">
              {isAuth ? <DataSiswa></DataSiswa> : <LoadingPage></LoadingPage>}
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
              {isAuth ? <DataAyah></DataAyah> : <LoadingPage></LoadingPage>}
            </Route>
            <Route path="/identitas/data-ibu">
              {isAuth ? <DataIbu></DataIbu> : <LoadingPage></LoadingPage>}
            </Route>
            <Route path="/identitas/data-wali">
              {isAuth ? <DataWali></DataWali> : <LoadingPage></LoadingPage>}
            </Route>
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}
