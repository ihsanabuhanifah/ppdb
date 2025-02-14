import Kepsek from "../../image/kepsek.png";


export default function Section2() {
  return (
    <>
      <div className="text-center mb-8 rounded-3xl">
        <h4 className="text-white text-4xl font-bold mb-2">
          Sambutan Kepala Madrasah
        </h4>
        <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <div className="flex justify-center">
        <img
  className="rounded-full shadow-lg transition duration-300 transform hover:scale-105 w-[200px] h-[200px] md:w-[350px] md:h-[350px]"
  src={Kepsek}
  alt="Kepala Madrasah"
/>

        </div>

        {/* Sambutan dengan efek hover getar */}
        <div className="group bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-3xl p-8 shadow-xl transition-transform duration-300 hover:animate-shake">
          <h5 className="text-xl italic mb-4">
            Assalamualaikum warahmatullahi wabarakatuh
          </h5>
          <p className="text-justify text-lg leading-relaxed">
            Bapak/Ibu dan adik-adik calon peserta didik yang saya banggakan,
            Saya Kepala MAN 1 Kota Sukabumi ingin menyapa hangat Anda semua!
            Tahukah Anda apa yang membuat madrasah kami berbeda? Di sini, kami
            tidak sekadar mengajar namun kami menginspirasi, membimbing, dan
            membangun karakter!
          </p>
          <p className="text-justify text-lg leading-relaxed mt-4">
          Bayangkan sebuah madrasah/sekolah di mana anak-anak tidak hanya belajar mata pelajaran biasa, tapi juga mengembangkan kepribadian islami yang kuat. Di madrasah kami, setiap siswa adalah bintang yang sedang menemukan potensinya. Kami memadukan pendidikan agama dan umum dalam suasana yang menyenangkan.
Saya sering melihat sendiri bagaimana siswa-siswi kami tumbuh menjadi pribadi yang cerdas, berakhlak mulia, dan siap menghadapi tantangan masa depan. Bukankah itu yang kita inginkan untuk anak-anak kita?
Mari bergabung dengan keluarga besar MAN 1 Kota Sukabumi! Pendaftaran telah dibuka dan tim kami siap membantu Anda dengan senang hati. 
          </p>

          <p className="text-justify text-lg leading-relaxed mt-4">
          Ingat, di madrasah kami, setiap anak adalah amanah yang kami jaga dan bimbing dengan sepenuh hati. Kami menantikan kehadiran Anda!
          </p>

          <p className="text-justify text-lg leading-relaxed mt-4">
          MAN 1 Kota Sukabumi! Disiplin! Sukses! Berwawasan Islami!
          </p>

          <h2 className="text-xl italic mt-6">
            Wassalamualaikum warahmatullahi wabarakatuh.
          </h2>

          {/* Nama Kepala Sekolah */}
          <div className="text-right mt-6">
            <p className="text-lg font-semibold">
              Drs. Tatang Moh. Abdurahman, M.Ag
            </p>
            <p className="text-lg">Kepala MAN 1 Kota Sukabumi</p>
          </div>
        </div>
      </div>
    </>
  );
}
