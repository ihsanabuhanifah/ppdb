import { useEffect, useState } from "react";
import { Upload, Eye, AlertCircle } from "lucide-react";
import { getDetail, uploadFileFoto } from "../../../api/santri";
import {Spinner, useDisclosure, useToast, Text, Flex, Center, VStack,   } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useQuery, useQueryClient } from "react-query";
import { pdf } from "@react-pdf/renderer";
import { Resume } from "../pdf/resume.pdf";
import { Button } from "semantic-ui-react";
import Swal from "sweetalert2";

export default function UploadDokumen() {
  const queryClient = useQueryClient();
  let toast = useToast();
  let history = useHistory();
  let [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({
    foto_profile: "",
    foto_kks: "",
    foto_pkh: "",
    foto_kip: "",
    dokumen_prestasi: "",
  });
  const [errors, setErrors] = useState({});

  const { isError, data, isFetching } = useQuery(
    //query key
    ["detail", []],

    () => getDetail(),

    {
      staleTime : 1000 * 60 * 60,
      keepPreviousData: true,
      select: (response) => response.data,
    }
  );

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

  console.log("files", files);

  const handleFileChange = async (e, key) => {
    setLoading(true);
    const file = e.target.files[0];

    if (key !== "dokumen_prestasi") {
      if (file.type?.includes("pdf")) {
        setLoading(false);

        return Swal.fire({
          title: "Peringatan",
          text: "Foto Wajib menggunakan gambar (.jpg/.jpeg/.png)",
          icon: "warning",
        });
      }
    }
    if (file) {
      if (file.size > 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [key]: "Ukuran file terlalu besar (maks 1MB)",
        }));
        setLoading(false);

        return Swal.fire({
          title: "Peringatan",
          text: "Ukuran file terlalu besar (maks 1MB)",
          icon: "warning",
        });
      }

      console.log("key", key);
      try {
        const response = await uploadFileFoto(file, key);
        console.log("res", response);

        setFiles((prev) => ({
          ...prev,
          [key]: response.file_url,
        }));

        queryClient.invalidateQueries("detail");

        Swal.fire({
          title: "Berhasil!",
          text: "Upload File Berhasil",
          icon: "success",
        });
      } catch (err) {
        Swal.fire({
          title: "Gagal",
          text: "Upload file Gagal",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownload = async () => {
    
   try{
    setLoading(true);
    const blob = await pdf(<Resume data={data}  />).toBlob();

    const file = new Blob([blob], {
      type: "application/pdf",
    });

    const fileURL = URL.createObjectURL(file);
    setLoading(false);
    window.open(fileURL, "_blank"); // Buka di tab baru
   }catch (err) {
    console.log("err", err)
   }

    // return onOpen();
  };



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
          KELENGKAPAN DOKUMEN
        </h2>
      </div>

      <div>
        <div className="mb-2">
          <h2 className="text-2xl font-bold mb-2 text-gray-500">
            A. Download Dokumen
          </h2>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3">Dokumen</th>
              <th className="border border-gray-300 p-3">Deskripsi</th>
              <th className="border border-gray-300 p-3">Download</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border border-gray-300 p-3 capitalize">
                Rekap Pendaftaran
              </td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">
                {" "}
                Dokumen ini dicetak/diprint oleh masing-masing pendaftar dan
                dibawa saat Daftar Ulang
              </td>
              <td className="border border-gray-300 p-3">
                <Button
                  loading={loading}
                  color="facebook"
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="border border-gray-300 p-3 capitalize">
                Surat Pernyataan
              </td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">
                {" "}
                Dokumen ini dicetak/diprint oleh masing-masing pendaftar dan
                dibawa saat Daftar Ulang
              </td>
              <td className="border border-gray-300 p-3">
                <Button
                  loading={loading}
                  color="facebook"
                  onClick={() => {
                    window.open(
                      `https://ppdb-api.man1kotasukabumi.web.id/storage/uploads/Surat-Pernyataan.docx`
                    );
                  }}
                >
                  Download
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mb-2 mt-5">
          <h2 className="text-2xl font-bold mb-2 text-gray-500">
            B. Upload Dokumen
          </h2>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3">Dokumen</th>
              <th className="border border-gray-300 p-3">Deskripsi</th>
              <th className="border border-gray-300 p-3">Upload</th>
              <th className="border border-gray-300 p-3">Preview</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(files).map(([key, file]) => (
              <tr key={key} className="text-center">
                <td className="border border-gray-300 p-3 capitalize">
                  {key === "foto_profile"
                    ? "Foto Profil"
                    : key === "foto_kks"
                    ? "Kartu KKS"
                    : key === "foto_pkh"
                    ? "Kartu PKH"
                    : key === "foto_kip"
                    ? "Kartu KIP "
                    : "Dokumen Prestasi"}
                </td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600">
                  {key === "foto_profile"
                    ? "Upload Foto Data Diri dengan latar merah dan seragam sekolah/madrasah asal"
                    : key === "foto_kks"
                    ? "Upload Foto Kartu Keluarga Sejahtera/Kartu Perlindungan (Jika Ada dan Bagi Jalur Afirmasi)"
                    : key === "foto_pkh"
                    ? "Upload Foto Kartu Program Keluarga Harapan (Jika Ada dan Bagi Jalur Afirmasi)"
                    : key === "foto_kip"
                    ? "Upload Foto Kartu Kartu Indonesia Pintar (Jika Ada dan Bagi Jalur Afirmasi)"
                    : "Upload Foto Dokumen Prestasi/Raport/Sertifikat/Lainnya (Digabungkan dalam 1 file PDF)(Bagi Jalur Prestasi)"}
                </td>
                <td className="border border-gray-300 p-3">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, key)}
                    className="hidden"
                    id={key}
                  />
                  {loading ? (
                    <Spinner />
                  ) : !!file === false ? (
                    <label
                      htmlFor={key}
                      className="cursor-pointer bg-blue-100 text-blue-700 p-2 rounded-lg flex items-center gap-2 hover:bg-blue-200 transition"
                    >
                      <Upload size={20} /> Pilih File
                    </label>
                  ) : (
                    <span className="text-green-500 font-bold">
                      Sudah Upload
                    </span>
                  )}
                  {errors[key] && (
                    <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
                  )}
                </td>
                <td className="border border-gray-300 p-3">
                  {!!file === false ? (
                    <span className="text-red-500 font-bold">Belum Upload</span>
                  ) : file?.includes("pdf") ? (
                    <a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 flex items-center gap-2"
                    >
                      <Eye size={20} /> Lihat PDF
                    </a>
                  ) : (
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-400 mx-auto">
                      <img
                        src={file}
                        alt={key}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-yellow-100 mt-5 text-yellow-800 p-4 rounded-lg mb-5  w-full flex items-start gap-3">
        <AlertCircle className="text-red-500" size={24} />
        <div>
          <h3 className="font-bold text-lg text-red-500">Keterangan:</h3>
          <ul className="list-disc list-inside text-sm text-red-500">
            <li>
              <strong>Upload Foto Diri</strong> - Wajib untuk Jalur Reguler,
              Afirmasi, dan Prestasi.
            </li>
            <li>
              <strong>Upload Foto Kartu KKS/KPS/PKH/KIP</strong> - Diperlukan
              bagi Jalur Afirmasi.
            </li>
            <li>
              <strong>
                Upload Foto Dokumen Prestasi/Raport/Sertifikat/Lainnya
              </strong>{" "}
              - Harus digabungkan dalam satu file PDF bagi Jalur Prestasi.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
