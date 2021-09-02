
import { soalMatematika } from "./soalMatematika";
import { Formik } from "formik";
import AlertLogout from "../../../components/AlertLogout";
import { secondsToHms } from "../../../utils";
import { useHistory } from "react-router";
import { useToast } from "@chakra-ui/react";
import { putTesUmum } from "../../../api/santri";
import * as Yup from "yup";
import React from "react";
import Cookies from "js-cookie";
let documentSchema = Yup.object().shape({
  // ref_doc: Yup.number().typeError("Hanya angka"),
});

let documentArraySchema = Yup.object().shape({
  document: Yup.array().of(documentSchema),
});
export default function TestMatematika() {
  const [waktu, setWaktu] = React.useState(localStorage.getItem("tm"));
  const [logout, setLogout] = React.useState(false);
  const [jawaban, setJawaban] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false)
  let toast = useToast();
  let history = useHistory();
  let initialValues = {
    soal1: null,
    soal2: null,
    soal3: null,
    soal4: null,
    soal5: null,
    soal6: null,
    soal7: null,
    soal8: null,
    soal9: null,
    soal10: null,
    soal11: null,
    soal12: null,
    soal13: null,
    soal14: null,
    soal15: null,
  };
  async function onSubmit(jawaban) {
    setIsLoading(true)
    let nilai = 0;

    for (let i = 0; i < soalMatematika.length; i++) {
      let soal = `soal${i + 1}`;
      if (soalMatematika[i].answer === jawaban[soal]) {
        nilai = nilai + 1;
      }
    }
    let nilai_asli = (nilai/15)*100
    let values = {
      kode_mapel : 'Tes001',
      nilai : nilai_asli
    }
    let response = await putTesUmum(values)
    if(response?.message === "Berhasil Menyimpan Data"){
      toast({
        position: "top-right",
        title: "Berhasil",
        description: "Berhasil Menyimpan Nilai",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      Cookies.remove('exam')
      return history.push("/ppdb/tes-umum");
    }else{
      setIsLoading(false)
      toast({
        position: "top-right",
        title: "fail",
        description: "Periksa koneksi internet",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }
  }
  React.useEffect(() => {
    let timeMatematika = localStorage.getItem("tm");
    if (timeMatematika === null || timeMatematika <= 0) {
      localStorage.setItem("tm", 1800);
    }
  }, []);

  React.useEffect(function () {
    let intervalId = setInterval(() => {
      let sisaWaktu = localStorage.getItem("tm");

      setWaktu(sisaWaktu);
      let sisa = sisaWaktu - 1;

      localStorage.setItem("tm", sisa);
    }, 1000);

    return function () {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <React.Fragment>
      <AlertLogout
        message="Apakah ananda akan menyelesaikan tes ini ?"
        isLoading={isLoading}
        onConfirm={() => {
          onSubmit(jawaban);
          // Cookies.remove("token-ppdb");
          // return history.push("/login");
        }}
        onClose={() => {
          setLogout(false);
        }}
        isOpen={logout}
      ></AlertLogout>
      <div className="py-10 pl-5 lg:pl-48 pr-5 lg:pr-32 container  h-full">
        <div className="lg:flex items-center justify-between font-bold border-b-2 pb-5 w-full">
          <p className="uppercase text-lg">
            Materi Tes : <span className="text-green-500">Matematika</span>
          </p>
          <p className="uppercase text-lg text">
            Waktu Tersisa :{" "}
            <span className="text-green-500">{secondsToHms(waktu)}</span>{" "}
          </p>
        </div>
        <div className=" font-bold">
          {waktu <= 0 ? (
            <p className="text-center">
              Waktu sudah habis. Silahkan simpan jawaban
            </p>
          ) : (
            <p> Pilihlah satu jawaban yang paling tepat </p>
          )}
        </div>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={onSubmit}
          validationSchema={documentArraySchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldTouched,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="mt-5">
              {waktu <= 0 ? (
                ""
              ) : (
                <React.Fragment>
                  <div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
                    <div className="mb-4">
                      <p className="font-bold">No. 1</p>
                      <p className="text-justify">
                        <span className="mb-5">
                          Hasil dari 8,0049 : 0,0015 adalah ...
                        </span>
                      </p>
                    </div>
                    <div id={`soal1`}>
                      <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-3"
                        role="group"
                        aria-labelledby={`soal1`}
                      >
                        {" "}
                        <div>
                          <input
                            name={`soal1`}
                            value={"a"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>5336, 6</label>
                        </div>
                        <div>
                          <input
                            name={`soal1`}
                            value={"b"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>533,66</label>
                        </div>
                        <div>
                          <input
                            name={`soal1`}
                            value={"c"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>53,366</label>
                        </div>
                        <div>
                          <input
                            name={`soal1`}
                            value={"d"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>53366</label>
                        </div>
                        <div>
                          <input
                            name={`soal1`}
                            value={"e"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>533,55</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* //Nomor 2 */}
                  <div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
                    <div className="mb-4">
                      <p className="font-bold">No. 2</p>
                      <p className="text-justify">
                        <p>
                          Dari 100 orang dalah suatu kecamatan diperoleh data
                          sebagai berikut..
                        </p>
                        <p>1. 20 orang tidak memiliki mobil </p>
                        <p>2. 50 orang memiliki motor</p>
                        <p>
                          3. 10 orang tidak memilki mobil tetapi memiliki motor
                        </p>
                        <p>
                          Banyaknya orang memiliki mobil tetapi tidak memiliki
                          motor adalah … orang
                        </p>
                      </p>
                    </div>
                    <div id={`soal2`}>
                      <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-3"
                        role="group"
                        aria-labelledby={`soal2`}
                      >
                        {" "}
                        <div>
                          <input
                            name={`soal2`}
                            value={"a"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>10</label>
                        </div>
                        <div>
                          <input
                            name={`soal2`}
                            value={"b"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>20</label>
                        </div>
                        <div>
                          <input
                            name={`soal2`}
                            value={"c"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>30</label>
                        </div>
                        <div>
                          <input
                            name={`soal2`}
                            value={"d"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>40 </label>
                        </div>
                        <div>
                          <input
                            name={`soal2`}
                            value={"e"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>45</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* //Nomor 3 */}
                  <div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
                    <div className="mb-4">
                      <p className="font-bold">No. 3</p>
                      <p className="text-justify">
                        <p>
                          Rata-rata nilai ulangan dari 32 siswa adalah 5,0. Jika
                          nilai Joko dan Madi tidak diikutsertakan dalam
                          perhitungan, maka rata-rata nilanya ulangan adalah
                          5,2. Berapakah jumlah nilai Joko dan Madi …
                        </p>
                      </p>
                    </div>
                    <div id={`soal3`}>
                      <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-3"
                        role="group"
                        aria-labelledby={`soal3`}
                      >
                        {" "}
                        <div>
                          <input
                            name={`soal3`}
                            value={"a"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>4</label>
                        </div>
                        <div>
                          <input
                            name={`soal3`}
                            value={"b"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>3,5</label>
                        </div>
                        <div>
                          <input
                            name={`soal3`}
                            value={"c"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>2,5</label>
                        </div>
                        <div>
                          <input
                            name={`soal3`}
                            value={"d"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>2</label>
                        </div>
                        <div>
                          <input
                            name={`soal3`}
                            value={"e"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>1,5</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* //Nomor 4 */}
                  <div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
                    <div className="mb-4">
                      <p className="font-bold">No. 4</p>
                      <p className="text-justify">
                        <p>
                          Peluang siswa A dan siswa B diterima di SMK
                          berturut-turut adalah 0,98 dan 0,95. Peluang siswa A
                          diterima di SMK dan B tidak diterima adalah …
                        </p>
                      </p>
                    </div>
                    <div id={`soal4`}>
                      <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-3"
                        role="group"
                        aria-labelledby={`soal4`}
                      >
                        {" "}
                        <div>
                          <input
                            name={`soal4`}
                            value={"a"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>0,019</label>
                        </div>
                        <div>
                          <input
                            name={`soal4`}
                            value={"b"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>0,049</label>
                        </div>
                        <div>
                          <input
                            name={`soal4`}
                            value={"c"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>0,074</label>
                        </div>
                        <div>
                          <input
                            name={`soal4`}
                            value={"d"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>0,95</label>
                        </div>
                        <div>
                          <input
                            name={`soal4`}
                            value={"e"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>0,978</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* //Nomor 5 */}
                  <div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
                    <div className="mb-4">
                      <p className="font-bold">No. 5</p>
                      <p className="text-justify">
                        <p>
                          Dalam sebuah kotak terdapat 8 bola merah, 6 bola putih
                          dan 4 bola biru. Diambil secata acak 3 bola satu
                          persatu tanpa pengembalian. Peluang terambilnya 1 bola
                          merah pertama pada pengambilan ketiga adalah …
                        </p>
                      </p>
                    </div>
                    <div id={`soal5`}>
                      <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-3"
                        role="group"
                        aria-labelledby={`soal5`}
                      >
                        {" "}
                        <div>
                          <input
                            name={`soal5`}
                            value={"a"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>1/2</label>
                        </div>
                        <div>
                          <input
                            name={`soal5`}
                            value={"b"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>3/8</label>
                        </div>
                        <div>
                          <input
                            name={`soal5`}
                            value={"c"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>8/16</label>
                        </div>
                        <div>
                          <input
                            name={`soal5`}
                            value={"d"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>5/16</label>
                        </div>
                        <div>
                          <input
                            name={`soal5`}
                            value={"e"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>7/12</label>
                        </div>
                      </div>
                    </div>
                  </div>
                   {/* //Nomor 6 */}
                   <div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
                    <div className="mb-4">
                      <p className="font-bold">No. 6</p>
                      <p className="text-justify">
                        <p>
                        Dalam sebuah survey terhadap 50 orang siswa SMP didapat data : 35 siswa senang matematika, 
12 sisw senang fisika, sedangkan siswa yang tidak senang keduanya ada 10 orang. Jika seorang 
siswa diambil secara acak dari 50 anak, maka peluang mendapatkan siswa yang senang fisika 
adalah ….
                        </p>
                      </p>
                    </div>
                    <div id={`soal6`}>
                      <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-3"
                        role="group"
                        aria-labelledby={`soal6`}
                      >
                        {" "}
                        <div>
                          <input
                            name={`soal6`}
                            value={"a"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>46%</label>
                        </div>
                        <div>
                          <input
                            name={`soal6`}
                            value={"b"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>34%</label>
                        </div>
                        <div>
                          <input
                            name={`soal6`}
                            value={"c"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>24%</label>
                        </div>
                        <div>
                          <input
                            name={`soal6`}
                            value={"d"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>10%</label>
                        </div>
                        <div>
                          <input
                            name={`soal6`}
                            value={"e"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>3%</label>
                        </div>
                      </div>
                    </div>
                  </div>
                    {/* //Nomor 7 */}
                    <div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
                    <div className="mb-4">
                      <p className="font-bold">No. 7 </p>
                      <p className="text-justify">
                        <p>
                        Anton dan Burhan berada di kota A. Keduanya akan pergi ke kota B, Anton berangkat 
pukul 07.00 menggunakan kendaraan dengan kecepatan 30 km/jam, sedangkan Burhan 
berangkat pada pukul 08.00 dengan kecepatan 50 km/jam. Pukul berapa Burhan dapat 
menyusul Anton ?
                        </p>
                      </p>
                    </div>
                    <div id={`soal7`}>
                      <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-3"
                        role="group"
                        aria-labelledby={`soal7`}
                      >
                        {" "}
                        <div>
                          <input
                            name={`soal7`}
                            value={"a"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>09:00</label>
                        </div>
                        <div>
                          <input
                            name={`soal7`}
                            value={"b"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>09:30</label>
                        </div>
                        <div>
                          <input
                            name={`soal7`}
                            value={"c"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>09:40</label>
                        </div>
                        <div>
                          <input
                            name={`soal7`}
                            value={"d"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>09:45</label>
                        </div>
                        <div>
                          <input
                            name={`soal7`}
                            value={"e"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>10:00</label>
                        </div>
                      </div>
                    </div>
                  </div>
                    {/* //Nomor 8 */}
                    <div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
                    <div className="mb-4">
                      <p className="font-bold">No. 8 </p>
                      <p className="text-justify">
                        <p>
                        Pak Ahmad membeli 9 ikat rambutan yang masing – masing berisi 24 rambutan, Rambutan 
itu kemudian diurai dari ikatannya dan di letakkan ke dalam 12 piring sama banyak, 6 
piring di berikan kepada tamu yang masing masing di makan oleh tamu sebanyak 5 buah, 
berapa buah sisa rambutan ?
                        </p>
                      </p>
                    </div>
                    <div id={`soal8`}>
                      <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-3"
                        role="group"
                        aria-labelledby={`soal8`}
                      >
                        {" "}
                        <div>
                          <input
                            name={`soal8`}
                            value={"a"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>216</label>
                        </div>
                        <div>
                          <input
                            name={`soal8`}
                            value={"b"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>200</label>
                        </div>
                        <div>
                          <input
                            name={`soal8`}
                            value={"c"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>186</label>
                        </div>
                        <div>
                          <input
                            name={`soal8`}
                            value={"d"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>173</label>
                        </div>
                        <div>
                          <input
                            name={`soal8`}
                            value={"e"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>160</label>
                        </div>
                      </div>
                    </div>
                  </div>
                   {/* //Nomor 9 */}
                   <div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
                    <div className="mb-4">
                      <p className="font-bold">No. 9 </p>
                      <p className="text-justify">
                        <p>
                        Sebuah pekerjaan diselesaikan oleh 8 orang dalam waktu 20 hari. Jika dianggap kecepatan 
pekerja sama, maka 5 orang pekerja bisa menyelesaikan pekerjaan tersebut dalam waktu 
... hari
                        </p>
                      </p>
                    </div>
                    <div id={`soal8`}>
                      <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-3"
                        role="group"
                        aria-labelledby={`soal8`}
                      >
                        {" "}
                        <div>
                          <input
                            name={`soal8`}
                            value={"a"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>12,5</label>
                        </div>
                        <div>
                          <input
                            name={`soal8`}
                            value={"b"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>13</label>
                        </div>
                        <div>
                          <input
                            name={`soal8`}
                            value={"c"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>25</label>
                        </div>
                        <div>
                          <input
                            name={`soal8`}
                            value={"d"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>30</label>
                        </div>
                        <div>
                          <input
                            name={`soal8`}
                            value={"e"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>32</label>
                        </div>
                      </div>
                    </div>
                  </div>
                    {/* //Nomor 10 */}
                    <div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
                    <div className="mb-4">
                      <p className="font-bold">No. 10 </p>
                      <p className="text-justify">
                        <p>
                        Rata-rata tinggi 10 pemain basket NBA adalah 175 cm. Bila salah satu dari pemain 
keluar, maka tinggi rata-rata sisanya adalah 176 cm. maka tinggi pemain yang keluar 
adalah ... cm
                        </p>
                      </p>
                    </div>
                    <div id={`soal9`}>
                      <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-3"
                        role="group"
                        aria-labelledby={`soal9`}
                      >
                        {" "}
                        <div>
                          <input
                            name={`soal9`}
                            value={"a"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>158</label>
                        </div>
                        <div>
                          <input
                            name={`soal9`}
                            value={"b"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>164</label>
                        </div>
                        <div>
                          <input
                            name={`soal9`}
                            value={"c"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>165</label>
                        </div>
                        <div>
                          <input
                            name={`soal9`}
                            value={"d"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>166</label>
                        </div>
                        <div>
                          <input
                            name={`soal9`}
                            value={"e"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>167</label>
                        </div>
                      </div>
                    </div>
                  </div>
                   {/* //Nomor 11 */}
  <div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
  <div className="mb-4">
    <p className="font-bold">No. 11 </p>
    <p className="text-justify">
      <p>
      Fatimah pergi ke perpustakaan setiap 6 hari sekali, Cholifah setiap 4 hari sekali dan 
Hanifah setiap 8 hari sekali. Ketiganya bersama-sama pergi ke perpustakaan pada tanggal 
8 Juni 2020. Mereka akan bertemu kembali di perpustakaan pada tanggal …
      </p>
    </p>
  </div>
  <div id={`soal11`}>
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-3"
      role="group"
      aria-labelledby={`soal11`}
    >
      {" "}
      <div>
        <input
          name={`soal11`}
          value={"a"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>24 juni 2021</label>
      </div>
      <div>
        <input
          name={`soal11`}
          value={"b"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>1 Juli 2021</label>
      </div>
      <div>
        <input
          name={`soal11`}
          value={"c"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>2 juli 2021</label>
      </div>
      <div>
        <input
          name={`soal11`}
          value={"d"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>3 Juli 2021</label>
      </div>
      <div>
        <input
          name={`soal11`}
          value={"e"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>4 Juli 2021</label>
      </div>
    </div>
  </div>
</div>
{/* //Nomor 12 */}
<div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
  <div className="mb-4">
    <p className="font-bold">No. 12 </p>
    <p className="text-justify">
      <p>
      Amir bersepeda dari kota A menuju kota B dalam waktu 2 jam 30 menit. Di perjalanan 
istirahat 15 menit. Jika kecepatan rata-ratanya 80 km/jam, maka jarak kedua kota tersebut 
adalah ...km
      </p>
    </p>
  </div>
  <div id={`soal12`}>
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-3"
      role="group"
      aria-labelledby={`soal12`}
    >
      {" "}
      <div>
        <input
          name={`soal12`}
          value={"a"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>170</label>
      </div>
      <div>
        <input
          name={`soal12`}
          value={"b"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>180</label>
      </div>
      <div>
        <input
          name={`soal12`}
          value={"c"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>200</label>
      </div>
      <div>
        <input
          name={`soal12`}
          value={"d"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>220</label>
      </div>
      <div>
        <input
          name={`soal12`}
          value={"e"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>225</label>
      </div>
    </div>
  </div>
</div>
{/* //Nomor 13 */}
<div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
  <div className="mb-4">
    <p className="font-bold">No. 13 </p>
    <p className="text-justify">
      <p>
      Umur Ali sekarang 30 tahun. Pada 6 tahun yang lalu, umur Ali tiga kali umur Budi. Umur Budi 
sekarang adalah …
      </p>
    </p>
  </div>
  <div id={`soal13`}>
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-3"
      role="group"
      aria-labelledby={`soal13`}
    >
      {" "}
      <div>
        <input
          name={`soal13`}
          value={"a"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>8 tahun</label>
      </div>
      <div>
        <input
          name={`soal13`}
          value={"b"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>10 tahun</label>
      </div>
      <div>
        <input
          name={`soal13`}
          value={"c"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>14 tahun</label>
      </div>
      <div>
        <input
          name={`soal13`}
          value={"d"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>24 tahun</label>
      </div>
      <div>
        <input
          name={`soal13`}
          value={"e"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>48 tahun</label>
      </div>
    </div>
  </div>
</div>
{/* //Nomor 14 */}
<div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
  <div className="mb-4">
    <p className="font-bold">No. 14 </p>
    <p className="text-justify">
      <p>
      Bila 24 buku dan 36 pensil akan diberikan kepada beberapa orang dengan setiap orang 
memperoleh bagian yang sama banyaknya untuk setiap jenisnya, berapa orang paling banyak 
yang dapat memperoleh buku dan pensil tersebut ?
      </p>
    </p>
  </div>
  <div id={`soal14`}>
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-3"
      role="group"
      aria-labelledby={`soal14`}
    >
      {" "}
      <div>
        <input
          name={`soal14`}
          value={"a"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>6 orang</label>
      </div>
      <div>
        <input
          name={`soal14`}
          value={"b"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>8 orang</label>
      </div>
      <div>
        <input
          name={`soal14`}
          value={"c"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>12 orang</label>
      </div>
      <div>
        <input
          name={`soal14`}
          value={"d"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>14 orang</label>
      </div>
      <div>
        <input
          name={`soal14`}
          value={"e"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>18 orang</label>
      </div>
    </div>
  </div>
</div>
{/* //Nomor 15 */}
<div className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg">
  <div className="mb-4">
    <p className="font-bold">No. 15 </p>
    <p className="text-justify">
      <p>
     Seorang pedagang membeli 2 karung beras seharga Rp. 300.000,00. Tiap karung tertulis bruto 40 
kg dan tara 1,25. Pedagang itu menjual beras seharga eceran Rp. 4.200,00 tiap kg dan 
karungnyanya dijual Rp. 1.600,00 per buah. Keuntungan pedagang itu adalah …
      </p>
    </p>
  </div>
  <div id={`soal15`}>
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-3"
      role="group"
      aria-labelledby={`soal15`}
    >
      {" "}
      <div>
        <input
          name={`soal15`}
          value={"a"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>Rp. 35.000,00</label>
      </div>
      <div>
        <input
          name={`soal15`}
          value={"b"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>Rp. 42.000,00</label>
      </div>
      <div>
        <input
          name={`soal15`}
          value={"c"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>Rp. 48.000,00</label>
      </div>
      <div>
        <input
          name={`soal15`}
          value={"d"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>Rp. 52.000,00</label>
      </div>
      <div>
        <input
          name={`soal15`}
          value={"e"}
          onChange={handleChange}
          onBlur={handleBlur}
          className="rounded-full "
          type="radio"
        />{" "}
        <label htmlFor={`jawaban1`}>Rp. 60.000,00</label>
      </div>
    </div>
  </div>
</div>
                </React.Fragment>
              )}

              <button
                type="button"
                onClick={() => {
                  setJawaban(values);
                  return setLogout(true);
                }}
                className="w-full border flex items-center justify-center text-white bg-green-500 h-16 text-lg font-bold rounded-md hover:bg-green-600"
              >
                Simpan
              </button>
            </form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}
