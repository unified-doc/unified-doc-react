import React, { createElement } from 'react';
import rehype2react from 'rehype-react';
import Doc from 'unified-doc';

export default function DocComponent({
  className = undefined,
  options,
  ref = undefined,
}) {
  const doc = Doc({
    ...options,
    compiler: [[rehype2react, { createElement }]],
  });

  return (
    <div ref={ref} className={className}>
      {doc.compile().result}
    </div>
  );
}
