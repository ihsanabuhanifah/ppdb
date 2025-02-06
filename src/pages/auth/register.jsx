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
  jenis_kelamin: Yup.string().required("Wajib diisi"),
  nisn: Yup.string()
    .matches(/^\d{10}$/, "NISN harus 10 digit angka")
    .required("Wajib diisi"),
  nik: Yup.string()
    .matches(/^\d{16}$/, "NIK harus 16 digit angka")
    .required("Wajib diisi"),
  tempat_lahir: Yup.string().required("Wajib diisi"),
  tanggal_lahir: Yup.string().required("Wajib diisi"),
  agama: Yup.string().required("Wajib diisi"),
  anak_ke: Yup.string().required("Wajib diisi"),
  jumlah_saudara_kandung: Yup.string().required("Wajib diisi"),
  asal_sekolah: Yup.string().required("Wajib diisi"),

  alamat: Yup.string().required("Wajib diisi"),
  desa: Yup.string().required("Wajib diisi"),
  kecamatan: Yup.string().required("Wajib diisi"),
  kodepos: Yup.string().required("Wajib diisi"),
  tempat_tinggal: Yup.string().required("Wajib diisi"),
  transportasi: Yup.string().required("Wajib diisi"),

  nama_ayah: Yup.string().required("Wajib diisi"),
  nik_ayah: Yup.string()
    .matches(/^\d{16}$/, "NIK Ayah harus 16 digit angka")
    .required("Wajib diisi"),
  pendidikan_ayah: Yup.string().required("Wajib diisi"),
  pekerjaan_ayah: Yup.string().required("Wajib diisi"),
  penghasilan_ayah: Yup.string().required("Wajib diisi"),
  nomor_ayah: Yup.string().matches(
    /^08\d{7,12}$/,
    "Nomor Ayah harus dimulai dengan 08 dan minimal 9 digit"
  ),

  nama_ibu: Yup.string().required("Wajib diisi"),
  nik_ibu: Yup.string()
    .matches(/^\d{16}$/, "NIK Ibu harus 16 digit angka")
    .required("Wajib diisi"),
  pendidikan_ibu: Yup.string().required("Wajib diisi"),
  pekerjaan_ibu: Yup.string().required("Wajib diisi"),
  penghasilan_ibu: Yup.string().required("Wajib diisi"),
  nomor_ibu: Yup.string().matches(
    /^08\d{7,12}$/,
    "Nomor Ibu harus dimulai dengan 08 dan minimal 9 digit"
  ),

  nama_wali: Yup.string(),
  nik_wali: Yup.string().matches(/^\d{16}$/, "NIK Wali harus 16 digit angka"),
  pendidikan_wali: Yup.string(),
  pekerjaan_wali: Yup.string(),
  nomor_wali: Yup.string().matches(
    /^08\d{7,12}$/,
    "Nomor Wali harus dimulai dengan 08 dan minimal 9 digit"
  ),
  penghasilan_wali: Yup.string(),

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
    jenis_kelamin: "",
    password: "",
    password_confirmation: "",
    nisn: "",
    nik: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    agama: "",
    anak_ke: "",
    jumlah_saudara_kandung: "",
    asal_sekolah: "",
    alamat: "",
    desa: "",
    kecamatan: "",
    kodepos: "",
    tempat_tinggal: "",
    transportasi: "",
    nama_ayah: "",
    nik_ayah: "",
    pendidikan_ayah: "",
    pekerjaan_ayah: "",
    nomor_ayah: "",
    nama_ibu: "",
    nik_ibu: "",
    pendidikan_ibu: "",
    pekerjaan_ibu: "",
    nomor_ibu: "",
    nama_wali: "",
    nik_wali: "",
    pendidikan_wali: "",
    pekerjaan_wali: "",
    nomor_wali: "",
    role: 2,
    is_batal: 0,
  };
  const onSubmit = async (values) => {
    let result = await dispatch(authRegister(values));
    console.log(result);
    if (result.message === "Berhasil Membuat Akun") {
      localStorage.removeItem("register")
      toast({
        position: "top-right",
        title: "Berhasil",
        description: "Selamat Anda telah berhasil Registrasi",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      history.push("dashboard");
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

 const regis =  localStorage.getItem("register")

  const formik = useFormik({
    initialValues:  regis ? JSON.parse(regis) : initialValues,
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

  useEffect(()=> {
localStorage.setItem("register", JSON.stringify(values))
  },[values])
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
                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.jenis_kelamin}
                  title={"Jenis Kelamin"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.jenis_kelamin}
                  id="jenis_kelamin"
                  touched={touched.jenis_kelamin}
                >
                  <option>Pilih</option>
                  <option value={"laki-laki"}> Laki-laki</option>
                  <option value={"perempuan"}> Perempuan</option>
                </SelectReg>
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
                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.nik}
                  title={"NIK"}
                  placeholder={"XXXXXXXXXXXXXXXXXXX"}
                  errors={errors.nik}
                  id="nik"
                  touched={touched.nik}
                />
                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.tempat_lahir}
                  title={"Tempat Lahir"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.tempat_lahir}
                  id="tempat_lahir"
                  touched={touched.tempat_lahir}
                />

                <InputReg
                  isRequired
                  type={"date"}
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.tanggal_lahir}
                  title={"Tanggal Lahir"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.tanggal_lahir}
                  id="tanggal_lahir"
                  touched={touched.tanggal_lahir}
                />
                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.agama}
                  title={"Agama"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.agama}
                  id="agama"
                  touched={touched.agama}
                >
                  <option>Pilih</option>
                  <option value={"islam"}> Islam</option>
                  <option value={"kristen"}> Kristen</option>
                </SelectReg>

                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.anak_ke}
                  title={"Anak ke"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.anak_ke}
                  id="anak_ke"
                  touched={touched.anak_ke}
                >
                  <option>Pilih</option>
                  <option value={"1"}> 1</option>
                  <option value={"2"}> 2</option>
                  <option value={"3"}> 3</option>
                  <option value={"4"}> 4</option>
                  <option value={"5"}> 5</option>
                  <option value={"6"}> 6</option>
                  <option value={"7"}> 7</option>
                  <option value={"8"}> 8</option>
                  <option value={"9"}> 9</option>
                  <option value={"10"}> 10</option>
                  <option value={"11"}>11</option>
                  <option value={"12"}> 12</option>
                </SelectReg>
                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.jumlah_saudara_kandung}
                  title={"Jumlah Saudara Kandung"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.jumlah_saudara_kandung}
                  id="jumlah_saudara_kandung"
                  touched={touched.jumlah_saudara_kandung}
                >
                  <option>Pilih</option>
                  <option value={"1"}> 1</option>
                  <option value={"2"}> 2</option>
                  <option value={"3"}> 3</option>
                  <option value={"4"}> 4</option>
                  <option value={"5"}> 5</option>
                  <option value={"6"}> 6</option>
                  <option value={"7"}> 7</option>
                  <option value={"8"}> 8</option>
                  <option value={"9"}> 9</option>
                  <option value={"10"}> 10</option>
                  <option value={"11"}>11</option>
                  <option value={"12"}> 12</option>
                </SelectReg>
                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.asal_sekolah}
                  title={"Nama Sekolah Tingkat MTS/SMP"}
                  placeholder={"cth. MTSN 1 Sukabumi"}
                  errors={errors.asal_sekolah}
                  id="asal_sekolah"
                  touched={touched.asal_sekolah}
                />
                <TextAreaReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.alamat}
                  title={"Alamat"}
                  placeholder={"cth. Kp. XXXXXX XXXXX "}
                  errors={errors.alamat}
                  id="alamat"
                  touched={touched.alamat}
                />
                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.desa}
                  title={"Desa/Kelurahan"}
                  placeholder={"cth. XXXXX"}
                  errors={errors.desa}
                  id="desa"
                  touched={touched.desa}
                />
                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.kecamatan}
                  title={"Kecamatan"}
                  placeholder={"cth. XXXXX"}
                  errors={errors.kecamatan}
                  id="kecamatan"
                  touched={touched.kecamatan}
                />
                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.kodepos}
                  title={"Kodepos"}
                  placeholder={"cth. 43217"}
                  errors={errors.kodepos}
                  id="kodepos"
                  touched={touched.kodepos}
                />

                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.tempat_tinggal}
                  title={"Tempat Tinggal"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.tempat_tinggal}
                  id="tempat_tinggal"
                  touched={touched.tempat_tinggal}
                >
                  <option>Pilih</option>
                  <option value={"Bersama Orangtua"}> Bersama Orangtua</option>
                  <option value={"Wali"}> Wali</option>
                  <option value={"Mondok"}> Mondok</option>
                  <option value={"lainnya"}> Lainnya</option>
                </SelectReg>
                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.transportasi}
                  title={"Transportasi"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.transportasi}
                  id="transportasi"
                  touched={touched.transportasi}
                >
                  <option>Pilih</option>

                  <option value={"Jalan Kaki"}> Jalan Kaki</option>
                  <option value={"Kendaraan Umum"}> Kendaraan Umum</option>
                  <option value={"Grab/Gojek"}> Grab/Gojek</option>
                  <option value={"Motor"}> Motor</option>
                  <option value={"Mobil"}> Mobil</option>
                </SelectReg>
              </Batas>

              <Batas title={"Data Ayah"}>
                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.nama_ayah}
                  title={"Nama Ayah"}
                  placeholder={"cth. XXXXX"}
                  errors={errors.nama_ayah}
                  id="nama_ayah"
                  touched={touched.nama_ayah}
                />
                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.nik_ayah}
                  title={"NIK Ayah"}
                  placeholder={"cth. XXXXX"}
                  errors={errors.nik_ayah}
                  id="nik_ayah"
                  touched={touched.nik_ayah}
                />
                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.pendidikan_ayah}
                  title={"Pendidikan Ayah"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.pendidikan_ayah}
                  id="pendidikan_ayah"
                  touched={touched.pendidikan_ayah}
                >
                  <option>Pilih</option>

                  <option value={"SD"}> SD</option>
                  <option value={"SMP/MTS"}> SMP/MTS</option>
                  <option value={"SMA/SMK/MA"}> SMA/SMK/MA</option>
                  <option value={"DI"}> DI</option>
                  <option value={"DII"}> DII</option>
                  <option value={"DIII"}> DIII</option>

                  <option value={"S1/DIV"}> S1/DIV</option>
                  <option value={"S2"}> S2</option>
                  <option value={"S3"}> S3</option>
                </SelectReg>
                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.pekerjaan_ayah}
                  title={"Pekerjaan Ayah"}
                  placeholder={"Pilih Pekerjaan"}
                  errors={errors.pekerjaan_ayah}
                  id="pekerjaan_ayah"
                  touched={touched.pekerjaan_ayah}
                >
                  <option value="">Pilih</option>
                  <option value="tidak bekerja">Tidak Bekerja</option>
                  <option value="petani">Petani</option>
                  <option value="nelayan">Nelayan</option>
                  <option value="buruh">Buruh</option>
                  <option value="pedagang">Pedagang</option>
                  <option value="pegawai negeri sipil">
                    Pegawai Negeri Sipil (PNS)
                  </option>
                  <option value="tentara">Tentara (TNI)</option>
                  <option value="polisi">Polisi</option>
                  <option value="guru">Guru</option>
                  <option value="dosen">Dosen</option>
                  <option value="dokter">Dokter</option>
                  <option value="perawat">Perawat</option>
                  <option value="pengusaha">Pengusaha</option>
                  <option value="teknisi">Teknisi</option>
                  <option value="supir">Supir</option>
                  <option value="ojek online">Ojek Online</option>
                  <option value="karyawan swasta">Karyawan Swasta</option>
                  <option value="wirausaha">Wirausaha</option>
                  <option value="pensiunan">Pensiunan</option>
                </SelectReg>

                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.penghasilan_ayah}
                  title={"Penghasilan Ayah"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.penghasilan_ayah}
                  id="penghasilan_ayah"
                  touched={touched.penghasilan_ayah}
                >
                  <option>Pilih</option>
                  <option value={"Tidak Berpenghasilan"}>
                    {" "}
                    {"Tidak Berpenghasilan"}
                  </option>
                  <option value={"kurang dari 5000000"}>
                    {" "}
                    {" Kurang dari Rp. 5.000.000"}
                  </option>
                  <option value={"lebih dari 5000000 dan kurang dari 10000000"}>
                    {" "}
                    {" Lebih dari Rp. 5.000.000 dan Kurang dari Rp. 10.000.000"}
                  </option>
                  <option
                    value={"lebih dari 10000000 dan kurang dari 20000000"}
                  >
                    {" "}
                    {
                      " Lebih dari Rp. 10.000.000 dan Kurang dari Rp. 20.000.000"
                    }
                  </option>
                  <option value={"lebih dari 20000000"}>
                    {" "}
                    {" Lebih dari Rp. 20.000.000"}
                  </option>
                  <option value={"lebih dari 30000000"}>
                    {" "}
                    {" Lebih dari Rp. 30.000.000"}
                  </option>
                  <option value={"lebih dari 40000000"}>
                    {" "}
                    {" Lebih dari Rp. 40.000.000"}
                  </option>
                </SelectReg>
                {/* <InputReg
                  
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.nomor_ayah}
                  title={"Nomor Handphnone Ayah"}
                  placeholder={"cth. 0895320050344"}
                  errors={errors.nomor_ayah}
                  id="nomor_ayah"
                  touched={touched.nomor_ayah}
                /> */}
              </Batas>

              <Batas title={"Data Ibu"}>
                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.nama_ibu}
                  title={"Nama Ibu"}
                  placeholder={"cth. XXXXX"}
                  errors={errors.nama_ibu}
                  id="nama_ibu"
                  touched={touched.nama_ibu}
                />
                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.nik_ibu}
                  title={"NIK Ibu"}
                  placeholder={"cth. XXXXX"}
                  errors={errors.nik_ibu}
                  id="nik_ibu"
                  touched={touched.nik_ibu}
                />
                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.pendidikan_ibu}
                  title={"Pendidikan Ibu"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.pendidikan_ibu}
                  id="pendidikan_ibu"
                  touched={touched.pendidikan_ibu}
                >
                  <option>Pilih</option>

                  <option value={"SD"}> SD</option>
                  <option value={"SMP/MTS"}> SMP/MTS</option>
                  <option value={"SMA/SMK/MA"}> SMA/SMK/MA</option>
                  <option value={"DI"}> DI</option>
                  <option value={"DII"}> DII</option>
                  <option value={"DIII"}> DIII</option>

                  <option value={"S1/DIV"}> S1/DIV</option>
                  <option value={"S2"}> S2</option>
                  <option value={"S3"}> S3</option>
                </SelectReg>
                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.pekerjaan_ibu}
                  title={"Pekerjaan Ibu"}
                  placeholder={"Pilih Pekerjaan"}
                  errors={errors.pekerjaan_ibu}
                  id="pekerjaan_ibu"
                  touched={touched.pekerjaan_ibu}
                >
                  <option value="">Pilih</option>
                  <option value="tidak bekerja">Tidak Bekerja</option>
                  <option value="petani">Petani</option>
                  <option value="nelayan">Nelayan</option>
                  <option value="buruh">Buruh</option>
                  <option value="pedagang">Pedagang</option>
                  <option value="pegawai negeri sipil">
                    Pegawai Negeri Sipil (PNS)
                  </option>
                  <option value="tentara">Tentara (TNI)</option>
                  <option value="polisi">Polisi</option>
                  <option value="guru">Guru</option>
                  <option value="dosen">Dosen</option>
                  <option value="dokter">Dokter</option>
                  <option value="perawat">Perawat</option>
                  <option value="pengusaha">Pengusaha</option>
                  <option value="teknisi">Teknisi</option>
                  <option value="supir">Supir</option>
                  <option value="ojek online">Ojek Online</option>
                  <option value="karyawan swasta">Karyawan Swasta</option>
                  <option value="wirausaha">Wirausaha</option>
                  <option value="pensiunan">Pensiunan</option>
                </SelectReg>
                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.penghasilan_ibu}
                  title={"Penghasilan Ibu"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.penghasilan_ibu}
                  id="penghasilan_ibu"
                  touched={touched.penghasilan_ibu}
                >
                  <option>Pilih</option>
                  <option value={"Tidak Berpenghasilan"}>
                    {" "}
                    {"Tidak Berpenghasilan"}
                  </option>
                  <option value={"kurang dari 5000000"}>
                    {" "}
                    {" Kurang dari Rp. 5.000.000"}
                  </option>
                  <option value={"lebih dari 5000000 dan kurang dari 10000000"}>
                    {" "}
                    {" Lebih dari Rp. 5.000.000 dan Kurang dari Rp. 10.000.000"}
                  </option>
                  <option
                    value={"lebih dari 10000000 dan kurang dari 20000000"}
                  >
                    {" "}
                    {
                      " Lebih dari Rp. 10.000.000 dan Kurang dari Rp. 20.000.000"
                    }
                  </option>
                  <option value={"lebih dari 20000000"}>
                    {" "}
                    {" Lebih dari Rp. 20.000.000"}
                  </option>
                  <option value={"lebih dari 30000000"}>
                    {" "}
                    {" Lebih dari Rp. 30.000.000"}
                  </option>
                  <option value={"lebih dari 40000000"}>
                    {" "}
                    {" Lebih dari Rp. 40.000.000"}
                  </option>
                </SelectReg>

                {/* <InputReg
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.nomor_ibu}
                    title={"Nomor Handphnone Ibu"}
                    placeholder={"cth. 0895320050344"}
                    errors={errors.nomor_ibu}
                    id="nomor_ibu"
                    touched={touched.nomor_ibu}
                  /> */}
              </Batas>

              <Batas title={"Data Wali"}>
                <InputReg
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.nama_wali}
                  title={"Nama Wali (Jika Ada)"}
                  placeholder={"cth. XXXXX"}
                  errors={errors.nama_wali}
                  id="nama_wali"
                  touched={touched.nama_wali}
                />
                <InputReg
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.nik_wali}
                  title={"NIK Wali (Jika Ada)"}
                  placeholder={"cth. XXXXX"}
                  errors={errors.nik_wali}
                  id="nik_wali"
                  touched={touched.nik_wali}
                />
                <SelectReg
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.pendidikan_wali}
                  title={"Pendidikan Wali (Jika Ada)"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.pendidikan_wali}
                  id="pendidikan_wali"
                  touched={touched.pendidikan_wali}
                >
                  <option>Pilih</option>

                  <option value={"SD"}> SD</option>
                  <option value={"SMP/MTS"}> SMP/MTS</option>
                  <option value={"SMA/SMK/MA"}> SMA/SMK/MA</option>
                  <option value={"DI"}> DI</option>
                  <option value={"DII"}> DII</option>
                  <option value={"DIII"}> DIII</option>

                  <option value={"S1/DIV"}> S1/DIV</option>
                  <option value={"S2"}> S2</option>
                  <option value={"S3"}> S3</option>
                </SelectReg>
                <SelectReg
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.pekerjaan_wali}
                  title={"Pekerjaan Wali (Jika Ada)"}
                  placeholder={"Pilih Pekerjaan"}
                  errors={errors.pekerjaan_wali}
                  id="pekerjaan_wali"
                  touched={touched.pekerjaan_wali}
                >
                  <option value="">Pilih</option>
                  <option value="tidak bekerja">Tidak Bekerja</option>
                  <option value="petani">Petani</option>
                  <option value="nelayan">Nelayan</option>
                  <option value="buruh">Buruh</option>
                  <option value="pedagang">Pedagang</option>
                  <option value="pegawai negeri sipil">
                    Pegawai Negeri Sipil (PNS)
                  </option>
                  <option value="tentara">Tentara (TNI)</option>
                  <option value="polisi">Polisi</option>
                  <option value="guru">Guru</option>
                  <option value="dosen">Dosen</option>
                  <option value="dokter">Dokter</option>
                  <option value="perawat">Perawat</option>
                  <option value="pengusaha">Pengusaha</option>
                  <option value="teknisi">Teknisi</option>
                  <option value="supir">Supir</option>
                  <option value="ojek online">Ojek Online</option>
                  <option value="karyawan swasta">Karyawan Swasta</option>
                  <option value="wirausaha">Wirausaha</option>
                  <option value="pensiunan">Pensiunan</option>
                </SelectReg>
                <SelectReg
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.penghasilan_wali}
                  title={"Penghasilan Wali (Jika Ada)"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.penghasilan_wali}
                  id="penghasilan_wali"
                  touched={touched.penghasilan_wali}
                >
                  <option>Pilih</option>
                  <option value={"Tidak Berpenghasilan"}>
                    {" "}
                    {"Tidak Berpenghasilan"}
                  </option>
                  <option value={"kurang dari 5000000"}>
                    {" "}
                    {" Kurang dari Rp. 5.000.000"}
                  </option>
                  <option value={"lebih dari 5000000 dan kurang dari 10000000"}>
                    {" "}
                    {" Lebih dari Rp. 5.000.000 dan Kurang dari Rp. 10.000.000"}
                  </option>
                  <option
                    value={"lebih dari 10000000 dan kurang dari 20000000"}
                  >
                    {" "}
                    {
                      " Lebih dari Rp. 10.000.000 dan Kurang dari Rp. 20.000.000"
                    }
                  </option>
                  <option value={"lebih dari 20000000"}>
                    {" "}
                    {" Lebih dari Rp. 20.000.000"}
                  </option>
                  <option value={"lebih dari 30000000"}>
                    {" "}
                    {" Lebih dari Rp. 30.000.000"}
                  </option>
                  <option value={"lebih dari 40000000"}>
                    {" "}
                    {" Lebih dari Rp. 40.000.000"}
                  </option>
                </SelectReg>
                {/* <InputReg
                    
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.nomor_wali}
                    title={"Nomor Handphnone Wali (Jika Ada)"}
                    placeholder={"cth. 0895320050344"}
                    errors={errors.nomor_wali}
                    id="nomor_wali"
                    touched={touched.nomor_wali}
                  /> */}
              </Batas>

              {/* //login */}
              <Batas title={"Data Login"}>
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

              <Batas title={"Nomor Kontak"}>
                <InputReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.phone}
                  title={"Nomor Kontak Utama"}
                  placeholder={"cth. 0895320050344"}
                  errors={errors.phone}
                  id="phone"
                  touched={touched.phone}
                />
                <InputReg
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.nomor_ayah}
                  title={"Nomor Kontak Darurat"}
                  placeholder={"cth. 0895320050344"}
                  errors={errors.nomor_ayah}
                  id="nomor_ayah"
                  touched={touched.nomor_ayah}
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
