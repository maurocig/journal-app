const createURL = (path: string) => {
  return window.location.origin + path;
  // 											^ this is the current url
};

export const updateEntry = async (id: string, content: string) => {
  const response = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    }),
  );

  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
};

export const createNewEntry = async () => {
  const response = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
    }),
  );

  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
};
