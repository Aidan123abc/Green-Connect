# Introduction
Green-Connect is my first attempt at an independent full-stack web-app. The app is built to be a social community-based platform for members to discuss environmental concerns, needs, and projects. Any community member will have the ability to post an 
- Event --> Any person or virtual events with locations and times. Examples include "Cleaning up Garbage in Local Park", or "____ non-profit internship fair" 
- Discussion --> Reddit-style discussions about local community issues where other members can interact and add to the post. Examples include "Storm water overflow? Is anyone else noticing this?" or a "Does anyone have experience with gardening in ____" 
- Campaign --> Change.org style sheets where users can add their signature to a movement, localizing support for important issues

The goal of the app is to create a singular platform for environmental problems to be discussed and solved, and I hope one day to launch it to help people feel less alone when dealing with big environmental injustices and issues.

## Tech Stack
This app uses a Next JS app directory model

The front end is coded with Typescript React and tailwindCSS

The backend utilizes a Prisma ORM on a PostgreSQL database

## Development Notes
The project is still unfinished! 

I have run into some design issues and am still figuring out what I want this app to be!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
