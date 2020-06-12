import React from 'react';

import DocComponent from './lib/component';
import { DocProvider, useDoc } from './lib/context';

export function Doc({
  // doc options
  annotations = [],
  annotationCallbacks = {},
  content,
  filename,
  plugins = [],
  sanitizeSchema = {},
  // component
  className,
}) {
  const options = {
    annotations,
    annotationCallbacks,
    content,
    filename,
    plugins,
    sanitizeSchema,
  };

  return (
    <DocProvider options={options}>
      <DocComponent className={className} />
    </DocProvider>
  );
}

export { useDoc };
