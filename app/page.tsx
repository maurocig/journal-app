import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? '/journal' : '/new-user';

  return (
    // check if the user has signed in or not. if they have, redirect to journal.
    // if not, redirect to new user.

    <div className="flex h-screen w-screen items-center justify-center bg-slate-900 text-slate-200">
      <div className="mx-auto w-full max-w-[600px] space-y-4">
        <h1 className="text-6xl">The best journal app, period.</h1>
        <p className="text-2xl text-white/60">
          This is the best app for tracking your mood throughout your life. All
          you have to do is be honest.
        </p>

        <Link href={href} className="flex">
          <button className="rounded-lg bg-blue-600 px-8 py-4 text-xl">
            Get started
          </button>
        </Link>
      </div>
    </div>
  );
}
