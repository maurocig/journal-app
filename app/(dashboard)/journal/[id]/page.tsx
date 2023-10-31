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
    include: {
      analysis: true,
    },
  });

  return entry;
};

type EntryPageProps = {
  params: { id: string };
};

export default async function EntryPage({ params }: EntryPageProps) {
  const entry = await getEntry(params.id);

  const { mood, summary, color, subject, negative } = entry?.analysis!; // asserting that every entry has an analysis.
  const analysisData = [
    { name: 'Subject', value: subject },
    { name: 'Summary', value: summary },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
    { name: 'Color', value: color },
  ];

  return (
    <div className="grid h-full w-full grid-cols-3">
      <div className="col-span-2">
        {entry && <Editor entry={entry} />}
        {!entry && 'The entry was found'}
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between border-b border-black/10 px-2 py-4"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
