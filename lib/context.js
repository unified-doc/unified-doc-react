import React, { createContext, createElement, useContext } from 'react';
import rehype2react from 'rehype-react';
import Doc from 'unified-doc';

const DocContext = createContext(null);

export function DocProvider({ children, options }) {
  const doc = Doc({
    ...options,
    compiler: [[rehype2react, { createElement }]],
  });

  return <DocContext.Provider value={doc}>{children}</DocContext.Provider>;
}

export function useDoc() {
  return useContext(DocContext);
}
