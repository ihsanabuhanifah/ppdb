import { useEffect, useState } from "react";
import { Upload, Eye, AlertCircle  } from "lucide-react";
import { getDetail, uploadFileFoto } from "../../../api/santri";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useQuery } from "react-query";

export default function Pengumuman() {
  let toast = useToast();
  let history = useHistory();
  const [files, setFiles] = useState({
    foto_profile: null,
    foto_kks: null,
    foto_pkh: null,
    foto_kip: null,
    dokumen_prestasi : null
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
         Pengumuman Kelulusan
        </h2>
      </div>
     <div>
      <h3 className="text-lg text-center font-bold text-gray-600">Belum Ada Pengumuman Kelulusan</h3>
     </div>
    </div>
  );
}
