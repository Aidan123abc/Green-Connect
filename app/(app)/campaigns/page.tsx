'use client'

import React from "react";
import Banner from "@/components/ui/banner";
import Sidebar from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import CampaignCard from "@/components/ui/CampaignCard";

interface Campaign {
  id: number;
  authorId: number;
  title: string;
  description: String;
  interactLink: String;
  clickCount: number;
  datePosted: Date;
}

const CampaignPage: React.FC = () => {

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("/api/campaigns");
        const data: Campaign[] = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="bg-gray-200 h-screen">
      <Banner />
      <div className="flex mt-16">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-4">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} onecampaign={campaign} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignPage;