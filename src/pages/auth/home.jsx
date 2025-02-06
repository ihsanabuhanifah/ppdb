import React from "react";
import Layout from "../../layout/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const committee = [
  {
    name: "Suprijadi, S.Pd",
    phone: "08111141028",
    image: "/path-to-image/suprijadi.jpg",
  },
  {
    name: "Muntamah, S.Pd, M.Si",
    phone: "081215177647",
    image: "/path-to-image/muntamah.jpg",
  },
  {
    name: "Iwan, S.E.",
    phone: "081299557502",
    image: "/path-to-image/iwan.jpg",
  },
  {
    name: "Jimi Samsudin",
    phone: "08179992126",
    image: "/path-to-image/jimi.jpg",
  },
  {
    name: "Nia Nihayah, S.Pd",
    phone: "08793849977",
    image: "/path-to-image/nia.jpg",
  },
  {
    name: "Nova Sulaeman, S.Pd",
    phone: "081903913212",
    image: "/path-to-image/nova.jpg",
  },
];

export default function Home() {
  const history = useHistory();
  return (
    <Layout page="home">
      <section className="container mx-auto p-6">
      
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Syarat-syarat Pendaftaran
          </h2>
          <ul className="list-disc pl-6">
            <li>
              Berusia setinggi-tingginya 21 (dua puluh satu) pada awal tahun
              pelajaran baru (bulan Juli 2024);
            </li>
            <li>
              Telah lulus dan memiliki ijazah SMP/SMPLB/MTs/MTsLB atau Program
              Paket B/Pendidikan Pesantren Salafiyah Wustha/sederajat
            </li>
            <li>Mempunyai Nilai Raport SMP/Mts Semester 1 sampai dengan 5.</li>
            <li>Menyerahkan:</li>
            <ul className="list-inside list-decimal pl-6">
              <li>
                Fotokopi Surat Keterangan Hasil Ujian Sekolah, atau surat
                keterangan nilai ujian sekolah;
              </li>
              <li>Fotokopi Ijazah yang telah dilegalisir 1 lembar;</li>
              <li>Fotokopi Akte Kelahiran 1 lembar;</li>
              <li>Fotokopi Kartu Keluarga 1 lembar;</li>
              <li>
                Fotokopi Surat Keterangan Kelakuan Baik (SKKB) dari Sekolah 1
                lembar;
              </li>
              <li>Fotokopi Raport semester 5;</li>
              <li>Fotokopi Kartu Pelajar (optional);</li>
              <li>KPS (Jika ada);</li>
              <li>Catatan Kepribadian dari BK;</li>
            </ul>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">Info Panitia</h2>
       

        {/* Register and Login buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => {
              history.push("register");
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>

            <button onClick={() => {
              history.push("login");
            }} className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300">
              Login
            </button>
        
        </div>
      </section>
    </Layout>
  );
}
