'use client'

import React from "react";
import EventCard from "@/components/ui/EventCard"
import Banner from "@/components/ui/banner";
import Sidebar from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

interface Event {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  description: String;
  location: String;
  timeToMeet: Date;
}

const EventPage: React.FC = () => {

  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-gray-200 h-screen">
      <Banner />
      <div className="flex flex-col mt-24 lg:flex-row">
        <div className="w-full lg:w-1/5 lg:max-w-[300px] order-1 lg:order-1">
          <Sidebar />
        </div>
        <div className="w-full lg:w-4/5 px-4 order-2 lg:order-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-4">
            {events.map((event) => (
              <EventCard key={event.id} oneevent={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;