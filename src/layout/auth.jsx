import React, { useState } from "react";
import ReactWhatsapp from "react-whatsapp";
import wa from "../image/wa.png";
import image1 from "../image/image.png";
import { Tooltip } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaBars, FaTimes, FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }) {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1E046C] ">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#647c98] backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <section className="flex items-center space-x-4">
            <img
              className="h-14 w-14 rounded-lg object-cover"
              src={image1}
              alt="Logo"
            />
            <h2 className="text-xl md:text-2xl font-bold text-white hidden lg:block">
              PMB SMK MADINATULQURAN
            </h2>
          </section>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => window.open("/")}
              className="flex items-center space-x-2 text-white hover:text-purple-200 transition-colors duration-300"
            >
              <FaHome className="text-lg" />
              <span className="font-medium">Home</span>
            </button>

            <button
              onClick={() => history.push("login")}
              className="flex items-center space-x-2 text-white hover:text-purple-200 transition-colors duration-300"
            >
              <FaSignInAlt className="text-lg" />
              <span className="font-medium">Login</span>
            </button>

            <button
              onClick={() => history.push("register")}
              className="bg-white text-[#1E046C] px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition-colors duration-300 flex items-center space-x-2"
            >
              <FaUserPlus className="text-lg" />
              <span>Register</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
          >
            {menuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 left-0 right-0 z-[9999999] bg-white/95 backdrop-blur-md rounded-b-lg shadow-xl mx-4"
          >
            <div className="flex flex-col py-4 px-6 space-y-4">
              <button
                onClick={() => {
                  window.open("/");
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-3 text-[#1E046C] py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors duration-300"
              >
                <FaHome className="text-lg" />
                <span className="font-medium">Home</span>
              </button>
              
              <button
                onClick={() => {
                  history.push("login");
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-3 text-[#1E046C] py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors duration-300"
              >
                <FaSignInAlt className="text-lg" />
                <span className="font-medium">Login</span>
              </button>
              
              <button
                onClick={() => {
                  history.push("register");
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-3 bg-[#1E046C] text-white py-2 px-4 rounded-lg hover:bg-[#2A0796] transition-colors duration-300"
              >
                <FaUserPlus className="text-lg" />
                <span className="font-medium">Register</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
    <main className="pt-24 mt- pb-10 min-h-[calc(100vh-6rem)] flex items-center justify-center">
  <div className="container mx-auto px-4">
    <div className="bg-white backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20 max-w-4xl mx-auto">
      <div className="p-6 md:p-8">
        {children}
      </div>
    </div>
  </div>
</main>

      {/* Floating WhatsApp Button */}
      {/* <div className="fixed bottom-6 right-6 z-40">
        <Tooltip label="Contact us on WhatsApp" placement="left">
          <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
            <ReactWhatsapp number="1234567890" message="Hello, I have a question">
              <img src={wa} alt="WhatsApp" className="w-6 h-6" />
            </ReactWhatsapp>
          </button>
        </Tooltip>
      </div> */}
    </div>
  );
}