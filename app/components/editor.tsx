'use client';

import { updateEntry } from '@/utils/api';
import { Analysis, JournalEntry } from '@prisma/client';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';

type EditorProps = {
  entry: JournalEntry;
  analysis: Analysis;
};

export default function Editor({ entry, analysis }: EditorProps) {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(analysis);

  const { mood, summary, color, subject, negative } = currentAnalysis;

  const analysisData = [
    { name: 'Subject', value: subject },
    { name: 'Summary', value: summary },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
    { name: 'Color', value: color },
  ];

  useAutosave({
    data: value,
    onSave: async (_value) => {
      // 						^ using _value makes sure we don't use the stale value.
      setIsLoading(true);
      const data = await updateEntry(entry.id, _value);
      setCurrentAnalysis(data.analysis);
      setIsLoading(false);
    },
  });

  return (
    <div className="grid h-full w-full grid-cols-3 ">
      <div className="col-span-2">
        {isLoading && <div>saving...</div>}
        <textarea
          className="h-full w-full p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
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
