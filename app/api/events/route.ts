import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    // const session = await getServerSession(authOptions)
    // const user = session?.user as any;
    // if (user == null) {
    //     return new NextResponse(null, { status: 401 });
    // }

    const events = await prisma.event.findMany()
    return NextResponse.json(events)
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    const user = session?.user as any;
    if (user == null) {
        return new NextResponse(null, { status: 401 });
    }

    const body = await request.json();
    await prisma.event.create({
        data: body
    })

    return NextResponse.json({});

}

export async function PATCH(request: Request) {

    const session = await getServerSession(authOptions)
    const user = session?.user as any;
    if (user == null) {
        return new NextResponse(null, { status: 401 });
    }

    // Grabbing the JSON file from the request.
    const body = await request.json();

    // Creating a type URL searchParams variable
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('id')
    
    await prisma.event.update({
        where: {
           id : Number(eventId),
        },
        data: body
    })

    console.log(NextResponse.json({}));
    return NextResponse.json({});

}

export async function DELETE(request: Request) {

    const session = await getServerSession(authOptions)
    const user = session?.user as any;
    if (user == null) {
        return new NextResponse(null, { status: 401 });
    }

    // Creating a type URL searchParams variable
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('id')

    try {
        await prisma.event.delete({
            where: { id: Number(eventId) }
        });

        return new Response(null, { status: 204 });
    } catch (error) {
        console.error('Error deleting event:', error);
        return new Response (null , {status: 400});
    }
}