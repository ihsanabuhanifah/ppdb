import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Collapse } from "@chakra-ui/react";
import Pusher from "pusher-js";
import Pagination from "../../../components/Pagination";
import PaginationInfo from "../../../components/paginationInfo";
import TableHeader from "../../../components/TableHeader";
import LoadingBar from "../../../components/loadingBar";
import { Link, useHistory } from "react-router-dom";
import { getUser } from "../../../api/admin";
import { konfirmBukti } from "../../../api/admin";
import { formatDate, formatTanggal, formatNomorHp } from "../../../utils";
import ReactWhatsapp from "react-whatsapp";
import { useToast } from "@chakra-ui/react";
import useDebounce from "../../../hooks/useDebounce";
import TableLoading from "../../../components/tableLoading";
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
  const { isLoading, isError, data, isFetching } = useQuery(
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
      select: (response) => {
        let result = response.data;

        let bukti = 0;
        result?.data?.map((rs) => {
          if (rs?.bukti !== null) {
            bukti = bukti + 1;
          }
        });
        return {
          data: result,
          bukti: bukti,
        };
      },
    }
  );

  let toast = useToast();
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


 
  return (
    <div className="text-green-500 grid grid-cols-1 gap-5">
    
      <div className="border-b-2 pb-10">
        <h1 className="text-2xl  font-semibold">
          DAFTAR USER PORTAL PPDB SMK MADINATULQURAN
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
        {show ? " Sembunyikan Detail Informasi" : " Tampilkan Detail Informasi"}
      </button>
      <Collapse in={show} animateOpacity>
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
      </Collapse>
      <div className="p-1n ">
        <TableHeader
          setKeyword={setKeyword}
          setPer_page={setPer_page}
        ></TableHeader>
      </div>
{isFetching ?  <TableLoading></TableLoading> :  <div className="p-1  overflow-auto ">
        <table className="min-w-full relative ">
          <thead>
            <tr className="uppercase">
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-green-500 tracking-wider">
                No
              </th>

              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Nomor HP
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Jam Daftar
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Status Transfer
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Bukti Transfer
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Terkonfirmasi
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Jadwal Tes
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Method ujian
              </th>
             
              {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                  Created_At
                </th> */}
            </tr>
          </thead>{" "}
          <tbody className="bg-white relative">
            {}
            {data?.data?.data?.map((dt, index) => (
              <tr key={index} className="hover:bg-gray-200">
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
                  <ReactWhatsapp number={formatNomorHp(dt.phone)} message={"bismillah"}>
                    <p className="hover:text-green-500 hover:font-bold hover:text-lg">
                      {formatNomorHp(dt.phone)}
                    </p>
                  </ReactWhatsapp>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {formatDate(dt.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {dt.bukti === null ? "-" : <p>Sudah Upload</p>}
                </td>
                <td className="px-6 py-4  border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {dt.bukti === null ? (
                    "-"
                  ) : (
                    <a
                      target="_blank"
                      className="hover:text-green-500 font-bold"
                      href={dt.bukti?.url_img}
                    >
                      Lihat Bukti
                    </a>
                  )}
                </td>
                <td className="px-6 py-4  border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {dt.bukti === null ? (
                    "-"
                  ) : (
                    <button
                      disabled={dt.bukti?.status === 0 ? false : true}
                      onClick={() => {
                        setIsLoadingKonfirmasi(true);
                        updateStatus(dt.bukti?.user_id);
                      }}
                      className={`0 font-bold p-2 ${
                        dt.bukti?.status === 0
                          ? "bg-red-500 hover:bg-red-500"
                          : "bg-green-500 hover:bg-green-600"
                      } rounded-md text-white`}
                    >
                      {isLoadingKonfirmasi
                        ? "Memperbaharui"
                        : dt.bukti?.status === 0
                        ? "Belum"
                        : "Sudah"}
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {dt?.tes_diniyyah === null ? (
                    <p className="text-red-500 italic">Belum Membuat Jadwal</p>
                  ) : (
                    formatTanggal(dt?.tes_diniyyah?.tanggal)
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {dt?.tes_diniyyah === null ? (
                    <p className="text-red-500 italic">-</p>
                  ) : dt?.tes_diniyyah?.metode === 1 ? (
                    "Offline"
                  ) : (
                    "Online"
                  )}
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>

       

        <div className="flex items-center justify-between mt-5 text-green-500">
          <PaginationInfo
            totalItems={5}
            currentPage={1}
            pageSize={per_page}
          ></PaginationInfo>
          {/* <Pagination
            totalItems={20}
            currentPage={1}
            pageSize={pageSize}
          ></Pagination> */}
        </div>
      </div>}
    
      {/* table */}
    </div>
  );
}
