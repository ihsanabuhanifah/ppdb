import React from "react";
import { BookOpenIcon, LogoutIcon, AcademicCapIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Menu({ setHiddenMenu, hiddenMenu , setLogout}) {
  const isPayment = useSelector((state) => state.auth.isPayment);
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
   
  ];
  
 let history = useHistory()
  return (
    <React.Fragment>
      <nav className="h-5/6 lg:h-8/10">
        <div className="grid grid-cols-1 gap-1  text-white">
          {menus.map((menu, index) => {
            return (
              <button
              key={index}
                onClick={() => {
                  setHiddenMenu(!hiddenMenu);
                  if(menu.disabled === false){
                    return history.push("/ppdb/konfirmasi-pembayaran-ppdb")
                  }
                  return history.push(menu.to)
                }}
                className={`flex items-center text-md  lg:text-xl font-bold p-3 lg:px-4 lg:rounded-l-full ${history.location.pathname === menu.to ? "text-green-500 font-bold bg-white" : ""}`}
              
               
               
              >
                {menu.icon}
                <p>{menu.name}</p>
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
        className="flex items-center text-lg text-white  lg:text-xl font-bold p-3 lg:p-5 lg:rounded-l-full w-fullphp  "
      
      >
        <LogoutIcon className="lg:h-10 lg:w-10 w-8 h-8 mr-5 " />
        Logout
      </button>
     </div>
    </React.Fragment>
  );
}
