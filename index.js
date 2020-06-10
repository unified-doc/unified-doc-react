import React, { createElement } from 'react';
import rehype2react from 'rehype-react';
import unifiedDoc from 'unified-doc';

export default function Doc({
  annotations = [],
  annotationCallbacks = {},
  className,
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
  const compiled = doc.compile();
  // @ts-ignore TODO: remove when vfile type is fixed
  return <div className={className}>{compiled.result}</div>;
}
