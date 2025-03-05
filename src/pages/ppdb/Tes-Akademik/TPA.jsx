import React, { useState } from "react";
import axios from "axios";

const TPA = () => {
  const questions = [
    { id: 1, question: "Apa persamaan kata dari kesahihan?", options: ["Kebenaran", "Kemantapan", "Kesalahan", "Kematangan"], answer: "Kebenaran" },
    { id: 2, question: "Apa sinonim dari kata terkenal?", options: ["Kaya", "Terhormat", "Populer", "Berani"], answer: "Populer" },
    { id: 3, question: "Kata yang memiliki makna sinonim dengan “cerah” adalah …", options: ["Gelap", "Terang", "Suram", "Redup"], answer: "Terang" },
    { id: 4, question: "Apa Lawan kata dari “Kendala”?", options: ["Hanbatan", "Pendukung", "Ujian", "Halangan"], answer: "Pendukung" },
    { id: 5, question: "Apa Lawan Kata dari “Lazim” ?", options: ["Jujur", "Benci", "Lumrah", "Beda"], answer: "Beda" },
    { id: 6, question: "KARNIVORA : SINGA =...:... ", options: ["Herbivora : sapi", "Reptilia : buaya", "Omnivora : harimau", "Herbivora : omnivora"], answer: "Herbivora : sapi" },
    { id: 7, question: "INDONESIA : BELANDA =...:... ", options: ["Singapura : China", "Australia : Selandia Baru", "India : Spanyol", "Malaysia : Inggris"], answer: "Malaysia : Inggris" },
    { id: 8, question: "JATUH : SAKIT = MENGANTUK :... ", options: ["Berjalan", "Tersenyum", "Tidur", "Teriakan"], answer: "Tidur" },
    { id: 9, question: "Jika, PASIEN : DOKTER : RESEP, maka analogi lainnya? ", options: ["Murid: Guru : Tes", "Penumpang : Sopir : Suntikan", "Pasien : Suster : Suntikan", "Masinis : Kereta : Rel"], answer: "Penumpang : Sopir : Suntikan" },
    { id: 10, question: "Babak : Drama = … : … ", options: ["Bab : Buku", "Halaman : Novel", "Rima : Puisi", "Lagu : Musik"], answer: "Bab : Buku" },
    { id: 11, question: "4, 0, 8, 4, 12, 8, ...", options: ["8", "16", "20", "24"], answer: "16" },
    { id: 12, question: "3, 6, 4, 8, 6, ..., ...", options: ["24, 12", "24, 36", "12, 10", "12, 18"], answer: "12, 10" },
    { id: 13, question: "A, C, E, G, I, ….", options: ["D", "F", "H", "J"], answer: "J" },
    { id: 14, question: "Jika semua kucing suka susu, dan Tom adalah seekor kucing, maka apa kesimpulan yang dapat ditarik?", options: ["Tom suka susu", "Semua kucing adalah Tom", "Semua hewan adalah kucing", "Semua hewan suka susu"], answer: "Tom suka susu" },
    { id: 15, question: "Semua manusia adalah makhluk hidup. Bunga adalah makhluk hidup.", options: ["Bunga adalah makhluk hidup", "Semua bunga adalah manusia", "Beberapa bunga adalah manusia", "Tidak ada kesimpulan"], answer: "Bunga adalah makhluk hidup" },
    { id: 16,
      question: <img src="https://res.cloudinary.com/dgia2eql8/image/upload/v1700000000/6ccf1cd91168c3c4afc6c6c27bab9362.jpg" alt="Soal Gambar" width="200" />,
      options: ["A", "B", "C", "D"],
      answer: "B"},
    { id: 17,
      question: <img src="https://collection.cloudinary.com/dgia2eql8/1b995aa94af99ade86f4b7b0bbb357d4.jpg" alt="Soal Gambar" width="200" />,
      options: ["A", "B", "C", "D"],
      answer: "C"},
    { id: 18,
      question: <img src="https://collection.cloudinary.com/dgia2eql8/9cca28c1cf1df2404f60e5f28a3e48ba.jpg" alt="Soal Gambar" width="200" />,
      options: ["A", "B", "C", "D"],
      answer: "C"},
    { id: 19,
      question: <img src="https://collection.cloudinary.com/dgia2eql8/eb87ef41164e44078322700d8157e69c.jpg" alt="Soal Gambar" width="200" />,
      options: ["A", "B", "C", "D"],
      answer: "C"},
    { id: 20,
      question: <img src="https://collection.cloudinary.com/dgia2eql8/3210d31981f191b14b9caf52218b5187.jpg" alt="Soal Gambar" width="200" />,
      options: ["A", "B", "C", "D"],
      answer: "B"}
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isReady, setIsReady] = useState(null);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {

    return console.log("answer", answers)
    try {
      await axios.post("https://api.example.com/save-answers", { answers, questions });
      setSubmitted(true);
      alert("Jawaban berhasil dikirim!");
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Gagal mengirim jawaban.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Soal Tes Potensi Akademik</h1>
      {isReady === null ? (
        <div className="mb-6 p-4 border rounded-lg">
          <p className="text-lg font-semibold">Apakah Anda sudah siap melaksanakan Tes Potensi Akademik ini?</p>
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
        <p className="text-red-600 font-semibold">Silakan kembali lagi jika sudah siap melaksanakan Tes Potensi Akademik.</p>
      ) : submitted ? (
        <p className="text-green-600 font-semibold">Anda sudah melaksanakan Tes Potensi Akademik</p>
      ) : (
        <>
          {questions.map((q) => (
            <div key={q.id} className="mb-4 p-4 border rounded-lg">
              <p className="font-semibold">{q.id}. {q.question}</p>
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
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Submit Jawaban
          </button>
        </>
      )}
    </div>
  );
};

export default TPA;
