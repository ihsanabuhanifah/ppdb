import React from "react";
import Menu from "../modules/admin/menu";
import { Switch, Route, useHistory } from "react-router-dom";

import { Admin, Pendaftar, Nilai, JadwalTes, Dashboard } from "../pages/admin";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import AlertLogout from "../components/AlertLogout";
import Cookies from "js-cookie";
import ReactWhatsapp from "react-whatsapp";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import wa from "../image/wa.png";
import { deviceUpdate } from "../api/admin";
// import { useSelector } from "react-redux";
import { Tooltip } from "@chakra-ui/react";
import { getMessaging, getToken } from "firebase/messaging";

import { useSelector } from "react-redux";

import RiwayatPembayaran from "../pages/admin/riwayatPembayaran";
import DetailPendaftar from "../pages/admin/pendaftar/detail";
import UserLulus from "../pages/admin/pendaftar/lulus";
export default function LayoutPPDB() {
  const id = useSelector((state) => state.auth.id);
  const message =
    "Bismilah, Assalamualaikum Warohmatullahi Wabarokatuh. Saya sudah melakukan pendaftaran , Tahap Selanjutnya bagaimana ? Mohon Informasinya";
  const [hiddenMenu, setHiddenMenu] = React.useState(false);
  const [logout, setLogout] = React.useState(false);
  let history = useHistory();
  React.useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyACqkG52CtzYgbl0_EVw8qkUxvWslXB4MA",
      authDomain: "fir-psb-notif-1dd4e.firebaseapp.com",
      projectId: "fir-psb-notif-1dd4e",
      storageBucket: "fir-psb-notif-1dd4e.appspot.com",
      messagingSenderId: "139127533328",
      appId: "1:139127533328:web:6ef745184db40701903f95",
    };
    firebase.initializeApp(firebaseConfig);

    const messaging = getMessaging();
    getToken(messaging, {
      vapidKey:
        "BIJnu5Rq_eI-nulWKTQ-TwbADc44bfyXZ4oolgf0L-36kdAwHJQKyh-QEaHcALMv4fl5xyohUNsrir-ppoingM4",
    })
      .then((currentToken) => {
        deviceUpdate(id, currentToken);
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  }, []);
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
      <div className="w-full h-full   overflow-hidden" style={{ zoom: "80%" }}>
        <header className=" lg:hidden text-xl text-white font-bold flex items-center justify-between bg-blue-400 px-5 py-2 border-b lg:border-none pb-3 lg:pb-0">
          <h1>
            {" "}
            ADMIN <br />{" "}
            <span className="hidden lg:block">MAN 1 KOTA SUKABUMI</span>
          </h1>
          <button
            onClick={() => {
              setHiddenMenu(!hiddenMenu);
            }}
            className="block lg:hidden font-bold"
          >
            {hiddenMenu ? (
              <MenuIcon className="h-6 w-6"></MenuIcon>
            ) : (
              <XIcon className="h-6 w-6"></XIcon>
            )}
          </button>
        </header>
        <div className="grid grid-cols-1 relative lg:grid-cols-12 w-full h-full bg-blue-400 px-2  lg:px-6 lg:pt-6  ">
          <div
            className={`lg:col-span-1 absolute z-50 lg:static w-full ${
              hiddenMenu
                ? "transform -translate-x-full lg:transform "
                : "transform -translate-x-0 transition  duration-500"
            } lg:block h-full py-5 pl-1  bg-blue-400`}
          >
            <header className=" hidden lg:block text-sm text-white font-bold items-center justify-between border-b lg:border-none pb-3 lg:pb-0">
              <h1>
                {" "}
                ADMIN <br />{" "}
                <span className="hidden lg:block">MAN 1 KOTA SUKABUMI</span>
              </h1>
            </header>

            <section className="mt-5 h-full">
              <Menu
                setLogout={setLogout}
                setHiddenMenu={setHiddenMenu}
                hiddenMenu={hiddenMenu}
              ></Menu>
            </section>
          </div>

          <div
            id="scroll"
            className="lg:col-span-11 h-9/10 lg:h-full mt-5 lg:mt-0 bg-white px-5 p-10 lg:p-10 rounded-xl overflow-y-auto"
          >
            <Switch>
              <Route path="/admin" exact>
                <Admin></Admin>
              </Route>
              <Route path="/admin/dashboard" exact>
                <Dashboard></Dashboard>
              </Route>
              <Route  exact path="/admin/pendaftar">
                <Pendaftar></Pendaftar>
              </Route>
              <Route  exact path="/admin/lulus">
                <UserLulus></UserLulus>
              </Route>
              <Route path="/admin/pendaftar/:id/detail">
                <DetailPendaftar></DetailPendaftar>
              </Route>
              <Route path="/admin/nilai" exact>
                <Nilai></Nilai>
              </Route>
              <Route path="/admin/jadwal-tes" exact>
                <JadwalTes></JadwalTes>
              </Route>
              <Route path="/admin/statistik" exact>
                <RiwayatPembayaran></RiwayatPembayaran>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
     
    </React.Fragment>
  );
}
