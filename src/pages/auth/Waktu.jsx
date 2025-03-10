import React from "react";
import { motion } from "framer-motion";

const TimelineTable = ({ title, data, color }) => {
  return (
<<<<<<< HEAD
    <motion.div 
    // initial={{ opacity: 0.5, y:100 }} 
    // whileView={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
=======
    <motion.div
      // initial={{ opacity: 0.5, y:100 }}
      // whileView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
      className="  bg-white shadow-lg rounded-lg p-6 my-6"
    >
      <h2 className={`text-2xl font-bold text-gray-800 mb-4`}>{title}</h2>
      <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className={`${color} text-white`}>
            <th className="p-3 text-left">Uraian Kegiatan</th>
<<<<<<< HEAD
            <th className="p-3 text-left">Pelaksanaan</th>
=======
            <th className="p-3 text-left">Biaya</th>
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((item, index) => (
<<<<<<< HEAD
            <motion.tr 
              key={index} 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
=======
            <motion.tr
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={index % 2 === 0 ? "bg-gray-100" : ""}
            >
              <td className="p-3 border-b border-gray-300">{item.uraian}</td>
<<<<<<< HEAD
              <td className="p-3 border-b border-gray-300">{item.pelaksanaan}</td>
=======
              <td className="p-3 border-b border-gray-300">
                {item.pelaksanaan}
              </td>
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

const Timeline = () => {
  const dataGelombang1 = [
<<<<<<< HEAD
    { uraian: "Pendaftaran Online/Offline PPDBM", pelaksanaan: "14 Februari 2025 – 21 Maret 2025" },
    { uraian: "Verifikasi Berkas", pelaksanaan: "14 Februari 2025 – 21 Maret 2025" },
    { uraian: "Seleksi CBT", pelaksanaan: "6 Maret 2025 – 21 Maret 2025" },
    { uraian: "Pengumuman Hasil Seleksi CBT", pelaksanaan: "6 Maret 2025 – 21 Maret 2025" },
   
    { uraian: "Daftar Ulang", pelaksanaan: "6 Maret 2025 – 25 Maret 2025" }
  ];

  const dataGelombang2 = [
    { uraian: "Pendaftaran Online/Offline PPDBM", pelaksanaan: "9 April 2025 – 26 Juni 2025" },
    { uraian: "Verifikasi Berkas", pelaksanaan: "9 April 2025 – 26 Juni 2025" },
    { uraian: "Seleksi CBT", pelaksanaan: "9 April 2025 – 26 Juni 2025" },
    { uraian: "Pengumuman Hasil Seleksi CBT", pelaksanaan: "9 April 2025 – 26 Juni 2025" },
   
    { uraian: "Daftar Ulang", pelaksanaan: "9 April 2025 – 30 Juni 2025" }
  ];
  const dataGelombang3 = [
    { uraian: "Pendaftaran Online/Offline PPDBM", pelaksanaan: "1 - 2 Juli 2025" },
    { uraian: "Verifikasi Berkas", pelaksanaan: "1 - 2 Juli 2025" },
    { uraian: "Seleksi CBT", pelaksanaan: "3 - 4 Juli 2025" },
    { uraian: "Pengumuman Hasil Seleksi CBT", pelaksanaan: "5 Juli 2025" },
    
    { uraian: "Daftar Ulang", pelaksanaan: "9 - 10 Juli 2025" }
=======
    { uraian: "Waktu Gelombang 1", pelaksanaan: "Agustus - Desember 2024" },
    { uraian: "Pendaftaran Online/Offline PPDBM", pelaksanaan: "Rp, 450.000" },
    { uraian: "Uang Masuk Gelombang 1", pelaksanaan: "Rp. 14.500.000" },
    { uraian: "SPP Bulanan", pelaksanaan: "Rp. 2.500.000" },
    {
      uraian: "Daftar Ulang (Ketika Nilai Kelas)",
      pelaksanaan: "Rp, 3.500.000",
    },
  ];

  const dataGelombang2 = [
    { uraian: "Waktu Gelombang 2", pelaksanaan: "Januari - Maret 2025" },
    { uraian: "Pendaftaran Online/Offline PPDBM", pelaksanaan: "Rp, 450.000" },
    { uraian: "Uang Masuk Gelombang 2", pelaksanaan: "Rp. 16.500.000" },
    { uraian: "SPP Bulanan", pelaksanaan: "Rp. 2.500.000" },
    {
      uraian: "Daftar Ulang (Ketika Nilai Kelas)",
      pelaksanaan: "Rp, 3.500.000",
    },
  ];
  const dataGelombang3 = [
    { uraian: "Waktu Gelombang 3", pelaksanaan: "April - Juni 2025" },
    { uraian: "Pendaftaran Online/Offline PPDBM", pelaksanaan: "Rp, 450.000" },
    { uraian: "Uang Masuk Gelombang 3", pelaksanaan: "Rp. 18.500.000" },
    { uraian: "SPP Bulanan", pelaksanaan: "Rp. 2.500.000" },
    {
      uraian: "Daftar Ulang (Ketika Nilai Kelas)",
      pelaksanaan: "Rp, 3.500.000",
    },
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5  ">
<<<<<<< HEAD
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="text-center mb-6 col-span-1 lg:col-span-3 "
      >
        <h1 className="text-white text-4xl font-bold ">Waktu Pelaksanaan</h1>
        <div className="w-20 h-1 bg-yellow-500 mx-auto mt-2"></div>
      </motion.div>
      <TimelineTable title="Pendaftaran Gelombang 1" data={dataGelombang1} color="bg-blue-500" />
      <TimelineTable title="Pendaftaran Gelombang 2" data={dataGelombang2} color="bg-green-500" />
      <TimelineTable title="Pendaftaran Tahap Akhir" data={dataGelombang3} color="bg-red-500" />
=======
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-6 col-span-1 lg:col-span-3 "
      >
        <h1 className="text-white text-4xl font-bold ">Biaya Pendidikan</h1>
        <div className="w-20 h-1 bg-yellow-500 mx-auto mt-2"></div>
      </motion.div>
      <TimelineTable
        title="Pendaftaran Gelombang 1"
        data={dataGelombang1}
        color="bg-blue-500"
      />
      <TimelineTable
        title="Pendaftaran Gelombang 2"
        data={dataGelombang2}
        color="bg-green-500"
      />
      <TimelineTable
        title="Pendaftaran Tahap Akhir"
        data={dataGelombang3}
        color="bg-red-500"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-white font-bold mb-6 col-span-1  lg:col-span-3  "
      >
       
          <div>Uang Masuk : Uang Pangkal, Seragam, Almamater, Baju Muslim, Buku Agama</div>
          <div>SPP Bulanan : Makan, Laundry, Biaya Pendidikan</div>
          <div>Daftar Ulang : Pemeliharaan dan Perbaikan Sarpras</div>
          <div>*SPP Bulanan (fullday) : Termasuk Makan Siang Setiap Hari</div>
       
      </motion.div>
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
    </div>
  );
};

<<<<<<< HEAD
export default Timeline;
=======
export default Timeline;
>>>>>>> 6f42bdf75996f098e8f4ff0060d0452d30ebef92
