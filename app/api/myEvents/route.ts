import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  // const session = await getServerSession(authOptions)
  //   const user = session?.user as any;
  //   if (user == null) {
  //       return new NextResponse(null, { status: 401 });
  //   }
  
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get('email');

  if (!userEmail) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    // Find the user based on the provided email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return new NextResponse(null, { status: 404 });
    }

    // Find all events where the authorId equals the user's id
    const events = await prisma.event.findMany({
      where: {
        authorId: user.id,
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching user and events:', error);
    return new NextResponse(null, { status: 500 });
  }
}