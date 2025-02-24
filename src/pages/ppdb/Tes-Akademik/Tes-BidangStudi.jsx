import React, { useState } from "react";
import axios from "axios";

const QuizPage = () => {
  const questions = [
    { id: 1, question: "Nabi Muhammad SAW. pernah tinggal dan hidup berdampingan dengan kaum kafir dan kaum musyrik Makkah. Hal tersebut menunjukan sikap. . . .", options: ["Moderat", "Toleransi", "Egois", "Otoriter"], answer: "Toleransi" },
    { id: 2, question: "Di Negara Indonesia warganya memiliki agama dan keyakinan yang berbeda-beda. Untuk mengatur kehidupan bersama diperlukan. . .", options: ["Kekuatan militer untuk memaksa para warga negaranya", "Peraturan untuk menekan warga yang tidak mau mengikuti kemauan minoritas", "Peraturan bersama dan menempatkan kedudukan yang sama di depan hukum", "Kebersamaan dalam menguasai parlemen"], answer: "Peraturan bersama dan menempatkan kedudukan yang sama di depan hukum" },
    { id: 3, question: "Sesungguhnya orang yang paling mulia di sisi Allah swt. dikarenakan. . . . ", options: ["Tinggi Ilmunya", "Banyak Ibadahnya", "Banyak Kedermawanannya", "Derajat Ketakwaannya"], answer: "Derajat Ketakwaannya" },
    { id: 4, question: "Meskipun penduduk Indonesia merupakan kaum mayoritas, kita tidak pernah menindas kaum minoritas. Sikap demikian merupakan aplikasi dari ajaran islam, yaitu. . . .", options: ["Tabayun", "Tawadhu’", "Toharoh", "Tasammuh"], answer: "Tasammuh" },
    { id: 5, question: "Kita hidup dinegara yang berdasarkan Pancasila. Sikap terbaik yang harus kita tunjukan adalah... ", options: ["Menghargai ajaran agama kita dan sesekali saja jika mengikuti agama yang lain", "Mengikuti acara keyakinan yang dianut oleh orang lain sesuai peraturan yang diberlakukan", "Membenci pemeluk agama lain", "Menghargai dan menghormati keyakinan orang lain sesuai ajaran agama dengan mentaati peraturan"], answer: "Menghargai dan menghormati keyakinan orang lain sesuai ajaran agama dengan mentaati peraturan" },
    { id: 6, question: "Sebagai pelajar yang beriman, kita wajib memahami konteks kehidupan di dunia ini di mana kita hidup, belajar, dan bekerja. Agar memahami konteks kejadian yang terjadi di dunia, maka kita harus mengenal bahwa taqdir Allah itu dapat dibedakan menjadi. . . .", options: ["Dua macam", "Tiga macam", "Empat macam", "Enam macam"], answer: "Dua macam" },
    { id: 7, question: "Taqdir (ketentuan) Allah swt. yang tidak dapat diubah oleh siapapun disebut taqdir. . . .", options: ["Mutawasitah", "Muallaq", "Mukhaffafah", "Mubram"], answer: "Mubram" },
    { id: 8, question: "Seseorang mendapati saudaranya mengalami sakit parah, kemudian sudah ia upayakan penyembuhan dengan segala cara, namun akhirnya meningal juga. Sikap terbaik yang harus ia lakukan adalah. . . .", options: ["Menyesali", "Bertasbih dengan sebaik-baiknya dan khusyu’", "Mengimani qadha dan qadar Allah swt. dengan bersabar ", "Bersedih atau berkabung empat puluh hari"], answer: "Mengimani qadha dan qadar Allah swt. dengan bersabar " },
    { id: 9, question: "Manusia itu hanya bisa berusaha, namun penentu dari segala hasil akhir adalah Allah swt. pernyataan tersebut adalah. . . .", options: ["Benar sesuai ajaran agama", "Benar manakala usahanya sesuai dengan yang ditentukan Allah SWT", "Benar ketentuan Allah dan tidak dapat diubah keadaanya", "Benar hanya ketika ketentuan bersamaan dengan usaha manusia"], answer: "Benar manakala usahanya sesuai dengan yang ditentukan Allah SWT" },
    { id: 10, question: "Sebagai hamba yang beriman,kita harus rela dan ikhlas terhadap apaun yang kita terima dari Allah swt. seraya berbaik sangka kepada ketetapan Allah swt. bahwa itulah yang terbaik. Sikap demikian disebut. . . .", options: ["Tawakal", "Tafakur", "Tasyakur", "Takabur"], answer: "Tawakal" },
    
    // Akan ditambhakn 40 soal lagi di sini
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isReady, setIsReady] = useState(null);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
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
      <h1 className="text-2xl font-bold mb-4">Kuis Pilihan Ganda</h1>
      {isReady === null ? (
        <div className="mb-6 p-4 border rounded-lg">
          <p className="text-lg font-semibold">Apakah Anda sudah siap melaksanakan Tes Akademik ini?</p>
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
        <p className="text-red-600 font-semibold">Silakan kembali lagi jika sudah siap melaksanakan Tes Akademik.</p>
      ) : submitted ? (
        <p className="text-green-600 font-semibold">Anda sudah melaksanakan Tes Akademik</p>
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

export default QuizPage;
