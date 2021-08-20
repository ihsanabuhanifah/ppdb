import React from "react";
import Layout from "../../layout/auth";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Format email tidak sesuai")
    .required("Email wajib diisi"),

  password: Yup.string()
    .min(8, "Password minimal 8 karakter")
    .required("Password Wajib diisi"),
});
export default function Register() {
  const [focus, setFocus] = React.useState("");
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (values) => {
    setTimeout(() => {
      console.log("ok");
    }, 10000);
  };
  return (
    <Layout page="login">
      <div className="w-full px-3 lg:px-10 grid grid-cols-1 gap-5">
        <div>
          <h3 className="text-2xl font-bold ">Masuk ke Portal PSB</h3>
          <p className="text-xl italic">Silahkan Melakukan pendaftran disini</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
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
             

              <div>
                <button
                  type="submit"
                  className="w-full border text-white bg-green-500 h-16 text-lg font-bold rounded-md hover:bg-green-600"
                >
                  Masuk
                </button>
              </div>
            </form>
          )}
        </Formik>

        <p className="text-center font-semibold">
          Belum Daftar?{" "}
          <Link className="text-green-500 text-lg font-bold" to="/register">
            Mendaftar
          </Link>{" "}
        </p>
        <Link className="text-green-500 text-lg font-bold" to="/ppdb/tes">
            ppdb          </Link>{" "}
      </div>
    </Layout>
  );
}
