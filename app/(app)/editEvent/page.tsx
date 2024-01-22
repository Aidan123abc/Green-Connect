'use client'

import React from "react";
import { useState, useEffect } from "react";
import Banner from "@/components/ui/banner";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import GeoAmpAutoFill from "@/components/ui/GeoAmpAutoFill";
import { useSearchParams } from "next/navigation";
import { useSession } from 'next-auth/react'
import Link from "next/link";

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

  const params = useSearchParams();
  const { data: session } = useSession()
  const id = params.get("id");

  const userIdString = session?.user?.id;
  const userId = userIdString ? parseInt(userIdString, 10) : null;

  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    const fetchSingleEvent = async () => {
      try {
        const response = await fetch(`/api/event?id=${id}`);
        const data: Event = await response.json();
        setEvent(data);
        setTitle(data.title)
        setDescription(data.description.toString())
        setLocation(data.location.toString())
        setDatetime(dayjs(data.timeToMeet))
        console.log(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        console.log(error);
      }
    };
    fetchSingleEvent();
  }, [id]);

  // Define constants for initial values
  const initialTitle = '';
  const initialDescription = '';
  const initialLocation = ''
  const initialLongitude = 0
  const initialLatitude = 0
  

  // State variables to hold the current values
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [datetime, setDatetime] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  const [location, setLocation] = useState<string | undefined>(initialLocation);
const [longitude, setLongitude] = useState<number | undefined>(initialLongitude);
const [latitude, setLatitude] = useState<number | undefined>(initialLatitude);

  const [selectedPlace, setSelectedPlace] = useState<{
    address: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  const handlePlaceSelect = (place: { address: string; latitude: number; longitude: number } | null) => {
    setSelectedPlace(place);
    setLocation(place?.address);
    console.log(place?.address)
    setLongitude(place?.longitude);
    console.log(place?.longitude)
    setLatitude(place?.latitude);
    console.log(place?.longitude)
  };

  const handleUpdateEvent = async () => {

    const event: Event = {
      authorId: userId ?? 0,
      title,
      description,
      latitude: latitude ?? 0,
      longitude: longitude ?? 0,
      location: location?.toString() ?? 'No Location Provided',
      timeToMeet: datetime?.toISOString(),
    };

    try {
      const response = await fetch(`/api/events?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        console.log('Event updated successfully!');
        // You can navigate to another page or show a success message here
      } else {
        console.error('Failed to update event:', response.statusText);
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('Error updating event:', error);
      // Handle error, show error message, etc.
    }
  };

  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const handleDelete = () => {
    // Open the delete popup
    setDeletePopupOpen(true);
  };

  const handleConfirmDelete = async () => {
    // Perform the actual delete action
    try {
      const response = await fetch(`/api/events?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        console.log('Event deleted successfully!');
        const editEventUrl = `/dashboard`;
        window.location.href = editEventUrl;
      } else {
        console.error('Failed to delete event:', response.statusText);
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('Error delete event:', error);
      // Handle error, show error message, etc.
    }

    // Close the delete popup after deletion
    setDeletePopupOpen(false);
  };

  const handleCancelDelete = () => {
    // Close the delete popup without performing the delete action
    setDeletePopupOpen(false);
  };

  if (userId == event?.authorId?.toString()) {
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
                <Link href={"/dashboard"}
                  className="mr-[2%] py-4 px-6 mb-4  text-white flex items-center justify-center
                       font-bold border border-black rounded-xl 
                       bg-green-800 hover:shadow-xl hover:bg-green-900 
                       hover:text-grey-200"
                  onClick={handleUpdateEvent}
                >
                  Save
                </Link>
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
                  <GeoAmpAutoFill onPlaceSelect={handlePlaceSelect}/>
                </div>
              </div>
            </div>
            {isDeletePopupOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-md">
                  <p className="text-xl font-bold mb-4">Are you sure you want to delete?</p>
                  <div className="flex justify-end">
                    <button
                      className="mr-4 px-4 py-2 text-white bg-red-500 rounded-md"
                      onClick={handleConfirmDelete}
                    >
                      Yes, Delete
                    </button>
                    <button
                      className="px-4 py-2 text-black bg-gray-300 rounded-md"
                      onClick={handleCancelDelete}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete button */}
            <button
              className="mt-4 px-4 py-2 ml-4 text-white bg-red-500 rounded-md hover:shadow-lg"
              onClick={handleDelete}
            >
              Delete Event
            </button>
          </div>

        </div>
      </div>
    );
  }
  else {
    return (
      <div className="flex items-center justify-center text-4xl h-screen">
        Page Restricted
      </div>
    )
  }


};

export default EventPage;