"use client";
import Link from "next/link";
import React from "react";

const SidebarElement = ({ icon, text, link, selected }: { icon: any, text: string, link: string, selected: boolean }) => {
  const liClass = {
    selected: "border-l-4 border-[#1E2A78]",
    notSelected: ""
  }
  const linkClass = {
    selected: "flex items-center pl-4 p-1 py-4 my-2 rounded-lg hover:bg-gray-100 group text-[#1E2A78] hover:text-[#1E2A78] fill-[#1E2A78]",
    notSelected: "flex items-center pl-4 p-1 py-4 my-2 rounded-lg hover:bg-gray-100 group text-black hover:text-[#1E2A78] hover:fill-[#1E2A78]"
  }
  
  return (
    <li className={liClass[selected? "selected" : "notSelected"]}>
      <Link
        href={link}
        className={linkClass[selected? "selected" : "notSelected"]}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
          {icon}
        </svg>
        <span
          className="ml-3"
        >
          {text}
        </span>
      </Link>
    </li>
  );
};
export default SidebarElement;
