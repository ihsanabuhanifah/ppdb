import { useParams } from "react-router-dom";
import { soalMatematika } from "./soalMatematika";
import { Formik, Field, Form } from "formik";
import AlertLogout from "../../../components/AlertLogout";
import { secondsToHms } from "../../../utils";
import { useHistory } from "react-router";
import * as Yup from "yup";
import React from "react";
let documentSchema = Yup.object().shape({
  // ref_doc: Yup.number().typeError("Hanya angka"),
});

let documentArraySchema = Yup.object().shape({
  document: Yup.array().of(documentSchema),
});
export default function Testpage() {
  const [waktu, setWaktu] = React.useState(localStorage.getItem("tm"));
  const [logout, setLogout] = React.useState(false);
  const [jawaban, setJawaban] = React.useState([]);
  let { slug } = useParams();
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
  function onSubmit(jawaban) {
    console.log(jawaban);
    let nilai = 0;

    for (let i = 0; i < soalMatematika.length; i++) {
      let soal = `soal${i + 1}`;
      if (soalMatematika[i].answer === jawaban[soal]) {
        nilai = nilai + 1;
      }
    }
    console.log(nilai);
    return history.push("/ppdb/tes-umum");
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
        message="Apakah anda akan menyelesaikan tes ini ?"
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
        {waktu <= 0 ? (<p className="text-center">Waktu sudah habis. Silahkan simpan jawaban</p>) : (  <p> Pilihlah satu jawaban yang paling tepat </p>)} 
        
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
            {waktu <= 0 ? ("") : ( soalMatematika.map((soal, index) => (
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
                      className="grid grid-cols-1 lg:grid-cols-3 gap-3"
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
                        <label htmlFor={`soal[0]`}>{soal.b}</label>
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
                        <label htmlFor={`soal[${index}]`}>{soal.a}</label>
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
                        <label htmlFor={`soal[${index}]`}>{soal.a}</label>
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
                        <label htmlFor={`soal[${index}]`}>{soal.a}</label>
                      </div>
                      <div>
                        <input
                          name={`soal${index + 1}`}
                          value={"e"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="rounded-full "
                          type="radio"
                        />{" "}
                        <label htmlFor={`soal[${index}]`}>{soal.a}</label>
                      </div>
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
