import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import {
  Spinner,
  useDisclosure,
  useToast,
  Text,
  Flex,
  Center,
  VStack,
} from "@chakra-ui/react";
import { getDetail, useSimpanWawancara } from "../../../api/santri";
import Swal from "sweetalert2";
import { calculateScore } from "./TPA";
import Loading from "../../../components/loading";

const Wawancara = () => {
  const mutate = useSimpanWawancara();
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
      question: "Apa yang ananda ketahui tentang MAN 1 Kota Sukabumi?",
      options: [
        "MAN 1 Kota Sukabumi terkenal dengan prestasi akademiknya",
        "MAN 1 Kota Sukabumi terkenal dengan prestasi non akademiknya",
        "MAN 1 Kota Sukabumi terkenal dengan prestasi akademik dan non akademik",
        "Saya tidak mengetahui tentang MAN 1 Kota Sukabumi",
      ],
      answer:
        "MAN 1 Kota Sukabumi terkenal dengan prestasi akademik dan non akademik",
    },
    {
      id: 2,
      question:
        "Apa yang memotivasi ananda untuk melanjutkan ke MAN 1 Kota Sukabumi?",
      options: [
        "Karena MAN 1 Kota Sukabumi memiliki fasilitas lengkap dan guru yang berkualitas",
        "Karena MAN 1 Kota Sukabumi terdekat dari rumah",
        "Karena teman-teman saya mendaftar ke MAN 1 Kota Sukabumi",
        "Karena Madrasah mempunyai nilai plus dalam pembelajaran PAI serta guru yang berkualitas",
      ],
      answer:
        "Karena Madrasah mempunyai nilai plus dalam pembelajaran PAI serta guru yang berkualitas",
    },
    {
      id: 3,
      question: "Bagaimana ananda mempersiapkan diri untuk ujian PPDB ini?",
      options: [
        "Saya belajar dengan intensif setiap hari",
        "Saya hanya mempersiapkan diri pada malam sebelum ujian",
        "Saya belum mempersiapkan diri sama sekali",
        "Saya mengandalkan bantuan teman untuk belajar",
      ],
      answer: "Saya belajar dengan intensif setiap hari",
    },
    {
      id: 4,
      question:
        "Kelebihan apa yang ananda miliki untuk menunjang kesuksesan di MAN 1 Kota Sukabumi?",
      options: [
        "Saya memiliki kemampuan akademik yang baik",
        "Saya memiliki kemampuan dalam olahraga ",
        "Saya memiliki kemampuan dalam seni yang baik",
        "Semua jawaban benar",
      ],
      answer: "Semua jawaban benar",
    },
    {
      id: 5,
      question: "Bagaimana aktifitas ananda setiap pagi?",
      options: [
        "Saya terbiasa bangun di waktu subuh serta membersihkan kamar secara mandiri",
        "Saya terbiasa bangun di waktu subuh tetapi di ingatkan untuk membersihkan kamar secara mandiri",
        "Saya sulit bangun di waktu subuh dan terkadang membersihkan kamar secara mandiri",
        "Saya terkadang dibangun oleh orang tua di waktu subuh dan terbiasa membersihkan kamar secara mandiri",
      ],
      answer:
        "Saya terbiasa bangun di waktu subuh serta membersihkan kamar secara mandiri",
    },
    {
      id: 6,
      question: "Bagaimana kebiasan dalam ibadah ananda?",
      options: [
        "Saya terbiasa shalat berjamaah di Masjid dan terkadang baca Al-Qur’an",
        "Saya terkadang shalat berjamaah di Masjid dan tidak baca Al-Qur’an",
        "Saya selalu shalat berjamaah di awal waktu dan terkadang baca Al-Qur;an",
        "Saya terbiasa shalat berjamaah di Masjid dan selalu baca Al-Qur’an setiap hari",
      ],
      answer:
        "Saya terbiasa shalat berjamaah di Masjid dan selalu baca Al-qur’an setiap hari",
    },
    {
      id: 7,
      question: "Bagaimana kebiasan ananda di masa lalu?",
      options: [
        "Saya pernah merokok, memiliki pacar serta pernah bolos sekolah",
        "Saya sering merokok, memiliki pacar namun tidak pernah bolos sekolah",
        "Saya tidak merokok, memiliki pacar namun pernah bolos sekolah",
        "Saya tidak merokok, tidak memiliki pacar dan tidak pernah bolos sekolah",
      ],
      answer:
        "Saya tidak merokok, tidak memiliki pacar dan tidak pernah bolos sekolah",
    },
    {
      id: 8,
      question: "Organasi apa yang pernah di ikuti di masa MTs/SMP?",
      options: [
        "Saya pernah menjadi pengurus OSIS",
        "Saya pernah menjadi pengurus ekstrakulikuler",
        "Saya pernah menjadi pengurus OSIS dan Ekstrakulikuler",
        "Saya tidak pernah menjadi pengurus OSIS dan Ekstrakulikuler",
      ],
      answer: "Saya pernah menjadi pengurus OSIS dan Ekstrakulikuler",
    },
    {
      id: 9,
      question: "Bagaimana kebiasan ananda dalam menggunakan hp?",
      options: [
        "Saya terbiasa bermedia sosial dan bermain game",
        "Saya terbiasa bermain game namun tidak bermedia sosial",
        "Saya terkadang bermedia sosial dan tidak bermain game",
        "Saya terkadang bermedia sosial, terkadang bermain game dan terbiasa menggunakan untuk pembelajaran",
      ],
      answer:
        "Saya terkadang bermedia sosial, terkadang bermain game dan terbiasa menggunakan untuk pembelajaran",
    },
    {
      id: 10,
      question:
        "Jika ananda diterima di MAN 1 Kota Sukabumi, apa harapan anda ke depannya?",
      options: [
        "Saya berharap bisa ikut dalam kegiatan ekstrakulikuler yang saya minati",
        "Saya berharap bisa melanjutkan pendidikan di perguruan tinggi",
        "Saya berharap bisa mendaptkan ilmu yang bermanfaat",
        "Semua jawaban benar",
      ],
      answer: "Semua jawaban benar",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isReady, setIsReady] = useState(null);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    return console.log("answer", answers);
    try {
      await axios.post("https://api.example.com/save-answers", {
        answers,
        questions,
      });
      setSubmitted(true);
      alert("Jawaban berhasil dikirim!");
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Gagal mengirim jawaban.");
    }
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
      )  : !!data?.tes?.nilai_wawancara !== false ? (
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
      ) : (
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Wawancara Psikologi</h1>
          {isReady === null ? (
            <div className="mb-6 p-4 border rounded-lg">
              <p className="text-lg font-semibold">
                Apakah Anda sudah siap melaksanakan Wawancara Psikologi dan
                Memberikan Jawaban yang Jujur?
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
              Silakan kembali lagi jika sudah siap melaksanakan Wawancara
              Psikologi.
            </p>
          ) : submitted ? (
            <p className="text-green-600 font-semibold">
              Anda sudah melaksanakan Wawancara Psikologi
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
                        nilai_wawancara: skor,
                        jawaban_wawancara: JSON.stringify(answers),
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

export default Wawancara;
