import React from "react";

import { Formik } from "formik";

import InputDate from "../../../components/InputDate";
import { postTesDiniyyah, getTesDiniyah } from "../../../api/santri";
import { useToast } from "@chakra-ui/react";
import Loading from "../../../components/loading";
import * as Yup from "yup";
import dayjs from "dayjs";
const JadwalSchema = Yup.object().shape({
  tanggal: Yup.string("tanggal wajib")
    .required("Tanggal wajib diisi")
    .nullable(),
  metode: Yup.string().required("Metode wajib diisi"),
});
export default function TesDiniyah() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUploadUlang, setIsUploadUlang] = React.useState(false);
  const [jadwal, setJadwal] = React.useState({
    tanggal: null,
    jam: null,
    metode: "",
    catatan: "",
  });
  let toast = useToast();

  const tesSaya = async () => {
    let result = await getTesDiniyah();
    console.log(result);
    if (result?.data.length !== 0) {
      setIsUploadUlang(true);
      return setJadwal(result.data[0]);
      // history.push("/identitas/data-ibu");
    }
  };
  React.useEffect(() => {
    tesSaya();
  }, []);
  const onSubmit = async (values) => {
    setIsLoading(true);
    let result = await postTesDiniyyah(values);

    if (result?.message === "Berhasil Menyimpan Data") {
      toast({
        position: "top-right",
        title: "Success",
        description: "Berhasil Menyimpan Data",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      tesSaya();

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

  console.log(jadwal);
  return (
    <section className="text-gray-600">
      <Formik
        initialValues={jadwal}
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
            <h5 className="uppercase text-2xl text-center font-bold text-green-500 mb-5">
              {jadwal.tanggal === null
                ? "Buat JAdwal tes Diniyah"
                : "Jadwal Sudah dibuat"}
            </h5>
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
                    tabIndex="1"
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

            <div className="mt-5">
              <label
                className="font-bold mt-5  text-green-500 "
                htmlFor="tanggal"
              >
                <span className="uppercase">
                  Tanggal Tes Diniyah dan Wawancara
                </span>{" "}
                <span className="italic text-md text-red-500">(wajib)</span>
              </label>
              <select
                className="w-full text-lg  border py-4 px-5 focus:bg-blue-100 "
                id="tanggal"
                name="tanggal"
                tabIndex="1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tanggal}
                error={errors.tanggal && touched.tanggal}
              >
                <option>Pilih {}</option> 
                {tanggalTes &&
                  tanggalTes.map((item, index) => {
                  
                      return (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      );
                    
                  })}
              </select>
            </div>

            <div className="mt-5">
              <label className="font-bold  text-green-500 " htmlFor="jam_tes">
                <span className="uppercase">Jam Tes</span>{" "}
                <span className="italic text-md text-red-500">(wajib)</span>
              </label>
              <select
                className="w-full text-lg  border py-4 px-5 focus:bg-blue-100 "
                id="jam_tes"
                name="jam_tes"
                tabIndex="1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jam_tes}
                error={errors.jam_tes && touched.jam_tes}
              >
                <option>Pilih</option>

                <option value={"08:00:00"}> {"08:00"}</option>
                <option value={"09:00:00"}> {"09:00"}</option>
                <option value={"10:00:00"}> {"10:00"}</option>
                <option value={"11:00:00"}> {"11:00"}</option>
              </select>
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
                tabIndex="4"
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
              <p className="text-justify text-red-500 font-bold italic">
                {" "}
                CATATAN PENTING
              </p>
              <p className="text-justify text-red-500 font-bold italic">
                {" "}
                - Materi tes ini adalah Tes Minat dan Bakat, Baca Tulis Alquran
                , Hafalan dan Wawancara
              </p>

              <p className="text-justify text-red-500 font-bold italic">
                {" "}
                - Apabila memilih{" "}
                <span className="text-green-500">tes ONLINE</span>, panitia akan
                menghubungi nomor telpon Abi/Umi akh calon santri untuk
                menentukan jam tes melalui online dengan google meet.
              </p>
            </div>
            <div className="col-start-1 lg:col-start-3 mt-3  items-center">
              {jadwal.tanggal === null ? (
                <button
                  type="submit"
                  disabled={isUploadUlang || isLoading}
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
              ) : (
                ""
              )}
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
}

const tanggalTes = [
  {
    value: "2023-08-20 00:00:00",
    label: "Minggu, 20 Agustus 2023",
  },
  {
    value: "2023-09-02 00:00:00",
    label: "Sabtu, 02 September 2023",
  },
  {
    value: "2023-09-03 00:00:00",
    label: "Minggu, 03 September 2023",
  },
  {
    value: "2023-09-16 00:00:00",
    label: "Sabtu, 16 September 2023",
  },
  {
    value: "2023-09-17 00:00:00",
    label: "Minggu, 17 September 2023",
  },
  {
    value: "2023-10-07 00:00:00",
    label: "Sabtu, 07 Oktober 2023",
  },
  {
    value: "2023-10-08 00:00:00",
    label: "Minggu, 08 Oktober 2023",
  },
  {
    value: "2023-10-21 00:00:00",
    label: "Sabtu, 21 Oktober 2023",
  },
  {
    value: "2023-10-07 00:00:00",
    label: "Minggu, 22 Oktober 2023",
  },
  {
    value: "2023-11-04 00:00:00",
    label: "Sabtu, 04 November 2023",
  },
  {
    value: "2023-11-05 00:00:00",
    label: "Minggu, 05 November 2023",
  },
  {
    value: "2023-11-18 00:00:00",
    label: "Sabtu, 18 November 2023",
  },
  {
    value: "2023-11-19 00:00:00",
    label: "Minggu, 19 November 2023",
  },
  {
    value: "2023-12-02 00:00:00",
    label: "Sabtu, 02 Desember 2023",
  },
  {
    value: "2023-12-02 00:00:00",
    label: "Minggu, 03 Desember 2023",
  },
  {
    value: "2023-12-02 00:00:00",
    label: "Sabtu, 16 Desember 2023",
  },
  {
    value: "2023-12-02 00:00:00",
    label: "Minggu, 17 Desember 2023",
  },
];
