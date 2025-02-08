import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; 

import image1 from "../../image/image.png";
import Beranda from "./Section1";
import Section2 from "./Section2";
import JalurSeleksi from "./Section3";
import Persyaratan from "./Section4";
import Timeline from "./Section5";
import AlurPendaftaran from "./Alur";
import Materi from "./Materi";
import Footer from "./Footer";

export default function Layout() {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <React.Fragment>
      <div className="w-screen h-screen overflow-hidden">
        <header className="h-[10%] flex items-center justify-between w-full z-10 px-5 bg-white py-2">
          <section className="flex items-center space-x-5">
            <img className="rounded-lg h-16 w-16 p-4 " src={image1} alt="Logo" />
            <h2 className="text-2xl font-bold text-blue-400">
              PPDB MAN 1 KOTA SUKABUMI
            </h2>
          </section>

          {/* Menu Desktop */}
          <section className="hidden md:flex space-x-5">
            <button onClick={() => scrollToSection(berandaRef)} className="btn text-blue-400 text-md hover:text-blue-500">Beranda</button>
            <button onClick={() => scrollToSection(dayaTampungRef)} className="btn text-blue-400 text-md hover:text-blue-500">Jalur Seleksi</button>
            <button onClick={() => scrollToSection(dayaTampungRef)} className="btn text-blue-400 text-md hover:text-blue-500">Kuota Daya Tampung</button>
            <button onClick={() => scrollToSection(persyaratanRef)} className="btn text-blue-400 text-md hover:text-blue-500">Persyaratan</button>
            <button onClick={() => scrollToSection(timelineRef)} className="btn text-blue-400 text-md hover:text-blue-500">Time Line</button>
            <button onClick={() => scrollToSection(alurRef)} className="btn text-blue-400 text-md hover:text-blue-500">Alur Pendaftaran</button>
            <button onClick={() => scrollToSection(materiRef)} className="btn text-blue-400 text-md hover:text-blue-500">Materi Tes</button>
          </section>

          {/* Hamburger Menu Mobile */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes className="text-blue-400 text-3xl" /> : <FaBars className="text-blue-400 text-3xl" />}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.3 }} className="md:hidden absolute top-[60%] w-full bg-white shadow-lg py-5">
              <div className="flex flex-col items-center space-y-5">
                <button onClick={() => { scrollToSection(berandaRef); setMenuOpen(false); }} className="text-blue-400 text-3xl rounded-xl">Home</button>
                <button onClick={() => { scrollToSection(seleksiRef); setMenuOpen(false); }} className="text-blue-400 text-3xl rounded-xl">Jalur Seleksi</button>
                <button onClick={() => { scrollToSection(dayaTampungRef); setMenuOpen(false); }} className="text-blue-400 text-3xl rounded-xl">Kuota Daya Tampung</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Konten */}
        <section className="bg-blue-500 pt-20 items-center h-[90%] w-full overflow-auto">
          <div className="container mx-auto h-full">
            <section ref={berandaRef}><Beranda /></section>
            <section  className="px-3 md:px-6 py-12"><Section2 /></section>
            <section ref={dayaTampungRef} className="px-3 md:px-6 py-12"><JalurSeleksi /></section>
            <section ref={persyaratanRef} className="px-3 md:px-6 py-12"><Persyaratan /></section>
            <section ref={timelineRef} className="px-3 md:px-6 py-12"><Timeline /></section>
            <section ref={alurRef} className="px-3 md:px-6 py-12"><AlurPendaftaran /></section>
            <section ref={materiRef} className="px-3 md:px-6 py-12"><Materi /></section>
            <section><Footer /></section>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}
