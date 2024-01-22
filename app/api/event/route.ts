import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();


// Function to get a single event by ID
export async function GET(request: Request) {
        const session = await getServerSession(authOptions);
        const user = session?.user as any;
      
        if (user == null) {
          return new NextResponse(null, { status: 401 });
        }
      
        // Extract the event ID from the request parameters
        const { searchParams } = new URL(request.url);
        const eventId = searchParams.get('id');
      
        // Check if the event ID is provided
        if (!eventId) {
          return new NextResponse(null, { status: 400 });
        }
      
        try {
          // Fetch the event by ID
          const event = await prisma.event.findUnique({
            where: { id: Number(eventId) },
          });

          // Check if the event exists
          if (!event) {
            return new NextResponse(null, { status: 404 });
          }
      
          // Return the event as JSON
          return NextResponse.json(event);
        } catch (error) {
          console.error('Error fetching event:', error);
          return new NextResponse(null, { status: 500 });
        }
      }