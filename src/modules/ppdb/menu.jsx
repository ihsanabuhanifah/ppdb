import React, { useState } from "react";
import {
  BookOpenIcon,
  LogoutIcon,
  AcademicCapIcon,
} from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Menu({ setHiddenMenu, hiddenMenu, setLogout }) {
  let history = useHistory();
  const isPayment = useSelector((state) => state.auth.isPayment);
  const isLulus = useSelector((state) => state.auth.isLulus);
  const [men, setMen] = useState(history.location.pathname)
  const menus = [
    {
      to: "/ppdb/dashboard",
      name: "Dashboard",
      disabled: true,
      icon: <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />,
    },
    {
      to: "/ppdb/biodata",
      name: "Biodata",
      disabled: true,
      icon: <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />,
    },
    {
      to: "/ppdb/dokumen",
      name: "Upload Dokumen",
      disabled: true,
      icon: <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />,
    },
    {
      to: "/ppdb/pengumuman",
      name: "Pengumuman",
      disabled: true,
      icon: <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />,
    },
    // {
    //   to: "/ppdb/pembayaran",
    //   name: "Pembayaran",
    //   disabled : true,
    //   icon : <AcademicCapIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    // },

    // {
    //   to: "/ppdb/tes-umum",
    //   name: "Tes Umum",
    //   disabled : isPayment,
    //   icon : <BookOpenIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    // },
    // {
    //   to: "/ppdb/tes-diniyah-dan-interview",
    //   name: "Tes Diniyah",
    //   disabled : isPayment,
    //   icon : <BookOpenIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
    // },
  ];

 

  console.log("history.location.pathname ", history.location.pathname , men )
  return (
    <React.Fragment>
      <nav className="h-5/6 lg:h-8/10">
        <div className="grid grid-cols-1 gap-1  text-white">
          {menus.map((menu, index) => {
            return (
              <React.Fragment>
              <button
                    key={index}
                    onClick={() => {
                      // setHiddenMenu(!hiddenMenu);
                      setMen(menu.to)

                      return history.push(menu.to);
                    }}
                    className={`flex items-center text-md  lg:text-xl font-bold p-3 lg:px-4 lg:rounded-l-full ${
                      menu.to === men
                        ? "text-blue-400 font-bold bg-white whitespace-nowrap" 
                        : ""
                    }`}
                  >
                    {menu.icon}
                    <p className="whitespace-nowrap">{menu.name}</p>
                  </button>
              </React.Fragment>
            );
          })}
        </div>
      </nav>
      <div className="h-1/6 lg:h-1/10 border-t-2  w-full">
        <button
          onClick={() => {
            setLogout(true);
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
