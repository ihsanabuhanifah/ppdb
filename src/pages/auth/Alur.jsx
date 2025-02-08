import { motion } from "framer-motion";
import { CheckCircle, ClipboardList, LogIn, UserPlus, FileCheck, Calendar, Megaphone } from "lucide-react";

const steps = [
  { id: 1, title: "Buat Akun PPDBM", icon: <UserPlus size={24} />, desc: "Calon peserta didik baru membuat akun di situs PPDBM pada menu register." },
  { id: 2, title: "Login Akun PPDBM", icon: <LogIn size={24} />, desc: "Silahkan login menggunakan username dan password dari web PPDBM." },
  { id: 3, title: "Lengkapi Biodata", icon: <ClipboardList size={24} />, desc: "Melengkapi biodata dan berkas persyaratan yang dibutuhkan." },
  { id: 4, title: "Verifikasi Berkas", icon: <FileCheck size={24} />, desc: "Validasi berkas administrasi dilakukan secara online atau offline." },
  { id: 5, title: "Tes Seleksi", icon: <Calendar size={24} />, desc: "Calon peserta didik baru mengikuti tes seleksi sesuai jadwal." },
  { id: 6, title: "Pengumuman", icon: <Megaphone size={24} />, desc: "Peserta tes PPDBM dapat melihat hasil seleksi atau pengumuman di akun mereka." }
];

export default function AlurPendaftaran() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="  text-center mb-10 rounded-3xl">
        <h4 className="text-white text-4xl font-bold mb-">
          Alur Pendaftaran
        </h4>
        <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
      </div>
      <div className="relative border-l-4 border-blue-500 pl-6 bg-white px-5 py-10 rounded-2xl">
        {steps.map((step, index) => (
          <motion.div 
            key={step.id} 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-8 flex items-start"
          >
            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-md">
              {step.icon}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
