'use client'

import React from "react";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  description: String;
  location: String;
  timeToMeet: Date;
}

// todo... make this a take a prop of event stuff 
// on event page: pull all events and map over them for grid

export default function EventCard({ oneevent }: { oneevent: Event }) {

  const timedate = (timestamp: string) => {
    const eventDate = new Date(timestamp);
    if (eventDate instanceof Date && !isNaN(eventDate.getTime())) {
      // Format the date as "month day, year"
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(eventDate);

      // Format the time as "X:XX am/pm"
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(eventDate);
      return (
        <div className="flex flex-col">
          <h1>{formattedDate}</h1>
          <h1>{formattedTime}</h1>
        </div>
      );
    }
  }


  return (
    <Link href={`/event?id=${oneevent.id}`}>
      <div className="max-w-[500px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-1">
          <img
            className="w-full h-full max-w-[500px] max-h-[500px] object-cover object-center"
            src="/default_image.png"
            alt="Event Image"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800">{oneevent.title}</h2>
            <div className="mt-4 flex justify-between flex-col">
              <div>
                <div className="text-sm text-gray-500">{oneevent.location}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500"> {timedate(oneevent?.timeToMeet?.toLocaleString() || "")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};