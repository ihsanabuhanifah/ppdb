import React from "react";
import Matematika from "../../../image/matematika.jpg";
import Alquran from "../../../image/alquran.jpg";
import Analogi from "../../../image/analogi.JPG";
import BInggris from "../../../image/bahasainggris.JPG"
import { useHistory } from "react-router-dom";
import AlertLogout from "../../../components/AlertLogout";
import { getTesUmum, postTesUmum } from "../../../api/santri";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
export default function Tes() {
  const [logout, setLogout] = React.useState(false);
  const [kode, setKode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false)
  let history = useHistory();
  let toast = useToast();
  const onSubmit = async (kode) => {
    setIsLoading(true)
    let tes;
    if (kode === "Tes001") {
      tes = "matematika";
    }
    if (kode === "Tes002") {
      tes = "diniyah-dasar";
    }
    if (kode === "Tes003") {
      tes = "tes-analogi";
    }
    if (kode === "Tes004") {
      tes = "tes-bahasa-inggris";
    }
    let values = {
      kode_mapel : kode,
      nilai : 0
    }
    let response = await postTesUmum(values);
    if(response?.message === "Berhasil Menyimpan Nilai"){
      toast({
        position: "top-right",
        title: "Berhasil",
        description: "Selamat Mengerjakan Tes",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setIsLoading(false)
      if (kode === "Tes001") {
        return history.push("/tes/matematika");
      }
      if (kode === "Tes002") {
        return history.push("/tes/diniyah-dasar");
      }
      if (kode === "Tes003") {
        return history.push("/tes/tes-analogi");
      }
      if (kode === "Tes004") {
        return history.push("/tes/tes-bahasa-inggris");
      }
    }
    
   
    
    if(response?.message === "Sudah mengikuti tes ini"){
      toast({
        position: "top-right",
        title: "Tidak dapat akses tes",
        description: 'Mohon maaf ananda sudah mengikuti tes ini',
        status: "error",
        duration: 10000,
        isClosable: true,
      });
      setIsLoading(false)
      setLogout(false)
    }
   
  };
  return (
    <React.Fragment>
      <AlertLogout
        message="Apakah ananda yakin akan mengerjakan tes ini ?"
        isLoading={isLoading}
        onConfirm={() => {
          onSubmit(kode);
          // Cookies.remove("token-ppdb");
          // return history.push("/login");
        }}
        onClose={() => {
          setLogout(false);
        }}
        isOpen={logout}
      ></AlertLogout>
      <section className="text-gray-600">
        <div className="border-b-2 pb-5">
          <h3 className="text-xl lg:text-3xl font-bold ">
            Selamat mengerjakan soal Tes
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
          <div className="relative">
            <div className="relative  h-full rounded-md shadow-md">
              <img
                className="rounded-t-md w-full"
                style={{ height: "240px" }}
                src={Matematika}
                alt="matematika.jpg"
              />
              <div className="px-5 pb-6">
                <h2 className="pt-3 font-bold text-2xl">MATEMATIKA</h2>
               
                <button
                  onClick={() => {
                    setKode("Tes001");
                    return setLogout(true);
                    return history.push("/tes/matematika");
                  }}
                  className="inline-flex w-full hover:bg-green-500 text-white bg-green-500 py-3 rounded-lg mt-4 flex items-center justify-center text-xl uppercase font-bold"
                >
                  Mulai
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative  h-full rounded-md shadow-md">
              <img
                className="rounded-t-md w-full"
                style={{ height: "240px" }}
                src={Alquran}
                alt="matematika.jpg"
              />
              <div className="px-5 pb-6">
                <h2 className="pt-3 font-bold text-2xl">DINIYAH DASAR</h2>
               
                <button
                  onClick={() => {
                    setKode("Tes002");
                    return setLogout(true);
                    return history.push("/tes/diniyah-dasar");
                  }}
                  className="inline-flex w-full hover:bg-green-500 text-white bg-green-500 py-3 rounded-lg mt-4 flex items-center justify-center text-xl uppercase font-bold"
                >
                  Mulai
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative  h-full rounded-md shadow-md">
              <img
                className="rounded-t-md w-full"
                style={{ height: "240px " }}
                src={Analogi}
                alt="analogi.jpg"
              />
              <div className="px-5 pb-6">
                <h2 className="pt-3 font-bold text-2xl">TES ANALOGI</h2>
                
                <button
                  onClick={() => {
                    setKode("Tes003");
                    return setLogout(true);
                    return history.push("/tes/tes-analogi");
                  }}
                  className="inline-flex w-full hover:bg-green-500 text-white bg-green-500 py-3 rounded-lg mt-4 flex items-center justify-center text-xl uppercase font-bold"
                >
                  Mulai
                </button>
              </div>
            </div>
            
          </div>
          {/* bahasa */}
          <div className="relative">
            <div className="relative  h-full rounded-md shadow-md">
              <img
                className="rounded-t-md w-full"
                style={{ height: "240px " }}
                src={BInggris}
                alt="bahasainggris.jpg"
              />
              <div className="px-5 pb-6">
                <h2 className="pt-3 font-bold text-2xl">TES BAHASA INGGRIS</h2>
                
                <button
                  onClick={() => {
                    setKode("Tes004");
                    return setLogout(true);
                    return history.push("/tes/tes-analogi");
                  }}
                  className="inline-flex w-full hover:bg-green-500 text-white bg-green-500 py-3 rounded-lg mt-4 flex items-center justify-center text-xl uppercase font-bold"
                >
                  Mulai
                </button>
              </div>
            </div>
            
          </div>
        </div>
        
      </section>
    </React.Fragment>
  );
}
