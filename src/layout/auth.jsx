import React, { useState } from "react";
import ReactWhatsapp from "react-whatsapp";
import wa from "../image/wa.png";
import image1 from "../image/image.png";

import { Tooltip } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Import animasi
<<<<<<< HEAD
import bg from "../image/bg.png";
=======
import bg from "../image/image.png";
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
export default function Layout({ children }) {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <React.Fragment>
      <div
<<<<<<< HEAD
        style={{
          backgroundImage: `url(${bg})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-screen h-screen  overflow-hidden"
=======
        
        className="w-screen h-screen overflow-auto "
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
      >
        {/* <div
          className="absolute inset-0 bg-cover bg-center"
         
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div> */}
        {/* Header */}
<<<<<<< HEAD
        <header className="h-[10%] lg:h-[8%] flex items-center justify-between  w-full z-10 px-5 bg-white py-2">
          <section className="flex items-center space-x-5">
          <img
              className="rounded-lg h-20 w-20 p-4 "
              src={image1}
              alt="Logo"
            />
           <h2 className="text-2xl font-bold hidden lg:block text-blue-400">
=======
        <header className="h-[10%] lg:h-[8%] flex items-center justify-between  w-full z-10 px-5 bg-green-500 py-2">
          <section className="flex items-center space-x-5">
          <img
              className="rounded-full h-20 w-20 p-4 "
              src={image1}
              alt="Logo"
            />
           <h2 className="text-2xl font-bold hidden lg:block text-white">
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
              PPDB MAN 1 KOTA SUKABUMI
            </h2>
          </section>

          {/* Menu untuk Desktop */}
          <section className="hidden md:flex space-x-5">
            <button
              onClick={() => history.push("/")}
<<<<<<< HEAD
              className="btn text-blue-400 text-md hover:text-blue-500 font-semibold"
=======
              className="btn text-white text-md hover:text-green-500 font-semibold"
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
            >
              Beranda
            </button>

            <button
              onClick={() => history.push("login")}
<<<<<<< HEAD
              className="btn text-blue-400 text-md hover:text-blue-500 font-semibold "
=======
              className="btn text-white text-md hover:text-green-500 font-semibold "
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
            >
              Login
            </button>
            <button
              onClick={() => history.push("register")}
<<<<<<< HEAD
              className="btn text-blue-400 text-md hover:text-blue-500 font-semibold "
=======
              className="btn text-white text-md hover:text-green-500 font-semibold "
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
            >
              Register
            </button>
          </section>

          {/* Hamburger Menu untuk Mobile */}
          <div className="md:hidden ">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
<<<<<<< HEAD
                <FaTimes className="text-blue-400 text-3xl" />
              ) : (
                <FaBars className="text-blue-400 text-3xl" />
=======
                <FaTimes className="text-white text-3xl" />
              ) : (
                <FaBars className="text-white text-3xl" />
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
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
<<<<<<< HEAD
                  className="text-blue-400 text-xl rounded-xl"
=======
                  className="text-white text-xl rounded-xl"
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
                >
                  Beranda
                </button>
                <button
                  onClick={() => {
                    history.push("login");
                    setMenuOpen(false);
                  }}
<<<<<<< HEAD
                   className="text-blue-400 text-xl rounded-xl"
=======
                   className="text-green-400 text-xl rounded-xl"
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
                >
                  Masuk
                </button>
                <button
                  onClick={() => {
                    history.push("register");
                    setMenuOpen(false);
                  }}
<<<<<<< HEAD
                  className="text-blue-400 text-xl rounded-xl"
=======
                  className="text-green-400 text-xl rounded-xl"
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
                >
                  Daftar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Konten Utama */}
<<<<<<< HEAD
        <section style={{ backgroundColor: "rgba(43,105,236, 0.9)" }} className="   pt-20 items-center h-[90%] w-full overflow-auto">
=======
        <section  className="  pt-20 items-center h-[90%] w-full overflow-auto">
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
          {children}
        </section>
      </div>
    </React.Fragment>
  );
}