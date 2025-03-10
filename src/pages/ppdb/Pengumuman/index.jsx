import { useEffect, useState } from "react";
import { Upload, Eye, AlertCircle } from "lucide-react";
import { getDetail, uploadFileFoto } from "../../../api/santri";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useQuery } from "react-query";
import {
  Spinner,
  useDisclosure,
  useToast,
  Text,
  Flex,
  Center,
  VStack,
} from "@chakra-ui/react";

export default function Pengumuman() {
  const [files, setFiles] = useState({
    foto_profile: null,
    foto_kks: null,
    foto_pkh: null,
    foto_kip: null,
    dokumen_prestasi: null,
  });

  const { isError, data, isFetching } = useQuery(
    //query key
    ["detail", []],

    () => getDetail(),

    {
      staleTime: 1000 * 60 * 60,
      keepPreviousData: true,
      select: (response) => response.data,
    }
  );

  console.log("Data", data);

  useEffect(() => {
    setFiles((prev) => ({
      ...prev,
      foto_profile: data?.foto_profile,
      foto_kks: data?.foto_kks,
      foto_pkh: data?.foto_pkh,
      foto_kip: data?.foto_kip,
      dokumen_prestasi: data?.dokumen_prestasi,
    }));
  }, [data]);

  console.log("data", data);
  if (isFetching) {
    return (
      <Center height="100vh">
        <VStack spacing={4}>
          <Spinner size="lg" />
          <Text> Sedang Memuat Data...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <div className=" mx-auto bg-white rounded-2xl shadow-lg p-6">
      <div className="text-center mb-5">
        <h2 className="text-3xl text-blue-500 font-bold uppercase">
          Pengumuman Kelulusan
        </h2>
      </div>
      <div>
        {!!data?.tes?.nilai_tes_akademik === false &&
        !!data?.tes?.nilai_tes_bidang_studi === false &&
        !!data?.tes?.nilai_wawancara === false &&
        !!data?.nilai?.berkas_nilai === false &&
        data?.nilai?.cbt_penilaian !== "Telah Dites" ? (
          <h3 className="text-lg text-center font-bold text-gray-600">
            Belum Ada Pengumuman Kelulusan
          </h3>
        ) : (
          <>
            {!!data?.tes?.nilai_tes_akademik === true &&
            !!data?.tes?.nilai_tes_bidang_studi === true &&
            !!data?.tes?.nilai_wawancara === true &&
            data?.nilai?.berkas_nilai === "Sesuai" &&
            data?.nilai?.cbt_penilaian === "Telah Dites" ? (
              <>
                <div className="text-center mt-5">
                  <h1 className="text-gray-500 text-3xl font-bold">Selamat, {data?.name}!</h1>
                  <div className="text-xl font-semibold text-gray-500  text-center mb-2">
          Nomor Pendaftaran : <strong>{data?.nomor_pendaftaran}</strong>
        </div>
                  <h3 className="text-gray-500 text-lg font-bold">
                    {" "}
                    Anda lolos seleksi Penerimaan Peserta Didik Baru MAN 1 Kota
                    Sukabumi untuk Tahun Pelajaran 2025/2026.
                  </h3>

                  <h5 className="text-gray-500 text-sm font-bold">
                    Silakan untuk bergabung ke Grup CPD (Calon Peserta Didik)
                    MAN 1 Kota Sukabumi 2025/2026.{" "}
                    <a
                      className="text-blue-300"
                      target="_blank"
                      href="https://chat.whatsapp.com/FBy4R4E4qahGj9kqZs04Fd"
                    >
                      https://chat.whatsapp.com/FBy4R4E4qahGj9kqZs04Fd
                    </a>{" "}
                  </h5>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mt-5">
                  <h4 className="text-gray-500 text-lg font-bold">
                    {" "}
                    Mohon Maaf! Anda belum lolos seleksi Penerimaan Peserta
                    Didik Baru MAN 1 Kota Sukabumi untuk Tahun Pelajaran
                    2025/2026. Tetap semangat!
                  </h4>
                </div>
              </>
            )}

            <table className="w-full border-collapse border border-gray-300 mt-5">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3">Seleksi</th>
                  <th className="border border-gray-300 p-3">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="border border-gray-300 p-1 text-lg text-gray-600">
                    Berkas
                  </td>
                  <td className="border uppercase border-gray-300 p-1 text-lg text-gray-600">
                    {" "}
                    {data?.nilai?.berkas_nilai || "-"}
                  </td>
                </tr>
                <tr className="text-center">
                  <td className="border border-gray-300 p-1 text-lg text-gray-600">
                    Tes Bidang Studi
                  </td>
                  <td className="border uppercase border-gray-300 p-1 text-lg text-gray-600">
                    {" "}
                    {data?.tes?.nilai_tes_bidang_studi
                      ? "Lulus"
                      : "Tidak Lulus"}
                  </td>
                </tr>
                <tr className="text-center">
                  <td className="border border-gray-300 p-1 text-lg text-gray-600">
                    Tes Potensi Akademik
                  </td>
                  <td className="border uppercase border-gray-300 p-1 text-lg text-gray-600">
                    {" "}
                    {data?.tes?.nilai_tes_akademik ? "Lulus" : "Tidak Lulus"}
                  </td>
                </tr>
                <tr className="text-center">
                  <td className="border border-gray-300 p-1 text-lg text-gray-600">
                    Wawancara Psikologi
                  </td>
                  <td className="border uppercase border-gray-300 p-1 text-lg text-gray-600">
                    {" "}
                    {data?.tes?.nilai_wawancara ? "Lulus" : "Tidak Lulus"}
                  </td>
                </tr>
                <tr className="text-center">
                  <td className="border border-gray-300 p-1 text-lg text-gray-600">
                    Tes Baca Tulis Al-Qur'an
                  </td>
                  <td className="border uppercase border-gray-300 p-1 text-lg text-gray-600">
                    {" "}
                    {data?.nilai?.cbt_penilaian ? "Lulus" : "Tidak Lulus"}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
