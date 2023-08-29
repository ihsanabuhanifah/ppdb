import React from "react";
import ReactWhatsapp from "react-whatsapp";
import wa from "../image/wa.png";
import image1 from "../image/image1.png";
// import image2 from "../image/image2.png";
// import image3 from "../image/image3.png";
import { Tooltip } from "@chakra-ui/react";
// import "react-slideshow-image/dist/styles.css";
// import { Zoom } from "react-slideshow-image";
export default function Layout({ children, page }) {
  const message = "Bismilah, Assalamualaikum Warohmatullahi Wabarokatuh";
  const [hidden, setHidden] = React.useState(false);
  // const images = [image1, image2, image3];

  // const zoomOutProperties = {
  //   indicators: true,
  //   scale: 0.4,
  // };
  return (
    <React.Fragment>
      <div className="grid grid-cols-12 lg:grid-cols-7 w-full h-screen  ">
        <div className="w-full h-full block lg:hidden bg-green-500"></div>
        <div
          className={`col-span-5 hidden lg:block   h-full ${
            page === "login" ? "order-1" : "order-2"
          }`}
        >
          <img className="h-full w-full" alt="imagesmk.png" src={image1} />
        </div>
        <div
          className={`flex justify-center items-center col-span-11 lg:col-span-2 ${
            page === "login" ? "order-2" : "order-1"
          }`}
        >
          {children}
        </div>
      </div>
      <div className="fixed right-10 bottom-4">
        {" "}
        <Tooltip
          fontSize="lg"
          bg="gray.300"
          color="black"
          hasArrow
          label="informasi PPDB"
          aria-label="A tooltip"
        >
          <img
            onClick={() => {
              setHidden(true);
            }}
            className={`w-16 h-16 animate-bounce shadow-xl ${
              hidden ? "hidden" : "block"
            }`}
            src={wa}
            alt="whatsapp.png"
          />
        </Tooltip>
        <div className={`${hidden ? "block" : "hidden"} relative  px-5 py-5 grid grid-cols-1 gap-4 shadow-lg border `}>
          <button  onClick={() => {
              setHidden(false);
            }} className="absolute right-5 top-1">x</button>
          <ReactWhatsapp number={"+6285888222457"} message={message}>
           <div className=" p-2 mt-4 flex items-center justify-center ">
           <img
             
             className={`w-4 h-4 shadow-xl `}
             src={wa}
             alt="whatsapp.png"
           />
           <p className="text-green-500  ml-2 ">
             Hubungi Ustadz. Dedi
           </p>
           </div>
          </ReactWhatsapp>
          
          <ReactWhatsapp number={"+62895320050324"} message={message}>
           <div className=" p-2 flex items-center justify-center ">
           <img
             
             className={`w-4 h-4 shadow-xl `}
             src={wa}
             alt="whatsapp.png"
           />
           <p className="text-green-500  ml-2 ">
           Hubungi Ustadz. Ihsan
           </p>
           </div>
          </ReactWhatsapp>
        </div>
      </div>
    </React.Fragment>
  );
}
