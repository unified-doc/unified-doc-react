import { Doc as DocInstance, Options } from 'unified-doc';

export * from 'unified-doc';

export interface Props {
  options: Options;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface ProviderProps {
  children: React.ReactNode;
  options: Options;
}

export function Doc(props: Props): React.ReactElement;

export function DocProvider(providerProps: ProviderProps): React.ReactElement;

export function useDoc(): DocInstance;
