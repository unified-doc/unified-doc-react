import { Doc as DocInterface, Options } from 'unified-doc';

export * from 'unified-doc';

export interface Props extends Options {
  className?: string;
}

export function Doc(props: Props): React.ReactElement;

export function useDoc(): DocInterface;
