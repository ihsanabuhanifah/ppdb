import React from "react";
import Input from "../../components/Input";
import { Formik } from "formik";
import * as Yup from "yup";
import { postSekolahAsal } from "../../api/santri";
import { useToast } from "@chakra-ui/react";
import { syncToken } from "../../api/axios";
import { useHistory } from "react-router-dom";
import Loading from "../../components/loading";
const RegisterSchema = Yup.object().shape({
  nik_siswa: Yup.number()
    .typeError("NIK wajib dengan angka"),
    nisn: Yup.number()
    .typeError("NSN wajib dengan angka")

    .required("NIK Wajib diisi"),
asal_sekolah: Yup.string().required("Nama Lengkap wajib diisi"),
  npsn: Yup.string().required("NPSN wajib diisi"),


  // golongan_darah: Yup.string().required("Nama Lengkap wajib diisi"),
  alamat_sekolah: Yup.string().required("Alamat siswa wajib diisi"),
//   nomor_telepon_sekolah: Yup.number()
//     .typeError("Nomor Handphone wajib dengan angka")
//     .required("Nomor Handphone wajib diisi"),
  
});

export default function PendidikanTerakhir() {
  const [focus, setFocus] = React.useState("");
  const [errorPost, setErrorPost] = React.useState()
  const [isLoading, setIsLoading] = React.useState(false)
  let history = useHistory()
  const initialValues = {
    nik_siswa: "11111",
    asal_sekolah: "",
    nomor_telepon_sekolah: "",
    nisn: "",
    npsn: "",
    alamat_sekolah: "",
  };
  const onSubmit = async (values) => {
    setIsLoading(true)
    let result = await postSekolahAsal(values);
    setIsLoading(false)
   if (result?.message === "Berhasil Menyimpan Data") {
    toast({
      position: "top-right",
      title: "Success",
      description: "Berhasil Menyimpan Data",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    history.push("/identitas/data-ayah")
    
  }
  if (result.response.status === 401) {
  
    setErrorPost(result.response.data)
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
  let toast = useToast();
  console.log(focus);
  return (
    <React.Fragment>
      <div className="mb-6 pb-5 border-b-2">
        <h1 className="text-xl lg:text-4xl font-bold uppercase text-green-500">
          Lengkapi Data Sekolah Asal
        </h1>
        <p className="text-green-500 text-sm lg:text-xl font-semibold italic mt-1">
          Silahkan lengkapi data Sekolah asal di pada form di bawah
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
        }) => (
          <form
            className="grid grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-5 lg:border p-0 lg:p-10 lg:bg-gray-50"
            onSubmit={handleSubmit}
          >
              <div>
              <Input
                label="NISN SANTRI"
                id="nisn"
                placeholder="NISN SANTRI "
                tabIndex="2"
                type="text"
                error={
                  errors.nisn && touched.nisn
                }
                onFocus={() => {
                  setFocus("nisn");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nisn}
                focus={focus}
                required
              >
                {" "}
                {errors.nisn && touched.nisn && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.nisn}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <Input
                label="Nama Sekolah Asal"
                id="asal_sekolah"
                placeholder="Nama Sekolah Asal"
                tabIndex="1"
                error={errors.asal_sekolah && touched.asal_sekolah}
                onFocus={() => {
                  setFocus("asal_sekolah");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.asal_sekolah}
                focus={focus}
                required
              >
                {errors.asal_sekolah && touched.asal_sekolah && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.asal_sekolah}
                  </p>
                )}
              </Input>
            </div>
           

           
           
            <div>
              <Input
                label="Nomor Telepon Sekolah"
                id="nomor_telepon_sekolah"
                placeholder="Nomor Telepon Sekolah "
                tabIndex="2"
                type="text"
                error={
                  errors.nomor_telepon_sekolah && touched.nomor_telepon_sekolah
                }
                onFocus={() => {
                  setFocus("nomor_telepon_sekolah");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nomor_telepon_sekolah}
                focus={focus}
              >
                {" "}
                {errors.nomor_telepon_sekolah && touched.nomor_telepon_sekolah && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.nomor_telepon_sekolah}
                  </p>
                )}
              </Input>
            </div>
            <div>
              <Input
                label="NPSN sekolah"
                id="npsn"
                placeholder="NPSN "
                tabIndex="2"
                type="text"
                error={
                  errors.npsn && touched.npsn
                }
                onFocus={() => {
                  setFocus("npsn");
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.npsn}
                focus={focus}
              >
                {" "}
                {errors.npsn && touched.npsn && (
                  <p className="text-red-500 italic font-bold  text-sm mt-1">
                    {errors.npsn}
                  </p>
                )}
              </Input>
            </div>
           

            <div className="col-span-1 lg:col-span-3 ">
              <label
                className="font-bold text-green-500 "
                htmlFor="alamat_sekolah"
              >
             <span className="uppercase">Alamat Sekolah</span> <span className="italic text-md text-red-500">(wajib)</span>
              </label>
              <textarea
                className="w-full text-lg mt-5  border py-4 px-5 focus:bg-blue-100 "
                name="alamat_sekolah"
                id="alamat_sekolah"
                name="alamat_sekolah"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.alamat_sekolah}
                error={errors.alamat_sekolah && touched.alamat_sekolah}
                cols="30"
                rows="10"
              ></textarea>
              {errors.alamat_sekolah && touched.alamat_sekolah && (
                <p className="text-red-500 italic font-bold  text-sm mt-1">
                  {errors.alamat_sekolah}
                </p>
              )}
            </div>
           
            <div className="col-start-1 lg:col-start-3">
            <button
                type="submit"
                className="w-full border flex items-center justify-center text-white bg-green-500 h-16 text-lg font-bold rounded-md hover:bg-green-600"
              >
               {isLoading ? (<Loading></Loading>) : " Simpan dan Lanjutkan"}
              </button>
            </div>
            
          </form>
        
        )}
      </Formik>
    </React.Fragment>
  );
}
