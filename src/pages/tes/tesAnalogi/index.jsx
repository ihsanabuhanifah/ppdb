
import { soalAnalogi } from "./soalAnalogi";
import { Formik } from "formik";
import AlertLogout from "../../../components/AlertLogout";
import { secondsToHms } from "../../../utils";
import { useHistory } from "react-router";
import * as Yup from "yup";
import React from "react";
import { useToast } from "@chakra-ui/react";
import { putTesUmum } from "../../../api/santri";
import Cookies from "js-cookie";
let documentSchema = Yup.object().shape({
  // ref_doc: Yup.number().typeError("Hanya angka"),
});

let documentArraySchema = Yup.object().shape({
  document: Yup.array().of(documentSchema),
});
export default function TestAnalogi() {
  const [waktu, setWaktu] = React.useState(localStorage.getItem("ta"));
  const [logout, setLogout] = React.useState(false);
  const [jawaban, setJawaban] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false)
 
  let history = useHistory();
  let toast = useToast();
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

    for (let i = 0; i < soalAnalogi.length; i++) {
      let soal = `soal${i + 1}`;
      if (soalAnalogi[i].answer === jawaban[soal]) {
        nilai = nilai + 1;
      }
    }
    
    let nilai_asli = (nilai/20)*100
    console.log(nilai_asli)

    let values = {
      kode_mapel : 'Tes003',
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
      localStorage.removeItem('ti')
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
    let timeMatematika = localStorage.getItem("ta");
    if (timeMatematika === null || timeMatematika <= 0) {
      localStorage.setItem("ta", 600);
    }
  }, []);

  React.useEffect(function () {
    let intervalId = setInterval(() => {
      let sisaWaktu = localStorage.getItem("ta");
      
      setWaktu(sisaWaktu);
      let sisa = sisaWaktu - 1;

      localStorage.setItem("ta", sisa);
    }, 1000);

    return function () {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <React.Fragment>
      <AlertLogout
        message="Apakah andanda akan menyelesaikan tes ini ?"
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
      <div className="py-10 pl-5 lg:pl-48 pr-5 lg:pr-48 container  h-full">
        <div className="lg:flex items-center justify-between font-bold border-b-2 pb-5 w-full">
          <p className="uppercase text-lg">
            Materi Tes : <span className="text-green-500">Tes Analogi</span>
          </p>
          <p className="uppercase text-lg text">
            Waktu Tersisa :{" "}
            <span className="text-green-500">{secondsToHms(waktu)}</span>{" "}
          </p>
          
        </div>
        <div className="mt-5 border-b-2 pb-5">
          <p className="text-justify font-bold">Tes untuk menilai kemampuan Anda dalam mengartikan makna, fungsi dan pemakaian kata yang mempunyai padanan hubungan fungsi atau analogi dengan kata </p>
          <p className="text-justify font-bold">Analogi menurut kbbi adalah kesepadanan antara bentuk bahasa yang menjadi dasar terjadinya bentuk lain;</p>
        </div>
        <div className=" font-bold">
        {waktu <= 0 ? (<p className="text-center">Waktu sudah habis. Silahkan simpan jawaban</p>) : (  <p> Pilihlah satu jawaban yang paling tepat ! </p>)} 
        
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
              <div className="mb-5  font-bold border p-10 bg-100 bg-gray-50 shadow-lg rounded-lg">
                    <div className="mb-4">
                      <p className="font-bold">Contoh soal</p>
                      <p className="text-justify">
                        <span className="mb-5">
                          Air : Ember = ... : ....
                        </span>
                      </p>
                    </div>
                    <div id={`xy`}>
                      <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-3"
                        role="group"
                        aria-labelledby={`xy`}
                      >
                        {" "}
                        <div>
                          <input
                            name={`xy`}
                            value={"a"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>Atap : Rumah</label>
                        </div>
                        <div>
                          <input
                            name={`xy`}
                            value={"b"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>listrik : Lampu</label>
                        </div>
                        <div>
                          <input
                            name={`xy`}
                            value={"c"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>Mobil : Jalan</label>
                        </div>
                        <div>
                          <input
                            name={`xy`}
                            value={"d"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>Rambur : Kepala</label>
                        </div>
                        <div>
                          <input
                            name={`xy`}
                            value={"e"}
                            checked
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-full "
                            type="radio"
                          />{" "}
                          <label htmlFor={`jawaban1`}>Pakaian : Lemari</label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 border p-5">
                      <h1>Pembahasan : </h1>
                      <p>Hubungan kata air dan ember adalah air diletakkan di dalam ember. Hubungan yanga sama dengan pasangan kata tersebut adalah pakaian diletakkan didalam lemari. Maka jawabannya adalah Pakaian : Lemari.</p>
                    </div>
                  </div>
            {waktu <= 0 ? ("") : ( soalAnalogi.map((soal, index) => (
                <div
                  className="mb-5  font-bold border p-10 bg--100 shadow-lg rounded-lg"
                  key={index}
                >
                  <div className="mb-4">
                    <p className="font-bold">No. {index + 1}</p>
                    <p className="text-justify">
                      <span className="mb-5">{soal.soal}</span>
                    </p>
                  </div>
                  <div id={`soal[${index + 1}]`}>
                    <div
                      className="grid grid-cols-1 lg:grid-cols-2 gap-3"
                      role="group"
                      aria-labelledby={`soal[${index + 1}]`}
                    >
                      {" "}
                      <div>
                        <input
                          name={`soal${index + 1}`}
                          value={"a"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="rounded-full "
                          type="radio"
                        />{" "}
                        <label htmlFor={`soal[0]`}>{soal.a}</label>
                      </div>
                      <div>
                        <input
                          name={`soal${index + 1}`}
                          value={"b"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="rounded-full "
                          type="radio"
                        />{" "}
                        <label htmlFor={`soal[${index}]`}>{soal.b}</label>
                      </div>
                      <div>
                        <input
                          name={`soal${index + 1}`}
                          value={"c"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="rounded-full "
                          type="radio"
                        />{" "}
                        <label htmlFor={`soal[${index}]`}>{soal.c}</label>
                      </div>
                      <div>
                        <input
                          name={`soal${index + 1}`}
                          value={"d"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="rounded-full "
                          type="radio"
                        />{" "}
                        <label htmlFor={`soal[${index}]`}>{soal.d}</label>
                      </div>
                      {/* <div>
                        <input
                          name={`soal${index + 1}`}
                          value={"e"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="rounded-full "
                          type="radio"
                        />{" "}
                        <label htmlFor={`soal[${index}]`}>{soal.a}</label>
                      </div> */}
                    </div>
                  </div>
                </div>
              )))}

             
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
