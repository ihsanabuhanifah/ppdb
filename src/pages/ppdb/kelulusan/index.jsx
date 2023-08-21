import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToast, useClipboard } from "@chakra-ui/react";
export default function Kelulusan() {
  const name = useSelector((state) => state.auth.name);
  const isLulus = useSelector((state) => state.auth.isLulus);
  const isSudahTes = useSelector((state) => state.auth.isSudahTes);
  const isPayment = useSelector((state) => state.auth.isPayment);
  const [value, setValue] = React.useState(3310006100);
  const { hasCopied, onCopy } = useClipboard(value);
  console.log(isPayment);
  let history = useHistory();
  return (
    <React.Fragment>
      {isSudahTes === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <div>
            <h1 className="text-center text-3xl text-green-500 font-bold mt-5">
              <span className="text-green-500">
                ANANDA BELUM MELAKUKAN TES DINIYAH DAN WAWANCARA
              </span>
            </h1>
            <p className="text-justify lg:text-center text-lg mt -3 text-green-500 font-bold mt-5">
              Untuk membuat melakukan tes diniyah dan wawancara. <br /> Silahkan
              buat jadwal di menu Tes Diniyah atau klik{" "}
              <button
                onClick={() => history.push("/ppdb/tes-diniyah-dan-interview")}
                className="text-red-500 font-bold"
              >
                disini
              </button>
            </p>
          </div>
        </div>
      ) : isLulus === null ? (
        <div className="flex items-center justify-center  h-full">
          <div>
            <h1 className="text-center text-3xl text-green-500 font-bold mt-5">
              <span className="text-green-500">
                MOHON MAAF BELUM ADA PENGUMUMAN KELULUSAN
              </span>
            </h1>
            <p className=" text-lg mt -3 text-justify text-green-500 font-bold mt-5">
              Pengumuman Hasil Tes akan diumumkan maksimal 7 Hari setelah tes
              dengan catatan calon santri sudah mengerjakan semua tes umum
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className=" w-full lg:w-1/2">
            <div className="flex items-center justify-center">
              <div className="mt-5">
                <h1 className="text-center font-bold text-lg ">
                  Pengumuman PPDB SMK MADINATULQURAN <br /> Tahun Pelajaran
                  2021/2022
                </h1>
                <p className="mt-5 font-semibold text-justify">
                  Berdasarkan Hasil tes dan wawancara yang telah dilaksanakan
                  maka dengan ini kami menyatakan bahwa santri atas Nama{" "}
                  <span className="font-bold">{name}</span> dinyatakan :{" "}
                </p>

                <p className="text-center text-3xl text-green-500 font-bold mt-5">
                  {isLulus === "1" ? (
                    <span className="text-green-500">LULUS</span>
                  ) : (
                    <span className="text-red-500">TIDAK LULUS</span>
                  )}
                </p>
                {isLulus === "1" ? (
                  <div className="mt-5">
                    <p className="text-justify mt-3 font-semibold">
                      Untuk tahapan selanjutnya, wali santri bisa langsung
                      melakukan pembayaran ke rekening di bawah ini sejumlah
                      uang{" "}
                      <span className="font-bold">Rp. 18.500.000 ,000</span> (
                      <span className="italic font-medium">
                        Delapan belas juta lima ratus ribu rupiah
                      </span>
                      ) dan kemudian mengupload bukti pembayaran di Pembayaran
                      atau klik{" "}
                      <button
                        onClick={() => history.push("/ppdb/pembayaran")}
                        className="font-bold text-red-500"
                      >
                        disini
                      </button>{" "}
                    </p>
                  </div>
                ) : (
                  <p className="text-justify mt-3 font-semibold">
                    Mohon maaf yang sebesar-besarnya. Semoga ananda diberikan
                    kemudahan oleh Allah{" "}
                    <span className="italic">Subhana Wa Ta'ala</span> untuk
                    mendapatkan sekolah yang sesuai dengan minat dan bakatnya.
                  </p>
                )}
              </div>
            </div>

            {isLulus === "1" ? (
              <React.Fragment>
                <div className="mt-5 border p-5 bg-gray-50">
                  <div className="grid grid-cols-12 font-bold  ">
                    <div className=" col-span-6 lg:col-span-2 flex items-start lg:items-center justify-between">
                      <span>Nomor Rekening</span>
                      <span>:</span>
                    </div>

                    <div className="ml-5 col-span-6 lg:col-span-4">
                      <button className="font-bold" onClick={onCopy}>
                        {" "}
                        {value}
                      </button>
                    </div>
                    {hasCopied ? (
                      <p className="absolute z-50 top-0 right-0 flex  items-center text-center ">
                        <span className="text-center text-green-500 border shadow-lg px-4 rounded-md">
                          Copy ke clipboard
                        </span>
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="grid grid-cols-12 font-bold mt-5 lg:mt-2">
                    <div className="col-span-6 lg:col-span-2 flex items-start lg:items-center justify-between">
                      <span>Kode Bank</span>
                      <span>:</span>
                    </div>

                    <div className="ml-5 col-span-6 lg:col-span-4">
                      (147) Bank Muamalat
                    </div>
                  </div>
                  <div className="grid grid-cols-12 font-bold mt-5 lg:mt-2 ">
                    <div className="col-span-6 lg:col-span-2 flex items-start lg:items-center justify-between">
                      <span>Atas Nama</span>
                      <span>:</span>
                    </div>

                    <div className="ml-5 col-span-6 lg:col-span-4">
                    YYS PESANTREN WISATA AL-ISLAM (PONPES MADINATULQURAN)
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="grid grid-cols-7 border  ">
                    <div className="col-span-1 border  text-center font-bold py-3 bg-gray-200">
                      Tahap
                    </div>
                    <div className="col-span-3  border text-center font-bold py-3 bg-gray-200">
                      Nominal
                    </div>
                    <div className="col-span-3 border  text-center font-bold py-3 bg-gray-200 ">
                      Tenggang Waktu
                    </div>
                  </div>
                  <div className="grid grid-cols-7  ">
                    <div className="col-span-1 border  text-center py-1">1</div>
                    <div className="col-span-3 border   text-center py-1">
                      Rp. 5.000.000,00
                    </div>
                    <div className="col-span-3  border  text-center py-1">
                      31 Oktober 2021
                    </div>
                  </div>
                  <div className="grid grid-cols-7  ">
                    <div className="col-span-1 border  text-center py-1">2</div>
                    <div className="col-span-3 border  text-center py-1">
                      Rp. 5.000.000,00
                    </div>
                    <div className="col-span-3 border  text-center py-1">
                      31 Desember 2021
                    </div>
                  </div>
                  <div className="grid grid-cols-7  ">
                    <div className="col-span-1 border  text-center py-1">3</div>
                    <div className="col-span-3 border  text-center py-1">
                      Rp. 5.000.000,00
                    </div>
                    <div className="col-span-3 border  text-center py-1">
                      28 Februari 2022
                    </div>
                  </div>
                  <div className="grid grid-cols-7  ">
                    <div className="col-span-1 border  text-center py-1">3</div>
                    <div className="col-span-3 border  text-center py-1">
                      Rp. 3.500.000,00
                    </div>
                    <div className="col-span-3 border  text-center py-1">
                      31 Mei 2022
                    </div>
                  </div>
                </div>

                <div className="p-4 mt-5 shadow-sm text-red-500 font-bold italic">
                  <h1>Note :</h1>
                  <p>
                    - Bagi yang tes di atas bulan Oktober pembayaran tahap 1 dilakukan 2 minggu setelah pengumuman kelulusan
                  </p>
                  <p>
                    - Mohon Perhatian - Biaya Tagihan Uang Masuk yan sudah
                    dibayarkan tidak dapat dikembalikan{" "}
                  </p>
                </div>
              </React.Fragment>
            ) : (
              ""
            )}
            <div className="flex items-center justify-end mt-5">
              Hormat Kami,
              <br />
              <br />
              <br />
              Panitia PPDB
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
