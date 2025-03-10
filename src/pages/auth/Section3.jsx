import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
<<<<<<< HEAD
=======
import { FaCheckCircle } from "react-icons/fa";
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
export default function Section3() {
  useEffect(function () {
    Aos.init();
  }, []);
  return (
<<<<<<< HEAD
    <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-5 ">
      <div className=" col-span-1 lg:col-span-3">
        {" "}
        <div className="text-center mb-8 rounded-3xl">
          <h4 className="text-white text-4xl font-bold mb-2">
            Jalur Seleksi dan Daya Tampung
=======
    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-5 ">
      <div className=" col-span-1 lg:col-span-2">
        {" "}
        <div className="text-center mb-8 rounded-3xl">
          <h4 className="text-white text-4xl font-bold mb-2">
            Program Pendidikan
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
          </h4>
          <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
        </div>
      </div>
<<<<<<< HEAD
     
=======

>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
      <section>
        <div
          style={{
            height: 500,
          }}
          className="border border-white rounded-2xl  relative  px-5 py-2 bg-white shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <div
              style={{
                height: 30,
                width: 30,
              }}
              className=" rounded-full mb-5 mt-5 bg-red-500"
            ></div>
          </div>
          <h4
            className="text-xl font-bold text-[#06579E]"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
<<<<<<< HEAD
            Jalur Prestasi
          </h4>
          <p className="text-gray-500  mt-5  text-justify">
            Jalur masuk yang diperuntukan bagi peserta didik lulusan MTs/SMP
            yang memiliki kualifikasi prestasi sebagaimana yang telah ditentukan
            oleh panitia PPDBM
          </p>

          <div className="mt-5 absolute bottom-0 pb-5 px-2 ">
            <h2 className="text-md font-bold text-[#06579E] mb-2">
              Daya Tampung
            </h2>
            <p className=" mb-2 text-md italic">15% dari jumlah daya tampung</p>
=======
            Teknik Komputer dan Jaringan
          </h4>
          {/* <p className="text-gray-500 mb-5 mt-2  text-justify">Santri yang</p> */}

          <div className="mt-5">
            {[
              "Hafalan Alqur'an 3 Juz dan Hadist Arba'in Nawawi",
              "Beraqidah Ahlusunnah Wal Jama'ah",
             
              "Mengikuti dan Menyelesaikan program Cisco Academy",
             
              "Membuat Karya Tulis (e-book)",
              "Menguasai Linux Fundamental",
              "Mendapatkan Sertifikasi Internasional",
              "Mendapatkan Sertifikasi Internasional",
              
            ].map((item, index) => (
              <li key={index} className="flex items-center text-gray-500">
                <FaCheckCircle className="text-green-400 mr-3" /> {item}
              </li>
            ))}
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
          </div>
        </div>
      </section>
      <section>
        {" "}
        <div
          style={{
            height: 500,
          }}
          className="border border-white rounded-2xl  relative  px-5 py-2 bg-white shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <div
              style={{
                height: 30,
                width: 30,
              }}
              className=" rounded-full mb-5 mt-5 bg-green-500"
            ></div>
          </div>
          <h4
            className="text-xl font-bold text-[#06579E]"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
<<<<<<< HEAD
            Jalur Reguler
          </h4>
          <p className="text-gray-500  mt-5  text-justify">
            Jalur ini disediakan untuk menjaring peserta didik lulusan MTs/SMP
            yang berkeinginan menempuh pendidikan di MAN 1 Kota Sukabumi dan
            memenuhi persyaratan yang telah ditentukan oleh Panitia PPDBM.
          </p>

          <div className="mt-5 absolute bottom-0 pb-5 px-2 ">
            <h2 className="text-md font-bold text-[#06579E] mb-2">
              Daya Tampung
            </h2>
            <p className=" mb-2 text-md italic">70% dari jumlah daya tampung</p>
          </div>
        </div>
      </section>
      <section>
        <div
          style={{
            height: 500,
          }}
          className="border border-white rounded-2xl  relative  px-5 py-2 bg-white shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <div
              style={{
                height: 30,
                width: 30,
              }}
              className=" rounded-full mb-5 mt-5 bg-yellow-500"
            ></div>
          </div>
          <h4
            className="text-xl font-bold text-[#06579E]"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            Jalur Afirmasi
          </h4>
          <p className="text-gray-500  mt-5  text-justify">
            Jalur ini disediakan untuk calon peserta didik yatim/piatu/yatim
            piatu dan/atau dari keluarga prasejahtera dan memenuhi persyaratan
            yang telah ditentukan oleh panitia PPDB.
          </p>

          <div className="mt-5 absolute bottom-0 pb-5 px-2 ">
            <h2 className="text-md font-bold text-[#06579E] mb-2">
              Daya Tampung
            </h2>
            <p className=" mb-2 text-md italic">15% dari jumlah daya tampung</p>
=======
            Rekayasa Perangkat Lunak
          </h4>
          <div className="mt-5">
            {[
              "Hafalan Alqur'an 3 Juz dan Hadist Arba'in Nawawi",
              "Beraqidah Ahlusunnah Wal Jama'ah",
             
              "Mengikuti dan Menyelesaikan program Cisco Academy",
             
              "Mampu membuat aplikasi berbasis web",
              "Mampu membuat aplikasi android",
              "Mampu membuat game edukasi",
              "Siap kerja menjadi Software Engineer",
              
            ].map((item, index) => (
              <li key={index} className="flex items-center text-gray-500">
                <FaCheckCircle className="text-green-400 mr-3" /> {item}
              </li>
            ))}
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
          </div>
        </div>
      </section>
    </div>
  );
}
