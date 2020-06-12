import React, { createContext, createElement, useContext } from 'react';
import rehype2react from 'rehype-react';
import unifiedDoc from 'unified-doc';

const DocContext = createContext(null);

export function DocProvider({ children, options }) {
  const {
    annotations,
    annotationCallbacks,
    content,
    filename,
    plugins,
    sanitizeSchema,
  } = options;

  const doc = unifiedDoc({
    annotations,
    annotationCallbacks,
    compiler: [rehype2react, { createElement }],
    content,
    filename,
    plugins,
    sanitizeSchema,
  });

  return <DocContext.Provider value={doc}>{children}</DocContext.Provider>;
}

export function useDoc() {
  return useContext(DocContext);
}
