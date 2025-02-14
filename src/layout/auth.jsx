import React, { useState } from "react";
import ReactWhatsapp from "react-whatsapp";
import wa from "../image/wa.png";
import image1 from "../image/image.png";

import { Tooltip } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Import animasi
import bg from "../image/bg.jpg";
export default function Layout({ children }) {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <React.Fragment>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-screen h-screen  overflow-hidden"
      >
        {/* <div
          className="absolute inset-0 bg-cover bg-center"
         
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div> */}
        {/* Header */}
        <header className="h-[10%] lg:h-[8%] flex items-center justify-between  w-full z-10 px-5 bg-white py-2">
          <section className="flex items-center space-x-5">
          <img
              className="rounded-lg h-20 w-20 p-4 "
              src={image1}
              alt="Logo"
            />
           <h2 className="text-2xl font-bold hidden lg:block text-blue-400">
              PPDB MAN 1 KOTA SUKABUMI
            </h2>
          </section>

          {/* Menu untuk Desktop */}
          <section className="hidden md:flex space-x-5">
            <button
              onClick={() => history.push("/")}
              className="btn text-blue-400 text-md hover:text-blue-500 font-semibold"
            >
              Beranda
            </button>

            <button
              onClick={() => history.push("login")}
              className="btn text-blue-400 text-md hover:text-blue-500 font-semibold "
            >
              Login
            </button>
            <button
              onClick={() => history.push("register")}
              className="btn text-blue-400 text-md hover:text-blue-500 font-semibold "
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
              className="md:hidden absolute top-[0%] z-50 h-screen w-full bg-white shadow-lg py-5"
            >
              <div className="flex flex-col items-center space-y-5">
              <button
                  onClick={() => {
                    history.push("home");
                    setMenuOpen(false);
                  }}
                  className="text-blue-400 text-xl rounded-xl"
                >
                  Beranda
                </button>
                <button
                  onClick={() => {
                    history.push("login");
                    setMenuOpen(false);
                  }}
                   className="text-blue-400 text-xl rounded-xl"
                >
                  Masuk
                </button>
                <button
                  onClick={() => {
                    history.push("register");
                    setMenuOpen(false);
                  }}
                  className="text-blue-400 text-xl rounded-xl"
                >
                  Daftar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Konten Utama */}
        <section style={{ backgroundColor: "rgba(43,105,236, 0.9)" }} className="   pt-20 items-center h-[90%] w-full overflow-auto">
          {children}
        </section>
      </div>
    </React.Fragment>
  );
}
