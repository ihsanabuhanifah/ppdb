import React from "react";
import Layout from "../../layout/auth";

import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import Loading from "../../components/loading";
import { resetPassword } from "../../api/login";
const RegisterSchema = Yup.object().shape({
 
  email: Yup.string()
    .email("Format email tidak sesuai")
    .required("Email wajib diisi"),
});
export default function LupaPassword() {
  const [focus, setFocus] = React.useState("");
  const [errorReg, setErrorReg] = React.useState();

  let toast = useToast();

  const isLoading = useSelector((state) => state.auth.isLoading);
  console.log(isLoading);
  const initialValues = {
   
    email: "",
   
  };
  const onSubmit = async (values) => {
    let result = await resetPassword(values.email);
    console.log(result);
   if(result.data.status === 'Success'){
    toast({
      position: "top-right",
      title: "Berhasil",
      description: 'Email reset password berhasil dikirim, silahkan cek email ',
      status: "success",
      duration: 4000,
      isClosable: true,
    });
   }else{
    toast({
      position: "top-right",
      title: "Failed",
      description: 'Email tidak ditemukan',
      status: "error",
      duration: 4000,
      isClosable: true,
    });
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
    <Layout page="login">
      <div className="w-full px-3 lg:px-10 grid grid-cols-1 gap-5">
        <div>
          <h3 className="text-xl lg:text-3xl font-bold uppercase ">
            <span className="text-gray-500">Lupa</span>{" "}
            <span className="text-green-500"> Password</span>
          </h3>
          <p className="text-md lg:text-xl italic text-green-500">
            Input email yang sudah terdaftar
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
            setFieldValue,
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
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
                    return setErrorReg();
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
                  {isSubmitting ? <Loading /> : "Kirim Email"}
                </button>
              </div>
            </form>
          )}
        </Formik>

        <p className="text-center font-semibold">
          <Link className="text-green-500 text-lg font-bold" to="/login">
            Kembali ke Login
          </Link>{" "}
        </p>
      </div>
    </Layout>
  );
}
