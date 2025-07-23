import React from "react";
import { BookOpenIcon, LogoutIcon, AcademicCapIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Menu({ setHiddenMenu, hiddenMenu , setLogout}) {
  const isPayment = useSelector((state) => state.auth.isPayment);
  const isLulus = useSelector((state) => state.auth.isLulus);
  const menus = [
    {
      to: "/ppdb/salam",
      name: "Salam",
      disabled : true,
      icon : <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    },
    {
      to: "/ppdb/pengumuman-kelulusan",
      name: "Kelulusan",
      disabled : isPayment,
      icon : <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    },
    {
      to: "/ppdb/pembayaran",
      name: "Pembayaran",
      disabled : true,
      icon : <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    },
    
    {
      to: "/ppdb/tes-umum",
      name: "Tes Umum",
      disabled : isPayment,
      icon : <BookOpenIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    },
    {
      to: "/ppdb/tes-diniyah-dan-interview",
      name: "Tes Diniyah",
      disabled : isPayment,
      icon : <BookOpenIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    },
  ];
  
 let history = useHistory()
  return (
    <React.Fragment>
      <nav className="h-5/6 lg:h-8/10">
        <div className="md:grid lg:grid grid-cols-1 gap-1  hidden text-white">
          {menus.map((menu, index) => {
            return (
              <React.Fragment>
                {menu.name === "Pembayaradd" && isLulus !== "1" ?  "" : (<button
              key={index}
                onClick={() => {

                  if(menu.disabled === "belum_transfer"){
                    return history.push("/ppdb/konfirmasi-pembayaran-ppdb")
                  }else if(menu.disabled === false){
                    return history.push("/ppdb/dashboard")
                  }
                  return history.push(menu.to)
                }}
                className={`flex items-center text-md  lg:text-xl font-bold p-3 lg:px-4 lg:rounded-l-full ${history.location.pathname === menu.to ? "text-green-500 font-bold bg-white" : ""}`}
              
               
               
              >
                {menu.icon}
                <p>{menu.name}</p>
              </button>)}
                </React.Fragment>
            );
          })}
        </div>

         <div className="grid grid-cols-1 gap-1  md:hidden lg:hidden  text-white">
          {menus.map((menu, index) => {
            return (
              <React.Fragment>
                {menu.name === "Pembayaradd" && isLulus !== "1" ?  "" : (<button
              key={index}
                onClick={() => {
                  setHiddenMenu(!hiddenMenu);
                  if(menu.disabled === "belum_transfer"){
                    return history.push("/ppdb/konfirmasi-pembayaran-ppdb")
                  }else if(menu.disabled === false){
                    return history.push("/ppdb/dashboard")
                  }
                  return history.push(menu.to)
                }}
                className={`flex items-center text-md  lg:text-xl font-bold p-3 lg:px-4 lg:rounded-l-full ${history.location.pathname === menu.to ? "text-green-500 font-bold bg-white" : ""}`}
              
               
               
              >
                {menu.icon}
                <p>{menu.name}</p>
              </button>)}
                </React.Fragment>
            );
          })}
        </div>
      </nav>
     <div className="h-1/6 lg:h-1/10 border-t-2  w-full">
     <button
        onClick={() => {
          setLogout(true)
        }}
        className="flex items-center text-lg text-white  lg:text-xl font-bold p-3 lg:p-5 lg:rounded-l-full w-fullphp  "
      
      >
        <LogoutIcon className="lg:h-10 lg:w-10 w-8 h-8 mr-5 " />
        Logout
      </button>
     </div>
    </React.Fragment>
  );
}
