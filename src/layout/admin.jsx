import React from "react";
import Menu from "../modules/admin/menu";
import { Switch, Route, useHistory } from "react-router-dom";
import TesUmum from "../pages/ppdb/tes-umum";
import {Admin, Pendaftar, Nilai, JadwalTes} from "../pages/admin";
import Payment from "../pages/ppdb/payment";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import AlertLogout from "../components/AlertLogout";
import Cookies from "js-cookie";
import ReactWhatsapp from "react-whatsapp";
import wa from "../image/wa.png";
// import { useSelector } from "react-redux";
import { Tooltip } from "@chakra-ui/react";
import TesDiniyah from "../pages/ppdb/tes-diniyah";
export default function LayoutPPDB() {
  // const isPayment = useSelector((state) => state.auth.isPayment);
  const message = "Bismilah, Assalamualaikum Warohmatullahi Wabarokatuh. Saya sudah melakukan pendaftan , Tahap Selanjutnya bagaimana ? Mohon Informasinya";
  const [hiddenMenu, setHiddenMenu] = React.useState(true);
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
      <div className="w-full h-full   overflow-hidden">
        <header className=" lg:hidden text-xl text-white font-bold flex items-center justify-between bg-green-500 px-5 py-2 border-b lg:border-none pb-3 lg:pb-0">
          <h1>
            {" "}
            ADMIN <br />{" "}
            <span className="hidden lg:block">SMK MADINATULQURAN</span>
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
        <div className="grid grid-cols-1 relative lg:grid-cols-12 w-full h-full bg-green-500 px-2  lg:px-6 lg:pt-6  ">
          <div
            className={`lg:col-span-2 absolute z-50 lg:static w-full ${
              hiddenMenu ? "transform -translate-x-full lg:transform " : "transform -translate-x-0 transition  duration-500"
            } lg:block h-full py-5 pl-1  bg-green-500`}
          >
            <header className=" hidden lg:block text-xl text-white font-bold items-center justify-between border-b lg:border-none pb-3 lg:pb-0">
              <h1>
                {" "}
                ADMIN <br />{" "}
                <span className="hidden lg:block">SMK MADINATULQURAN</span>
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
              <Route path="/admin" exact>
               <Admin></Admin>
              </Route>
              <Route path="/admin/pendaftar">
              <Pendaftar></Pendaftar>
              </Route>
              <Route path="/admin/nilai" exact>
               <Nilai></Nilai>
              </Route>
              <Route path="/admin/jadwal-tes" exact>
               <JadwalTes></JadwalTes>
              </Route>
             
            </Switch>
          </div>
        </div>
      </div>
      <div className="fixed right-10 bottom-4 z-50">
        <ReactWhatsapp number={"+6285888222457"} message={message}>
          <Tooltip
            fontSize="lg"
            bg="gray.300"
            color="black"
            hasArrow
            label="informasi PPDB"
            aria-label="A tooltip"
          >
            <img className="w-16 h-16 animate-bounce shadow-xl " src={wa} alt="whatsapp.png" />
          </Tooltip>
        </ReactWhatsapp>
      </div>
    </React.Fragment>
  );
}
