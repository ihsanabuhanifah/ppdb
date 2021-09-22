import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Collapse } from "@chakra-ui/react";
import Pagination from "../../../components/Pagination";
import PaginationInfo from "../../../components/paginationInfo";
import TableHeader from "../../../components/TableHeader";
import LoadingBar from "../../../components/loadingBar"
import { Link, useHistory } from "react-router-dom";
import { getUser } from "../../../api/admin";
import { konfirmBukti } from "../../../api/admin";
import { formatDate } from "../../../utils";
import ReactWhatsapp from "react-whatsapp";
import { useToast } from "@chakra-ui/react";
import useDebounce from "../../../hooks/useDebounce"
export default function Pendaftar() {
  const [page, setPage] = React.useState(1);
 ;
  const [per_page, setPer_page] = React.useState(10)
  const [isLoadingKonfirmasi, setIsLoadingKonfirmasi] = React.useState(false)
  const [keyword, setKeyword] = React.useState("");
  let debouncedKeyword = useDebounce(keyword, 500);
  const [statusBukti, setStatusBukti] = React.useState("");
  const [transfer, setTransfer] = React.useState(0)
  let queryClient = useQueryClient();
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
      select: (response) => response.data,
    }
  );

  let toast = useToast();
  const updateStatus = async (id) => {
    let result = await konfirmBukti(id);
    queryClient.invalidateQueries("provider_document")
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
      setIsLoadingKonfirmasi(false)
    }
  };

  
  console.log(data);
  return (
    <div className="text-green-500 grid grid-cols-1 gap-5">
      <div className="border-b-2 pb-10">
        <h1 className="text-2xl  font-semibold">
          DAFTAR USER PORTAL PPDB SMK MADINATULQURAN
        </h1>
      </div>
      {/* table */}
      <div className="p-1n ">
        <TableHeader setKeyword={setKeyword} setPer_page={setPer_page}></TableHeader>
      </div>
      <div className="grid grid-cols-3 gap-5">
       <div className="p-2 border w-full" >
       <label className="font-bold uppercase" htmlFor="">Jumlah Pendaftar</label>
       <br />
       <input className="bg-white w-full" type="text" disabled value={`${data?.total} Santri`} />
       </div>
       <div className="p-2 border w-full" >
       <label className="font-bold uppercase" htmlFor="">Jumlah Pendaftar sudah transfer</label>
       <br />
       <input className="bg-white w-full" type="text" disabled value={`${data?.total} Santri`} />
       </div>
        
      </div>
      <div className="p-1  overflow-auto ">
     
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
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Kirim Jadwal
              </th>
              {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                  Created_At
                </th> */}
            </tr>
          </thead>{" "}
         
        </table>

        {isFetching ? (<LoadingBar></LoadingBar>) : ( <tbody className="bg-white relative">
            {}
            {data?.data?.map((dt, index) => (
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
                  <ReactWhatsapp number={dt.phone} message={"bismillah"}>
                    <p className="hover:text-green-500 hover:font-bold hover:text-lg">
                      {dt.phone}
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
                        setIsLoadingKonfirmasi(true)
                        updateStatus(dt.bukti?.user_id);
                      }}
                      className={`0 font-bold p-2 ${
                        dt.bukti?.status === 0
                          ? "bg-red-500 hover:bg-red-500" 
                          : "bg-green-500 hover:bg-green-600"
                      } rounded-md text-white`}
                    >
                      {isLoadingKonfirmasi ? "Memperbaharui" : dt.bukti?.status === 0 ? "Belum" : "Sudah"}
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                {dt?.tes_diniyyah === null ? (<p className="text-red-500 italic">Belum Membuat Jadwal</p>) : formatDate(dt?.tes_diniyyah?.tanggal)}
               
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                {dt?.tes_diniyyah === null ? (<p className="text-red-500 italic">-</p>) : dt?.tes_diniyyah?.metode === 1 ? 'Offline' : 'Online'}
               
                </td>
                <td className="px-6 py-4  border-b text-blue-900 border-gray-500 text-sm leading-5">
                  poook
                </td>
              </tr>
            ))}
          </tbody>)}

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
      </div>
      {/* table */}
    </div>
  );
}
