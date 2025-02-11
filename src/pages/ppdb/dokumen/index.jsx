import { useEffect, useState } from "react";
import { Upload, Eye, AlertCircle  } from "lucide-react";
import { getDetail, uploadFileFoto } from "../../../api/santri";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useQuery } from "react-query";

export default function UploadDokumen() {
  let toast = useToast();
  let history = useHistory();
  const [files, setFiles] = useState({
    foto_profile:"",
    foto_kks:"",
    foto_pkh:"",
    foto_kip:"",
    dokumen_prestasi :""
  });
  const [errors, setErrors] = useState({});

  const { isError, data, isFetching } = useQuery(
      //query key
      ["detail", []],
  
      () => getDetail(),
  
      {
        keepPreviousData: true,
        select: (response) => response.data,
      }
    );

    console.log("Data", data)


    useEffect(()=> {

      setFiles((prev) => ({
        ...prev,
        foto_profile: data?.foto_profile,
        foto_kks: data?.foto_kks,
        foto_pkh: data?.foto_pkh,
        foto_kip: data?.foto_kip,
        dokumen_prestasi : data?.dokumen_prestasi
      }));


    }, [data])


    console.log("files", files)

  const handleFileChange = async (e, key) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [key]: "Ukuran file terlalu besar (maks 1MB)",
        }));
      return   toast({
          position: "top-right",
          title: "Warning",
          description: "Ukuran file terlalu besar (maks 1MB",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }

      console.log("key", key);
      try {
        const response = await uploadFileFoto(file, key);
        console.log("res", response)

        setFiles((prev) => ({
          ...prev,
          [key]: { file, url: response.file_url, type: file.type },
        }));

        toast({
          position: "top-right",
          title: "Berhasil",
          description: "Upload File Berhasil",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (err) {
        console.log("err", err);
        toast({
          position: "top-right",
          title: "Gagal",
          description: "Upload file Gagal",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className=" mx-auto bg-white rounded-2xl shadow-lg p-6">
      <div className="text-center mb-5">
        <h2 className="text-3xl text-blue-500 font-bold uppercase">
          Upload Dokumen
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
                  ? "Foto Profie"
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
                  ? "Upload Foto Data Diri dengan latar merah dan seragam sekolah/madrasah"
                  : key === "foto_kks"
                  ? "Upload Foto Kartu Keluarga Sejahtera/Kartu Perlindungan (jika ada bagi Jalur Afirmasi)"
                  : key === "foto_pkh"
                  ? "Upload Foto Kartu Program Keluarga Harapan (jika ada bagi Jalur Afirmasi)"
                  : key === "foto_kip"
                  ? "Upload Foto Kartu Kartu Indonesia Pintar (jika ada bagi Jalur Afirmasi)"
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
                <label
                  htmlFor={key}
                  className="cursor-pointer bg-blue-100 text-blue-700 p-2 rounded-lg flex items-center gap-2 hover:bg-blue-200 transition"
                >
                  <Upload size={20} /> Pilih File
                </label>
                {errors[key] && (
                  <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
                )}
              </td>
              <td className="border border-gray-300 p-3">
                { !!file === false ? <span className="text-red-500 font-bold">Belum Upload</span> :  file?.includes("pdf") ? (
                    <a
                      href={file.url}
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

      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-5  w-full flex items-start gap-3">
        <AlertCircle className="text-red-500" size={24} />
        <div>
          <h3 className="font-bold text-lg text-red-500">Keterangan:</h3>
          <ul className="list-disc list-inside text-sm text-red-500">
            <li><strong>Upload Foto Diri</strong> - Wajib untuk Jalur Reguler, Afirmasi, dan Prestasi.</li>
            <li><strong>Upload Foto Kartu KKS/KPS/PKH/KIP</strong> - Diperlukan bagi Jalur Afirmasi.</li>
            <li><strong>Upload Foto Dokumen Prestasi/Raport/Sertifikat/Lainnya</strong> - Harus digabungkan dalam satu file PDF bagi Jalur Prestasi.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
