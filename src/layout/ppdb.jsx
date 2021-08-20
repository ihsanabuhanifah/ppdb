import React from "react";
import Menu from "../modules/ppdb/menu";
import { Switch, Route } from "react-router-dom";
import Tes from "../pages/ppdb/tes";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
export default function LayoutPPDB() {
  const [hiddenMenu, setHiddenMenu] = React.useState(true);

  return (
    <React.Fragment>
      <header className=" block lg:hidden text-xl font-bold flex items-center justify-between bg-green-500 px-5 py-2 border-b lg:border-none pb-3 lg:pb-0">
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
      <div className="grid grid-cols-1 relative lg:grid-cols-12 w-full h-screen bg-green-500 px-2 lg:px-6 lg:pt-6  ">
        <div
          className={`lg:col-span-2 absolute lg:static w-full ${
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
            <Menu setHiddenMenu={setHiddenMenu} hiddenMenu={hiddenMenu}></Menu>
          </section>
        </div>

        <div className="lg:col-span-10 h-full mt-5 lg:mt-0 bg-white px-5 pt-10 lg:p-10 rounded-t-3xl">
          <Switch>
            <Route path="/ppdb/dashboard">
              <p>Dashboard</p>
            </Route>
            <Route path="/ppdb/tes">
          <Tes></Tes>
            </Route>
            <Route path="/ppdb/identitas">
            <p>Dashboard</p>
            </Route>
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}
