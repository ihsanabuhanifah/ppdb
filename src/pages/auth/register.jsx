import React from "react";
import Layout from "../../layout/auth";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
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
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    role: 2,
  };
  const onSubmit = async (values) => {
    setTimeout(() => {
      console.log("ok");
    }, 10000);
  };
  return (
    <Layout page="register">
      <div className="w-full px-3 lg:px-10 grid grid-cols-1 gap-5">
        <div>
          <h3 className="text-2xl font-bold ">Daftar PSB</h3>
          <p className="text-xl italic">Silahkan Melakukan pendaftran disini</p>
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
          }) => (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
              <div
                onFocus={() => {
                  setFocus("name");
                }}
                className="mt-3 flex flex-col border shadow-md px-5 py-3 border relative"
              >
                <label className="font-bold text-green-500" htmlFor="name">
                  Nama Lengkap
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
                className="mt-3 flex flex-col border shadow-md px-5 py-3 border relative"
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
                  onChange={handleChange}
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
              <div
                onFocus={() => {
                  setFocus("phone");
                }}
                className="mt-3 flex flex-col border shadow-md px-5 py-3 border relative"
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
                  error={errors.phone && touched.phone}
                  onChange={handleChange}
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
                className="mt-3 flex flex-col border shadow-md px-5 py-3 border relative"
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
                className="mt-3 flex flex-col border shadow-md px-5 py-3 border relative"
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
                <button
                  type="submit"
                  className="w-full border text-white bg-green-500 h-16 text-lg font-bold rounded-md hover:bg-green-600"
                >
                  Daftar
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
