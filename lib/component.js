import React from 'react';

import { useDoc } from './context';

export default function DocComponent({ className }) {
  const doc = useDoc();

  // @ts-ignore TODO: remove when vfile type is fixed
  const { result } = doc.compile();

  return <div className={className}>{result}</div>;
}
