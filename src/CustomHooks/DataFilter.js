import { useMemo } from 'react';

export default function DataFilter(messages, query) {
  const data = useMemo(() => {
    return messages?.filter((message) => {
      return message.data.message.toLowerCase().includes(query.toLowerCase());
    });
  }, [messages, query]);
  return data;
}
