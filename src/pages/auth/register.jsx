import React from "react";
import Layout from "../../layout/auth";

import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { authRegister } from "../../redux/action/register";
import { useHistory } from "react-router";
import Loading from "../../components/loading";
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Nama Lengkap wajib diisi"),
  email: Yup.string()
    .email("Format email tidak sesuai")
    .required("Email wajib diisi"),
  phone: Yup.number()
    .typeError("Nomor Handphone wajib dengan angka")
    .required("Nomor Handphone wajib diisi"),
  password: Yup.string()
    .min(8, "Password minimal 8 karakter")
    .required("Password Wajib diisi"),
  password_confirmation: Yup.string()
    .min(8, "Konfirmasi Password minimal 8 karakter")
    .oneOf([Yup.ref("password")], "Password dan Password Konfirmasi tidak sama")
    .required("Password Wajib diisi"),
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
    role: 2,
  };
  const onSubmit = async (values) => {
    let result = await dispatch(authRegister(values));
    console.log(result);
    if (result.message === "Berhasil Membuat Akun") {
      toast({
        position: "top-right",
        title: "Berhasil",
        description: "Selamat Anda telah berhasil Registrasi",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      history.push("/identitas/santri");
    }
    if (result.response.status === 401) {
      console.log(result.response);
      setErrorReg(result.response.data);
      toast({
        position: "top-right",
        title: "Gagal",
        description: result.response?.data?.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  return (
    <Layout page="register">
    
      <div className="w-full px-3 lg:px-10 grid grid-cols-1 gap-5">
    
        <div>
          <h3 className="text-xl lg:text-3xl font-bold uppercase "><span className="text-gray-500">Daftar</span> <span className="text-green-500"> PPDB</span></h3>
          <p className="text-md lg:text-xl italic text-green-500">Silahkan Melakukan pendaftran disini</p>
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
            setFieldValue,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
              <div
                onFocus={() => {
                  setFocus("name");
                }}
                className="mt-3 flex flex-col border shadow-md px-5 py-3 relative"
              >
                <label className="font-bold text-green-500" htmlFor="name">
                  Nama Lengkap Siswa
                </label>
                <input
                  id="name"
                  className="inline-flex w-full rounded-lg text-lg focus:outline-none"
                  type="text"
                  placeholder="Muhammad "
                  tabIndex="1"
                  error={errors.name && touched.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  disabled={isSubmitting}
                />
                {focus === "name" ? (
                  <div className="bg-green-500 w-2 h-full absolute bottom-0  left-0"></div>
                ) : (
                  ""
                )}
              </div>
              {errors.name && touched.name && (
                <p className="text-red-500 italic font-bold  text-sm mt-1">
                  {errors.name}
                </p>
              )}
              <div
                onFocus={() => {
                  setFocus("email");
                }}
                className="mt-3 flex flex-col border shadow-md px-5 py-3 relative"
              >
                <label className="font-bold text-green-500" htmlFor="email">
                  Alamat Email
                </label>
                <input
                  className="inline-flex w-full rounded-lg text-lg focus:outline-none"
                  type="text"
                  placeholder="santri_psb@gmail.com"
                  id="email"
                  tabIndex="2"
                  error={errors.email && touched.email}
                  disabled={isSubmitting}
                  onChange={(e) => {
            
                    setFieldValue("email",e.target.value)
                    return setErrorReg()
                  }}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {focus === "email" ? (
                  <div className="bg-green-500 w-2 h-full absolute bottom-0  left-0"></div>
                ) : (
                  ""
                )}
              </div>
              {errors.email && touched.email && (
                <p className="text-red-500 italic font-bold  text-sm mt-1">
                  {errors.email}
                </p>
              )}

              {}
              <div
                onFocus={() => {
                  setFocus("phone");
                }}
                className="mt-3 flex flex-col border shadow-md px-5 py-3  relative"
              >
                <label className="font-bold text-green-500" htmlFor="phone">
                  Nomor Handphone
                </label>
                <input
                  className="inline-flex w-full rounded-lg text-lg focus:outline-none"
                  type="phone"
                  placeholder="Nomor Handphone"
                  id="phone"
                  tabIndex="3"
                  disabled={isSubmitting}
                  error={errors.phone && touched.phone}
                  onChange={(e) => {
                    setFieldValue("phone", e.target.value)
                    return setErrorReg()
                  }}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                {focus === "phone" ? (
                  <div className="bg-green-500 w-2 h-full absolute bottom-0  left-0"></div>
                ) : (
                  ""
                )}
              </div>
              {errors.phone && touched.phone && (
                <p className="text-red-500 italic font-bold  text-sm mt-1">
                  {errors.phone}
                </p>
              )}

              <div
                onFocus={() => {
                  setFocus("password");
                }}
                className="mt-3 flex flex-col border shadow-md px-5 py-3  relative"
              >
                <label className="font-bold text-green-500" htmlFor="password">
                  Password
                </label>
                <input
                  className="inline-flex w-full rounded-lg text-lg focus:outline-none"
                  type="password"
                  placeholder="*********"
                  id="password"
                  tabIndex="4"
                  disabled={isSubmitting}
                  error={errors.password && touched.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {focus === "password" ? (
                  <div className="bg-green-500 w-2 h-full absolute bottom-0  left-0"></div>
                ) : (
                  ""
                )}
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 italic font-bold  text-sm mt-1">
                  {errors.password}
                </p>
              )}
              <div
                onFocus={() => {
                  setFocus("password_confirmation");
                }}
                className="mt-3 flex flex-col border shadow-md px-5 py-3  relative"
              >
                <label
                  className="font-bold text-green-500"
                  htmlFor="password_confirmation"
                >
                  Konfirmasi Password
                </label>
                <input
                  className="inline-flex w-full rounded-lg text-lg focus:outline-none"
                  type="password"
                  placeholder="*********"
                  id="password_confirmation"
                  tabIndex="5"
                  disabled={isSubmitting}
                  error={
                    errors.password_confirmation &&
                    touched.password_confirmation
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password_confirmation}
                />
                {focus === "password_confirmation" ? (
                  <div className="bg-green-500 w-2 h-full absolute bottom-0  left-0"></div>
                ) : (
                  ""
                )}
              </div>
              {errors.password_confirmation &&
                touched.password_confirmation && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.password_confirmation}
                  </p>
                )}

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
                  className="w-full border flex justify-center items-center text-white bg-green-500 h-16 text-lg font-bold rounded-md hover:bg-green-600"
                >
                  {isLoading ? (<Loading/>) : "Daftar"}
                </button>
              </div>
            </form>
          )}
        </Formik>

        <p className="text-center font-semibold">
          Sudah Daftar?{" "}
          <Link className="text-green-500 text-lg font-bold" to="/login">
            Masuk
          </Link>{" "}
        </p>
      </div>
    </Layout>
  );
}
