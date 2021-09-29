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
  let dispatch = useDispatch();
  let toast = useToast();
  let history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const onSubmit = async (values) => {
    let result = await dispatch(authLogin(values));
    console.log(result);
    if (result.message === "Berhasil Login") {
      toast({
        position: "top-right",
        title: "Berhasil",
        description: "Berhasil login",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      if(result.user.roles[0].name === "admin"){
        return history.push('/admin/pendaftar')
      }

      const identitas = result.identitas;
      if (identitas !== undefined) {
        if (identitas.length === 0) {
          return history.push("/identitas");
        } else if (identitas.length === 1) {
         
          return history.push("/identitas/data-sekolah-asal");
        } else if (identitas.length === 2) {
         
          return history.push("/identitas/data-ayah");
        } else if (identitas.length === 3) {
         
          return history.push("/identitas/data-ibu");
        } else {
          return history.push("/ppdb/salam");
        }
      }
    }
    if (result.response.status === 401) {
      console.log(result.response);

      toast({
        position: "top-right",
        title: "Gagal",
        description: "Email dan Password tidak cocok",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }
  };
  return (
    <Layout page="login">
      <div className="w-full px-3 lg:px-12 grid grid-cols-1 gap-5">
        <div>
        <h3 className="text-xl lg:text-3xl font-bold uppercase "><span className="text-gray-500">Masuk Portal</span> <span className="text-green-500"> PPDB</span></h3>
          <p className="text-lg lg:text-xl italic text-green-500">Silahkan Melakukan Masuk disini</p>
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
                  disabled={isSubmitting}
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
                className="mt-3 flex flex-col border shadow-md px-5 py-3 relative"
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
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
                  type="submit"
                  className="w-full border flex justify-center items-center text-white bg-green-500 h-16 text-lg font-bold rounded-md hover:bg-green-600"
                >
                  {isLoading ? (<Loading/>) : "Masuk"}
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
       
      </div>
    </Layout>
  );
}
