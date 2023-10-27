/*
 whenever a user signs up, they will be redirected to this page.
 then this page will check to see if the clerk user is in our database.
 if not, it will create it and then redirect to journal.
*/

import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const createNewUserIfNoneFound = async () => {
  // you can't get to this page unless you're signed in because it's not listed as a public route in middleware.ts > authMiddleware.

  const user = await currentUser();

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id,
    },
  });

  if (!match) {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0]?.emailAddress as string, // it will have an email because it's required when signing in with Clerk.
      },
    });
    console.log('created');
  }

  if (match) {
    console.log('matched');
  }

  redirect('/journal');
};

export default async function NewUserPage() {
  await createNewUserIfNoneFound();

  return (
    <div>
      <h1>New User</h1>
    </div>
  );
}
