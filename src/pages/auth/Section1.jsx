import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export default function Section1({data}) {
  const [welcomeText, setWelcomeText] = useState("");
  const fullText = "PPDB MAN 1 Kota Sukabumi 2025/2026";
  const [counters, setCounters] = useState({ total: 0, mts: 0, smp: 0, pkbm : 0, pps :0, wustha : 0 });
  const history = useHistory()


   
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setWelcomeText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) {
        index = 0;
        setWelcomeText("");
      }
    }, 200);

    const updateCounters = setInterval(() => {
      setCounters((prev) => ({
        total: prev.total < data?.Total  ? prev.total + 1 : data?.Total ,
        mts: prev.mts < data?.MTs ? prev.mts + 1 : data?.MTs,
        smp: prev.smp < data?.SMP ? prev.smp + 1 : data?.SMP,
        pkbm: prev.smp < data?.PKBM ? prev.smp + 1 : data?.PKBM,
        wustha: prev.wustha < data?.["PDF Wustha"] ? prev.wustha + 1 : data?.["PDF Wustha"],
        pps: prev.pps < data?.["PPS SPQ"] ? prev.pps + 1 : data?.["PPS SPQ"],
      }));
    }, 10);

    return () => {
      clearInterval(interval);
      clearInterval(updateCounters);
    };
  }, [data]);

  return (
    <>
      <h4 className="text-white text-center font-bold text-2xl lg:text-4xl lg:ext-6xl h-20">
        Selamat Datang di {welcomeText}
      </h4>
      <div className="mt-5 ">
        <h2  className="text-white text-center hidden lg:block font-bold text-xl mb-10">
          Madrasah Aliyah Negeri 1 Kota Sukabumi, sebagai lembaga pendidikan
          Islam formal di bawah <br/> Kementerian Agama Republik Indonesia berkomitmen 
          memberikan <br/> kontribusi yang besar bagi masyarakat  sebagai penerus
          perjuangan dalam rangka syiar agama Islam. <br/> Dengan memperhatikan
          kebutuhan tersebut, kami berusaha memberikan pelayanan terbaik kepada
          anak-anak <br/> yang pendidikannya sudah dipercayakan kepada MAN 1 Kota
          Sukabumi.
        </h2>

        <h4 className="text-white text-center font-bold text-xl mb-10">
          Disiplin, Sukses, Berwawasan Islami
        </h4>
      </div>

      <div>
       
      </div>
      <div className="flex items-center justify-center mt-5 space-x-4">
        <button  onClick={() => {
                history.push("/register");
              }} className="border px-16 py-3 font-bold text-white border-[#F6B023] rounded-full hover:bg-[#F6B023] transition duration-300">
          Daftar PPDB
        </button>
      </div>
      <div className="text-center mb-8 rounded-3xl mt-10">
        <h4 className="text-white text-4xl font-bold mb-2">
          Statistik Pendaftar
        </h4>
        <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {[
          { label: "Jumlah Pendaftar Total", count: counters.total },
          { label: "Jumlah Pendaftar MTs", count: counters.mts },
          { label: "Jumlah Pendaftar SMP", count: counters.smp },
          { label: "Jumlah Pendaftar PKBM", count: counters.pkbm },
          { label: "Jumlah Pendaftar Wustha", count: counters.wustha },
          { label: "Jumlah Pendaftar PPS PPQ", count: counters?.pps },
         
        ].map((item, index) => (
          <motion.div
            key={index}
            className="border border-white rounded-2xl text-center py-12 bg-white shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <motion.h4
              className="text-6xl font-bold text-gray-800"
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
            >
              {item.count}
            </motion.h4>
            <p className="text-gray-500 font-bold text-xl mt-5 ">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
}
