import React from 'react';

import { useDoc } from './context';

export default function DocComponent({ className }) {
  const doc = useDoc();

  const { result } = doc.compile();

  return <div className={className}>{result}</div>;
}
