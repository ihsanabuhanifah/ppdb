import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import bg from "../../image/bg.png";
import bg2 from "../../image/bg.png";
import image1 from "../../image/image.png";
import wa from "../../image/wa.png";
import Beranda from "./Section1";
import Section2 from "./Section2";
import JalurSeleksi from "./Section3";
import Persyaratan from "./Section4";
import Timeline from "./Waktu";
import AlurPendaftaran from "./Alur";
import Materi from "./Materi";
import Footer from "./Footer";
import Aos from "aos";
import "aos/dist/aos.css";
import ReactWhatsapp from "react-whatsapp";
export default function Layout() {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(true);
  const [hidden, setHidden] = React.useState(true);

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
      if (window.scrollY > 10) {
        setShowContact(false); // Sembunyikan kontak saat scroll ke bawah
      } else {
        setShowContact(true); // Tampilkan kontak saat di atas
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-screen h-screen overflow-hidden "
      >
        <section
          style={{ backgroundColor: "rgba(43,105,236, 0.9)" }}
          className={`items-center justify-between py-2 px-5 hidden lg:flex transition-all duration-500 ${
            showContact ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <div className="text-white font-semibold">
            Kontak Panitia (Kesiswaan MAN 1 Kota Sukabumi: 085718025089)
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
            <h2 className="text-2xl font-bold hidden lg:block text-blue-400">
              PPDB MAN 1 KOTA SUKABUMI 2025
            </h2>
          </section>

          {/* Menu Desktop */}
          <section className="hidden md:flex space-x-5">
            <button
              onClick={() => scrollToSection(berandaRef)}
              className="btn text-blue-400 text-md hover:text-blue-500"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection(dayaTampungRef)}
              className="btn text-blue-400 text-md hover:text-blue-500"
            >
              Jalur Seleksi dan Kuota
            </button>
            {/* <button
              onClick={() => scrollToSection(dayaTampungRef)}
              className="btn text-blue-400 text-md hover:text-blue-500"
            >
              Kuota Daya Tampung
            </button> */}
            <button
              onClick={() => scrollToSection(persyaratanRef)}
              className="btn text-blue-400 text-md hover:text-blue-500"
            >
              Persyaratan
            </button>
            <button
              onClick={() => scrollToSection(timelineRef)}
              className="btn text-blue-400 text-md hover:text-blue-500"
            >
              Time Line
            </button>
            <button
              onClick={() => scrollToSection(alurRef)}
              className="btn text-blue-400 text-md hover:text-blue-500"
            >
              Alur Pendaftaran
            </button>
            <button
              onClick={() => scrollToSection(materiRef)}
              className="btn text-blue-400 text-md hover:text-blue-500"
            >
              Materi Tes
            </button>
          </section>

          {/* Hamburger Menu Mobile */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <FaTimes className="text-blue-400 text-3xl" />
              ) : (
                <FaBars className="text-blue-400 text-3xl" />
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
              className="md:hidden absolute top-[60%] w-full bg-white shadow-lg py-5"
            >
              <div className="flex flex-col items-center space-y-5">
                <button
                  onClick={() => {
                    scrollToSection(berandaRef);
                    setMenuOpen(false);
                  }}
                  className="text-blue-400 text-3xl rounded-xl"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    scrollToSection(seleksiRef);
                    setMenuOpen(false);
                  }}
                  className="text-blue-400 text-3xl rounded-xl"
                >
                  Jalur Seleksi
                </button>
                <button
                  onClick={() => {
                    scrollToSection(dayaTampungRef);
                    setMenuOpen(false);
                  }}
                  className="text-blue-400 text-3xl rounded-xl"
                >
                  Kuota Daya Tampung
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Konten dengan efek Parallax */}
        <section className="h-[90%] w-full overflow-auto pb-10  ">
          <section
            className="p-10"
            style={{ backgroundColor: "rgba(43,105,236, 0.9)" }}
          >
            <Beranda />
          </section>
          <section
            style={{ backgroundColor: "rgba(43,105,236, 0.9)" }}
            className="px-3 md:px-6 py-12"
          >
            <Section2 />
          </section>
          <section
            ref={dayaTampungRef}
            className="px-3 md:px-6 py-12 bg-gray-50"
          >
            <JalurSeleksi />
          </section>
          <section ref={persyaratanRef} className="px-3 md:px-6 py-12">
            <Persyaratan />
          </section>
          <section
            style={{ backgroundColor: "rgba(43,105,236, 0.9)" }}
            ref={timelineRef}
            className="px-3 md:px-6 py-12"
          >
            <Timeline />
          </section>
          <section ref={alurRef} className="px-3 md:px-6 py-12 bg-gray-50">
            <AlurPendaftaran />
          </section>
          <section ref={materiRef} className="px-3 md:px-6 py-12">
            <Materi />
          </section>
          <section className="bg-[#06579E]">
            <Footer />
          </section>
        </section>

        <div
          className={`${
            hidden ? "block" : "hidden"
          } relative  px-5 py-5 grid grid-cols-1 gap-4 shadow-lg border bg-white `}
        >
          <ReactWhatsapp number={"+62895320050324"} message={""}>
            <div className=" p-2 flex items-center justify-center ">
              <img
                className={`w-4 h-4 shadow-xl `}
                src={wa}
                alt="whatsapp.png"
              />
              <p className="text-blue-400  ml-2 ">Hubungi Ustadz. Ihsan</p>
            </div>
          </ReactWhatsapp>
        </div>
      </div>
    </React.Fragment>
  );
}
