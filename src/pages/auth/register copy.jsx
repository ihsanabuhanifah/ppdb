import React, { useEffect } from "react";
import Layout from "../../layout/auth";

import { Link } from "react-router-dom";
import { Formik, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { authRegister } from "../../redux/action/register";
import { useHistory } from "react-router";
import Loading from "../../components/loading";
import clsx from "clsx";
import Batas from "./Batas";
import InputReg from "./Input";
import SelectReg from "./Select";
import TextAreaReg from "./TextArea";
import Swal from "sweetalert2";
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Wajib diisi"),
  email: Yup.string()
    .email("Format email tidak sesuai")
    .required("Wajib diisi"),
  phone: Yup.string()
    .matches(
      /^08\d{7,12}$/,
      "Nomor telepon harus dimulai dengan 08 dan minimal 9 digit"
    )
    .required("Wajib diisi"),

  nisn: Yup.string()
    .matches(/^\d{10}$/, "NISN harus 10 digit angka")
    .required("Wajib diisi"),

  jenis_sekolah: Yup.string().required("Wajib diisi"),
  asal_sekolah: Yup.string().required("Wajib diisi"),

  password: Yup.string()
    .min(8, "Password minimal 8 karakter")
    .required("Wajib diisi"),
  password_confirmation: Yup.string()
    .min(8, "Konfirmasi Password minimal 8 karakter")
    .oneOf([Yup.ref("password")], "Password dan Password Konfirmasi tidak sama")
    .required("Wajib diisi"),
});

export default function Register() {
  const [focus, setFocus] = React.useState("");
  const [errorReg, setErrorReg] = React.useState();
  let dispatch = useDispatch();
  let toast = useToast();
  let history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);
  console.log(isLoading);
  const initialValues = {
    name: "",
    email: "",
    phone: "",

    password: "",
    password_confirmation: "",
    nisn: "",
    asal_sekolah: "",
    jenis_sekolah: "",
    role: 2,
    is_batal: 0,
  };
  const onSubmit = async (values) => {
    let result = await dispatch(authRegister(values));
    console.log(result);
    if (result.message === "Berhasil Membuat Akun") {
      localStorage.removeItem("register");

      Swal.fire({
        title: "Berhasil!",
        text: "Selamat Anda telah berhasil Registrasi",
        icon: "success",
      });

      history.push("dashboard");
    }
    if (result.response.status === 401) {
      console.log(result.response);
      setErrorReg(result.response.data);

       Swal.fire({
              title: "Gagal",
              text: result.response?.data?.message,
              icon: "error"
            });
      
    }
  };

  const regis = localStorage.getItem("register");

  const formik = useFormik({
    initialValues: regis ? JSON.parse(regis) : initialValues,
    validationSchema: RegisterSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  const {
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    resetForm,
    setValues,
    isSubmitting,
  } = formik;

  useEffect(() => {
    localStorage.setItem("register", JSON.stringify(values));
  }, [values]);
  return (
    <Layout page="register">
      <section className=" p-5 w-full grid grid-cols-1  lg:grid-cols-3 h-full   ">
        {" "}
        <div className="w-full  lg:col-start-2 bg-white rounded-2xl py-10 px-5">
          <div className="px-2">
            <h3 className="text-xl lg:text-3xl font-bold uppercase mb-2 ">
              <span className="text-gray-500">Daftar</span>{" "}
              <span className="text-blue-400"> PPDB</span>
            </h3>
            <p className="text-xl italic font-normal ">
              Silahkan isi data di bawah ini untuk membuat akun di Aplikasi{" "}
              <span className="text-blue-400 font-bold">
                PPDB Online MAN 1 Kota Sukabumi
              </span>
            </p>
          </div>
          <FormikProvider value={Formik}>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-2 mt-5"
            >
              {console.log("Err", errors)}
              <Batas title={"Data Calon Siswa"}>
                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.name}
                  title={"Nama Lengkap"}
                  placeholder={"Muhammad"}
                  errors={errors.name}
                  id={"name"}
                  touched={touched.name}
                />

                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.nisn}
                  title={"NISN"}
                  placeholder={"XXXXXXXXX"}
                  errors={errors.nisn}
                  id="nisn"
                  touched={touched.nisn}
                />

                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.jenis_sekolah}
                  title={"Jenis Sekolah"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.jenis_sekolah}
                  id="jenis_sekolah"
                  touched={touched.jenis_sekolah}
                >
                  <option>Pilih</option>
                  <option value={"SMP"}> SMP</option>
                  <option value={"MTs"}> MTs</option>
                  <option value={"PKBM"}>PKBM</option>
                  <option value={"PDF Wustha"}> PDF Wustha</option>
                  <option value={"PPS SPQ"}> PPS SPQ</option>
                </SelectReg>

                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.asal_sekolah}
                  title={"Nama Sekolah Asal"}
                  placeholder={"cth. MTSN 1 Sukabumi"}
                  errors={errors.asal_sekolah}
                  id="asal_sekolah"
                  touched={touched.asal_sekolah}
                />

                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.phone}
                  title={"Nomor WA Aktif"}
                  placeholder={"cth. 0895320050344"}
                  errors={errors.phone}
                  id="phone"
                  touched={touched.phone}
                />

                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.email}
                  title={"Email"}
                  placeholder={"cth. ihsan@gmail.com"}
                  errors={errors.email}
                  id="email"
                  touched={touched.email}
                />

                <InputReg
                  isRequired
                  type={"password"}
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.password}
                  title={"Password"}
                  placeholder={"*******"}
                  errors={errors.password}
                  id="password"
                  touched={touched.password}
                />

                <InputReg
                  isRequired
                  type={"password"}
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.password_confirmation}
                  title={"Konfirmasi Password"}
                  placeholder={"*******"}
                  errors={errors.password_confirmation}
                  id="password_confirmation"
                  touched={touched.password_confirmation}
                />
              </Batas>

              {/* login */}

              <div>
                {errorReg?.message && (
                  <p className="text-red-500 italic font-bold  text-sm mb-5 mt-1">
                    {errorReg?.message?.split(",").map((er, index) => (
                      <span key={index}>{er}</span>
                    ))}
                  </p>
                )}

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full border flex justify-center items-center text-white bg-blue-400 h-16 text-lg font-bold rounded-md hover:bg-blue-600"
                >
                  {isLoading ? <Loading /> : "Daftar"}
                </button>
              </div>
            </form>
          </FormikProvider>

          <p className="text-center font-semibold">
            Sudah Daftar?{" "}
            <Link className="text-blue-400 text-lg font-bold" to="/login">
              Masuk
            </Link>{" "}
          </p>
        </div>
      </section>
    </Layout>
  );
}
