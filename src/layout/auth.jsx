import React from "react";
export default function Layout({children, page}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 w-full h-screen ">
      <div className={`col-span-5 hidden lg:block bg-red-500 ${page === "login" ? "order-1" : "order-2"}`}></div>
      <div className={`flex justify-center items-center col-span-2 ${page === "login" ? "order-2" : "order-1"}`}>
      {children}
      </div>
    </div>
  );
}
