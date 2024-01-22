'use client'

import React from "react";
import { useState, useEffect } from "react";
import Banner from "@/components/ui/banner";
import Sidebar from "@/components/ui/sidebar";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import GeoAmpAutoFill from "@/components/ui/GeoAmpAutoFill";
import { useRouter } from 'next/router';


interface Event {
  authorId: number
  title: string;
  latitude: number;
  longitude: number;
  description: String;
  location: String;
  timeToMeet: string | undefined;
}


const EventPage: React.FC = () => {
  // Define constants for initial values
  const initialTitle = '';
  const initialDescription = '';
  const initialLocation = ''

  // State variables to hold the current values
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [datetime, setDatetime] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  const [location, setLocation] = useState(initialLocation);

  const handlePublishEvent = async () => {
    const event: Event = {
      authorId: 1,
      title,
      description,
      latitude: 0,
      longitude: 0,
      location,
      timeToMeet: datetime?.toISOString(),
    };

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        console.log('Event posted successfully!');
        const editEventUrl = `/dashboard`;
        window.location.href = editEventUrl;
      } else {
        console.error('Failed to post event:', response.statusText);
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('Error posting event:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="bg-gray-200">
      <Banner />
      <div className="flex mt-16">
        <div className="w-full mt-4">
          <img
            className="w-full h-[20%] object-cover object-center rounded-xl"
            src="/default_image.png"
            alt="Event Image"
          />
          <button
            className="relative bottom-16 left-4 p-4 text-white font-bold bg-green-800
               hover:bg-green-900 hover:text-grey-200 rounded-full">
            Add Image
          </button>
          <div>
            <div className="font-bold text-2xl pl-4 pb-2"> Add a Title </div>
            <div className="flex items-center justify-between">
              <div className="font-bold text-5xl pb-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-none outline-none rounded-xl ml-4 pl-2"
                />
              </div>
              <button
                className="mr-[2%] py-4 px-6 mb-4  text-white 
                     font-bold border border-black rounded-xl 
                     bg-green-800 hover:shadow-xl hover:bg-green-900 
                     hover:text-grey-200"
                onClick={handlePublishEvent}
              >
                Publish this Event
              </button>
            </div>

            <div className="font-bold text-2xl pl-4 pb-2"> Add a Description </div>

            <p className="mr-8 p-2 mb-4 ml-4 rounded-lg shadow-lg w-[98%] bg-white">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-none outline-none w-full"
              />
            </p>
            <div className="flex justify-between p-4">
              <div className="p-2 rounded-lg shadow-lg w-[48%] bg-white">
                Start Time
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                      value={datetime}
                      onChange={(newValue) => setDatetime(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="p-4 rounded-lg shadow-lg w-1/2 bg-white">
                <div className="font-bold"> Location </div>
                <GeoAmpAutoFill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;