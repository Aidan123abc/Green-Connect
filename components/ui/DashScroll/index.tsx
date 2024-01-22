'use client'

import React from "react";
import EventCard from "@/components/ui/EventCard"
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

interface DashScrollProps {
  personal: boolean;
  email: string;
}

const DashScroll: React.FC<DashScrollProps> = ({ personal, email }) => {

  console.log(email);
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let response;

        if (personal) {
          const emailString = String(email);
          console.log("Here is the email", emailString);
          response = await fetch(`/api/myEvents?email=${encodeURIComponent(emailString.replace(/"/g, ''))}`);
        } else {
          response = await fetch("/api/events");
        }

        const data: Event[] = await response.json();
        console.log("Fetched data:", data);

        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [personal, email]);

  return (
    <div className="bg-gray-200 h-full">
      <div className="grid grid-cols-1 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} oneevent={event} />
        ))}
      </div>
    </div>
  );
}

export default DashScroll;


