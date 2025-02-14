import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Button, Collapse, useDisclosure } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
import PaginationTable, {
  Pagination,
} from "../../../components/PaginationTable";
import { sendMessageBukti } from "../../../config/sendMessage";
let fileSchema = Yup.object().shape({
  files: Yup.string().required("Bukti Transfer wajib di Upload"),
  nominal: Yup.string().required("Nominal wajib diisi"),
});
export default function Pendaftar() {
  const [page, setPage] = React.useState(1);

  const [per_page, setPer_page] = React.useState(100);
  const [isLoadingKonfirmasi, setIsLoadingKonfirmasi] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const history = useHistory();
  let debouncedKeyword = useDebounce(keyword, 500);

  const { data, isFetching } = useQuery(
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

  const { isOpen, onOpen, onClose } = useDisclosure();

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
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-400 tracking-wider">
                    Foto
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-400 tracking-wider">
                    Nomor Pendaftaran
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-400 tracking-wider">
                    Jalur Seleksi
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Nama Lengkap
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    NISN
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Gelombang
                  </th>

                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Nomor Utama
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Jenis Sekolah
                  </th>

                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Asal Sekolah
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-400 tracking-wider">
                    Diperbaharui
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
                          <div className="text-lg leading-5 text-gray-800">
                            {(page - 1) * per_page + index + 1}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="text-lg leading-5 text-blue-900">
                        {dt.foto_profile ? (
                          <img
                            className="h-20 w-20 bg-gray-400 border rounded-full"
                            src={dt.foto_profile}
                          />
                        ) : (
                          <div className="h-20 w-20 bg-gray-400 border rounded-full"></div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-lg whitespace-no-wrap border-b text-gray-700 border-gray-500 leading-5">
                      {dt.nomor_pendaftaran}
                    </td>
                    <td className="px-6 py-4 text-lg whitespace-no-wrap border-b text-gray-700 border-gray-500 leading-5">
                      {dt.jalur_seleksi || "-"}
                    </td>
                    <td className="px-6 py-4 text-lg whitespace-no-wrap border-b text-gray-700 border-gray-500 leading-5">
                      {dt.name}
                    </td>
                    <td className="px-6 py-4 text-lg whitespace-no-wrap border-b text-gray-700 border-gray-500 leading-5">
                      {dt.nisn}
                    </td>
                    <td className="px-6 py-4 text-center text-lg whitespace-no-wrap border-b text-gray-700 border-gray-500 leading-5">
                      {dt.gelombang}
                    </td>

                    <td className="px-6 py-4 text-lg whitespace-no-wrap border-b text-gray-700 border-gray-500 leading-5">
                      <ReactWhatsapp
                        number={formatNomorHp(dt.phone)}
                        message={"bismillah"}
                      >
                        <p className="hover:text-blue-400 hover:font-bold hover:text-lg">
                          {formatNomorHp(dt.phone)}
                        </p>
                      </ReactWhatsapp>
                    </td>

                    <td className="px-6 py-4 text-lg whitespace-no-wrap border-b text-gray-700 border-gray-500 leading-5">
                      {dt.jenis_sekolah}
                    </td>
                    <td className="px-6 py-4 text-lg whitespace-no-wrap border-b text-gray-700 border-gray-500 leading-5">
                      {dt.asal_sekolah}
                    </td>
                    <td className="px-6 py-4 text-center text-lg whitespace-no-wrap border-b text-gray-700 border-gray-500 leading-5">
                      {formatDateInd(dt.updated_at)}
                    </td>

                    <td className="px-6 py-4 text-lg whitespace-no-wrap border-b text-gray-700 border-gray-500  leading-5">
                      <Button
                        colorPalette="teal"
                        variant="solid"
                        onClick={() => {
                          history.push(`pendaftar/${dt.id}/detail`);
                        }}
                      >
                        {" "}
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
             pagination={{
              page : data?.data?.current_page,
              total : data?.data?.total,
              pageSize : Number(data?.data?.perpage || 10)
             }}
              page={page}
              handlePage={(id) => {
                setPage(id);
              }}
              pageSize={per_page}
              handlePageSize={(e) => {
                setPer_page(e.target.value);
              }}
            />
          </div>
        )}

        {/* table */}
      </div>
      <Modal onOpen={onOpen} onClose={onClose} isOpen={isOpen}></Modal>
    </React.Fragment>
  );
}

export const formatDateInd = (isoString) => {
  if (!isoString) return "-";

  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Format 24 jam
  };

  return new Date(date).toLocaleDateString("id-ID", options);
};
