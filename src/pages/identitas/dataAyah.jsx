import React from "react";
import Input from "../../components/Input";
import { Formik } from "formik";
import * as Yup from "yup";
import { postDataAyah } from "../../api/santri";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Loading from "../../components/loading";
const RegisterSchema = Yup.object().shape({
  // nik_siswa: Yup.number()
  //   .typeError("NIK wajib dengan angka")

  //   .required("NIK Wajib diisi"),
  // // nik_ayah: Yup.number()
  //   .typeError("NIK wajib dengan angka")

  //   .required("NIK Wajib diisi"),
  name_ayah: Yup.string().required("Nama Lengkap wajib diisi"),

  // tempat_lahir_ayah: Yup.string().required("Tempat Lahir wajib diisi"),
  // tanggal_lahir_ayah: Yup.string().required("Tanggal Lahir wajib diisi"),

  nomor_telepon_ayah: Yup.number()
    .typeError("Nomor Handphone wajib dengan angka")
    .required("Nomor Handphone wajib diisi"),
  // pekerjaan: Yup.string().required("Pekerjaan siswa wajin diisi"),
  // penghasilan_ayah: Yup.string().required("Penghasilan ayah wajib diisi"),
});

export default function DataSiswa() {
  const [focus, setFocus] = React.useState("");
  const [errorPost, setErrorPost] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  let history = useHistory();
  const initialValues = {
    nik_siswa: "",
    nik_ayah: "",
    name_ayah: "",

    tempat_lahir_ayah: "",
    tanggal_lahir_ayah: "",
    penghasilan_ayah: "",
    nomor_telepon_ayah: "",
    pekerjaan_ayah: "",
  };
  let toast = useToast();
  const onSubmit = async (values) => {
    setIsLoading(true);
    let result = await postDataAyah(values);
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
        <h1 className="text-xl lg:text-4xl font-bold uppercase text-green-500">
          Lengkapi Data Ayah Santri
        </h1>
        <p className="text-green-500 text-sm lg:text-xl font-semibold italic mt-1">
          Silahkan lengkapi data ayah santri di pada form di bawah
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
                label="Nama Lengkap Ayah"
                id="name_ayah"
                placeholder="Nama Lengkap ayah"
                tabIndex="1"
                error={errors.name_ayah && touched.name_ayah}
                onFocus={() => {
                  setFocus("name_ayah");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name_ayah}
                focus={focus}
                required
              >
                {errors.name_ayah && touched.name_ayah && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.name_ayah}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <Input
                label="NIK Ayah"
                id="nik_ayah"
                placeholder="NIK ayah"
                tabIndex="2"
                error={errors.nik_ayah && touched.nik_ayah}
                onFocus={() => {
                  setFocus("nik_ayah");
                }}
                onChange={(e) => {
                  setFieldValue("nik_ayah", e.target.value);
                  return localStorage.setItem("nik_ayah", e.target.value);
                }}
                onBlur={handleBlur}
                value={values.nik_ayah}
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
                label="Tempat Lahir Ayah"
                id="tempat_lahir_ayah"
                placeholder="Tempat lahir"
                tabIndex="2"
                error={errors.tempat_lahir_ayah && touched.tempat_lahir_ayah}
                onFocus={() => {
                  setFocus("tempat_lahir_ayah");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tempat_lahir_ayah}
                focus={focus}
                
              >
                {" "}
                {errors.tempat_lahir_ayah && touched.tempat_lahir_ayah && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.tempat_lahir_ayah}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <Input
                label="Tanggal lahir ayah"
                id="tanggal_lahir_ayah"
                placeholder="Tanggal lahir"
                tabIndex="2"
                type="date"
                error={
                  errors.tanggal_lahir_ayah && touched.tanggal_lahir_ayah
                }
                onFocus={() => {
                  setFocus("tanggal_lahir_ayah");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tanggal_lahir_ayah}
                focus={focus}
               
              >
                {" "}
                {errors.tanggal_lahir_ayah && touched.tanggal_lahir_ayah && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.tanggal_lahir_ayah}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <Input
                label="Nomor Handphone Ayah"
                id="nomor_telepon_ayah"
                placeholder="Nomor Handphone Ayah"
                tabIndex="2"
                type="text"
                error={
                  errors.nomor_telepon_ayah && touched.nomor_telepon_ayah
                }
                onFocus={() => {
                  setFocus("nomor_telepon_ayah");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nomor_telepon_ayah}
                focus={focus}
                required
              >
                {" "}
                {errors.nomor_telepon_ayah && touched.nomor_telepon_ayah && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.nomor_telepon_ayah}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <Input
                label="pekerjaan_ayah"
                id="pekerjaan_ayah"
                placeholder="Pekerjaan Ayah"
                tabIndex="2"
                type="text"
                error={
                  errors.pekerjaan_ayah && touched.pekerjaan_ayah
                }
                onFocus={() => {
                  setFocus("pekerjaan_ayah");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.pekerjaan_ayah}
                focus={focus}
                
              >
                {" "}
                {errors.pekerjaan_ayah && touched.pekerjaan_ayah && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.pekerjaan_ayah}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <div className="mt-3  items-center">
                <label
                  className="font-bold  text-green-500 "
                  htmlFor="penghasilan_ayah"
                >
                  <span className="uppercase">Penghasilan Ayah</span>{" "}
                  {/* <span className="italic text-md text-red-500">(wajib)</span> */}
                </label>
                <div className="mt-5">
                  <select
                    className="w-full text-lg  border py-4 px-5 focus:bg-blue-100 "
                    id="penghasilan_ayah"
                    name="penghasilan_ayah"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.penghasilan_ayah}
                    error={errors.penghasilan_ayah && touched.penghasilan_ayah}
                  >
                    <option >Pilih</option>
                    <option value={"kurang dari 5000000"}> {" Kurang dari Rp. 5.000.000"}</option>
                    <option value={"lebih dari 5000000 dan kurang dari 10000000"}> {" Lebih dari Rp. 5.000.000 dan Kurang dari Rp. 10.000.000" }</option>
                    <option value={"lebih dari 10000000 dan kurang dari 20000000"}> {" Lebih dari Rp. 10.000.000 dan Kurang dari Rp. 20.000.000" }</option>
                    <option value={"lebih dari 20000000"}> {" Lebih dari Rp. 20.000.000" }</option>
                    <option value={"lebih dari 30000000"}> {" Lebih dari Rp. 30.000.000" }</option>
                    <option value={"lebih dari 40000000"}> {" Lebih dari Rp. 40.000.000" }</option>
                  </select>
                  {errors.penghasilan_ayah && touched.penghasilan_ayah && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.penghasilan_ayah}
                  </p>
                )}
                </div>
              </div>
            </div>
           
            <div>

            </div>
            <div></div>
           

            <div className="col-start-1 lg:col-start-3">
              <button
                type="submit"
                className="w-full border flex items-center justify-center text-white bg-green-500 h-16 text-lg font-bold rounded-md hover:bg-green-600"
              >
                {isLoading ? <Loading></Loading> : " Simpan dan Lanjutkan"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
}
