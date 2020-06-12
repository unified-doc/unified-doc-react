import { createContext, useContext } from 'react';

const DocContext = createContext(null);

export const DocProvider = DocContext.Provider;

export function useDoc() {
  return useContext(DocContext);
}
