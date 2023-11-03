import { qa } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { JournalEntry } from '@prisma/client';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { question } = await req.json();
  const user = await getUserByClerkID();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  const answer = await qa(question, entries);

  return NextResponse.json({ data: answer });
};
