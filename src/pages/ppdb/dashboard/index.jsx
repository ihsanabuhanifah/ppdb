import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDetail } from "../../../api/santri";
import { useQuery } from "react-query";

export default function Dashboard() {
  const name = useSelector((state) => state.auth.name);
  let history = useHistory();

   const { isError, data, isFetching } = useQuery(
      //query key
      ["detail", []],
  
      () => getDetail(),
  
      {
        keepPreviousData: true,
        select: (response) => response.data,
      }
    );
  
  return (
    <div className="lg:px-6 px-1 py-4 lg:py-8  max-w-3xl mx-auto">
         <div className="text-xl font-semibold text-gray-500  text-center mb-2">
          Nomor Pendaftaran : <strong>{data?.nomor_pendaftaran}</strong>
        </div>
      <div className="  rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-center  mb-4">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </h2>

        <h2 className="text-xl font-semibold text-gray-700  text-center mb-2">
          Selamat Datang, {data?.name}
        </h2>

       
        <p className="text-gray-600 text-center mb-2">
          Selamat datang di{" "}
          <span className="font-bold text-blue-400">
            Portal PPDB Online MAN 1 Kota Sukabumi
          </span>
          !
        </p>

     

        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-lg font-medium text-gray-800 mb-2 text-center italic">
            "Langkah pertamamu menuju masa depan yang gemilang"
          </p>
          <p className="text-gray-600 text-center">
            Silakan bergabung ke Grup Calon Peserta Didik Baru MAN 1 Kota Sukabumi dicopy-paste link berikut ini: https://chat.whatsapp.com/FBy4R4E4qahGj9kqZs04Fd
            <p>atau scan barcode berikut ini:</p>
            <p>
              <img src="c:\xampp\htdocs\ppdb\src\image\grup.png" alt="grup" srcset=""/>
              </p>.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Persiapan Pendaftaran:
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Pastikan data yang diisi lengkap dan benar.</li>
            <li>
              Persiapkan dokumen seperti Kartu Keluarga, KTP Orang Tua, dan
              Raport SMP/MTs.
            </li>
            <li>Ikuti panduan pengisian formulir dengan teliti.</li>
            <li>Simpan nomor pendaftaran dengan baik.</li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
          <h4 className="font-semibold text-blue-700">Butuh Bantuan?</h4>
          <p className="text-gray-700 text-sm mt-2">
            Tim PPDB kami siap membantu:
          </p>
          <ul className="mt-2 text-gray-700 text-sm space-y-1">
            <li>
              <strong>WhatsApp:</strong> Kesiswaan MAN 1 Kota Sukabumi 085718025089
            </li>
            <li>
              <strong>Email:</strong> info-ppdb@man1kotasukabumi.web.id
            </li>
            <li>
              <strong>Helpdesk:</strong> Jl. Pramuka No. 4, Gedongpanjang, Kota
              Sukabumi
            </li>
          </ul>
        </div>

        <p className="text-center text-gray-800 font-semibold mt-6">
          Mari wujudkan mimpimu bersama{" "}
          <span className="text-blue-700">MAN 1 Kota Sukabumi</span>! 🌟
        </p>
        <p className="text-center text-gray-600 text-sm mt-2">
          #DisiplinSuksesBerwawasanIslami
        </p>
      </div>
    </div>
  );
}
