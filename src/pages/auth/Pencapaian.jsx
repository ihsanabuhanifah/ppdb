import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import hasbi from "../../image/hasbi.png";
import ilham from "../../image/ilham.png";
import training from "../../image/training.png";
import mtcine from "../../image/mtcine.png";
import mtcna from "../../image/mtcna.png";
import robotik from "../../image/robotik.png";
import abqory from "../../image/abqory.png";

export default function Pencapaian() {
  useEffect(function () {
    Aos.init();
  }, []);
  return (
    <div className="grid  grid-cols-1 gap-5 ">
      <div className=" col-span-1 lg:col-span-2">
        {" "}
        <div className="text-center mb-8 rounded-3xl">
          <h4 className="text-white text-4xl font-bold mb-2">Pencapaian</h4>
          <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div>
          <img className="w-full h-48 object-cover" src={hasbi} />
          <h5 className="text-center text-white mt-5 font-bold">
            Juara 1 Cisco Netacad Rider
          </h5>
        </div>
        <img className="w-full h-48 object-cover" src={ilham} />

        <div>
        <img className="w-full h-48 object-cover" src={training} />
          <h5 className="text-center text-white mt-5 font-bold">
            Sertifikasi Mikrotik MTCRE MTCINE
          </h5>
        </div>
        <div>
        <img className="w-full h-48 object-cover" src={mtcine} />
          <h5 className="text-center text-white mt-5 font-bold">
            Sertifikasi Mikrotik  MTCINE
          </h5>
        </div>
       
        <div>
        <img className="w-full h-48 object-cover" src={mtcna} />
          <h5 className="text-center text-white mt-5 font-bold">
            Sertifikasi Mikrotik  MTCRE
          </h5>
        </div>
        <div>
        <img className="w-full h-48 object-cover" src={robotik} />
          <h5 className="text-center text-white mt-5 font-bold">
           Juara 2 Robotik 
          </h5>
        </div>
        <div>
        <img className="w-full h-48 object-cover" src={abqory} />
          <h5 className="text-center text-white mt-5 font-bold">
           Juara 3 Web Competition
          </h5>
        </div>
      </section>
    </div>
  );
}
