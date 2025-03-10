import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Section1() {
  const [welcomeText, setWelcomeText] = useState("");
  const fullText = "PPDB SMK MADINATULQURAN 2025/2026";
  const [counters, setCounters] = useState({
    total: 0,
    mts: 0,
    smp: 0,
    pkbm: 0,
    pps: 0,
    wustha: 0,
  });
  const history = useHistory();

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setWelcomeText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) {
        index = 0;
        setWelcomeText("");
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <h4 className="text-white text-center font-bold text-2xl lg:text-4xl lg:ext-6xl h-20">
        Selamat Datang di {welcomeText}
      </h4>
      <div className="mt-5 ">
        <h2 className="text-white text-center hidden lg:block font-bold text-xl mb-10">
          SMK MADINATULQURAN merupakan SMK berbasis boarding di Kabupaten Bogor
          Jawa Barat berdiri sejak 2015.  <br/>Sekolah ini memiliki dua jurusan di
          bidang teknologi informasi, yaitu Teknik Komputer dan Jaringan (focus
          pada Networking dan SysAdmin)  <br/>serta Rekayasa Perangkat Lunak (Web dan
          Mobile Programming).  <br/> SMK MADINATULQURAN telah menjadi Cisco Academy,
          Mikrotik Academy serta Redhat Academy yang akan memambahkan kompetensi
          peserta didik.  <br/> Selain itu, SMK MADINATULQURAN juka sudah bekerja sama dengan ITC (International Test Center)  <br/> dalam mengoptimatkan kemampuan berbahasa inggris peserta didik.
        </h2>
        )
        <h4 className="text-white text-center font-bold text-xl mb-10">
        Kembangkan Potensi Berasama Kami
        </h4>
      </div>

      <div></div>
      <div className="flex items-center justify-center mt-5 space-x-4">
        <button
          onClick={() => {
            history.push("/register");
          }}
          className="border px-16 py-3 font-bold text-white border-[#F6B023] rounded-full hover:bg-[#F6B023] transition duration-300"
        >
          Daftar PPDB
        </button>
      </div>
      {/* <div className="text-center mb-8 rounded-3xl mt-10">
        <h4 className="text-white text-4xl font-bold mb-2">
          Statistik Pendaftar
        </h4>
        <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
      </div> */}
    </>
  );
}
