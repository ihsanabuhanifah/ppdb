import React from "react";
import Navbar from "./Navbar";
export default function Landing() {
  return (
    <React.Fragment>
      <div className="antialiased  relative text-gray-600 bg-green-300 ">
        <div className="absolute w-full min-h-screen px-16 bg-green-30   ">
          <Navbar></Navbar>
        </div>
      </div>
    </React.Fragment>
  );
}
