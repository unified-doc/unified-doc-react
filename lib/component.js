import React, { createElement } from 'react';
import rehype2react from 'rehype-react';
import unifiedDoc from 'unified-doc';

export default function Doc({
  className = undefined,
  options,
  ref = undefined,
}) {
  const doc = unifiedDoc({
    ...options,
    compiler: [rehype2react, { createElement }],
  });

  // @ts-ignore: fix typing on VFile
  const { result } = doc.compile();

  return (
    <div ref={ref} className={className}>
      {result}
    </div>
  );
}
