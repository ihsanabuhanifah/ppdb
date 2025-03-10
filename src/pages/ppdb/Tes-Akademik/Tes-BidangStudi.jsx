import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { getDetail, useSimpanStudi } from "../../../api/santri";
import {
  Spinner,
  useDisclosure,
  useToast,
  Text,
  Flex,
  Center,
  VStack,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { calculateScore } from "./TPA";
import Loading from "../../../components/loading";

const TesStudi = () => {
  const mutate = useSimpanStudi();
  const { isError, data, isFetching } = useQuery(
    //query key
    ["detail", []],

    () => getDetail(),

    {
      staleTime : 1000 * 60 * 60,
      keepPreviousData: true,
      select: (response) => response.data,
    }
  );
  const questions = [
    {
      id: 1,
      question:
        "Nabi Muhammad Shallahu Alaihi Wasallam pernah tinggal dan hidup berdampingan dengan kaum kafir dan kaum musyrik Makkah. Hal tersebut menunjukan sikap. . . .",
      options: ["Moderat", "Toleransi", "Egois", "Otoriter"],
      answer: "Toleransi",
    },
    {
      id: 2,
      question:
        "Kita hidup dinegara yang berdasarkan Pancasila. Sikap terbaik yang harus kita tunjukan adalah... ",
      options: [
        "Menghargai ajaran agama kita dan sesekali saja jika mengikuti agama yang lain",
        "Mengikuti acara keyakinan yang dianut oleh orang lain sesuai peraturan yang diberlakukan",
        "Membenci pemeluk agama lain",
        "Menghargai dan menghormati keyakinan orang lain sesuai ajaran agama dengan mentaati peraturan",
      ],
      answer:
        "Menghargai dan menghormati keyakinan orang lain sesuai ajaran agama dengan mentaati peraturan",
    },
    {
      id: 3,
      question:
        "Taqdir (ketentuan) Allah swt. yang tidak dapat diubah oleh siapapun disebut taqdir. . . .",
      options: ["Mutawasitah", "Muallaq", "Mukhaffafah", "Mubram"],
      answer: "Mubram",
    },
    {
      id: 4,
      question:
        "Seseorang mendapati saudaranya mengalami sakit parah, kemudian sudah ia upayakan penyembuhan dengan segala cara, namun akhirnya meningal juga. Sikap terbaik yang harus ia lakukan adalah. . . .",
      options: [
        "Menyesali",
        "Bertasbih dengan sebaik-baiknya dan khusyu’ ",
        "Mengimani qadha dan qadar Allah swt. dengan bersabar ",
        "Bersedih atau berkabung empat puluh hari",
      ],
      answer: "Mengimani qadha dan qadar Allah swt. dengan bersabar ",
    },
    {
      id: 5,
      question:
        "Sebagai hamba yang beriman,kita harus rela dan ikhlas terhadap apaun yang kita terima dari Allah swt. seraya berbaik sangka kepada ketetapan Allah swt. bahwa itulah yang terbaik. Sikap demikian disebut. . . .",
      options: ["Tawakal", "Tafakur", "Tasyakur", "Takabur"],
      answer: "Tawakal",
    },
    {
      id: 6,
      question:
        "Perhatikan penulisan kalimat judul teks eksemplum berikut ini. tragedi menginap di kost. Penulisan kalimat judul yang sesuai dengan ejaan yang benar adalah ...",
      options: [
        "Tragedi menginap di kost.",
        "Tragedi Menginap Di Kost.",
        "Tragedi Menginap di Kost",
        "tragedi menginap di kost",
      ],
      answer: "Tragedi Menginap di Kost",
    },
    {
      id: 7,
      question:
        "Bacalah kalimat-kalimat berikut ini! 1. Alasan berikutnya adalah data yang menyatakan bahwa ada korelasi negatif, yaitu anak yang bermain game online menjadi tidak peduli dengan lingkungan. Anak hanya akan peduli pada dirinya sendiri. 2. Penelitian yang dilakukan oleh mahasiswa Universitas Indonesia (UI) pada 2009 mengatakan bahwa ada hubungan antara kecenderungan game online dengan ranah keterampilan social. 3. Kesehatan mata, kebugaran fisik, dan pola hidup sehat dapat diselesaikan jika orang tua dan anak-anak selalu berkomunikasi. 4. Secara umum saya sebagai penanggap sepakat dengan alasan yang mengatakan bahwa game online memiliki dampak negatif. Dari kalimat-kalimat di atas, yang termasuk ke dalam ungkapan penguatan adalah nomor..",
      options: ["1", "2", "3", "4"],
      answer: "3",
    },
    {
      id: 8,
      question:
        "Cermatilah teks eksposisi berikut ini! Sayur dan buah mengandung vitamin dan mineral mulai vitamin A, C, E, asam folat, zinc, magnesium, kalsium, dan potassium.Kedua sumber nutrisi juga engandung antioksidan, serat baik yang larut maupun tidak larut, serta zat-zat gizi dari tumbuhan.Adapula kandungan serat, vitamin, mineral, enzim pencernaan, dan air yang tidak dapat ditemukan pada suplemen atau produk makanan lain. Dengan demikian, penting untuk mengonsumsi minimal dua porsi buah dan tiga porsi sayuran setiap hari. Ringkasan teks tersebut yang tepat adalah ....",
      options: [
        "Sayur dan buah mengandung vitamin dan mineral yang sangatpenting.",
        "Sayur dan buah merupakan sumber nutrisi yang penting untuk dikonsumsi.",
        "Sayur dan buah mengandung berbagai jenis vitamin dan mineral sehingga penting dikonsumsi untuk kesehatan manusia.",
        "Sayur dan buah mengandung vitamin dan mineral serta sebagai sumber nutrisi yang tidak ditemukan pada suplemen atau produk makanan lain.",
      ],
      answer:
        "Sayur dan buah mengandung vitamin dan mineral serta sebagai sumber nutrisi yang tidak ditemukan pada suplemen atau produk makanan lain.",
    },
    {
      id: 9,
      question:
        "“Toni yang tidak mengindahkan peringatan Paman Ijul karena merasa hebat akhirnya menderita kecelakaan.” Pola kalimat tersebut adalah . . . .",
      options: ["S-P-O-K", "S-P-O", "S-P-K", "K-S-P"],
      answer: "S-P-O",
    },
    {
      id: 10,
      question:
        "Bacalah kalimat berikut ini! 1. Saya tidak sependapat dengan hal-hal yang berkaitan dengan bullying di sekolah. 2. Menteri Dalam Negeri menyatakan bahwa saat ini perekonomian Indonesia sudah stabil. 3. Saya menyetujui apa yang dikatakan oleh Kaploda Banten mengenai larangan merokok. 4. Simpulan itu menunjukkan bahwa pelaku bullying harus ditindak dengan tegas. Berdasarkan kalimat di atas, kalimat yang menyatakan ungkapan tanggapan yang menolak atau tidak menyetujui pikiran penulis terdapat pada nomor ....",
      options: ["1", "2", "3", "4"],
      answer: "1",
    },
    {
      id: 11,
      question:
        "Teori dalam perdagangan Internasional ada dua, yaitu teori keunggulan komparatif dan teori keunggulan mutlak.Keunggulan komparatif terjadi karena suatu Negara dalam menghasilkan dan memproduksi barang dengan…",
      options: [
        "lebih mahal biaya produksi",
        "memproduksi berbagai barang yang dihasilkan Negara itu",
        "harga yang tinggi dibandingkan harga barang dari Negara lain",
        "biaya efektif dan lebih efisien dalam memproduksi suatu barang",
      ],
      answer: "biaya efektif dan lebih efisien dalam memproduksi suatu barang",
    },
    {
      id: 12,
      question:
        "Perhatikan pernyataan di bawah ini! (1) perbedaan mata uang antarnegara (2) tidak amannya suatu negara (3) kualitas sumber daya yang rendah (4) stabilnya kurs mata uang asing. Dari pernyataan tersebut yang merupakan faktor penghambat dari perdagangan internasional ditunjukkan oleh pernyataan nomor…",
      options: [
        "(1) dan (2)",
        "(1), (2), dan (3)",
        "(2) dan (3)",
        "(1), (2), (3) dan (4)",
      ],
      answer: "(1), (2), dan (3)",
    },
    {
      id: 13,
      question:
        "Untuk menghasilkan barang dengan kualitas yang baik, dibutuhkan tenaga kerja yang andal agar dapat meningkatkan daya saing ekspor. Hal ini merupakan manfaat perdagangan internasional yaitu….",
      options: [
        "meningkatkan kualitas dan kuantitas konsumsi",
        "mempersempit ketimpangan distribusi pendapatan",
        "meningkatkan kelompok bukan angkatan kerja",
        "meningkatkan kesempatan kerja",
      ],
      answer: "meningkatkan kesempatan kerja",
    },
    {
      id: 14,
      question:
        "Tujuan dari perdagangan bebas Masyarakat Ekonomi Eropa adalah sebagai berikut, kecuali …",
      options: [
        "Integrasi Eropa seperti bekerja sama, memperluas lapangan kerja, dan memperbaiki taraf hidup",
        "Meningkatkan perdagangan, menjamin keseimbangan perdagangan dan persaingan bebas",
        "Memudahkan rintangan dan hambatan lajunya perdagangan internasional",
        "Mempersempit hubungan dengan negara lain",
      ],
      answer:
        "Memudahkan rintangan dan hambatan lajunya perdagangan internasional",
    },
    {
      id: 15,
      question: "Berikut ciri-ciri perdagangan dalam negeri, kecuali …",
      options: [
        "Pembeli dan penjual biasanya bertemu",
        "Dilakukan dalam wilayah antarnegara",
        "Mata uang yang digunakan sama",
        "Tidak dikenakan bea masuk",
      ],
      answer: "Dilakukan dalam wilayah antarnegara",
    },
    {
      id: 16,
      question:
        "Fadillah is absent yesterdaybecause ....was sick",
      options: ["they", "he", "we", "her"],
      answer: "he",
    },
    {
      id: 17,
      question:
        "If it .... fine tomorrow, I .... go to Puncak.",
      options: ["Will - will", "Was - would", "Is - will", "Is - am"],
      answer: "Is - will",
    },
    {
      id: 18,
      question: "would you mind if I .... the door?",
      options: ["open", "opening", "opened", "to open"],
      answer: "opened",
    },
    {
      id: 19,
      question: "What do you always do every day?",
      options: ["I always getting up at 5 A.M", "I am always getting up at 5 A.M", "I always get up at 5 A.M", "I always got up at 5 A.M"],
      answer: "I always get up at 5 A.M",
    },
    {
      id: 20,
      question:
        "Long, long ago, when the gods and goddesses used to mingle in the affairs of mortals, there was a small kingdom on the slope of Mount Wayang in West Java. The King, named Sang Prabu, was a wise man.He had an only daughter, called Princess Teja Nirmala, who was famous for her beauty but she was not married. One day Sang Prabu made up his mind to settle the matter by a show of strength. After that, Prince of Blambangan, named Raden Begawan had won the competition. Unfortunately, the wicked fairy, Princess Segara fell in love with Raden Begawan and used magic power to render him unconscious and he forgot his wedding. When Sang Prabu was searching, Raden Begawan saw him and soon realized that he had been enchanted by the wicked fairy. The fairy could not accept this, so she killed Raden Begawan. When Princess Teja Nirmala heard this, she was very sad. So a nice fairy took her to the Kahyangan. Which one of the following statements is false aboutSang Prabu?",
      options: [
        "Sang Prabu was a father of his only daughter",
        "Sang Prabu was a king of a kingdom in West Java",
        "Sang Prabu was taken to Kahyangan by a wicked fairy",
        "Sang Prabu was a wise man",
      ],
      answer: "Sang Prabu was taken to Kahyangan by a wicked fairy",
    },
    {
      id: 21,
      question:
        "Metode reproduksi yang dilakukan dengan cara mengelupas kulit tangkai tanaman kayu, kemudian ditutup kembali dengan tanah dan dibungkus oleh plastik, disebut dengan metode ….",
      options: ["Cangkok", "Merunduk", "Setek", "Okulasi"],
      answer: "Cangkok",
    },
    {
      id: 22,
      question:
        "Jatuhnya serbuk sari pada bagian permukaan putik disebut dengan …",
      options: ["Peleburan", "Pembuahan", "Penyerbukan", "Pemupukan"],
      answer: "Penyerbukan",
    },
    {
      id: 23,
      question:
        "Penyerbukan tanaman yang dibantu oleh serangga dengan warna-warna cerah serta menarik merupakan jenis dari penyerbukan …",
      options: ["Autogami", "Geitonogami", "Entomogami", "Aogami"],
      answer: "Entomogami",
    },
    {
      id: 24,
      question:
        "Rasa sakit yang disertai dengan keluarnya nanah ketika buang air kecil dan keputihan yang berwarna kuning kehijau-hijauan pada wanita merupakan gajala dari penyakit …",
      options: ["Sifilis", "Gonore", "AIDS", "Epididitis"],
      answer: "Gonore",
    },
    {
      id: 25,
      question:
        "Jika tubuh mengalami kelebihan hormon, vitamin dan juga obat-obatan akan dikeluarkan oleh organ ….",
      options: ["Ginjal", "Jantung", "Hati", "Peru-paru"],
      answer: "Ginjal",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isReady, setIsReady] = useState(null);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  if (isFetching) {
    return (
      <Center height="100vh">
        <VStack spacing={4}>
          <Spinner size="lg" />
          <Text> Sedang Memuat Data...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <>
      {!!data?.tes === false ? (
        <div className="flex items-center justify-center h-full w-full">
          {" "}
          <div className="text-center mb-5">
            <h2 className="text-3xl text-blue-500 font-bold uppercase">
              Akses Ujian belum di Buka
            </h2>
            <h2 className="text-xl text-blue-500 font-bold uppercase">
              Silahkan hubungi Panitia
            </h2>
          </div>
        </div>
      ) : !!data?.tes?.nilai_tes_bidang_studi !== false ? (
        <>
          <div className="flex items-center justify-center h-full w-full">
            {" "}
            <div className="text-center mb-5">
              <h2 className="text-3xl text-blue-500 font-bold uppercase">
                Terimakasih telah melaksanakan Tes ini
              </h2>
            </div>
          </div>{" "}
        </>
      ) :  (
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Soal Tes Bidang Studi</h1>
          {isReady === null ? (
            <div className="mb-6 p-4 border rounded-lg">
              <p className="text-lg font-semibold">
                Apakah Anda sudah siap melaksanakan Tes Bidang Studi ini?
              </p>
              <button
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 mr-4"
                onClick={() => setIsReady(true)}
              >
                Ya
              </button>
              <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                onClick={() => setIsReady(false)}
              >
                Tidak
              </button>
            </div>
          ) : isReady === false ? (
            <p className="text-red-600 font-semibold">
              Silakan kembali lagi jika sudah siap melaksanakan Tes Bidang
              Studi.
            </p>
          ) : submitted ? (
            <p className="text-green-600 font-semibold">
              Anda sudah melaksanakan Tes Bidang Studi
            </p>
          ) : (
            <>
              {questions.map((q) => (
                <div key={q.id} className="mb-4 p-4 border rounded-lg">
                  <p className="font-semibold">
                    {q.id}. {q.question}
                  </p>
                  {q.options.map((option) => (
                    <label key={option} className="block mt-2">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={option}
                        checked={answers[q.id] === option}
                        onChange={() => handleAnswerChange(q.id, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ))}
              <button
                disabled={mutate.isLoading}
                onClick={() => {
                  Swal.fire({
                    title: "Konfirmasi",
                    text: "Apakah yakin akan mengakhiri ujian?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      const skor = calculateScore(questions, answers);

                      mutate.mutate({
                        nilai_tes_bidang_studi: skor,
                        jawaban_tes_bidang_studi: JSON.stringify(answers),
                      });
                    }
                  });
                }}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                {mutate.isLoading ? <Loading /> : " Submit Jawaban"}
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default TesStudi;
