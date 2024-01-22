'use client'

import Sidebar from "@/components/ui/sidebar";
import LeafletMap from "@/components/ui/mapItem";
import Banner from "@/components/ui/banner";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Dashboard() {
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')


  return (
    <div className="bg-gray-200 h-full">
      <Banner />
      <div className="flex mt-24">
        <div className="w-1/5">
          {/* Adjust the width of the sidebar */}
          <Sidebar />
        </div>
        <div className="w-3/5">
          <LeafletMap />
        </div>
        <div className="w-1/5">
          <div className="bg-white shadow-lg rounded-xl mx-2 mt-4 px-2 h-screen">
          <div className="text-3xl pt-2 text-center mb-2"> Map Settings </div>
            <div className="pt-2 font-bold text-2x1" >Current Location</div>
            <Input
              className="w-full"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
            />
            <div className="mt-8 flex flex-row">
              <div className="w-1/2 pr-2">
                <div className="pt-2 font-bold text-2x1" >Start Time</div>
                <Input    //Make this a date Dropdown
                  className="w-full"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  type="text"
                />
              </div>
              <div className="w-1/2 pl-2">
                <div className="pt-2 font-bold text-2x1" >End Time</div>
                <Input    //Make this a date Dropdown
                  className="w-full"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}