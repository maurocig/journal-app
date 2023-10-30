'use client';

import { createNewEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';

type NewEntryCardProps = {};

export default function NewEntryCard({}: NewEntryCardProps) {
  const router = useRouter();

  const handleClick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };

  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
      <div onClick={handleClick} className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
}
