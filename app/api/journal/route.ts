import { analyze } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const user = await getUserByClerkID();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!',
    },
  });

  const analysis = await analyze(entry.content);
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      // ...analysis!,
      color: analysis?.color || '#D3D3D3',
      mood: analysis?.mood || 'no mood',
      negative: analysis?.negative || false,
      subject: analysis?.subject || 'no subject',
      summary: analysis?.summary || 'no summary',
    },
  });

  revalidatePath('/journal'); // revalidate the journal page when we add new entries!

  return NextResponse.json({ data: entry });
};
