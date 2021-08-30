import React from "react";
import Matematika from "../../../image/matematika.jpg";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import Input from "../../../components/Input";
import InputDate from "../../../components/InputDate";
import { postTesDiniyyah, getTesDiniyah } from "../../../api/santri";
import { useToast } from "@chakra-ui/react";
import Loading from "../../../components/loading";
import * as Yup from "yup";
import dayjs from "dayjs";
const JadwalSchema = Yup.object().shape({
  tanggal: Yup.string().required("Tanggal wajib diisi"),
  metode: Yup.string().required("Metode wajib diisi"),
});
export default function TesDiniyah() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUploadUlang, setIsUploadUlang] = React.useState(false);
  const [values, setValues] = React.useState({
    tanggal: null,
    metode: "",
    catatan: "",
  });
  let toast = useToast();
  let history = useHistory();

  const tesSaya = async () => {
    let result = await getTesDiniyah();
    console.log(result);
    if (result?.data.length !== 0) {
      setIsUploadUlang(true);
      return setValues(result.data[0]);
      // history.push("/identitas/data-ibu");
    }
  };
  React.useEffect(() => {
    tesSaya();
  }, []);
  const onSubmit = async (values) => {
    setIsLoading(true);
    let result = await postTesDiniyyah(values);
    setIsLoading(false);
    if (result?.message === "Berhasil Menyimpan Data") {
      toast({
        position: "top-right",
        title: "Success",
        description: "Berhasil Menyimpan Data",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      // history.push("/identitas/data-ibu");
    }
    if (result.response.status === 401) {
      toast({
        position: "top-right",
        title: "Fail",
        description: result.response.data.message,
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }
  };
  return (
    <section className="text-gray-600">
      <Formik
        initialValues={values}
        validationSchema={JadwalSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form className="lg:border p-1 lg:p-10 " onSubmit={handleSubmit}>
              <h5 className="uppercase text-2xl text-center font-bold text-green-500 mb-5">buat JAdwal tes Diniyah</h5>
            <div>
              <InputDate
                label="Tanggal Tes Diniyah dan Wawancara"
                id="tanggal"
                tabIndex="1"
                error={errors.tanggal && touched.tanggal}
                onChange={handleChange}
                onBlur={handleBlur}
                value={dayjs(values.tanggal).format("YYYY-MM-DD")}
                required
              >
                {errors.tanggal && touched.tanggal && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.tanggal}
                  </p>
                )}
              </InputDate>
            </div>
            <div>
              <div className="mt-3  items-center">
                <label className="font-bold  text-green-500 " htmlFor="metode">
                  <span className="uppercase">
                    Metode Tes Diniyah dan Wawancara
                  </span>{" "}
                  <span className="italic text-md text-red-500">(wajib)</span>
                </label>
                <div className="mt-5">
                  <select
                    className="w-full text-lg  border py-4 px-5 focus:bg-blue-100 "
                    id="metode"
                    name="metode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.metode}
                    error={errors.metode && touched.metode}
                  >
                    <option>Pilih</option>
                    <option value={1}>
                      {" "}
                      {"Tes di SMK MADINATULQURAN (Offline)"}
                    </option>
                    <option value={2}> {"Online"}</option>
                  </select>
                  {errors.metode && touched.metode && (
                    <p className="text-red-500 italic font-bold  text-sm mt-1">
                      {errors.metode}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-3 mt-5 ">
              <label
                className="font-bold uppercase text-green-500 "
                htmlFor="catatan"
              >
                <span className="uppercase">Catatan </span>
              </label>

              <textarea
                className="w-full text-lg mt-5  border py-4 px-5 focus:bg-blue-100 "
                name="catatan"
                id="catatan"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.catatan}
                error={errors.catatan && touched.catatan}
                cols="30"
                rows="10"
              ></textarea>
              {errors.catatan && touched.catatan && (
                <p className="text-red-500 italic font-bold  text-sm mt-1">
                  {errors.catatan}
                </p>
              )}
            </div>
            <div className="border p-5 mt-5">
            <p className="text-justify text-green-500 font-bold italic">
                {" "}
               CATATAN PENTING
              </p>
              <p className="text-justify text-green-500 font-bold italic">
                {" "}
               - Materi tes ini adalah Baca Tulis Alquran , Hafalan dan Wawancara
              </p>
              <p className="text-justify text-green-500 font-bold italic">
                {" "}
               - Untuk waktu tes secara Offline adalah hari Minggu
              </p>
              <p className="text-justify text-green-500 font-bold italic">
                {" "}
               - Untuk waktu tes secara Online adalah hari Sabtu / Minggu
              </p>
             
              <p className="text-justify text-green-500 font-bold italic">
                {" "}
                - Apabila memilih tes online, panitia akan menghubungi nomor
                telpon Abi/Umi akh calon santri untuk menentukan jam tes melalui
                online dengan google meet.
              </p>
            </div>
            <div className="col-start-1 lg:col-start-3 mt-3  items-center">
              <button
                type="submit"
                disabled={isUploadUlang}
                className="w-full border flex items-center justify-center text-white bg-green-500 h-16 text-lg font-bold rounded-md hover:bg-green-600"
              >
                {isLoading ? (
                  <Loading></Loading>
                ) : isUploadUlang ? (
                  "Jadwal Sudah Dibuat"
                ) : (
                  "Konfirmasi"
                )}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
}
