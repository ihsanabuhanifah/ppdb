export default function Footer() {
  return (
    <footer className=" text-white p-6 ">
      <div className="container mx-auto p-6 bg-[#06579E]">
        <div className="grid grid-cols-1  gap-8">
          {/* Slogan */}
          <div>
            <h2 className="text-2xl font-bold">JABAR JUARA</h2>
            <p>Disiplin, Sukses, Berwawasan Islami</p>
          </div>

          {/* Kontak */}
          <section className="grid grid-cols-4">
          <div>
              <h3 className="text-xl font-bold mb-2">HUBUNGI KAMI</h3>
              <p>Jalan Bandung No.7 Penanggungan, Klojen Kota Malang 65113</p>
              <p>
                <strong>Telepon:</strong> 0341-551357 / 0341-558333
              </p>
              <p>
                <strong>Fax:</strong> 0341-559779
              </p>
              <p>
                <strong>Email:</strong> admin@man2kotamalang.sch.id
              </p>
            </div>
            {/* Profil */}
            <div>
              <h3 className="text-xl font-bold mb-2">MAN 2 KOTA MALANG</h3>
              <p>
                Madrasah Aliyah Negeri (MAN) 2 Kota Malang, sebagai lembaga
                pendidikan Islam formal di bawah Kementerian Agama Republik
                Indonesia berkomitmen memberikan kontribusi yang besar bagi
                masyarakat sebagai penerus perjuangan dalam rangka syiar agama
                Islam.
              </p>

              {/* Social Media */}
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-white hover:text-gray-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
           
          </section>
        </div>

        {/* Copyright */}
        <div className="text-center mt-10 border-t border-gray-600 pt-4">
          <p>
            © Copyright <strong> MAN 1 KOTA SUKABUMI.</strong> All Rights
            Reserved
          </p>
          <a href="#" className="text-yellow-400 hover:text-yellow-300">
            Developer By ihsan{" "}
          </a>
        </div>
      </div>
    </footer>
  );
}
