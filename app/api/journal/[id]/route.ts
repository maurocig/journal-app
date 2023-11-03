import { analyze } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { content } = await request.json();

  const user = await getUserByClerkID();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(updatedEntry.content);

  const updatedAnalysis = await prisma.analysis.upsert({
    // 										^ will update if it exists, otherwise create
    where: {
      entryId: updatedEntry.id,
    },
    update: {
      ...analysis,
    },
    create: {
      entryId: updatedEntry.id,
      ...analysis!,
    },
  });

  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  });
};
