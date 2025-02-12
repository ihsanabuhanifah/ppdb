import React from "react";
import Menu from "../modules/ppdb/menu";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import TesUmum from "../pages/ppdb/tes-umum";
import Dashboard from "../pages/ppdb/dashboard";
import Payment from "../pages/ppdb/payment";
import Pembayaran from "../pages/ppdb/pembayaran";
import Kelulusan from "../pages/ppdb/kelulusan";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import AlertLogout from "../components/AlertLogout";
import Cookies from "js-cookie";
import { deviceUpdate } from "../api/admin";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import ReactWhatsapp from "react-whatsapp";
import wa from "../image/wa.png";
// import { useSelector } from "react-redux";
import { Tooltip } from "@chakra-ui/react";
import TesDiniyah from "../pages/ppdb/tes-diniyah";
import { getMessaging, getToken } from "firebase/messaging";
import { useSelector } from "react-redux";
import Dokumen from "../pages/ppdb/dokumen";
import Pengumuman from "../pages/ppdb/Pengumuman";
export default function LayoutPPDB() {
  // const isPayment = useSelector((state) => state.auth.isPayment);
  const message = "Bismilah, Assalamualaikum Warohmatullahi Wabarokatuh. Saya sudah melakukan pendaftan , Tahap Selanjutnya bagaimana ? Mohon Informasinya";
  const [hiddenMenu, setHiddenMenu] = React.useState(false);
  const [logout, setLogout] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const id = useSelector((state) => state.auth.id);
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
        deviceUpdate(id,currentToken)
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
          Cookies.remove("exam");
          Cookies.remove("url");
          localStorage.clear()
          return history.push("/login");
        }}
        onClose={() => {
          setLogout(false);
        }}
        isOpen={logout}
      ></AlertLogout>
      <div className="w-full h-full   overflow-hidden">
        <header className=" lg:hidden text-xl text-white font-bold flex items-center justify-between bg-blue-400 px-5 py-2 border-b lg:border-none pb-3 lg:pb-0">
          <h1>
            {" "}
            PPDB <br />{" "}
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
            className={`lg:col-span-2 absolute z-50 lg:static w-full ${
              hiddenMenu ? "transform -translate-x-full lg:transform " : "transform -translate-x-0 transition  duration-500"
            } lg:block h-full py-5 pl-1  bg-blue-400`}
          >
            <header className=" hidden lg:block text-lg text-white font-bold  items-center justify-between border-b lg:border-none pb-3 lg:pb-0">
              <h1>
                {" "}
                PPDB <br />{" "}
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
            className="lg:col-span-10 h-9/10 lg:h-full mt-5 lg:mt-0 bg-white px-5 p-10 lg:p-10 rounded-xl overflow-y-auto"
          >
            <Switch>
            <Route path="/ppdb/biodata">
                <Kelulusan></Kelulusan>
              </Route>
              <Route path="/ppdb/dashboard">
                <Dashboard></Dashboard>
              </Route>
              <Route path="/ppdb/dokumen">
                <Dokumen></Dokumen>
              </Route>
              <Route path="/ppdb/pengumuman">
                <Pengumuman></Pengumuman>
              </Route>
            
             
              
              <Redirect from="/ppdb" to="/ppdb/dashboard" />
            </Switch>
          </div>
        </div>
      </div>
      
      <div className="fixed right-10 bottom-4 z-50">
      <Tooltip
          fontSize="lg"
          bg="gray.300"
          color="black"
          hasArrow
          label="informasi PPDB"
          aria-label="A tooltip"
        >
          <img
            onClick={() => {
              setHidden(true);
            }}
            className={`w-16 h-16 animate-bounce shadow-xl ${
              hidden ? "hidden" : "block"
            }`}
            src={wa}
            alt="whatsapp.png"
          />
        </Tooltip>
        <div className={`${hidden ? "block" : "hidden"} relative  px-5 py-5 grid grid-cols-1 gap-4 shadow-lg border bg-white `}>
          <button  onClick={() => {
              setHidden(false);
            }} className="absolute right-5 top-1">x</button>
          <ReactWhatsapp number={"+6285795922861"} message={""}>
           <div className=" p-2 mt-4 flex items-center justify-center ">
           <img
             
             className={`w-4 h-4 shadow-xl `}
             src={wa}
             alt="whatsapp.png"
           />
           <p className="text-blue-400  ml-2 ">
             Pak Adi (Panitia PPDB)
           </p>
           </div>
          </ReactWhatsapp>
          
          
        </div>
      </div>
    </React.Fragment>
  );
}