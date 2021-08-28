import React from "react";
import Input from "../../components/Input";
import { Formik } from "formik";
import * as Yup from "yup";
import { postDataWali } from "../../api/santri";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Loading from "../../components/loading";
const RegisterSchema = Yup.object().shape({
  // nik_siswa: Yup.number()
  //   .typeError("NIK wajib dengan angka")

  //   .required("NIK Wajib diisi"),
  // // nik_wali: Yup.number()
  //   .typeError("NIK wajib dengan angka")

  //   .required("NIK Wajib diisi"),
  name_wali: Yup.string().required("Nama Lengkap wajib diisi"),

  // tempat_lahir_wali: Yup.string().required("Tempat Lahir wajib diisi"),
  // tanggal_lahir_wali: Yup.string().required("Tanggal Lahir wajib diisi"),

  nomor_telepon_wali: Yup.number()
    .typeError("Nomor Handphone wajib dengan angka")
    .required("Nomor Handphone wajib diisi"),
  // pekerjaan: Yup.string().required("Pekerjaan siswa wajin diisi"),
  // penghasilan_wali: Yup.string().required("Penghasilan wali wajib diisi"),
});

export default function DataSiswa() {
  const [focus, setFocus] = React.useState("");
  const [errorPost, setErrorPost] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  let history = useHistory();
  const initialValues = {
    nik_siswa: "",
    nik_wali: "",
    name_wali: "",

    tempat_lahir_wali: "",
    tanggal_lahir_wali: "",
    penghasilan_wali: "",
    nomor_telepon_wali: "",
    pekerjaan_wali: "",
  };
  let toast = useToast();
  const onSubmit = async (values) => {
    setIsLoading(true);
    let result = await postDataWali(values);
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
      history.push("/identitas/data-sekolah-asal");
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
    <React.Fragment>
      <div className="mb-6 pb-5 border-b-2">
        <h1 className="text-xl lg:text-4xl font-bold  text-green-500">
          <span  className="uppercase">Lengkapi Data wali Santri</span> 
          <span className="text-md ml-4 italic text-red-500">(Tidak Wajib)</span>
        </h1>
        <p className="text-green-500 text-sm lg:text-xl font-semibold italic mt-1">
          Silahkan lengkapi data wali santri di pada form di bawah <p>Jika tidak ada wali silahkan lanjutkan ke dashboard</p> 
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
                label="Nama Lengkap wali"
                id="name_wali"
                placeholder="Nama Lengkap wali"
                tabIndex="1"
                error={errors.name_wali && touched.name_wali}
                onFocus={() => {
                  setFocus("name_wali");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name_wali}
                focus={focus}
               
              >
                {errors.name_wali && touched.name_wali && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.name_wali}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <Input
                label="NIK wali"
                id="nik_wali"
                placeholder="NIK wali"
                tabIndex="2"
                error={errors.nik_wali && touched.nik_wali}
                onFocus={() => {
                  setFocus("nik_wali");
                }}
                onChange={(e) => {
                  setFieldValue("nik_wali", e.target.value);
                  return localStorage.setItem("nik_wali", e.target.value);
                }}
                onBlur={handleBlur}
                value={values.nik_wali}
                focus={focus}
              >
                {" "}
                {errors.nik_siswa && touched.nik_siswa && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.nik_siswa}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <Input
                label="Tempat Lahir wali"
                id="tempat_lahir_wali"
                placeholder="Tempat lahir"
                tabIndex="2"
                error={errors.tempat_lahir_wali && touched.tempat_lahir_wali}
                onFocus={() => {
                  setFocus("tempat_lahir_wali");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tempat_lahir_wali}
                focus={focus}
                
              >
                {" "}
                {errors.tempat_lahir_wali && touched.tempat_lahir_wali && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.tempat_lahir_wali}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <Input
                label="Tanggal lahir wali"
                id="tanggal_lahir_wali"
                placeholder="Tanggal lahir"
                tabIndex="2"
                type="date"
                error={
                  errors.tanggal_lahir_wali && touched.tanggal_lahir_wali
                }
                onFocus={() => {
                  setFocus("tanggal_lahir_wali");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tanggal_lahir_wali}
                focus={focus}
               
              >
                {" "}
                {errors.tanggal_lahir_wali && touched.tanggal_lahir_wali && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.tanggal_lahir_wali}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <Input
                label="Nomor Handphone wali"
                id="nomor_telepon_wali"
                placeholder="Nomor Handphone wali"
                tabIndex="2"
                type="text"
                error={
                  errors.nomor_telepon_wali && touched.nomor_telepon_wali
                }
                onFocus={() => {
                  setFocus("nomor_telepon_wali");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nomor_telepon_wali}
                focus={focus}
               
              >
                {" "}
                {errors.nomor_telepon_wali && touched.nomor_telepon_wali && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.nomor_telepon_wali}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <Input
                label="pekerjaan_wali"
                id="pekerjaan_wali"
                placeholder="Pekerjaan wali"
                tabIndex="2"
                type="text"
                error={
                  errors.pekerjaan_wali && touched.pekerjaan_wali
                }
                onFocus={() => {
                  setFocus("pekerjaan_wali");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pekerjaan_wali}
                focus={focus}
                
              >
                {" "}
                {errors.pekerjaan_wali && touched.pekerjaan_wali && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.pekerjaan_wali}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <div className="mt-3  items-center">
                <label
                  className="font-bold  text-green-500 "
                  htmlFor="penghasilan_wali"
                >
                  <span className="uppercase">Penghasilan wali</span>{" "}
                  {/* <span className="italic text-md text-red-500">(wajib)</span> */}
                </label>
                <div className="mt-5">
                  <select
                    className="w-full text-lg  border py-4 px-5 focus:bg-blue-100 "
                    id="penghasilan_wali"
                    name="penghasilan_wali"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.penghasilan_wali}
                    error={errors.penghasilan_wali && touched.penghasilan_wali}
                  >
                    <option >Pilih</option>
                    <option value={"kurang dari 5000000"}> {" Kurang dari Rp. 5.000.000"}</option>
                    <option value={"lebih dari 5000000 dan kurang dari 10000000"}> {" Lebih dari Rp. 5.000.000 dan Kurang dari Rp. 10.000.000" }</option>
                    <option value={"lebih dari 10000000 dan kurang dari 20000000"}> {" Lebih dari Rp. 10.000.000 dan Kurang dari Rp. 20.000.000" }</option>
                    <option value={"lebih dari 20000000"}> {" Lebih dari Rp. 20.000.000" }</option>
                    <option value={"lebih dari 30000000"}> {" Lebih dari Rp. 30.000.000" }</option>
                    <option value={"lebih dari 40000000"}> {" Lebih dari Rp. 40.000.000" }</option>
                  </select>
                  {errors.penghasilan_wali && touched.penghasilan_wali && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.penghasilan_wali}
                  </p>
                )}
                </div>
              </div>
            </div>
           
            <div>

            </div>
            
            {errorPost?.message && (
              <p className="text-red-500 italic font-bold  text-sm mb-5 mt-1">
                {errorPost?.message?.split(",").map((er, index) => (
                  <span key={index}>{er}</span>
                ))}
              </p>
            )}

            <div className="col-start-1 lg:col-start-2">
              <button
                type="submit"
                className="w-full border flex items-center justify-center text-white bg-green-300 h-16 text-lg font-bold rounded-md hover:bg-green-600"
              >
                {isLoading ? <Loading></Loading> : " Simpan dan Lanjutkan"}
              </button>
            </div>
            <div className="col-start-1 lg:col-start-3">
              <button
                type="button"
                onClick={()=> {
                    history.push("/ppdb")
                }}
                className="w-full border flex items-center justify-center text-white bg-green-500 h-16 text-lg font-bold rounded-md hover:bg-green-600"
              >
                  Lanjut Ke Dashbord
                
              </button>
            </div>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
}
