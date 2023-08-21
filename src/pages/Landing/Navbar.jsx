import React from "react";

export default function Navbar() {
  return (
    <div className="flex w-full justify-between items-center py-2 ">
      <div className="W-1/2"> PPDB SMK MADINATULQURAN</div>
      <nav className=" flex items-center justify-end w-1/2">
          <p>Kurikulum</p>
          <p>kkkkk</p>
        <button className="inline-flex border px-8 py-4 text-white font-bold rounded-3xl">
          Masuk
        </button>
        <button className="inline-flex border px-8 py-4 text-white font-bold rounded-3xl">Daftar Sekarang</button>
      </nav>
    </div>
  );
}
