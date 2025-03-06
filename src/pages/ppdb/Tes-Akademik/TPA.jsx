import React, { useState } from "react";
import axios from "axios";
import { getDetail, useSimpanTPA } from "../../../api/santri";
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
import Swal from "sweetalert2";
import Loading from "../../../components/loading";
const TPA = () => {
  const mutate = useSimpanTPA();
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
      question: "Apa persamaan kata dari kesahihan?",
      options: ["Kebenaran", "Kemantapan", "Kesalahan", "Kematangan"],
      answer: "Kebenaran",
    },
    {
      id: 2,
      question: "Apa sinonim dari kata terkenal?",
      options: ["Kaya", "Terhormat", "Populer", "Berani"],
      answer: "Populer",
    },
    {
      id: 3,
      question: "Kata yang memiliki makna sinonim dengan “cerah” adalah …",
      options: ["Gelap", "Terang", "Suram", "Redup"],
      answer: "Terang",
    },
    {
      id: 4,
      question: "Apa Lawan kata dari “Kendala”?",
      options: ["Hanbatan", "Pendukung", "Ujian", "Halangan"],
      answer: "Pendukung",
    },
    {
      id: 5,
      question: "Apa Lawan Kata dari “Lazim” ?",
      options: ["Jujur", "Benci", "Lumrah", "Beda"],
      answer: "Beda",
    },
    {
      id: 6,
      question: "KARNIVORA : SINGA =...:... ",
      options: [
        "Herbivora : sapi",
        "Reptilia : buaya",
        "Omnivora : harimau",
        "Herbivora : omnivora",
      ],
      answer: "Herbivora : sapi",
    },
    {
      id: 7,
      question: "INDONESIA : BELANDA =...:... ",
      options: [
        "Singapura : China",
        "Australia : Selandia Baru",
        "India : Spanyol",
        "Malaysia : Inggris",
      ],
      answer: "Malaysia : Inggris",
    },
    {
      id: 8,
      question: "JATUH : SAKIT = MENGANTUK :... ",
      options: ["Berjalan", "Tersenyum", "Tidur", "Teriakan"],
      answer: "Tidur",
    },
    {
      id: 9,
      question: "Jika, PASIEN : DOKTER : RESEP, maka analogi lainnya? ",
      options: [
        "Murid: Guru : Tes",
        "Penumpang : Sopir : Suntikan",
        "Pasien : Suster : Suntikan",
        "Masinis : Kereta : Rel",
      ],
      answer: "Penumpang : Sopir : Suntikan",
    },
    {
      id: 10,
      question: "Babak : Drama = … : … ",
      options: [
        "Bab : Buku",
        "Halaman : Novel",
        "Rima : Puisi",
        "Lagu : Musik",
      ],
      answer: "Bab : Buku",
    },
    {
      id: 11,
      question: "4, 0, 8, 4, 12, 8, ...",
      options: ["8", "16", "20", "24"],
      answer: "16",
    },
    {
      id: 12,
      question: "3, 6, 4, 8, 6, ..., ...",
      options: ["24, 12", "24, 36", "12, 10", "12, 18"],
      answer: "12, 10",
    },
    {
      id: 13,
      question: "A, C, E, G, I, ….",
      options: ["D", "F", "H", "J"],
      answer: "J",
    },
    {
      id: 14,
      question:
        "Jika semua kucing suka susu, dan Tom adalah seekor kucing, maka apa kesimpulan yang dapat ditarik?",
      options: [
        "Tom suka susu",
        "Semua kucing adalah Tom",
        "Semua hewan adalah kucing",
        "Semua hewan suka susu",
      ],
      answer: "Tom suka susu",
    },
    {
      id: 15,
      question:
        "Semua manusia adalah makhluk hidup. Bunga adalah makhluk hidup.",
      options: [
        "Bunga adalah makhluk hidup",
        "Semua bunga adalah manusia",
        "Beberapa bunga adalah manusia",
        "Tidak ada kesimpulan",
      ],
      answer: "Bunga adalah makhluk hidup",
    },
    {
      id: 16,
      question: (
        <img
          src="https://res.cloudinary.com/deywagux7/image/upload/v1741221525/WhatsApp_Image_2025-03-05_at_08.37.05_hgy05o.jpg"
          alt="Soal Gambar"
          width="200"
        />
      ),
      options: ["A", "B", "C", "D", "E", "E"],
      answer: "B",
    },
    {
      id: 17,
      question: (
        <img
          src="https://res.cloudinary.com/deywagux7/image/upload/v1741221616/74da0a20-73b6-46c3-81b7-e7ad768383e8.png"
          alt="Soal Gambar"
          width="200"
        />
      ),
      options: ["A", "B", "C", "D", "E"],
      answer: "C",
    },
    {
      id: 18,
      question: (
        <img
          src="https://res.cloudinary.com/deywagux7/image/upload/v1741221644/f16790cf-8617-4fea-97af-947b3c00491a.png"
          alt="Soal Gambar"
          width="200"
        />
      ),
      options: ["A", "B", "C", "D", "E"],
      answer: "C",
    },
    {
      id: 19,
      question: (
        <img
          src="https://res.cloudinary.com/deywagux7/image/upload/v1741221686/75224008-b815-4f0c-a5eb-7fdd17d39b66.png"
          alt="Soal Gambar"
          width="200"
        />
      ),
      options: ["A", "B", "C", "D", "E"],
      answer: "C",
    },
    {
      id: 20,
      question: (
        <img
          src="https://res.cloudinary.com/deywagux7/image/upload/v1741221720/506b0429-f20e-4c0a-8b19-26156703fe11.png"
          alt="Soal Gambar"
          width="200"
        />
      ),
      options: ["A", "B", "C", "D", "E"],
      answer: "B",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isReady, setIsReady] = useState(null);

  console.log("data", data);

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
      ) : !!data?.tes?.nilai_tes_akademik !== false ? (
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
          <h1 className="text-2xl font-bold mb-4">Soal Tes Potensi Akademik</h1>
          {isReady === null ? (
            <div className="mb-6 p-4 border rounded-lg">
              <p className="text-lg font-semibold">
                Apakah Anda sudah siap melaksanakan Tes Potensi Akademik ini?
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
              Silakan kembali lagi jika sudah siap melaksanakan Tes Potensi
              Akademik.
            </p>
          ) : submitted ? (
            <p className="text-green-600 font-semibold">
              Anda sudah melaksanakan Tes Potensi Akademik
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
                        nilai_tes_akademik: skor,
                        jawaban_tes_akademik: JSON.stringify(answers),
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

export default TPA;

export function calculateScore(questions, userAnswers) {
  let score = 0;
  questions.forEach((q, index) => {
    if (q.correctAnswer === userAnswers[index]) {
      score += 1;
    }
  });
  return score;
}
