'use client';

import { askQuestion } from '@/utils/api';
import { useState } from 'react';
import { SpinnerCircular } from 'spinners-react';

export default function Question() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer);
    setValue('');
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex items-center space-x-4">
        <input
          value={value}
          onChange={onChange}
          type="text"
          disabled={loading}
          placeholder="Ask a question"
          className="rounded-lg border border-black/20 px-4 py-2 text-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center space-x-2 rounded-lg bg-blue-400 px-4 py-2 text-lg"
        >
          Ask {loading && <SpinnerCircular size={30} />}
        </button>
      </form>
      {response && <div>{response}</div>}
      {loading && <div>loading...</div>}
    </div>
  );
}
