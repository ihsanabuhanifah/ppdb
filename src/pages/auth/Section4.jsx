import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

export default function Section4() {
  return (
    <div className="">
      <div className="  text-center mb-10 rounded-3xl">
        <h4 className="text-white text-4xl font-bold mb-">
          Persyaratan Pendaftaran
        </h4>
        <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
      </div>
      
<<<<<<< HEAD
        <div className="grid grid-cols-1  md:grid-cols-2 gap-10">
=======
        <div className="grid grid-cols-1  gap-10">
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
          {/* Persyaratan Umum */}
          <section className="space-y-5 h-full">
            <motion.div
              className=" p-8  rounded-3xl bg-white shadow-xl border border-white/20"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className=" left-6 flex items-center bg-yellow-500 text-white px-4 py-1 rounded-full shadow-lg">
                <HiDocumentText className="mr-2" />{" "}
                <span className="font-semibold ml-5">Persyaratan Umum</span>
              </div>
              <ul className="mt-6 space-y-4 text-md text-gray-500">
                {[
                  "Beragama Islam",
                  "Peserta didik kelas IX MTs/SMP",
                  "Usia maksimal 17 tahun pada 1 Juli 2025",
                  "Mengunggah (upload) foto berwarna  ukuran 3x4 dengan latar belakang merah dan berseragam Madrasah/Sekolah Asal (format foto JPG/JPEG kurang dari 1 Mb)",
                  "Print Screenshoot NISN yang diambil dari website: nisn.data.kemendikbud.go.id (Diserahkan saat Daftar Ulang)",
                  "Fc/Scan Rapot Semester 3, 4, dan 5 (Diserahkan saat Daftar Ulang)",
                  "Fc/Scan Rapot Semester 3, 4, dan 5 (Diserahkan saat Daftar Ulang)",
                  "Fc/Scan Kartu Keluarga (KK) (Diserahkan saat Daftar Ulang)",
                  "Fc/Scan Ijazah apabila sudah ada (Diserahkan saat Daftar Ulang)",
                  "Fc/Scan Surat Keterangan Hasil Ujian (KHUn atau SKHUN) (Diserahkan saat Daftar Ulang)",
                  "Fc/Scan Surat keterangan kelakuan baik (SKKB) dari Sekolah (Diserahkan saat Daftar Ulang)",
                  "Fc/Scan Akta Lahir (Dibawa saat Daftar Ulang)"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheckCircle className="text-green-400 mr-3" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
<<<<<<< HEAD
            <motion.div
=======
            {/* <motion.div
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
              className=" p-8 rounded-3xl bg-white  row-span-3 shadow-xl border border-white/20"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className=" left-6 flex  items-center bg-red-500 text-white px-4 py-1 rounded-full shadow-lg">
                <HiDocumentText className="mr-2" />{" "}
                <span className="font-semibold ml-5">
                  Persyaratan Khusus (Afirmasi)
                </span>
              </div>
              <ul className="mt-6 space-y-4 text-md text-gray-500">
                {[
                  "Scan Kartu Indonesia Pintar",
                  "Scan Program Keluarga Harapan",
                  "Scan Kartu Keluarga Sejahtera",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheckCircle className="text-yellow-400 mr-3" /> {item}
                  </li>
                ))}
              </ul>
<<<<<<< HEAD
            </motion.div>
=======
            </motion.div> */}
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
          </section>
          <section className="space-y-5 h-full ">
            

            {/* Persyaratan Khusus */}
<<<<<<< HEAD
            <motion.div
              className=" p-8   rounded-3xl bg-white  backdrop-blur-lg shadow-xl border border-white/20"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className=" left-6  flex items-center bg-blue-500 text-white px-4 py-1 rounded-full shadow-lg">
                <HiDocumentText className="mr-2" />{" "}
                <span className="font-semibold ml-5">Jalur Prestasi</span>
              </div>

              <h2 className="text-gray-500 mt-5 text-lg">
                Jalur prestasi wajib mengupload bukti prestasi berupa sertifikat
                yang memenuhi persyartan sebagai berikut :
              </h2>
              <div>
                <div className="mt-5">
                  <h2 className="text-gray-500  text-lg">
                    {" "}
                    1. Prestasi akademik diantaranya :
                  </h2>
                </div>
                <ol className="mt-3 ml-4 list-decimal space-y-2 text-sm text-gray-500">
                  {[
                    "Juara 1,2 & 3 Olimpiade/KSM/MYRES/OSN/OSP/OPSI/LKTI/atau lomba yang diselenggarakan oleh kemenag, kemendikdasmen, Kemendikti, instansi resmi pemerintah minimal tingkat kabupaten atau",
                    ,
                    "Mendapat rekomendasi dari kepala sekolah bahwa siswa tersebut terbaik 1-5 dalam satu kelas dan layak mendaftar di jalur prestasi akademik",
                  ].map((item, index) => (
                    <li className="ml-6" key={index}>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <div className="mt-5">
                  <h2 className="text-gray-500  text-lg">
                    {" "}
                    2. Prestasi Non Akademik diantaranya :
                  </h2>

                  <h5 className="text-gray-500  text-sm ml-5">
                    Juara lomba PORSENI (Pekan Olah Raga Dan Seni)/PORDA (Pekan
                    Olah Raga Daerah) atau instansi resmi;
                  </h5>
                </div>
                <ol className="mt-3 ml-5 list-decimal space-y-2 text-sm text-gray-500">
                  {[
                    "Tingkat Kabupaten: Juara 1 beregu atau Juara 1, 2, 3 perorangan",
                    "Tingkat Provinsi: Juara 1, 2, 3 dan Harapan 1 (beregu atau perorangan)",
                    "Tingkat Nasional: Juara 1,2,3 dan Harapan 1,2,3 (beregu dan Perorangan)",
                  ].map((item, index) => (
                    <li className="ml-6" key={index}>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
=======
           
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
          </section>
        </div>
      
     
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
