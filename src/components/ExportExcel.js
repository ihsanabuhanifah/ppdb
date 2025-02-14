import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getUser } from "../api/admin";
import { Spinner } from "@chakra-ui/react";

const ExportExcel = ({  fileName }) => {

    let [isLoading, setIsLoading] = useState(false)

  
  const exportToExcel =async () => {

    setIsLoading(true)


    const data =  await getUser({page : 1, per_page : 200000 , keyword : ""})

   
console.log("Data", data?.data?.data)

const excel =  data?.data?.data?.map((item)=> {
    return {
        ...item,
        berkas_nilai : item.nilai?.berkas_nilai,
        berkas_keterangan : !!item.nilai?.berkas_nilai === false ? ""  : item.nilai?.berkas_nilai=== "Sesuai" ? "Lulus" : "Tidak Lulus",
      
        berkas_penilaian : item.nilai?.berkas_penilaian,
        cbt_bacaan : item.nilai?.cbt_bacaan,
        cbt_hafalan : item.nilai?.cbt_hafalan,
        cbt_tulisan : item.nilai?.cbt_tulisan,
        cbt_nilai : item.nilai?.cbt_nilai,
        cbt_tajwid : item.nilai?.cbt_tajwid,
        cbt_nilai : item.nilai?.cbt_nilai,
        cbt_keterangan : item.nilai?.cbt_keterangan,
        cbt_penilaian : item.nilai?.cbt_penilaian,

    }
})



    
    // 1. Buat worksheet dari data
    const worksheet = XLSX.utils.json_to_sheet(excel);

    // 2. Buat workbook dan tambahkan worksheet ke dalamnya
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // 3. Konversi ke file Excel (Blob)
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelFile = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    setIsLoading(false)
    // 4. Simpan file dengan nama yang diinginkan
    saveAs(excelFile, fileName || "Data.xlsx");
  };

  return (
    <>
      <button

disabled={isLoading}
        onClick={exportToExcel}
        className="bg-blue-400 font-bold text-white rounded-md px-4 py-2 border "
      >
       {isLoading ? <Spinner></Spinner> : " Download Rekap Pendaftar"}
      </button>
    </>
  );
};

export default ExportExcel;
