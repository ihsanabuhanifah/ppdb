import React from "react";
import Matematika from "../../image/matematika.jpg";
export default function Tes() {
  return (
    <section>
      <div className="border-b-8 pb-5">
        <h3 className="text-xl lg:text-3xl font-bold">
          Selamat mengerjakan soal Tes
        </h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-5">
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
              <button className="inline-flex w-full hover:bg-blue-700 text-white bg-blue-500 py-3 rounded-lg mt-4 flex items-center justify-center text-xl uppercase font-bold">
                Kerjakan
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
              <button className="inline-flex w-full hover:bg-blue-700 text-white bg-blue-500 py-3 rounded-lg mt-4 flex items-center justify-center text-xl uppercase font-bold">
                Kerjakan
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
              <button className="inline-flex w-full hover:bg-blue-700 text-white bg-blue-500 py-3 rounded-lg mt-4 flex items-center justify-center text-xl uppercase font-bold">
                Kerjakan
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
              <button className="inline-flex w-full hover:bg-blue-700 text-white bg-blue-500 py-3 rounded-lg mt-4 flex items-center justify-center text-xl uppercase font-bold">
                Kerjakan
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
              <button className="inline-flex w-full hover:bg-blue-700 text-white bg-blue-500 py-3 rounded-lg mt-4 flex items-center justify-center text-xl uppercase font-bold">
                Kerjakan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
