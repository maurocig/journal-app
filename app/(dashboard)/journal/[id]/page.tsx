import Editor from '@/app/components/editor';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntry = async (id: string) => {
  const user = await getUserByClerkID();
  const entry = prisma.journalEntry.findUnique({
    where: {
      // JournalEntry in prisma schema must have compound index on id and userId – @@unique([userId, id])
      userId_id: {
        // ^ prisma thing to query on compound index
        userId: user.id,
        id,
      },
    },
  });

  return entry;
};

type EntryPageProps = {
  params: { id: string };
};

export default async function EntryPage({ params }: EntryPageProps) {
  const entry = await getEntry(params.id);
  return (
    <div className="h-full w-full">
      {entry && <Editor entry={entry} />}
      {!entry && 'The entry was found'}
    </div>
  );
}
