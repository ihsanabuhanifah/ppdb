import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import bg from "../../image/image.png";

import image1 from "../../image/image.png";
import wa from "../../image/wa.png";
import Beranda from "./Beranda";

import JalurSeleksi from "./Section3";
import Persyaratan from "./Section4";
import Timeline from "./Waktu";
import AlurPendaftaran from "./Alur";
import Materi from "./Materi";
import Footer from "./Footer";
import Aos from "aos";
import "aos/dist/aos.css";
import ReactWhatsapp from "react-whatsapp";
import clsx from "clsx";
import Pencapaian from "./Pencapaian";

export default function Layout() {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(true);
  const [hidden, setHidden] = React.useState();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSection, setShowSection] = useState(true);

  const sectionRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  // Refs untuk setiap section
  const berandaRef = useRef(null);
  const seleksiRef = useRef(null);
  const dayaTampungRef = useRef(null);
  const persyaratanRef = useRef(null);
  const timelineRef = useRef(null);
  const alurRef = useRef(null);
  const materiRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        setScrollY(sectionRef.current.scrollTop);
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (section) {
        section.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  console.log("sc", scrollY);

  return (
    <React.Fragment>
      <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        }}
        className="w-screen h-screen overflow-hidden "
      >
        <section
          style={{ backgroundColor: "rgb(22,165,88,0.9)" }}
          className={`items-center justify-between py-2 px-5  hidden lg:flex transition-all duration-500 ${
            scrollY < 100
              ? "opacity-100 h-auto translate-y-0"
              : "opacity-0 h-0 overflow-hidden -translate-y-100 absolute -z-100"
          }`}
        >
          <div className="text-white font-semibold">
          Kontak Panitia (085888222457)
          </div>
          <div className="space-x-4">
            {" "}
            <button
              onClick={() => {
                history.push("/register");
              }}
              className="border px-8 py-2 font-bold  text-white bg-[#F6B023] rounded-full hover:bg-[#F6B023] transition duration-300"
            >
              Daftar
            </button>
            <button
              onClick={() => {
                history.push("/login");
              }}
              className="border px-8 py-2 font-bold  text-white bg-[#F6B023] rounded-full hover:bg-[#F6B023] transition duration-300"
            >
              Masuk
            </button>
          </div>
        </section>
        <header className=" h-[10%] lg:h-[8%] flex items-center justify-between w-full z-10 px-5 bg-white py-2">
          <section className="flex items-center space-x-5">
            <img
              className="rounded-lg h-20 w-20 p-4 "
              src={image1}
              alt="Logo"
            />
            <h2 className="text-2xl font-bold hidden lg:block text-green-400">
              PMB SMK MADINATULQURAN
            </h2>
          </section>

          {/* Menu Desktop */}
          <section className="hidden md:flex space-x-5">
            <button
              onClick={() => scrollToSection(berandaRef)}
              className="btn text-green-400 text-md hover:text-green-500 font-semibold"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection(dayaTampungRef)}
              className="btn text-green-400 text-md hover:text-green-500 font-semibold"
            >
              Program Pendidikan
            </button>
            <button
              onClick={() => scrollToSection(seleksiRef)}
              className="btn text-green-400 text-md hover:text-green-500 font-semibold"
            >
             Pencapaian
            </button>
            <button
              onClick={() => scrollToSection(persyaratanRef)}
              className="btn text-green-400 text-md hover:text-green-500 font-semibold"
            >
              Persyaratan
            </button>
            <button
              onClick={() => scrollToSection(timelineRef)}
              className="btn text-green-400 text-md hover:text-green-500 font-semibold"
            >
             Biaya Pendidikan
            </button>
            <button
              onClick={() => scrollToSection(alurRef)}
              className="btn text-green-400 text-md hover:text-green-500 font-semibold"
            >
              Alur Pendaftaran
            </button>
            <button
              onClick={() => scrollToSection(materiRef)}
              className="btn text-green-400 text-md hover:text-green-500 font-semibold"
            >
              Materi Tes
            </button>
          </section>

          {/* Hamburger Menu Mobile */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <FaTimes className="text-green-400 text-3xl" />
              ) : (
                <FaBars className="text-green-400 text-3xl" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
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
                    scrollToSection(berandaRef);
                    setMenuOpen(false);
                  }}
                  className="text-green-400 text-xl rounded-xl"
                >
                  Beranda
                </button>
                <button
                  onClick={() => {
                    scrollToSection(dayaTampungRef);
                    setMenuOpen(false);
                  }}
                  className="text-green-400 text-xl rounded-xl"
                >
                 Program Pendidikan
                </button>
                
                <button
                  onClick={() => {
                    scrollToSection(persyaratanRef);
                    setMenuOpen(false);
                  }}
                  className="text-green-400 text-xl rounded-xl"
                >
                  Persyaratan
                </button>
                <button
                  onClick={() => {
                    scrollToSection(timelineRef);
                    setMenuOpen(false);
                  }}
                  className="text-green-400 text-xl rounded-xl"
                >
                 Biaya Pendidikan
                </button>
                <button
                  onClick={() => {
                    scrollToSection(alurRef);
                    setMenuOpen(false);
                  }}
                  className="text-green-400 text-xl rounded-xl"
                >
                  Alur Pendaftaran
                </button>
                <button
                  onClick={() => {
                    scrollToSection(materiRef);
                    setMenuOpen(false);
                  }}
                  className="text-green-400 text-xl rounded-xl"
                >
                  Materi Tes
                </button>

                <button
                  onClick={() => {
                    history.push("/login");
                  }}
                  className="text-green-400 text-xl rounded-xl"
                >
                  Masuk
                </button>
                <button
                  onClick={() => {
                    history.push("/register");
                  }}
                  className="text-green-400 text-xl rounded-xl"
                >
                  Daftar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Konten dengan efek Parallax */}
        <section
          ref={sectionRef}
          className={clsx(`h-[90%] w-full overflow-auto `, {})}
        >
          <section
            ref={berandaRef}
            className="p-10  min-h-screen flex items-center justify-center"
            style={{ backgroundColor: "rgb(22,165,88,0.9)" }}
          >
            <div><Beranda /></div>
          </section> 
         
          <section
        //    style={{ backgroundColor: "rgb(22,165,88,0.9)" }}
            ref={dayaTampungRef}
            className="px-3 md:px-6 py-12 "
          >
            <JalurSeleksi />
          </section>

          <section
            style={{ backgroundColor: "rgb(22,165,88,0.9)" }}
            ref={seleksiRef}
            className="px-3 md:px-6 py-12 "
          >
            <Pencapaian />
          </section>
          <section  style={{ backgroundColor: "rgb(22,165,88,0.9)" }}  ref={persyaratanRef} className="px-3 md:px-6 py-12">
            <Persyaratan />
          </section>
          <section
             style={{ backgroundColor: "rgb(22,165,88,0.9)" }}
            ref={timelineRef}
            className="px-3 md:px-6 py-12"
          >
            <Timeline />
          </section>
          <section ref={alurRef} className="px-3 md:px-6 py-12 ">
            <AlurPendaftaran />
          </section>
          <section ref={materiRef} className="px-3 md:px-6 py-12">
            <Materi />
          </section>
          <section className="bg-[#06579E]">
            <Footer />
          </section>
        </section>
      </div>
    </React.Fragment>
  );
}