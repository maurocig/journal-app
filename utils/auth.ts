import { prisma } from '@/utils/db';
import { auth } from '@clerk/nextjs';

export const getUserByClerkID = async ({
  includes = {},
  select = {},
}: { includes?: any; select?: any } = {}) => {
  const { userId } = await auth();

  const user = await prisma.user.findUniqueOrThrow({
    //													 ^ if you've convinced Clerk that you are a user, but don't appear in my database, throw an error.
    where: {
      clerkId: userId as string,
    },
    // select,
    // includes,
  });

  return user;
};
