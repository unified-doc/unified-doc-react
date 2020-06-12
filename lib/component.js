import React, { createElement } from 'react';
import rehype2react from 'rehype-react';
import unifiedDoc from 'unified-doc';

import { DocProvider } from './context';

export default function Doc({
  annotations = [],
  annotationCallbacks = {},
  className = undefined,
  content,
  filename,
  plugins = [],
  sanitizeSchema = {},
}) {
  const doc = unifiedDoc({
    annotations,
    annotationCallbacks,
    compiler: [rehype2react, { createElement }],
    content,
    filename,
    plugins,
    sanitizeSchema,
  });

  // @ts-ignore TODO: remove when vfile type is fixed
  const { result } = doc.compile();

  return (
    <DocProvider value={doc}>
      <div className={className}>{result}</div>
    </DocProvider>
  );
}
