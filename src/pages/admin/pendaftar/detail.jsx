import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Formik, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Spinner, useDisclosure, useToast, Text, Flex, Center, VStack,  } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router";
import Loading from "../../../components/loading";
import clsx from "clsx";
import Batas from "../../auth/Batas";
import InputReg from "../../auth/Input";
import SelectReg from "../../auth/Select";
import TextAreaReg from "../../auth/TextArea";
import {
  fetchImageAsBase64,
  getDetail,
  getDetailByAdmin,
  updateProfile,
  useNilaiBerkas,
} from "../../../api/santri";
import { useQuery, useQueryClient } from "react-query";
import { pdf } from "@react-pdf/renderer";
import { Resume } from "../../ppdb/pdf/resume.pdf";
import { Button } from "semantic-ui-react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ArrowBigLeft, ArrowLeft, Eye } from "lucide-react";
import Modal from "./Modal";
import { formatDateInd } from ".";
import Swal from "sweetalert2";
import {
  DocumentAddIcon,
  DocumentIcon,
  DocumentReportIcon,
} from "@heroicons/react/outline";
import Nilai from "./Nilai";
const RegisterSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email("Format email tidak sesuai"),
  phone: Yup.string().matches(
    /^08\d{7,12}$/,
    "Nomor telepon harus dimulai dengan 08 dan minimal 9 digit"
  ),
  jenis_kelamin: Yup.string(),
  nisn: Yup.string().matches(/^\d{10}$/, "NISN harus 10 digit angka"),
  nik: Yup.string().matches(/^\d{16}$/, "NIK harus 16 digit angka"),
  nomor_kk: Yup.string()
    .nullable()
    .matches(/^\d{16}$/, "Nomor KK harus 16 digit angka"),
  tempat_lahir: Yup.string(),
  tanggal_lahir: Yup.string(),
  agama: Yup.string(),
  anak_ke: Yup.string(),
  jumlah_saudara_kandung: Yup.string(),
  asal_sekolah: Yup.string(),
  jenis_sekolah: Yup.string(),
  alamat: Yup.string(),
  desa: Yup.string(),
  kecamatan: Yup.string(),
  kodepos: Yup.string(),
  tempat_tinggal: Yup.string(),
  transportasi: Yup.string(),

  nama_ayah: Yup.string(),
  nik_ayah: Yup.string().matches(/^\d{16}$/, "NIK Ayah harus 16 digit angka"),
  pendidikan_ayah: Yup.string(),
  pekerjaan_ayah: Yup.string(),
  penghasilan_ayah: Yup.string(),
  nomor_ayah: Yup.string().matches(
    /^08\d{7,12}$/,
    "Nomor Ayah harus dimulai dengan 08 dan minimal 9 digit"
  ),

  nama_ibu: Yup.string(),
  nik_ibu: Yup.string().matches(/^\d{16}$/, "NIK Ibu harus 16 digit angka"),
  pendidikan_ibu: Yup.string(),
  pekerjaan_ibu: Yup.string(),
  penghasilan_ibu: Yup.string(),
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

  password: Yup.string().min(8, "Password minimal 8 karakter"),
  password_confirmation: Yup.string()
    .min(8, "Konfirmasi Password minimal 8 karakter")
    .oneOf(
      [Yup.ref("password")],
      "Password dan Password Konfirmasi tidak sama"
    ),
});

export default function DetailPendaftar() {
  const params = useParams();
  const id = params.id;

  let [image, setImage] = useState("");

  const { onOpen, isOpen, onClose } = useDisclosure();

  const [files, setFiles] = useState({
    foto_profile: "",
    foto_kks: "",
    foto_pkh: "",
    foto_kip: "",
    dokumen_prestasi: "",
  });
  const [focus, setFocus] = React.useState("");
  const [errorReg, setErrorReg] = React.useState();
  let dispatch = useDispatch();
  let toast = useToast();
  let history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const queryClient = useQueryClient();
  let [loading, setLoading] = useState(false);
  const name = useSelector((state) => state.auth.name);

  const { isError, data, isFetching } = useQuery(
    //query key
    ["users/detail/id", [id]],

    () => getDetailByAdmin(id),

    {
      enabled: id !== undefined,
      staleTime : 1000 * 60 * 60,
      keepPreviousData: true,
      select: (response) => response.data,
    }
  );

  const mutate = useNilaiBerkas();

  const initialValues = {};
  const onSubmit = async (values) => {
    let result = await updateProfile({ id: id, ...values, nama_admin: name });
    console.log("result", result);
    if (result.message === "Berhasil Menyimpan Data") {
      queryClient.invalidateQueries("detail");
      Swal.fire({
        title: "Berhasil!",
        text: "Berhasil Memperbaharui Data",
        icon: "success",
      });
    }
    if (result.response.status === 401) {
      console.log(result.response);
      setErrorReg(result.response.data);
      Swal.fire({
        title: "Gagal",
        text: result.response?.data?.message,
        icon: "error",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      jenis_kelamin: data?.jenis_kelamin || "", // atau "Perempuan"
      password: "",
      password_confirmation: "",
      nisn: data?.nisn || "",
      nik: data?.nik || "",
      tempat_lahir: data?.tempat_lahir || "",
      tanggal_lahir: data?.tanggal_lahir || "",
      agama: data?.agama || "",
      anak_ke: data?.anak_ke || "",
      jumlah_saudara_kandung: data?.jumlah_saudara_kandung || "",
      jenis_sekolah: data?.jenis_sekolah || "",
      asal_sekolah: data?.asal_sekolah || "",
      alamat: data?.alamat || "",
      desa: data?.desa || "",
      kecamatan: data?.kecamatan || "",
      kodepos: data?.kodepos || "",
      tempat_tinggal: data?.tempat_tinggal || "",
      transportasi: data?.transportasi || "",
      nama_ayah: data?.nama_ayah || "",
      nik_ayah: data?.nik_ayah || "",
      pendidikan_ayah: data?.pendidikan_ayah || "",
      pekerjaan_ayah: data?.pekerjaan_ayah || "",
      nomor_ayah: data?.nomor_ayah || "",
      nama_ibu: data?.nama_ibu || "",
      nik_ibu: data?.nik_ibu || "",
      pendidikan_ibu: data?.pendidikan_ibu || "",
      pekerjaan_ibu: data?.pekerjaan_ibu || "",
      nomor_ibu: data?.nomor_ibu || "",
      nama_wali: data?.nama_wali || "",
      nik_wali: data?.nik_wali || "",
      pendidikan_wali: data?.pendidikan_wali || "",
      pekerjaan_wali: data?.pekerjaan_wali || "",
      nomor_wali: data?.nomor_wali || "",
      hobi: data?.hobi,
      cita_cita: data?.cita_cita,
      nomor_kk: data?.nomor_kk,
      rt: data?.rt,
      rw: data?.rw,
      kab_kota: data?.kab_kota,
      provinsi: data?.provinsi,
      tempat_lahir_ayah: data?.tempat_lahir_ayah,
      tanggal_lahir_ayah: data?.tanggal_lahir_ayah,
      tempat_lahir_ibu: data?.tempat_lahir_ibu,
      tanggal_lahir_ibu: data?.tanggal_lahir_ibu,
      tahun_lahir_wali: data?.tahun_lahir_wali,
      penghasilan_ayah: data?.penghasilan_ayah || "",
      nomor_kks: data?.nomor_kks,
      nomor_pkh: data?.nomor_pkh,
      nomor_kip: data?.nomor_kip,
      nomor_pendaftaran: data?.nomor_pendaftaran,
      jalur_seleksi: data?.jalur_seleksi,
      tingkat1: data?.tingkat1,
      tingkat2: data?.tingkat2,
      tingkat3: data?.tingkat3,
      juara_ke_1: data?.juara_ke_1,
      juara_ke_2: data?.juara_ke_2,
      juara_ke_3: data?.juara_ke_3,
      nama_prestasi1: data?.nama_prestasi1,
      nama_prestasi2: data?.nama_prestasi2,
      nama_prestasi3: data?.nama_prestasi3,
      is_lulus: data?.is_lulus,
      gelombang: data?.gelombang,
      created_at: data?.created_at,
      updated_at: data?.updated_at,
      cbt_bacaan: data?.nilai?.cbt_bacaan,
      cbt_tajwid: data?.nilai?.cbt_tajwid,
      cbt_hafalan: data?.nilai?.cbt_hafalan,
      cbt_tulisan: data?.nilai?.cbt_tulisan,
      cbt_nilai: data?.nilai?.cbt_nilai,
      cbt_keterangan: data?.nilai?.cbt_keterangan,
      cbt_penilaian: data?.nilai?.cbt_penilaian,

      role: 2,
      is_batal: 0,
    },
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

  console.log("Data", data);

  const handleDownload = async () => {
    let res;

    console.log("res", res);
    setLoading(true);
    const blob = await pdf(<Resume data={data} foto={res} />).toBlob();

    const file = new Blob([blob], {
      type: "application/pdf",
    });

    const fileURL = URL.createObjectURL(file);
    setLoading(false);
    window.open(fileURL, "_blank"); // Buka di tab baru

    // return onOpen();
  };

  useEffect(() => {
    setFiles((prev) => ({
      ...prev,
      foto_profile: data?.foto_profile,
      foto_kks: data?.foto_kks,
      foto_pkh: data?.foto_pkh,
      foto_kip: data?.foto_kip,
      dokumen_prestasi: data?.dokumen_prestasi,
    }));
  }, [data]);


  if (isFetching) {
    return (
      <Center height="100vh">
        <VStack spacing={4}>
          <Spinner size="lg" />
          <Text> Sedang Memuat Data...</Text>
        </VStack>
      </Center>
    );
  }
  return (
    <>
      <Modal image={image} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
      <>
        {" "}
        <div cl>
          <button
            onClick={() => {
              history.push("/admin/pendaftar");
            }}
            className="flex items-center space-x-10"
          >
            <ArrowLeft /> <span>Kembali</span>
          </button>
        </div>
        <div className="w-full   bg-white rounded-2xl py-1 lg:py-10 px-1 lg:px-5">
          <div className="text-center">
            <h2 className="text-3xl text-blue-400 font-bold uppercase">
              REKAPAN DATA SISWA
            </h2>
          </div>

          <div className="text-lg leading-5 text-blue-900 flex items-center justify-center mt-5">
            {data?.foto_profile ? (
              <img
                className="rounded-full shadow-lg transition duration-300 transform hover:scale-105 w-[200px] h-[200px] md:w-[200px] md:h-[200px]"
                src={data?.foto_profile}
              />
            ) : (
              <img
                className="rounded-full shadow-lg transition duration-300 transform hover:scale-105 w-[200px] h-[200px] md:w-[200px] md:h-[200px]"
                src={
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
              />
            )}
          </div>

          <FormikProvider value={Formik}>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-2 mt-5 "
            >
              {console.log("Err", errors)}

              <Batas title={"Pendaftran PPDB"}>
                <InputReg
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={() => {}}
                  isSubmitting={isSubmitting}
                  value={values.nomor_pendaftaran}
                  title={"Nomor Pendaftaran"}
                  placeholder={"Muhammad"}
                  errors={errors.nomor_pendaftaran}
                  id={"nomor_pendaftaran"}
                  touched={touched.nomor_pendaftaran}
                />
                <InputReg
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={() => {}}
                  isSubmitting={isSubmitting}
                  value={values.gelombang}
                  title={"Gelombang"}
                  placeholder={"Muhammad"}
                  errors={errors.gelombang}
                  id={"gelombang"}
                  touched={touched.gelombang}
                />
                <InputReg
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={() => {}}
                  isSubmitting={isSubmitting}
                  value={formatDateInd(values.created_at)}
                  title={"Waktu Pendaftaran"}
                  placeholder={"Muhammad"}
                  errors={errors.created_at}
                  id={"created_at"}
                  touched={touched.created_at}
                />
                <InputReg
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={() => {}}
                  isSubmitting={isSubmitting}
                  value={formatDateInd(values.updated_at)}
                  title={"Terakhir Perbaharui Data"}
                  placeholder={"Muhammad"}
                  errors={errors.updated_at}
                  id={"updated_at"}
                  touched={touched.updated_at}
                />

                <SelectReg
                  isRequired
                  focus={focus}
                  setFocus={setFocus}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  value={values.jalur_seleksi}
                  title={"Jenis Seleksi"}
                  placeholder={"cth. Sukabumi"}
                  errors={errors.jalur_seleksi}
                  id="jalur_seleksi"
                  touched={touched.jalur_seleksi}
                >
                  <option>Pilih</option>
                  <option value={"Jalur Reguler"}> Jalur Reguler</option>
                  <option value={"Jalur Prestasi"}> Jalur Prestasi</option>
                  <option value={"Jalur Afirmasi"}> Jalur Afirmasi</option>
                </SelectReg>

                {values?.jalur_seleksi === "Jalur Afirmasi" && (
                  <>
                    {" "}
                    <InputReg
                      focus={focus}
                      setFocus={setFocus}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      isSubmitting={isSubmitting}
                      value={values.nomor_kks}
                      title={
                        "Nomor Kartu Keluarga Sejahtera/Kartu Perlindungan Sosial (Jika ada)"
                      }
                      placeholder={"cth. 0895320050344"}
                      errors={errors.nomor_kks}
                      id="nomor_kks"
                      touched={touched.nomor_kks}
                    />
                    <InputReg
                      focus={focus}
                      setFocus={setFocus}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      isSubmitting={isSubmitting}
                      value={values.nomor_pkh}
                      title={"Nomor Kartu Program Keluarga Harapan (Jika ada)"}
                      placeholder={"cth. 0895320050344"}
                      errors={errors.nomor_pkh}
                      id="nomor_pkh"
                      touched={touched.nomor_pkh}
                    />
                    <InputReg
                      focus={focus}
                      setFocus={setFocus}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      isSubmitting={isSubmitting}
                      value={values.nomor_kip}
                      title={"Nomor Kartu Indonesia Pintar (Jika ada)"}
                      placeholder={"cth. 0895320050344"}
                      errors={errors.nomor_kip}
                      id="nomor_kip"
                      touched={touched.nomor_kip}
                    />
                  </>
                )}

                {values?.jalur_seleksi === "Jalur Prestasi" && (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 mt-2 px-0 lg:px-5">
                      <h2 className="text-blue-400 font-bold text-lg   col-span-1 lg:col-span-3">
                        Prestasi 1
                      </h2>
                      <SelectReg
                        isRequired
                        focus={focus}
                        setFocus={setFocus}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        isSubmitting={isSubmitting}
                        value={values.nama_prestasi1}
                        title={"Nama Prestasi"}
                        placeholder={"cth. Sukabumi"}
                        errors={errors.nama_prestasi1}
                        id="nama_prestasi1"
                        touched={touched.nama_prestasi1}
                      >
                        <option>Pilih</option>
                        <option value={"Raport"}> Raport</option>
                        <option value={"Akademik"}> Akademik</option>
                        <option value={"Ekstrakulikuler"}>
                          {" "}
                          Ekstrakulikuler
                        </option>
                      </SelectReg>{" "}
                      <SelectReg
                        isRequired
                        focus={focus}
                        setFocus={setFocus}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        isSubmitting={isSubmitting}
                        value={values.tingkat1}
                        title={"Tingkat"}
                        placeholder={"cth. Sukabumi"}
                        errors={errors.tingkat1}
                        id="tingkat1"
                        touched={touched.tingkat1}
                      >
                        <option>Pilih</option>
                        <option value={"Nasional"}> Nasional</option>
                        <option value={"Provinsi"}> Provinsi</option>
                        <option value={"Kabupaten/Kota"}>
                          {" "}
                          Kabupaten/Kota
                        </option>
                      </SelectReg>{" "}
                      <InputReg
                        isRequired
                        focus={focus}
                        setFocus={setFocus}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        isSubmitting={isSubmitting}
                        value={values.juara_ke_1}
                        title={"Juara"}
                        placeholder={"1"}
                        errors={errors.juara_ke_1}
                        id={"juara_ke_1"}
                        touched={touched.juara_ke_1}
                      />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 mt-2 px-0 lg:px-5">
                      <h2 className="text-blue-400 font-bold text-lg   col-span-1 lg:col-span-3">
                        Prestasi 2 (Jika ada)
                      </h2>
                      <SelectReg
                        isRequired
                        focus={focus}
                        setFocus={setFocus}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        isSubmitting={isSubmitting}
                        value={values.nama_prestasi2}
                        title={"Nama Prestasi"}
                        placeholder={"cth. Sukabumi"}
                        errors={errors.nama_prestasi2}
                        id="nama_prestasi2"
                        touched={touched.nama_prestasi2}
                      >
                        <option>Pilih</option>
                        <option value={"Raport"}> Raport</option>
                        <option value={"Akademik"}> Akademik</option>
                        <option value={"Ekstrakulikuler"}>
                          {" "}
                          Ekstrakulikuler
                        </option>
                      </SelectReg>{" "}
                      <SelectReg
                        isRequired
                        focus={focus}
                        setFocus={setFocus}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        isSubmitting={isSubmitting}
                        value={values.tingkat2}
                        title={"Tingkat"}
                        placeholder={"cth. Sukabumi"}
                        errors={errors.tingkat2}
                        id="tingkat2"
                        touched={touched.tingkat2}
                      >
                        <option>Pilih</option>
                        <option value={"Nasional"}> Nasional</option>
                        <option value={"Provinsi"}> Provinsi</option>
                        <option value={"Kabupaten/Kota"}>
                          {" "}
                          Kabupaten/Kota
                        </option>
                      </SelectReg>{" "}
                      <InputReg
                        isRequired
                        focus={focus}
                        setFocus={setFocus}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        isSubmitting={isSubmitting}
                        value={values.juara_ke_2}
                        title={"Juara"}
                        placeholder={"1"}
                        errors={errors.juara_ke_2}
                        id={"juara_ke_2"}
                        touched={touched.juara_ke_2}
                      />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 mt-2 px-0 lg:px-5">
                      <h2 className="text-blue-400 font-bold text-lg   col-span-1 lg:col-span-3">
                        Prestasi 3 (jika Ada)
                      </h2>
                      <SelectReg
                        isRequired
                        focus={focus}
                        setFocus={setFocus}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        isSubmitting={isSubmitting}
                        value={values.nama_prestasi3}
                        title={"Nama Prestasi"}
                        placeholder={"cth. Sukabumi"}
                        errors={errors.nama_prestasi3}
                        id="nama_prestasi3"
                        touched={touched.nama_prestasi3}
                      >
                        <option>Pilih</option>
                        <option value={"Raport"}> Raport</option>
                        <option value={"Akademik"}> Akademik</option>
                        <option value={"Ekstrakulikuler"}>
                          {" "}
                          Ekstrakulikuler
                        </option>
                      </SelectReg>{" "}
                      <SelectReg
                        isRequired
                        focus={focus}
                        setFocus={setFocus}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        isSubmitting={isSubmitting}
                        value={values.tingkat3}
                        title={"Tingkat"}
                        placeholder={"cth. Sukabumi"}
                        errors={errors.tingkat3}
                        id="tingkat3"
                        touched={touched.tingkat3}
                      >
                        <option>Pilih</option>
                        <option value={"Nasional"}> Nasional</option>
                        <option value={"Provinsi"}> Provinsi</option>
                        <option value={"Kabupaten/Kota"}>
                          {" "}
                          Kabupaten/Kota
                        </option>
                      </SelectReg>{" "}
                      <InputReg
                        isRequired
                        focus={focus}
                        setFocus={setFocus}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        isSubmitting={isSubmitting}
                        value={values.juara_ke_3}
                        title={"Juara"}
                        placeholder={"1"}
                        errors={errors.juara_ke_3}
                        id={"juara_ke_3"}
                        touched={touched.juara_ke_3}
                      />
                    </div>
                  </>
                )}
              </Batas>
              <Batas title={"Identitas Siswa"}>
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
                    title={"Nama Sekolah Tingkat MTS/SMP"}
                    placeholder={"cth. MTSN 1 Sukabumi"}
                    errors={errors.asal_sekolah}
                    id="asal_sekolah"
                    touched={touched.asal_sekolah}
                  />

                  <SelectReg
                    isRequired
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.tempat_tinggal}
                    title={
                      "Jarak Rumah/Pondok/Kosan/Kontrakan ke MAN 1 Kota Sukabumi"
                    }
                    placeholder={"cth. Sukabumi"}
                    errors={errors.tempat_tinggal}
                    id="tempat_tinggal"
                    touched={touched.tempat_tinggal}
                  >
                    <option>Pilih</option>
                    <option value={"Kurang dari 5 km"}>
                      {" "}
                      Kurang dari 5 km
                    </option>
                    <option value={"Antara 5 km – 10 km"}>
                      {" "}
                      Antara 5 km – 10 km
                    </option>
                    <option value={"Antara 11 km – 20 km"}>
                      {" "}
                      Antara 11 km – 20 km
                    </option>
                    <option value={"Antara 21 km – 30 km"}>
                      {" "}
                      Antara 21 km – 30 km
                    </option>
                    <option value={"Lebih dari 30 km"}>
                      {" "}
                      Lebih dari 30 km
                    </option>
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
                  <InputReg
                    isRequired
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.hobi}
                    title={"Hobi"}
                    placeholder={"cth. Bermain Sepak bola"}
                    errors={errors.hobi}
                    id="hobi"
                    touched={touched.hobi}
                  />
                  <InputReg
                    isRequired
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.cita_cita}
                    title={"Cita-cita"}
                    placeholder={"cth. Polisi"}
                    errors={errors.cita_cita}
                    id="cita_cita"
                    touched={touched.cita_cita}
                  />
                </section>
              </Batas>
              <Batas title={"Alamat Siswa"}>
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <InputReg
                    isRequired
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.rt}
                    title={"RT"}
                    placeholder={"cth. XXXXX"}
                    errors={errors.rt}
                    id="rt"
                    touched={touched.rt}
                  />

                  <InputReg
                    isRequired
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.rw}
                    title={"RW"}
                    placeholder={"cth. XXXXX"}
                    errors={errors.rw}
                    id="rw"
                    touched={touched.rw}
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
                    value={values.kab_kota}
                    title={"Kabupaten/Kota"}
                    placeholder={"cth. XXXXX"}
                    errors={errors.kab_kota}
                    id="kab_kota"
                    touched={touched.kab_kota}
                  />

                  <InputReg
                    isRequired
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.provinsi}
                    title={"Provinsi"}
                    placeholder={"cth. XXXXX"}
                    errors={errors.provinsi}
                    id="provinsi"
                    touched={touched.provinsi}
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

                  <div className="lg:col-span-3 col-span-1 lg:col-start-1">
                    {" "}
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
                  </div>
                </section>
              </Batas>

              <Batas title={"Identitas Orang Tua"}>
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <InputReg
                    isRequired
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.nomor_kk}
                    title={"Nomor Kartu Keluarga"}
                    placeholder={"cth. XXXXX"}
                    errors={errors.nomor_kk}
                    id="nomor_kk"
                    touched={touched.nomor_kk}
                  />
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
                  <InputReg
                    isRequired
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.tempat_lahir_ayah}
                    title={"Tempat Lahir Ayah"}
                    placeholder={"cth. Sukabumi"}
                    errors={errors.tempat_lahir_ayah}
                    id="tempat_lahir_ayah"
                    touched={touched.tempat_lahir_ayah}
                  />

                  <InputReg
                    isRequired
                    type={"date"}
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.tanggal_lahir_ayah}
                    title={"Tanggal Lahir Ayah"}
                    placeholder={"cth. Sukabumi"}
                    errors={errors.tanggal_lahir_ayah}
                    id="tanggal_lahir_ayah"
                    touched={touched.tanggal_lahir_ayah}
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

                  <InputReg
                    isRequired
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.tempat_lahir_ibu}
                    title={"Tempat Lahir Ibu"}
                    placeholder={"cth. Sukabumi"}
                    errors={errors.tempat_lahir_ibu}
                    id="tempat_lahir_ibu"
                    touched={touched.tempat_lahir_ibu}
                  />

                  <InputReg
                    isRequired
                    type={"date"}
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.tanggal_lahir_ibu}
                    title={"Tanggal Lahir Ibu"}
                    placeholder={"cth. Sukabumi"}
                    errors={errors.tanggal_lahir_ibu}
                    id="tanggal_lahir_ibu"
                    touched={touched.tanggal_lahir_ibu}
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
                    value={values.penghasilan_ayah}
                    title={"Penghasilan Orang Tua"}
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
                    <option value={"kurang dari 1000000"}>
                      {" "}
                      {" Kurang dari Rp. 1.000.000"}
                    </option>
                    <option value={"kurang dari 2000000"}>
                      {" "}
                      {" Kurang dari Rp. 2.000.000"}
                    </option>
                    <option value={"kurang dari 3000000"}>
                      {" "}
                      {" Kurang dari Rp. 3.000.000"}
                    </option>
                    <option value={"kurang dari 4000000"}>
                      {" "}
                      {" Kurang dari Rp. 4.000.000"}
                    </option>
                    <option value={"kurang dari 5000000"}>
                      {" "}
                      {" Kurang dari Rp. 5.000.000"}
                    </option>
                    <option
                      value={"lebih dari 5000000 dan kurang dari 10000000"}
                    >
                      {" "}
                      {
                        " Lebih dari Rp. 5.000.000 dan Kurang dari Rp. 10.000.000"
                      }
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
                </section>
              </Batas>

              <Batas title={"Data Wali"}>
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
                  <InputReg
                    focus={focus}
                    setFocus={setFocus}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    value={values.tahun_lahir_wali}
                    title={"Tahun Lahir Wali (Jika Ada)"}
                    placeholder={"cth. 1970"}
                    errors={errors.tahun_lahir_wali}
                    id="tahun_lahir_wali"
                    touched={touched.tahun_lahir_wali}
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
                    <option
                      value={"lebih dari 5000000 dan kurang dari 10000000"}
                    >
                      {" "}
                      {
                        " Lebih dari Rp. 5.000.000 dan Kurang dari Rp. 10.000.000"
                      }
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
                </section>

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

              <Batas title={"Pemeriksaan Dokumen"}>
                <section className="flex items-center justify-end">
                  {!!data?.nilai?.berkas_nilai === false ? (
                    <button
                      className="border flex items-center space-x-5 px-4 text-white bg-blue-400 py-2 text-lg font-bold rounded-lg hover:bg-blue-500"
                      type="button"
                      onClick={() => {
                        Swal.fire({
                          title:
                            "<h2 style='font-size:18px'>Apakah Semua Berkas yang Diupload Sudah Sesuai dengan Jalur Seleksi yang Dipilih Pendaftar?</h2>",
                          icon: "warning", // Menambahkan ikon peringatan
                          showDenyButton: true,
                          showCancelButton: true,
                          confirmButtonText: "Sesuai",
                          denyButtonText: `Tidak Sesuai`,
                          customClass: {
                            title: "swal-title-small", // Tambahkan class kustom
                          },
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            mutate.mutate({
                              berkas_nilai: "Sesuai",
                              id: id,
                              berkas_keterangan: "Lulus",
                              berkas_penilaian: name,
                            });
                          } else if (result.isDenied) {
                            mutate.mutate({
                              berkas_nilai: "Tidak Sesuai",
                              id: id,
                              berkas_keterangan: "Tidak Lulus",
                              berkas_penilaian: name,
                            });
                          }
                        });
                      }}
                    >
                      <DocumentReportIcon className="h-8 w-8" />{" "}
                      <h5>Penilaian Berkas </h5>
                    </button>
                  ) : (
                    <div>
                      <h2 className="text-green-500 font-bold">
                        Berkas {data?.nilai?.berkas_nilai} dilakukan penilaian
                        oleh {data?.nilai?.berkas_penilaian}
                      </h2>
                    </div>
                  )}
                </section>
                <table className="w-full border-collapse border border-gray-300 mt-5">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3">Dokumen</th>
                      
                      <th className="border border-gray-300 p-3">Deskripsi</th>

                      <th className="border border-gray-300 p-3">Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(files).map(([key, file]) => (
                      <tr key={key} className="text-center">
                        <td className="border border-gray-300 p-3 capitalize">
                          {key === "foto_profile"
                            ? "Foto Profil"
                            : key === "foto_kks"
                            ? "Kartu KKS"
                            : key === "foto_pkh"
                            ? "Kartu PKH"
                            : key === "foto_kip"
                            ? "Kartu KIP "
                            : "Dokumen Prestasi"}
                        </td>
                        <td className="border border-gray-300 p-3 text-sm text-gray-600">
                          {key === "foto_profile"
                            ? "Upload Foto Data Diri dengan latar belakang merah dan menggunakan seragam sekolah/madrasah asal"
                            : key === "foto_kks"
                            ? "Upload Foto Kartu Keluarga Sejahtera/Kartu Perlindungan (Jika Ada, dan Bagi Jalur Afirmasi)"
                            : key === "foto_pkh"
                            ? "Upload Foto Kartu Program Keluarga Harapan (Jika Ada, dan Bagi Jalur Afirmasi)"
                            : key === "foto_kip"
                            ? "Upload Foto Kartu Kartu Indonesia Pintar (Jika Ada, dan Bagi Jalur Afirmasi)"
                            : "Upload Foto Dokumen Prestasi/Raport/Sertifikat/Lainnya (Digabungkan dalam 1 file PDF)(Bagi Jalur Prestasi)"}
                        </td>

                        <td className="border border-gray-300 p-3">
                          {!!file === false ? (
                            <span className="text-red-500 font-bold">
                              Belum Upload
                            </span>
                          ) : file?.includes("pdf") ? (
                            <a
                              href={file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 flex items-center gap-2"
                            >
                              <Eye size={20} /> Lihat PDF
                            </a>
                          ) : (
                            <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-400 mx-auto">
                              <img
                                onClick={() => {
                                  setImage(file);
                                  return onOpen();
                                }}
                                src={file}
                                alt={key}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </Batas>

              <Batas title={"Tes Bidang Studi"}>
                <table className="w-full border-collapse border border-gray-300 mt-5">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3">Izinkan Tes?</th>
                      
                      <th className="border border-gray-300 p-3">Hasil Tes</th>

                      <th className="border border-gray-300 p-3">Keterangan Tes</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(files).map(([key, file]) => (
                      <tr key={key} className="text-center">
                        <td className="border border-gray-300 p-3 capitalize">
                        <select
                          onChange={handleChange}
                          className="border py-5 text-center text-lg "
                       >
                          <option>Pilih</option>
                          <option>Izinkan</option>
                          <option>Tidak Diizinkan</option>
                          </select>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm text-gray-600">
                          /// Menampilkan angka yang diisi berdasakan hasil Tes Bidang Studi
                        </td>

                        <td className="border border-gray-300 p-3">
                        <select
                          onChange={handleChange}
                          className="border py-5 text-center text-lg "
                       >
                          <option>Pilih</option>
                          <option>Telah Melaksanakan</option>
                          <option>Belum Melaksanakan</option>
                          </select>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </Batas>

              <Batas title={"Tes Potensi Akademik"}>
                <table className="w-full border-collapse border border-gray-300 mt-5">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3">Izinkan Tes?</th>
                      
                      <th className="border border-gray-300 p-3">Hasil Tes</th>

                      <th className="border border-gray-300 p-3">Keterangan Tes</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(files).map(([key, file]) => (
                      <tr key={key} className="text-center">
                        <td className="border border-gray-300 p-3 capitalize">
                        <select
                          onChange={handleChange}
                          className="border py-5 text-center text-lg "
                       >
                          <option>Pilih</option>
                          <option>Izinkan</option>
                          <option>Tidak Diizinkan</option>
                          </select>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm text-gray-600">
                          /// Menampilkan nilai angka yang diisi berdasakan hasil Tes Potensi Akademik
                        </td>

                        <td className="border border-gray-300 p-3">
                        <select
                          onChange={handleChange}
                          className="border py-5 text-center text-lg "
                       >
                          <option>Pilih</option>
                          <option>Telah Melaksanakan</option>
                          <option>Belum Melaksanakan</option>
                          </select>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </Batas>

              <Batas title={"Wawancara Psikologi"}>
                <table className="w-full border-collapse border border-gray-300 mt-5">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3">Izinkan Tes?</th>
                      
                      <th className="border border-gray-300 p-3">Hasil Tes</th>

                      <th className="border border-gray-300 p-3">Keterangan Tes</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(files).map(([key, file]) => (
                      <tr key={key} className="text-center">
                        <td className="border border-gray-300 p-3 capitalize">
                        <select
                          onChange={handleChange}
                          className="border py-5 text-center text-lg "
                       >
                          <option>Pilih</option>
                          <option>Izinkan</option>
                          <option>Tidak Diizinkan</option>
                          </select>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm text-gray-600">
                          /// Menampilkan nilai angka yang diisi berdasakan hasil Wawancara Psikologi
                        </td>

                        <td className="border border-gray-300 p-3">
                        <select
                          onChange={handleChange}
                          className="border py-5 text-center text-lg "
                       >
                          <option>Pilih</option>
                          <option>Telah Melaksanakan</option>
                          <option>Belum Melaksanakan</option>
                          </select>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </Batas>

              <Batas title={"Hasil Tes BTQ"}>
                <Nilai
                  values={values}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  setFieldValue={setFieldValue}
                />
              </Batas>

              {/* //login */}

              {/* <Batas title={"Data Bagi Jalur Afirmasi"}>
                <section className="grid grid-cols-1 gap-5"></section>
              </Batas> */}

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
                  {isLoading ? <Loading /> : "Simpan Perubahan Data"}
                </button>
              </div>
            </form>
          </FormikProvider>
        </div>
      </>
    </>
  );
}
