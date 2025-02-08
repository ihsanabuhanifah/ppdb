import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Section3() {
  return (
    <div className="grid  grid-cols-1 md:grid-cols-4 lg:grid-cols-4  gap-5 ">
      <div className=" col-span-1 lg:col-span-4">
        {" "}
        <div className="text-center mb-8 rounded-3xl">
          <h4 className="text-white text-4xl font-bold mb-2">
            Jalur Seleksi dan Daya Tampung
          </h4>
          <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
        </div>
      </div>
      <section>
        {" "}
        <motion.div
          style={{
            height: 500,
          }}
          className="border border-white rounded-2xl  relative  px-5 py-2 bg-white shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <div
              style={{
                height: 30,
                width: 30,
              }}
              className=" rounded-full mb-5 mt-5 bg-blue-500"
            ></div>
          </div>
          <motion.h4
            className="text-xl font-bold text-[#06579E]"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            Jalur Bina Madrasah
          </motion.h4>
          <p className="text-gray-500  mt-5  text-justify">
            Jalur masuk yang diperuntukkan khusus bagi peserta didik yang
            mendapatkan surat undangan langsung oleh MAN 1 Kota Sukabumi <br />{" "}
            Syarat Wajib :
            <br />
            <ol className="list-decimal ml-6 space-y-2 text-gray-500">
              <li>
                Melampirkan scan surat undangan yang telah diberikan oleh MAN 1
                Kota Sukabumi dan akan mendapatkan kode khusus.
              </li>
              <li>
                Melampirkan scan atau fotokopi bukti prestasi akademik atau
                non-akademik.
              </li>
            </ol>
          </p>

          <div className="mt-5 absolute bottom-0 pb-5 px-2 ">
            <h2 className="text-md font-bold text-[#06579E] mb-2">
              Daya Tampung
            </h2>
            <p className=" mb-2 text-sm italic">
              15 % dari jumlah daya tampung
            </p>
          </div>
        </motion.div>
      </section>
      <section>
        <motion.div
          style={{
            height: 500,
          }}
          className="border border-white rounded-2xl  relative  px-5 py-2 bg-white shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <div
              style={{
                height: 30,
                width: 30,
              }}
              className=" rounded-full mb-5 mt-5 bg-red-500"
            ></div>
          </div>
          <motion.h4
            className="text-xl font-bold text-[#06579E]"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            Jalur Prestasi
          </motion.h4>
          <p className="text-gray-500  mt-5  text-justify">
            Jalur masuk yang diperuntukan bagi peserta didik lulusan MTs/SMP
            yang memiliki kualifikasi prestasi sebagaimana yang telah ditentukan
            oleh panitia PPDBM
          </p>

          <div className="mt-5 absolute bottom-0 pb-5 px-2 ">
            <h2 className="text-md font-bold text-[#06579E] mb-2">
              Daya Tampung
            </h2>
            <p className=" mb-2 text-sm italic">15% dari jumlah daya tampung</p>
          </div>
        </motion.div>
      </section>
      <section>
        {" "}
        <motion.div
          style={{
            height: 500,
          }}
          className="border border-white rounded-2xl  relative  px-5 py-2 bg-white shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <div
              style={{
                height: 30,
                width: 30,
              }}
              className=" rounded-full mb-5 mt-5 bg-green-500"
            ></div>
          </div>
          <motion.h4
            className="text-xl font-bold text-[#06579E]"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            Jalur Reguler
          </motion.h4>
          <p className="text-gray-500  mt-5  text-justify">
            Jalur ini disediakan untuk menjaring peserta didik lulusan MTs/SMP
            yang berkeinginan menempuh pendidikan di MAN 1 Kota Sukabumi dan
            memenuhi persyaratan yang telah ditentukan oleh Panitia PPDBM.
          </p>

          <div className="mt-5 absolute bottom-0 pb-5 px-2 ">
            <h2 className="text-md font-bold text-[#06579E] mb-2">
              Daya Tampung
            </h2>
            <p className=" mb-2 text-sm italic">55% dari jumlah daya tampung</p>
          </div>
        </motion.div>
      </section>
      <section>
        <motion.div
          style={{
            height: 500,
          }}
          className="border border-white rounded-2xl  relative  px-5 py-2 bg-white shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div>
            <div
              style={{
                height: 30,
                width: 30,
              }}
              className=" rounded-full mb-5 mt-5 bg-yellow-500"
            ></div>
          </div>
          <motion.h4
            className="text-xl font-bold text-[#06579E]"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            Jalur Afirmasi
          </motion.h4>
          <p className="text-gray-500  mt-5  text-justify">
            Jalur ini disediakan untuk calon peserta didik yatim/piatu/yatim
            piatu dan/atau dari keluarga prasejahtera dan memenuhi persyaratan
            yang telah ditentukan oleh panitia PPDB.
          </p>

          <div className="mt-5 absolute bottom-0 pb-5 px-2 ">
            <h2 className="text-md font-bold text-[#06579E] mb-2">
              Daya Tampung
            </h2>
            <p className=" mb-2 text-sm italic">15% dari jumlah daya tampung</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
