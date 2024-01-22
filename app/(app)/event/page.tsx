// This will be the page to display a single event! Might need a unique ID of some sort
'use client'

import React from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Banner from "@/components/ui/banner";
import Sidebar from "@/components/ui/sidebar";
import { useSession } from 'next-auth/react'
import Link from "next/link";

interface Event {
  title: string;
  authorId: number;
  latitude: number;
  longitude: number;
  description: String;
  location: String;
  timeToMeet: Date;
  attendees: []
}

const EventPage: React.FC = () => {
  const { data: session } = useSession()
  // Use the new useRouter hook from next/navigation
  const params = useSearchParams();
  const id = params.get("id");

  const [event, setEvent] = useState<Event>();

  const myEvent = (event?.authorId == session?.user?.id);

  useEffect(() => {
    const fetchSingleEvent = async () => {
      try {
        const response = await fetch(`/api/event?id=${id}`);
        const data: Event = await response.json();
        setEvent(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        console.log(error);
      }
    };
    fetchSingleEvent();
  }, [id]);

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
    <div className="bg-gray-200 h-full">
      <Banner />
      <div className="flex mt-16">
        <div className="w-1/5 mr-2">
          <Sidebar />
        </div>
        <div className="w-4/5 mt-4">
          <img
            className="w-full h-[20%] object-cover object-center rounded-xl"
            src="/default_image.png"
            alt="Event Image"
          />
          <div className="flex items-center justify-between">
            <div className="font-bold text-5xl pt-6 pb-6"> {event?.title} </div>

            <div className="flex flex-row">
              {myEvent && <Link href={`/editEvent?id=${id}`} className="mr-[2%] px-6 my-6 text-2xl flex items-center justify-center text-black 
                               font-bold border border-green-800 rounded-xl 
                               hover:shadow-xl hover:text-black hover:bg-gray-50 
                               hover:text-grey-200"
                               > Edit </Link>}
              <button className="mr-[2%] py-4 px-6 mt-6 mb-6 text-2xl text-white 
                               font-bold border border-black rounded-xl 
                               bg-green-800 hover:shadow-xl hover:bg-green-900 
                               hover:text-grey-200"> RSVP for this Event </button>\
            </div>

          </div>
          <div className="text-3xl mt-4 mb-2"> Details </div>
          <div className="mr-8 p-2 mb-4 rounded-lg shadow-lg w-full bg-white">
            <div>Description:</div>
            <div>{event?.description}</div>
          </div>
          <div className="flex space-x-4">
            <div className="p-4 rounded-lg shadow-lg w-1/2 bg-white">
              <div>Date & Time: {timedate(event?.timeToMeet?.toLocaleString() || "")}</div>
            </div>
            <div className="p-4 rounded-lg shadow-lg w-1/2 bg-white">
              <div className="w-full">Location: </div>
              <div>{event?.location}</div>
            </div>
          </div>
          <div className="text-2xl mt-8 mb-2"> Attendees </div>
          <div className="flex flex-row">
            <div className="flex -space-x-8">
              {/* {event?.attendees.map((attendee) => (
              <img key={id} className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800" src="/default_profile.png" alt="Image Description" />
            ))} */}
              {/* Erase all the extra images except for the div later */}
              <img className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800" src="/default_profile.png" alt="Image Description" />
              <img className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800" src="/default_profile.png" alt="Image Description" />
              <img className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800" src="/default_profile.png" alt="Image Description" />
              <img className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800" src="/default_profile.png" alt="Image Description" />
              <img className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800" src="/default_profile.png" alt="Image Description" />
              <img className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800" src="/default_profile.png" alt="Image Description" />
              <div className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800 text-center pt-5 font-bold text-2x1 bg-white border border-black"> +20 </div>
            </div>
            <button className="ml-16 p-2 text-white 
                               font-bold border border-black rounded-xl 
                               bg-green-800 hover:shadow-xl hover:bg-green-900 
                               hover:text-grey-200"> View All Attendees </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;