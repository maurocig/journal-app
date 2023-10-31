// 1. pulls all the journal entries from the database, organizes them
// 2. a container for the new journal button that we can use to create a new journal entry.

import EntryCard from '@/app/components/entry-card';
import NewEntryCard from '@/app/components/new-entry-card';
import { analyze } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { getURL } from 'next/dist/shared/lib/utils';
import Link from 'next/link';

const getEntries = async () => {
  const user = await getUserByClerkID();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return entries;
};

type JournalPageProps = {};

export default async function JournalPage({}: JournalPageProps) {
  const entries = await getEntries();

  return (
    <div className="h-full bg-zinc-400/10 p-10">
      <h2 className="mb-8 text-3xl">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard key={entry.id} entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
}
