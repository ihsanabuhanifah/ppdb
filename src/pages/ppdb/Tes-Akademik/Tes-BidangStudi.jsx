import React, { useState } from "react";
import axios from "axios";

const TesAkademik = () => {
  const questions = [
    { id: 1, question: "Nabi Muhammad Shallahu Alaihi Wasallam pernah tinggal dan hidup berdampingan dengan kaum kafir dan kaum musyrik Makkah. Hal tersebut menunjukan sikap. . . .", options: ["Moderat", "Toleransi", "Egois", "Otoriter"], answer: "Toleransi" },
    { id: 2, question: "Di Negara Indonesia warganya memiliki agama dan keyakinan yang berbeda-beda. Untuk mengatur kehidupan bersama diperlukan. . .", options: ["Kekuatan militer untuk memaksa para warga negaranya", "Peraturan untuk menekan warga yang tidak mau mengikuti kemauan minoritas", "Peraturan bersama dan menempatkan kedudukan yang sama di depan hukum", "Kebersamaan dalam menguasai parlemen"], answer: "Peraturan bersama dan menempatkan kedudukan yang sama di depan hukum" },
    { id: 3, question: "Sesungguhnya orang yang paling mulia di sisi Allah swt. dikarenakan. . . . ", options: ["Tinggi Ilmunya", "Banyak Ibadahnya", "Banyak Kedermawanannya", "Derajat Ketakwaannya"], answer: "Derajat Ketakwaannya" },
    { id: 4, question: "Meskipun penduduk Indonesia merupakan kaum mayoritas, kita tidak pernah menindas kaum minoritas. Sikap demikian merupakan aplikasi dari ajaran islam, yaitu. . . .", options: ["Tabayun", "Tawadhu’", "Toharoh", "Tasammuh"], answer: "Tasammuh" },
    { id: 5, question: "Kita hidup dinegara yang berdasarkan Pancasila. Sikap terbaik yang harus kita tunjukan adalah... ", options: ["Menghargai ajaran agama kita dan sesekali saja jika mengikuti agama yang lain", "Mengikuti acara keyakinan yang dianut oleh orang lain sesuai peraturan yang diberlakukan", "Membenci pemeluk agama lain", "Menghargai dan menghormati keyakinan orang lain sesuai ajaran agama dengan mentaati peraturan"], answer: "Menghargai dan menghormati keyakinan orang lain sesuai ajaran agama dengan mentaati peraturan" },
    { id: 6, question: "Sebagai pelajar yang beriman, kita wajib memahami konteks kehidupan di dunia ini di mana kita hidup, belajar, dan bekerja. Agar memahami konteks kejadian yang terjadi di dunia, maka kita harus mengenal bahwa taqdir Allah itu dapat dibedakan menjadi. . . .", options: ["Dua macam", "Tiga macam", "Empat macam", "Enam macam"], answer: "Dua macam" },
    { id: 7, question: "Taqdir (ketentuan) Allah swt. yang tidak dapat diubah oleh siapapun disebut taqdir. . . .", options: ["Mutawasitah", "Muallaq", "Mukhaffafah", "Mubram"], answer: "Mubram" },
    { id: 8, question: "Seseorang mendapati saudaranya mengalami sakit parah, kemudian sudah ia upayakan penyembuhan dengan segala cara, namun akhirnya meningal juga. Sikap terbaik yang harus ia lakukan adalah. . . .", options: ["Menyesali", "Bertasbih dengan sebaik-baiknya dan khusyu’ ", "Mengimani qadha dan qadar Allah swt. dengan bersabar ", "Bersedih atau berkabung empat puluh hari"], answer: "Mengimani qadha dan qadar Allah swt. dengan bersabar " },
    { id: 9, question: "Manusia itu hanya bisa berusaha, namun penentu dari segala hasil akhir adalah Allah swt. pernyataan tersebut adalah. . . .", options: ["Benar sesuai ajaran agama", "Benar manakala usahanya sesuai dengan yang ditentukan Allah SWT", "Benar ketentuan Allah dan tidak dapat diubah keadaanya", "Benar hanya ketika ketentuan bersamaan dengan usaha manusia"], answer: "Benar manakala usahanya sesuai dengan yang ditentukan Allah SWT" },
    { id: 10, question: "Sebagai hamba yang beriman,kita harus rela dan ikhlas terhadap apaun yang kita terima dari Allah swt. seraya berbaik sangka kepada ketetapan Allah swt. bahwa itulah yang terbaik. Sikap demikian disebut. . . .", options: ["Tawakal", "Tafakur", "Tasyakur", "Takabur"], answer: "Tawakal" },
    { id: 11, question: "Bacalah paragraf berikut dengan seksama! Pukul 11 siang setelah pulang sekolah badan terasa lemas dan perut sakit. Lalu ibu mengungkit kejadian tadi malam dan menashatiku.Tidak tega mealihat aku kesakitan, ibu menyuruhku makan kemudian minum obat, jika benar-benar tidak kuat lagi berpuasa. Berdasarkan isinya, paragraf tersebut termasuk unsur teks eksemplum pada bagian ...", options: ["Orientasi", "Insiden", "Interpretasi", "Koda"], answer: "Insiden" },
    { id: 12, question: "Perhatikan penulisan kalimat judul teks eksemplum berikut ini. tragedi menginap di kost. Penulisan kalimat judul yang sesuai dengan ejaan yang benar adalah ...", options: ["Tragedi menginap di kost.", "Tragedi Menginap Di Kost.", "Tragedi Menginap di Kost", "tragedi menginap di kost"], answer: "Tragedi Menginap di Kost" },
    { id: 13, question: "Akhirnya, setelah berpamitan aku langsung ke arah parkiran mobilku.Tiba-tiba saat aku hendak masuk ke dalam mobilku, tiba-tiba ada seorang lelaki yang menarik tanganku dan mendekap mulutku. Lalu laki-laki tersebut mengatakan “Berikan uang atau kau mati!”. Kata rujukan dalam kutipan teks di atas adalah ...", options: ["Lalu", "Tersebut", "Setelah", "dan"], answer: "Tersebut" },
    { id: 14, question: "Bacalah ilustrasi peristiwa berikut dengan cermat! Kebelet di Tempat Umum. Daffa ingat betul, ketika pagi tadi berangkatdari rumah, ia melihat sepiring ketoprak kesukaannya tergeletak di meja. Ia langsung menghabiskan makanan tersebut sampai ludes,walaupun rasa pedas sedikit menyiksanya. Sekarang, di halte bus ini,Daffa merasakan perutnya sangat sakit,dan ingin cepat buang air besar. Interpretasi yang kurang tepat terhadap peristiwa tersebut adalah ...", options: ["Sakit perut yang dialami Daffa, disebabkan sifatrakusnya akan makanan milik orang lain", "Kalau saja Daffa tidak menghabiskan ketoprak tersebut,mungkin dia tidak akan sakit perut", "Makan makanan dengan rasa pedas saat pagi hari akan memicu sakitperut dan mulas.", "Sakit perut dan rasa ingin buang air besar dimungkinkan karena makan makanan pedas"], answer: "Sakit perut yang dialami Daffa, disebabkan sifatrakusnya akan makanan milik orang lain" },
    { id: 15, question: "Bacalah paragraf berikut! Pentas Seni SMP Denabel telah berakhir dengan sukses. Kerja keras panitia membuahkan hasil yang sangat memuaskan. Mulai dari seksi acara, konsumsi, seksi keamanan semua berjalan baik. Namun, ada satu hal yang terlupakan, yaitu koordinasi.Koordinasi antara panitia dengan pihak sekolah kurang terjalin, sehingga ada beberapa hal yang tidak berjalan. Banyak guru di sekolah tersebut yang tidak hadir karena keterbatasan informasi. Acara lebih didominasi acara siswa. Lebih terkesan,tidak ada guru pun, acara tetap berjalan. Struktur teks Tanggapan Kritis yang tepat untuk paragraf tersebutadalah ...", options: ["Evaluasi", "Tafsiran", "Kesimpulan", "Abstrak"], answer: "Evaluasi" },
    { id: 16, question: "Bacalah kalimat-kalimat berikut ini! 1. Alasan berikutnya adalah data yang menyatakan bahwa ada korelasi negatif, yaitu anak yang bermain game online menjadi tidak peduli dengan lingkungan. Anak hanya akan peduli pada dirinya sendiri. 2. Penelitian yang dilakukan oleh mahasiswa Universitas Indonesia (UI) pada 2009 mengatakan bahwa ada hubungan antara kecenderungan game online dengan ranah keterampilan social. 3. Kesehatan mata, kebugaran fisik, dan pola hidup sehat dapat diselesaikan jika orang tua dan anak-anak selalu berkomunikasi. 4. Secara umum saya sebagai penanggap sepakat dengan alasan yang mengatakan bahwa game online memiliki dampak negatif. Dari kalimat-kalimat di atas, yang termasuk ke dalam ungkapan penguatan adalah nomor..", options: ["1", "2", "3", "4"], answer: "3" },
    { id: 17, question: "Cermatilah teks eksposisi berikut ini! Sayur dan buah mengandung vitamin dan mineral mulai vitamin A, C, E, asam folat, zinc, magnesium, kalsium, dan potassium.Kedua sumber nutrisi juga engandung antioksidan, serat baik yang larut maupun tidak larut, serta zat-zat gizi dari tumbuhan.Adapula kandungan serat, vitamin, mineral, enzim pencernaan, dan air yang tidak dapat ditemukan pada suplemen atau produk makanan lain. Dengan demikian, penting untuk mengonsumsi minimal dua porsi buah dan tiga porsi sayuran setiap hari. Ringkasan teks tersebut yang tepat adalah ....", options: ["Sayur dan buah mengandung vitamin dan mineral yang sangatpenting.", "Sayur dan buah merupakan sumber nutrisi yang penting untuk dikonsumsi.", "Sayur dan buah mengandung berbagai jenis vitamin dan mineral sehingga penting dikonsumsi untuk kesehatan manusia.", "Sayur dan buah mengandung vitamin dan mineral serta sebagai sumber nutrisi yang tidak ditemukan pada suplemen atau produk makanan lain."], answer: "Sayur dan buah mengandung vitamin dan mineral serta sebagai sumber nutrisi yang tidak ditemukan pada suplemen atau produk makanan lain." },
    { id: 18, question: "“Toni yang tidak mengindahkan peringatan Paman Ijul karena merasa hebat akhirnya menderita kecelakaan.” Pola kalimat tersebut adalah . . . .", options: ["S-P-O-K", "S-P-O", "S-P-K", "K-S-P"], answer: "S-P-O" },
    { id: 19, question: "Bacalah kalimat berikut ini! 1. Saya tidak sependapat dengan hal-hal yang berkaitan dengan bullying di sekolah. 2. Menteri Dalam Negeri menyatakan bahwa saat ini perekonomian Indonesia sudah stabil. 3. Saya menyetujui apa yang dikatakan oleh Kaploda Banten mengenai larangan merokok. 4. Simpulan itu menunjukkan bahwa pelaku bullying harus ditindak dengan tegas. Berdasarkan kalimat di atas, kalimat yang menyatakan ungkapan tanggapan yang menolak atau tidak menyetujui pikiran penulis terdapat pada nomor ....", options: ["1", "2", "3", "4"], answer: "1" },
    { id: 20, question: "Bacalah kalimat berikut ini! 1. Saya tidak sependapat dengan hal-hal yang berkaitan dengan bullying di sekolah. 2. Menteri Dalam Negeri menyatakan bahwa saat ini perekonomian Indonesia sudah stabil. 3. Saya menyetujui apa yang dikatakan oleh Kaploda Banten mengenai larangan merokok. 4. Simpulan itu menunjukkan bahwa pelaku bullying harus ditindak dengan tegas. Berdasarkan kalimat di atas, kalimat yang menyatakan Ungkapan tanggapan dengan sudut pandang orang lain, terdapat pada kalimat nomor...", options: ["1", "2", "3", "4"], answer: "2" },
    { id: 21, question: "Teori dalam perdagangan Internasional ada dua, yaitu teori keunggulan komparatif dan teori keunggulan mutlak.Keunggulan komparatif terjadi karena suatu Negara dalam menghasilkan dan memproduksi barang dengan…", options: ["lebih mahal biaya produksi", "memproduksi berbagai barang yang dihasilkan Negara itu", "harga yang tinggi dibandingkan harga barang dari Negara lain", "biaya efektif dan lebih efisien dalam memproduksi suatu barang"], answer: "biaya efektif dan lebih efisien dalam memproduksi suatu barang" },
    { id: 22, question: "Seorang pengusaha kiranya harus mempunyai bekal dalam menghadapi suatu persaingan yang terjadi dalam perdagangan adalah tingkat harga. Upaya pengusaha untuk menghadapi persaingan harga dengan produsen lain adalah…", options: ["memberikan bonus untuk pembelian tertentu", "mengurangi kualitas produk yang dihasilkan", "menurunkan harga jual di bawah harga pesaing", "menyebarkan isu negatif terhadap produk pesaing"], answer: "menurunkan harga jual di bawah harga pesaing" },
    { id: 23, question: "Perhatikan pernyataan di bawah ini! (1) perbedaan mata uang antarnegara (2) tidak amannya suatu negara (3) kualitas sumber daya yang rendah (4) stabilnya kurs mata uang asing. Dari pernyataan tersebut yang merupakan faktor penghambat dari perdagangan internasional ditunjukkan oleh pernyataan nomor…", options: ["(1) dan (2)", "(1), (2), dan (3)", "(2) dan (3)", "(1), (2), (3) dan (4)"], answer: "(1), (2), dan (3)" },
    { id: 24, question: "Untuk menghasilkan barang dengan kualitas yang baik, dibutuhkan tenaga kerja yang andal agar dapat meningkatkan daya saing ekspor. Hal ini merupakan manfaat perdagangan internasional yaitu….", options: ["meningkatkan kualitas dan kuantitas konsumsi", "mempersempit ketimpangan distribusi pendapatan", "meningkatkan kelompok bukan angkatan kerja", "meningkatkan kesempatan kerja"], answer: "meningkatkan kesempatan kerja" },
    { id: 25, question: "Negara Indonesia menjual barang (x) dengan harga di luar negeri lebih murah daripada di dalam negeri. Tujuan negara Indonesia melakukan kebijakan tersebut yaitu agar negara Indonesia dapat menguasai pasar. Kebijakan yang dilakukan Indonesia tersebut dikenal dengan istilah ….", options: ["Politik Dumping", "Tarif", "Proteksi", "Kuota"], answer: "Kouta" },
    { id: 26, question: "Berikut hambatan perdagangan internasional, kecuali adanya ....", options: ["Proteksi", "Kouta", "Pulitik Dumping", "Harga lebih mahal"], answer: "Harga lebih mahal" },
    { id: 27, question: "Berikut tujuan perdagangan bebas pada Masyarakat Ekonomi ASEAN, kecuali …", options: ["Supaya menarik Foreign Direct Investment lebih banyak lagi", "Memiliki perkembangan ekonomi yang merata", "Memprioritaskan Usaha Kecil Menengah", "Berfungsi sebagai pasar tunggal"], answer: "Supaya menarik Foreign Direct Investment lebih banyak lagi" },
    { id: 28, question: "Tujuan dari perdagangan bebas Masyarakat Ekonomi Eropa adalah sebagai berikut, kecuali …", options: ["Integrasi Eropa seperti bekerja sama, memperluas lapangan kerja, dan memperbaiki taraf hidup", "Meningkatkan perdagangan, menjamin keseimbangan perdagangan dan persaingan bebas", "Memudahkan rintangan dan hambatan lajunya perdagangan internasional", "Mempersempit hubungan dengan negara lain"], answer: "Memudahkan rintangan dan hambatan lajunya perdagangan internasional" },
    { id: 29, question: "Berikut ciri-ciri perdagangan dalam negeri, kecuali …", options: ["Pembeli dan penjual biasanya bertemu", "Dilakukan dalam wilayah antarnegara", "Mata uang yang digunakan sama", "Tidak dikenakan bea masuk"], answer: "Dilakukan dalam wilayah antarnegara" },
    { id: 30, question: "Yang dipromosikan oleh kebijakan perdagangan bebas yaitu, kecuali ...", options: ["Perdagangan barang dan jasa dengan pajak tinggi", "Bebas dalam akses pasar", "Bebas dalam akses informasi", "Tidak ada hambatan dalam perdagangan barang maupun jasa"], answer: "Perdagangan barang dan jasa dengan pajak tinggi" },
    { id: 31, question: "This is .... book. .... is there", options: ["my – Your", "mine – Yours  ", "my – Yours", "mine – Your"], answer: "my – Your" },
    { id: 32, question: "Tiger is a wild animal. ... has sharp claws", options: ["He", "She", "Its", "It"], answer: "It" },
    { id: 33, question: "Hey Siti, __________ _ _ __ go star gazing tonight", options: ["are you", "how about", "shall them", "would you like to"], answer: "would you like to" },
    { id: 34, question: "Fadillah is absent yesterdaybecause ....was sick", options: ["they", "he", "we", "her"], answer: "he" },
    { id: 35, question: "Sam:“Would you like to go watch a movie this weekend? “ Carly: “I can't, I am low on cash right now.” _________ _ _ ___ stay at home and watch TV instead.", options: ["How about", "Let's", "What about", "I think"], answer: "Let's" },
    { id: 36, question: "___________ _ _ _ like a cup of coffee?", options: ["Can I", "I'll do", "Would you", "Let's"], answer: "Would you" },
    { id: 37, question: "___________ _ _ _ the washing ,if you like.", options: ["Can I", "Would you", "I'll do", "Let's"], answer: "I'll do" },
    { id: 38, question: "(Untuk soal nomor 38, 39, dan 40) Long, long ago, when the gods and goddesses used to mingle in the affairs of mortals, there was a small kingdom on the slope of Mount Wayang in West Java. The King, named Sang Prabu, was a wise man.He had an only daughter, called Princess Teja Nirmala, who was famous for her beauty but she was not married. One day Sang Prabu made up his mind to settle the matter by a show of strength. After that, Prince of Blambangan, named Raden Begawan had won the competition. Unfortunately, the wicked fairy, Princess Segara fell in love with Raden Begawan and used magic power to render him unconscious and he forgot his wedding. When Sang Prabu was searching, Raden Begawan saw him and soon realized that he had been enchanted by the wicked fairy. The fairy could not accept this, so she killed Raden Begawan. When Princess Teja Nirmala heard this, she was very sad. So a nice fairy took her to the Kahyangan. Which one of the following statements is false aboutSang Prabu?", options: ["Sang Prabu was a father of his only daughter", "Sang Prabu was a king of a kingdom in West Java", "Sang Prabu was taken to Kahyangan by a wicked fairy", "Sang Prabu was a wise man"], answer: "Sang Prabu was taken to Kahyangan by a wicked fairy" },
    { id: 39, question: "Why the wicked fairy did used her magic to make Raden Begawan unconscious?", options: ["She didn’t like Raden Begawan", "She didn’twant Raden Prabu marry the princess", "She wanted Teja Nirmala to forget abouther wedding", "She didn’twant the prince of Blambangan marrythe princess"], answer: "She didn’twant the prince of Blambangan marrythe princess" },
    { id: 40, question: "What do you think will happen if gods or goddesses cannotmingle in the affairs of people in the earth at that time?", options: ["TWicked Fairy will not take Raden Begawan’s life", "Sang Prabu will not hold strength competition", "Raden Begawan will notdie", "Teja Nirmala will stayin the Kahyangan"], answer: "Wicked Fairy will not take Raden Begawan’s life" },
    { id: 41, question: "Contoh dari tanaman yang melakukan perkembang biakan melalui tunas adventif yaitu ….", options: ["Kamboja", "Ukiran", "Cocor Bebek", "Kaktus"], answer: "Cocor Bebek" },
    { id: 42, question: "Metode reproduksi yang dilakukan dengan cara mengelupas kulit tangkai tanaman kayu, kemudian ditutup kembali dengan tanah dan dibungkus oleh plastik, disebut dengan metode ….", options: ["Cangkok", "Merunduk", "Setek", "Okulasi"], answer: "Cangkok" },
    { id: 43, question: "Jatuhnya serbuk sari pada bagian permukaan putik disebut dengan …", options: ["Peleburan", "Pembuahan", "Penyerbukan", "Pemupukan"], answer: "Penyerbukan" },
    { id: 44, question: "Penyerbukan tanaman yang dibantu oleh serangga dengan warna-warna cerah serta menarik merupakan jenis dari penyerbukan …", options: ["Autogami", "Geitonogami", "Entomogami", "Aogami"], answer: "Entomogami" },
    { id: 45, question: "Tidak melakukan pergaulan bebas serta tidak mengkonsumsi obat-obatan terlarang adalah usaha untuk mencegah terjadinya penyakit ….", options: ["Epidimistis", "Keputihan", "Kudis Kronis", "AIDS"], answer: "AIDS" },
    { id: 46, question: "Upaya yang dapat dilakukan untuk mencegah tertularnya penyakit menular seksual yaitu dengan …", options: ["Pernikahan dini", "Perilaku seks bebas", "Bergonta ganti Pasangan", "Menjaga Kesehatan Organ Kelamin"], answer: "Menjaga Kesehatan Organ Kelamin" },
    { id: 47, question: "Rasa sakit yang disertai dengan keluarnya nanah ketika buang air kecil dan keputihan yang berwarna kuning kehijau-hijauan pada wanita merupakan gajala dari penyakit …", options: ["Sifilis", "Gonore", "AIDS", "Epididitis"], answer: "Gonore" },
    { id: 48, question: "Salah satu jenis penyakit pada alat kelamin yang diakibatkan oleh virus yaitu ….", options: ["Herpes dan AIDS", "Sifilis dan Gonore", "Gonore dan Herpes", "Sifiis dan AIDS"], answer: "Gonore dan Herpes" },
    { id: 49, question: "Penyakit kelamin AIDS diakibatkan oleh …", options: ["Virus HIV", "Virus Herpes", "Bacteria Neisseria", "Bacteria Treponema"], answer: "Virus HIV" },
    { id: 50, question: "Jika tubuh mengalami kelebihan hormon, vitamin dan juga obat-obatan akan dikeluarkan oleh organ ….", options: ["Ginjal", "Jantung", "Hati", "Peru-paru"], answer: "Ginjal" },
    
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
      <h1 className="text-2xl font-bold mb-4">Soal Tes Bidang Studi</h1>
      {isReady === null ? (
        <div className="mb-6 p-4 border rounded-lg">
          <p className="text-lg font-semibold">Apakah Anda sudah siap melaksanakan Tes Bidang Studi ini?</p>
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
        <p className="text-red-600 font-semibold">Silakan kembali lagi jika sudah siap melaksanakan Tes Bidang Studi.</p>
      ) : submitted ? (
        <p className="text-green-600 font-semibold">Anda sudah melaksanakan Tes Bidang Studi</p>
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

export default TesAkademik;
