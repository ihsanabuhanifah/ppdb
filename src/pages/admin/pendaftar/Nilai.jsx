import { useEffect } from "react";

export default function Nilai({
  values,
  isSubmitting,
  handleChange,
  setFieldValue,
}) {
  // useEffect(() => {
  //   const akhir =
  //     Number(values.cbt_bacaan || 0) +
  //     Number(values.cbt_hafalan || 0) +
  //     Number(values.cbt_tajwid || 0) +
  //     Number(values.cbt_tulisan || 0);

  //   setFieldValue("cbt_nilai", akhir / 4);
  // }, [values]);
  return (
    <section>
      <table className="w-full border-collapse border border-gray-300 mt-5">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3">Bacaan</th>
            <th className="border border-gray-300 p-3">Tajwid</th>

            <th className="border border-gray-300 p-3">Hafalan</th>
            <th className="border border-gray-300 p-3">Tulisan</th>
            <th className="border border-gray-300 p-3">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border border-gray-300 p-1 text-sm text-gray-600">
              <select
               placeholder="0"
                value={values.cbt_bacaan}
                name="cbt_bacaan"
                onChange={handleChange}
                className="border py-5 text-center text-lg "
              >
                <option>Pilih</option>
                <option value={"Istimewa"}>Istimewa</option>
                <option value={"Sangat Baik"}>Sangat Baik</option>
                <option value={"Baik"}>Baik</option>
                <option value={"Cukup Baik"}>Cukup Baik</option>
                <option value={"Kurang Baik"}>Kurang Baik</option>
                </select>
              
            </td>
            <td className="border border-gray-300 p-1 text-sm text-gray-600">
              <select
               placeholder="0"
                value={values.cbt_tajwid}
                name="cbt_tajwid"
                onChange={handleChange}
                className="border py-5 text-center text-lg "
              >
                <option>Pilih</option>
                <option value={"Istimewa"}>Istimewa</option>
                <option value={"Sangat Baik"}>Sangat Baik</option>
                <option value={"Baik"}>Baik</option>
                <option value={"Cukup Baik"}>Cukup Baik</option>
                <option value={"Kurang Baik"}>Kurang Baik</option>
                </select>
              
            </td>
            <td className="border border-gray-300 p-1 text-sm text-gray-600">
              <select
                value={values.cbt_hafalan}
                name="cbt_hafalan"
                onChange={handleChange}
                className="border py-5 text-center text-lg "
              >
                <option>Pilih</option>
                <option value={"Istimewa"}>Istimewa</option>
                <option value={"Sangat Baik"}>Sangat Baik</option>
                <option value={"Baik"}>Baik</option>
                <option value={"Cukup Baik"}>Cukup Baik</option>
                <option value={"Kurang Baik"}>Kurang Baik</option>
                </select>

            </td>
            <td className="border border-gray-300 p-1 text-sm text-gray-600">
            <select
               value={values.cbt_tulisan}
                name="cbt_tulisan"
                onChange={handleChange}
                className="border py-5 text-center text-lg "
              >
                <option>Pilih</option>
                <option value={"Istimewa"}>Istimewa</option>
                <option value={"Sangat Baik"}>Sangat Baik</option>
                <option value={"Baik"}>Baik</option>
                <option value={"Cukup Baik"}>Cukup Baik</option>
                <option value={"Kurang Baik"}>Kurang Baik</option>
                </select>  
              
            </td>
           
            <td className="border border-gray-300 p-1 text-sm text-gray-600">
              <select
                value={values.cbt_penilaian}
                name="cbt_penilaian"
                onChange={handleChange}
                className="border py-5 text-center text-lg "
              >
                <option >Pilih</option>
                <option value={"Telah Dites"}>Telah Dites</option>
                <option value={"Belum dites"}>Belum Dites</option>
                </select>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
