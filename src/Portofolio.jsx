import React from "react";
import BackgroundImage from "./assets/bg.jpg";
import FotoProfile from "./assets/foto-profile.JPG";
import ServiceImage1 from "./assets/service-image-1.png";
import ServiceImage2 from "./assets/service-image-2.png";
import ServiceImage3 from "./assets/service-image-3.jpg";
import WorkSection1 from "./assets/work-section-1.JPG";
import WorkSection2 from "./assets/work-section-2.jpg";
import WorkSection3 from "./assets/work-section-3.jpg";
import WorkSection4 from "./assets/work-section-4.jpg";
function App() {
  return (
    <React.Fragment>
      <div className="antialiased relative text-gray-600">
        {/* ========================================================================= */}
        <div className="absolute w-full min-h-screen">
          <div
            className="absolute top-0 w-full h-1/2 bg-cover bg-bottom"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
          ></div>
          <div
            className="absolute
          z-20 bottom-10 right-0 left-0 inline-flex space-x-20 justify-center uppercase font-bold text-gray-600 "
          >
            <a className="hover:text-blue-600" href="#services">
              Services
            </a>
            <a className="hover:text-blue-600" href="#work">
              Work
            </a>
            <a className="hover:text-blue-600" href="#contact">
              Contact
            </a>
          </div>
        </div>
        {/* ========================================================================= */}
        {/* Card Identitas */}
        <div className="relative z-10 flex justify-center items-center min-h-screen h-auto ">
          <div className="max-w-4xl relative">
            <div className="absolute inset-0 transform -skew-x-4  rounded-lg z-10 -rotate-6 w-full max-w-4xl p-12 shadow-lg bg-gradient-to-r from-blue-500 to-red-500"></div>
            <div className="relative z-20 flex flex-col lg:flex-row bg-white justify-between w-full max-w-4xl p-12 shadow-lg rounded-lg">
              <div className="flex flex-col space-y-6 py-6   justify-between order-2 lg:order-1">
                <div>
                  <h2 className="text-lg">Hello I AM</h2>
                  <h1 className="text-4xl font-bold text-gray-800 animate-bounce">
                    Ihsanabuhanifah
                  </h1>
                </div>
                <p className="text-md leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Rerum, vitae eveniet? Ea ipsam accusantium exercitationem
                  recusandae natus? Adipisci, inventore eaque!
                </p>
              </div>
              <img
                className="w-64 h-64 rounded-full border-white shadow-lg flex-shrink-0 order-1 lg:order-2 "
                src={FotoProfile}
                alt="foto-profil.jpg"
              />
            </div>
          </div>
        </div>
        {/* Card Identitas */}

        {/* Services */}
        <section id="services" className="bg-gray-50 pt-20 pb-28 px-8">
          <div className="max-w-6xl mx-auto">
            {/* judul */}
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-700">Services</h1>
              <p className="pt-2 text-xl">Heres What I Offer</p>
            </div>
            {/* judul */}
            <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-20 ">
              {/* Service 1 */}
              <div className="relative">
                <div className="absolute z-10 inset-0 bg-gradient-to-r from-blue-500 to-red-500 shadow-md rounded-lg transform skew-x-8 -rotate-6  "></div>
                <div className="relative z-20 bg-white h-full rounded-md shadow-md">
                  <img
                    className="rounded-t-md"
                    style={{ height: "240px" }}
                    src={ServiceImage1}
                    alt="service.jpg"
                  />
                  <div className="px-10 pb-6">
                    <h2 className="pt-3 font-bold text-2xl">
                      Responsive Websites
                    </h2>
                    <p className="pt-2 font-semibold">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Delectus dicta, sequi sint maxime dignissimos dolorem
                      quidem voluptate eum magnam earum.
                    </p>
                  </div>
                </div>
              </div>
              {/* Service 1 */}
              {/* Service 2 */}
              <div className="relative">
                <div className="absolute z-10 hidden lg:block inset-0 bg-gradient-to-r from-blue-500 to-red-500 shadow-md rounded-lg transform skew-x-8 -rotate-6  "></div>
                <div className="relative z-20 bg-white h-full rounded-md shadow-md">
                  <img
                    className="rounded-t-md bg-blue-200"
                    style={{ height: "240px" }}
                    src={ServiceImage2}
                    alt="service.jpg"
                  />
                  <div className="px-10 pb-6">
                    <h2 className="pt-3 font-bold text-2xl">
                      Mobile Applications
                    </h2>
                    <p className="pt-2 font-semibold">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Delectus dicta, sequi sint maxime dignissimos dolorem
                      quidem voluptate eum magnam earum.
                    </p>
                  </div>
                </div>
              </div>
              {/* Service 2 */}
              {/* Service 2 */}
              <div className="relative">
                <div className="absolute z-10 inset-0 bg-gradient-to-r from-blue-500 to-red-500 shadow-md rounded-lg transform skew-x-8 -rotate-6  "></div>
                <div className="relative z-20 bg-white h-full rounded-md shadow-md">
                  <img
                    className="rounded-t-md"
                    style={{ height: "240px" }}
                    src={ServiceImage3}
                    alt="service.jpg"
                  />
                  <div className="px-10 pb-6">
                    <h2 className="pt-3 font-bold text-2xl">
                      Mobile Applications
                    </h2>
                    <p className="pt-2 font-semibold">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Delectus dicta, sequi sint maxime dignissimos dolorem
                      quidem voluptate eum magnam earum.
                    </p>
                  </div>
                </div>
              </div>
              {/* Service 2 */}
            </div>
          </div>
        </section>
        {/* Services */}

        {/* Work */}
        <section id="work" className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-700">Work</h1>
              <p className="pt-2 text-xl">Here is My Portofolio</p>
            </div>
            <div className="mt-16 flex lg:grid grid-cols-3 gap-14 overflow-x-auto">
              {/* work1 */}
              <div className="bg-white rounded-lg shadow-md flex-shrink-0 w-full col-span-2">
                <img
                  className="object-cover w-full h-80 rounded-t-md"
                  src={WorkSection1}
                  alt=""
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Work Title
                  </h3>
                  <p className="pt-3 text-md font-bold">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quaerat ratione commodi nihil maxime adipisci deleniti,
                    similique earum quis exercitationem nam.
                  </p>
                  <a
                    className="inline-block mt-4 px-6 py-2 text-white shadow-md rounded-md bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"
                    href=""
                  >
                    View More
                  </a>
                </div>
              </div>
              {/* work1 */}
              {/* work2 */}
              <div className="bg-white rounded-lg shadow-md col-span-1 flex-shrink-0 w-full">
                <img
                  className="object-cover w-full  h-80  rounded-t-md"
                  src={WorkSection2}
                  alt=""
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Work Title
                  </h3>
                  <p className="pt-3 text-md font-bold">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quaerat ratione commodi nihil maxime adipisci deleniti,
                    similique earum quis exercitationem nam.
                  </p>
                  <a
                    className="inline-block mt-4 px-6 py-2 text-white shadow-md rounded-md bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"
                    href=""
                  >
                    View More
                  </a>
                </div>
              </div>
              {/* work2 */}
              {/* work3 */}
              <div className="bg-white rounded-lg shadow-md col-span-1 flex-shrink-0 w-full">
                <img
                  className="object-cover w-full  h-80  rounded-t-md"
                  src={WorkSection3}
                  alt=""
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Work Title
                  </h3>
                  <p className="pt-3 text-md font-bold">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quaerat ratione commodi nihil maxime adipisci deleniti,
                    similique earum quis exercitationem nam.
                  </p>
                  <a
                    className="inline-block mt-4 px-6 py-2 text-white shadow-md rounded-md bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"
                    href=""
                  >
                    View More
                  </a>
                </div>
              </div>
              {/* work3 */}
              {/* work4 */}
              <div className="bg-white rounded-lg shadow-md col-span-2 flex-shrink-0 w-full">
                <img
                  className="object-cover w-full  h-80  rounded-t-md"
                  src={WorkSection4}
                  alt=""
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Work Title
                  </h3>
                  <p className="pt-3 text-md font-bold">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quaerat ratione commodi nihil maxime adipisci deleniti,
                    similique earum quis exercitationem nam.
                  </p>
                  <a
                    className="inline-block mt-4 px-6 py-2 text-white shadow-md rounded-md bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"
                    href=""
                  >
                    View More
                  </a>
                </div>
              </div>
              {/* work4 */}
            </div>
          </div>
        </section>
        {/* Work */}

        {/* Contact */}
        <section className="bg-gray-50 pt-20 pb-28 px-4 lg:px-80" id="contact">
          <div className=" max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-700">Contact</h1>
              <p className="pt-2 text-xl">Get In Touch Me</p>
            </div>
            <div className="mt-16 relative max-w-4xl mx-auto">
              <div></div>
              <div className="relative z-20 bg-white rounded-md shadow-md p-5 lg:p-12">
                <form action="" className="w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                    <input
                      type="text"
                      placeholder="Name"
                      className="border border-gray-200 outline-none px-4 py-2 rounded-md hover:border-gray-400 focus:border-gray-400"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="border border-gray-200 outline-none px-4 py-2 rounded-md hover:border-gray-400 focus:border-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Subject"
                      className="col-span-1 lg:col-span-2 border border-gray-200 outline-none px-4 py-2 rounded-md hover:border-gray-400 focus:border-gray-400"
                    />
                    <textarea
                      className="col-span-1 lg:col-span-2 border border-gray-200 outline-none px-4 py-2 rounded-md hover:border-gray-400 focus:border-gray-400"
                      name="message"
                      id="message"
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>

                  <button className="inline-block mt-4 px-6 py-2 text-white shadow-md rounded-md bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* Contact */}
      </div>
    </React.Fragment>
  );
}

export default App;
