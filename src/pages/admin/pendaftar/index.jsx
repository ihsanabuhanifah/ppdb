import React from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  Button,
  Collapse,
  useDisclosure,
  Box,
  Flex,
  Select as ChakraSelect,
} from "@chakra-ui/react";
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
import Pagination from "../../../components/Pagination"; // Updated pagination component

let fileSchema = Yup.object().shape({
  files: Yup.string().required("Bukti Transfer wajib di Upload"),
  nominal: Yup.string().required("Nominal wajib diisi"),
});

const academicYears = [
  { value: "2023-2024", label: "2023/2024" },
  { value: "2024-2025", label: "2024/2025" },
  { value: "2025-2026", label: "2025/2026" },
  { value: "2026-2027", label: "2026/2027" },
];

export default function Pendaftar() {
  const [page, setPage] = React.useState(1);
  const [show, setShow] = React.useState(false);
  const [per_page, setPer_page] = React.useState(100);
  const [isLoadingKonfirmasi, setIsLoadingKonfirmasi] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [selectedYear, setSelectedYear] = React.useState(academicYears[3]); // Default to current year
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
    // Submit logic here
  };

  let toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, data, isFetching } = useQuery(
    [
      "list_user",
      {
        page: page,
        per_page: per_page,
        search: debouncedKeyword,
        year: selectedYear.value,
      },
    ],
    () =>
      getUser({
        page: page,
        per_page: per_page,
        keyword: debouncedKeyword,
        year: selectedYear.value,
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <Box className="text-green-500 grid grid-cols-1 gap-5 p-4">
        <div className="border-b-2 pb-5">
          <h1 className="text-2xl font-semibold">
            DAFTAR USER PORTAL PPDB SMK MADINATULQURAN
          </h1>
        </div>

        {/* Year Selection */}
        <Flex alignItems="center" mb={4}>
          <Box mr={2} minWidth="150px">
            <label className="font-bold">Tahun Ajaran:</label>
          </Box>
          <Select
            value={selectedYear}
            onChange={setSelectedYear}
            options={academicYears}
            className="w-full"
          />
        </Flex>

        {/* Summary Cards */}
        <button
          className="font-bold uppercase text-left"
          type="button"
          variantColor="blue"
          onClick={handleToggle}
        >
          {show ? "Sembunyikan Detail Informasi" : "Tampilkan Detail Informasi"}
        </button>

        <Collapse in={show} animateOpacity>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              boxShadow="sm"
            >
              <label className="font-bold uppercase" htmlFor="">
                Jumlah <span className="text-red-500">Pendaftar</span>
              </label>
              <Box mt={2} fontSize="xl" fontWeight="bold">
                {data?.data?.total} Santri
              </Box>
            </Box>

            <Box
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              boxShadow="sm"
            >
              <label className="font-bold uppercase" htmlFor="">
                Jumlah <span className="text-red-500">Sudah Transfer</span>
              </label>
              <Box mt={2} fontSize="xl" fontWeight="bold">
                {data?.bukti} Santri
              </Box>
            </Box>

            <Box
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              boxShadow="sm"
            >
              <label className="font-bold uppercase" htmlFor="">
                Jumlah <span className="text-red-500">Belum Transfer</span>
              </label>
              <Box mt={2} fontSize="xl" fontWeight="bold">
                {data?.data?.total - data?.bukti} Santri
              </Box>
            </Box>
          </div>
        </Collapse>

        {/* Table Controls */}
        {/* <Box mb={4}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box flex="1" mr={4}>
              <TableHeader setKeyword={setKeyword} setPer_page={setPer_page} />
            </Box>
            <Button onClick={onOpen} colorScheme="green" size="sm">
              Upload Bukti
            </Button>
          </Flex>
        </Box> */}

        {/* Table */}
        {isFetching ? (
          <TableLoading />
        ) : (
          <Box className="overflow-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Nomor HP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Jam Daftar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Status Transfer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Bukti Transfer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Terkonfirmasi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Dikonfirmasi oleh
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Jadwal Tes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Method ujian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                    Batal
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {data?.data?.data?.map((dt, index) => (
                  <tr
                    key={index}
                    className={
                      Number(dt.is_batal) === 1
                        ? "bg-red-100"
                        : "hover:bg-gray-50"
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(page - 1) * per_page + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dt.name} {dt?.device === null ? "" : "-R"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dt.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <ReactWhatsapp
                        number={formatNomorHp(dt.phone)}
                        message={"bismillah"}
                      >
                        <p className="hover:text-green-500 hover:font-bold">
                          {formatNomorHp(dt.phone)}
                        </p>
                      </ReactWhatsapp>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(dt.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dt.bukti === null ? "-" : "Sudah Upload"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dt.bukti === null ? (
                        "-"
                      ) : (
                        <a
                          target="_blank"
                          className="text-green-600 hover:text-green-800 font-medium"
                          href={dt.bukti?.url_img}
                          rel="noreferrer"
                        >
                          Lihat Bukti
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dt.bukti === null ? (
                        "-"
                      ) : (
                        <Button
                          disabled={dt.bukti?.status === 0 ? false : true}
                          onClick={() => {
                            setIsLoadingKonfirmasi(true);
                            updateStatus(dt.bukti?.user_id);
                            // return sendMessageBukti(dt?.device);
                          }}
                          colorScheme={dt.bukti?.status === 0 ? "red" : "green"}
                          size="sm"
                          isLoading={isLoadingKonfirmasi}
                        >
                          {dt.bukti?.status === 0 ? "Belum" : "Sudah"}
                        </Button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dt?.bukti?.approved_by || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dt?.tes_diniyyah === null ? (
                        <span className="text-red-500 italic">
                          Belum Membuat Jadwal
                        </span>
                      ) : (
                        formatTanggal(dt?.tes_diniyyah?.tanggal)
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dt?.tes_diniyyah === null ? (
                        <span className="text-red-500 italic">-</span>
                      ) : dt?.tes_diniyyah?.metode === 1 ? (
                        "Offline"
                      ) : (
                        "Online"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dt.is_batal === 1 ? (
                        <span className="text-red-600 font-bold">
                          DIBATALKAN
                        </span>
                      ) : (
                        <Button
                          onClick={() => handleBatal(dt.id)}
                          colorScheme="red"
                          size="sm"
                        >
                          Batal
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {data?.data?.total > per_page && (
              <Box p={4} borderTopWidth="1px">
                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(data?.data?.total / per_page)}
                  onPageChange={handlePageChange}
                />
              </Box>
            )}
          </Box>
        )}

        {/* Upload Bukti Modal */}
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
                  <h1 className="uppercase mb-5 font-bold text-green-500 text-center">
                    Form Upload Bukti Transfer pembayaran PSB
                  </h1>
                  <div className="mb-5">
                    <label
                      className="font-bold mb-5 text-green-500"
                      htmlFor="penghasilan_ayah"
                    >
                      <span className="uppercase">Nama Akun</span>{" "}
                      <span className="italic text-md text-red-500">
                        (wajib)
                      </span>
                    </label>
                    <Select
                      placeholder="Pilih Nama Akun"
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
                      {errors.nominal && touched.nominal && (
                        <p className="text-red-500 italic font-bold text-sm mt-1">
                          {errors.nominal}
                        </p>
                      )}
                    </Input>
                  </div>
                  <label
                    className="font-bold mb-5 text-green-500"
                    htmlFor="penghasilan_ayah"
                  >
                    <span className="uppercase">File Bukti</span>{" "}
                    <span className="italic text-md text-red-500">(wajib)</span>
                  </label>
                  <div>
                    <Dropzone
                      onDrop={(acceptedFiles) => {
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
                      className="bg-green-500 w-full flex items-center justify-center text-white py-3 font-bold rounded hover:bg-green-600"
                      type="submit"
                    >
                      {isLoading ? (
                        <Loading></Loading>
                      ) : (
                        "Upload Bukti Transfer"
                      )}
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </Modal>
      </Box>
    </React.Fragment>
  );
}
