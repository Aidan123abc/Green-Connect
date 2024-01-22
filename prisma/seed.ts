import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword1 = bcrypt.hashSync('password', 10);
  const hashedPassword2 = bcrypt.hashSync('password2', 10);

  const user1 = await prisma.user.create({
    data: {
      email: 'testAdminEmail@gmail.com',
      password: hashedPassword1,
      firstName: 'Test',
      lastName: 'Admin',
      pronouns: 'he/him',
      jobTitle: 'admin tester man',
      workplace: 'job place!',
      profilePicture: 'thisisastringogsomekindImsure',
      bannerPicture: 'anothersillystring',
      bio: 'hi there. I am mr admin testing person lol',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'testUserEmail@gmail.com',
      password: hashedPassword2,
      firstName: 'Test',
      lastName: 'User',
      pronouns: 'he/him',
      jobTitle: 'user tester man',
      workplace: 'job place but different!',
      profilePicture: 'thisisastringogsomekindImsure 1',
      bannerPicture: 'anothersillystring 1',
      bio: 'hi there. I am mr user testing person lol',
    },
  });

  const event1 = await prisma.event.create({
    data: {
      authorId: user1.id,
      title: 'Event 1',
      description: 'Description for Event 1',
      location: 'Event 1 Location',
      latitude: 42.3601,
      longitude: -71.0589,
      timeToMeet: new Date('2023-01-01T12:00:00Z'),
    },
  });

  const event2 = await prisma.event.create({
    data: {
      authorId: user2.id,
      title: 'Event 2',
      description: 'Description for Event 2',
      location: 'Event 2 Location',
      latitude: 42.355,
      longitude: -71.065,
      timeToMeet: new Date('2023-01-02T15:30:00Z'), // Replace with your desired date and time
    },
  });

  const campaign1 = await prisma.campaign.create({
    data: {
      title: 'Campaign 1',
      description: 'Campaign 1 description',
      interactLink: 'https://youtube.com',
      clickCount: 0,
      authorId: user1.id,
      datePosted: new Date('2023-01-01T12:00:00Z')
    },
  });

  const campaign2 = await prisma.campaign.create({
    data: {
      title: 'Campaign 2',
      description: 'Campaign 2 description',
      interactLink: 'https://cnn.com',
      clickCount: 0,
      authorId: user1.id,
      datePosted: new Date('2023-01-01T12:00:00Z')
    },
  });

  const discussion1 = await prisma.discussion.create({
    data: {
      title: 'Discussion 1',
      authorId: user1.id,
    },
  });

  const discussion2 = await prisma.discussion.create({
    data: {
      title: 'Discussion 2',
      authorId: user2.id,
    },
  });
}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
