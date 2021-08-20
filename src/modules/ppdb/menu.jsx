import React from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";

export default function Menu({ setHiddenMenu, hiddenMenu }) {
  const menus = [
    {
      to: "/ppdb/dashboard",
      name: "Dashboard",
    },
    {
      to: "/ppdb/tes",
      name: "Tes",
    },
    {
      to: "/ppdb/identitas",
      name: "Identitas",
    },
  ];
  return (
    <nav>
      <div className="grid grid-cols-1 gap  text-white">
        {menus.map((menu, index) => {
          return (
            <NavLink
            onClick={()=> {
                setHiddenMenu(!hiddenMenu)
            }}
              className="flex items-center text-md  lg:text-xl font-bold p-3 lg:p-5 lg:rounded-l-full  "
              activeClassName="text-green-500 font-bold bg-white"
              to={menu.to}
            >
              <EyeIcon className="lg:h-8 lg:w-8 w-5 h-5 mr-5" />
              <p>{menu.name}</p>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
