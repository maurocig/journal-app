import { JournalEntry } from '@prisma/client';

type EntryCardProps = {
  entry: JournalEntry;
};

export default function EntryCard({ entry }: EntryCardProps) {
  const date = new Date(entry.createdAt).toDateString(); // good way to format dates quickly without 3rd party libraries

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5 ">summary</div>
      <div className="px-4 py-5 ">mood</div>
    </div>
  );
}
