'use client'

import React from "react";
import Link from "next/link";

interface Campaign {
  id: number;
  authorId: number;
  title: string;
  description: String;
  interactLink: String;
  clickCount: number;
  datePosted: Date;
}

// todo... make this a take a prop of campaign stuff 
// on campaign page: pull all campaigns and map over them for grid

export default function CampaignCard( { onecampaign }: {onecampaign: Campaign} ) {

  const timedate = (timestamp: string) => {
    const campaignDate = new Date(timestamp);
    if (campaignDate instanceof Date && !isNaN(campaignDate.getTime())) {
      // Format the date as "month day, year"
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(campaignDate);

      // Format the time as "X:XX am/pm"
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(campaignDate);
      return (
        <div className="flex flex-col">
          <h1>{formattedDate}</h1>
          <h1>{formattedTime}</h1>
        </div>
      );
    }
  }


  return (
    <Link href={`/campaign?id=${onecampaign.id}`}>
      <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:shadow-xl">
        <img
          className="w-full h-40 object-cover object-center"
          src="/default_image.png"
          alt="campaign Image"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">{onecampaign.title}</h2>
          <div className="mt-4 flex justify-between flex-col">
            <div>
              <div className="text-sm text-gray-500">Click Count: {onecampaign.clickCount}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500"> {timedate(onecampaign?.datePosted.toLocaleString() || "")}</div>
            </div>
          </div>
        </div>
      </div>
      </Link>
  );
};