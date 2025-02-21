export default function Footer() {
    return (
      <footer className=" text-white ">
        <div className="p-10 ">
          <div className="grid grid-cols-1  gap-8">
            {/* Slogan */}
            <div>
              <h2 className="text-2xl font-bold">SMK MADINATULQURAN</h2>
              <p>Kembangkan Potensi Berasama Kami</p>
            </div>
  
            {/* Kontak */}
            <section className="grid">
            <div>
                <h3 className="text-xl font-bold mb-2">HUBUNGI KAMI</h3>
                <p>Kp. Kebon Kalapa RT. 002/011 Desa Singasari Kecamatan Jonggol Kabupaten Bogor 16810
                </p>
                <p>
                  <strong>Panitia </strong> :<span className="ml-2">085888222457</span>
                </p>
                <p><strong>Jam Pelayanan</strong> :  <span className="ml-2"> senin sd jum’at jam 07.30 sd 15.00 (Jam Kerja)</span></p>
               
              </div>
              {/* Profil */}
              <div>
              
  
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
              © Copyright <strong> SMK MADINATULQURAN</strong> All Rights
              Reserved
            </p>
            {/* <a href="#" className="text-yellow-400 hover:text-yellow-300">
              Developer By ihsan{" "}
            </a> */}
          </div>
        </div>
      </footer>
    );
  }