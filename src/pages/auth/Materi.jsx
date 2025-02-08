import { motion } from 'framer-motion';

export default function Materi() {
  return (
    <div className=" bg-gradient-to-r  text-white p-8 flex flex-col items-center">
     <div className="  text-center mb-10 rounded-3xl">
        <h4 className="text-white text-4xl font-bold mb-">
          Materi Tes
        </h4>
        <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
      </div>
      <motion.table
        className="w-full max-w-4xl bg-white text-black rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-6 text-lg">Jenis Tes</th>
            <th className="py-3 px-6 text-lg">Deskripsi</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          <tr className="border-b border-gray-300">
            <td className="py-4 px-6">Tes Bidang Studi</td>
            <td className="py-4 px-6">Matematika, IPA, IPS, Bahasa Inggris, Bahasa Indonesia, dan PAI</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="py-4 px-6">Tes Potensi Akademik</td>
            <td className="py-4 px-6">Mengukur kemampuan akademik secara umum</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="py-4 px-6">Tes Baca Al-Qur’an</td>
            <td className="py-4 px-6">Menilai kemampuan membaca Al-Qur’an</td>
          </tr>
          <tr>
            <td className="py-4 px-6">Wawancara</td>
            <td className="py-4 px-6">Menilai kepribadian dan motivasi calon siswa</td>
          </tr>
        </tbody>
      </motion.table>
     
    </div>
  );
}
