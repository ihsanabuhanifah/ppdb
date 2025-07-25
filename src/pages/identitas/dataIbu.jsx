import React from "react";
import Input from "../../components/Input";
import { Formik } from "formik";
import * as Yup from "yup";
import { postDataIbu } from "../../api/santri";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Loading from "../../components/loading";
import Identitas from "../../layout/identitas"
const RegisterSchema = Yup.object().shape({
  nik_ibu: Yup.string()
    .length(16, "NIK Wajib 16 digit")
    .typeError("NIK wajib dengan angka"),
  name_ibu: Yup.string().required("Nama Lengkap wajib diisi"),

  // tempat_lahir_ibu: Yup.string().required("Tempat Lahir wajib diisi"),
  // tanggal_lahir_ibu: Yup.string().required("Tanggal Lahir wajib diisi"),

  nomor_telepon_ibu: Yup.number()
    .typeError("Nomor Handphone wajib dengan angka")
    .required("Nomor Handphone wajib diisi"),
  // pekerjaan: Yup.string().required("Pekerjaan siswa wajin diisi"),
  // penghasilan_ibu: Yup.string().required("Penghasilan ibu wajib diisi"),
});

export default function DataSiswa() {
  const [focus, setFocus] = React.useState("");
  const [errorPost, setErrorPost] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  let history = useHistory();
  const initialValues = {
    nik_siswa: "",
    nik_ibu: "",
    name_ibu: "",

    tempat_lahir_ibu: "",
    tanggal_lahir_ibu: "",
    penghasilan_ibu: "",
    nomor_telepon_ibu: "",
    pekerjaan_ibu: "",
  };
  let toast = useToast();
  const onSubmit = async (values) => {
    setIsLoading(true);
    let result = await postDataIbu(values);
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
      history.push("/identitas/data-wali");
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
          Lengkapi Data ibu Santri
        </h1>
        <p className="text-[#1E046C] text-sm lg:text-xl font-semibold italic mt-1">
          Silahkan lengkapi data ibu santri di pada form di bawah
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
                label="Nama Lengkap ibu"
                id="name_ibu"
                placeholder="Nama Lengkap ibu"
                tabIndex="1"
                error={errors.name_ibu && touched.name_ibu}
                onFocus={() => {
                  setFocus("name_ibu");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name_Ibu}
                focus={focus}
                required
              >
                {errors.name_ibu && touched.name_ibu && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.name_ibu}
                  </p>
                )}
              </Input>
            </div>
           
           
           
            <div>
              <Input
                label="Nomor Handphone ibu"
                id="nomor_telepon_ibu"
                placeholder="Nomor Handphone ibu"
                tabIndex="2"
                type="text"
                error={errors.nomor_telepon_ibu && touched.nomor_telepon_ibu}
                onFocus={() => {
                  setFocus("nomor_telepon_ibu");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nomor_telepon_ibu}
                focus={focus}
                required
              >
                {" "}
                {errors.nomor_telepon_ibu && touched.nomor_telepon_ibu && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.nomor_telepon_ibu}
                  </p>
                )}
              </Input>
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
