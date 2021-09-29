import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Collapse } from "@chakra-ui/react";
import Pagination from "../../../components/Pagination";
import PaginationInfo from "../../../components/paginationInfo";
import TableHeader from "../../../components/TableHeader";
import LoadingBar from "../../../components/loadingBar";
import { Link, useHistory } from "react-router-dom";
import {
  getJadwal,
  updateStatusTes,
  updateStatusKelulusan,
} from "../../../api/admin";
import { konfirmBukti } from "../../../api/admin";
import { formatDate } from "../../../utils";
import ReactWhatsapp from "react-whatsapp";
import { useToast } from "@chakra-ui/react";
import useDebounce from "../../../hooks/useDebounce";
import swal from "sweetalert";
export default function JadwalTes() {
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
      "jadwal_tes",
      {
        page: page,
        per_page: per_page,
        search: debouncedKeyword,
      },
    ],

    () =>
      getJadwal({
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
    let result = await updateStatusTes(id);

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
          DAFTAR JADWAL TES PPDB SMK MADINATULQURAN
        </h1>
      </div>
      {/* table */}
      <div className="p-1n ">
        <TableHeader
          setKeyword={setKeyword}
          setPer_page={setPer_page}
        ></TableHeader>
      </div>
      <div className="p-1  overflow-auto w-full ">
        <thead>
          <tr className="uppercase">
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">No</div>
            </th>

            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">Nama Siswa</div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">
                Tanggal Tes
              </div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">Metode</div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500  border-gray-500">
              <div className="text-sm leading-5 text-green-500">Status Tes</div>
            </th>
            <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
              <div className="text-sm leading-5 text-green-500">
                Status Kelulusan
              </div>
            </th>

            {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                  Created_At
                </th> */}
          </tr>
        </thead>{" "}
        {isFetching ? (
          <LoadingBar></LoadingBar>
        ) : (
          <tbody className="bg-white relative">
            {}
            {data?.map((dt, index) => (
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
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                    {dt?.tes_diniyyah === undefined ? (
                      <p className="text-red-500 font-bold italic text-xs">
                        Belum buat jadwal
                      </p>
                    ) : (
                      formatDate(dt?.tes_diniyyah?.tanggal)
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                    {dt?.tes_diniyyah === undefined
                      ?  <p className="text-red-500 font-bold italic text-xs">
                      Belum buat jadwal
                    </p> : dt?.tes_diniyyah?.metode === 1
                        ? <span className="uppercase font-bold text-blue-500"> Offline</span>
                        :  <span className="uppercase font-bold text-green-500"> Online</span>
                     }
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                    {dt?.tes_diniyyah === undefined ? (
                      <p className="text-red-500 font-bold italic text-xs">
                        Belum buat jadwal
                      </p>
                    ) : (
                      <button
                        disabled={dt?.tes_diniyyah?.status === 1}
                        onClick={() => {
                          swal({
                            title: "perbaharui Status?",
                            text: "Pilih Ok jika yakin untuk mengupdate status!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          }).then((willDelete) => {
                            if (willDelete) {
                              setIsLoadingKonfirmasi(true);
                              setIndexSelect(index);
                              updateStatus(dt?.id);
                            }
                          });
                        }}
                        className={`${
                          dt?.tes_diniyyah?.status === 0
                            ? "bg-red-500"
                            : "bg-blue-500"
                        } text-white px-2 py-1 rounded-sm font-bold`}
                      >
                        {dt?.tes_diniyyah?.status === 0
                          ? isLoadingKonfirmasi
                            ? indexSelect === index
                              ? "Mengupdate Status"
                              : "Belum Tes"
                            : "Belum Tes"
                          : "Sudah Tes"}
                      </button>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                    {dt?.tes_diniyyah === undefined ? (
                      <p className="text-red-500 font-bold italic text-xs">
                        Belum buat jadwal
                      </p>
                    ) : (
                      <button
                        disabled={dt?.tes_diniyyah?.status === 0 ? true : false}
                        onClick={() => {
                          swal(`Apakah ananda ${dt.name} dinyatakan Lulus ? `, {
                            buttons: {
                              cancel: "Cancel",
                              lulus: {
                                text: "Lulus",
                                value: "lulus",
                              },
                              tidak: {
                                text: "Tidak Lulus",
                                value: "tidak",
                                color: "red",
                              },
                            },
                          }).then((value) => {
                            switch (value) {
                              case "lulus":
                                setIsLoadingKelulusan(true);
                                setIndexKelulusan(index);
                                updateStatusLulus(dt?.id, 1);
                                break;

                              case "tidak":
                                setIsLoadingKelulusan(true);
                                setIndexKelulusan(index);
                                updateStatusLulus(dt?.id, 2);
                                break;

                              default:
                            }
                          });
                        }}
                        className={`${
                          dt?.tes_diniyyah?.kelulusan === null &&
                          dt?.tes_diniyyah?.status === 0
                            ? "bg-red-200"
                            : (dt?.tes_diniyyah?.kelulusan === "1") &
                              (dt?.tes_diniyyah?.status === 1)
                            ? "bg-blue-500"
                            : dt?.tes_diniyyah?.kelulusan === "2" &&
                              dt?.tes_diniyyah?.status === 1
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        } text-white px-2 py-1 rounded-sm font-bold`}
                      >
                        {isLoadingKelulusan && index === indexKelulusan
                          ? "Meng=update Status"
                          : dt?.tes_diniyyah?.kelulusan === null &&
                            dt?.tes_diniyyah?.status === 0
                          ? "Belum Tes"
                          : dt?.tes_diniyyah?.kelulusan === null &&
                            dt?.tes_diniyyah?.status === 1
                          ? "Belum diumukan "
                          : dt?.tes_diniyyah?.kelulusan === "1"
                          ? "Lulus"
                          : "Tidak Lulus"}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
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
