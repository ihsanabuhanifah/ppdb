import React from "react";
import Matematika from "../../../image/matematika.jpg";
import { useHistory } from "react-router-dom";
export default function Tes() {
    let history = useHistory()
  return (
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
              <p className="pt-2 font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus dicta, sequi sint maxime dignissimos dolorem quidem
                voluptate eum magnam earum.
              </p>
              <button onClick={()=> {
                  return history.push("/tes/matematika")
              }} className="inline-flex w-full hover:bg-green-500 text-white bg-green-500 py-3 rounded-lg mt-4 flex items-center justify-center text-xl uppercase font-bold">
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
              src={Matematika}
              alt="matematika.jpg"
            />
            <div className="px-5 pb-6">
              <h2 className="pt-3 font-bold text-2xl">BAHASA INGGRIS</h2>
              <p className="pt-2 font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus dicta, sequi sint maxime dignissimos dolorem quidem
                voluptate eum magnam earum.
              </p>
              <button onClick={()=> {
                  return history.push("/tes/bahasa-inggris")
              }}  className="inline-flex w-full hover:bg-green-500 text-white bg-green-500 py-3 rounded-lg mt-4 flex items-center justify-center text-xl uppercase font-bold">
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
              src={Matematika}
              alt="matematika.jpg"
            />
            <div className="px-5 pb-6">
              <h2 className="pt-3 font-bold text-2xl">TES ANALOGI</h2>
              <p className="pt-2 font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus dicta, sequi sint maxime dignissimos dolorem quidem
                voluptate eum magnam earum.
              </p>
              <button onClick={()=> {
                  return history.push("/tes/tes-analogi")
              }}  className="inline-flex w-full hover:bg-green-500 text-white bg-green-500 py-3 rounded-lg mt-4 flex items-center justify-center text-xl uppercase font-bold">
                Mulai
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
