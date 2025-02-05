import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Payment from "../payment";
import Payment2 from "../payment/index2";
export default function Dashboard() {
  const name = useSelector((state) => state.auth.name);
  const isPayment = useSelector((state) => state.auth.isPayment);
  console.log(isPayment);
  let history = useHistory();
  return (
    <div>
      <div className="leading-relaxed border-b-2 pb-5">
        <h2 className="text-2xl font-bold mb-3">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </h2>
        <h4>
          <span className="italic font-bold text-gray-600">
            Assalamualikum Warohmatullahi Wabarokatuh{" "}
          </span>{" "}
          <br />
          <span className="text-green-500 font-semibold text-lg">
            Akh {name}
          </span>
        </h4>
      </div>
      <div className="leading-relaxed mt-5 font-semibold">
        <p className="text-justify">
          Pertama kami ucapkan{" "}
          <span className="italic">Syukron Jazakumullah Khairan</span> sudah
          mendaftar sebagai santri baru di SMK MADINATULQURAN.
        </p>
        <p className="text-justify mt-4">
          {" "}
          Untuk Selanjutnya, Silahkan untuk lakukan pembayaran uang pendaftaran
          sebesar Rp. 450.000,00 untuk mengerjakan tes.{" "}
        </p>
        <p className="text-justify mt-4">
          Adapun tes yang diujikan adalah sebagai berikut.
          <ol className="list-decimal ml-5">
            <li>Tes pelajaran umum yang bisa dikerjakan secara online </li>
            <li>
              Tes Baca Alquran, Hafalan serta Wawancara untuk Santri dan Wali
              Santri
            </li>
          </ol>
        </p>

        {isPayment !== 'belum_transfer' ? (
          ""
        ) : (
          <Payment2/>
        )}
        <div className="mt-5 border w-full p-10 text-center">
          <p className="font-bold">Status Pembayaran Pendaftran PSB </p>
          <br />
          <p>
            {" "}
            {isPayment === true ? (
              <span className="bg-green-400 hover:bg-green-500 py-2 px-5 font-bold rounded-md text-white">
                Terkonfirmasi
              </span>
            ) : isPayment === false ? (
              <span className="bg-blue-400 hover:bg-blue-500 py-2 px-5 font-bold rounded-md text-white">
                Dalam pengecekan
              </span>
            ) : (
              <span className="bg-red-400 hover:bg-red-500 py-2 px-5 font-bold rounded-md text-white">
                Belum
              </span>
            )}
          </p>
        </div>
       
        <div className="flex items-center justify-end mt-5">
          Hormat Kami,
          <br />
          <br />
          <br />
          Panitia PPDB
        </div>
      </div>

    
    </div>
  );
}
