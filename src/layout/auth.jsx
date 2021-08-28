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
          className={`col-span-5 hidden lg:block   h-full h-screen ${
            page === "login" ? "order-1" : "order-2"
          }`}
        >
          <img className="h-full w-full"  src={image1} />
        </div>
        <div
          className={`flex justify-center items-center col-span-11 lg:col-span-2 ${
            page === "login" ? "order-2" : "order-1"
          }`}
        >
          {children}
        </div>
      </div>
      <div className="fixed right-4 bottom-4">
        <ReactWhatsapp number={"+6285888222457"} message={message}>
          <Tooltip
            fontSize="lg"
            bg="gray.300"
            color="black"
            hasArrow
            label="informasi PPDB"
            aria-label="A tooltip"
          >
            <img className="w-16 h-16 " src={wa} alt="" />
          </Tooltip>
        </ReactWhatsapp>
      </div>
    </React.Fragment>
  );
}
