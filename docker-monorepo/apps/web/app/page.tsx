import { prisma } from "@repo/db/client";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div >
      {JSON.stringify(users)}
    </div>
  )
}

// If you don't want to statically generate a specific page, you can uncomment one of the following lines

// export const revalidate = 60; // This is called "Incremental Static Regeneration" (ISR) and will revalidate this page every 60 seconds 

// export const dynamic = "force-dynamic"; // Always re-render this page on every request or response