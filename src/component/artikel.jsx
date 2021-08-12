import React from "react";
function Artikel(props) {
 
  return (
    <article className="border p-5">
      <h1 className="font-semibold">{props.judul}</h1>
      <img className="mt-5" src={props.link} alt={props.alt} />
      <p className="mt-5 truncate">{props.konten}</p>
      <div className="mt-5">
        <button className="inline-flex px-4 bg-gradient-to-r from-blue-400 to-blue-300 text-white py-2 rounded-md border">
          Selengkapnya
        </button>
      </div>
    </article>
  );
}

export default Artikel;
