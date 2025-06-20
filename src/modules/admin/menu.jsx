import React, { useEffect, useState } from "react";
import {LogoutIcon, AcademicCapIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Menu({ setHiddenMenu, hiddenMenu , setLogout}) {
  const isPayment = useSelector((state) => state.auth.isPayment);
  let [active, setActive] = useState("")
  const menus = [
   
    {
      to: "/admin/dashboard",
      name: "Dashboard",
      disabled : true,
      icon : <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    },
    {
      to: "/admin/pendaftar",
      name: "Pendaftar",
      disabled : true,
      icon : <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    },
    {
      to: "/admin/lulus",
      name: "Siswa Lulus",
      disabled : true,
      icon : <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    },
   
    {
      to: "/admin/sekolah",
      name: "Sekolah",
      disabled : true,
      icon : <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    },
    // {
    //   to: "/admin/nilai",
    //   name: "Nilai",
    //   disabled : true,
    //   icon : <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    // },
    // {
    //   to: "/admin/jadwal-tes",
    //   name: "Jadwal Tes",
    //   disabled : true,
    //   icon : <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    // },
    // {
    //   to: "/admin/riwayat-pembayaran",
    //   name: "Pembayaran",
    //   disabled : true,
    //   icon : <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    // },
    // {
    //   to: "/admin/list",
    //   name: "Admin",
    //   disabled : true,
    //   icon : <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    // },
    
  ];
  
 let history = useHistory()

 useEffect(()=> {
 if(history.location.pathname){
  setActive(history.location.pathname)
 }
 },[history.location.pathname])

 console.log("history.location.pathname", history.location.pathname)
  return (
    <React.Fragment>
      <nav className="h-5/6 lg:h-8/10">
        <div className="grid grid-cols-1 gap-1  text-white text-sm">
          {menus.map((menu, index) => {
            return (
              <button
              key={index}
                onClick={() => {
                  // setHiddenMenu(!hiddenMenu);
                  // if(menu.disabled === false){
                  //   return history.push("/ppdb/konfirmasi-pembayaran-ppdb")
                  // }

                  setActive(menu.to)
                  return history.push(menu.to)
                }}
                className={`flex items-center text-md  lg:text-sm font-bold p-3 lg:px-4 lg:rounded-l-full ${active === menu.to ? "text-blue-400 font-bold bg-white" : ""}`}
              
               
               
              >
                {menu.icon}
                <p className=" whitespace-nowrap">{menu.name}</p>
              </button>
            );
          })}
        </div>
      </nav>
     <div className="h-1/6 lg:h-1/10 border-t-2  w-full">
     <button
        onClick={() => {
          setLogout(true)
        }}
        className="flex items-center text-sm text-white  lg:text-xl font-bold p-3 lg:p-5 lg:rounded-l-full w-fullphp  "
      
      >
        <LogoutIcon className="lg:h-10 lg:w-10 w-5 h-5 mr-5 " />
        Logout
      </button>
     </div>
    </React.Fragment>
  );
}
