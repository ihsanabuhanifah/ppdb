import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Button, Collapse, useDisclosure } from "@chakra-ui/react";
import Swal from "sweetalert2";

import Dropzone from "react-dropzone";
import { Formik } from "formik";

import Loading from "../../../components/loading";
import Input from "../../../components/Input";

import TableHeader from "../../../components/TableHeader";

import { getUser, updateBatal } from "../../../api/admin";
import { konfirmBukti } from "../../../api/admin";
import { formatDate, formatTanggal, formatNomorHp } from "../../../utils";
import ReactWhatsapp from "react-whatsapp";
import { useToast } from "@chakra-ui/react";
import useDebounce from "../../../hooks/useDebounce";
import TableLoading from "../../../components/tableLoading";
import Modal from "../../../components/Modal";
import * as Yup from "yup";
import Select from "react-select";
import PaginationTable from "../../../components/PaginationTable";
import { sendMessageBukti } from "../../../config/sendMessage";
let fileSchema = Yup.object().shape({
  files: Yup.string().required("Bukti Transfer wajib di Upload"),
  nominal: Yup.string().required("Nominal wajib diisi"),
});
export default function Pendaftar() {
  const [page, setPage] = React.useState(1);
  const [show, setShow] = React.useState(false);
  const [per_page, setPer_page] = React.useState(100);
  const [isLoadingKonfirmasi, setIsLoadingKonfirmasi] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  let debouncedKeyword = useDebounce(keyword, 500);
  const [statusBukti, setStatusBukti] = React.useState("");
  const [transfer, setTransfer] = React.useState(0);
  let queryClient = useQueryClient();
  const handleToggle = () => setShow(!show);
  let initialValues = {
    files: undefined,
    nominal: "",
    user_id: 0,
    status: 1,
  };

  const onSubmit = async (values, { resetForm }) => {
    // setIsLoading(true);
    // let result = await uploadBuktiTransfer(values);
    // setIsLoading(false);
    // if (result?.message === "Berhasil Menyimpan Data") {
    //   toast({
    //     position: "top-right",
    //     title: "Success",
    //     description: "Berhasil Menyimpan Data",
    //     status: "success",
    //     duration: 4000,
    //     isClosable: true,
    //   });
    //   // dispatch(payment());
    //   bukti();
    //   resetForm();
    //   initialValues = {
    //     files: undefined,
    //     nominal: "",
    //     status: 1,
    //   };
    //   return setStatusTransfer(true);
    //   // history.push("/identitas/data-ibu");
    // }
    // if (result.response.status === 401) {
    //   setErrorPost(result.response.data);
    //   toast({
    //     position: "top-right",
    //     title: "Fail",
    //     description: result.response.data.message,
    //     status: "error",
    //     duration: 10000,
    //     isClosable: true,
    //   });
    // }
  };
  const { isLoading, data, isFetching } = useQuery(
    //query key
    [
      "list_user",
      {
        page: page,
        per_page: per_page,
        search: debouncedKeyword,
      },
    ],

    () =>
      getUser({
        page: page,
        per_page: per_page,
        keyword: debouncedKeyword,
      }),

    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 10,
      select: (response) => {
        let result = response.data;
        let options = [];
        let bukti = 0;
        result?.data?.forEach((rs) => {
          options.push({
            value: rs?.id,
            label: rs?.name,
          });
          if (rs?.bukti !== null) {
            bukti = bukti + 1;
          }
        });
        return {
          data: result,
          bukti: bukti,
          options: options,
        };
      },
    }
  );

  let toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateStatus = async (id) => {
    let result = await konfirmBukti(id);
    queryClient.invalidateQueries("provider_document");
    queryClient.invalidateQueries("list_user");
    if (result?.status === "success") {
      toast({
        position: "top-right",
        title: "Berhasil",
        description: "Pembayaran Terkonfirmasi",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setIsLoadingKonfirmasi(false);
    }
  };

  const handleBatal = (id) => {
    Swal.fire({
      title: "Apakah yakin",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await updateBatal(id);
          queryClient.invalidateQueries("list_user");
          Swal.fire("Batal!", result.message, "success");
        } catch {
          Swal.fire("Batal!", "Ada Kesalahan", "error");
        }
      }
    });
  };
  return (
    <React.Fragment>
      <div className="text-blue-400 grid grid-cols-1 gap-5">
        <div className="border-b-2 pb-10">
          <h1 className="text-2xl  font-semibold">
            DAFTAR CALON SISWA PORTAL PPDB MAN 1 KOTA SUKABUMI
          </h1>
        </div>
        {/* table */}

        <div className="p-1n ">
          <TableHeader
            setKeyword={setKeyword}
            setPer_page={setPer_page}
          ></TableHeader>
         
        </div>
        {isFetching ? (
          <TableLoading></TableLoading>
        ) : (
          <div className="p-1  overflow-auto ">
            <table className="min-w-full relative ">
              <thead>
                <tr className="uppercase">
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-400 tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Nomor Utama
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Nomor Darurat
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                  Agama
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Asal Sekolah
                  </th>

                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                   Transportasi
                  </th>

                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Nama Ayah
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Nama Ayah
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Detail
                  </th>
                  {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                  Created_At
                </th> */}
                </tr>
              </thead>{" "}
              <tbody className="bg-white relative">
                {data?.data?.data?.length === 0 && (
                  <tr>
                    <td
                      className="text-red-500 text-2xl flex items-center justify-center "
                      colSpan={"20"}
                      rowSpan={"20"}
                    >
                      Data Tidak Ditemukan
                    </td>
                  </tr>
                )}
                {data?.data?.data?.map((dt, index) => (
                  <tr
                    key={index}
                    className={` ${
                      Number(dt.is_batal) === 1
                        ? "bg-red-300"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm leading-5 text-gray-800">
                            {(page - 1) * per_page + index + 1}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {dt.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      {dt.email}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      <ReactWhatsapp
                        number={formatNomorHp(dt.phone)}
                        message={"bismillah"}
                      >
                        <p className="hover:text-blue-400 hover:font-bold hover:text-lg">
                          {formatNomorHp(dt.phone)}
                        </p>
                      </ReactWhatsapp>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                     {!!dt.nomor_ayah  === false? "-":  <ReactWhatsapp
                        number={formatNomorHp(dt.phone_ayah)}
                        message={"bismillah"}
                      >
                        <p className="hover:text-blue-400 hover:font-bold hover:text-lg">
                          {formatNomorHp(dt.phone_ayah)}
                        </p>
                      </ReactWhatsapp>}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      {dt.agama}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      {dt.asal_sekolah}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      {dt.transportasi}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      {dt.nama_ayah}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      {dt.nama_ibu}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      <Button>Detail</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <PaginationTable />
          </div>
        )}

        {/* table */}
      </div>
      <Modal onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={fileSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            setValues,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldTouched,
            setFieldValue,
          }) => {
            return (
              <form
                className="border px-5 p-10 mt-5 mb-5 shadow-lg rounded-lg"
                onSubmit={handleSubmit}
              >
                <h1 className="uppercase mb-5 font-bold text-blue-400 text-center">
                  {" "}
                  Form Upload Bukti Transfer pembayaran PSB
                </h1>
                <div className="mb-5">
                  <label
                    className="font-bold mb-5   text-blue-400 "
                    htmlFor="penghasilan_ayah"
                  >
                    <span className="uppercase">Nama Akun</span>{" "}
                    <span className="italic text-md text-red-500">(wajib)</span>
                  </label>
                  <Select
                    // className="basic-single"
                    // classNamePrefix="select"
                    placeholder="Pilih Nama Akun"
                    // defaultValue={colourOptions[0]}
                    // isDisabled={isDisabled}
                    // isLoading={isLoading}
                    isClearable
                    isRtl
                    isSearchable
                    name="color"
                    options={data?.options}
                  />
                </div>
                <div className="mb-5">
                  <Input
                    label="nominal"
                    id="nominal"
                    placeholder="Nominal Transfer"
                    tabIndex="2"
                    type="text"
                    error={errors.nominal && touched.nominal}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nominal}
                    required
                  >
                    {" "}
                    {errors.nominal && touched.nominal && (
                      <p className="text-red-500 italic font-bold  text-sm mt-1">
                        {errors.nominal}
                      </p>
                    )}
                  </Input>
                </div>
                <label
                  className="font-bold mb-5   text-blue-400 "
                  htmlFor="penghasilan_ayah"
                >
                  <span className="uppercase">File Bukti</span>{" "}
                  <span className="italic text-md text-red-500">(wajib)</span>
                </label>
                <div>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      let reader = new FileReader();

                      setFieldValue(`files`, acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps({
                          className: `text-center border-dashed border-4 mt-5 ${
                            errors.files && touched.files
                              ? "border-red-100"
                              : "border-light-blue-500"
                          } w-full p-5 col-span-4 relative`,
                        })}
                      >
                        <input
                          {...getInputProps()}
                          className="w-full h-full"
                          value={values.file}
                          variant="file"
                          type="file"
                          error={errors?.files && touched?.files}
                          onChange={(event) => {
                            let reader = new FileReader();

                            setFieldValue(
                              `files`,
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setFieldValue(`files`, undefined);
                          }}
                          className={`${
                            values.files !== undefined ? "block" : "hidden"
                          } absolute top-0 right-4 z-10" text-xl`}
                        >
                          x
                        </button>
                        <p className="text-gray-400">
                          {values.files !== undefined
                            ? `${values.files.name}`
                            : "Jatukan Bukti Disini atau Klik untuk mengunggah"}
                        </p>
                      </div>
                    )}
                  </Dropzone>
                </div>
                <p className="text-center capitalize">
                  {errors?.files && touched?.files && (
                    <span className="text-red-500 text-md mt-1 italic font-bold text-center w-full">
                      {errors?.files}
                    </span>
                  )}
                </p>
                <div className="mt-5">
                  <button
                    disabled={isSubmitting}
                    className="bg-blue-400 w-full flex items-center justify-center text-white py-5  font-bold"
                    type="submit"
                  >
                    {isLoading ? <Loading></Loading> : " Upload Bukti Transfer"}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </Modal>
    </React.Fragment>
  );
}
