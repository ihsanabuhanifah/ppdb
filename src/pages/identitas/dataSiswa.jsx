import React from "react";
import Input from "../../components/Input";
import { Formik } from "formik";
import * as Yup from "yup";
import { postSantiBaru } from "../../api/santri";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Loading from "../../components/loading";
import Identitas from "../../layout/identitas"
const RegisterSchema = Yup.object().shape({
  // nik_siswa: Yup.string()
  // .length(16, 'NIK Wajib 16 digit')
  //   .typeError("NIK wajib dengan angka")

  //   .required("NIK Wajib diisi"),
  name_siswa: Yup.string().required("Nama Lengkap wajib diisi"),
  jurusan: Yup.string().required("Jurusan wajib diisi"),
  tempat_lahir_siswa: Yup.string().required("Tempat Lahir wajib diisi"),
  tanggal_lahir_siswa: Yup.string().required("Tanggal Lahir wajib diisi"),
  jenis_kelamin: Yup.string().required("Nama Lengkap wajib diisi"),
  // golongan_darah: Yup.string().required("Nama Lengkap wajib diisi"),
  alamat_siswa: Yup.string().required("Alamat siswa wajin diisi"),
  nomor_telepon_siswa: Yup.number().typeError(
    "Nomor Handphone wajib dengan angka"
  ),

  tinggi_badan: Yup.number()
  .typeError("Tinggi Badan wajib dengan angka"),
 
  berat_badan: Yup.number()
  .typeError("Berat Badan wajib dengan angka"),

  pihak_yg_dihubungi: Yup.string().required("Pihak dihubungi wajib diisi"),
  //
  // ukuran_baju: Yup.number()
  //   .typeError("Nomor Handphone wajib dengan angka")
  //   .required("Nomor Handphone wajib diisi"),
  // cita_cita: Yup.number()
  //   .typeError("Nomor Handphone wajib dengan angka")
  //   .required("Nomor Handphone wajib diisi"),
});

export default function DataSiswa() {
  const [focus, setFocus] = React.useState("");
  const [errorPost, setErrorPost] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  let history = useHistory();
  const initialValues = {
    nik_siswa: "",
    name_siswa: "",
    user_id: 7,
    tempat_lahir_siswa: "",
    tanggal_lahir_siswa: "",
    jenis_kelamin: "1",
    agama: "Islam",
    golongan_darah: "",
    alamat_siswa: "",
    nomor_telepon_siswa: "",
    pihak_yg_dihubungi: "",
    tinggi_badan: "",
    berat_badan: "",
    ukuran_baju: "xl",
    cita_cita: "",
    jurusan: "",
  };
  let toast = useToast();
  const onSubmit = async (values) => {
    setIsLoading(true);
    let result = await postSantiBaru(values);
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

      window.scrollTo(0, 0);
      return history.push("/identitas/data-sekolah-asal");
    }
    if (result.response.status === 401) {
      setErrorPost(result.response.data);
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
  console.log(focus);
  return (
    <Identitas>
      <div className="mb-6 pb-5 ">
        <h1 className="text-xl lg:text-4xl font-bold uppercase text-[#1E046C]">
          Lengkapi Data Santri
        </h1>
        <p className="text-[#1E046C] text-sm lg:text-xl font-semibold italic mt-1">
          Silahkan lengkapi data santri di pada form di bawah
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
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
          <form
            className="grid grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-5 lg:border p-0 lg:p-10 lg:bg-gray-50"
            onSubmit={handleSubmit}
          >
            <div>
              <Input
                label="Nama Lengkap Santri"
                id="name_siswa"
                placeholder="Nama Lengkap"
                tabIndex="1"
                error={errors.name_siswa && touched.name_siswa}
                onFocus={() => {
                  setFocus("name_siswa");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name_siswa}
                focus={focus}
                required
              >
                {errors.name_siswa && touched.name_siswa && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.name_siswa}
                  </p>
                )}
              </Input>
            </div>
           
            <div>
              <Input
                label="Tempat Lahir santri"
                id="tempat_lahir_siswa"
                placeholder="Tempat lahir"
                tabIndex="2"
                error={errors.tempat_lahir_siswa && touched.tempat_lahir_siswa}
                onFocus={() => {
                  setFocus("tempat_lahir_siswa");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tempat_lahir_siswa}
                focus={focus}
                required
              >
                {" "}
                {errors.tempat_lahir_siswa && touched.tempat_lahir_siswa && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.tempat_lahir_siswa}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <Input
                label="Tanggal lahir santri"
                id="tanggal_lahir_siswa"
                placeholder="Tanggal lahir"
                tabIndex="2"
                type="date"
                error={
                  errors.tanggal_lahir_siswa && touched.tanggal_lahir_siswa
                }
                onFocus={() => {
                  setFocus("tanggal_lahir_siswa");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tanggal_lahir_siswa}
                focus={focus}
                required
              >
                {" "}
                {errors.tanggal_lahir_siswa && touched.tanggal_lahir_siswa && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.tanggal_lahir_siswa}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <div className="mt-3  items-center">
                <label className="font-bold  text-[#1E046C] " htmlFor="jurusan">
                  <span className="uppercase">Jurusan dipilih</span>{" "}
                  <span className="italic text-md text-red-500">(wajib)</span>
                </label>
                <div className="mt-5">
                  <select
                    className="w-full text-lg  border py-4 px-5 focus:bg-blue-100 "
                    id="jurusan"
                    name="jurusan"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.jurusan}
                    error={errors.jurusan && touched.jurusan}
                  >
                    <option>Pilih</option>
                    <option value={1}>Teknik Komputer dan Jaringan</option>
                    <option value={2}>Rekayasa Perangkat Lunak</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <div className="mt-3  items-center">
                <label
                  className="font-bold  text-[#1E046C] "
                  htmlFor="jenis_kelamin"
                >
                  <span className="uppercase">Jenis Kelamin santri</span>{" "}
                  <span className="italic text-md text-red-500">(wajib)</span>
                </label>
                <div className="mt-5">
                  <select
                    className="w-full text-lg  border py-4 px-5 focus:bg-blue-100 "
                    id="jenis_kelamin"
                    name="jenis_kelamin"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.jenis_kelamin}
                    error={errors.jenis_kelamin && touched.jenis_kelamin}
                  >
                    <option value={"1"}>Laki-laki</option>
                    <option value={"2"}>Perempuan</option>
                  </select>
                </div>
              </div>
            </div>
           
          
           
              
            <div>
              <div className="mt-3  items-center">
                <label
                  className="font-bold  text-[#1E046C] "
                  htmlFor="pihak_yg_dihubungi"
                >
                  <span className="uppercase"> Pihak yang dihubungi</span>{" "}
                  <span className="italic text-md text-red-500">(wajib)</span>
                </label>
                <div className="mt-5">
                  <select
                    className="w-full text-lg  border py-4 px-5 focus:bg-blue-100 "
                    id="pihak_yg_dihubungi"
                    name="pihak_yg_dihubungi"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pihak_yg_dihubungi}
                    error={
                      errors.pihak_yg_dihubungi && touched.pihak_yg_dihubungi
                    }
                  >
                    <option>Pilih</option>
                    <option value="ayah">Ayah</option>
                    <option value="ibu">ibu</option>
                    <option value="wali">Wali</option>
                  </select>
                </div>
                {errors.pihak_yg_dihubungi && touched.pihak_yg_dihubungi && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.pihak_yg_dihubungi}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-1 lg:col-span-3 ">
              <label
                className="font-bold uppercase text-[#1E046C] "
                htmlFor="pihak_yg_dihubungi"
              >
                <span className="uppercase">Alamat</span>{" "}
                <span className="italic text-md text-red-500">(wajib)</span>
              </label>

              <textarea
                className="w-full text-lg mt-5  border py-4 px-5 focus:bg-blue-100 "
                name="alamat_siswa"
                id="alamat_siswa"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.alamat_siswa}
                error={errors.alamat_siswa && touched.alamat_siswa}
                cols="30"
                rows="10"
              ></textarea>
              {errors.alamat_siswa && touched.alamat_siswa && (
                <p className="text-red-500 italic font-bold  text-sm mt-1">
                  {errors.alamat_siswa}
                </p>
              )}
            </div>

            <div className="col-span-1 lg:col-span-3">
              {errorPost?.message && (
                <p className="text-red-500 italic font-bold  text-md mb-5 mt-1">
                  {errorPost?.message?.split(",").map((er, index) => (
                    <p key={index}>{er}</p>
                  ))}
                </p>
              )}
            </div>
            <div className="col-start-1 lg:col-start-3">
              <button
                type="submit"
                className="w-full border flex items-center justify-center text-white bg-[#1E046C] h-16 text-lg font-bold rounded-md hover:bg-green-600"
              >
                {isLoading ? <Loading></Loading> : " Simpan dan Lanjutkan"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Identitas>
  );
}
