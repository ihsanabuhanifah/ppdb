import React from "react";
import Menu from "../modules/ppdb/menu";
import { Switch, Route, useHistory } from "react-router-dom";
import Tes from "../pages/ppdb/tes";
import Dashboard from "../pages/ppdb/dashboard";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import AlertLogout from "../components/AlertLogout";
import Cookies from "js-cookie";
import ReactWhatsapp from "react-whatsapp";
import wa from "../image/wa.png";
// import { useSelector } from "react-redux";
import { Tooltip } from "@chakra-ui/react";
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
        <header className=" lg:hidden text-xl font-bold flex items-center justify-between bg-green-500 px-5 py-2 border-b lg:border-none pb-3 lg:pb-0">
          <h1>
            {" "}
            PPDB <br />{" "}
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
              hiddenMenu ? "hidden" : "block"
            } lg:block h-full py-5 pl-1 lg:pl-10 bg-green-500`}
          >
            <header className=" hidden lg:block text-xl font-bold flex items-center justify-between border-b lg:border-none pb-3 lg:pb-0">
              <h1>
                {" "}
                PPDB <br />{" "}
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
              <Route path="/ppdb/salam">
                <Dashboard></Dashboard>
              </Route>
              <Route path="/ppdb/tes-umum">
                <Tes></Tes>
              </Route>
              <Route path="/ppdb/tes-diniyah">
              untuk halaman ini masih dalam pengerjaan .
              </Route>
              <Route path="/ppdb/konfirmasi-pembayaran-ppdb">
                <p>Mohon maaf Menu masih dalam pengerjaan</p>
               
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      <div className="fixed right-10 bottom-4">
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
