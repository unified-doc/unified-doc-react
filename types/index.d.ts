import { Doc as DocInterface, Options } from 'unified-doc';

export * from 'unified-doc';

export interface Props extends Options {
  className?: string;
}

export interface ProviderProps {
  children: React.ReactNode;
  options: Options;
}

export function Doc(props: Props): React.ReactElement;

export function DocProvider(providerProps: ProviderProps): React.ReactElement;

export function useDoc(): DocInterface;
