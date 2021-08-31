import React from "react";
import { useQuery } from "react-query";
import { Collapse } from "@chakra-ui/react";
import Pagination from "../../../components/Pagination";
import PaginationInfo from "../../../components/paginationInfo";
import TableHeader from "../../../components/TableHeader";
import { Link, useHistory } from "react-router-dom";
import { getUser } from "../../../api/admin";
import { formatDate } from "../../../utils";
import ReactWhatsapp from "react-whatsapp";
export default function Pendaftar() {
 
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [keyword, setKeyword] = React.useState("")
  const { isLoading, isError, data, isFetching } = useQuery(
    //query key
    [
      "list_user",
      {
        page: page,
        limit: pageSize,
        keyword: keyword,
      },
    ],

    () =>
      getUser({
        page: page,
        limit: pageSize,
        keyword: keyword,
      }),

    {
      keepPreviousData: true,
      select: (response) => response.data,
    }
  );

  console.log(data)
  return (
    <div className="text-green-500 grid grid-cols-1 gap-5">
      <div className="border-b-2 pb-10">
        <h1 className="text-2xl  font-semibold">
          DAFTAR USER PORTAL PPDB SMK MADINATULQURAN
        </h1>
      </div>
      {/* table */}
     <div className="p-1n ">
     <TableHeader></TableHeader>
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
                Konfirmasi
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Jadwal Tes
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                Kirim Jadwal
              </th>
              {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-green-500 tracking-wider">
                  Created_At
                </th> */}
            </tr>
          </thead>{" "}
          <tbody className="bg-white relative">
            {}
            {data?.data?.map((dt, index) => (
              <tr key={index} className="hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm leading-5 text-gray-800">{(page - 1) * pageSize + index + 1}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">{dt.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {dt.email}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                <ReactWhatsapp number={"+6285888222457"} message={"bismillah"}>
                  <button className="hover:text-green-500 hover:font-bold hover:text-lg">{dt.phone}</button>
         
        </ReactWhatsapp>
                 
               
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {formatDate(dt.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  pl
                </td>
                <td className="px-6 py-4  border-b text-blue-900 border-gray-500 text-sm leading-5">
                  poook
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  pl
                </td>
                <td className="px-6 py-4  border-b text-blue-900 border-gray-500 text-sm leading-5">
                  poook
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between mt-5 text-green-500">
          <PaginationInfo
            totalItems={5}
            currentPage={1}
            pageSize={pageSize}
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
