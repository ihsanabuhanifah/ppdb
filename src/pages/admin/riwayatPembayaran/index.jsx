import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Collapse } from "@chakra-ui/react";
import Pagination from "../../../components/Pagination";
import PaginationInfo from "../../../components/paginationInfo";
import TableHeader from "../../../components/TableHeader";
import LoadingBar from "../../../components/loadingBar";
import { Link, useHistory } from "react-router-dom";
import ReactWhatsapp from "react-whatsapp";
import { formatTanggal, formatNomorHp } from "../../../utils";
import {
  getJadwal,
  updateStatusTes,
  updateStatusKelulusan,
  getBuktiAll,
  getStatusBukti
} from "../../../api/admin";

import { formatDate } from "../../../utils";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useToast } from "@chakra-ui/react";
import useDebounce from "../../../hooks/useDebounce";
import swal from "sweetalert";
import { formatRupiah } from "../../../utils/formatRupiah";
import TableLoading from "../../../components/tableLoading";
import { sendMessageBukti } from "../../../config/sendMessage";
export default function RiwayatPembayaran() {
  const [page, setPage] = React.useState(1);
  const [per_page, setPer_page] = React.useState(100);
  const [isLoadingKonfirmasi, setIsLoadingKonfirmasi] = React.useState(false);
  const [isLoadingKelulusan, setIsLoadingKelulusan] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [indexSelect, setIndexSelect] = React.useState(null);
  const [indexKelulusan, setIndexKelulusan] = React.useState(null);
  let debouncedKeyword = useDebounce(keyword, 500);
  const [statusBukti, setStatusBukti] = React.useState("");
  let queryClient = useQueryClient();
  const { isLoading, isError, data, isFetching } = useQuery(
    //query key
    [
      "pembayaran_ppdb",
      {
        page: page,
        per_page: per_page,
        search: debouncedKeyword,
      },
    ],

    () =>
      getBuktiAll({
        page: page,
        per_page: per_page,
        keyword: debouncedKeyword,
      }),

    {
      keepPreviousData: true,
      select: (response) => {
        let result = response.data
        
        let total = 0
        return {
          data: result,
          // bukti: bukti,
        };
      }
    }
  );

  let toast = useToast();
  const updateStatus = async (id) => {
    let result = await getStatusBukti(id);

    queryClient.invalidateQueries("pembayaran_ppdb");
    if (result?.status === "success") {
      toast({
        position: "top-right",
        title: "Berhasil",
        description: "Update Status",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setIsLoadingKonfirmasi(false);
      setIndexSelect(null);
    }
  };
  const updateStatusLulus = async (id, status) => {
    let result = await updateStatusKelulusan(id, status);

    queryClient.invalidateQueries("jadwal_tes");
    if (result?.status === "success") {
      toast({
        position: "top-right",
        title: "Berhasil",
        description: "Update Status",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setIsLoadingKelulusan(false);
      setIndexKelulusan(null);
    }
  };

  console.log(data);

  return (
    <div className="text-green-500 grid grid-cols-1 gap-5 ">
      <div className="border-b-2 pb-10">
        <h1 className="text-2xl  font-semibold">
          DAFTAR JADWAL TES PPDB MAN 2 KOTA SUKABUMI
        </h1>
        
      </div>
      {/* table */}
      <div className="p-1 ">
        <TableHeader
          setKeyword={setKeyword}
          setPer_page={setPer_page}
        ></TableHeader>
        <div className="flex justify-end">
        <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn border py-2 px-3 font-bold  rounded-md bg-green-500 text-white"
                    table="table-to-xls"
                    filename={`Data-Transfer-PPDB-SMKMQ ${formatDate(new Date())}`}
                    sheet="tablexls"
                    buttonText="Import ke Excel"/>
        </div>
      </div>
      {isFetching ? <TableLoading></TableLoading> : <div className="overflow-auto">
      <table id="table-to-xls"  className="p-1 w-full ">
        <thead>
          <tr className="uppercase">
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">No</div>
            </th>

            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">Nama Siswa</div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">Sekolah Asal</div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">Nama Ayah</div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">Nomor Handphone</div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">
                Status Validasi
              </div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">Bukti</div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500  border-gray-500">
              <div className="text-sm leading-5 text-green-500">Diperiksa Oleh</div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500  border-gray-500">
              <div className="text-sm leading-5 text-green-500">Nominal</div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">
               Keterangan
              </div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">
              Tanggal Transfer
              </div>
            </th>

            {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                  Created_At
                </th> */}
          </tr>
        </thead>{" "}
        <tbody className="bg-white relative">
            {}
            {data?.data?.data?.data?.map((dt, index) => (
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
                    {dt?.name_siswa}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                    {dt?.asal_sekolah}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                    {dt?.name_ayah}
                  </div>
                </td> 
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <ReactWhatsapp
                        number={formatNomorHp(dt?.phone)}
                        message={"bismillah"}
                      >
                        <p className="hover:text-green-500 hover:font-bold hover:text-lg">
                          {formatNomorHp(dt?.phone)}
                        </p>
                      </ReactWhatsapp>
                </td> 
                
                <td className="px-6 py-4  border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {dt.bukti === null ? (
                    "-"
                  ) : (
                    <button
                      disabled={dt?.status === 0 ? false : true}
                      onClick={() => {
                        setIsLoadingKonfirmasi(true);
                        updateStatus(dt?.id);
                        sendMessageBukti(dt?.device)
                      }}
                      className={`0 font-bold p-2 ${
                        dt?.status === 0
                          ? "bg-red-500 hover:bg-red-500"
                          : "bg-green-500 hover:bg-green-600"
                      } rounded-md text-white`}
                    >
                      {isLoadingKonfirmasi
                        ? "Memperbaharui"
                        : dt?.status === 0
                        ? "Belum"
                        : "Sudah"}
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                  <a
                      target="_blank"
                      className="hover:text-green-500 font-bold"
                      href={dt.url_img}
                    >
                      Lihat Bukti
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                    {dt?.approved_by}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                    {dt?.nominal === null ? formatRupiah(350000) : formatRupiah(dt?.nominal)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                    {dt?.nominal === 350000 ? 'Uang Pendaftaran' : 'Pembayaran Uang Masuk'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                   {formatDate(dt?.created_at)}
                  </div>
                </td>
              </tr>
            ))}
             <tr className="hover:bg-gray-200 text-xl font-bold">
                <td colSpan={7} className="px-6 py-4  whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm text-center  leading-5 text-green-500">
                       TOTAL PEMBAYARAN
                      </div>
                    </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-green-500">
                      {/* {formatRupiah(total)} */}
                    </div>
                  </td>
                </tr>
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
