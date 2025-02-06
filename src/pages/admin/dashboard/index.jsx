import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Collapse, useDisclosure } from "@chakra-ui/react";

import Dropzone from "react-dropzone";
import { Formik } from "formik";

import Loading from "../../../components/loading";
import Input from "../../../components/Input";

import TableHeader from "../../../components/TableHeader";

import { getUser } from "../../../api/admin";
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
export default function Dashboard() {
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

  console.log(data);
  return (
    <React.Fragment>
      <div className="text-blue-400 grid grid-cols-1 gap-5">
        <div className="border-b-2 pb-10">
          <h1 className="text-2xl  font-semibold">
            DAFTAR USER PORTAL PPDB MAN 2 KOTA SUKABUMI
            </h1>
        </div>
        {/* table */}
        <button
          className="font-bold uppercase"
          type="button"
          variantColor="blue"
          onClick={() => {
            handleToggle();
            return console.log(show);
          }}
        >
          Statistik Pendaftar PPDB Tahun Pelajaran 2023/2024
        </button>
       
          <div className="grid grid-cols-3 gap-5">
            <div className="p-2 border w-full">
              <label className="font-bold uppercase" htmlFor="">
                Jumlah <span className="text-red-500">Pendaftar</span>
              </label>
              <br />
              <input
                className="bg-white w-full"
                type="text"
                disabled
                value={`${data?.data?.total} Santri`}
              />
            </div>
            <div className="p-2 border w-full">
              <label className="font-bold uppercase" htmlFor="">
                Jumlah{" "}
                <span className="text-red-500">Pendaftar sudah transfer</span>
              </label>
              <br />
              <input
                className="bg-white w-full"
                type="text"
                disabled
                value={`${data?.bukti} Santri`}
              />
            </div>
            <div className="p-2 border w-full">
              <label className="font-bold uppercase" htmlFor="">
                Jumlah{" "}
                <span className="text-red-500">Pendaftar belum transfer</span>
              </label>
              <br />
              <input
                className="bg-white w-full"
                type="text"
                disabled
                value={`${data?.data?.total - data?.bukti} Santri`}
              />
            </div>
          </div>
      
        
       

        {/* table */}
      </div>
      
    </React.Fragment>
  );
}
