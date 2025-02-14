import React from "react";
import Layout from "../../layout/auth";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { authLogin } from "../../redux/action/login";
import { useHistory } from "react-router";
import Loading from "../../components/loading";
import Swal from "sweetalert2";
const LoginSchema = Yup.object().shape({
  email: Yup.string()
   
    .required("Wajib diisi"),

  password: Yup.string()
    .min(8, "Password minimal 8 karakter")
    .required(" Wajib diisi"),
});
export default function Register() {
  const [focus, setFocus] = React.useState("");
  const initialValues = {
    email: "",
    password: "",
  };
  let dispatch = useDispatch();
  let toast = useToast();
  let history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const onSubmit = async (values) => {
    let result = await dispatch(authLogin(values));
    console.log(result);
    if (result.message === "Berhasil Login") {
      Swal.fire({
        title: "Berhasil!",
        text: "Login Berhasil",
        icon: "success"
      });
      

      if (result.user.roles[0].name === "admin") {
        return history.push("/admin/pendaftar");
      }

     
        return history.push("/ppdb/dashboard");
    
    }
    if (result.response.status === 401) {
      console.log(result.response);

    

      Swal.fire({
        title: "Gagal",
        text: "Email dan Password tidak cocok",
        icon: "error"
      });
    }
  };
  return (
    <Layout page="login">
      <section className=" p-5 w-full grid grid-cols-1 3 lg:grid-cols-3    ">
        <div className="w-full  lg:col-start-2 bg-white rounded-2xl py-10 px-5">
          <div>
            <h3 className="text-xl lg:text-3xl font-bold uppercase mb-2 ">
              <span className="text-gray-500">MASUK</span>{" "}
              <span className="text-blue-400">APLIKASI</span>{" "}
              
            </h3>
            <p className="text-xl italic font-normal ">
         
              <span className="text-blue-400 font-bold">
                PPDB Online MAN 1 Kota Sukabumi
              </span>
            </p>
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
                  className="mt-3 flex flex-col border shadow-md px-5 py-3 relative"
                >
                  <label className="font-bold text-blue-400" htmlFor="email">
                    Alamat Email / No WA
                  </label>
                  <input
                    className="inline-flex w-full rounded-lg text-lg focus:outline-none"
                    type="text"
                    placeholder="santri_psb@gmail.com atau 085659552000"
                    id="email"
                    tabIndex="2"
                    error={errors.email && touched.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    disabled={isSubmitting}
                  />
                  {focus === "email" ? (
                    <div className="bg-blue-400 w-2 h-full absolute bottom-0  left-0"></div>
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
                  className="mt-3 flex flex-col border shadow-md px-5 py-3 relative"
                >
                  <label
                    className="font-bold text-blue-400"
                    htmlFor="password"
                  >
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
                    disabled={isSubmitting}
                  />
                  {focus === "password" ? (
                    <div className="bg-blue-400 w-2 h-full absolute bottom-0  left-0"></div>
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
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full border flex justify-center items-center text-white bg-blue-400 h-16 text-lg font-bold rounded-md hover:bg-blue-600"
                  >
                    {isLoading ? <Loading /> : "Masuk"}
                  </button>
                </div>
              </form>
            )}
          </Formik>
          <p className="text-center font-semibold mt-5">
            Anda Belum Mendaftar?{" "}
            <Link className="text-blue-400 text-lg font-bold" to="/register">
             Daftar Sekrang
            </Link>{" "}
          </p>
          <p className="text-center font-semibold">
            {/* <Link
              className="text-blue-400 text-lg font-bold"
              to="/lupa-password"
            >
              Lupa Password ?
            </Link>{" "} */}
          </p>
        </div>
      </section>
    </Layout>
  );
}
