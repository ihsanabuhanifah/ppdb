import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Section1() {
  const [welcomeText, setWelcomeText] = useState("");
  const fullText = "PMB SMK MADINATULQURAN 2025/2026";
 
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
      
      {/* Grid Container untuk tata letak kanan-kiri */}
      <div className="mt-8 mb-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4">
        {/* Kolom Kiri - Video YouTube */}
        <div className="order-2 lg:order-1">
          <div className="aspect-w-16 aspect-h-9 relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/watch?v=RhJo7yL1anQ&t=3s&ab_channel=CintaQuTV"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-white text-center mt-4 text-sm italic">
            Video profil SMK Madinatulquran
          </p>
        </div>

        {/* Kolom Kanan - Teks Deskripsi */}
        <div className="order-1 lg:order-2 text-white">
          <h2 className="font-bold text-xl mb-6 text-center lg:text-left">
            Tentang SMK Madinatulquran
          </h2>
          <div className="space-y-4">
            <p>
              SMK MADINATULQURAN merupakan SMK berbasis boarding di Kabupaten Bogor
              Jawa Barat berdiri sejak 2015.
            </p>
            <p>
              Sekolah ini memiliki dua jurusan di bidang teknologi informasi:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Teknik Komputer dan Jaringan (focus pada Networking dan SysAdmin)</li>
                <li>Rekayasa Perangkat Lunak (Web dan Mobile Programming)</li>
              </ul>
            </p>
            <p>
              SMK MADINATULQURAN telah menjadi Cisco Academy, Mikrotik Academy serta
              Redhat Academy yang akan memambahkan kompetensi peserta didik.
            </p>
            <p>
              Selain itu, SMK MADINATULQURAN juga sudah bekerja sama dengan ITC
              (International Test Center) dalam mengoptimalkan kemampuan berbahasa
              inggris peserta didik.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-white text-center font-bold text-xl mb-10">
          Kembangkan Potensi Bersama Kami
        </h4>
      </div>

      <div className="flex items-center justify-center mt-5 space-x-4">
        <button
          onClick={() => {
            history.push("/register");
          }}
          className="border px-16 py-3 font-bold text-white border-[#F6B023] rounded-full hover:bg-[#F6B023] transition duration-300"
        >
          Daftar PPDB
        </button>
        <button
          onClick={() => {
            window.open("https://smkmadinatulquran.sch.id/wp-content/uploads/2024/11/Brosur-PPDB-SMK-MQ-2025-2026.pdf", "_blank")
          }}
          className="border px-16 py-3 font-bold text-white border-[#F6B023] rounded-full hover:bg-[#F6B023] transition duration-300"
        >
          Download Brosur
        </button>
      </div>
    </>
  );
}