import { JournalEntry } from '@prisma/client';

type EntryCardProps = {
  entry: JournalEntry;
};

export default function EntryCard({ entry }: EntryCardProps) {
  return <div>{entry.id}</div>;
}
