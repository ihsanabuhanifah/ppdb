import React, { useState } from "react";
import ReactWhatsapp from "react-whatsapp";
import wa from "../image/wa.png";
import image1 from "../image/image.png";

import { Tooltip } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Import animasi

export default function Layout({ children }) {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="w-screen h-screen  overflow-hidden">
        {/* <div
          className="absolute inset-0 bg-cover bg-center"
         
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div> */}
        {/* Header */}
        <header className="h-[10%] flex items-center justify-between  w-full z-10 px-5 bg-white py-2">
          <section className="flex items-center space-x-5">
            <img
              className="rounded-lg h-16 w-16 p-4 "
              src={image1}
              alt="Logo"
            />
            <h2 className="text-2xl font-bold text-blue-400">
              PPDB MAN 1 KOTA SUKABUMI
            </h2>
          </section>

          {/* Menu untuk Desktop */}
          <section className="hidden md:flex space-x-5">
            <button
              onClick={() => history.push("home")}
              className="btn text-blue-400 text-md hover:text-blue-500 "
            >
              Jalur Seleksi
            </button>

            <button
              onClick={() => history.push("home")}
              className="btn text-blue-400 text-md hover:text-blue-500 "
            >
              Kuota Daya Tampung
            </button>
            <button
              onClick={() => history.push("home")}
              className="btn text-blue-400 text-md hover:text-blue-500 "
            >
              Persyaratan
            </button>
            <button
              onClick={() => history.push("home")}
              className="btn text-blue-400 text-md hover:text-blue-500 "
            >
              Time Line
            </button>
            <button
              onClick={() => history.push("home")}
              className="btn text-blue-400 text-md hover:text-blue-500 "
            >
              Alur Pendaftaran
            </button>
            <button
              onClick={() => history.push("home")}
              className="btn text-blue-400 text-md hover:text-blue-500 "
            >
              Materi Tes
            </button>
            <button
              onClick={() => history.push("login")}
              className="btn text-blue-400 text-md hover:text-blue-500 "
            >
              Login
            </button>
            <button
              onClick={() => history.push("register")}
              className="btn text-blue-400 text-md hover:text-blue-500 "
            >
              Register
            </button>
          </section>

          {/* Hamburger Menu untuk Mobile */}
          <div className="md:hidden ">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <FaTimes className="text-blue-400 text-3xl" />
              ) : (
                <FaBars className="text-blue-400 text-3xl" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Menu dengan Animasi */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-[60%] w-full bg-white shadow-lg py-5"
            >
              <div className="flex flex-col items-center space-y-5">
                <button
                  onClick={() => {
                    history.push("home");
                    setMenuOpen(false);
                  }}
                  className="text-blue-400 text-3xl rounded-xl"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    history.push("login");
                    setMenuOpen(false);
                  }}
                  className="text-blue-400 text-3xl rounded-xl"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    history.push("register");
                    setMenuOpen(false);
                  }}
                  className="text-blue-400 text-3xl rounded-xl"
                >
                  Register
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Konten Utama */}
        <section className=" bg-blue-500  pt-20 items-center h-[90%] w-full overflow-auto">
          {children}
        </section>
      </div>
    </React.Fragment>
  );
}
