'use client'

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { signOut } from 'next-auth/react'


const Banner = () => {

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <header className="bg-green-800 text-white h-24 flex items-center justify-between text-xl absolute top-0 left-0 w-full z-50">
      <div className="flex flex-row items-center">
        <Link href={'/dashboard'} className="p-8 font-bold">Green Connect</Link>
        <input
          type="text"
          placeholder="Search..."
          className="hidden h-8 px-2 mr-4 border border-white rounded text-black md:block"
        />
      </div>
      <div className="pr-4 flex flex-row">
        <div className="flex flex-row pr-4">
        <Link href={'/dashboard'} className="bg-green-800 text-white hover:bg-green-900 hover:text-grey-200 p-4 rounded-md"> Dashboard </Link>
          <Link href={'/about'} className="bg-green-800 text-white hover:bg-green-900 hover:text-grey-200 p-4 rounded-md"> About </Link>
          <Link href={'/myItems'} className="bg-green-800 text-white hover:bg-green-900 hover:text-grey-200 p-4 rounded-md"> My Items </Link>
        </div>
        <div className="pt-2">
          <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white" onClick={toggleDropdown}>
            <img
              className="w-full h-full object-cover"
              src="/default_profile.png"
              alt="Profile"
            />
          </div>
          {isDropdownVisible && (
            <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg p-2 flex flex-col w-[200px]">
              <Link href={'/profile'} className="mt-2px text-black p-2"> Profile </Link>
              <Link href={'/settings'} className="mt-2px text-black p-2"> Settings </Link>
              <Link href={' '} onClick={() => signOut()} className="mt-2px text-black p-2"> Logout </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Banner;
