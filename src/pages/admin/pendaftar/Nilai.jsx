import { useEffect } from "react";

export default function Nilai({
  values,
  isSubmitting,
  handleChange,
  setFieldValue,
}) {
  useEffect(() => {
    const akhir =
      Number(values.cbt_bacaan || 0) +
      Number(values.cbt_hafalan || 0) +
      Number(values.cbt_tajwid || 0) +
      Number(values.cbt_tulisan || 0);

    setFieldValue("cbt_nilai", akhir / 4);
  }, [values]);
  return (
    <section>
      <table className="w-full border-collapse border border-gray-300 mt-5">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3">Bacaan</th>
            <th className="border border-gray-300 p-3">Tajwid</th>

            <th className="border border-gray-300 p-3">Hafalan</th>
            <th className="border border-gray-300 p-3">Tulisan</th>
            <th className="border border-gray-300 p-3">Skor Akhir</th>
            <th className="border border-gray-300 p-3">Keterangan</th>
            <th className="border border-gray-300 p-3">Penilai</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border border-gray-300 p-1 text-sm text-gray-600">
              <input
               placeholder="0"
                value={values.cbt_bacaan}
                name="cbt_bacaan"
                onChange={(e) => {
                  let newValue = e.target.value;

                  // Pastikan hanya angka
                  newValue = newValue.replace(/\D/g, "");

                  // Konversi ke angka
                  let numericValue =
                    newValue === "" ? "" : parseInt(newValue, 10);

                  // Batasi nilai antara 0 - 100
                  if (numericValue > 100) numericValue = 100;
                  if (numericValue < 0 || isNaN(numericValue)) numericValue = 0;

                  handleChange({
                    target: { name: "cbt_bacaan", value: numericValue },
                  });
                }}
                className="border py-5 text-center text-lg "
              />
            </td>
            <td className="border border-gray-300 p-1 text-sm text-gray-600">
              <input
               placeholder="0"
                value={values.cbt_tajwid}
                name="cbt_tajwid"
                onChange={(e) => {
                    let newValue = e.target.value;
                
                    // Pastikan hanya angka
                    newValue = newValue.replace(/\D/g, "");
                
                    // Konversi ke angka
                    let numericValue = newValue === "" ? "" : parseInt(newValue, 10);
                
                    // Batasi nilai antara 0 - 100
                    if (numericValue > 100) numericValue = 100;
                    if (numericValue < 0 || isNaN(numericValue)) numericValue = 0;
                
                    handleChange({ target: { name: "cbt_tajwid", value: numericValue } });
                  }}
                className="border py-5 text-center text-lg "
              />
            </td>
            <td className="border border-gray-300 p-1 text-sm text-gray-600">
              <input
              placeholder="0"
                value={values.cbt_hafalan}
                name="cbt_hafalan"
                onChange={(e) => {
                    let newValue = e.target.value;
                
                    // Pastikan hanya angka
                    newValue = newValue.replace(/\D/g, "");
                
                    // Konversi ke angka
                    let numericValue = newValue === "" ? "" : parseInt(newValue, 10);
                
                    // Batasi nilai antara 0 - 100
                    if (numericValue > 100) numericValue = 100;
                    if (numericValue < 0 || isNaN(numericValue)) numericValue = 0;
                
                    handleChange({ target: { name: "cbt_hafalan", value: numericValue } });
                  }}
                className="border py-5 text-center text-lg "
              />
            </td>
            <td className="border border-gray-300 p-1 text-sm text-gray-600">
              <input
               placeholder="0"
                value={values.cbt_tulisan}
                name="cbt_tulisan"
                onChange={(e) => {
                    let newValue = e.target.value;
                
                    // Pastikan hanya angka
                    newValue = newValue.replace(/\D/g, "");
                
                    // Konversi ke angka
                    let numericValue = newValue === "" ? "" : parseInt(newValue, 10);
                
                    // Batasi nilai antara 0 - 100
                    if (numericValue > 100) numericValue = 100;
                    if (numericValue < 0 || isNaN(numericValue)) numericValue = 0;
                
                    handleChange({ target: { name: "cbt_tulisan", value: numericValue } });
                  }}
                className="border py-5 text-center text-lg "
              />
            </td>
            <td className="border border-gray-300 p-1 text-sm text-gray-600">
              <input
                value={values.cbt_nilai}
                name="cbt_nilai"
                // onChange={handleChange}
                className="border py-5 text-center text-lg "
              />
            </td>
            <td className="border border-gray-300 p-1 text-sm text-gray-600">
              <select
                value={values.cbt_keterangan}
                name="cbt_keterangan"
                onChange={handleChange}
                className="border py-5 text-center text-lg "
              >
                <option>Pilih</option>
                <option value={"lulus"}>Lulus</option>
                <option value={"tidak lulus"}>Tidak Lulus</option>
              </select>
            </td>
            <td className="border border-gray-300 p-1 text-sm text-gray-600">
              <select
                value={values.cbt_penilaian}
                name="cbt_penilaian"
                onChange={handleChange}
                className="border py-5 text-center text-lg "
              >
                <option>Pilih</option>
                <option value={"Rusman"}>Rusman</option>
               
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
