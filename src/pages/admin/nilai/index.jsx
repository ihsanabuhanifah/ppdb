import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Collapse } from "@chakra-ui/react";
import Pagination from "../../../components/Pagination";
import PaginationInfo from "../../../components/paginationInfo";
import TableHeader from "../../../components/TableHeader";
import LoadingBar from "../../../components/loadingBar";
import { Link, useHistory } from "react-router-dom";
import { getNilai } from "../../../api/admin";
import { konfirmBukti } from "../../../api/admin";
import { formatDate } from "../../../utils";
import ReactWhatsapp from "react-whatsapp";
import { useToast } from "@chakra-ui/react";
import useDebounce from "../../../hooks/useDebounce";
export default function Nilai() {
  const [page, setPage] = React.useState(1);
  const [per_page, setPer_page] = React.useState(100);
  const [isLoadingKonfirmasi, setIsLoadingKonfirmasi] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  let debouncedKeyword = useDebounce(keyword, 500);
  const [statusBukti, setStatusBukti] = React.useState("");
  let queryClient = useQueryClient();
  const { isLoading, isError, data, isFetching } = useQuery(
    //query key
    [
      "list_nilai",
      {
        page: page,
        per_page: per_page,
        search: debouncedKeyword,
      },
    ],

    () =>
      getNilai({
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
    queryClient.invalidateQueries("provider_document");
    queryClient.invalidateQueries("list_nilai");
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

  const nilaiHandle = (kode, nilai) => {
    if (kode === "Tes001") {
      return Math.ceil(nilai);
    }
    if (kode === "Tes002") {
      return Math.ceil(nilai);
    }
    if (kode === "Tes003") {
      return Math.ceil(nilai);
    }
    if (kode === "Tes004") {
      return Math.ceil(nilai);
    }
  };
  return (
    <div className="text-green-500 grid grid-cols-1 gap-5">
      <div className="border-b-2 pb-10">
        <h1 className="text-2xl  font-semibold">
          DAFTAR NILAI TES UMUM PPDB SMK MADINATULQURAN
        </h1>
      </div>
      {/* table */}
      <div className="p-1n ">
        <TableHeader
          setKeyword={setKeyword}
          setPer_page={setPer_page}
        ></TableHeader>
      </div>
      <div className="p-1  overflow-auto ">
      
          <thead>
            <tr className="uppercase">
              <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
                <div className="text-sm leading-5 text-green-500">No</div>
              </th>

             
              <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
                <div className="text-sm leading-5 text-green-500">
                  Nama Siswa
                </div>
              </th>
              <th className="px-6 py-4 whitespace-no-wrap border-b text-left  text-green-500 border-gray-500">
                <div className="text-sm leading-5 text-green-500">
                  Nilai Matematika
                </div>
              </th>
              <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500  border-gray-500">
                <div className="text-sm leading-5 text-green-500">
                  nilai Diniyah Dasar
                </div>
              </th>
              <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
                <div className="text-sm leading-5 text-green-500">
                  Nilai Tes Analogi
                </div>
              </th>

              <th className="px-6 py-4 whitespace-no-wrap border-b text-left text-green-500 border-gray-500">
                <div className="text-sm leading-5 text-green-500">
                  Nilai Bahasa Imggris
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
            {data?.data?.map((dt, index) => {
                if(dt.calon_siswa !== null ){
                    return (  <tr key={index} className="hover:bg-gray-200">
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
                        {dt.calon_siswa?.name_siswa}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {nilaiHandle(
                          dt.tes_masuk[0]?.kode_mapel,
                          dt.tes_masuk[0]?.nilai
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {nilaiHandle(
                          dt.tes_masuk[1]?.kode_mapel,
                          dt.tes_masuk[1]?.nilai
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {nilaiHandle(
                          dt.tes_masuk[2]?.kode_mapel,
                          dt.tes_masuk[2]?.nilai
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-sm leading-5 text-blue-900">
                        {nilaiHandle(
                          dt.tes_masuk[3]?.kode_mapel,
                          dt.tes_masuk[3]?.nilai
                        )}
                      </div>
                    </td>
                  </tr>)
                }
            })}
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
